import { createElement, useState } from 'react'
import { Eye, EyeOff, X } from 'lucide-react'
import { useTheme } from '../theme/index.js'
import { FONT_MONO } from '../theme/tokens.js'
import Drawer from './Drawer.jsx'

// This profile's watchlist: hide ADE's tickers or remove ones you added; restore hidden ones.
// Hiding never changes ADE's data, only what this watchlist shows.
export default function WatchlistPanel({ profile, book, added, hidden, onRemove, onRestore, onClose }) {
  const t = useTheme()
  const [busy, setBusy] = useState(null)
  const [error, setError] = useState(null)
  const act = async (sym, fn) => {
    setBusy(sym); setError(null)
    try { await fn(sym) } catch (e) { setError(`${sym}: ${e.message}`) } finally { setBusy(null) }
  }
  const row = { display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: `1px solid ${t.border}` }
  const btn = { marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: `1.5px solid ${t.border}`, borderRadius: 10, color: t.mid, padding: '4px 10px', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer' }
  const Item = ({ sym, name, action, label, icon }) => (
    <li style={row}>
      <span style={{ fontFamily: FONT_MONO, fontWeight: 700, minWidth: 64 }}>{sym}</span>
      <span style={{ color: t.mid, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
      <button onClick={() => act(sym, action)} disabled={busy === sym} aria-label={`${label} ${sym}`} style={btn}>{createElement(icon, { size: 15, 'aria-hidden': 'true' })} {busy === sym ? '…' : label}</button>
    </li>
  )
  return (
    <Drawer title={`Watchlist: ${profile}`} onClose={onClose} width={560}>
      <p style={{ margin: '0 0 12px', color: t.mid }}>
        Each name you sign in with keeps its own watchlist. Sign out and sign in with a different watchlist name to start another.
      </p>
      {error && <p role="alert" style={{ color: t.down }}>{error}</p>}
      {added.length > 0 && <>
        <h3 style={{ fontSize: 17, margin: '16px 0 4px' }}>Added by you ({added.length})</h3>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>{added.map(a => <Item key={a.sym} sym={a.sym} name={a.name} action={onRemove} label="Remove" icon={X} />)}</ul>
      </>}
      <h3 style={{ fontSize: 17, margin: '16px 0 4px' }}>ADE&rsquo;s book ({book.length})</h3>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>{book.map(b => <Item key={b.sym} sym={b.sym} name={b.name} action={onRemove} label="Hide" icon={EyeOff} />)}</ul>
      {hidden.length > 0 && <>
        <h3 style={{ fontSize: 17, margin: '16px 0 4px' }}>Hidden ({hidden.length})</h3>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>{hidden.map(h => <Item key={h.sym} sym={h.sym} name={h.name} action={onRestore} label="Show" icon={Eye} />)}</ul>
      </>}
    </Drawer>
  )
}
