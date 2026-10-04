import { useTheme } from '../theme/index.js'
import { FONT_MONO, RADIUS } from '../theme/tokens.js'
import Icon from '../components/Icon.jsx'

// Empty state for pages whose upstream source is wired in a later phase.
export default function Upcoming({ page }) {
  const t = useTheme()
  return (
    <div className="container" style={{ paddingTop: 64 }}>
      <div
        className="rise"
        style={{
          maxWidth: 560, margin: '0 auto', textAlign: 'center', padding: '48px 32px',
          background: t.card, border: `1px solid ${t.border}`, borderRadius: RADIUS,
        }}
      >
        <div style={{ display: 'inline-flex', padding: 14, borderRadius: 999, background: `${t.purple}33`, color: t.accent, marginBottom: 16 }}>
          <Icon name={page.icon} size={28} />
        </div>
        <h1 style={{ margin: '0 0 8px', fontSize: 28 }}>{page.label}</h1>
        <p style={{ margin: 0, color: t.mid }}>
          Wired in phase {page.phase}, from <span style={{ fontFamily: FONT_MONO, color: t.hi }}>{page.source}</span>.
        </p>
      </div>
    </div>
  )
}
