// ADE live data: refresh Yahoo snapshots, keep the user's added tickers, and serve both.
//
// Storage keys:
//   ade:wl:<profile>   { added[], hidden[] }     one watchlist per profile (the name given at sign-in):
//                                                tickers it added, and ADE tickers it hid
//   ade:profiles       string[]                  every profile that has a watchlist (the refresh covers all)
//   ade:tickers        string[]                  legacy single watchlist; read once into profile "default"
//   ade:intel:<SYM>    intel.js record           Claude-written text for the 9 tabs from dated headlines
//   ade:snap:<SYM>     snapshot (build.js)       latest Yahoo snapshot, refreshed daily
//   ade:meta           { refreshedAt, failed[] } last full refresh
//   ade:macro          macro.js output           index/rate/CPI strip, refreshed with the tickers
//
// Optional extras, injected so tests never touch the network: `nasdaq` (consensus EPS, the forward
// P/E fallback), `fetchImpl` (NY Fed + BLS for the macro strip), `news` (RSS headlines) and `llm`
// (the Anthropic key, llm.js). Without them those parts are skipped.

import { adeWatchlist } from '../../adapters/ade.js'
import { normalizeProfile } from '../lib/session.js'
import { buildBlock, buildSnapshot } from './build.js'
import { writeIntel } from './intel.js'
import { buildMacro } from './macro.js'
import { buildOptions, ivStats, recordIV } from './options.js'
import { runDiagnostics } from './diagnose.js'
import { raw } from './yahoo.js'
import { YahooError, normalizeSymbol } from './yahoo.js'

export const MAX_ADDED = 25
const STALE_MS = 20 * 60 * 60 * 1000 // refresh on read when the last successful refresh is older than this
const RETRY_MS = 5 * 60 * 1000 // after a failed refresh, retry on read at most this often (do not hammer Yahoo)
export const INTEL_STALE_MS = 20 * 60 * 60 * 1000 // intel older than this is rewritten by the next intel run
export const DEFAULT_PROFILE = 'default'
export { normalizeProfile }

export class WatchlistError extends Error {
  constructor(message, status) { super(message); this.status = status }
}


export function createAdeService({ store, yahoo, adeTickers = adeWatchlist, nasdaq = null, fetchImpl = null, news = null, llm = null, now = () => new Date() }) {
  const snapKey = sym => `ade:snap:${sym}`
  const intelKey = sym => `ade:intel:${sym}`
  const bookSet = () => new Set(adeTickers.map(t => t.ticker))

  async function watchlist(profile = DEFAULT_PROFILE) {
    const p = normalizeProfile(profile)
    const wl = await store.get(`ade:wl:${p}`)
    if (wl) return { added: wl.added ?? [], hidden: wl.hidden ?? [] }
    // First read after the upgrade: the old single list becomes the default profile's list.
    if (p === DEFAULT_PROFILE) return { added: (await store.get('ade:tickers')) ?? [], hidden: [] }
    return { added: [], hidden: [] }
  }

  async function saveWatchlist(profile, wl) {
    const p = normalizeProfile(profile)
    await store.set(`ade:wl:${p}`, wl)
    const all = (await store.get('ade:profiles')) ?? []
    if (!all.includes(p)) await store.set('ade:profiles', [...all, p])
  }

  async function profiles() {
    const all = (await store.get('ade:profiles')) ?? []
    return all.includes(DEFAULT_PROFILE) ? all : [DEFAULT_PROFILE, ...all]
  }

  async function added(profile = DEFAULT_PROFILE) {
    return (await watchlist(profile)).added
  }

  // Every ticker some profile added: these are refreshed alongside ADE's book.
  async function allAdded() {
    const lists = await Promise.all((await profiles()).map(p => added(p)))
    return [...new Set(lists.flat())]
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
    const symbols = [...new Set([...adeTickers.map(t => t.ticker), ...(await allAdded())])]
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
  async function live(profile = DEFAULT_PROFILE) {
    let meta = await store.get('ade:meta')
    const age = meta ? now() - new Date(meta.refreshedAt) : Infinity
    if (!meta || (meta.ok !== false ? age > STALE_MS : age > RETRY_MS)) meta = await refreshAll()
    const wl = await watchlist(profile)
    const overlay = {}
    for (const { ticker } of adeTickers) {
      const snap = await store.get(snapKey(ticker))
      if (snap) overlay[ticker] = snap
    }
    const blocks = {}
    for (const sym of wl.added) {
      const snap = await store.get(snapKey(sym))
      if (snap) blocks[sym] = { block: buildBlock(snap, null, { today: now() }), snapshot: snap }
    }
    const intel = {}
    for (const sym of [...Object.keys(overlay), ...Object.keys(blocks)]) {
      const rec = await store.get(intelKey(sym))
      if (rec) intel[sym] = rec
    }
    const macro = (await store.get('ade:macro')) ?? null
    return {
      refreshedAt: meta.refreshedAt, ok: meta.ok !== false, failed: meta.failed, store: store.kind,
      profile: normalizeProfile(profile), hidden: wl.hidden, overlay, added: blocks, macro, intel,
    }
  }

  // Adds a ticker to this profile's watchlist. An ADE ticker the profile hid is simply shown again.
  async function addTicker(input, profile = DEFAULT_PROFILE) {
    const sym = normalizeSymbol(input)
    const wl = await watchlist(profile)
    if (bookSet().has(sym)) {
      if (!wl.hidden.includes(sym)) throw new YahooError(`${sym} is already in the ADE book`, { status: 409 })
      await saveWatchlist(profile, { ...wl, hidden: wl.hidden.filter(t => t !== sym) })
      const snap = await store.get(snapKey(sym))
      return { symbol: sym, name: snap?.name ?? sym, score: snap?.scores?.tool ?? null, band: snap?.scores?.band ?? null, restored: true }
    }
    if (wl.added.includes(sym)) throw new YahooError(`${sym} is already on your list`, { status: 409 })
    if (wl.added.length >= MAX_ADDED) throw new YahooError(`You can add up to ${MAX_ADDED} tickers. Remove one first.`, { status: 422 })

    // Another profile may already track it: reuse a fresh snapshot rather than call Yahoo again.
    let snap = await store.get(snapKey(sym))
    if (!snap || now() - new Date(snap.asOf) > STALE_MS) {
      const g = await gather(sym)
      const { chart, summary } = g
      const type = chart.meta?.instrumentType
      if (type && type !== 'EQUITY' && type !== 'ETF') throw new YahooError(`${sym} is a ${type.toLowerCase()}; ADE scores stocks and ETFs`, { status: 422 })
      const options = await withIvHistory(sym, g.options)
      snap = buildSnapshot({ symbol: sym, candles: chart.candles, meta: chart.meta, summary, options, nasdaq: g.nasdaq, yields: g.yields }, { now: now() })
      await store.set(snapKey(sym), snap)
    }
    await saveWatchlist(profile, { ...wl, added: [...wl.added, sym] })
    return { symbol: sym, name: snap.name, score: snap.scores?.tool ?? null, band: snap.scores?.band ?? null, intelNeeded: !(await store.get(intelKey(sym))) }
  }

  // Removes a ticker from this profile's watchlist. ADE's own tickers are hidden, not deleted: ADE's data is
  // upstream and shared, and "Hidden" lets the profile bring them back.
  async function removeTicker(input, profile = DEFAULT_PROFILE) {
    const sym = normalizeSymbol(input)
    const wl = await watchlist(profile)
    if (bookSet().has(sym)) {
      if (wl.hidden.includes(sym)) throw new YahooError(`${sym} is already hidden`, { status: 404 })
      await saveWatchlist(profile, { ...wl, hidden: [...wl.hidden, sym] })
      return { symbol: sym, hidden: true }
    }
    if (!wl.added.includes(sym)) throw new YahooError(`${sym} is not on your list`, { status: 404 })
    await saveWatchlist(profile, { ...wl, added: wl.added.filter(t => t !== sym) })
    // Drop the shared data only when no other profile still tracks it.
    if (!(await allAdded()).includes(sym)) {
      for (const k of [snapKey(sym), intelKey(sym), `ade:iv:${sym}`, `ade:prose:${sym}`]) await store.del(k)
    }
    return { symbol: sym, removed: true }
  }

  // Names for the Monitor news watchlist: every profile's added tickers (the Monitor feed is shared).
  async function addedHoldings() {
    const out = []
    for (const sym of await allAdded()) {
      const snap = await store.get(snapKey(sym))
      out.push({ ticker: sym, name: snap?.name ?? sym })
    }
    return out
  }

  // ---- Intel: Claude-written text for the 9 tabs, from dated RSS headlines plus the live numbers ----

  async function intelStatus() {
    const llmStatus = llm ? await llm.status() : { configured: false, source: null }
    const symbols = [...new Set([...adeTickers.map(t => t.ticker), ...(await allAdded())])]
    const ages = await Promise.all(symbols.map(async sym => {
      const rec = await store.get(intelKey(sym))
      return { symbol: sym, generatedAt: rec?.generatedAt ?? null }
    }))
    const fresh = ages.filter(a => a.generatedAt && now() - new Date(a.generatedAt) < INTEL_STALE_MS)
    return { llm: llmStatus, newsConfigured: Boolean(news), total: symbols.length, fresh: fresh.length, tickers: ages }
  }

  async function intelFor(sym) {
    const client = await llm?.client()
    if (!client) throw new WatchlistError('No LLM API key: add a Gemini or Anthropic key in Settings (or set GEMINI_API_KEY / ANTHROPIC_API_KEY) to write intel.', 412)
    if (!news) throw new WatchlistError('News feeds are not configured on this server.', 503)
    const snap = await store.get(snapKey(sym))
    if (!snap) throw new WatchlistError(`${sym} has no live snapshot yet: refresh market data first.`, 409)
    const { items, feeds } = await news.headlines(sym, snap.name, { now: now() })
    const rec = await writeIntel({ client, snap, headlines: items, feeds, today: now() })
    await store.set(intelKey(sym), rec)
    return rec
  }

  // Rewrites intel for up to `limit` tickers per call, stalest first, so each call fits one serverless
  // invocation (60 s). Callers loop until `remaining` is 0: the scheduled GitHub Action and the page's
  // "Refresh intel" button both do. `symbols` restricts the run (e.g. a ticker just added).
  async function refreshIntel({ limit = 3, symbols = null, force = false } = {}) {
    const status = await intelStatus()
    if (!status.llm.configured) throw new WatchlistError('No LLM API key: add a Gemini or Anthropic key in Settings (or set GEMINI_API_KEY / ANTHROPIC_API_KEY) to write intel.', 412)
    const wanted = symbols ? new Set(symbols.map(s => normalizeSymbol(s))) : null
    const due = status.tickers
      .filter(t => (!wanted || wanted.has(t.symbol)) && (force || !t.generatedAt || now() - new Date(t.generatedAt) >= INTEL_STALE_MS))
      .sort((a, b) => (a.generatedAt ?? '').localeCompare(b.generatedAt ?? ''))
    const batch = due.slice(0, Math.max(1, Math.min(limit, 5)))
    const done = [], failed = []
    await Promise.all(batch.map(async t => {
      try { const r = await intelFor(t.symbol); done.push({ symbol: t.symbol, news: r.intel.news.length, headlines: r.headlineCount }) } catch (e) { failed.push({ symbol: t.symbol, error: e.message }) }
    }))
    // A ticker that failed stays due, but it does not count as "remaining" for this caller's loop, so one bad
    // ticker cannot keep a scheduled job spinning.
    return { done, failed, remaining: Math.max(0, due.length - batch.length) }
  }

  // Published (ADE) prices, to sanity-check the live ones against.
  async function diagnose({ live = true, probe } = {}) {
    const { adeVerdicts, adeAsOf } = await import('../../adapters/ade.js')
    return runDiagnostics({ yahoo, store, adeTickers, published: adeVerdicts, adeAsOf, nasdaq, intel: await intelStatus(), now: now(), live, probe })
  }

  async function search(q) {
    return yahoo.search(q)
  }

  return { live, refreshAll, addTicker, removeTicker, addedHoldings, added, watchlist, profiles, search, diagnose, intelStatus, refreshIntel }
}
