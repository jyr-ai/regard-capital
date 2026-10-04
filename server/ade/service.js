// ADE live data: refresh Yahoo snapshots, keep the user's added tickers, and serve both.
//
// Storage keys:
//   ade:tickers        string[]                  tickers the user added
//   ade:snap:<SYM>     snapshot (build.js)       latest Yahoo snapshot, refreshed daily
//   ade:meta           { refreshedAt, failed[] } last full refresh
//   ade:macro          macro.js output           index/rate/CPI strip, refreshed with the tickers
//
// Optional extras, injected so tests never touch the network: `nasdaq` (consensus EPS, the forward
// P/E fallback) and `fetchImpl` (NY Fed + BLS for the macro strip). Without them those are skipped.

import { adeWatchlist } from '../../adapters/ade.js'
import { buildBlock, buildSnapshot } from './build.js'
import { buildMacro } from './macro.js'
import { buildOptions, ivStats, recordIV } from './options.js'
import { runDiagnostics } from './diagnose.js'
import { raw } from './yahoo.js'
import { YahooError, normalizeSymbol } from './yahoo.js'

export const MAX_ADDED = 25
const STALE_MS = 20 * 60 * 60 * 1000 // refresh on read when the last successful refresh is older than this
const RETRY_MS = 5 * 60 * 1000 // after a failed refresh, retry on read at most this often (do not hammer Yahoo)

export function createAdeService({ store, yahoo, adeTickers = adeWatchlist, prose = null, nasdaq = null, fetchImpl = null, now = () => new Date() }) {
  const snapKey = sym => `ade:snap:${sym}`

  async function added() {
    return (await store.get('ade:tickers')) ?? []
  }

  // Option chains are optional: a ticker without listed options, or a Yahoo hiccup, just means
  // no options numbers (ADE's own values stay for its tickers).
  async function optionsFor(sym, summary) {
    try {
      const earnings = summary?.calendarEvents?.earnings?.earningsDate?.map(raw).filter(Boolean)?.[0] ?? null
      return await buildOptions(yahoo, sym, { now: now().getTime(), earningsEpoch: earnings })
    } catch {
      return null
    }
  }

  // Yahoo carries the yield (^TNX) like any other symbol; one 2-year series serves every ticker in a refresh.
  let yields = { at: 0, pending: null }
  function yieldCandles() {
    if (!yields.pending || now() - yields.at >= 10 * 60_000) {
      yields = { at: +now(), pending: yahoo.chart('^TNX').then(c => c.candles, () => null) } // the promise is shared by concurrent tickers
    }
    return yields.pending
  }

  // Consensus EPS matters only when Yahoo has no forward EPS, so ask Nasdaq only then.
  async function nasdaqFor(sym, summary) {
    const ks = summary?.defaultKeyStatistics
    if (!nasdaq || raw(summary?.summaryDetail?.forwardPE) != null || raw(ks?.forwardPE) != null || raw(ks?.forwardEps) != null) return null
    return nasdaq.yearlyEps(sym).catch(() => null)
  }

  async function gather(sym) {
    const [chart, summary] = await Promise.all([yahoo.chart(sym), yahoo.summary(sym).catch(() => null)])
    const [options, est, rates] = await Promise.all([optionsFor(sym, summary), nasdaqFor(sym, summary), yieldCandles()])
    return { chart, summary, options, nasdaq: est, yields: rates }
  }

  // Fold today's ATM IV into the symbol's history and derive IV rank/percentile from it.
  async function withIvHistory(sym, options) {
    if (!options) return options
    const day = now().toISOString().slice(0, 10)
    const history = recordIV((await store.get(`ade:iv:${sym}`)) ?? [], day, options.atmIV)
    await store.set(`ade:iv:${sym}`, history)
    return { ...options, ...ivStats(history, options.atmIV) }
  }

  async function fetchSnapshot(sym) {
    const g = await gather(sym)
    const { chart, summary } = g
    const options = await withIvHistory(sym, g.options)
    const snap = buildSnapshot({ symbol: sym, candles: chart.candles, meta: chart.meta, summary, options, nasdaq: g.nasdaq, yields: g.yields }, { now: now() })
    await store.set(snapKey(sym), snap)
    return snap
  }

  // The macro strip. A failure keeps yesterday's strip (marked by its own date) rather than blanking it.
  async function refreshMacro() {
    if (!fetchImpl) return null
    try {
      const m = await buildMacro({ yahoo, fetchImpl, now: now() })
      if (m.sources.some(x => x.ok)) await store.set('ade:macro', m)
      return m
    } catch { return null }
  }

  // Refresh every ADE ticker and every added ticker. One failure never stops the rest.
  async function refreshAll() {
    const symbols = [...new Set([...adeTickers.map(t => t.ticker), ...(await added())])]
    const failed = []
    yields = { at: 0, pending: null } // a refresh starts from a fresh yield series
    await refreshMacro()
    const CONCURRENCY = 5
    for (let i = 0; i < symbols.length; i += CONCURRENCY) {
      await Promise.all(symbols.slice(i, i + CONCURRENCY).map(async sym => {
        try { await fetchSnapshot(sym) } catch (e) { failed.push({ symbol: sym, error: e.message }) }
      }))
    }
    // `ok` means most tickers refreshed. A refresh where Yahoo refused us (blocked IP, outage) must not
    // count as fresh, or the page would show "live" data and not retry for a day.
    const meta = { refreshedAt: now().toISOString(), count: symbols.length, failed, ok: failed.length * 2 <= symbols.length }
    await store.set('ade:meta', meta)
    return meta
  }

  // What the dashboard needs: snapshots for ADE's own tickers (overlay) and full blocks for
  // added ones. Refreshes inline when nothing has been refreshed in a while.
  async function live() {
    let meta = await store.get('ade:meta')
    const age = meta ? now() - new Date(meta.refreshedAt) : Infinity
    if (!meta || (meta.ok !== false ? age > STALE_MS : age > RETRY_MS)) meta = await refreshAll()
    const addedList = await added()
    const overlay = {}
    for (const { ticker } of adeTickers) {
      const snap = await store.get(snapKey(ticker))
      if (snap) overlay[ticker] = snap
    }
    const blocks = {}
    for (const sym of addedList) {
      const snap = await store.get(snapKey(sym))
      const extra = await store.get(`ade:prose:${sym}`)
      if (snap) blocks[sym] = { block: buildBlock(snap, extra, { today: now() }), snapshot: snap }
    }
    const macro = (await store.get('ade:macro')) ?? null
    return { refreshedAt: meta.refreshedAt, ok: meta.ok !== false, failed: meta.failed, store: store.kind, overlay, added: blocks, macro }
  }

  async function addTicker(input) {
    const sym = normalizeSymbol(input)
    if (adeTickers.some(t => t.ticker === sym)) throw new YahooError(`${sym} is already in the ADE book`, { status: 409 })
    const list = await added()
    if (list.includes(sym)) throw new YahooError(`${sym} is already on your list`, { status: 409 })
    if (list.length >= MAX_ADDED) throw new YahooError(`You can add up to ${MAX_ADDED} tickers. Remove one first.`, { status: 422 })

    const g = await gather(sym)
    const { chart, summary } = g
    const options = await withIvHistory(sym, g.options)
    const type = chart.meta?.instrumentType
    if (type && type !== 'EQUITY' && type !== 'ETF') throw new YahooError(`${sym} is a ${type.toLowerCase()}; ADE scores stocks and ETFs`, { status: 422 })
    const snap = buildSnapshot({ symbol: sym, candles: chart.candles, meta: chart.meta, summary, options, nasdaq: g.nasdaq, yields: g.yields }, { now: now() })

    let drafted = null
    let proseNote = null
    if (prose) {
      try { drafted = await prose.draft(snap) } catch (e) { proseNote = `Narrative not drafted: ${e.message}` }
    } else proseNote = 'Narrative not drafted: no ANTHROPIC_API_KEY on the server.'

    await store.set(snapKey(sym), snap)
    if (drafted) await store.set(`ade:prose:${sym}`, drafted)
    await store.set('ade:tickers', [...list, sym])
    return { symbol: sym, name: snap.name, score: snap.scores?.tool ?? null, band: snap.scores?.band ?? null, proseNote }
  }

  async function removeTicker(input) {
    const sym = normalizeSymbol(input)
    const list = await added()
    if (!list.includes(sym)) throw new YahooError(`${sym} is not on your list`, { status: 404 })
    await store.set('ade:tickers', list.filter(t => t !== sym))
    await store.del(snapKey(sym))
    await store.del(`ade:prose:${sym}`)
    await store.del(`ade:iv:${sym}`)
  }

  // Names for the Monitor news watchlist.
  async function addedHoldings() {
    const out = []
    for (const sym of await added()) {
      const snap = await store.get(snapKey(sym))
      out.push({ ticker: sym, name: snap?.name ?? sym })
    }
    return out
  }

  // Published (ADE) prices, to sanity-check the live ones against.
  async function diagnose({ live = true, probe } = {}) {
    const { adeVerdicts, adeAsOf } = await import('../../adapters/ade.js')
    return runDiagnostics({ yahoo, store, adeTickers, published: adeVerdicts, adeAsOf, nasdaq, now: now(), live, probe })
  }

  async function search(q) {
    return yahoo.search(q)
  }

  return { live, refreshAll, addTicker, removeTicker, addedHoldings, added, search, diagnose }
}
