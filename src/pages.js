import { lazy } from 'react'

// One entry per top-level page. Each page is lazy-loaded and rendered inside its
// own ErrorBoundary (see App.jsx), so a broken upstream page cannot blank the others.
// `phase` marks pages whose upstream source is not wired in yet.
export const PAGES = [
  { id: 'monitor', path: '/', label: 'Monitor', icon: 'Radio', component: lazy(() => import('./pages/Monitor.jsx')) },
  { id: 'ade', path: '/book', label: 'ADE Book', icon: 'BookOpen', phase: 2, source: 'ADE-INVESTMENTS' },
  { id: 'rankings', path: '/rankings', label: 'Rankings', icon: 'ListOrdered', phase: 3, source: 'Jians_finance' },
  { id: 'dd', path: '/diligence', label: 'Due Diligence', icon: 'ScanSearch', phase: 3, source: 'Jians_finance' },
  { id: 'portfolio', path: '/portfolio', label: 'Portfolio', icon: 'Upload', phase: 4, source: 'facai' },
]

export const pageForPath = pathname => PAGES.find(p => p.path === pathname) || PAGES[0]
