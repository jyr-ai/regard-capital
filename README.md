# Regard Capital

A private research desk on Vercel that combines four upstream projects:

| Page | Source | Status |
|---|---|---|
| **Monitor** (landing): market, Fed, hard-asset, SEC and watchlist news plus live TV. The watchlist is ADE's tickers plus `config/watchlist.json` | [UNREDACTED](https://github.com/jyr-ai/UNREDACTED) RSS engine + LiveNewsPanel | live |
| **ADE System**: ADE's 9-view dashboard, recoloured and refreshed daily from Yahoo Finance; add any ticker and it is scored by ADE's rules; skills and docs in a "How this is scored" drawer | [ADE-INVESTMENTS](https://github.com/adayo22-byte/ADE-INVESTMENTS) (used with the owner's permission) | live |
| **Rankings** and **Due Diligence**: Fisher 15-pt, Buffett-Munger, Lynch, 4-investor vote, swing-biotech | [Jians_finance](https://github.com/jyr-ai/Jians_finance) | phase 3 |
| **Portfolio**: Schwab/Fidelity CSV upload → recommended actions | [facai](https://github.com/jyr-ai/facai) (Fidelity parser + advisor prompts); Schwab parser is new | phase 4 |

Design system: [Afrofuturismo Digital](https://designmd.app/library/afrofuturismo-digital), dark only.

## How upstream updates arrive without breaking the app

```
upstream repo changes
  → .github/workflows/sync-upstream.yml (every 6h, or run it by hand)
  → sync/pull.mjs copies ONLY the files whitelisted in sync/manifest.json into upstream/<repo>/
  → one rolling PR per repo (branch sync/<repo>)
  → ci: lock check, lint, contract tests (sync/contracts/), build
  → green: auto-merge → Vercel deploys main
  → red:   PR stays open; production keeps the last good commit
```

The rules that make this hold:

- **`upstream/` is never edited by hand.** `npm run sync:check` (run in CI and in the Vercel build) fails if any file differs from the hashes in `upstream.lock.json`.
- **App code never imports `upstream/` directly.** Only `adapters/` may (ESLint enforces it), so an upstream rename is fixed in one file.
- **Transforms are guarded.** A strict find/replace in the manifest must match exactly `count` times, or the sync fails instead of patching silently. Cosmetic ones are marked `optional` and warn instead (see the ADE section).
- **Contract tests define "breaking".** `sync/contracts/<repo>.test.js` checks the exports, theme keys, imports and data shapes the app relies on.
- **Every page is lazy-loaded inside its own ErrorBoundary.** One broken page cannot blank the others.

### The ADE dashboard

ADE is a single 6.7k-line JSX file with its data hardcoded inline, rewritten upstream every day. Sync handles it like this:

- **Recolour.** `sync/transforms/ade-colors.json` maps ADE's 34 colours (and its two fonts) to the Afrofuturismo palette. Tints ADE builds at runtime (`color+"22"`) keep working because every target is 6-digit hex.
- **Warn, don't block.** A colour ADE adds later is left as-is and listed under "Needs attention" in the sync PR; the merge is not held up. Cosmetic patches (fonts, nav offset) are `optional` and behave the same way.
- **Contract tests** (`sync/contracts/ade.test.js`) run ADE's own `render_check.cjs`, `healthcheck.cjs` and `scrub_positions.py --check` on the file we ship. The health audit scores freshness against the clock, so the test pins the clock to the dashboard's own date; otherwise the same file grades B, then C+, then F as days pass.
- **Derived data.** `sync/derive/ade.mjs` reads each ticker's embedded verdict (score and band) and the ticker list into `derived/ade/*.json`, hashed into the lock like mirrored files. ADE's `rank.py` is not used because it needs `data/tickers.json`, which ADE git-ignores. The dashboard embeds the TOOL score only, so the DEFENDED score is not available as data.
- The dashboard is desktop-first. On a phone its panels scroll sideways inside themselves.
- **Upstream bugs fixed at sync.** ADE's Options view calls `pcRatio.toFixed` and `skew.toFixed` unguarded while its published data has them null, so the tab crashes for every ticker; the Fundamentals tab prints `undefined%` for missing metrics; the macro bar prints `(↓undefined%)` because `MACRO.cpiPrior` does not exist; the Exit Map shows `WEIGHT NaN%` because ADE scrubs the owner's share counts. Optional transforms make the first three null-safe ("n/a") and hide the Exit Map, and live data fills the values in.
- **Readability.** ADE hard-codes 6 to 14 px text. A `fontScale` transform (see `sync/manifest.json`) rewrites every `fontSize` literal to a larger size (minimum 11 px, body text 13 to 15 px), widens fixed-width text boxes and the portfolio table's px columns by the same ratio, and warns about a size it has no mapping for.
- **Stale text ADE leaves in the file.** Its "REFRESHED <date>" banner, its "WHAT'S TRUSTED / ESTIMATED" footer (it describes the owner's brokerage screenshots) and the date in its footer are replaced with lines built from the live refresh (`liveBanner`, `LEGEND` in `adapters/ade-overlay.js`, read through `globalThis.__ADE_LIVE__`).

### Live data (Yahoo Finance)

ADE publishes its numbers as hardcoded text. The app overlays live data on top, and a user can add tickers that ADE does not cover.

```
Vercel cron, weekdays 21:30 UTC   GET /api/cron/refresh-ade   (Authorization: Bearer $CRON_SECRET)
  → server/ade/service.js: for each ADE ticker + each added ticker
      Yahoo chart (2y daily) → server/ade/indicators.js   MAs, RSI, MACD, swing lows, volume nodes, fibs, pivots
      Yahoo quoteSummary     → targets, consensus, forward P/E, market cap, margins, next earnings
      Yahoo option chains    → server/ade/options.js      max pain, ATM IV, put/call, skew, implied move
      → score.js (ADE's formula, tested against rank.py) → snapshot in Redis (ade:snap:<SYM>)
GET /api/ade/live → the ADE System page → adapters/ade-overlay.js writes snapshots into ADE's S and LC
```

- **What is live:** price, 52-week range, YTD/1Y, analyst targets, consensus, forward P/E, rate sensitivity, next earnings date and EPS estimate, market cap, support ladder and broken levels, moving averages, RSI/MACD, volume, fibs, pivots, options, the verdict score, and the macro strip (S&P 500, VIX, dollar, oil, gold, bitcoin, 10-year yield, CPI, Fed funds, regime). **What is not:** ADE's written text (news, playbooks, risk cards, theses, peer tables, market themes). It keeps the numbers it was written with, changes when ADE publishes, and the page says so.
- **Forward P/E** (`server/ade/valuation.js`): Yahoo's forward P/E, else price over Yahoo's forward EPS, else price over Nasdaq's consensus EPS for the first fiscal year that has not ended (`api.nasdaq.com`, no key). A loss-making company, or EPS near zero (P/E above 500), is **n/a with the reason**, never 0 and never negative.
- **Rate sensitivity** (`server/ade/rates.js`): the correlation of daily stock returns with daily changes in the 10-year yield (`^TNX`) over up to two years, about 500 observations. LOW / MED / HIGH use the 95% significance line (2/√n, about 0.09) and 1.7 times it. ADE's own `rateSens` was a hand-typed 0-1 number; it is display-only there (its macro boost is computed and never added to the score). Typical stock correlations with yields are small and change sign between windows: treat it as a rough indicator, not a duration measure.
- **Macro strip** (`server/ade/macro.js`): Yahoo index/futures closes, the NY Fed effective rate and FOMC target range, and BLS CPI-U year over year (public API, one request a day). Each source fails alone: its fields show n/a. The regime label is RISK-ON (VIX below 20 and the S&P above its 200-day average), RISK-OFF (VIX above 25, or the S&P below it with VIX above 20), else NEUTRAL.
- **Earnings date:** Yahoo's date replaces ADE's when it is ahead and confirmed, or when ADE's has no day, is past or is TBC. A Yahoo estimate never overrides a date ADE wrote down (Yahoo's estimates can be a week off); estimates are marked (TBC), and ADE's catalyst entry for the same day follows.
- **Adding a ticker:** the box on the ADE System tab validates it with Yahoo, scores it with ADE's rules, appends it as a tab in the dashboard, and adds it to the Monitor watchlist (its news can take up to 5 minutes to appear, because the RSS engine caches each category for 5 minutes). If `ANTHROPIC_API_KEY` is set, Claude drafts the qualitative panels (story, drivers, risks, falsifier) from the Yahoo numbers; it is told not to state events it cannot know, and the result is marked unverified. Without the key, the panels hold a placeholder.
- **IV rank and percentile** need a year of implied-vol history that Yahoo does not provide. The refresh records one ATM IV per ticker per day and shows "n/a" until 20 days have accumulated.
- **Storage:** Upstash Redis when `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set. Without them it falls back to server memory, which resets on every cold start (the page says so).
- **Yahoo has no official API.** These are the unofficial endpoints the yfinance library uses; they can change or rate-limit without notice. A failed ticker is reported on the page and keeps its previous snapshot.

### Is the pipeline actually working? (diagnostics)

```bash
npm run diagnose                      # real Yahoo (and Upstash if its env vars are set): refresh, then check every stage
npm run diagnose -- --no-refresh      # check only what the store already holds
curl -H "Authorization: Bearer $CRON_SECRET" https://<your-app>/api/cron/diagnose   # 200 ok/degraded, 503 down: point an uptime monitor at it
```

The same report is on the ADE System page under **Data pipeline**. Stages: Yahoo candles, Yahoo crumb + fundamentals, Yahoo option chains, Nasdaq consensus EPS, indicator/score build, store round-trip, environment, last refresh, macro strip (each source), age of ADE's written text, and per-ticker snapshot freshness and field coverage (individual gaps are named, e.g. `TSM.consensus`). On Vercel an in-memory store or a missing secret is a **failure**; locally it is a warning.

Every dashboard field is classified in `server/ade/provenance.js` as live, computed, generated, Claude-drafted, stale (ADE's published value), not shown, or placeholder. A test fails if a field exists that is not classified, or if the overlay touches a field that is not live or computed, so made-up data cannot slip in unlabelled. No placeholder numbers are left: a value no source has is n/a. A failed cron refresh answers 502, so it shows as failed in Vercel's cron log; a refresh where most tickers failed is retried on the next page load (at most every 5 minutes) instead of counting as fresh for a day.

Only code consumed verbatim updates automatically. Code rewritten in `adapters/` is frozen by design, and an upstream change that touches it shows up as a red PR.

## Local development

```bash
cp .env.example .env          # set APP_PASSWORD and SESSION_SECRET
npm install
npm run dev:all               # web on :3000, API on :3001 (Vite proxies /api)
npm test && npm run lint && npm run build
node sync/pull.mjs --repo ade --from ../ADE-INVESTMENTS   # sync from a local checkout (python3 is needed to run the tests)
```

## Deploying (one-time setup)

1. Vercel: import this repo. Environment variables:
   - `APP_PASSWORD` and `SESSION_SECRET` (`openssl rand -hex 32`).
   - `CRON_SECRET` (any long random string; Vercel Cron sends it as a bearer token to the daily refresh).
   - Add the **Upstash Redis** integration (Storage tab). It sets the two `UPSTASH_REDIS_REST_*` variables for you.
   - Optional: `ANTHROPIC_API_KEY` (narratives for added tickers), `YOUTUBE_API_KEY`.
2. GitHub secrets:
   - `SYNC_BOT_TOKEN`: a fine-grained personal access token for jyr-ai. It needs Contents read on UNREDACTED, Jians_finance and facai, plus Contents and Pull requests write on regard-capital. The default `GITHUB_TOKEN` cannot be used here, because PRs it opens do not trigger CI. ADE-INVESTMENTS is public and needs no token.
3. GitHub settings:
   - Allow auto-merge.
   - Protect `main` and require the `ci` check.

## Licence

AGPL-3.0-or-later, because it includes UNREDACTED code. See [THIRD_PARTY.md](THIRD_PARTY.md).
