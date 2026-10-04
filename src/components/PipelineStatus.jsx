import { useState } from 'react'
import { Activity } from 'lucide-react'
import { FIELDS } from '../../server/ade/provenance.js'
import { useTheme } from '../theme/index.js'
import { FONT_MONO, RADIUS } from '../theme/tokens.js'

const CLASS_LABEL = {
  live: 'Live from Yahoo', computed: 'Computed from live data', generated: 'Generated from live numbers',
  ai: 'Claude-drafted, unverified', stale: 'ADE’s published value, not refreshed', static: 'Company fact (name, sector), kept as ADE wrote it', empty: 'Not shown (no source)', placeholder: 'Placeholder, not real data',
}

// "Is the live-data pipeline actually working?" Runs the same checks as `npm run diagnose`
// against this deployment, on demand: it calls Yahoo a few times, so it is not run on every load.
export default function PipelineStatus({ live }) {
  const t = useTheme()
  const [open, setOpen] = useState(false)
  const [state, setState] = useState({ status: 'idle' })
  const color = { pass: t.up, warn: t.warn, fail: t.down, ok: t.up, degraded: t.warn, down: t.down }

  const run = async () => {
    setState({ status: 'running' })
    try {
      const res = await fetch('/api/ade/diagnose')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setState({ status: 'done', report: await res.json() })
    } catch (err) {
      setState({ status: 'error', message: err.message })
    }
  }
  const toggle = () => {
    setOpen(o => !o)
    if (!open && state.status === 'idle') run()
  }

  const dot = state.report?.status ?? (live?.ok === false ? 'down' : live ? 'ok' : null)
  const grouped = Object.entries(FIELDS).reduce((acc, [name, f]) => {
    (acc[f.added] ??= []).push(name)
    return acc
  }, {})

  return (
    <div style={{ display: 'contents' }}>
      <button
        onClick={toggle}
        aria-expanded={open}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 14px', background: t.card, border: `1px solid ${t.border}`, borderRadius: 999, color: t.mid, fontFamily: 'inherit', fontSize: 16, cursor: 'pointer' }}
      >
        <Activity size={16} aria-hidden="true" />
        Data pipeline
        {dot && <span aria-label={`status ${dot}`} style={{ width: 8, height: 8, borderRadius: 999, background: color[dot] }} />}
      </button>

      {open && (
        <section aria-label="Data pipeline status" style={{ flex: '1 1 100%', marginTop: 4, padding: 16, background: t.card, border: `1px solid ${t.border}`, borderRadius: RADIUS }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <strong style={{ fontSize: 16 }}>Pipeline check</strong>
            {state.report && <span style={{ fontFamily: FONT_MONO, fontSize: 14, color: color[state.report.status] }}>{state.report.status.toUpperCase()}</span>}
            <button onClick={run} disabled={state.status === 'running'} style={{ marginLeft: 'auto', padding: '3px 10px', background: 'none', border: `1.5px solid ${t.border}`, borderRadius: 10, color: t.hi, fontFamily: 'inherit', fontSize: 15, cursor: 'pointer' }}>
              {state.status === 'running' ? 'Checking…' : 'Re-run'}
            </button>
          </div>

          {state.status === 'error' && <p role="alert" style={{ color: t.down, margin: 0 }}>The check itself failed ({state.message}).</p>}
          {state.report && (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
              <tbody>
                {state.report.stages.map(s => (
                  <tr key={s.id} style={{ borderTop: `1px solid ${t.border}` }}>
                    <td style={{ padding: '6px 8px 6px 0', fontFamily: FONT_MONO, fontWeight: 700, color: color[s.status], whiteSpace: 'nowrap' }}>{s.status.toUpperCase()}</td>
                    <td style={{ padding: '6px 12px 6px 0', whiteSpace: 'nowrap' }}>{s.name}</td>
                    <td style={{ padding: '6px 12px 6px 0', color: t.low, fontFamily: FONT_MONO, whiteSpace: 'nowrap' }}>{s.ms} ms</td>
                    <td style={{ padding: '6px 0', color: t.mid }}>{s.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <details style={{ marginTop: 14 }}>
            <summary style={{ cursor: 'pointer', color: t.mid, fontSize: 16 }}>Where each field comes from (for tickers you add)</summary>
            <dl style={{ margin: '10px 0 0', fontSize: 15 }}>
              {Object.entries(CLASS_LABEL).filter(([k]) => grouped[k]).map(([k, label]) => (
                <div key={k} style={{ display: 'flex', gap: 12, padding: '4px 0', borderTop: `1px solid ${t.border}` }}>
                  <dt style={{ flex: '0 0 230px', color: k === 'placeholder' ? t.down : t.hi }}>{label}</dt>
                  <dd style={{ margin: 0, color: t.mid, fontFamily: FONT_MONO, fontSize: 14 }}>{grouped[k].join(', ')}</dd>
                </div>
              ))}
            </dl>
            <p style={{ color: t.low, fontSize: 14, margin: '8px 0 0' }}>
              For ADE&rsquo;s own 24 tickers, everything except its hand-written text is refreshed from Yahoo; that text stays as ADE published it.
            </p>
          </details>
        </section>
      )}
    </div>
  )
}
