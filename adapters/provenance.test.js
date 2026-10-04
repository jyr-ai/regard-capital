// @vitest-environment node
// Guards against made-up data: every field the app writes into ADE's dashboard must be classified
// in server/ade/provenance.js, and the overlay may only touch fields classified live or computed.
import { describe, expect, it } from 'vitest'
import { buildBlock, buildSnapshot } from '../server/ade/build.js'
import { buildOptions } from '../server/ade/options.js'
import { fakeYahoo } from '../server/ade/fixtures.js'
import { FIELDS, OVERLAID } from '../server/ade/provenance.js'
import { adeData } from './ade-app.js'
import { overlayTicker } from './ade-overlay.js'

const NOW = new Date('2026-10-05T12:00:00Z')
async function snap(sym, { options = true } = {}) {
  const y = fakeYahoo()
  const [chart, summary] = await Promise.all([y.chart(sym), y.summary(sym)])
  const opts = options ? await buildOptions(y, sym, { now: NOW.getTime() }) : null
  return buildSnapshot({ symbol: sym, candles: chart.candles, meta: chart.meta, summary, options: opts }, { now: NOW })
}

const changed = (before, after) => Object.keys({ ...before, ...after }).filter(k => JSON.stringify(before[k]) !== JSON.stringify(after[k]))

describe('provenance', () => {
  it('classifies every field of a generated block', async () => {
    const block = buildBlock(await snap('NEWCO'), null, { today: NOW })
    expect(Object.keys(block).filter(k => !(k in FIELDS))).toEqual([])
  })

  it('classifies every field ADE\'s own blocks have, so a new upstream field is noticed', () => {
    const keys = new Set(Object.values(adeData.S).flatMap(b => Object.keys(b)))
    expect([...keys].filter(k => !(k in FIELDS))).toEqual([])
  })

  it('overlays only fields classified live or computed, and leaves the rest as ADE published them', async () => {
    const block = structuredClone(adeData.S.MU)
    const before = structuredClone(block)
    overlayTicker(block, await snap('MU'))
    const touched = changed(before, block)
    expect(touched.length).toBeGreaterThan(10)
    expect(touched.filter(k => !OVERLAID.includes(k))).toEqual([])
    // ADE's hand-written text is never touched
    for (const k of ['news', 'playbook', 'fund', 'catalysts', 'peers', 'rateSens', 'earningsDate', 'epsEst']) expect(block[k], k).toEqual(before[k])
  })

  it('invents no rate sensitivity for an added ticker (Yahoo has no such field)', async () => {
    expect(buildBlock(await snap('NEWCO'), null, { today: NOW })).not.toHaveProperty('rateSens')
  })

  it('shows consensus as n/a rather than a made-up "Hold" when Yahoo has none', async () => {
    const s = { ...(await snap('NEWCO')), consensus: null }
    expect(buildBlock(s, null, { today: NOW }).consensus).toBe('n/a')
  })

  it('flags a placeholder target as estimated instead of presenting it as verified', async () => {
    const s = { ...(await snap('NEWCO')), avgPT: null, highPT: null, lowPT: null }
    const b = buildBlock(s, null, { today: NOW })
    expect(b.ptVerified).toBe(false)
    expect(b.avgPT).toBe(s.price)
  })

  it('marks a ticker with no listed options unverified', async () => {
    expect(buildBlock(await snap('NEWCO', { options: false }), null, { today: NOW }).optionsVerified).toBe(false)
  })

  it('marks an added ticker\'s narrative unverified, whatever the model drafted', async () => {
    const prose = { story: 'x', drivers: [], bull: 'b', bear: 'r', risks: [], killer: 'k', watchlist: [] }
    expect(buildBlock(await snap('NEWCO'), prose, { today: NOW }).fundVerified).toBe(false)
  })
})
