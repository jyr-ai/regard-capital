import { useMemo, useState } from 'react'
import { ExternalLink, Search } from 'lucide-react'
import { GLOSSARY, GROUPS, investopedia } from '../data/glossary.js'
import { useTheme } from '../theme/index.js'
import { FONT_MONO } from '../theme/tokens.js'
import Drawer from './Drawer.jsx'

// Every metric on the ADE System page, in plain English, with where to read more.
export default function Glossary({ onClose, onOpenMethodology }) {
  const t = useTheme()
  const [q, setQ] = useState('')
  const [group, setGroup] = useState('All')
  const items = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return GLOSSARY.filter(g => (group === 'All' || g.group === group) && (!needle || `${g.term} ${g.def}`.toLowerCase().includes(needle)))
  }, [q, group])
  const chip = active => ({ padding: '5px 12px', borderRadius: 999, border: `1px solid ${active ? t.accent : t.border}`, background: active ? t.card : 'transparent', color: active ? t.accent : t.mid, fontFamily: 'inherit', fontSize: 15, cursor: 'pointer' })
  const link = { color: t.accent, display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none', fontSize: 15 }

  return (
    <Drawer title="Glossary" onClose={onClose} width={760}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', border: `1px solid ${t.border}`, borderRadius: 10, background: t.inputBg }}>
        <Search size={18} aria-hidden="true" color={t.mid} />
        <span style={{ position: 'absolute', left: -9999 }}>Search the glossary</span>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search: RSI, max pain, forward P/E…" autoFocus
          style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: t.hi, fontSize: 17, fontFamily: 'inherit' }} />
      </label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '12px 0 4px' }}>
        {['All', ...GROUPS].map(g => <button key={g} onClick={() => setGroup(g)} aria-pressed={group === g} style={chip(group === g)}>{g}</button>)}
      </div>
      <p style={{ color: t.low, fontSize: 14, margin: '6px 0 14px' }}>{items.length} of {GLOSSARY.length} terms. Definitions are plain-English summaries; follow the links for full explanations.</p>
      <dl style={{ margin: 0 }}>
        {items.map(g => (
          <div key={g.term} style={{ padding: '14px 0', borderTop: `1px solid ${t.border}` }}>
            <dt style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
              <strong style={{ fontSize: 18, color: t.hi }}>{g.term}</strong>
              <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: t.low }}>{g.group}</span>
            </dt>
            <dd style={{ margin: '6px 0 0' }}>
              <p style={{ margin: '0 0 6px' }}>{g.def}</p>
              <p style={{ margin: '0 0 4px', color: t.mid }}><strong style={{ color: t.accent }}>How to use it.</strong> {g.how}</p>
              <p style={{ margin: '0 0 8px', color: t.mid }}><strong style={{ color: t.accent }}>Why it matters.</strong> {g.why}</p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <a href={investopedia(g.term.replace(/\s*\(.*\)/, ''))} target="_blank" rel="noopener noreferrer" style={link}>Investopedia <ExternalLink size={14} aria-hidden="true" /></a>
                {g.link?.url && <a href={g.link.url} target="_blank" rel="noopener noreferrer" style={link}>{g.link.label} <ExternalLink size={14} aria-hidden="true" /></a>}
                {g.link && !g.link.url && <button onClick={onOpenMethodology} style={{ ...link, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}>{g.link.label}</button>}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </Drawer>
  )
}
