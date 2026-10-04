# ADE Refresh Protocol
**Established Sep 3, 2026.** When Dayo says *"refresh"*, *"update the tool"*, or *"make sure it's accurate"*, run every step below in order. Do not report back until Step 5 returns CLEAN.

---

## The rule this exists to enforce

> **Fix fields that EXIST, not fields you REMEMBER.**
>
> Five separate passes were needed on Sep 3 because each time I updated the fields I had touched before, and each time a rendered panel exposed one I had never enumerated: `verdict.drivers` → `supportAnchor`/`stopNote`/`note` → `story` → the global `REFRESHED` banner. Enumeration is not optional.

---

## STEP 0 — Environment

```bash
cp /mnt/user-data/outputs/ade-portfolio-v6.jsx /home/claude/ade-portfolio-v6.jsx
cp /home/claude/ade-portfolio-v6.jsx /home/claude/ade-portfolio-v6.BACKUP.jsx
cd /home/claude && npm install @babel/parser react react-dom @babel/core @babel/preset-react --silent
```
Rebuild `extract-hc.cjs`, `build-runner.py`, `harness.cjs`. The container resets between sessions.

**Backup before every edit.** A regex overran a string boundary on Sep 3 and truncated the file's tail; the backup was the only recovery.

---

## STEP 1 — ENUMERATE (never skip)

Before editing anything, list every string field that exists in a ticker block:

```python
for m in re.finditer(r'(\w+):"((?:[^"\\]|\\.){8,})"', seg):
```

Print field name, count, one sample. **Known population: 44 distinct string fields per ticker.** If the enumeration returns fewer, the block boundaries are wrong.

Also enumerate **global fields outside ticker blocks** — the `REFRESHED` banner, footer disclaimer, `staleNarrativeTerms`, opportunity cards. This is the step that was missed for five passes.

---

## STEP 2 — APPLY API DATA

From `tickers.json`, per ticker:

| Target field | Source |
|---|---|
| `price`, `LC` map | `close.official_4pm_close` — verify `is_official_close: true` |
| `ma:{d50,d100,d200,d400}` | `indicators.sma_*` |
| `rsi`, `rsiZone` | `indicators.rsi_14` |
| `macd:{v,s,h,cross}` | `indicators.macd` |
| `support[]` | `support_resistance.strongest_support` — **swing lows only** |
| `brokenSup[]` | `support_resistance.broken_support` |
| `maxPain` | `options.max_pain_heaviest_expiration` — **never the nearest** |
| `volume:{avg,recent,ratio,obv,accDist,lastDay,lastDayX}` | computed from `history.candles` |
| `high52`, `low52` | max/min over the last 252 candles |
| `ytd` | vs the first close on/after Jan 1 |

### Traps that have actually fired
- **`rsi:null`** — a `[0-9.]+` pattern silently skips it. Match `(null|[0-9.]+)`.
- **`ma:{align:...}` with no `d50`** — 5 tickers store MAs only inside `brk[]`. A regex requiring `ma:{d50:` skips them entirely.
- **Sub-$20 tickers** (SOFI) need 2-decimal storage; integers lose too much.
- **Write the file inside the loop.** Two scripts errored mid-run and lost every change because the write was after the loop.

---

## STEP 3 — REWRITE PROSE

Every field that describes *current state* must lead with the current price as its first `$` figure.

| Field | Must contain |
|---|---|
| `verdict.drivers` | price, MA position, RSI, MACD, nearest defended support + held-count, broken count, next earnings |
| `note` | price, RSI, MA position, broken count, next earnings |
| `supportAnchor` | the actual `support[]` ladder with held-counts and dates |
| `stopNote` | whether the stop is a risk budget or sits under a defended level |
| `story` | price, durable thesis, last **verified** quarter, next earnings |
| `pb("1 WEEK")` / `pb("1 MONTH")` | price first, current setup, macro overlay |
| `inst` | ownership substance + current consensus. **No dead analyst PTs.** |

**Never in live prose:** share counts, position dollar values. Dated news items keep theirs — those are historical record.

**Set `fundVerified:false`** wherever the latest quarter has not been sourced. Never relabel `lastQ` without refreshing the metrics underneath it.

---

## STEP 4 — GLOBAL FIELDS

Outside ticker blocks:
- `REFRESHED <date> POST-CLOSE` banner
- Footer disclaimer date
- `MACRO` block + `macroDate`
- Opportunity cards (`thesis`, `play`, `sizing`, `opp`, `timeframe`)
- `oppPriceChecks` reference prices
- `staleNarrativeTerms` — **these are DETECTORS.** They are supposed to contain stale patterns. Never "fix" them; only update their `note` text.

---

## STEP 5 — AUDIT (must return CLEAN before reporting)

Scan the **whole file**, not just ticker blocks.

```python
# News items carry their date AFTER the text — look FORWARD, not backward
in_news = bool(re.search(r'","\d{4}-\d{2}-\d{2}",-?[0-9.]+,"\w",\d+', src[end:end+600])) and 'n(' in src[start-600:start]
```

Getting this backwards on Sep 3 misclassified 38 legitimate records as stale and 23 stale prose fields as legitimate.

**Tests that must all return zero:**

1. Share counts in live prose (news items excluded)
2. Oil cited above $95 (detector strings excluded)
3. VIX above 22 outside a conditional/trigger context
4. `REFRESHED` banner not current
5. Footer date not current
6. Date fields older than 7 days — report the ticker and field
7. Current-state prose whose first `$` figure is more than 5% from price
8. Unmarked past dates in forward-looking prose (no ✓)
9. Every `ma`, `rsi`, `macd` value matching `tickers.json` within 1.2%
10. `support[0]` below price; `hardStop` below `support[0]` **or** flagged as a risk budget

**Known false positives — exclude by structure, not by guessing:**
- `staleNarrativeTerms` (detectors)
- Risk triggers phrased conditionally ("VIX >25", "oil >$95 for 3 months")
- `path` / `price` scenario ranges in bull/bear cases
- Dated news items
- Support ladders whose first `$` is a level, not a price

---

## STEP 6 — VALIDATE AND DEPLOY

```bash
node -e "require('@babel/parser').parse(...)"   # PARSE OK
node harness.cjs                                 # RENDER OK
node extract-hc.cjs && python3 build-runner.py && node health-runner.mjs
cp ade-portfolio-v6.jsx /mnt/user-data/outputs/
```

**Never report success on a rising score alone.** The score climbed on Sep 3 while a panel still read "Aug 7 next earnings." Step 5 is the gate, not the score.

---

## Standing caveats to restate every time

- **IV rank is null on all 21** until ~20 daily sync runs accumulate. No options structures off this file.
- **`fundVerified:false`** on any ticker whose latest quarter is unsourced.
- **ASML price target** is the one unverified target.
- Health-check items **OPTIONS**, **SUPPORT DIST** and **PT FRESHNESS** currently penalise *correct* data — the checks predate the observed-support model and need recalibration.

---

## Checks to add to `health-runner.mjs`

None of these exist yet, and each corresponds to something that was wrong for weeks:

1. `verdict.drivers` staleness
2. Global `REFRESHED` banner date
3. Footer disclaimer date
4. Share counts in live prose
5. `volume` block vs candle data
6. `high52` / `low52` vs candle data
7. `ytd` vs the January open
8. `story` price and quarter currency
9. `ma` block completeness — flag `align`-only blocks
10. `rsi:null`

Until these ship, Step 5 is the enforcement mechanism and it is manual.
