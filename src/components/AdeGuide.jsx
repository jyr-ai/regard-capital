import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { adeDocGroups, adeDocs, splitFrontmatter } from '../../adapters/ade-docs.js'
import { useTheme } from '../theme/index.js'
import { FONT_MONO, RADIUS, Z } from '../theme/tokens.js'
import Markdown from './Markdown.jsx'

// Right-hand drawer with ADE's own skills and methodology docs, so the scoring rules
// are readable next to the numbers they produce.
export default function AdeGuide({ onClose }) {
  const t = useTheme()
  const [activeId, setActiveId] = useState(adeDocs[0]?.id)
  const [state, setState] = useState({ status: 'loading' })
  const closeRef = useRef(null)
  const active = adeDocs.find(d => d.id === activeId)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = e => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading' })
    active?.load().then(
      raw => !cancelled && setState({ status: 'ready', ...splitFrontmatter(raw) }),
      () => !cancelled && setState({ status: 'error' }),
    )
    return () => { cancelled = true }
  }, [active])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: Z.modal }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.6)' }} aria-hidden="true" />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="How the ADE book is scored"
        style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: 'min(760px, 100%)',
          background: t.page, borderLeft: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column',
        }}
      >
        <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: `1px solid ${t.border}` }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>How this is scored</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            style={{ marginLeft: 'auto', display: 'flex', background: 'none', border: `1.5px solid ${t.border}`, borderRadius: 10, color: t.mid, padding: 6, cursor: 'pointer' }}
          >
            <X size={16} />
          </button>
        </header>

        <div role="tablist" aria-label="Documents" style={{ display: 'flex', gap: 4, padding: '0 14px', overflowX: 'auto', borderBottom: `1px solid ${t.border}` }}>
          {adeDocGroups.map(group => (
            <div key={group} style={{ display: 'flex', alignItems: 'center', gap: 2, paddingRight: 12 }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: t.low, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0 6px' }}>{group}</span>
              {adeDocs.filter(d => d.group === group).map(d => {
                const on = d.id === activeId
                return (
                  <button
                    key={d.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActiveId(d.id)}
                    style={{
                      padding: '12px 8px 9px', whiteSpace: 'nowrap', background: 'none', border: 'none',
                      borderBottom: `3px solid ${on ? t.accent : 'transparent'}`, color: on ? t.hi : t.mid,
                      fontFamily: 'inherit', fontSize: 14, fontWeight: on ? 600 : 500, cursor: 'pointer',
                    }}
                  >
                    {d.title}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 40px' }}>
          {state.status === 'loading' && <div className="skeleton" style={{ height: 240, borderRadius: RADIUS }} aria-busy="true" />}
          {state.status === 'error' && <p role="alert" style={{ color: t.mid }}>This document could not be loaded.</p>}
          {state.status === 'ready' && (
            <>
              {state.meta.description && (
                <p style={{ margin: '0 0 20px', padding: '12px 14px', background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, color: t.mid, fontSize: 14 }}>
                  {state.meta.description}
                </p>
              )}
              <Markdown>{state.body}</Markdown>
            </>
          )}
        </div>
      </aside>
    </div>
  )
}
