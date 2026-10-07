import { describe, expect, it } from 'vitest'
import { createNews } from './news.js'

const NOW = new Date('2026-10-07T12:00:00Z')
const rss = items => `<?xml version="1.0"?><rss version="2.0"><channel><title>t</title>${items.map(([t, d, l]) => `<item><title>${t}</title><link>${l}</link><pubDate>${d}</pubDate></item>`).join('')}</channel></rss>`
const reply = xml => ({ ok: true, status: 200, text: async () => xml })

describe('headlines', () => {
  it('merges both feeds newest first, splits the publisher off Google titles, dedupes, and drops old items', async () => {
    const fetchImpl = async url => (url.includes('news.google')
      ? reply(rss([['Nvidia beats estimates - Reuters', 'Tue, 06 Oct 2026 10:00:00 GMT', 'https://g/1'], ['Old story - CNBC', 'Mon, 01 Jun 2026 10:00:00 GMT', 'https://g/2']]))
      : reply(rss([['Nvidia beats estimates', 'Tue, 06 Oct 2026 11:00:00 GMT', 'https://y/1'], ['Chip stocks rally', 'Wed, 07 Oct 2026 09:00:00 GMT', 'https://y/2']])))
    const { items, feeds } = await createNews({ fetchImpl }).headlines('NVDA', 'NVIDIA Corporation', { now: NOW })
    expect(items.map(i => i.title)).toEqual(['Chip stocks rally', 'Nvidia beats estimates'])
    expect(items[1].source).toMatch(/Yahoo Finance|Reuters/)
    expect(feeds.every(f => f.ok)).toBe(true)
  })

  it('works when one feed fails and throws only when both do', async () => {
    const half = async url => (url.includes('news.google') ? { ok: false, status: 503 } : reply(rss([['A', 'Tue, 06 Oct 2026 10:00:00 GMT', 'https://y/1']])))
    const r = await createNews({ fetchImpl: half }).headlines('X', 'X Inc', { now: NOW })
    expect(r.items).toHaveLength(1)
    expect(r.feeds.find(f => f.name === 'Google News').ok).toBe(false)
    await expect(createNews({ fetchImpl: async () => ({ ok: false, status: 500 }) }).headlines('X', 'X', { now: NOW })).rejects.toThrow(/RSS 500/)
  })

  it('searches Google News for the symbol plus the company name without its legal suffix', async () => {
    const urls = []
    await createNews({ fetchImpl: async u => { urls.push(u); return reply(rss([])) } }).headlines('NVDA', 'NVIDIA Corporation', { now: NOW })
    expect(decodeURIComponent(urls[0])).toContain('NVDA NVIDIA stock')
  })
})
