import { useCallback, useEffect, useState } from 'react'
import { ExternalLink, RefreshCw } from 'lucide-react'
import { SourceFooter } from '../../adapters/ui.js'
import { useTheme } from '../theme/index.js'
import { FONT_MONO, RADIUS } from '../theme/tokens.js'
import Icon from './Icon.jsx'

// Our panel over UNREDACTED's RSS engine (served by /api/feed). UNREDACTED's
// LiveFeedPanel hardcodes political tabs, so the panel is ours and the engine is theirs.

const REFRESH_MS = 5 * 60 * 1000

// Google News items repeat the headline as the summary; show a summary only when it adds something.
const squash = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '')
const addsDetail = item => item.detail && !squash(item.text).startsWith(squash(item.detail).slice(0, 40))
const ITEMS_SHOWN = 18

async function getJson(url) {
  const res = await fetch(url)
  if (res.status === 401) {
    window.location.assign(`/login?next=${encodeURIComponent(window.location.pathname)}`)
    throw new Error('signed out')
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

function FeedItem({ item, color, index }) {
  const t = useTheme()
  return (
    <li className="rise" style={{ '--i': Math.min(index, 8), listStyle: 'none', borderBottom: `1px solid ${t.border}` }}>
      <a
        href={item.url || undefined}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'block', padding: '12px 4px', textDecoration: 'none', color: t.hi }}
      >
        <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', fontFamily: FONT_MONO, fontSize: 12, color: t.mid }}>
          <span style={{ color, fontWeight: 500 }}>{item.source}</span>
          <span>{item.time}</span>
          {item.url && <ExternalLink size={11} style={{ marginLeft: 'auto', color: t.low }} aria-hidden="true" />}
        </div>
        <div style={{ fontSize: 16, lineHeight: 1.45, marginTop: 2 }}>{item.text}</div>
        {addsDetail(item) && (
          <div style={{ fontSize: 14, color: t.mid, marginTop: 2, maxWidth: '72ch' }}>{item.detail}</div>
        )}
      </a>
    </li>
  )
}

export default function MarketFeedPanel() {
  const t = useTheme()
  const [categories, setCategories] = useState([])
  const [tab, setTab] = useState('ALL')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getJson('/api/feed/categories').then(r => setCategories(r.categories)).catch(() => {})
  }, [])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const q = new URLSearchParams({ limit: String(ITEMS_SHOWN) })
      if (tab !== 'ALL') q.set('category', tab)
      setData(await getJson(`/api/feed/all?${q}`))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [tab])

  useEffect(() => {
    load()
    const id = setInterval(load, REFRESH_MS)
    return () => clearInterval(id)
  }, [load])

  const colorOf = key => categories.find(c => c.key === key)?.color || t.accent
  const tabs = [{ key: 'ALL', label: 'All', icon: 'Radio', color: t.accent }, ...categories]
  const items = data?.items || []
  const active = tabs.find(c => c.key === tab)

  return (
    <section aria-label="Market news" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: RADIUS, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderBottom: `1px solid ${t.border}` }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Wire</h2>
        <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: t.low }}>
          {data?.fetchedAt ? `updated ${new Date(data.fetchedAt).toLocaleTimeString()}` : ''}
        </span>
        <button
          onClick={load}
          disabled={loading}
          aria-label="Refresh"
          style={{ marginLeft: 'auto', display: 'flex', background: 'none', border: `1.5px solid ${t.border}`, borderRadius: 10, color: t.mid, padding: 6, cursor: 'pointer' }}
        >
          <RefreshCw size={15} />
        </button>
      </div>

      <div role="tablist" aria-label="Feed category" style={{ display: 'flex', gap: 4, padding: '0 10px', overflowX: 'auto', borderBottom: `1px solid ${t.border}` }}>
        {tabs.map(c => {
          const on = c.key === tab
          return (
            <button
              key={c.key}
              role="tab"
              aria-selected={on}
              onClick={() => setTab(c.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '10px 10px 8px', whiteSpace: 'nowrap',
                background: 'none', border: 'none', borderBottom: `3px solid ${on ? c.color : 'transparent'}`,
                color: on ? t.hi : t.mid, fontFamily: 'inherit', fontSize: 14, fontWeight: on ? 600 : 500, cursor: 'pointer',
              }}
            >
              <Icon name={c.icon} size={14} style={{ color: c.color }} />
              {c.label}
            </button>
          )
        })}
      </div>

      <div style={{ padding: '0 18px 14px' }}>
        {loading && !items.length && (
          <div aria-busy="true" style={{ paddingTop: 14 }}>
            {[0, 1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: 54, marginBottom: 12 }} />)}
          </div>
        )}
        {error && !items.length && (
          <div role="alert" style={{ padding: '24px 0', color: t.mid }}>
            The feed could not load ({error}).{' '}
            <button onClick={load} style={{ background: 'none', border: 'none', color: t.accent, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}>
              Try again
            </button>
          </div>
        )}
        {!loading && !error && !items.length && (
          <div style={{ padding: '24px 0', color: t.mid }}>No stories in this category right now.</div>
        )}
        <ul style={{ margin: 0, padding: 0 }}>
          {items.map((item, i) => (
            <FeedItem key={`${item.sourceId}-${item.url || item.text}`} item={item} index={i} color={colorOf(item.category)} />
          ))}
        </ul>
        <SourceFooter
          s={tab === 'ALL'
            ? 'RSS: Reuters, CNBC, MarketWatch, Yahoo Finance, Federal Reserve, SEC, Google News · engine: UNREDACTED rssFeed'
            : `RSS: ${(active?.sources || []).join(', ')}`}
        />
      </div>
    </section>
  )
}
