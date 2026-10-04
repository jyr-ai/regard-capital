import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { BookOpen, Plus, RefreshCw, X } from 'lucide-react'
import { BANDS, adeAsOf } from '../../adapters/ade.js'
import { ErrorBoundary } from '../../adapters/ui.js'
import PipelineStatus from '../components/PipelineStatus.jsx'
import { useTheme } from '../theme/index.js'
import { FONT_MONO, RADIUS } from '../theme/tokens.js'

// The ADE dashboard is ~6.7k lines of JSX; it and the docs drawer load only when needed.
const AdeGuide = lazy(() => import('../components/AdeGuide.jsx'))

async function api(path, init) {
  const res = await fetch(path, init)
  if (res.status === 401) {
    window.location.assign(`/login?next=${encodeURIComponent(window.location.pathname)}`)
    throw new Error('signed out')
  }
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body.error || `HTTP ${res.status}`)
  return body
}

const fmtTime = iso => new Date(iso).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })

function AddTicker({ onAdded, busyLabel }) {
  const t = useTheme()
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [status, setStatus] = useState({ kind: 'idle' })
  const timer = useRef(null)

  // Suggestions from Yahoo search, debounced.
  useEffect(() => {
    clearTimeout(timer.current)
    const q = value.trim()
    if (q.length < 2) { setSuggestions([]); return }
    timer.current = setTimeout(() => {
      api(`/api/ade/search?q=${encodeURIComponent(q)}`).then(r => setSuggestions(r.results.slice(0, 5))).catch(() => setSuggestions([]))
    }, 250)
    return () => clearTimeout(timer.current)
  }, [value])

  const submit = async symbol => {
    const ticker = (symbol ?? value).trim()
    if (!ticker) return
    setStatus({ kind: 'busy', ticker })
    setSuggestions([])
    try {
      const r = await api('/api/ade/tickers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ticker }) })
      setValue('')
      setStatus({ kind: 'ok', r })
      await onAdded()
    } catch (err) {
      setStatus({ kind: 'error', message: err.message })
    }
  }

  const busy = status.kind === 'busy'
  return (
    <div style={{ position: 'relative', flex: '1 1 340px', maxWidth: 520 }}>
      <form onSubmit={e => { e.preventDefault(); submit() }} style={{ display: 'flex', gap: 8 }}>
        <label htmlFor="add-ticker" style={{ position: 'absolute', left: -9999 }}>Add a ticker to the ADE system</label>
        <input
          id="add-ticker"
          value={value}
          onChange={e => { setValue(e.target.value); if (status.kind !== 'busy') setStatus({ kind: 'idle' }) }}
          placeholder="Add a ticker (e.g. CRWV) to score it"
          autoComplete="off"
          spellCheck="false"
          disabled={busy}
          aria-invalid={status.kind === 'error'}
          aria-describedby="add-ticker-status"
          style={{ flex: 1, minWidth: 0, padding: '10px 12px', fontSize: 16, fontFamily: FONT_MONO, color: t.hi, background: t.inputBg, border: `1px solid ${status.kind === 'error' ? t.down : t.border}`, borderRadius: 10 }}
        />
        <button
          type="submit"
          disabled={busy || !value.trim()}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: t.warn, background: t.purple, border: 'none', borderRadius: RADIUS, cursor: busy ? 'wait' : 'pointer', opacity: value.trim() ? 1 : 0.6 }}
        >
          <Plus size={16} aria-hidden="true" /> {busy ? 'Scoring…' : 'Add'}
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul role="listbox" aria-label="Matching tickers" style={{ position: 'absolute', zIndex: 150, top: 46, left: 0, right: 80, margin: 0, padding: 4, listStyle: 'none', background: t.cardB, border: `1px solid ${t.border}`, borderRadius: 10 }}>
          {suggestions.map(s => (
            <li key={s.symbol} role="option" aria-selected="false">
              <button type="button" onClick={() => submit(s.symbol)} style={{ display: 'flex', gap: 10, width: '100%', padding: '8px 10px', background: 'none', border: 'none', color: t.hi, fontFamily: 'inherit', fontSize: 14, textAlign: 'left', cursor: 'pointer' }}>
                <span style={{ fontFamily: FONT_MONO, fontWeight: 700, color: t.accent, minWidth: 56 }}>{s.symbol}</span>
                <span style={{ color: t.mid, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div id="add-ticker-status" role="status" aria-live="polite" style={{ minHeight: 20, marginTop: 6, fontSize: 14 }}>
        {busy && <span style={{ color: t.mid }}>{busyLabel(status.ticker)}</span>}
        {status.kind === 'error' && <span style={{ color: t.down }}>{status.message}</span>}
        {status.kind === 'ok' && (
          <span style={{ color: t.mid }}>
            <strong style={{ color: t.hi }}>{status.r.symbol}</strong> added: {status.r.band ?? 'unscored'}{status.r.score != null ? ` (${status.r.score})` : ''}.
            {status.r.proseNote ? ` ${status.r.proseNote}` : ' Narrative drafted by Claude, unverified.'}
          </span>
        )}
      </div>
    </div>
  )
}

export default function AdeSystem() {
  const t = useTheme()
  const [guideOpen, setGuideOpen] = useState(false)
  const [mod, setMod] = useState(null) // the lazily loaded dashboard module
  const [live, setLive] = useState({ status: 'loading' })
  const [version, setVersion] = useState(0) // bumped to remount the dashboard after data changes
  const bandColor = { 'STRONG BUY': t.violetText, BUY: t.up, HOLD: t.warn, 'TRIM/AVOID': t.down }

  const load = useCallback(async () => {
    setLive(prev => ({ ...prev, status: prev.data ? 'refreshing' : 'loading' }))
    const [m, data] = await Promise.all([
      mod ?? import('../../adapters/ade-app.js'),
      api('/api/ade/live').catch(err => ({ error: err.message })),
    ])
    setMod(m)
    if (data.error) {
      // The dashboard still renders from the data ADE published; say that the numbers are not live.
      setLive({ status: 'error', error: data.error })
    } else {
      m.applyLive(data)
      setLive({ status: 'ready', data })
    }
    setVersion(v => v + 1)
  }, [mod])

  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const data = live.data
  const AdeApp = mod?.default
  const added = data ? Object.entries(data.added) : []
  const counts = Object.fromEntries(BANDS.map(b => [b, 0]))
  if (mod) for (const s of Object.values(mod.adeData.S)) { const b = s.tech?.verdict?.label?.split(' —')[0]; if (b in counts) counts[b]++ }
  const names = mod ? Object.keys(mod.adeData.S).length : 0

  const remove = async sym => {
    await api(`/api/ade/tickers/${encodeURIComponent(sym)}`, { method: 'DELETE' })
    await load()
  }

  return (
    <>
      <section className="starfield" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div className="container" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem) 1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 24 }}>
          <div style={{ flex: '1 1 320px' }}>
            <div className="rise" style={{ fontFamily: FONT_MONO, fontSize: 13, color: t.accent, letterSpacing: '0.12em' }}>
              {data ? `LIVE · YAHOO FINANCE · ${fmtTime(data.refreshedAt).toUpperCase()}` : live.status === 'error' ? 'NOT LIVE · ADE PUBLISHED DATA' : 'LOADING LIVE DATA'}
              {names ? ` · ${names} NAMES` : ''}
            </div>
            <h1 className="rise" style={{ '--i': 1, margin: '4px 0 0', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 700, lineHeight: 1.05 }}>ADE System</h1>
            <PipelineStatus live={data} />
            <ul className="rise" aria-label="Verdicts by band" style={{ '--i': 2, display: 'flex', flexWrap: 'wrap', gap: 8, margin: '14px 0 0', padding: 0, listStyle: 'none' }}>
              {BANDS.map(b => (
                <li key={b} style={{ display: 'flex', alignItems: 'baseline', gap: 6, padding: '4px 12px', background: t.card, border: `1px solid ${t.border}`, borderRadius: 999, fontSize: 14 }}>
                  <span style={{ fontFamily: FONT_MONO, fontWeight: 700, color: bandColor[b] }}>{counts[b]}</span>
                  <span style={{ color: t.mid }}>{b.toLowerCase().replace('/', ' / ')}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <AddTicker onAdded={load} busyLabel={s => `Pulling ${s} from Yahoo, scoring it, and drafting the narrative…`} />
            {added.length > 0 && (
              <ul aria-label="Tickers you added" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: 0, padding: 0, listStyle: 'none' }}>
                {added.map(([sym, { block }]) => (
                  <li key={sym} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 4px 3px 12px', background: t.card, border: `1px solid ${t.border}`, borderRadius: 999, fontSize: 14 }}>
                    <span style={{ fontFamily: FONT_MONO, fontWeight: 700 }}>{sym}</span>
                    <span style={{ color: bandColor[block.tech.verdict.label.split(' —')[0]] ?? t.mid }}>{block.tech.verdict.score}</span>
                    <button onClick={() => remove(sym)} aria-label={`Remove ${sym}`} style={{ display: 'flex', background: 'none', border: 'none', color: t.mid, padding: 4, cursor: 'pointer' }}>
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={() => setGuideOpen(true)}
            className="lift"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: t.accent, background: 'transparent', border: `1.5px solid ${t.accent}`, borderRadius: RADIUS, cursor: 'pointer' }}
          >
            <BookOpen size={16} aria-hidden="true" /> How this is scored
          </button>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 14 }}>
        {live.status === 'error' && (
          <div role="alert" style={{ padding: '10px 14px', background: t.card, border: `1px solid ${t.down}`, borderRadius: 10, color: t.mid, fontSize: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
            <span>Live Yahoo data could not be loaded ({live.error}). Showing the numbers ADE last published{adeAsOf ? `, ${adeAsOf}` : ''}.</span>
            <button onClick={load} style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto', background: 'none', border: `1.5px solid ${t.border}`, borderRadius: 10, color: t.hi, padding: '4px 10px', cursor: 'pointer', fontFamily: 'inherit' }}>
              <RefreshCw size={14} /> Retry
            </button>
          </div>
        )}
        {data && (
          <p style={{ margin: 0, color: t.low, fontSize: 13, maxWidth: '110ch' }}>
            Prices, targets, support levels, indicators and scores are live from Yahoo Finance (refreshed daily after the US close).
            ADE&rsquo;s written analysis (news, playbooks, risk cards) is as ADE last published it{adeAsOf ? `, ${adeAsOf}` : ''}, so its text can quote older numbers.
            {data.failed.length > 0 && ` Could not refresh: ${data.failed.map(f => f.symbol).join(', ')}.`}
            {data.store === 'memory' && ' Added tickers are in temporary server memory and reset on restart: connect Upstash Redis to keep them.'}
          </p>
        )}
      </div>

      <div className="ade-embed" style={{ marginTop: 10 }}>
        <ErrorBoundary label="ADE dashboard" theme={t}>
          {AdeApp && live.status !== 'loading'
            ? <AdeApp key={version} />
            : <div className="container" style={{ paddingTop: 24 }} aria-busy="true"><div className="skeleton" style={{ height: 480 }} /></div>}
        </ErrorBoundary>
      </div>

      {guideOpen && (
        <Suspense fallback={null}>
          <AdeGuide onClose={() => setGuideOpen(false)} />
        </Suspense>
      )}
    </>
  )
}
