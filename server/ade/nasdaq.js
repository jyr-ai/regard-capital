// Nasdaq's public analyst-estimate API: consensus EPS by fiscal year. No key. It is the
// fallback for forward P/E when Yahoo reports no forward EPS (see build.js `forwardPE`).
// `fetchImpl` is injectable so tests never touch the network.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

// "Dec 2026" -> the last day of that month (UTC), so "has this fiscal year ended yet" is a plain comparison.
export function fiscalEnd(label) {
  const m = /^([A-Za-z]{3})[a-z]*\.?\s+(\d{4})$/.exec(String(label ?? '').trim())
  const mi = m ? MONTHS.indexOf(m[1].toLowerCase()) : -1
  return mi < 0 ? null : new Date(Date.UTC(+m[2], mi + 1, 0))
}

export function createNasdaq({ fetchImpl = fetch, timeoutMs = 8_000 } = {}) {
  // [{ fiscalEnd: 'Dec 2026', end: Date, eps: 1.28, analysts: 11 }], oldest first. Throws on any failure.
  async function yearlyEps(symbol) {
    const sym = encodeURIComponent(String(symbol).replace('-', '.').toLowerCase())
    const res = await fetchImpl(`https://api.nasdaq.com/api/analyst/${sym}/earnings-forecast`, {
      headers: { 'User-Agent': UA, Accept: 'application/json' },
      signal: AbortSignal.timeout(timeoutMs),
    })
    if (!res.ok) throw new Error(`Nasdaq estimates ${res.status} for ${symbol}`)
    const rows = (await res.json())?.data?.yearlyForecast?.rows
    if (!Array.isArray(rows)) throw new Error(`Nasdaq has no estimates for ${symbol}`)
    return rows
      .map(r => ({ fiscalEnd: r.fiscalEnd, end: fiscalEnd(r.fiscalEnd), eps: Number(r.consensusEPSForecast), analysts: Number(r.noOfEstimates) || null }))
      .filter(r => r.end && Number.isFinite(r.eps))
  }
  return { yearlyEps }
}
