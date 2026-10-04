// Forward P/E from real estimates only, in order: Yahoo's own forward P/E, Yahoo's forward EPS,
// then Nasdaq's consensus EPS for the current fiscal year. A loss-making company has no P/E: it
// returns null with the reason, never 0 and never a negative multiple.

import { raw } from './yahoo.js'

const MAX_PE = 500 // above this the EPS is ~0 and the multiple says nothing
const r1 = x => Math.round(x * 10) / 10
const usd = x => `${x < 0 ? '-' : ''}$${Math.abs(x).toFixed(2)}`

export function forwardPE({ price, summaryDetail: sd, keyStats: ks, nasdaq = null, now = new Date() }) {
  const yahooPE = raw(sd?.forwardPE) ?? raw(ks?.forwardPE)
  const yahooEps = raw(ks?.forwardEps)
  const ok = pe => pe > 0 && pe <= MAX_PE

  if (ok(yahooPE)) return { pe: r1(yahooPE), basis: 'Yahoo consensus forward EPS', note: null }
  if (yahooEps > 0 && ok(price / yahooEps)) return { pe: r1(price / yahooEps), basis: 'Yahoo forward EPS', note: null }

  if (yahooPE != null || yahooEps != null) {
    // The sign of Yahoo's forward P/E is the sign of its forward EPS.
    if ((yahooEps ?? yahooPE) <= 0) return { pe: null, basis: null, note: `n/a, loss-making${yahooEps != null ? ` (forward EPS ${usd(yahooEps)})` : ''}` }
    return { pe: null, basis: null, note: 'n/a, forward EPS is near zero' }
  }

  // Yahoo has no forward EPS at all: use the first fiscal year that has not ended yet.
  const year = nasdaq?.find(r => r.end >= now)
  if (year) {
    if (year.eps <= 0) return { pe: null, basis: null, note: `n/a, loss-making (FY ${year.fiscalEnd} consensus EPS ${usd(year.eps)})` }
    if (ok(price / year.eps)) return { pe: r1(price / year.eps), basis: `Nasdaq consensus EPS, FY ${year.fiscalEnd}`, note: null }
    return { pe: null, basis: null, note: 'n/a, forward EPS is near zero' }
  }
  return { pe: null, basis: null, note: 'n/a, no analyst estimates' }
}
