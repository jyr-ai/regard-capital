import { useEffect, useState } from 'react'
import { KeyRound, Trash2 } from 'lucide-react'
import { useTheme } from '../theme/index.js'
import { FONT_MONO, RADIUS } from '../theme/tokens.js'
import Drawer from './Drawer.jsx'

async function call(path, init) {
  const res = await fetch(path, init)
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body.error || `HTTP ${res.status}`)
  return body
}

// The Anthropic API key that powers intel (news, playbooks, risks and catalysts for the 9 tabs).
// The key is checked with Anthropic, stored encrypted on the server, and never shown again: only its last 4.
export default function SettingsPanel({ onClose, onChange }) {
  const t = useTheme()
  const [status, setStatus] = useState(null)
  const [key, setKey] = useState('')
  const [state, setState] = useState({ kind: 'idle' })

  useEffect(() => { call('/api/settings').then(r => setStatus(r.anthropic), e => setState({ kind: 'error', message: e.message })) }, [])

  const save = async e => {
    e.preventDefault()
    setState({ kind: 'busy' })
    try {
      const r = await call('/api/settings/anthropic', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key }) })
      setStatus(r.anthropic); setKey(''); setState({ kind: 'ok', message: 'Key checked with Anthropic and saved.' }); onChange?.(r.anthropic)
    } catch (err) { setState({ kind: 'error', message: err.message }) }
  }
  const remove = async () => {
    setState({ kind: 'busy' })
    try { const r = await call('/api/settings/anthropic', { method: 'DELETE' }); setStatus(r.anthropic); setState({ kind: 'ok', message: 'Saved key removed.' }); onChange?.(r.anthropic) } catch (err) { setState({ kind: 'error', message: err.message }) }
  }

  return (
    <Drawer title="Settings" onClose={onClose} width={560}>
      <h3 style={{ margin: '0 0 6px', fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}><KeyRound size={18} aria-hidden="true" /> Anthropic API key</h3>
      <p style={{ margin: '0 0 12px', color: t.mid }}>
        Powers the intel job: Claude reads dated news headlines for each ticker and rewrites the Intel, Playbook, risk cards, Fundamentals story and Catalysts.
        Prices, scores and BUY/HOLD/AVOID ratings do not need a key: they are formulas over live Yahoo data.
      </p>
      <p style={{ margin: '0 0 16px', color: t.mid, fontSize: 15 }}>
        Cost is roughly a few cents per ticker per refresh (Claude Opus 5.5, low effort). The key is shared by everyone who signs in to this app.
      </p>
      <div role="status" style={{ padding: '10px 12px', border: `1px solid ${t.border}`, borderRadius: 10, background: t.card, marginBottom: 16 }}>
        {!status ? 'Checking…' : status.configured
          ? <>Active key ending <span style={{ fontFamily: FONT_MONO, color: t.hi }}>…{status.last4}</span> {status.source === 'user' ? '(saved here)' : '(from the server’s ANTHROPIC_API_KEY)'}</>
          : 'No key yet: the tabs show ADE’s last published text.'}
      </div>
      <form onSubmit={save} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <label htmlFor="ak" style={{ position: 'absolute', left: -9999 }}>Anthropic API key</label>
        <input id="ak" type="password" autoComplete="off" spellCheck="false" value={key} onChange={e => setKey(e.target.value)} placeholder="sk-ant-…"
          style={{ flex: '1 1 260px', padding: '11px 14px', fontSize: 16, fontFamily: FONT_MONO, color: t.hi, background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 10 }} />
        <button type="submit" disabled={!key.trim() || state.kind === 'busy'}
          style={{ padding: '11px 18px', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, color: t.warn, background: t.purple, border: 'none', borderRadius: RADIUS, cursor: 'pointer', opacity: key.trim() ? 1 : 0.6 }}>
          {state.kind === 'busy' ? 'Checking…' : 'Save key'}
        </button>
      </form>
      {status?.source === 'user' && (
        <button onClick={remove} style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: `1.5px solid ${t.border}`, borderRadius: 10, color: t.mid, padding: '6px 12px', fontFamily: 'inherit', fontSize: 15, cursor: 'pointer' }}>
          <Trash2 size={16} aria-hidden="true" /> Remove saved key
        </button>
      )}
      {state.message && <p role="alert" style={{ marginTop: 12, color: state.kind === 'error' ? t.down : t.up }}>{state.message}</p>}
      <p style={{ marginTop: 20, color: t.low, fontSize: 14 }}>Create a key at console.anthropic.com, under API keys. You can set a spending limit there.</p>
    </Drawer>
  )
}
