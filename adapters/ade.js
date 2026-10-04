// ADE data derived at sync time (sync/derive/ade.mjs). Plain JSON, so both the browser
// bundle and the Express server can import it.
import verdictsFile from '../derived/ade/verdicts.json' with { type: 'json' }
import watchlist from '../derived/ade/watchlist.json' with { type: 'json' }

// ADE's own verdict bands, best to worst.
export const BANDS = ['STRONG BUY', 'BUY', 'HOLD', 'TRIM/AVOID']

export const adeWatchlist = watchlist // [{ ticker, name }]
export const adeAsOf = verdictsFile.asOf // 'YYYY-MM-DD', the dashboard's own date
export const adeVerdicts = verdictsFile.tickers // { MU: { name, price, avgPT, upsidePct, score, band, ... } }

export function bandCounts(verdicts = adeVerdicts) {
  const counts = Object.fromEntries(BANDS.map(b => [b, 0]))
  for (const v of Object.values(verdicts)) if (v.band in counts) counts[v.band]++
  return counts
}
