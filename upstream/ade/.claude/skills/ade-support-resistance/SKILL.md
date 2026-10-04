---
name: ade-support-resistance
description: How the ADE dashboard uses support and resistance (swing lows, volume nodes, defended counts, broken levels) and the 0–100 timing score to decide when to buy a stock. Use when someone asks about entry timing, why a name scores Buy or Hold, what "held 11x" or "volume node" means, reward-to-risk, the TOOL vs DEFENDED ranking, or how to read the support ladder.
---

# Support, resistance and buy timing in the ADE tool

## The governing rule

From `docs/ADE-DATA-STRUCTURE.md`:

> **Support is descriptive. Technicals are directional. Options and pivots are positional.**
> Once a number is *calculated* rather than *observed*, it is not support.

Support is **only observed price history**: swing lows and high-volume price levels. Moving averages, max pain, pivot points, round numbers and analyst targets are **banned** from the support ladder. Health check #107 enforces this by requiring every label to match `Swing low | Volume node | derived`.

## Where the levels come from

The market-data sync delivers `support_resistance.swing_lows[]` (each with `price`, `held_count` and `date`), `volume_nodes[]` and `broken_support[]`. Then `tools/daily_update.py` turns them into the dashboard fields:

- **`support_ladder()`**: up to 3 levels below price.
  - Candidates are swing lows plus volume nodes, between 60% and 100% of the current price.
  - They are sorted **nearest first**, skipping any level within 2% of one already chosen.
  - If fewer than 3 are found, it pads with "Step below — derived" levels, each 7% below the last.
- **Labels**: `Swing low {date} — held {n}x`, `Volume node — {x}% below`, `Step below — derived`.
- **`brokenSup: [{lvl, held, date}]`**: former supports now *above* price. Health check #94 calls these "broken support, i.e. resistance".
- **`supportNote`**: when the first gap is over 15%, it warns "That first gap IS the risk — no observed level between here and there".

**Defended count ("held Nx")** is how many times price fell to a level and bounced. It is the strongest evidence a level matters. Volume nodes always carry `held: 0`, because they show where heavy trading happened, not where buyers stepped in.

**Resistance** shows up in three places:
- `brokenSup`: overhead levels that used to be support.
- `high52`: the 52-week high.
- The "Key Price Levels" ruler, which also plots Fibonacci levels (tagged derived) and pivots.

There is no `swingHighs` field yet, even though the data-structure doc describes one.

## The timing score (0–100)

This is `computeSignal()` in `src/ade-portfolio-v6.jsx` (search for `const cm=`), mirrored in `score()` in `tools/rank.py`:

| Component | Weight | Formula |
|---|---|---|
| Upside to consensus | 30% | `(avgPT − price)/price`, capped at ±50% |
| Reward-to-risk | 28% | `(avgPT − price) / max(price − support, 3% × price)`, capped at 6× |
| Support quality | 17% | 60% × distance score (0–30% scale, closer is better) + 40% × min(held, 6)/6 |
| Momentum | 15% | 65% × RSI headroom to 70 (`(70 − RSI)/35`) + 35% if the MACD histogram is positive |
| Structural integrity | 10% | 1 − 0.2 × number of broken levels above price |

**Bands:** above 84 Strong Buy · 69–84 Buy · 39–69 Hold · below 39 Trim/Avoid (the dashboard splits this into below 39 Trim and below 24 Avoid).

The 3% floor exists because support 0.4% below would otherwise produce ratios above 100×, which are true but meaningless.

## TOOL vs DEFENDED: always check both

`python3 tools/rank.py` scores every name two ways:
- **TOOL** uses the nearest ladder level (`support[0]`), which may be a never-defended volume node.
- **DEFENDED** uses the best-quality swing low with `held_count ≥ 1`.

When the two differ by more than about 15 points, **trust DEFENDED and treat the gap as the finding** (`METHODOLOGY.md`). For example, a name can show a node 1% below and a defended level 66% below. The tool score flatters it, because its real downside is unmeasured.

## Reading a setup to decide when to buy

1. **Where is the nearest *defended* level, and how far below?** A level held 6× or more, close to price, is the best combination. The `DECISION-LOG` example reads: "A move to $405.51 (defended 6 times) that HOLDS. A 3–4% dip lands between levels and isn't the same thing."
2. **How many levels are broken overhead?** Each one is supply and costs 20% of the structure score. Six or more broken levels means the immediate floor "keeps looking strong right until it fails".
3. **Reward-to-risk measured to the defended level**, not to an MA or max pain. Mis-anchoring once made NVDA read 11.3× when the honest figure was about 2–3×.
4. **Momentum as confirmation, not a trigger.** Low RSI with a negative MACD can mean it falls further first. Decide in advance whether that is a signal or noise.
5. **Write the entry first** (`docs/DECISION-LOG.md`): thesis, edge, a *company-specific* falsifier and a review date. A price-only falsifier fires on any market selloff and tells you nothing about the company.

Defended counts "buy odds, not certainty". Levels held 8, 9 and 18 times have broken in this book.

## Data hygiene the health check enforces

- No support level at or above price (#94, −10).
- No level more than 5% above price, and none more than 50% below.
- S1 more than 35% below is flagged as irrelevant (#106).
- Provenance labels must be correct (#107).
- `techDate` refreshed daily.
- Max pain must not use an expiry under 7 days (#110).

## Known gaps (as of Oct 2026)

- **Ladder order**: the code sorts by proximity, but `ADE-DATA-STRUCTURE.md` says levels should be ordered by strength. Use `rank.py`'s DEFENDED column for strength.
- **Conviction Ranker**: its comments say "nearest DEFENDED support", but the code uses `support[0]`. It also uses slightly different weights (28/27/15/15/10 plus 5% signal).
- **Lookback window**: the spec says 250 days for swing lows, but the reports say 400. Confirm against the sync script.
- **RSI thresholds**: driver text calls RSI below 40 "oversold", while `rsiZone` uses below 35.
- **No health check flags an untested (0×) nearest level.** Only `rank.py` surfaces it.
