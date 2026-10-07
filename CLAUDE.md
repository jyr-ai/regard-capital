# CLAUDE.md

Regard Capital merges four upstream repos into one Vercel app. Read README.md first.

## Rules
- **Never edit anything under `upstream/`.** Only `node sync/pull.mjs` writes there. To change what is mirrored, edit `sync/manifest.json` (include/exclude/transforms) and re-sync. `npm run sync:check` fails on hand edits.
- **Never modify the upstream repos** (UNREDACTED, ADE-INVESTMENTS, Jians_finance, facai). They are read-only sources.
- **Import upstream code only from `adapters/`.** ESLint blocks `upstream/` imports elsewhere.
- **Every adapter dependency on upstream needs a contract test** in `sync/contracts/<repo>.test.js`. That test is what keeps a breaking upstream change out of production.
- Vendored UNREDACTED components import `../theme/*.js`. `vite.config.js` (themeShim) points those imports at `src/theme/`. Keep every token name and `DARK_THEME` key that upstream defines, or the contract test fails.
- **`derived/` is generated** by `sync/derive/<repo>.mjs` during sync and hashed into `upstream.lock.json`. Never edit it by hand; change the derive module and re-sync.
- **ADE is recoloured at sync time** via `sync/transforms/ade-colors.json`. A colour ADE adds is a `WARN` in the sync PR, not a failure: add it to the map. Every `text`/`accent` target must stay AA (4.5:1) on every `surface` target (the contract test enforces it) and stay 6-digit hex.
- **ADE's numbers are live; its text is not.** `adapters/ade-overlay.js` writes Yahoo snapshots into ADE's `S`/`LC` (exported by sync transforms). `sync/contracts/ade-views.test.jsx` renders every ADE view for every ticker in three situations and must stay green: it is what catches a crash in a view the default render never opens.
- **ADE's hard-coded text is rewritten at sync time, never edited by hand.** Font sizes (`fontScale`), the "REFRESHED" banner, the footer legend and date, and the Exit Map (hidden: it needs share counts ADE scrubs) are `sync/manifest.json` transforms. A new `fontSize` value ADE introduces is a `WARN`: add it to the `fontScale` map. `fontScale` must stay the last transform.
- **Macro and per-ticker n/a rules.** `adapters/ade-overlay.js` writes a live macro strip into ADE's exported `MACRO`; a field no source gave is null and the dashboard prints n/a (guard transforms). Do not default a missing forward P/E, CPI or rate sensitivity to a number.
- **Every field in an ADE block is classified in `server/ade/provenance.js`.** Add new fields there (live/computed/stale/placeholder...). Never default a missing value to a plausible number: omit it, show n/a (add a guard transform if the dashboard crashes), or classify it `placeholder` with a note.
- **Intel (`server/ade/intel.js`) never supplies a number, date, source or link.** News items reference RSS headlines by index; catalysts must cite a headline or the earnings date. Keep it that way: `toAde()` drops anything untraceable. Ratings stay ADE's formula, never model output.
- **Watchlists are per profile** (`ade:wl:<profile>`, profile = signed segment of the session cookie). ADE tickers are hidden, never deleted.
- `server/ade/score.js` is a port of ADE's `rank.py`; `server/ade/score.test.js` checks it against rank.py itself. Do not edit one without the other.
- Yahoo has no official API. All Yahoo calls live in `server/ade/yahoo.js` (injectable fetch); tests never hit the network.
- ADE's health audit depends on the clock; the contract test pins it with `sync/contracts/freeze-date.cjs`. Do not assert on a grade produced with the real clock.

## Commands
```bash
npm run dev:all        # web :3000 + api :3001
npm test               # vitest: contracts, sync engine, server
npm run lint
npm run build
npm run sync:check     # upstream/ matches upstream.lock.json
npm run diagnose       # live pipeline check against real Yahoo (see README)
node sync/pull.mjs --repo <name> [--sha <sha> | --from <local checkout>]   # python3 needed by the ADE contract tests
```

## Design system
Afrofuturismo Digital, dark only. Tokens live in `src/theme/tokens.js` and `src/theme/dark.js`.
- Sahara Gold `#E6A817` is the text accent.
- Royal Purple and Electric Violet are fills only, because they fail contrast as text.
- `UP` / `DOWN` are the gain and loss colours.
- No emoji in the UI (lucide-react icons only), no 3-equal-column layouts.
- Motion only on page and card entrances; never pulse prices or tables.
