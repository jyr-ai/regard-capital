import { describe, expect, it } from 'vitest'
import { createNasdaq, fiscalEnd } from './nasdaq.js'

const reply = body => async () => ({ ok: true, status: 200, json: async () => body })

describe('fiscalEnd', () => {
  it('is the last day of the named month', () => {
    expect(fiscalEnd('Dec 2026').toISOString()).toBe('2026-12-31T00:00:00.000Z')
    expect(fiscalEnd('Feb 2027').toISOString()).toBe('2027-02-28T00:00:00.000Z')
  })
  it('is null for anything else', () => {
    expect(fiscalEnd('FY26')).toBeNull()
    expect(fiscalEnd(undefined)).toBeNull()
  })
})

describe('yearlyEps', () => {
  const body = { data: { yearlyForecast: { rows: [
    { fiscalEnd: 'Dec 2026', consensusEPSForecast: 1.28, noOfEstimates: 11 },
    { fiscalEnd: 'Dec 2027', consensusEPSForecast: -2.5, noOfEstimates: 12 },
    { fiscalEnd: 'junk', consensusEPSForecast: 9, noOfEstimates: 1 },
    { fiscalEnd: 'Dec 2028', consensusEPSForecast: 'n/a', noOfEstimates: 1 },
  ] } } }

  it('returns the usable rows with numeric EPS', async () => {
    const rows = await createNasdaq({ fetchImpl: reply(body) }).yearlyEps('PLTR')
    expect(rows.map(r => [r.fiscalEnd, r.eps, r.analysts])).toEqual([['Dec 2026', 1.28, 11], ['Dec 2027', -2.5, 12]])
  })

  it('asks for the lower-case symbol with a dot for a class share', async () => {
    let url
    await createNasdaq({ fetchImpl: async u => { url = u; return reply(body)() } }).yearlyEps('BRK-B')
    expect(url).toBe('https://api.nasdaq.com/api/analyst/brk.b/earnings-forecast')
  })

  it('throws on an HTTP error and on a reply with no table', async () => {
    await expect(createNasdaq({ fetchImpl: async () => ({ ok: false, status: 403 }) }).yearlyEps('X')).rejects.toThrow(/403/)
    await expect(createNasdaq({ fetchImpl: reply({ data: null }) }).yearlyEps('X')).rejects.toThrow(/no estimates/)
  })
})
