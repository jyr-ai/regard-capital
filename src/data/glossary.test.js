import { describe, expect, it } from 'vitest'
import { GLOSSARY, GROUPS, investopedia } from './glossary.js'

const HOSTS = ['corporatefinanceinstitute.com', 'www.investor.gov', 'www.cboe.com', 'en.wikipedia.org']

describe('glossary', () => {
  it('defines every term fully: what it is, how to use it, why it matters', () => {
    expect(GLOSSARY.length).toBeGreaterThan(45)
    for (const g of GLOSSARY) {
      for (const k of ['term', 'group', 'def', 'how', 'why']) expect(g[k], `${g.term}.${k}`).toBeTruthy()
      expect(GROUPS, g.term).toContain(g.group)
    }
  })

  it('has no duplicate terms', () => {
    const terms = GLOSSARY.map(g => g.term.toLowerCase())
    expect(new Set(terms).size).toBe(terms.length)
  })

  it('links only to sources that were checked (HTTPS, known hosts) or ADE\'s own methodology', () => {
    for (const g of GLOSSARY.filter(x => x.link?.url)) {
      const u = new URL(g.link.url)
      expect(u.protocol).toBe('https:')
      expect(HOSTS, g.term).toContain(u.host)
    }
    expect(investopedia('Max pain')).toBe('https://www.investopedia.com/search?q=Max%20pain')
  })

  it('covers the metrics the dashboard shows', () => {
    const all = GLOSSARY.map(g => g.term).join(' | ')
    for (const t of ['Forward P/E', 'RSI', 'MACD', 'Max pain', 'IV rank', 'Put/call', 'Held Nx', 'Volume node', 'Reward-to-risk', 'Rate sensitivity', 'VIX', 'ADE score', 'DEFENDED score', 'Implied move']) expect(all).toContain(t)
  })
})
