# Regard Capital

A private research desk on Vercel that combines four upstream projects:

| Page | Source | Status |
|---|---|---|
| **Monitor** (landing): market, Fed, hard-asset, SEC and watchlist news plus live TV | [UNREDACTED](https://github.com/jyr-ai/UNREDACTED) RSS engine + LiveNewsPanel | live |
| **ADE Book**: 9-view dashboard and its 3 skills | [ADE-INVESTMENTS](https://github.com/adayo22-byte/ADE-INVESTMENTS) | phase 2, needs the owner's permission |
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
- **Transforms are guarded.** Each find/replace in the manifest must match exactly `count` times, or the sync fails instead of patching silently.
- **Contract tests define "breaking".** `sync/contracts/<repo>.test.js` checks the exports, theme keys, imports and data shapes the app relies on.
- **Every page is lazy-loaded inside its own ErrorBoundary.** One broken page cannot blank the others.

Only code consumed verbatim updates automatically. Code rewritten in `adapters/` is frozen by design, and an upstream change that touches it shows up as a red PR.

## Local development

```bash
cp .env.example .env          # set APP_PASSWORD and SESSION_SECRET
npm install
npm run dev:all               # web on :3000, API on :3001 (Vite proxies /api)
npm test && npm run lint && npm run build
node sync/pull.mjs --repo unredacted --from ../UNREDACTED   # sync from a local checkout
```

## Deploying (one-time setup)

1. Vercel: import this repo. Environment variables: `APP_PASSWORD` and `SESSION_SECRET` (`openssl rand -hex 32`). `YOUTUBE_API_KEY` is optional.
2. GitHub secrets:
   - `SYNC_BOT_TOKEN`: a fine-grained personal access token for jyr-ai. It needs Contents read on UNREDACTED, Jians_finance and facai, plus Contents and Pull requests write on regard-capital. The default `GITHUB_TOKEN` cannot be used here, because PRs it opens do not trigger CI.
   - `ADE_READ_TOKEN`: only needed if ADE-INVESTMENTS is private.
3. GitHub settings:
   - Allow auto-merge.
   - Protect `main` and require the `ci` check.

## Licence

AGPL-3.0-or-later, because it includes UNREDACTED code. See [THIRD_PARTY.md](THIRD_PARTY.md).
