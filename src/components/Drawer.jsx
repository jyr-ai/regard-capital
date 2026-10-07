import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { useTheme } from '../theme/index.js'
import { Z } from '../theme/tokens.js'

// Right-hand modal drawer: Escape or the backdrop closes it, focus starts on the close button.
export default function Drawer({ title, onClose, width = 640, children }) {
  const t = useTheme()
  const closeRef = useRef(null)
  useEffect(() => {
    closeRef.current?.focus()
    const onKey = e => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: Z.modal }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.6)' }} aria-hidden="true" />
      <aside role="dialog" aria-modal="true" aria-label={title}
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: `min(${width}px, 100%)`, background: t.page, borderLeft: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: `1px solid ${t.border}` }}>
          <h2 style={{ margin: 0, fontSize: 21, fontWeight: 600 }}>{title}</h2>
          <button ref={closeRef} onClick={onClose} aria-label="Close"
            style={{ marginLeft: 'auto', display: 'flex', background: 'none', border: `1.5px solid ${t.border}`, borderRadius: 10, color: t.mid, padding: 6, cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </header>
        <div style={{ flex: 1, overflowY: 'auto', padding: 20, fontSize: 16, lineHeight: 1.55 }}>{children}</div>
      </aside>
    </div>
  )
}
