// @vitest-environment jsdom
//
// Renders every one of ADE's 9 views for every ticker, in the three situations the app creates:
// the data ADE published, that data with live Yahoo numbers overlaid, and a ticker the user added
// (with and without listed options). ADE's own render_check only renders the default tab, which is
// how a crash in its Options view (null.toFixed on every ticker) went unnoticed upstream.
import React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { buildBlock, buildSnapshot } from '../../server/ade/build.js'
import { buildOptions } from '../../server/ade/options.js'
import { fakeYahoo } from '../../server/ade/fixtures.js'
import App, { adeData, applyLive } from '../../adapters/ade-app.js'

const TABS = ['INTEL', 'PLAYBOOK', 'RISK/REWARD', 'CONVICTION', 'OPTIONS', 'FUNDAMENTALS', 'TECHNICALS', 'REL VALUE', 'CATALYSTS']
const NOW = new Date('2026-10-05T12:00:00Z')

class Boundary extends React.Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  render() { return this.state.error ? React.createElement('div', { 'data-crashed': this.state.error.message }) : this.props.children }
}

afterEach(cleanup)
vi.spyOn(console, 'error').mockImplementation(() => {}) // React logs every caught render error

// Returns ['MU/OPTIONS: Cannot read ...', ...] for every ticker x view that fails to render.
function crashes(tickers) {
  const bad = []
  for (const t of tickers) {
    let view = render(React.createElement(Boundary, null, React.createElement(App)))
    const mount = () => { view.unmount(); view = render(React.createElement(Boundary, null, React.createElement(App))) }
    fireEvent.click(screen.getAllByText(t, { exact: true })[0])
    for (const tab of TABS) {
      const label = screen.queryAllByText(tab, { exact: true })[0]
      if (!label) { bad.push(`${t}/${tab}: tab not found`); continue }
      fireEvent.click(label)
      const crashed = view.container.querySelector('[data-crashed]')
      if (crashed) {
        bad.push(`${t}/${tab}: ${crashed.getAttribute('data-crashed')}`)
        mount()
        fireEvent.click(screen.getAllByText(t, { exact: true })[0])
      }
    }
    view.unmount()
  }
  return bad
}

async function liveFor(symbols, { options = true } = {}) {
  const y = fakeYahoo({ noOptions: options ? [] : symbols })
  const overlay = {}
  const added = {}
  for (const sym of symbols) {
    const [chart, summary] = await Promise.all([y.chart(sym), y.summary(sym)])
    const opts = await buildOptions(y, sym, { now: NOW.getTime() }).catch(() => null)
    const snap = buildSnapshot({ symbol: sym, candles: chart.candles, meta: chart.meta, summary, options: opts }, { now: NOW })
    if (adeData.S[sym]) overlay[sym] = snap
    else added[sym] = { block: buildBlock(snap, null, { today: NOW }), snapshot: snap }
  }
  return { overlay, added }
}

const BOOK = () => Object.keys(adeData.S).filter(k => !adeData.S[k].userAdded)

const MACRO_LIVE = { spy: 7723, vix: 15.31, dxy: 101.93, oil: 91.11, btc: 85426, gold: 4162, tnx: 5.28, cpi: 3.4, cpiPrior: 3.36, fedFunds: 3.88,
  rateOutlook: 'target range 3.75-4.00%, effective 3.88% (NY Fed, 2026-10-01)', regime: 'RISK-ON', color: '#3DBFA8',
  note: 'Oct 2, 2026 closes, Yahoo Finance: S&P 500 7,723 (+0.73%); VIX 15.3.', macroDate: 'Oct 2, 2026' }

// What a user would see as a bug: a field that prints as text from a missing value.
const BROKEN_TEXT = /undefined|NaN|null%|nullx|\bnull\b(?!\s+pending)/

function textOf(ticker, tabs) {
  const view = render(React.createElement(Boundary, null, React.createElement(App)))
  const out = {}
  fireEvent.click(screen.getAllByText(ticker, { exact: true })[0])
  for (const tab of tabs) {
    fireEvent.click(screen.queryAllByText(tab, { exact: true })[0])
    out[tab] = view.container.textContent
  }
  // The portfolio dashboard's market view carries the macro note.
  fireEvent.click(screen.getAllByText('ADE', { exact: true })[0])
  fireEvent.click(screen.queryAllByText('market', { exact: false }).find(e => e.tagName === 'BUTTON'))
  out.MARKET = view.container.textContent
  view.unmount()
  return out
}

describe('missing live values show as n/a', () => {
  it('prints no undefined/NaN/null for a loss-making ticker with no yield history and a half-empty macro strip', async () => {
    const live = await liveFor(BOOK())
    for (const snap of Object.values(live.overlay)) Object.assign(snap, { fwdPE: null, fwdPENote: 'n/a, loss-making (forward EPS -$3.49)', rateSens: undefined, rateCorr: undefined, rateNote: undefined })
    applyLive({ ...live, refreshedAt: NOW.toISOString(), macro: { ...MACRO_LIVE, cpi: null, cpiPrior: null, fedFunds: null, rateOutlook: null } })
    const text = textOf('MU', ['INTEL', 'FUNDAMENTALS', 'RISK/REWARD', 'OPTIONS'])
    delete text.MARKET
    for (const [tab, t] of Object.entries(text)) {
      const at = t.search(BROKEN_TEXT)
      if (at >= 0) throw new Error(`${tab} prints broken text: ...${t.slice(Math.max(0, at - 90), at + 50)}...`)
    }
    expect(text.INTEL).toContain('n/a, loss-making (forward EPS -$3.49)')
    expect(text['RISK/REWARD']).toMatch(/Rate sensitivity: n\/a/)
    expect(text['RISK/REWARD']).toMatch(/CPI n\/a/)
  }, 60_000)

  it('shows the live macro strip and the live banner, and none of ADE\'s hand-written macro text', async () => {
    applyLive({ ...(await liveFor(BOOK())), refreshedAt: NOW.toISOString(), macro: MACRO_LIVE })
    const text = textOf('NVDA', ['INTEL', 'RISK/REWARD'])
    expect(text['RISK/REWARD']).toContain('RISK-ON')
    expect(text['RISK/REWARD']).toContain('CPI 3.4% (prior 3.36%)')
    expect(text['RISK/REWARD']).toContain('Fed: target range 3.75-4.00%')
    expect(text.MARKET).toContain('S&P 500 7,723')
    // the Exit Map needs the owner's share counts, which ADE scrubs from its repo: it would show WEIGHT NaN%
    expect(text.MARKET).not.toMatch(/EXIT MAP|NaN%/i)
    expect(text.INTEL).toContain('LIVE · Yahoo Finance · refreshed')
    expect(text.INTEL).toContain('WRITTEN BY ADE, NOT REFRESHED HERE')
    expect(text.INTEL).toMatch(/numbers live — Not investment advice/)
    for (const t of Object.values(text)) expect(t).not.toMatch(/BOTH CATALYSTS PAID|REFRESHED Sep 3|Fed hiked 25bp|brokerage screenshots|all estimated based on rally/i)
  }, 60_000)
})

describe('the verdict gauge points at the verdict', () => {
  // ADE drew the needle with angle = score/200*180 - 90, so +16 (AVOID) pointed at the green end.
  // The arc is red | yellow | pale green | green, left to right: the needle must sit in the arc zone of its own signal.
  const ZONE = { AVOID: [120, 180], TRIM: [120, 180], HOLD: [90, 120], BUY: [60, 90], 'STRONG BUY': [0, 60] }

  it('sits in the red zone for AVOID/TRIM, yellow for HOLD, green for BUY and STRONG BUY, for every ticker', async () => {
    applyLive({ ...(await liveFor(BOOK())), refreshedAt: NOW.toISOString(), macro: null })
    const seen = new Set()
    const bad = []
    for (const t of BOOK()) {
      const view = render(React.createElement(Boundary, null, React.createElement(App)))
      fireEvent.click(screen.getAllByText(t, { exact: true })[0])
      const svg = [...view.container.querySelectorAll('svg')].find(s => s.getAttribute('viewBox') === '0 0 110 62')
      const line = svg.querySelector('line')
      const signal = svg.nextElementSibling.textContent.trim()
      const angle = (Math.atan2(55 - Number(line.getAttribute('y2')), Number(line.getAttribute('x2')) - 55) * 180) / Math.PI
      seen.add(signal)
      const [lo, hi] = ZONE[signal]
      if (!(angle >= lo - 0.5 && angle <= hi + 0.5)) bad.push(`${t} ${signal}: needle at ${angle.toFixed(0)} deg, expected ${lo}-${hi}`)
      view.unmount()
    }
    expect(bad).toEqual([])
    expect(seen.size).toBeGreaterThanOrEqual(3) // the book spans several signals, so this is not vacuous
  }, 60_000)
})

describe('every ADE view renders', () => {
  it('for every ticker, with the data ADE published', () => {
    expect(BOOK().length).toBeGreaterThanOrEqual(10)
    expect(crashes(BOOK())).toEqual([])
  }, 120_000)

  it('for every ticker, with live Yahoo numbers overlaid', async () => {
    applyLive(await liveFor(BOOK()))
    expect(crashes(BOOK())).toEqual([])
  }, 120_000)

  it('for a ticker the user added', async () => {
    applyLive({ overlay: {}, added: (await liveFor(['NEWCO'])).added })
    expect(crashes(['NEWCO'])).toEqual([])
  }, 60_000)

  it('for a ticker the user added that has no listed options', async () => {
    applyLive({ overlay: {}, added: (await liveFor(['NOOPT'], { options: false })).added })
    expect(adeData.S.NOOPT.optionsVerified).toBe(false)
    expect(crashes(['NOOPT'])).toEqual([])
  }, 60_000)
})
