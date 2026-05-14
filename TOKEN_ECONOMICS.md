# LDL Token Economics — Working Draft

**Status:** Pre-counsel working document. All terms indicative. Not an offer to sell securities.
**Date:** 2026-05-13

This is the one-pager you'll edit with securities counsel before drafting an offering memo. It captures the structural decisions you need to make and the trade-offs.

## Structure summary

| Field | Recommended | Why |
|---|---|---|
| **Token type** | Revenue-share security token | Backed by a defined % of Oil Service Fuels net LDL revenue. Holders are not equity owners — they own a contractual royalty stream. |
| **Issuer** | New Delaware LLC SPV ("LDL Royalty I, LLC") | Bankruptcy-remote from Oil Service Fuels operating co. The SPV holds the royalty contract and issues the token. |
| **Underlying asset** | Royalty agreement: SPV is entitled to X% of OSF's net LDL revenue, paid quarterly | Documented as a true-sale assignment of revenue rights. Counsel must validate enforceability if OSF distresses. |
| **Regulatory exemption** | Reg D 506(c) **+** Reg S (parallel) | 506(c) for US accredited investors (general solicitation OK — needed for an on-chain product). Reg S for offshore investors. This is the standard 2025-26 STO recipe. |
| **Investor scope** | Verified accredited only (Rule 501) | Mandatory under 506(c). All investors verified via Securitize / Tokenize / Parallel Markets. |
| **Chain** | Ethereum mainnet (primary) | Where institutional RWA capital lives. Securitize, BlackRock BUIDL, Centrifuge are all primarily on Ethereum. Polygon as a gas-efficient secondary if needed. |
| **Token standard** | ERC-3643 (T-REX) or ERC-1400 | Permissioned security token standards with on-chain transfer restrictions. Both are SEC-recognized via transfer-agent integrations. |
| **Distribution cadence** | Quarterly | Matches LDL revenue accounting cycle. Monthly is overhead-heavy; semi-annual is too slow for investor expectations. |
| **Lockup** | 12 months from issuance (Rule 144 statutory holding period) | Standard for 506(c). After 12 months, tokens become tradeable on a regulated ATS. |
| **Secondary market** | List on a regulated ATS within 12-18 months | Candidates: Securitize Markets, tZERO, INX, Templum. Listing cost $100k-$250k per venue. |

## Recommended yield range

**10–12% target APY.** Justification:

- Below 8% → investors choose Goldfinch Prime (9-12%) or Maple Blue Chip (10-12%) instead
- Above 14% → you're signaling distressed credit, which doesn't match LDL's 45-year track record
- 10-12% sits inside the credible private-credit RWA band while leaving room above the T-bill-token floor (~3.5% at Ondo)

**Optional two-tranche structure** (Centrifuge-style):

| Tranche | Target APY | Investor profile |
|---|---|---|
| Senior | 8-9% | MakerDAO-style RWA pool buyers, conservative family offices |
| Junior | 14-16% | Crypto-native private-credit funds (Maple, Centrifuge LPs) |

Two tranches roughly double the addressable investor base but add ~$50k of legal complexity.

## What % of revenue to assign

Two approaches with different trade-offs:

**A. Capped royalty** — SPV is entitled to e.g. 15% of net LDL revenue **up to** an aggregate cap of 1.5x principal raised, with declining percentage thereafter.
- Pros: Predictable maximum dilution for OSF. Easier to model investor IRR.
- Cons: Effectively a structured-debt instrument — may be classified as a security with debt features. More regulatory scrutiny.

**B. Perpetual royalty** — SPV is entitled to e.g. 10% of net LDL revenue in perpetuity.
- Pros: Clean royalty structure. Aligns with industry comp (oil/gas mineral royalties).
- Cons: OSF gives up upside permanently. Token valuation depends heavily on terminal-value assumptions.

**Recommendation: Capped royalty at 1.5x-2.0x principal**, then revert to OSF. Most accredited investors model RWAs as fixed-income substitutes; an exit is cleaner than perpetual dilution.

## Cost to launch (realistic 2026 budget)

| Line item | Range | Notes |
|---|---|---|
| Securities counsel (offering memo, sub agreements, blue sky) | $50k–$150k | Cooley / Sidley / Morgan Lewis range; mid-sized boutique can run lower |
| SPV formation + tax structuring | $15k–$40k | Delaware LLC + check-the-box election |
| Audit / agreed-upon-procedures on revenue | $30k–$75k | Annual + offering attestation |
| Smart-contract development + audit | $50k–$150k | T-REX / ERC-1400 implementation + 1-2 reputable auditors (OpenZeppelin, Trail of Bits) |
| Transfer agent setup + 1st year | $25k–$60k | Securitize Transfer Agent LLC or Tokeny |
| KYC/AML platform integration | $15k–$40k | Plus ~$50-$100 per verified accredited investor |
| ATS listing (if pursuing secondary market) | $100k–$250k | Per venue. Securitize Markets is the volume leader. |
| **All-in launch** | **$250k–$700k** | Spend more if pursuing simultaneous ATS listing. Spend less if delaying secondary 12-18 months. |
| **Ongoing annual** | **$100k–$200k** | Compliance, transfer agent, audit, investor relations |

## The five risks investors will raise (rehearse the answers now)

1. **Concentration risk** — "One product, one company, one industry." Goldfinch is pooled across many funds; LDL is monoline.
   - **Answer**: Detailed customer concentration disclosure, top-10-customer revenue %, reorder data, contract terms.
2. **Revenue verification** — "How do I know the revenue numbers are real?"
   - **Answer**: Annual CPA agreed-upon-procedures attestation, ideally a Chainlink-style oracle feeding actual sales data on-chain for real-time verification.
3. **Enforceability of the royalty claim** — "What if OSF goes bankrupt?"
   - **Answer**: True-sale assignment opinion from counsel; SPV is bankruptcy-remote.
4. **Liquidity** — "Can I sell before the cap is hit?"
   - **Answer**: Honest. After 12-month lockup, regulated ATS listing path. Pre-ATS, illiquid.
5. **Product obsolescence / EV transition** — "Diesel is dying."
   - **Answer**: Long-tail vehicle fleet exists for decades. LDL serves marine, ag, generators, off-road, locomotive — markets where electrification is slow or not happening. Diversification roadmap into biodiesel/renewable-diesel-compatible chemistry.

## Differentiators vs. existing RWA peers

What every comp lacks that LDL has:

1. **45-year operating cash-flow history of a real product with paying customers.** Goldfinch Prime is access to private credit *funds*; Maple is overcollateralized crypto lending; Centrifuge pools average <5 years old. LDL is selling a track record nobody else can show.
2. **Industrial commodity end-market, not financial.** Diesel additive consumption is correlated to trucking/ag/marine/generators — not crypto cycles. True diversifier inside an RWA portfolio.
3. **Not a depleting asset.** Oil & gas royalty tokens (Elmnts, Mineral Vault, TMC) have well-decline curves baked in. LDL revenue is consumable-product based with reorder economics — closer to recurring revenue than to a depleting well.
4. **No competing fuel-additive token exists.** First-mover in a defensible niche.

## SEC posture (2025-26)

The window is favorable:

- **Jan 28, 2026** — Joint SEC statement (Corp Fin + Trading & Markets + Investment Management): tokenization doesn't change application of federal securities laws. Tokenized security = security.
- **Innovation Exemption** under Chair Atkins — tailored pathways for tokenized assets.
- **Ondo investigation closed with no charges** — major signal that compliant Reg D/Reg S structures are accepted.
- **Mar 17, 2026** — SEC + CFTC joint guidance classifying crypto assets in five categories. LDL is **Category 1 (issuer-sponsored digital securities)** — favorable bucket.

Net direction: regulation by framework, not enforcement. Best window in years.

## Recommended next steps (in order)

1. **Engage securities counsel** — Cooley or Sidley for offering memo; mid-sized boutique (Dilendorf / Gofaizen & Sherle) for technical implementation.
2. **Engage an auditor** for 2024-2025 LDL revenue verification. This is the single biggest credibility item.
3. **Form the SPV** in Delaware. ~2 weeks once counsel is engaged.
4. **Lock in the transfer agent** — Securitize is the safe choice given BlackRock / Apollo precedent.
5. **Draft tokenomics + offering memo in parallel**. Memo will go to ~50-100 candidate investors before public launch.
6. **Soft circle accredited investors** (Reg D 506(c) allows public solicitation, but real raises start with private outreach).
7. **Launch with a target raise floor** ($5M minimum, $25M target as an example). Below the floor, refund and reassess.
8. **ATS listing** at 12-month anniversary if subscription succeeded.

## Open questions for Alan

Before counsel can draft, decisions needed:

- [ ] **Target raise size** — drives offering structure, ATS strategy, marketing budget
- [ ] **% of revenue assigned** to the SPV — 10%? 15%? 20%?
- [ ] **Royalty cap** — 1.5x principal? 2x? Perpetual?
- [ ] **Tranching** — single tranche or senior/junior split?
- [ ] **Geographic scope** — US accredited only, or US + offshore?
- [ ] **Use of proceeds** — distribution to OSF for growth capex? Working capital? Founder liquidity?
- [ ] **Carbon credit overlay** — should the offering also tokenize emissions reductions, or keep this clean as a revenue-share?

---

*This document is a working draft for internal discussion. It is not an offer to sell securities and does not constitute legal, tax, or investment advice. Any actual offering will be conducted pursuant to a formal offering memorandum, subscription agreement, and applicable Form D and other securities filings, after consultation with qualified counsel.*
