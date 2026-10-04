---
name: ade-fundamentals
description: How the ADE dashboard uses company fundamentals (analyst targets, forward P/E, margins, growth, moats, risks, bull/bear cases) to judge whether a stock is a good investment. Use when someone asks how the tool evaluates a business, why a stock scores the way it does on fundamentals, what a fundamentals field means, how to update fundamentals data, or whether a name is "a good company" versus "a good entry".
---

# Fundamentals in the ADE tool

## The one thing to understand first

The tool keeps **two separate layers**, and they answer different questions:

| Layer | Question | Moves the 0–100 score? |
|---|---|---|
| **Score** | Is now a good time to buy? | Yes |
| **Fundamentals / research** | Is this a good business? | Only through the analyst target |

The only fundamentals input to the score is the **average analyst 12-month target (`avgPT`)**. It drives two components worth 58% of the weight:

```
upside  = (avgPT − price) / price × 100          → 30% weight, capped at ±50%
R:R     = (avgPT − price) / max(price − support, 3% × price)   → 28% weight, capped at 6×
```

These are computed in `computeSignal()` in `src/ade-portfolio-v6.jsx` (search for `const cm=`), and the same formula is in `score()` in `tools/rank.py`.

Margins, growth, P/E, moats and the narrative are **deliberately not in the score**. `docs/METHODOLOGY.md` puts it this way: the score is "a timing screen, not a verdict on the business… A low score says not now, not never." When answering "is X a good investment?", give both layers. Never let a high timing score stand in for business quality.

## Where fundamentals live (per ticker in the `S` object)

**Valuation and consensus (top level)**
- `avgPT` / `highPT` / `lowPT`: the S&P Global consensus target and its range. `ptDate` and `ptVerified` record when and whether the target was checked.
- `consensus`: one of 5 allowed ratings.
- `fwdPE`, `mktCap`, `epsEst` / `epsEstDate`, `earningsDate` (a ✓ means the company has reported), `sector`, `ytd`, `yr1`.
- `rateSens`: interest-rate sensitivity on a 0–1 scale, shown as HIGH above 0.5, MED above 0.2, otherwise LOW.
- `peers: [{t, pe, ev, y}]`: feeds the relative-value view.

**The `fund` block (the research layer)**
- `story`: the thesis in prose.
- `metrics: {lastQ, revGrowth, grossMargin, opMargin, netMargin, roe?, fcfMargin?, debtEquity?, note}`.
- `drivers: [{name, dir: "up"|"flat"|"down"|"risk", detail}]`: what is accelerating or decelerating.
- `bull` / `bear: {path, price}`, plus `killer`, a single sentence saying what would end the thesis.
- `revMix: [{n, p}]`: revenue split by segment, in percent, which should total about 100.
- `compPos`: competitive position on two axes against peers.
- `moats` (on some tickers).
- `mgmt: {beats, misses, streak}`: the management team's earnings track record.
- `flow: {inst, retail, short}`: who is buying and selling.
- `activeRisks: [{sev, prob, risk, trigger, impact|mitigation, catalyst}]`.
- `watchlist: [{item, d, why}]`: dated upcoming events.
- Date stamps: `fundDate`, `thesisDate`, `valDate`, `riskDate`, `fundVerified`.

## How the tile colours grade a business (display only)

On the Fundamentals tab:

| Metric | Green | Yellow | Red |
|---|---|---|---|
| Revenue growth | > 25% | > 10% | ≤ 10% |
| Gross margin | > 60% | > 40% | ≤ 40% |
| Operating margin | > 30% | > 15% | ≤ 15% |
| Net / FCF margin, ROE | > 25% | > 10% | ≤ 10% |
| Debt/Equity | < 0.5 | < 1.5 | ≥ 1.5 |
| Forward P/E | < 20 | < 35 | ≥ 35 |

These colour the tiles. They are not inputs to the score.

## Risks are excluded from the score on purpose

Risks were removed from the score on Sep 3. Across all names they only ranged 10–18 on a 40-point scale and rested on assigned probabilities (see `METHODOLOGY.md`). They are still counted and displayed. Some leftover UI code (`riskAdj`) still computes an "adjusted score" penalty, but the ranker zeroes it (`pen2=0`). Present risks as context, not as a score input.

## How to judge "good investment" with this tool

1. **Business quality** (from `fund`): check margins against the table above, the direction of `drivers`, the `mgmt` beat record, `revMix` concentration, and `compPos`/`moats`.
2. **Valuation**: compare `fwdPE` with the peers, and compare price with `avgPT` and the `bull`/`bear` prices.
3. **Thesis integrity**: is the `killer` condition close to firing? Which `activeRisks` are HIGH with high `prob`?
4. **Then timing**: the 0–100 score (see the `ade-support-resistance` skill).
5. **State the edge.** `docs/DECISION-LOG.md` asks what you believe that the price doesn't, and "None" is a valid answer.

## Data hygiene the health check enforces

- `ptDate` within about 30 hours ("Stale PT = lying about asymmetry"). Price more than 25% above `avgPT` while rated "Strong Buy" is flagged.
- `fwdPE` between 1 and 200. Peer P/E within 3 points of the ticker's own `fwdPE`.
- `epsEstDate` under 14 days old when earnings are within 30 days.
- `valDate` over 14 days old is MED, over 30 days HIGH.
- `story`, `bull`, `bear` and `killer` must be present, with `killer` at least 20 characters. `thesisDate` must be refreshed after any earnings report in the last 21 days.
- `revMix` must total 100 ±5, and there must be at least 2 `compPos` peers.

Never bump a date without re-checking the source. `docs/WORKFLOW.md` says doing so "falsifies the field".

## Trade Opportunities `fundScore`

The opportunity cards rank names partly on `fundScore = min(100, revGrowth × 0.5 + grossMargin × 0.8)`, which is 25% of their conviction. High-margin, fast-growing names reach the 100 cap, so the term mainly separates lower-margin or slower names. It does not affect the 0–100 timing score.

## Stale-quarter check

Health check 108 flags a `fund.metrics.lastQ` panel when a newer quarter has been reported: an earnings item at least 75 days after the panel's quarter, within the last 45 days. Earnings news that names the panel's own quarter (a later "Q2 beat confirmed" recap) is ignored, so it doesn't count as a new report.

Both were fixed in Oct 2026. Before that, `fundScore` read a non-existent `GM` field and the stale-quarter check read `s.metrics` instead of `s.fund.metrics`, so it never fired.
