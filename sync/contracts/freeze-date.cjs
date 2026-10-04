// Preload (node -r) that pins "now" to FREEZE_DATE, so ADE's own health audit, which scores
// data freshness against the clock, grades the dashboard as of its own date instead of
// getting worse every day the contract test runs.
const fixed = new Date(process.env.FREEZE_DATE).getTime()
if (Number.isNaN(fixed)) throw new Error('freeze-date: set FREEZE_DATE to an ISO timestamp')
const RealDate = Date
class FrozenDate extends RealDate {
  constructor(...args) {
    if (args.length === 0) super(fixed)
    else super(...args)
  }
  static now() {
    return fixed
  }
}
globalThis.Date = FrozenDate
