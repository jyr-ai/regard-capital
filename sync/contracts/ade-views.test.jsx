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
