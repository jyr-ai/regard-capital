// ADE's options fields, from Yahoo option chains: max pain (on the heaviest monthly expiry,
// never a sub-7-day one, per ADE's health check #110, and on the nearest expiry), ATM implied
// volatility, put/call open-interest ratio, skew, and the implied move into earnings.
// IV rank/percentile need history Yahoo does not give: the service accumulates it (see ivStats).

const DAY = 86400_000
const isoDate = epoch => new Date(epoch * 1000).toISOString().slice(0, 10)
const dteOf = (epoch, now) => Math.max(0, Math.round((epoch * 1000 - now) / DAY))
const sum = xs => xs.reduce((a, b) => a + b, 0)

// Third-Friday monthly expiries (UTC dates).
function isMonthly(epoch) {
  const d = new Date(epoch * 1000)
  return d.getUTCDay() === 5 && d.getUTCDate() >= 15 && d.getUTCDate() <= 21
}

// Strike that minimises the total payout to option holders (open interest x 100 shares).
export function maxPain(calls, puts) {
  const strikes = [...new Set([...calls, ...puts].map(c => c.strike))].sort((a, b) => a - b)
  if (!strikes.length) return null
  let best = null
  for (const k of strikes) {
    const pain = sum(calls.map(c => (c.openInterest || 0) * Math.max(0, k - c.strike))) + sum(puts.map(p => (p.openInterest || 0) * Math.max(0, p.strike - k)))
    if (best === null || pain < best.pain) best = { strike: k, pain }
  }
  return best.strike
}

const totalOI = (calls, puts) => sum(calls.map(c => c.openInterest || 0)) + sum(puts.map(p => p.openInterest || 0))

const nearestStrike = (list, price) => list.reduce((b, c) => (b === null || Math.abs(c.strike - price) < Math.abs(b.strike - price) ? c : b), null)

// Average implied vol of the call and put at the strike nearest the money, in percent.
export function atmIV(calls, puts, price) {
  const c = nearestStrike(calls.filter(x => x.impliedVolatility > 0.01), price)
  const p = nearestStrike(puts.filter(x => x.impliedVolatility > 0.01), price)
  const ivs = [c, p].filter(Boolean).map(x => x.impliedVolatility * 100)
  return ivs.length ? Math.round((sum(ivs) / ivs.length) * 100) / 100 : null
}

// ATM straddle price as a percent of the stock price.
export function impliedMove(calls, puts, price) {
  const c = nearestStrike(calls, price)
  const p = nearestStrike(puts, price)
  if (!c || !p) return null
  const mid = o => (o.bid > 0 && o.ask > 0 ? (o.bid + o.ask) / 2 : o.lastPrice)
  const straddle = mid(c) + mid(p)
  return straddle > 0 ? Math.round((straddle / price) * 1000) / 10 : null
}

// Call IV minus put IV at +-10% from the money, in percentage points (ADE's convention: positive
// means calls are bid over puts). Wing IVs from Yahoo are noisy, so both must be real quotes.
export function skew(calls, puts, price) {
  const c = nearestStrike(calls.filter(x => x.impliedVolatility > 0.01 && x.strike >= price * 1.05), price * 1.1)
  const p = nearestStrike(puts.filter(x => x.impliedVolatility > 0.01 && x.strike <= price * 0.95), price * 0.9)
  if (!c || !p) return null
  return Math.round((c.impliedVolatility - p.impliedVolatility) * 1000) / 10
}

// IV rank/percentile need a year of IV history, which Yahoo does not provide. The service records
// one ATM IV per day; with fewer than MIN_OBS observations they stay null, as in ADE's own data.
export const MIN_OBS = 20
export function ivStats(history, current) {
  const ivs = history.map(h => h.iv)
  if (current == null || ivs.length < MIN_OBS) return { ivRank: null, ivPctl: null, ivObs: ivs.length }
  const lo = Math.min(...ivs)
  const hi = Math.max(...ivs)
  return {
    ivRank: hi === lo ? 50 : Math.round(((current - lo) / (hi - lo)) * 100),
    ivPctl: Math.round((ivs.filter(v => v < current).length / ivs.length) * 100),
    ivObs: ivs.length,
  }
}

// Append today's reading (one per date), keeping the last 260 trading days.
export function recordIV(history, date, iv) {
  if (iv == null) return history
  return [...history.filter(h => h.d !== date), { d: date, iv }].slice(-260)
}

// `yahoo.options(sym, { date })` returns { expirations, price, expiry, calls, puts }.
export async function buildOptions(yahoo, symbol, { now = Date.now(), earningsEpoch = null } = {}) {
  const first = await yahoo.options(symbol)
  const price = first.price
  if (!price || !first.calls.length) throw new Error('empty option chain')

  const monthlies = first.expirations.filter(e => isMonthly(e) && dteOf(e, now) >= 7 && dteOf(e, now) <= 70).slice(0, 3)
  const chains = new Map([[first.expiry, first]])
  for (const e of monthlies) {
    if (chains.has(e)) continue
    try { chains.set(e, await yahoo.options(symbol, { date: e })) } catch { /* a missing expiry just narrows the choice */ }
  }
  // Earnings straddle: the first expiry on or after the earnings date, if one is close enough to fetch.
  let earningsChain = null
  if (earningsEpoch) {
    const e = first.expirations.find(x => x >= earningsEpoch && dteOf(x, now) <= 70)
    if (e) earningsChain = chains.get(e) ?? await yahoo.options(symbol, { date: e }).catch(() => null)
  }

  const all = [...chains.values()]
  const monthly = all.filter(c => monthlies.includes(c.expiry))
  const heavy = (monthly.length ? monthly : all).reduce((b, c) => (totalOI(c.calls, c.puts) > totalOI(b.calls, b.puts) ? c : b))
  const near = first
  const atmChain = all.reduce((b, c) => (Math.abs(dteOf(c.expiry, now) - 30) < Math.abs(dteOf(b.expiry, now) - 30) ? c : b))

  const heavyCalls = heavy.calls
  const heavyPuts = heavy.puts
  const callOI = sum(heavyCalls.map(c => c.openInterest || 0))
  const putOI = sum(heavyPuts.map(p => p.openInterest || 0))

  return {
    maxPain: maxPain(heavy.calls, heavy.puts),
    maxPainExp: isoDate(heavy.expiry),
    maxPainDTE: dteOf(heavy.expiry, now),
    maxPainOI: totalOI(heavy.calls, heavy.puts),
    maxPainNear: maxPain(near.calls, near.puts),
    maxPainNearExp: isoDate(near.expiry),
    maxPainNearDTE: dteOf(near.expiry, now),
    atmIV: atmIV(atmChain.calls, atmChain.puts, price),
    atmIVExp: isoDate(atmChain.expiry),
    pcRatio: callOI ? Math.round((putOI / callOI) * 100) / 100 : null,
    impliedMove: earningsChain ? impliedMove(earningsChain.calls, earningsChain.puts, price) : null,
    ivRank: null,
    ivPctl: null,
    skew: skew(atmChain.calls, atmChain.puts, price),
    ivObs: 0,
  }
}
