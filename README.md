# Regard Capital

A private research desk on Vercel that combines four upstream projects:

| Page | Source | Status |
|---|---|---|
| **Monitor** (landing): market, Fed, hard-asset, SEC and watchlist news plus live TV. The watchlist is ADE's tickers plus `config/watchlist.json` | [UNREDACTED](https://github.com/jyr-ai/UNREDACTED) RSS engine + LiveNewsPanel | live |
| **ADE Book**: ADE's 9-view dashboard, recoloured, plus its skills and docs in a "How this is scored" drawer | [ADE-INVESTMENTS](https://github.com/adayo22-byte/ADE-INVESTMENTS) (used with the owner's permission) | live |
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

1. Vercel: import this repo. Environment variables: `APP_PASSWORD` and `SESSION_SECRET` (`openssl rand -hex 32`). `YOUTUBE_API_KEY` is optional.
2. GitHub secrets:
   - `SYNC_BOT_TOKEN`: a fine-grained personal access token for jyr-ai. It needs Contents read on UNREDACTED, Jians_finance and facai, plus Contents and Pull requests write on regard-capital. The default `GITHUB_TOKEN` cannot be used here, because PRs it opens do not trigger CI. ADE-INVESTMENTS is public and needs no token.
3. GitHub settings:
   - Allow auto-merge.
   - Protect `main` and require the `ci` check.

## Licence

AGPL-3.0-or-later, because it includes UNREDACTED code. See [THIRD_PARTY.md](THIRD_PARTY.md).
