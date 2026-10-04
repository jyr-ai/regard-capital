import { beforeEach, describe, expect, it } from 'vitest'
import { clearMemoryStore, createStore } from '../lib/store.js'
import { createAdeService, MAX_ADDED } from './service.js'
import { fakeYahoo } from './fixtures.js'

const BOOK = [{ ticker: 'MU', name: 'Micron' }, { ticker: 'NVDA', name: 'Nvidia' }]
let store
beforeEach(() => { clearMemoryStore(); store = createStore({ url: '', token: '' }) })

const make = (opts = {}, yahoo = fakeYahoo()) => ({ yahoo, svc: createAdeService({ store, yahoo, adeTickers: BOOK, ...opts }) })

describe('refreshAll', () => {
  it('snapshots every ADE ticker and every added ticker', async () => {
    const { svc, yahoo } = make()
    await svc.addTicker('NET')
    yahoo.calls.chart.length = 0
    const meta = await svc.refreshAll()
    expect(meta.count).toBe(3)
    expect(meta.failed).toEqual([])
    expect([...yahoo.calls.chart].sort()).toEqual(['MU', 'NET', 'NVDA'])
  })

  it('one failing ticker does not stop the others, and is reported', async () => {
    const { svc } = make({}, fakeYahoo({ unknown: ['NVDA'] }))
    const meta = await svc.refreshAll()
    expect(meta.failed.map(f => f.symbol)).toEqual(['NVDA'])
    const live = await svc.live()
    expect(Object.keys(live.overlay)).toEqual(['MU'])
  })

  it('still produces a snapshot when only the fundamentals call fails', async () => {
    const { svc } = make({}, fakeYahoo({ noSummary: ['MU'] }))
    const meta = await svc.refreshAll()
    expect(meta.failed).toEqual([])
    const snap = (await svc.live()).overlay.MU
    expect(snap.price).toBeGreaterThan(0)
    expect(snap.avgPT).toBeNull()
    expect(snap.scores.noTarget).toBe(true)
  })
})

describe('live', () => {
  it('refreshes inline when nothing has ever been refreshed, then serves from the store', async () => {
    const { svc, yahoo } = make()
    const first = await svc.live()
    expect(Object.keys(first.overlay).sort()).toEqual(['MU', 'NVDA'])
    const callsAfterFirst = yahoo.calls.chart.length
    await svc.live()
    expect(yahoo.calls.chart.length).toBe(callsAfterFirst)
  })

  it('refreshes again once the last refresh is older than 20 hours', async () => {
    let t = new Date('2026-10-05T12:00:00Z')
    const { svc, yahoo } = make({ now: () => t })
    await svc.live()
    const n = yahoo.calls.chart.length
    t = new Date('2026-10-05T20:00:00Z')
    await svc.live()
    expect(yahoo.calls.chart.length).toBe(n)
    t = new Date('2026-10-06T09:00:00Z')
    await svc.live()
    expect(yahoo.calls.chart.length).toBeGreaterThan(n)
  })

  it('returns a complete block for each added ticker', async () => {
    const { svc } = make()
    await svc.addTicker('net')
    const { added } = await svc.live()
    expect(added.NET.block.userAdded).toBe(true)
    expect(added.NET.block.support).toHaveLength(3)
    expect(added.NET.block.tech.verdict.score).toBe(added.NET.snapshot.scores.tool)
  })
})

describe('addTicker', () => {
  it('validates, scores and stores the ticker', async () => {
    const { svc } = make()
    const r = await svc.addTicker(' net ')
    expect(r).toMatchObject({ symbol: 'NET', name: 'NET Corporation' })
    expect(r.score).toBeGreaterThanOrEqual(0)
    expect(['STRONG BUY', 'BUY', 'HOLD', 'TRIM/AVOID']).toContain(r.band)
    expect(await svc.added()).toEqual(['NET'])
    expect(await svc.addedHoldings()).toEqual([{ ticker: 'NET', name: 'NET Corporation' }])
  })

  it('rejects a ticker Yahoo does not know, storing nothing', async () => {
    const { svc } = make({}, fakeYahoo({ unknown: ['ZZZZ'] }))
    await expect(svc.addTicker('ZZZZ')).rejects.toMatchObject({ status: 404 })
    expect(await svc.added()).toEqual([])
  })

  it('rejects garbage input before calling Yahoo', async () => {
    const { svc, yahoo } = make()
    await expect(svc.addTicker('../x')).rejects.toMatchObject({ status: 400 })
    expect(yahoo.calls.chart).toEqual([])
  })

  it('rejects duplicates, ADE\'s own tickers, and non-stock instruments', async () => {
    const { svc } = make({}, fakeYahoo({ instrument: { BTC: 'CRYPTOCURRENCY' } }))
    await svc.addTicker('NET')
    await expect(svc.addTicker('NET')).rejects.toMatchObject({ status: 409 })
    await expect(svc.addTicker('MU')).rejects.toMatchObject({ status: 409 })
    await expect(svc.addTicker('BTC')).rejects.toMatchObject({ status: 422 })
  })

  it(`caps the list at ${MAX_ADDED}`, async () => {
    const { svc } = make()
    await store.set('ade:tickers', Array.from({ length: MAX_ADDED }, (_, i) => `T${i}`))
    await expect(svc.addTicker('NET')).rejects.toMatchObject({ status: 422 })
  })

  it('still adds the ticker when the narrative draft fails, and says why', async () => {
    const prose = { draft: async () => { throw new Error('the model declined to draft this one') } }
    const { svc } = make({ prose })
    const r = await svc.addTicker('NET')
    expect(r.proseNote).toMatch(/declined/)
    expect(await svc.added()).toEqual(['NET'])
  })

  it('stores the drafted narrative and shows it in the block', async () => {
    const prose = { draft: async () => ({ story: 'Drafted story.', drivers: [], bull: 'b', bear: 'r', risks: [], killer: 'k', watchlist: [] }) }
    const { svc } = make({ prose })
    await svc.addTicker('NET')
    expect((await svc.live()).added.NET.block.fund.story).toBe('Drafted story.')
  })

  it('tells the user when there is no narrative key, instead of pretending', async () => {
    const { svc } = make({ prose: null })
    expect((await svc.addTicker('NET')).proseNote).toMatch(/ANTHROPIC_API_KEY/)
  })
})

describe('options', () => {
  it('puts computed options in the snapshot and the added block', async () => {
    const { svc } = make()
    await svc.addTicker('NET')
    const { added } = await svc.live()
    expect(added.NET.snapshot.options.maxPain).toBe(150)
    expect(added.NET.block.options.maxPain).toBe(150)
    expect(added.NET.block.optionsVerified).toBe(true)
  })

  it('a ticker with no listed options still scores, with unverified placeholder options', async () => {
    const { svc } = make({}, fakeYahoo({ noOptions: ['NET'] }))
    await svc.addTicker('NET')
    const { added } = await svc.live()
    expect(added.NET.snapshot.options).toBeNull()
    const o = added.NET.block.options
    expect(added.NET.block.optionsVerified).toBe(false)
    for (const k of ['maxPain', 'maxPainNear', 'atmIV', 'maxPainDTE']) expect(typeof o[k], k).toBe('number') // the Options view does arithmetic on these
  })

  it('a failed option call does not fail the refresh of ADE\'s own tickers', async () => {
    const { svc } = make({}, fakeYahoo({ noOptions: ['MU'] }))
    expect((await svc.refreshAll()).failed).toEqual([])
    expect((await svc.live()).overlay.MU.options).toBeNull()
  })
})

describe('IV history', () => {
  it('records one ATM IV per day and reports IV rank only after enough days', async () => {
    let t = new Date('2026-09-01T21:00:00Z')
    const { svc } = make({ now: () => t })
    await svc.addTicker('NET')
    let snap = await store.get('ade:snap:NET')
    expect(snap.options.ivObs).toBe(1)
    expect(snap.options.ivRank).toBeNull()
    for (let d = 0; d < 20; d++) { t = new Date(t.getTime() + 86400_000); await svc.refreshAll() }
    snap = await store.get('ade:snap:NET')
    expect(snap.options.ivObs).toBe(21)
    expect(typeof snap.options.ivRank).toBe('number')
  })

  it('refreshing twice on one day records one observation', async () => {
    const { svc } = make()
    await svc.addTicker('NET')
    await svc.refreshAll()
    expect((await store.get('ade:iv:NET')).length).toBe(1)
  })

  it('removing a ticker deletes its IV history', async () => {
    const { svc } = make()
    await svc.addTicker('NET')
    await svc.removeTicker('NET')
    expect(await store.get('ade:iv:NET')).toBeNull()
  })
})

describe('removeTicker', () => {
  it('removes the ticker and its stored data', async () => {
    const { svc } = make()
    await svc.addTicker('NET')
    await svc.removeTicker('net')
    expect(await svc.added()).toEqual([])
    expect(await store.get('ade:snap:NET')).toBeNull()
    await expect(svc.removeTicker('NET')).rejects.toMatchObject({ status: 404 })
  })
})
