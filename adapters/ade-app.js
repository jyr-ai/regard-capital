// The ADE dashboard (recoloured at sync time) plus a function that writes live data into it.
// S and LC are the dashboard's own module-level data, exported by a sync transform; the
// dashboard reads them when it mounts, so call applyLive() before rendering <App />.
import App, { S, LC, MACRO } from '../upstream/ade/src/ade-portfolio-v6.jsx'
import { adeAsOf } from './ade.js'
import { applyLive as apply } from './ade-overlay.js'

export default App
export const applyLive = live => apply(S, LC, live, { MACRO, adeAsOf })
export const adeData = { S, LC, MACRO } // tests
