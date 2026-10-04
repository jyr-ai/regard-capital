import { beforeEach, describe, expect, it } from 'vitest'
import { clearMemoryStore, createStore } from '../lib/store.js'
import { runDiagnostics } from './diagnose.js'
import { createAdeService } from './service.js'
import { fakeCandles, fakeYahoo } from './fixtures.js'

const BOOK = [{ ticker: 'MU', name: 'Micron' }, { ticker: 'NVDA', name: 'Nvidia' }]
const ENV = { APP_PASSWORD: 'a', SESSION_SECRET: 'b', CRON_SECRET: 'c', ANTHROPIC_API_KEY: 'd' }
// The fake candles end 2026-03-... so pin "now" to just after the last bar.
const lastBar = fakeCandles(1).at(-1).t * 1000
const NOW = new Date(lastBar + 86400_000)

let store
beforeEach(() => { clearMemoryStore(); store = createStore({ url: '', token: '' }) })

// An Upstash-flavoured store (kind !== 'memory') backed by a Map.
const persistent = () => {
  const m = new Map()
  return { kind: 'upstash', get: async k => (m.has(k) ? JSON.parse(m.get(k)) : null), set: async (k, v) => { m.set(k, JSON.stringify(v)) }, del: async k => { m.delete(k) } }
}

// NY Fed + BLS stand-in for the macro strip.
const macroFetch = async url => (url.includes('newyorkfed')
  ? { ok: true, json: async () => ({ refRates: [{ effectiveDate: '2026-10-01', percentRate: 3.88, targetRateFrom: 3.75, targetRateTo: 4 }] }) }
  : { ok: true, json: async () => ({ status: 'REQUEST_SUCCEEDED', Results: { series: [{ data: [{ year: '2026', period: 'M08', value: '103.4' }, { year: '2025', period: 'M08', value: '100' }] }] } }) })
const goodNasdaq = { yearlyEps: async () => [{ fiscalEnd: 'Dec 2099', end: new Date('2099-12-31'), eps: 2, analysts: 9 }] }
const ADE_AS_OF = new Date(NOW - 86400_000).toISOString().slice(0, 10)

async function diagnose({ yahoo = fakeYahoo(), st = persistent(), env = ENV, refresh = true, published = {}, live = true, fetchImpl = macroFetch, nasdaq = goodNasdaq, adeAsOf = ADE_AS_OF } = {}) {
  const svc = createAdeService({ store: st, yahoo, adeTickers: BOOK, fetchImpl, nasdaq, now: () => NOW })
  if (refresh) await svc.refreshAll()
  return runDiagnostics({ yahoo, store: st, adeTickers: BOOK, published, adeAsOf, nasdaq, env, now: NOW, live })
}

const stage = (r, id) => r.stages.find(s => s.id === id)

describe('runDiagnostics', () => {
  it('passes when every stage works', async () => {
    const r = await diagnose()
    expect(r.stages.map(s => `${s.id}:${s.status}`)).toEqual([
      'yahoo.chart:pass', 'yahoo.summary:pass', 'yahoo.options:pass', 'nasdaq.estimates:pass', 'snapshot.build:pass',
      'store.roundtrip:pass', 'config:pass', 'refresh.recency:pass', 'macro:pass', 'ade.text:pass', 'snapshots:pass',
    ])
    expect(r.status).toBe('ok')
    expect(r.stages.every(s => typeof s.ms === 'number')).toBe(true)
  })

  it('reports a failing Yahoo endpoint as a failed stage and still runs the rest', async () => {
    const yahoo = fakeYahoo({ unknown: ['AAPL'] })
    const r = await diagnose({ yahoo })
    expect(stage(r, 'yahoo.chart').status).toBe('fail')
    expect(stage(r, 'yahoo.chart').detail).toMatch(/no data/)
    expect(stage(r, 'store.roundtrip').status).toBe('pass')
    expect(r.status).toBe('down')
  })

  it('fails when the newest candle is too old, e.g. Yahoo serving a cached chart', async () => {
    const svc = createAdeService({ store: persistent(), yahoo: fakeYahoo(), adeTickers: BOOK })
    expect(svc).toBeTruthy()
    const r = await runDiagnostics({ yahoo: fakeYahoo(), store: persistent(), adeTickers: BOOK, env: ENV, now: new Date(lastBar + 30 * 86400_000) })
    expect(stage(r, 'yahoo.chart').detail).toMatch(/days old/)
  })

  it('fails when the last candle disagrees with Yahoo\'s own quote', async () => {
    const yahoo = fakeYahoo()
    const chart = yahoo.chart
    yahoo.chart = async s => { const c = await chart(s); c.meta.regularMarketPrice = c.candles.at(-1).c * 1.5; return c }
    expect(stage(await diagnose({ yahoo }), 'yahoo.chart').detail).toMatch(/disagrees/)
  })

  it('on Vercel, an in-memory store is a failure; locally it is a warning', async () => {
    expect(stage(await diagnose({ st: store, env: { ...ENV, VERCEL: '1' } }), 'store.roundtrip').status).toBe('fail')
    expect(stage(await diagnose({ st: store, env: ENV }), 'store.roundtrip').status).toBe('warn')
  })

  it('on Vercel, a missing CRON_SECRET fails; locally it is a note', async () => {
    const { CRON_SECRET, ...rest } = ENV
    expect(CRON_SECRET).toBe('c')
    expect(stage(await diagnose({ env: { ...rest, VERCEL: '1' } }), 'config')).toMatchObject({ status: 'fail', detail: expect.stringContaining('CRON_SECRET') })
    expect(stage(await diagnose({ env: rest }), 'config').status).toBe('warn')
  })

  it('warns when there is no model key, since added tickers then get placeholder narratives', async () => {
    const { ANTHROPIC_API_KEY, ...rest } = ENV
    expect(ANTHROPIC_API_KEY).toBe('d')
    expect(stage(await diagnose({ env: { ...rest, VERCEL: '1' } }), 'config')).toMatchObject({ status: 'warn', detail: expect.stringContaining('ANTHROPIC_API_KEY') })
  })

  it('fails when the data was never refreshed', async () => {
    const r = await diagnose({ refresh: false })
    expect(stage(r, 'refresh.recency')).toMatchObject({ status: 'fail', detail: expect.stringContaining('never refreshed') })
    expect(stage(r, 'snapshots').status).toBe('fail')
  })

  it('fails when the last refresh mostly failed, and names why', async () => {
    const r = await diagnose({ yahoo: fakeYahoo({ unknown: ['MU', 'NVDA'] }) })
    expect(stage(r, 'refresh.recency')).toMatchObject({ status: 'fail', detail: expect.stringContaining('mostly failed') })
  })

  it('warns, naming the ticker, when one ticker failed to refresh', async () => {
    const r = await diagnose({ yahoo: fakeYahoo({ unknown: ['NVDA'] }) })
    expect(stage(r, 'refresh.recency')).toMatchObject({ status: 'warn', detail: expect.stringContaining('NVDA') })
  })

  it('fails when the refresh is older than a weekend can explain', async () => {
    const st = persistent()
    const svc = createAdeService({ store: st, yahoo: fakeYahoo(), adeTickers: BOOK, now: () => new Date(NOW - 5 * 86400_000) })
    await svc.refreshAll()
    expect(stage(await runDiagnostics({ yahoo: fakeYahoo(), store: st, adeTickers: BOOK, env: ENV, now: NOW, live: false }), 'refresh.recency').status).toBe('fail')
  })

  it('warns when a live price is nowhere near the one ADE published (split, wrong ticker)', async () => {
    const r = await diagnose({ published: { MU: { price: 5 } } })
    expect(stage(r, 'snapshots')).toMatchObject({ status: 'warn', detail: expect.stringContaining('MU') })
  })

  it('names individual gaps instead of averaging them away', async () => {
    const yahoo = fakeYahoo({ noSummary: ['MU'] })
    const r = await diagnose({ yahoo })
    expect(stage(r, 'snapshots').detail).toContain('MU.avgPT')
    expect(r.coverage.gaps).toContain('MU.avgPT')
    expect(r.coverage.fields.avgPT).toBe(50)
  })

  it('can skip the live Yahoo probe (for a cheap check of stored state)', async () => {
    const r = await diagnose({ live: false })
    expect(r.stages.some(s => s.id.startsWith('yahoo'))).toBe(false)
  })

  it('includes the provenance summary', async () => {
    const r = await diagnose()
    expect(r.provenance.existing.live).toBeGreaterThan(0)
    expect(r.provenance.added.placeholder ?? 0).toBe(0) // nothing is made up any more: a missing value is n/a
  })
})

describe('macro, Nasdaq and the age of ADE\'s text', () => {
  it('warns that ADE\'s hand-typed macro is still showing when no strip is stored', async () => {
    const r = await diagnose({ fetchImpl: null })
    expect(stage(r, 'macro')).toMatchObject({ status: 'warn', detail: expect.stringMatching(/hand-typed macro text is still on the page/) })
  })

  it('names the macro source that failed and says its fields show n/a', async () => {
    const r = await diagnose({ fetchImpl: async url => (url.includes('bls') ? { ok: false, status: 503 } : macroFetch(url)) })
    expect(stage(r, 'macro')).toMatchObject({ status: 'warn', detail: expect.stringMatching(/BLS CPI-U: BLS 503.*show n\/a/) })
  })

  it('reports the live values when every macro source works', async () => {
    expect(stage(await diagnose(), 'macro').detail).toMatch(/CPI 3\.4% \(Aug 2026\), fed funds 3\.88%/)
  })

  it('warns, but does not fail, when the Nasdaq fallback is down', async () => {
    const r = await diagnose({ nasdaq: { yearlyEps: async () => { throw new Error('Nasdaq estimates 403 for AAPL') } } })
    expect(stage(r, 'nasdaq.estimates')).toMatchObject({ status: 'warn', detail: expect.stringMatching(/403.*n\/a instead/) })
    expect(r.status).toBe('degraded')
  })

  it('warns when ADE has not published for days (its numbers beside it are live, its words are not)', async () => {
    const r = await diagnose({ adeAsOf: new Date(NOW - 9 * 86400_000).toISOString().slice(0, 10) })
    expect(stage(r, 'ade.text')).toMatchObject({ status: 'warn', detail: expect.stringMatching(/9 days old.*words are not/) })
  })

  it('counts a forward P/E that is n/a for a stated reason as covered, not as a gap', async () => {
    const st = persistent()
    const svc = createAdeService({ store: st, yahoo: fakeYahoo({ noForward: ['NVDA'] }), adeTickers: BOOK, fetchImpl: macroFetch, now: () => NOW })
    await svc.refreshAll()
    const r = await runDiagnostics({ yahoo: fakeYahoo(), store: st, adeTickers: BOOK, adeAsOf: ADE_AS_OF, env: ENV, now: NOW })
    expect(r.coverage.tickers.NVDA.fwdPE).toBe(true)
    expect(r.coverage.gaps).not.toContain('NVDA.fwdPE')
  })
})

describe('refresh retry (a failed refresh must not look fresh for a day)', () => {
  it('retries on the next read after a mostly-failed refresh, but not within 5 minutes', async () => {
    let t = new Date('2026-10-05T12:00:00Z')
    const yahoo = fakeYahoo({ unknown: ['MU', 'NVDA'] })
    const svc = createAdeService({ store: persistent(), yahoo, adeTickers: BOOK, now: () => t })
    const first = await svc.live()
    expect(first.ok).toBe(false)
    const calls = yahoo.calls.chart.length
    t = new Date(t.getTime() + 60_000)
    await svc.live()
    expect(yahoo.calls.chart.length).toBe(calls) // too soon: not hammering Yahoo
    t = new Date(t.getTime() + 10 * 60_000)
    await svc.live()
    expect(yahoo.calls.chart.length).toBeGreaterThan(calls) // retried well before the 20 h freshness window
  })

  it('a successful refresh is trusted for the full 20 hours', async () => {
    let t = new Date('2026-10-05T12:00:00Z')
    const yahoo = fakeYahoo()
    const svc = createAdeService({ store: persistent(), yahoo, adeTickers: BOOK, now: () => t })
    expect((await svc.live()).ok).toBe(true)
    const calls = yahoo.calls.chart.length
    t = new Date(t.getTime() + 19 * 3600_000)
    await svc.live()
    expect(yahoo.calls.chart.length).toBe(calls)
  })
})
