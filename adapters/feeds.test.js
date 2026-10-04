import { describe, expect, it } from 'vitest'
import { buildCategories, mergeHoldings, searchName } from './feeds.js'
import { BANDS, adeVerdicts, bandCounts } from './ade.js'

describe('searchName', () => {
  it('strips legal suffixes that make news phrase-searches miss', () => {
    expect(searchName('Broadcom Inc.')).toBe('Broadcom')
    expect(searchName('Amazon.com Inc.')).toBe('Amazon.com')
    expect(searchName('CrowdStrike Holdings')).toBe('CrowdStrike')
    expect(searchName('Vistra Corp.')).toBe('Vistra')
    expect(searchName('Taiwan Semiconductor')).toBe('Taiwan Semiconductor')
  })
})

describe('mergeHoldings', () => {
  it('unions by ticker and lets the first list win a name', () => {
    const mine = [{ ticker: 'MU', name: 'Micron' }]
    const ade = [{ ticker: 'MU', name: 'Micron Technology' }, { ticker: 'NET', name: 'Cloudflare, Inc.' }]
    expect(mergeHoldings(mine, ade)).toEqual([
      { ticker: 'MU', name: 'Micron' },
      { ticker: 'NET', name: 'Cloudflare' },
    ])
  })

  it('puts every ADE ticker and every hand-picked ticker in the Watchlist feed', () => {
    const labels = buildCategories().HOLDINGS.sources.map(s => s.label).join(' ')
    for (const t of Object.keys(adeVerdicts)) expect(labels).toContain(t)
    expect(labels).toContain('CCJ') // from config/watchlist.json only
  })
})

describe('ADE verdict bands', () => {
  it('counts every ticker in exactly one band', () => {
    const counts = bandCounts()
    expect(Object.keys(counts)).toEqual(BANDS)
    expect(Object.values(counts).reduce((a, b) => a + b, 0)).toBe(Object.keys(adeVerdicts).length)
  })
})
