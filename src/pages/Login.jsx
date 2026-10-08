import { useState } from 'react'
import { useTheme } from '../theme/index.js'
import { FONT_MONO, RADIUS } from '../theme/tokens.js'

export default function Login() {
  const t = useTheme()
  const [password, setPassword] = useState('regard')
  const [profile, setProfile] = useState(() => { try { return localStorage.getItem('rc_profile') ?? '' } catch { return '' } })
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const submit = async e => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, profile }),
      })
      if (!res.ok) {
        setError(res.status === 401 ? 'That password is not right.' : 'Sign-in is not configured on the server.')
        return
      }
      try { localStorage.setItem('rc_profile', profile) } catch { /* private mode */ }
      const next = new URLSearchParams(window.location.search).get('next')
      window.location.assign(next && next.startsWith('/') && !next.startsWith('//') ? next : '/')
    } catch {
      setError('Could not reach the server.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="starfield" style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', padding: 16 }}>
      <form
        onSubmit={submit}
        className="rise"
        style={{
          width: '100%', maxWidth: 380, padding: 32, background: t.card,
          border: `1px solid ${t.border}`, borderRadius: RADIUS, boxShadow: '0 2px 12px rgba(0,0,0,.06)',
        }}
      >
        <div className="kente" style={{ height: 6, borderRadius: 3, marginBottom: 24 }} aria-hidden="true" />
        <h1 style={{ margin: '0 0 4px', fontSize: 28, letterSpacing: '0.03em' }}>Regard Capital</h1>
        <p style={{ margin: '0 0 24px', color: t.mid, fontSize: 14 }}>Private research desk</p>
        <label htmlFor="pw" style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 6 }}>Password</label>
        <input
          id="pw"
          type="password"
          autoComplete="current-password"
          autoFocus
          value={password}
          onChange={e => setPassword(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'pw-err' : undefined}
          style={{
            width: '100%', padding: '10px 12px', fontSize: 16, fontFamily: FONT_MONO, color: t.hi,
            background: t.inputBg, border: `1px solid ${error ? t.down : t.border}`, borderRadius: 10,
          }}
        />
        <p style={{ margin: '4px 0 0', color: t.mid, fontSize: 13 }}>Default password: <code>regard</code></p>
        <label htmlFor="wl" style={{ display: 'block', fontSize: 14, fontWeight: 500, margin: '16px 0 6px' }}>Watchlist name <span style={{ color: t.mid, fontWeight: 400 }}>(optional)</span></label>
        <input
          id="wl"
          autoComplete="username"
          value={profile}
          onChange={e => setProfile(e.target.value)}
          placeholder="default"
          maxLength={32}
          style={{
            width: '100%', padding: '10px 12px', fontSize: 16, fontFamily: FONT_MONO, color: t.hi,
            background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 10,
          }}
        />
        <p style={{ margin: '6px 0 0', color: t.mid, fontSize: 13 }}>Each name keeps its own ADE watchlist. Use the same name on any device.</p>
        {error && <div id="pw-err" role="alert" style={{ color: t.down, fontSize: 14, marginTop: 6 }}>{error}</div>}
        <button
          type="submit"
          disabled={busy || !password}
          style={{
            width: '100%', marginTop: 20, padding: '12px 16px', fontSize: 16, fontWeight: 600,
            fontFamily: 'inherit', color: t.warn, background: t.purple, border: 'none', borderRadius: RADIUS,
            cursor: busy ? 'wait' : 'pointer', opacity: !password ? 0.6 : 1,
          }}
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
