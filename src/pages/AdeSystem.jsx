import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { BookOpen, BookText, ListChecks, Newspaper, Plus, RefreshCw, Settings, X } from 'lucide-react'
import { BANDS, adeAsOf } from '../../adapters/ade.js'
import { ErrorBoundary } from '../../adapters/ui.js'
import PipelineStatus from '../components/PipelineStatus.jsx'
import { useTheme } from '../theme/index.js'
import { FONT_MONO, RADIUS } from '../theme/tokens.js'

// The ADE dashboard is ~6.7k lines of JSX; it and the docs drawer load only when needed.
const AdeGuide = lazy(() => import('../components/AdeGuide.jsx'))
const Glossary = lazy(() => import('../components/Glossary.jsx'))
const SettingsPanel = lazy(() => import('../components/SettingsPanel.jsx'))
const WatchlistPanel = lazy(() => import('../components/WatchlistPanel.jsx'))

async function api(path, init) {
  const res = await fetch(path, init)
  if (res.status === 401) {
    window.location.assign(`/login?next=${encodeURIComponent(window.location.pathname)}`)
    throw new Error('signed out')
  }
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw Object.assign(new Error(body.error || `HTTP ${res.status}`), { status: res.status })
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
      await onAdded(r)
    } catch (err) {
      setStatus({ kind: 'error', message: err.message })
    }
  }

  const busy = status.kind === 'busy'
  return (
    <div style={{ position: 'relative', flex: '1 1 260px', minWidth: 0, maxWidth: 520 }}>
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
          style={{ flex: 1, minWidth: 0, padding: '11px 14px', fontSize: 17, fontFamily: FONT_MONO, color: t.hi, background: t.inputBg, border: `1px solid ${status.kind === 'error' ? t.down : t.border}`, borderRadius: 10 }}
        />
        <button
          type="submit"
          disabled={busy || !value.trim()}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '11px 18px', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, color: t.warn, background: t.purple, border: 'none', borderRadius: RADIUS, cursor: busy ? 'wait' : 'pointer', opacity: value.trim() ? 1 : 0.6 }}
        >
          <Plus size={16} aria-hidden="true" /> {busy ? 'Scoring…' : 'Add'}
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul role="listbox" aria-label="Matching tickers" style={{ position: 'absolute', zIndex: 150, top: 50, left: 0, right: 80, margin: 0, padding: 4, listStyle: 'none', background: t.cardB, border: `1px solid ${t.border}`, borderRadius: 10 }}>
          {suggestions.map(s => (
            <li key={s.symbol} role="option" aria-selected="false">
              <button type="button" onClick={() => submit(s.symbol)} style={{ display: 'flex', gap: 10, width: '100%', padding: '8px 10px', background: 'none', border: 'none', color: t.hi, fontFamily: 'inherit', fontSize: 16, textAlign: 'left', cursor: 'pointer' }}>
                <span style={{ fontFamily: FONT_MONO, fontWeight: 700, color: t.accent, minWidth: 56 }}>{s.symbol}</span>
                <span style={{ color: t.mid, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div id="add-ticker-status" role="status" aria-live="polite" style={{ marginTop: busy || status.kind === 'error' || status.kind === 'ok' ? 6 : 0, fontSize: 15 }}>
        {busy && <span style={{ color: t.mid }}>{busyLabel(status.ticker)}</span>}
        {status.kind === 'error' && <span style={{ color: t.down }}>{status.message}</span>}
        {status.kind === 'ok' && (
          <span style={{ color: t.mid }}>
            <strong style={{ color: t.hi }}>{status.r.symbol}</strong> {status.r.restored ? 'is back on your watchlist' : 'added'}: {status.r.band ?? 'unscored'}{status.r.score != null ? ` (${status.r.score})` : ''}.
          </span>
        )}
      </div>
    </div>
  )
}

export default function AdeSystem() {
  const t = useTheme()
  const [drawer, setDrawer] = useState(null) // 'guide' | 'glossary' | 'settings' | 'watchlist'
  const [intel, setIntel] = useState({ status: 'idle' }) // the intel job run from this page
  const [intelInfo, setIntelInfo] = useState(null) // GET /api/ade/intel: key configured, how many tickers are fresh
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

  const loadIntelInfo = useCallback(() => api('/api/ade/intel').then(setIntelInfo, () => setIntelInfo(null)), [])
  useEffect(() => { loadIntelInfo() }, [loadIntelInfo])

  // Runs the intel job from the browser: each call rewrites up to 3 tickers (one serverless invocation),
  // so loop until nothing is due. `symbols` limits it to tickers just added.
  const refreshIntel = useCallback(async (symbols = null) => {
    const label = symbols ? `Scouring news for ${symbols.join(', ')}…` : 'Reading the news and rewriting intel…'
    setIntel({ status: 'running', message: label, done: 0 })
    let done = 0
    const failed = []
    try {
      for (let round = 0; round < 15; round++) {
        const r = await api('/api/ade/intel/refresh', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(symbols ? { symbols, force: true } : {}) })
        done += r.done.length
        failed.push(...r.failed)
        setIntel({ status: 'running', message: `${label} ${done} written${r.remaining ? `, ${r.remaining} to go` : ''}.`, done })
        if (!r.remaining || symbols || (!r.done.length && !r.failed.length)) break
      }
      setIntel({ status: failed.length ? 'error' : 'ok', message: `${done} ticker${done === 1 ? '' : 's'} updated from today’s headlines.${failed.length ? ` Failed: ${failed.map(f => `${f.symbol} (${f.error})`).join('; ')}` : ''}` })
      await load()
    } catch (err) {
      if (err.status === 412) { setIntel({ status: 'error', message: err.message }); setDrawer('settings') } else setIntel({ status: 'error', message: err.message })
    }
    loadIntelInfo()
  }, [load, loadIntelInfo])

  const onAdded = useCallback(async r => {
    await load()
    if (r?.intelNeeded && intelInfo?.llm?.configured) refreshIntel([r.symbol])
  }, [load, refreshIntel, intelInfo])

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
  const restore = async sym => {
    await api('/api/ade/tickers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ticker: sym }) })
    await load()
  }
  const nameOf = sym => mod?.adeData.S[sym]?.name ?? data?.overlay?.[sym]?.name ?? sym
  const bookList = mod ? Object.keys(mod.adeData.S).filter(k => !mod.adeData.S[k].userAdded).map(sym => ({ sym, name: nameOf(sym) })) : []
  const hiddenList = (data?.hidden ?? []).map(sym => ({ sym, name: data?.overlay?.[sym]?.name ?? sym }))
  const pill = { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 14px', background: t.card, border: `1px solid ${t.border}`, borderRadius: 999, color: t.mid, fontFamily: 'inherit', fontSize: 16, cursor: 'pointer' }

  const notes = []
  if (live.status === 'error') notes.push({ key: 'err', down: true })
  if (intel.message) notes.push({ key: 'intel', text: intel.message, tone: intel.status })
  if (data?.failed.length > 0) notes.push({ key: 'failed', text: `Could not refresh: ${data.failed.map(f => f.symbol).join(', ')}.` })
  if (data?.store === 'memory') notes.push({ key: 'memory', text: 'Added tickers are in temporary server memory and reset on restart: connect Upstash Redis to keep them.' })

  return (
    <>
      <section className="starfield" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div className="container" style={{ padding: '14px 1.5rem 12px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px 24px' }}>
            <div style={{ flex: '0 1 auto' }}>
              <div className="rise" style={{ fontFamily: FONT_MONO, fontSize: 14, color: t.accent, letterSpacing: '0.1em' }}>
                {data ? `LIVE · YAHOO FINANCE · ${fmtTime(data.refreshedAt).toUpperCase()}` : live.status === 'error' ? 'NOT LIVE · ADE PUBLISHED DATA' : 'LOADING LIVE DATA'}
                {names ? ` · ${names} NAMES` : ''}
              </div>
              <h1 className="rise" style={{ '--i': 1, margin: 0, fontSize: 'clamp(1.8rem, 3.6vw, 2.4rem)', fontWeight: 700, lineHeight: 1.1 }}>ADE System</h1>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 12, flex: '1 1 480px', justifyContent: 'flex-end' }}>
              <AddTicker onAdded={onAdded} busyLabel={s => `Pulling ${s} from Yahoo and scoring it…`} />
              <button
                onClick={() => setDrawer('guide')}
                className="lift"
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, color: t.accent, background: 'transparent', border: `1.5px solid ${t.accent}`, borderRadius: RADIUS, cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                <BookOpen size={18} aria-hidden="true" /> How this is scored
              </button>
            </div>
          </div>

          <div className="rise" style={{ '--i': 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginTop: 10 }}>
            <ul aria-label="Verdicts by band" style={{ display: 'contents', listStyle: 'none' }}>
              {BANDS.map(b => (
                <li key={b} style={{ display: 'flex', alignItems: 'baseline', gap: 6, padding: '4px 14px', background: t.card, border: `1px solid ${t.border}`, borderRadius: 999, fontSize: 16 }}>
                  <span style={{ fontFamily: FONT_MONO, fontWeight: 700, color: bandColor[b] }}>{counts[b]}</span>
                  <span style={{ color: t.mid }}>{b.toLowerCase().replace('/', ' / ')}</span>
                </li>
              ))}
            </ul>
            <PipelineStatus live={data} />
            <button onClick={() => (intelInfo?.llm?.configured ? refreshIntel() : setDrawer('settings'))} disabled={intel.status === 'running'} style={pill}
              title="Read today's headlines for every ticker and rewrite the Intel, Playbook, risks, story and catalysts">
              <Newspaper size={16} aria-hidden="true" />
              {intel.status === 'running' ? 'Refreshing intel…' : intelInfo?.llm?.configured ? `Intel ${intelInfo.fresh}/${intelInfo.total} fresh · Refresh` : 'Intel: add API key'}
            </button>
            <button onClick={() => setDrawer('watchlist')} style={pill}><ListChecks size={16} aria-hidden="true" /> Watchlist{data?.profile && data.profile !== 'default' ? `: ${data.profile}` : ''}{hiddenList.length ? ` (${hiddenList.length} hidden)` : ''}</button>
            <button onClick={() => setDrawer('glossary')} style={pill}><BookText size={16} aria-hidden="true" /> Glossary</button>
            <button onClick={() => setDrawer('settings')} style={{ ...pill, padding: '6px 10px' }} aria-label="Settings" title="Settings: Anthropic API key"><Settings size={18} aria-hidden="true" /></button>
            {added.map(([sym, { block }]) => (
              <span key={sym} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 4px 3px 14px', background: t.card, border: `1px solid ${t.border}`, borderRadius: 999, fontSize: 16 }}>
                <span style={{ fontFamily: FONT_MONO, fontWeight: 700 }}>{sym}</span>
                <span style={{ color: bandColor[block.tech.verdict.label.split(' —')[0]] ?? t.mid }}>{block.tech.verdict.score}</span>
                <button onClick={() => remove(sym)} aria-label={`Remove ${sym}`} style={{ display: 'flex', background: 'none', border: 'none', color: t.mid, padding: 5, cursor: 'pointer' }}>
                  <X size={16} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </section>

      {notes.length > 0 && (
        <div className="container" style={{ paddingTop: 10 }}>
          {notes.map(n => n.down ? (
            <div key={n.key} role="alert" style={{ padding: '10px 14px', background: t.card, border: `1px solid ${t.down}`, borderRadius: 10, color: t.mid, fontSize: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
              <span>Live Yahoo data could not be loaded ({live.error}). Showing the numbers ADE last published{adeAsOf ? `, ${adeAsOf}` : ''}.</span>
              <button onClick={load} style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto', background: 'none', border: `1.5px solid ${t.border}`, borderRadius: 10, color: t.hi, padding: '4px 10px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 15 }}>
                <RefreshCw size={16} /> Retry
              </button>
            </div>
          ) : (
            <p key={n.key} role={n.key === 'intel' ? 'status' : undefined} style={{ margin: '0 0 4px', color: n.tone === 'error' ? t.down : n.tone === 'ok' ? t.up : t.mid, fontSize: 16 }}>{n.text}</p>
          ))}
        </div>
      )}

      <div className="ade-embed" style={{ marginTop: notes.length ? 10 : 0 }}>
        <ErrorBoundary label="ADE dashboard" theme={t}>
          {AdeApp && live.status !== 'loading'
            ? <AdeApp key={version} />
            : <div className="container" style={{ paddingTop: 24 }} aria-busy="true"><div className="skeleton" style={{ height: 480 }} /></div>}
        </ErrorBoundary>
      </div>

      <Suspense fallback={null}>
        {drawer === 'guide' && <AdeGuide onClose={() => setDrawer(null)} />}
        {drawer === 'glossary' && <Glossary onClose={() => setDrawer(null)} onOpenMethodology={() => setDrawer('guide')} />}
        {drawer === 'settings' && <SettingsPanel onClose={() => setDrawer(null)} onChange={loadIntelInfo} />}
        {drawer === 'watchlist' && (
          <WatchlistPanel profile={data?.profile ?? 'default'} book={bookList} added={added.map(([sym]) => ({ sym, name: nameOf(sym) }))} hidden={hiddenList}
            onRemove={remove} onRestore={restore} onClose={() => setDrawer(null)} />
        )}
      </Suspense>
    </>
  )
}
