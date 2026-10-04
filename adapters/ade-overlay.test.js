// @vitest-environment node
import React from 'react'
import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { fakeYahoo } from '../server/ade/fixtures.js'
import { buildBlock, buildSnapshot } from '../server/ade/build.js'
import { buildOptions } from '../server/ade/options.js'
import { scoreSetup } from '../server/ade/score.js'
import App, { adeData, applyLive } from './ade-app.js'
import { overlayTicker } from './ade-overlay.js'

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
    const snap = { ...(await snapshot('MU')), avgPT: null, fwdPE: null, consensus: null, ytd: null }
    const before = { avgPT: block.avgPT, fwdPE: block.fwdPE, consensus: block.consensus, ytd: block.ytd }
    overlayTicker(block, snap)
    expect({ avgPT: block.avgPT, fwdPE: block.fwdPE, consensus: block.consensus, ytd: block.ytd }).toEqual(before)
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
