#!/usr/bin/env python3
"""LDL Lead Monitor — fetches leads, scores them, rewrites index.html.

Run: python run.py
Env: SAM_API_KEY (optional; without it the SAM.gov source is skipped)
"""

from __future__ import annotations

import datetime as dt
import hashlib
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).parent
INDEX_HTML = ROOT / "index.html"
STATE_FILE = ROOT / ".ldl_state.json"

# --- Configuration ----------------------------------------------------------

KEYWORDS = [
    "diesel fuel",
    "diesel engine",
    "biodiesel",
    "fuel stabilizer",
    "fuel additive",
    "fuel treatment",
    "ultra low sulfur diesel",
    "ulsd",
    "fuel polishing",
    "fuel quality",
    "fuel maintenance",
    "emergency generator",
    "standby generator",
    "backup generator",
    "fleet fuel",
    "bulk fuel storage",
    "fuel tank",
    "diesel storage",
    "microbial contamination",
    "fuel filter",
    "water in fuel",
    "cetane",
    "diesel performance",
]

LOOKBACK_DAYS = 30
SCORE_FLOOR = 35  # drop anything below this
MAX_LEADS = 200  # hard cap on output

USER_AGENT = (
    "LDL Lead Monitor (Oil Service Fuels, Inc. - contact via oilservicefuels.com)"
)

SAM_API_KEY = os.environ.get("SAM_API_KEY", "").strip()

# --- HTTP -------------------------------------------------------------------


def _http(url: str, *, data: bytes | None = None, headers: dict | None = None,
          timeout: int = 30) -> dict | list | str:
    h = {"User-Agent": USER_AGENT, "Accept": "application/json"}
    if headers:
        h.update(headers)
    req = urllib.request.Request(url, data=data, headers=h,
                                 method="POST" if data else "GET")
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        raw = resp.read().decode("utf-8")
    ct = resp.headers.get("Content-Type", "")
    if "json" in ct or raw.lstrip().startswith(("{", "[")):
        return json.loads(raw)
    return raw


# --- Fetchers ---------------------------------------------------------------


def fetch_sam_gov() -> list[dict]:
    """SAM.gov contract opportunities. Requires SAM_API_KEY."""
    if not SAM_API_KEY:
        print("  [sam.gov] skipped - SAM_API_KEY not set", file=sys.stderr)
        return []

    today = dt.date.today()
    posted_from = (today - dt.timedelta(days=LOOKBACK_DAYS)).strftime("%m/%d/%Y")
    posted_to = today.strftime("%m/%d/%Y")

    leads: list[dict] = []
    seen_ids: set[str] = set()

    # SAM's q= is a single string, OR-able with quotes — we issue one request
    # per keyword to keep matches attributable.
    for kw in KEYWORDS:
        params = {
            "api_key": SAM_API_KEY,
            "q": f'"{kw}"',
            "postedFrom": posted_from,
            "postedTo": posted_to,
            "limit": "50",
        }
        url = "https://api.sam.gov/opportunities/v2/search?" + urllib.parse.urlencode(params)
        try:
            data = _http(url)
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError) as e:
            print(f"  [sam.gov] {kw!r}: {e}", file=sys.stderr)
            continue

        for op in (data or {}).get("opportunitiesData", []):
            nid = op.get("noticeId") or op.get("solicitationNumber")
            if not nid or nid in seen_ids:
                continue
            seen_ids.add(nid)

            org = ""
            oh = op.get("organizationHierarchy") or []
            if oh:
                org = " / ".join(filter(None, [n.get("name") for n in oh][-3:]))
            org = org or op.get("fullParentPathName") or op.get("departmentName") or ""

            leads.append({
                "_id": f"sam:{nid}",
                "source": "sam.gov",
                "title": op.get("title") or "(untitled)",
                "url": op.get("uiLink") or "",
                "organization": org,
                "description": (op.get("description") or "").strip(),
                "posted_date": (op.get("postedDate") or "")[:10],
                "deadline": (op.get("responseDeadLine") or "")[:10],
            })

    return leads


def fetch_usaspending() -> list[dict]:
    """USAspending.gov recent awards matching our keywords."""
    today = dt.date.today()
    start = (today - dt.timedelta(days=LOOKBACK_DAYS)).strftime("%Y-%m-%d")
    end = today.strftime("%Y-%m-%d")

    body = json.dumps({
        "filters": {
            "keywords": KEYWORDS,
            "time_period": [{"start_date": start, "end_date": end}],
            "award_type_codes": ["A", "B", "C", "D"],  # contracts
        },
        "fields": [
            "Award ID", "Recipient Name", "Award Amount", "Description",
            "Awarding Agency", "Awarding Sub Agency", "Last Modified Date",
            "generated_internal_id",
        ],
        "page": 1,
        "limit": 100,
        "sort": "Last Modified Date",
        "order": "desc",
    }).encode()

    try:
        data = _http(
            "https://api.usaspending.gov/api/v2/search/spending_by_award/",
            data=body,
            headers={"Content-Type": "application/json"},
        )
    except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError) as e:
        print(f"  [usaspending] {e}", file=sys.stderr)
        return []

    leads: list[dict] = []
    for row in (data or {}).get("results", []):
        gid = row.get("generated_internal_id") or row.get("Award ID")
        if not gid:
            continue
        title = row.get("Description") or row.get("Award ID") or "(untitled)"
        title = (title[:140] + "…") if len(title) > 141 else title
        org = " / ".join(filter(None, [row.get("Awarding Agency"),
                                        row.get("Awarding Sub Agency")]))
        leads.append({
            "_id": f"usa:{gid}",
            "source": "usaspending.gov",
            "title": title,
            "url": f"https://www.usaspending.gov/award/{urllib.parse.quote(str(gid))}",
            "organization": (row.get("Recipient Name") or "") +
                            (f" — {org}" if org else ""),
            "description": (row.get("Description") or "").strip(),
            "posted_date": (row.get("Last Modified Date") or "")[:10],
            "deadline": "",
        })

    return leads


def fetch_sec_edgar() -> list[dict]:
    """SEC EDGAR full-text search for recent filings mentioning our keywords."""
    today = dt.date.today()
    start = (today - dt.timedelta(days=LOOKBACK_DAYS)).strftime("%Y-%m-%d")
    end = today.strftime("%Y-%m-%d")

    leads: list[dict] = []
    seen_ids: set[str] = set()

    # EDGAR rate-limits — keep this set narrow.
    edgar_terms = [kw for kw in KEYWORDS if " " in kw]  # multi-word terms only

    for kw in edgar_terms:
        params = {
            "q": f'"{kw}"',
            "dateRange": "custom",
            "startdt": start,
            "enddt": end,
            "forms": "8-K,10-K,10-Q",
        }
        url = "https://efts.sec.gov/LATEST/search-index?" + urllib.parse.urlencode(params)
        try:
            data = _http(url, headers={"Accept": "application/json"})
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError) as e:
            print(f"  [edgar] {kw!r}: {e}", file=sys.stderr)
            continue

        hits = (((data or {}).get("hits") or {}).get("hits")) or []
        for hit in hits[:25]:
            src = hit.get("_source") or {}
            acc = (hit.get("_id") or "").split(":")[0]
            if not acc or acc in seen_ids:
                continue
            seen_ids.add(acc)

            cik = (src.get("ciks") or [""])[0]
            company = (src.get("display_names") or [""])[0]
            filed = src.get("file_date") or ""

            # Form type may show up under several keys depending on EDGAR's index
            form = ""
            for candidate in (src.get("file_type"), src.get("form"),
                              src.get("root_form")):
                if isinstance(candidate, str) and candidate:
                    form = candidate
                    break
                if isinstance(candidate, list) and candidate:
                    form = candidate[0]
                    break
            if not form:
                for key in ("forms", "root_forms"):
                    val = src.get(key)
                    if isinstance(val, list) and val:
                        form = val[0]
                        break

            title = f"{form}: {company}" if form else (company or f"Filing {acc}")

            # Link to the filing's index page when we have CIK + accession
            if cik and acc:
                cik_int = str(int(cik))  # drop leading zeros for the path
                acc_nodash = acc.replace("-", "")
                filing_url = (
                    f"https://www.sec.gov/Archives/edgar/data/"
                    f"{cik_int}/{acc_nodash}/{acc}-index.htm"
                )
            elif cik:
                filing_url = (
                    f"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany"
                    f"&CIK={cik}&type={form}&dateb=&owner=include&count=40"
                )
            else:
                filing_url = "https://www.sec.gov/edgar/search/"

            leads.append({
                "_id": f"edgar:{acc}",
                "source": "sec_edgar",
                "title": title,
                "url": filing_url,
                "organization": company,
                "description": f"Filing {acc} ({form or 'unknown form'}) mentions {kw!r}",
                "posted_date": filed,
                "deadline": "",
            })

    return leads


# --- Scoring ----------------------------------------------------------------


_WORD_RE = re.compile(r"[a-z0-9]+")


def match_keywords(text: str) -> list[str]:
    if not text:
        return []
    t = text.lower()
    hits = []
    for kw in KEYWORDS:
        if kw.lower() in t:
            hits.append(kw)
    return hits


def score_lead(lead: dict) -> int:
    blob = " ".join(filter(None, [lead.get("title"), lead.get("description"),
                                   lead.get("organization")]))
    matches = match_keywords(blob)
    score = 30 + min(len(matches), 6) * 8  # base + up to +48 for keyword density

    if lead["source"] == "sam.gov":
        score += 25  # active RFPs are most actionable
    elif lead["source"] == "usaspending.gov":
        score += 10  # awarded contracts — useful but indirect

    # Recency bonus / penalty
    posted = lead.get("posted_date") or ""
    try:
        d = dt.date.fromisoformat(posted)
        age = (dt.date.today() - d).days
        if age <= 7:
            score += 15
        elif age <= 21:
            score += 5
        elif age > 60:
            score -= 10
    except (ValueError, TypeError):
        pass

    return max(0, min(100, score))


# --- State (sent_in_digest tracking) ---------------------------------------


def load_state() -> dict:
    if STATE_FILE.exists():
        try:
            return json.loads(STATE_FILE.read_text())
        except json.JSONDecodeError:
            print(f"  [state] {STATE_FILE} unreadable, starting fresh", file=sys.stderr)
    return {"seen_ids": []}


def save_state(state: dict) -> None:
    STATE_FILE.write_text(json.dumps(state, indent=2, sort_keys=True))


# --- HTML injection ---------------------------------------------------------


_LEADS_RE = re.compile(r"const LEADS = (\[[\s\S]*?\]);")
_META_RE = re.compile(
    r'(<div class="meta">.*?Last refreshed: )[0-9TZ:\- ]+( UTC</div>)'
)


def write_dashboard(leads: list[dict]) -> None:
    if not INDEX_HTML.exists():
        sys.exit(f"index.html not found at {INDEX_HTML}")

    html = INDEX_HTML.read_text(encoding="utf-8")

    payload = json.dumps(leads, indent=2, ensure_ascii=False)
    new_html, n = _LEADS_RE.subn(f"const LEADS = {payload};", html, count=1)
    if n != 1:
        sys.exit("Could not find `const LEADS = [...];` in index.html")

    now = _utc_now().strftime("%Y-%m-%d %H:%M")
    new_html, _ = _META_RE.subn(rf"\g<1>{now}\g<2>", new_html, count=1)

    INDEX_HTML.write_text(new_html, encoding="utf-8")


# --- Main -------------------------------------------------------------------


def _utc_now() -> dt.datetime:
    return dt.datetime.now(dt.timezone.utc)


def main() -> int:
    print(f"LDL monitor - {_utc_now().strftime('%Y-%m-%dT%H:%M:%SZ')}")
    print(f"  keywords:    {len(KEYWORDS)}")
    print(f"  lookback:    {LOOKBACK_DAYS} days")
    print(f"  score floor: {SCORE_FLOOR}")

    all_leads: list[dict] = []
    for label, fn in [("sam.gov", fetch_sam_gov),
                       ("usaspending", fetch_usaspending),
                       ("edgar", fetch_sec_edgar)]:
        try:
            got = fn()
        except Exception as e:  # noqa: BLE001 — boundary
            print(f"  [{label}] crashed: {e!r}", file=sys.stderr)
            got = []
        print(f"  {label}: {len(got)} raw")
        all_leads.extend(got)

    # Dedupe by _id (keep first occurrence)
    seen: set[str] = set()
    deduped: list[dict] = []
    for lead in all_leads:
        if lead["_id"] in seen:
            continue
        seen.add(lead["_id"])
        deduped.append(lead)

    state = load_state()
    prev_seen = set(state.get("seen_ids", []))

    enriched: list[dict] = []
    for lead in deduped:
        lead["score"] = score_lead(lead)
        if lead["score"] < SCORE_FLOOR:
            continue
        lead["matched_keywords"] = ", ".join(
            match_keywords(" ".join(filter(None, [lead.get("title"),
                                                    lead.get("description"),
                                                    lead.get("organization")])))
        )
        lead["sent_in_digest"] = lead["_id"] in prev_seen
        enriched.append(lead)

    enriched.sort(key=lambda l: (-l["score"], l.get("posted_date") or ""))
    enriched = enriched[:MAX_LEADS]

    # Update state with everything we just emitted so they're "not new" next run.
    state["seen_ids"] = sorted({l["_id"] for l in enriched} | prev_seen)
    state["last_run"] = _utc_now().strftime("%Y-%m-%dT%H:%M:%SZ")
    save_state(state)

    # Strip _id before publishing
    public = [{k: v for k, v in l.items() if not k.startswith("_")} for l in enriched]

    write_dashboard(public)
    print(f"  -> wrote {len(public)} leads to {INDEX_HTML.name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
