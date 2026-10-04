import { lazy, Suspense, useState } from 'react'
import { BookOpen } from 'lucide-react'
import { BANDS, adeAsOf, adeVerdicts, bandCounts } from '../../adapters/ade.js'
import { ErrorBoundary } from '../../adapters/ui.js'
import { useTheme } from '../theme/index.js'
import { FONT_MONO, RADIUS } from '../theme/tokens.js'

// The ADE dashboard is ~6.7k lines of JSX; it and the docs drawer load only when needed.
const AdeApp = lazy(() => import('../../adapters/ade-app.js'))
const AdeGuide = lazy(() => import('../components/AdeGuide.jsx'))

export default function AdeBook() {
  const t = useTheme()
  const [guideOpen, setGuideOpen] = useState(false)
  const counts = bandCounts()
  const bandColor = { 'STRONG BUY': t.violetText, BUY: t.up, HOLD: t.warn, 'TRIM/AVOID': t.down }
  const names = Object.keys(adeVerdicts).length
  const asOf = adeAsOf
    ? new Date(`${adeAsOf}T12:00:00`).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
    : null

  return (
    <>
      <section className="starfield" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div className="container" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem) 1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 20 }}>
          <div style={{ flex: '1 1 320px' }}>
            <div className="rise" style={{ fontFamily: FONT_MONO, fontSize: 13, color: t.accent, letterSpacing: '0.12em' }}>
              {asOf ? `AS OF ${asOf.toUpperCase()}` : 'ADE BOOK'} · {names} NAMES
            </div>
            <h1 className="rise" style={{ '--i': 1, margin: '4px 0 0', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 700, lineHeight: 1.05 }}>ADE Book</h1>
            <ul className="rise" aria-label="Verdicts by band" style={{ '--i': 2, display: 'flex', flexWrap: 'wrap', gap: 8, margin: '14px 0 0', padding: 0, listStyle: 'none' }}>
              {BANDS.map(b => (
                <li key={b} style={{ display: 'flex', alignItems: 'baseline', gap: 6, padding: '4px 12px', background: t.card, border: `1px solid ${t.border}`, borderRadius: 999, fontSize: 14 }}>
                  <span style={{ fontFamily: FONT_MONO, fontWeight: 700, color: bandColor[b] }}>{counts[b]}</span>
                  <span style={{ color: t.mid }}>{b.toLowerCase().replace('/', ' / ')}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => setGuideOpen(true)}
            className="lift"
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', fontFamily: 'inherit', fontSize: 15, fontWeight: 600,
              color: t.accent, background: 'transparent', border: `1.5px solid ${t.accent}`, borderRadius: RADIUS, cursor: 'pointer',
            }}
          >
            <BookOpen size={16} aria-hidden="true" /> How this is scored
          </button>
        </div>
      </section>

      <div className="ade-embed">
        <ErrorBoundary label="ADE dashboard" theme={t}>
          <Suspense fallback={<div className="container" style={{ paddingTop: 24 }}><div className="skeleton" style={{ height: 480 }} /></div>}>
            <AdeApp />
          </Suspense>
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
