import { useEffect, useState } from 'react'
import { KeyRound, Sparkles, Trash2 } from 'lucide-react'
import { useTheme } from '../theme/index.js'
import { FONT_MONO, RADIUS } from '../theme/tokens.js'
import Drawer from './Drawer.jsx'

async function call(path, init) {
  const res = await fetch(path, init)
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body.error || `HTTP ${res.status}`)
  return body
}

export default function SettingsPanel({ onClose, onChange }) {
  const t = useTheme()
  const [anthropicStatus, setAnthropicStatus] = useState(null)
  const [geminiStatus, setGeminiStatus] = useState(null)
  const [anthropicKey, setAnthropicKey] = useState('')
  const [geminiKey, setGeminiKey] = useState('')
  const [anthropicState, setAnthropicState] = useState({ kind: 'idle' })
  const [geminiState, setGeminiState] = useState({ kind: 'idle' })

  const loadSettings = () => {
    call('/api/settings').then(
      r => {
        setAnthropicStatus(r.anthropic)
        setGeminiStatus(r.gemini)
      },
      e => setAnthropicState({ kind: 'error', message: e.message }),
    )
  }

  useEffect(() => {
    loadSettings()
  }, [])

  const saveGemini = async e => {
    e.preventDefault()
    setGeminiState({ kind: 'busy' })
    try {
      const r = await call('/api/settings/gemini', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: geminiKey }),
      })
      setGeminiStatus(r.gemini)
      setGeminiKey('')
      setGeminiState({ kind: 'ok', message: 'Gemini key verified and saved.' })
      onChange?.(r.gemini)
    } catch (err) {
      setGeminiState({ kind: 'error', message: err.message })
    }
  }

  const removeGemini = async () => {
    setGeminiState({ kind: 'busy' })
    try {
      const r = await call('/api/settings/gemini', { method: 'DELETE' })
      setGeminiStatus(r.gemini)
      setGeminiState({ kind: 'ok', message: 'Saved Gemini key removed.' })
      onChange?.(r.gemini)
    } catch (err) {
      setGeminiState({ kind: 'error', message: err.message })
    }
  }

  const saveAnthropic = async e => {
    e.preventDefault()
    setAnthropicState({ kind: 'busy' })
    try {
      const r = await call('/api/settings/anthropic', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: anthropicKey }),
      })
      setAnthropicStatus(r.anthropic)
      setAnthropicKey('')
      setAnthropicState({ kind: 'ok', message: 'Anthropic key verified and saved.' })
      onChange?.(r.anthropic)
    } catch (err) {
      setAnthropicState({ kind: 'error', message: err.message })
    }
  }

  const removeAnthropic = async () => {
    setAnthropicState({ kind: 'busy' })
    try {
      const r = await call('/api/settings/anthropic', { method: 'DELETE' })
      setAnthropicStatus(r.anthropic)
      setAnthropicState({ kind: 'ok', message: 'Saved Anthropic key removed.' })
      onChange?.(r.anthropic)
    } catch (err) {
      setAnthropicState({ kind: 'error', message: err.message })
    }
  }

  return (
    <Drawer title="Settings" onClose={onClose} width={580}>
      <p style={{ margin: '0 0 16px', color: t.mid, fontSize: 15 }}>
        LLM keys power the automated intelligence engine: generating narratives, key drivers, risk cards, and playbooks from live financial news and market data.
        Prices and mathematical ratings are calculated from live Yahoo data and do not consume LLM tokens.
      </p>

      {/* GEMINI SECTION */}
      <div style={{ marginBottom: 28, paddingBottom: 24, borderBottom: `1px solid ${t.border}` }}>
        <h3 style={{ margin: '0 0 6px', fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={18} style={{ color: t.accent }} aria-hidden="true" />
          Google Gemini API key
        </h3>
        <p style={{ margin: '0 0 12px', color: t.mid, fontSize: 14 }}>
          Uses <code style={{ color: t.accent }}>gemini-3.8-flash</code> for rapid structured market intel analysis.
        </p>
        <div role="status" style={{ padding: '10px 12px', border: `1px solid ${t.border}`, borderRadius: 10, background: t.card, marginBottom: 14 }}>
          {!geminiStatus ? (
            'Checking…'
          ) : geminiStatus.configured ? (
            <>
              Active Gemini key ending <span style={{ fontFamily: FONT_MONO, color: t.hi }}>…{geminiStatus.last4}</span>{' '}
              {geminiStatus.source === 'user' ? '(saved here)' : '(from server’s GEMINI_API_KEY)'}
            </>
          ) : (
            'No Gemini key configured.'
          )}
        </div>
        <form onSubmit={saveGemini} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <label htmlFor="gk" style={{ position: 'absolute', left: -9999 }}>Gemini API key</label>
          <input
            id="gk"
            type="password"
            autoComplete="off"
            spellCheck="false"
            value={geminiKey}
            onChange={e => setGeminiKey(e.target.value)}
            placeholder="AIzaSy…"
            style={{
              flex: '1 1 240px', padding: '10px 14px', fontSize: 15, fontFamily: FONT_MONO, color: t.hi,
              background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 10,
            }}
          />
          <button
            type="submit"
            disabled={!geminiKey.trim() || geminiState.kind === 'busy'}
            style={{
              padding: '10px 18px', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: t.warn,
              background: t.purple, border: 'none', borderRadius: RADIUS, cursor: 'pointer', opacity: geminiKey.trim() ? 1 : 0.6,
            }}
          >
            {geminiState.kind === 'busy' ? 'Checking…' : 'Save Gemini key'}
          </button>
        </form>
        {geminiStatus?.source === 'user' && (
          <button
            onClick={removeGemini}
            style={{
              marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none',
              border: `1.5px solid ${t.border}`, borderRadius: 10, color: t.mid, padding: '6px 12px',
              fontFamily: 'inherit', fontSize: 14, cursor: 'pointer',
            }}
          >
            <Trash2 size={15} aria-hidden="true" /> Remove saved Gemini key
          </button>
        )}
        {geminiState.message && (
          <p role="alert" style={{ marginTop: 10, fontSize: 14, color: geminiState.kind === 'error' ? t.down : t.up }}>
            {geminiState.message}
          </p>
        )}
        <p style={{ marginTop: 10, color: t.low, fontSize: 13 }}>
          Obtain an API key from Google AI Studio at <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer">aistudio.google.com</a>.
        </p>
      </div>

      {/* ANTHROPIC SECTION */}
      <div>
        <h3 style={{ margin: '0 0 6px', fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
          <KeyRound size={18} aria-hidden="true" />
          Anthropic API key
        </h3>
        <p style={{ margin: '0 0 12px', color: t.mid, fontSize: 14 }}>
          Uses Claude Opus 5.5 for qualitative analysis across stock news headlines.
        </p>
        <div role="status" style={{ padding: '10px 12px', border: `1px solid ${t.border}`, borderRadius: 10, background: t.card, marginBottom: 14 }}>
          {!anthropicStatus ? (
            'Checking…'
          ) : anthropicStatus.configured ? (
            <>
              Active Anthropic key ending <span style={{ fontFamily: FONT_MONO, color: t.hi }}>…{anthropicStatus.last4}</span>{' '}
              {anthropicStatus.source === 'user' ? '(saved here)' : '(from server’s ANTHROPIC_API_KEY)'}
            </>
          ) : (
            'No Anthropic key configured.'
          )}
        </div>
        <form onSubmit={saveAnthropic} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <label htmlFor="ak" style={{ position: 'absolute', left: -9999 }}>Anthropic API key</label>
          <input
            id="ak"
            type="password"
            autoComplete="off"
            spellCheck="false"
            value={anthropicKey}
            onChange={e => setAnthropicKey(e.target.value)}
            placeholder="sk-ant-…"
            style={{
              flex: '1 1 240px', padding: '10px 14px', fontSize: 15, fontFamily: FONT_MONO, color: t.hi,
              background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 10,
            }}
          />
          <button
            type="submit"
            disabled={!anthropicKey.trim() || anthropicState.kind === 'busy'}
            style={{
              padding: '10px 18px', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: t.warn,
              background: t.purple, border: 'none', borderRadius: RADIUS, cursor: 'pointer', opacity: anthropicKey.trim() ? 1 : 0.6,
            }}
          >
            {anthropicState.kind === 'busy' ? 'Checking…' : 'Save Anthropic key'}
          </button>
        </form>
        {anthropicStatus?.source === 'user' && (
          <button
            onClick={removeAnthropic}
            style={{
              marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none',
              border: `1.5px solid ${t.border}`, borderRadius: 10, color: t.mid, padding: '6px 12px',
              fontFamily: 'inherit', fontSize: 14, cursor: 'pointer',
            }}
          >
            <Trash2 size={15} aria-hidden="true" /> Remove saved Anthropic key
          </button>
        )}
        {anthropicState.message && (
          <p role="alert" style={{ marginTop: 10, fontSize: 14, color: anthropicState.kind === 'error' ? t.down : t.up }}>
            {anthropicState.message}
          </p>
        )}
        <p style={{ marginTop: 10, color: t.low, fontSize: 13 }}>
          Create an API key at console.anthropic.com under API keys.
        </p>
      </div>
    </Drawer>
  )
}
