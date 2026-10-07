import { describe, expect, it } from 'vitest'
import { HORIZONS, IntelSchema, toAde, writeIntel } from './intel.js'

const NOW = new Date('2026-10-07T12:00:00Z')
const headlines = [
  { title: 'Company sets investor day for Nov 12', source: 'Reuters', url: 'https://example.com/1', date: '2026-10-06T10:00:00.000Z' },
  { title: 'Analyst raises target', source: 'Barron’s', url: 'https://example.com/2', date: '2026-10-05T10:00:00.000Z' },
]
const snap = { symbol: 'NVDA', name: 'NVIDIA', price: 230, earningsDate: 'Nov 17, 2026', earningsEstimate: false, support: [{ lvl: 207.25, label: 'x' }], scores: { tool: 65, band: 'HOLD' } }
const base = { story: 's', drivers: [], bull: 'b', bear: 'r', killer: 'k', risks: [], watchlist: [], playbook: [] }

describe('toAde', () => {
  it('copies headline, source, link and date from the feed, never from the model, and drops unknown indexes', () => {
    const out = toAde({ ...base, news: [{ i: 1, detail: 'd', sentiment: 3, category: 'a', weight: 40 }, { i: 9, detail: 'invented', sentiment: 0, category: 'x', weight: 1 }, { i: 1, detail: 'dup', sentiment: 0, category: 'a', weight: 1 }], catalysts: [] }, { headlines, snap, today: NOW })
    expect(out.news).toHaveLength(1)
    expect(out.news[0]).toMatchObject({ headline: 'Analyst raises target', source: 'Barron’s', url: 'https://example.com/2', dateStr: '2026-10-05', sentiment: 1, weight: 10, type: 'news', on: true })
  })

  it('keeps only catalysts dated in the future and cited by a headline or the earnings date, and always lists earnings', () => {
    const out = toAde({ ...base, news: [], catalysts: [
      { date: '2026-11-12', event: 'Investor day', impact: 'high', source: 0 },
      { date: '2026-09-01', event: 'Past event', impact: 'low', source: 0 },
      { date: '2026-12-01', event: 'Uncited guess', impact: 'med', source: 7 },
      { date: 'soon', event: 'No date', impact: 'med', source: 0 },
    ] }, { headlines, snap, today: NOW })
    expect(out.catalysts.map(c => [c.d, c.e])).toEqual([['Nov 12', 'Investor day'], ['Nov 17', 'NVDA earnings']])
  })

  it('fills every playbook horizon in ADE\'s shape, coloured by the ADE band', () => {
    const out = toAde({ ...base, news: [], catalysts: [], playbook: [{ h: '1 MONTH', bias: 'b', thesis: 't', action: 'a' }] }, { headlines, snap, today: NOW })
    expect(out.playbook.map(p => p.h)).toEqual(HORIZONS)
    expect(out.playbook[1]).toMatchObject({ bias: 'b', color: '#FFBF00' })
    expect(out.playbook[0].bias).toMatch(/HOLD \(65\)/)
  })

  it('clamps risk probabilities and fills the risk-card fields the model cannot know', () => {
    const out = toAde({ ...base, news: [], catalysts: [], risks: [{ sev: 'HIGH', prob: 250, risk: 'r', trigger: 't', catalyst: 'c' }] }, { headlines, snap, today: NOW })
    expect(out.risks[0]).toMatchObject({ prob: 100, triggerStatus: 'watching', mitigation: 'Not assessed' })
  })
})

describe('writeIntel', () => {
  it('sends live data and numbered headlines, enables refusal fallbacks, and throws on a refusal', async () => {
    let req
    const client = { beta: { messages: { parse: async r => { req = r; return { stop_reason: 'refusal', parsed_output: null } } } } }
    await expect(writeIntel({ client, snap, headlines, today: NOW })).rejects.toThrow(/declined/)
    expect(req.fallbacks).toBe('default')
    expect(req.betas).toContain('server-side-fallback-2026-07-01')
    expect(req.messages[0].content).toMatch(/\[0\] 2026-10-06 \| Reuters \| Company sets investor day/)
    expect(req.system).toMatch(/untrusted text/)
  })

  it('the output schema accepts a complete answer', () => {
    const ok = IntelSchema.safeParse({ ...base, news: [], catalysts: [], drivers: [{ name: 'n', dir: 'up', detail: 'd' }] })
    expect(ok.success).toBe(true)
  })
})
