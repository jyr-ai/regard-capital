// Per-ticker headlines from free RSS feeds: Google News search and Yahoo Finance's headline feed.
// No key. These dated headlines are the only "facts about recent events" the intel model is allowed
// to use (intel.js); its news items point back at them by index, so the source, link and date shown
// on the page always come from the feed, never from the model. `fetchImpl` is injectable.

import Parser from 'rss-parser'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
const MAX_AGE_DAYS = 30
const parser = new Parser()

const norm = t => t.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim()

// Google News titles end in " - Publisher"; split it off so the title and the source are separate.
function splitSource(title, fallback) {
  const m = /^(.*\S)\s+-\s+([^-]{2,60})$/.exec(title ?? '')
  return m ? { title: m[1], source: m[2].trim() } : { title: title ?? '', source: fallback }
}

export function createNews({ fetchImpl = fetch, timeoutMs = 8_000 } = {}) {
  async function feed(url, fallbackSource) {
    const res = await fetchImpl(url, { headers: { 'User-Agent': UA, Accept: 'application/rss+xml, application/xml, text/xml' }, signal: AbortSignal.timeout(timeoutMs) })
    if (!res.ok) throw new Error(`${fallbackSource} RSS ${res.status}`)
    const xml = await res.text()
    const parsed = await parser.parseString(xml)
    return (parsed.items ?? []).map(it => {
      const { title, source } = splitSource(it.title, it.source?.title ?? it.creator ?? fallbackSource)
      const date = new Date(it.isoDate ?? it.pubDate ?? NaN)
      return { title: title.trim(), source, url: it.link ?? null, date: Number.isNaN(+date) ? null : date.toISOString() }
    })
  }

  // Newest first, deduplicated, at most `limit`, none older than 30 days. Throws only when every feed failed.
  async function headlines(symbol, name, { limit = 25, now = new Date() } = {}) {
    const short = String(name ?? '').replace(/,?\s+(Inc|Corp|Corporation|Ltd|Holdings|plc|N\.V|S\.A|Co|Company|Group)\.?$/i, '').trim()
    const q = encodeURIComponent(`${symbol} ${short} stock`.trim())
    const sources = [
      [`https://news.google.com/rss/search?q=${q}+when:14d&hl=en-US&gl=US&ceid=US:en`, 'Google News'],
      [`https://feeds.finance.yahoo.com/rss/2.0/headline?s=${encodeURIComponent(symbol)}&region=US&lang=en-US`, 'Yahoo Finance'],
    ]
    const results = await Promise.allSettled(sources.map(([u, s]) => feed(u, s)))
    const ok = results.filter(r => r.status === 'fulfilled')
    if (!ok.length) throw new Error(results.map(r => r.reason?.message).join('; '))
    const cutoff = +now - MAX_AGE_DAYS * 864e5
    const seen = new Set()
    const items = []
    for (const it of ok.flatMap(r => r.value)) {
      if (!it.title || !it.date || +new Date(it.date) < cutoff || +new Date(it.date) > +now + 864e5) continue
      const key = norm(it.title).slice(0, 80)
      if (seen.has(key)) continue
      seen.add(key)
      items.push(it)
    }
    items.sort((a, b) => b.date.localeCompare(a.date))
    return { items: items.slice(0, limit), feeds: results.map((r, i) => ({ name: sources[i][1], ok: r.status === 'fulfilled', error: r.reason?.message })) }
  }

  return { headlines }
}
