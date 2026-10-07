// @vitest-environment node
import React from 'react'
import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { fakeYahoo } from '../server/ade/fixtures.js'
import { buildBlock, buildSnapshot } from '../server/ade/build.js'
import { buildOptions } from '../server/ade/options.js'
import { scoreSetup } from '../server/ade/score.js'
import App, { adeData, applyLive } from './ade-app.js'
import { applyIntel, liveBanner, overlayMacro, overlayTicker } from './ade-overlay.js'

async function snapshot(sym) {
  const y = fakeYahoo()
  const [chart, summary] = await Promise.all([y.chart(sym), y.summary(sym)])
  const now = new Date('2026-10-05T12:00:00Z')
  const options = await buildOptions(y, sym, { now: now.getTime() })
  return buildSnapshot({ symbol: sym, candles: chart.candles, meta: chart.meta, summary, options }, { now })
}

describe('overlayTicker on a real ADE block', () => {
  it('replaces numbers but leaves ADE\'s written text alone', async () => {
    const block = structuredClone(adeData.S.MU)
    const snap = await snapshot('MU')
    overlayTicker(block, snap)
    expect(block.price).toBe(snap.price)
    expect(block.avgPT).toBe(230)
    expect(block.support).toHaveLength(3)
    expect(block.tech.ma.d200).toBe(snap.ma.d200)
    expect(block.supportDate).toBe('Oct 5, 2026')
    // untouched prose
    expect(block.news).toEqual(adeData.S.MU.news)
    expect(block.playbook).toEqual(adeData.S.MU.playbook)
    expect(block.fund.story).toBe(adeData.S.MU.fund.story)
  })

  it('replaces ADE\'s max pain and ATM IV with Yahoo\'s, but keeps ADE-only options fields', async () => {
    const block = structuredClone(adeData.S.NVDA)
    const snap = await snapshot('NVDA')
    overlayTicker(block, snap)
    expect(block.options.maxPain).toBe(150)
    expect(block.options.atmIV).toBe(snap.options.atmIV)
    expect(block.options.lastEarnMove).toBe(adeData.S.NVDA.options.lastEarnMove)
    expect(block.optionsVerified).toBe(true)
  })

  it('keeps ADE\'s own options data when Yahoo has none', async () => {
    const block = structuredClone(adeData.S.NVDA)
    overlayTicker(block, { ...(await snapshot('NVDA')), options: null })
    expect(block.options).toEqual(adeData.S.NVDA.options)
  })

  it('keeps ADE\'s value when Yahoo has no data for a field', async () => {
    const block = structuredClone(adeData.S.MU)
    const snap = { ...(await snapshot('MU')), avgPT: null, consensus: null, ytd: null }
    const before = { avgPT: block.avgPT, consensus: block.consensus, ytd: block.ytd }
    overlayTicker(block, snap)
    expect({ avgPT: block.avgPT, consensus: block.consensus, ytd: block.ytd }).toEqual(before)
  })

  it('shows a forward P/E Yahoo and Nasdaq cannot give as n/a, never as ADE\'s old number', async () => {
    const block = structuredClone(adeData.S.MU)
    expect(block.fwdPE).toBeGreaterThan(0)
    overlayTicker(block, { ...(await snapshot('MU')), fwdPE: null, fwdPENote: 'n/a, loss-making (forward EPS -$3.49)' })
    expect(block.fwdPE).toBeNull()
    expect(block.fwdPENote).toBe('n/a, loss-making (forward EPS -$3.49)')
  })

  it('replaces ADE\'s hand-typed rate sensitivity with the measured one, and hides it when there is none', async () => {
    const block = structuredClone(adeData.S.MU)
    const rate = { rateSens: 0.21, rateCorr: -0.21, rateNote: 'HIGH (\u22120.21 vs 10Y yield; falls when yields rise; 2y daily)' }
    overlayTicker(block, { ...(await snapshot('MU')), ...rate })
    expect(block).toMatchObject(rate)
    overlayTicker(block, await snapshot('MU')) // a snapshot without yield history
    expect(block.rateNote).toBeNull()
    expect(block.rateSens).toBeNull()
  })

  describe('next earnings date', () => {
    const withDate = async (ticker, ade, yahoo) => {
      const block = structuredClone(adeData.S[ticker])
      block.earningsDate = ade
      const snap = { ...(await snapshot(ticker)), asOf: '2026-10-05T12:00:00Z', ...yahoo }
      overlayTicker(block, snap)
      return block
    }

    it('takes a confirmed Yahoo date over ADE\'s, and ADE\'s earnings entry in the catalyst calendar moves with it', async () => {
      const block = structuredClone(adeData.S.NVDA)
      block.earningsDate = 'Nov 18, 2026'
      block.catalysts = [{ d: 'Nov 18', e: 'NVDA Q3 FY27 \u2014 guided $108B', i: 'high' }, { d: 'May 20 \u2713', e: 'Q1 earnings', i: 'high' }, { d: 'Nov 18', e: 'Rubin ramp', i: 'med' }]
      overlayTicker(block, { ...(await snapshot('NVDA')), asOf: '2026-10-05T12:00:00Z', earningsDate: 'Nov 17, 2026', earningsEstimate: false, epsEst: 2.47 })
      expect(block).toMatchObject({ earningsDate: 'Nov 17, 2026', epsEst: 2.47, epsEstDate: 'Oct 5, 2026' })
      expect(block.catalysts.map(c => c.d)).toEqual(['Nov 17', 'May 20 \u2713', 'Nov 18']) // only the earnings entry; a confirmed past one stays
    })

    it('does not let a Yahoo ESTIMATE override a date ADE wrote down, but still takes the EPS estimate', async () => {
      const block = await withDate('HOOD', 'Nov 4, 2026', { earningsDate: 'Oct 27, 2026', earningsEstimate: true, epsEst: 0.64 })
      expect(block.earningsDate).toBe('Nov 4, 2026')
      expect(block.epsEst).toBe(0.64)
    })

    it('uses a Yahoo estimate, marked TBC the way ADE does, when ADE has no day, a past day, or its own TBC', async () => {
      for (const ade of ['Dec 2026 (Q1 FY27)', 'Sep 24, 2026', 'Nov 5, 2026 (TBC)', undefined]) {
        const block = await withDate('NET', ade, { earningsDate: 'Oct 29, 2026', earningsEstimate: true })
        expect(block.earningsDate, String(ade)).toBe('Oct 29, 2026 (TBC)')
      }
    })

    it('ignores a Yahoo date that is already past (Yahoo still shows last quarter\'s report until the next is announced)', async () => {
      const block = await withDate('SNPS', 'Dec 2, 2026', { earningsDate: 'Aug 26, 2026', earningsEstimate: false, epsEst: 4.1 })
      expect(block.earningsDate).toBe('Dec 2, 2026')
      expect(block.epsEst).toBe(adeData.S.SNPS.epsEst)
    })
  })

  it('writes a verdict whose score is ADE\'s formula applied to the new numbers', async () => {
    const block = structuredClone(adeData.S.NVDA)
    const snap = await snapshot('NVDA')
    overlayTicker(block, snap)
    const want = scoreSetup({ price: snap.price, target: snap.avgPT, ladder: snap.support, swings: snap.swings, rsi: snap.rsi, macdH: snap.macd.h, brokenCount: snap.brokenSup.length })
    expect(block.tech.verdict.score).toBe(want.tool.score)
    expect(block.tech.verdict.label.startsWith(want.band)).toBe(true)
  })

  it('works on tickers that lack optional fields (ADE\'s TSLA has no tech.pattern)', async () => {
    const block = structuredClone(adeData.S.TSLA)
    expect(block.tech.pattern).toBeUndefined()
    const snap = await snapshot('TSLA')
    expect(() => overlayTicker(block, snap)).not.toThrow()
  })
})

describe('applyLive on ADE\'s real data, rendered', () => {
  it('overlays, injects and renders without crashing', async () => {
    const live = { overlay: {}, added: {} }
    for (const sym of Object.keys(adeData.S)) live.overlay[sym] = await snapshot(sym)
    const net = await snapshot('NET2')
    live.added.NET2 = { block: buildBlock(net, null, { today: new Date('2026-10-05T12:00:00Z') }), snapshot: net }
    const res = applyLive(live)
    expect(res.overlaid).toHaveLength(Object.keys(live.overlay).length)
    expect(res.injected).toEqual(['NET2'])
    expect(Object.keys(adeData.S).at(-1)).toBe('NET2') // appended after ADE's own tabs
    expect(adeData.LC.NET2).toBe(net.price)

    const html = renderToString(React.createElement(App))
    expect(html.length).toBeGreaterThan(50_000)
    expect(html).toContain('NET2')
  })

  it('removes an added ticker that is no longer in the live data', async () => {
    applyLive({ overlay: {}, added: {} })
    expect(adeData.S.NET2).toBeUndefined()
    expect(adeData.LC.NET2).toBeUndefined()
  })
})

describe('macro strip', () => {
  const live = { spy: 7723, vix: 15.31, dxy: 101.93, oil: 91.11, btc: 85426, gold: 4162, tnx: 5.28, cpi: 3.4, cpiPrior: 3.36, fedFunds: 3.88,
    rateOutlook: 'target range 3.75-4.00%', regime: 'RISK-ON', color: '#3DBFA8', note: 'Oct 2, 2026 closes, Yahoo Finance: S&P 500 7,723.', macroDate: 'Oct 2, 2026' }

  it('replaces every hand-typed field, including the regime and note ADE wrote', () => {
    const macro = structuredClone(adeData.MACRO)
    expect(macro.regime).toMatch(/PAID/) // ADE's own marketing line
    expect(overlayMacro(macro, live)).toBe(true)
    expect(macro).toMatchObject(live)
  })

  it('shows a field the sources could not give as null (n/a), not as ADE\'s old number', () => {
    const macro = structuredClone(adeData.MACRO)
    overlayMacro(macro, { ...live, cpi: null, cpiPrior: null, fedFunds: null, rateOutlook: null })
    expect(macro.cpi).toBeNull()
    expect(macro.fedFunds).toBeNull()
    expect(macro.rateOutlook).toBe('n/a')
  })

  it('leaves ADE\'s strip alone when there is no live strip at all', () => {
    const macro = structuredClone(adeData.MACRO)
    expect(overlayMacro(macro, null)).toBe(false)
    expect(macro).toEqual(adeData.MACRO)
  })
})

describe('liveBanner', () => {
  const now = new Date('2026-10-04T20:00:00Z')
  it('says the numbers are live and how old ADE\'s writing is', () => {
    const text = liveBanner({ refreshedAt: '2026-10-04T19:38:00Z', macroLive: true, adeAsOf: '2026-10-01', now })
    expect(text).toMatch(/^LIVE · Yahoo Finance · refreshed Oct 4/)
    expect(text).toMatch(/macro strip/)
    expect(text).toMatch(/from Oct 1, 2026, 3 days ago/)
  })
  it('does not claim a live macro strip when there is none', () => {
    expect(liveBanner({ refreshedAt: '2026-10-04T19:38:00Z', macroLive: false, adeAsOf: '2026-10-04', now })).not.toMatch(/macro/)
  })
  it('is what the dashboard prints in place of ADE\'s hand-written REFRESHED banner', () => {
    applyLive({ overlay: {}, added: {}, refreshedAt: '2026-10-04T19:38:00Z', macro: null })
    expect(globalThis.__ADE_LIVE__.banner).toMatch(/^LIVE · Yahoo Finance/)
    const html = renderToString(React.createElement(App))
    expect(html).toContain('LIVE · Yahoo Finance')
    expect(html).not.toMatch(/REFRESHED Sep 3/)
  })
})

describe('intel and hidden tickers', () => {
  const rec = {
    generatedAt: '2026-10-07T22:20:00Z', headlineCount: 24,
    intel: {
      news: [{ id: 900000, on: true, type: 'news', headline: 'Fresh headline', detail: 'd', source: 'Reuters', url: 'https://example.com/x', dateStr: '2026-10-07', sentiment: 0.5, category: 'g', weight: 7 }],
      story: 'Fresh story.', drivers: [{ name: 'n', dir: 'up', detail: 'd' }], bull: 'bull path', bear: 'bear path', killer: 'killer',
      risks: [{ sev: 'HIGH', prob: 30, risk: 'r', trigger: 't', catalyst: 'c', triggerStatus: 'watching', mitigation: 'Not assessed', pPctNetWorth: 0, daysToImpact: 0 }],
      watchlist: [{ item: 'i', d: 'Q4', why: 'w' }], catalysts: [{ d: 'Nov 17', e: 'NVDA earnings', i: 'high', iv: 'high', hm: 'N/A' }],
      playbook: [{ h: '1 WEEK', bias: 'b', thesis: 't', action: 'a', color: '#FFBF00' }],
    },
  }

  it('replaces ADE\'s written text with the intel, keeping numbers, metrics and peers', async () => {
    const block = structuredClone(adeData.S.NVDA)
    const before = structuredClone(block)
    applyIntel(block, rec)
    expect(block.news).toEqual(rec.intel.news)
    expect(block.fund.story).toBe('Fresh story.')
    expect(block.fund.bull.path).toBe('bull path')
    expect(block.fund.bull.price).toBe(before.fund.bull?.price)
    expect(block.fund.metrics).toEqual(before.fund.metrics)
    expect(block.peers).toEqual(before.peers)
    expect(block.price).toBe(before.price)
    expect(block.fundVerified).toBe(false)
    expect(block.intelBy).toBe('Claude, from 24 dated headlines, Oct 7, 2026')
  })

  it('applyLive writes intel, hides a profile\'s hidden tickers, and brings them back', async () => {
    const live = { overlay: {}, added: {}, refreshedAt: '2026-10-07T22:00:00Z', hidden: ['MU'], intel: { NVDA: rec } }
    const r = applyLive(live)
    expect(r.withIntel).toEqual(['NVDA'])
    expect(r.hidden).toEqual(['MU'])
    expect(adeData.S.MU).toBeUndefined()
    expect(globalThis.__ADE_LIVE__.banner).toMatch(/written by Claude from dated headlines/)
    applyLive({ ...live, hidden: [] })
    expect(adeData.S.MU.name).toMatch(/Micron/)
    expect(Object.keys(adeData.S)[0]).toBe('MU') // back in ADE's tab order, not appended
  })
})
