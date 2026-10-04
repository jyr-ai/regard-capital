import { LiveNewsPanel } from '../../adapters/ui.js'
import { useTheme } from '../theme/index.js'
import { FONT_MONO, RADIUS } from '../theme/tokens.js'
import MarketFeedPanel from '../components/MarketFeedPanel.jsx'

export default function Monitor() {
  const t = useTheme()
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <>
      <section className="starfield" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div className="container" style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem' }}>
          <div className="rise" style={{ fontFamily: FONT_MONO, fontSize: 13, color: t.accent, letterSpacing: '0.12em' }}>
            {today.toUpperCase()}
          </div>
          <h1 className="rise" style={{ '--i': 1, margin: '6px 0 0', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.01em' }}>
            Monitor
          </h1>
          <p className="rise" style={{ '--i': 2, margin: '10px 0 0', color: t.mid, maxWidth: '60ch' }}>
            Markets, the Fed, hard assets, SEC filings and your watchlist, refreshed every five minutes.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 24 }}>
        <div className="split">
          <MarketFeedPanel />
          <div className="sticky-desktop live-panel" style={{ borderRadius: RADIUS, overflow: 'hidden', border: `1px solid ${t.border}` }}>
            <LiveNewsPanel />
          </div>
        </div>
      </div>
    </>
  )
}
