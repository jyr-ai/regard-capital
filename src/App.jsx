import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { LogOut } from 'lucide-react'
import { ErrorBoundary } from '../adapters/ui.js'
import { useTheme } from './theme/index.js'
import { FONT_MONO, Z } from './theme/tokens.js'
import { PAGES, pageForPath } from './pages.js'
import Icon from './components/Icon.jsx'
import Login from './pages/Login.jsx'
import Upcoming from './pages/Upcoming.jsx'

function usePath() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const navigate = useCallback(to => {
    if (to === window.location.pathname) return
    window.history.pushState(null, '', to)
    setPath(to)
    window.scrollTo(0, 0)
  }, [])
  return [path, navigate]
}

function Nav({ active, navigate }) {
  const t = useTheme()
  const ref = useRef(null)

  // Publish the nav height as --nav-h so embedded pages (the ADE dashboard has its own
  // sticky bar) can sit below it. The nav wraps to two rows on narrow screens.
  useEffect(() => {
    const el = ref.current
    const set = () => document.documentElement.style.setProperty('--nav-h', `${Math.round(el.getBoundingClientRect().height)}px`)
    set()
    const ro = new ResizeObserver(set)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.assign('/login')
  }
  return (
    <header ref={ref} style={{ position: 'sticky', top: 0, zIndex: Z.nav, background: t.navBg, borderBottom: `1px solid ${t.border}` }}>
      <div className="kente" style={{ height: 6 }} aria-hidden="true" />
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 24, minHeight: 60, flexWrap: 'wrap' }}>
        <a
          href="/"
          onClick={e => { e.preventDefault(); navigate('/') }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: t.hi }}
        >
          <img src="/favicon.svg" alt="" width={26} height={26} />
          <span style={{ fontWeight: 700, letterSpacing: '0.04em', fontSize: 18 }}>REGARD CAPITAL</span>
        </a>
        <nav aria-label="Main" className="main-nav">
          {PAGES.map(p => {
            const on = p.id === active.id
            return (
              <a
                key={p.id}
                href={p.path}
                aria-current={on ? 'page' : undefined}
                onClick={e => { e.preventDefault(); navigate(p.path) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '18px 12px 15px',
                  textDecoration: 'none', whiteSpace: 'nowrap', fontSize: 15,
                  fontWeight: on ? 600 : 500,
                  color: on ? t.accent : t.mid,
                  borderBottom: `3px solid ${on ? t.accent : 'transparent'}`,
                }}
              >
                <Icon name={p.icon} />
                {p.label}
              </a>
            )
          })}
        </nav>
        <button
          className="logout"
          onClick={logout}
          title="Sign out"
          aria-label="Sign out"
          style={{ background: 'none', border: `1.5px solid ${t.border}`, borderRadius: 10, color: t.mid, padding: 8, cursor: 'pointer', display: 'flex' }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  )
}

function PageFallback() {
  return (
    <div className="container" style={{ paddingTop: 32 }}>
      <div className="skeleton" style={{ height: 140, marginBottom: 16 }} />
      <div className="skeleton" style={{ height: 420 }} />
    </div>
  )
}

export default function App() {
  const t = useTheme()
  const [path, navigate] = usePath()

  if (path === '/login') return <Login />

  const page = pageForPath(path)
  const Page = page.component
  return (
    <div style={{ background: t.bg, minHeight: '100dvh' }}>
      <Nav active={page} navigate={navigate} />
      <main key={page.id}>
        <ErrorBoundary label={page.label} theme={t}>
          <Suspense fallback={<PageFallback />}>
            {Page ? <Page /> : <Upcoming page={page} />}
          </Suspense>
        </ErrorBoundary>
      </main>
      <footer className="container" style={{ padding: '48px 1.5rem 32px', fontFamily: FONT_MONO, fontSize: 12, color: t.low }}>
        Regard Capital · informational research, not personalised financial advice ·{' '}
        <a href="https://github.com/jyr-ai/regard-capital" style={{ color: t.low }}>source (AGPL-3.0)</a>
      </footer>
    </div>
  )
}
