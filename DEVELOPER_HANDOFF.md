# LDL Lead Monitor — Site Handoff

Dashboard + generator for the LDL Lead Monitor (Oil Service Fuels, Inc. — Longer Diesel Life®). Surfaces sales leads pulled from SAM.gov, USAspending.gov, and SEC EDGAR.

The whole pipeline lives in this repo: `run.py` fetches, scores, and rewrites `index.html`. The dashboard is a single static file with the lead data embedded inline.

## Files

- `run.py` — generator. Fetches sources, scores leads, rewrites `index.html`.
- `index.html` — dashboard. Reads `const LEADS = [...]` injected by the generator.
- `.ldl_state.json` — runtime state (gitignored). Tracks lead IDs already published so they're not flagged as "new" next run.
- `.gitignore` — excludes state file, Python caches, editor metadata.

No external dependencies. Python stdlib only.

## Quickstart

```bash
# (optional) get a SAM.gov key from https://sam.gov — without it, SAM is skipped
export SAM_API_KEY="..."

python run.py        # fetch, score, rewrite index.html
start index.html     # open the dashboard (use `open` on macOS)
```

## Architecture

```
   [SAM.gov]                    [USAspending.gov]              [SEC EDGAR]
       │                              │                            │
       └──────────────┬───────────────┴────────────┬───────────────┘
                      ▼                            ▼
                fetch + score                 dedupe by _id
                      │                            │
                      └────────────┬───────────────┘
                                   ▼
                         rewrite index.html
                         (const LEADS = [...])
                                   │
                                   ▼
                         publish (host: TBD)
```

## Configuration

All knobs are constants at the top of `run.py`:

| Constant | Purpose |
|---|---|
| `KEYWORDS` | Drives all three searches and keyword-match scoring |
| `LOOKBACK_DAYS` | How far back each fetcher looks |
| `SCORE_FLOOR` | Drop anything below this from the dashboard |
| `MAX_LEADS` | Hard cap on rendered leads |
| `USER_AGENT` | Sent on every HTTP request (SEC requires real contact info) |
| `SAM_API_KEY` env var | Required for SAM.gov; sources skipped if absent |

## Scoring

`score_lead()` in `run.py` returns 0–100:

- **Base 30**, plus **+8 per matched keyword** (capped at 6 matches → +48)
- **+25** if `source == sam.gov` (live RFPs are most actionable)
- **+10** if `source == usaspending.gov` (awarded contracts — competitor/customer signal)
- **+15** if posted in the last 7 days, **+5** within 21 days, **-10** if older than 60 days

Anything below `SCORE_FLOOR` (default 35) is dropped.

## Sources

### SAM.gov (`fetch_sam_gov`)
Endpoint: `https://api.sam.gov/opportunities/v2/search`
Auth: `SAM_API_KEY` query param. Free to register at sam.gov.
Behavior: one request per keyword (so matches are attributable), deduped by `noticeId`.

### USAspending.gov (`fetch_usaspending`)
Endpoint: `POST https://api.usaspending.gov/api/v2/search/spending_by_award/`
Auth: none.
Behavior: single POST with all keywords + contract award types A/B/C/D, sorted by Last Modified Date desc.

### SEC EDGAR (`fetch_sec_edgar`)
Endpoint: `https://efts.sec.gov/LATEST/search-index`
Auth: none — but SEC requires a descriptive `User-Agent` with contact info. Sustained traffic is rate-limited (10 req/s; expect occasional 500s on tighter limits).
Behavior: full-text search restricted to multi-word keywords and 8-K/10-K/10-Q forms. Returns up to 25 hits per keyword.

## Data contract

The page reads from a single in-file JS constant:

```js
const LEADS = [ /* objects */ ];
```

Each lead object consumes these fields ([index.html:111](index.html)–[220](index.html)):

| Field | Type | Used for |
|---|---|---|
| `score` | number | Score column + color tier (≥75 hi green, ≥50 mid amber, else grey) |
| `source` | string | Source pill — recognized values: `sam.gov`, `usaspending.gov`, `sec_edgar` |
| `title` | string | Linked opportunity title |
| `url` | string | Link target (opens in new tab) |
| `organization` | string | Org column |
| `description` | string | Truncated to 200 chars under the title |
| `matched_keywords` | string | Shown as `matched: …` under the description |
| `posted_date` | string (ISO) | Date column fallback |
| `deadline` | string (ISO) | Date column preferred over `posted_date` |
| `sent_in_digest` | bool | Drives the "new" badge and the "Unsent only" filter / stats |

If `run.py` changes a field name, the column silently goes blank — there's no schema validation.

## Page features

- Stat cards: total, unsent, high-score (≥75), federal RFPs (source = `sam.gov`)
- Search across title + organization + description (case-insensitive substring)
- Filters: source, min score (50/75/100), unsent-only checkbox
- Click any column header to sort; score defaults to desc, others asc
- CSV export of currently-visible rows (`ldl_leads_<YYYY-MM-DD>.csv`)

## State + "new" badge

`.ldl_state.json` stores the set of lead `_id`s ever published. On each run:

1. Load previous IDs.
2. Any lead whose `_id` is in the set gets `sent_in_digest: true` (no "new" badge).
3. New leads get `sent_in_digest: false`.
4. After publishing, the state file is updated with the current run's IDs.

Note: the field is named `sent_in_digest` for compatibility with the original schema, but the script doesn't actually send a digest — it just tracks "previously seen." If you wire up an email digest later, flip the flag *after* sending, not at publish time.

## Known environment quirks

- **Corporate TLS interception (e.g. ExpressVPN, McAfee, Zscaler)** can break HTTPS verification with `SSL: CERTIFICATE_VERIFY_FAILED`. If you hit this, install `truststore` (`pip install truststore`) and call `truststore.inject_into_ssl()` at the top of `run.py`, or set `SSL_CERT_FILE` to a system CA bundle.
- **EDGAR returns 500 intermittently** on some queries. The script logs and skips them; total volume is unaffected.
- **Windows console (cp1252)** can't print most non-ASCII characters. Keep `print()` strings ASCII-only.

## Deploy

**Unknown — confirm with whoever owns hosting.** No CI config, `CNAME`, Netlify, or Vercel file is checked in. Likely candidates: GitHub Pages on `main`, or `run.py` pushing directly to the host. Recommended next step: add a GitHub Actions workflow that runs `python run.py` on a schedule and commits the result.

## Things to verify when you pick this up

1. **Hosting target** — see above.
2. **SAM.gov API key** — register one if missing; without it ~half the lead volume disappears.
3. **Keyword list** — the seeded list in `run.py` covers obvious diesel-additive territory (biodiesel, ULSD, fuel stabilizer, emergency generators, fuel filters, microbial contamination). Tune to match the sales team's actual ICP.
4. **No tests.** The data contract is enforced by convention; eyeball the dashboard after schema changes.
5. **No CSP / sanitization beyond `escapeHTML`** ([index.html:114](index.html)). Currently fine because all data is generator-controlled, but if you ever pipe in untrusted upstream content, audit the description and matched_keywords paths first.

## File reference

- Generator: [run.py](run.py)
- Dashboard markup: [index.html:56](index.html)
- Render loop: [index.html:134](index.html)
- CSV export: [index.html:203](index.html)
