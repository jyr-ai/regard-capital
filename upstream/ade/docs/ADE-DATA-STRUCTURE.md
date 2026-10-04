# ADE Dashboard — Canonical Data Structure
**Established Sep 3, 2026.** This is the organizing principle for every field in `ade-portfolio-v6.jsx`.

---

## The governing rule

> **Support is descriptive. Technicals are directional. Options and pivots are positional.**
>
> Once a number is *calculated* rather than *observed*, it is not support — no matter how useful it is.

Three different questions, three different tabs. A field lives where its question lives, and never appears in two places.

---

## 1. SUPPORT / RESISTANCE
**Question: where has price actually been defended?**

Historical price action only. Every level carries a date and a defended-count.

| Field | Definition | Source |
|---|---|---|
| `swingLows[]` | Local minima, 250-day lookback, 10+ clear days each side | candles |
| `swingHighs[]` | Same method, resistance side | candles |
| `volumeNodes[]` | 3 highest-volume price levels, 1% bins, 250 days | candles |
| `high52` / `low52` | 52-week extremes | candles |
| `fibs[]` | Retracements from 52w high to 52w low — tag `derived:true` | calculated from observed anchors |

**Ranking rule:** a level defended 3+ times outranks one defended once. A high-volume node outranks a low-volume one. The ladder is ordered by *strength*, not merely by distance from price.

**Each level stores:** `lvl`, `date`, `heldCount`, `method`, `derivedOn`.

### Explicitly banned from this tab
- Moving averages of any length
- Max pain
- Pivot points
- Round numbers, analyst targets, or any judgment level

Fibonacci is the single tolerated exception, because its anchors are observed prices — but it must be tagged `derived:true` so it is never mistaken for a defended level.

---

## 2. TECHNICALS
**Question: what is the trend, and how strong?**

| Field | Definition |
|---|---|
| `ma:{d50,d100,d200,d400}` | Simple moving averages, computed from 400 trading days |
| `align` | bullish / mixed / bearish |
| `rsi` + `rsiZone` | RSI-14 |
| `macd:{v,s,h,cross}` | MACD, signal, histogram |
| `volume:{avg,recent,ratio}` | Participation |
| `pctFrom50d` etc. | Price distance from each MA |

Answers *is this healthy and which way is it moving*. **Never** *where does it stop falling*.

---

## 3. OPTIONS / POSITIONING
**Question: where is other people's money clustered?**

| Field | Definition |
|---|---|
| `maxPain` | **Heaviest** expiration — the structurally meaningful one |
| `maxPainExp` / `maxPainDTE` / `maxPainOI` | Provenance for the above |
| `maxPainNear` / `maxPainNearExp` / `maxPainNearDTE` | Nearest expiry, **labeled short-lived** |
| `atmIV` | At-the-money implied volatility |
| `ivRank` | **null until ~20 daily readings accumulate** |
| `pivots:{P,S1,S2,S3,R1,R2,R3}` | Classic pivots, weekly and monthly |

### Why pivots live here, not in Support
Pivots are a **coordination mechanism**, not a memory. They work because many participants compute the same number, not because price ever defended it. That is the same logic as max pain.

Both also **expire** — a daily pivot is void tomorrow, a weekly one dies Friday, max pain resets each cycle. Grouping by shelf life puts them together naturally.

**Notation discipline:** `S1/S2/S3` is reserved *exclusively* for pivot points. The support ladder uses `Support 1 / 2 / 3`. Two different concepts must never share notation again.

---

## 4. RISK / REWARD
**Question: what is the asymmetry?**

| Field | Definition |
|---|---|
| `avgPT` / `highPT` / `lowPT` | S&P Global consensus |
| Upside | To consensus and to street high |
| **Downside** | **To the strongest defended support** — not an MA, not max pain |
| `hardStop` | Separate risk-budget number, 8–13%, stated as a budget not a level |
| `rr` | Computed from the defended support only |

**The rule that caused the last error:** R:R must anchor to a defended level. Using tomorrow's max pain made NVDA read 11.3x when the honest figure was roughly 2–3x.

---

## 5. CONVICTION
**Question: do the layers agree, and where don't they?**

Composite score, and — more valuable — the **explicit disagreements**:

- AVGO: worst momentum, best asymmetry
- VST: below every moving average, second-highest upside
- HOOD: extended, above consensus, positioning 20% below

Cross-tab tension is the highest-value output the tool produces. It gets a home here.

---

## Provenance labels (all tabs)

| Tag | Meaning |
|---|---|
| `VERIFIED <date>` | Pulled or computed from the market-data API |
| `S&P Global <date>` | Analyst data, web-sourced |
| `derived` | Calculated from observed anchors (Fibonacci) |
| `est` | Judgment. **Should not exist once candles land.** |

---

## Current status (Sep 3, 2026)

| Tab | State |
|---|---|
| Support/Resistance | ⚠️ Using moving averages as a placeholder. Needs `history.candles` in `sync.py`. |
| Technicals | ✅ Verified, all 21 |
| Options | ✅ Max pain split near/heavy. IV rank null pending ~20 runs. |
| Risk/Reward | ⚠️ Anchored to MAs until swing lows exist |
| Conviction | ⚠️ Composite computed ad hoc, not yet a tab |

**Next action:** add `history.candles` and the `support_resistance` block to `sync.py`. That is the last dependency before this structure is fully honest.
