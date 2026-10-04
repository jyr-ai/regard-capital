---
name: ade-forward-looking
description: How the ADE dashboard accounts for the future when making investment judgements — analyst targets, forward estimates, earnings dates, catalysts, bull/bear cases, thesis killers — and how planned future positions (watchlist names, planned adds/trims, decision-log falsifiers and review dates) are tracked. Use when someone asks what the tool assumes about the future, how upcoming earnings or catalysts affect a call, how to plan a future buy, or how watchlist candidates are evaluated.
---

# The future in the ADE tool

## Short answer

Only **one** forward-looking number moves the 0–100 score: the **average 12-month analyst target (`avgPT`)**. It drives upside (30%) and reward-to-risk (28%), as described in the `ade-support-resistance` skill.

Everything else about the future is a **research and alerting layer**. It covers forward P/E, EPS estimates, earnings dates, catalysts, bull/bear cases, thesis killers, risks, macro conditions and planned trades. It is displayed, date-checked and used to schedule reviews, but it does not change the number. This is deliberate. Inputs whose values are judgements made in the same session were found to be circular (`docs/METHODOLOGY.md`).

## (a) Forward-looking inputs

| Input | Field | Role |
|---|---|---|
| Analyst 12-month targets | `avgPT`, `highPT`, `lowPT`, `ptDate`, `consensus` | **In the score** (upside and R:R). Flagged if over 3 days old, if price has moved more than 5% since `ptDate`, or if price is more than 25% above `avgPT` while rated Strong Buy. Opportunity lists call price above 1.15×`avgPT` "over-extended" and `avgPT` above 1.4×price "deep value". |
| Forward P/E | `fwdPE` | Display and peer comparison. An implied P/E is computed but not scored. |
| EPS estimate | `epsEst`, `epsEstDate` | Display. Must be under 14 days old when earnings are within 30 days. |
| Next report | `earningsDate` (✓ = reported) | Drives alerts, not the score (see below). |
| Event calendar | `catalysts: [{d, e, i}]`, risk `catalyst` text, `fund.watchlist: [{item, d, why}]` | Display. Past-dated items without a ✓ are flagged. |
| Business direction | `fund.drivers: [{name, dir}]` | Shown as ACCELERATING / DECELERATING / RISK. |
| Scenarios | `fund.bull` / `fund.bear: {path, price}`, `fund.killer` | Display. The bear price must not sit far above the current price, and the killer must be specific. |
| Chart pattern | `tech.pattern: {name, target, dir}` | Display. An "up" target at or below price is flagged. |
| Risks | `fund.activeRisks: [{sev, prob, trigger, catalyst}]` | **Excluded from the score** since Sep 3. Counted and shown, and refreshed daily. |
| Macro | `MACRO` (Fed funds, oil, VIX, regime), `rateSens` | Display. The macro-boost code exists but is not added to the score. |
| Options | `atmIV`, `impliedMove`, `ivRank` | Display. `ivRank` stays null until about 20 daily readings exist. The implied move should be at least 6% near earnings. |

**Inert controls:** the "EARNINGS SCENARIO" buttons (BIG BEAT … BIG MISS) and the 0.5×–1.5× price slider recompute display values. The earnings adjustment they feed was removed from the score, so they do not change the verdict.

## How upcoming events change what you do

Earnings and catalysts change the **workflow**, not the score:
- Earnings within 7 days → "EARNINGS IN 7 DAYS — ACTION REQUIRED" banner. The 1-week playbook must mention the print, and the playbooks, patterns and risk scenarios need updating.
- Earnings within 14 days → **T1 EARNINGS WATCH** in tier triage. Near the 52-week high, YTD of +60% or more, or YTD of −15% or worse → T2.
- After a report → refresh `epsEst`, `mgmt`, `thesisDate` (within 21 days) and the targets. Never bump a date without re-checking the source.
- Explain any move above about 2× average volume by finding its named cause (`docs/WORKFLOW.md`).

## (b) Planned future positions

- **Watchlist candidates** (names in `S` that aren't held, e.g. NBIS, OKTA, NET) are scored and ranked **exactly like held names**, so a candidate's timing score can be compared directly with a holding's.
- **Playbooks**: `playbook` holds `pb(horizon, bias, color, thesis, action)` for 1 WEEK, 1 MONTH, 3 MONTHS, 6 MONTHS and 1 YEAR. Longer horizons restate the target range and "what would change the view".
- **Planned adds and trims** are free text in the opportunity cards (`play` / `sizing`). Examples: "adds below $X if <condition> is confirmed", "revisit adds if it holds $Y through the FOMC", "trim into <window> strength". **Nothing in the code parses or alerts on these levels.** Check them by hand against the current price and the support ladder.
- **Decision log** (`docs/DECISION-LOG.md`): every planned action, including WATCH, is written *before* acting. Each entry has a thesis, an edge, a checkable **company-specific falsifier**, a time horizon and a **REVIEW ON** date, usually the next earnings or a known catalyst. On that date, fill in: Did the falsifier fire? Was I right *for the reason I stated*?

## How to answer "should I plan to buy X later?"

1. Score it now (`python3 tools/rank.py`) and look at its DEFENDED level. Decide the price where the setup becomes attractive, meaning a defended level that holds, not just any dip.
2. List the dated events before then (`earningsDate`, `catalysts`, `fund.watchlist`). Decide whether to act before or after each binary event.
3. Write the decision-log entry, including the falsifier and the review date, and the planned level in the playbook or opportunity text.
4. Revisit on the review date or when an earnings alert fires, whichever comes first.

## Known gaps (as of Oct 2026)

- Review dates in `DECISION-LOG.md` are not read by any code, so there are no reminders. Check overdue reviews by hand (#1 SNPS's Oct 1 review is still empty).
- Planned add/trim levels in the opportunity text are not tracked or alerted.
- No stress-test or scenario engine exists beyond the bull/bear cases. The earnings buttons and the macro boost are computed but unused.
- The `riskAdj` "adjusted score" still appears in the UI even though risks were removed from the score.
