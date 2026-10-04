// Market feed categories on top of UNREDACTED's RSS engine.
//
// The engine (upstream/unredacted/server/services/rssFeed.js) reads its sources
// from the exported FEED_CATEGORIES object. We replace that object's contents with
// market categories, then call the engine's own getAllFeeds / getCategoryFeed.
// Fetching, batching, caching and per-source failure handling stay upstream's.

import { FEED_CATEGORIES, getAllFeeds, getCategoryFeed } from '../upstream/unredacted/server/services/rssFeed.js'
import watchlist from '../config/watchlist.json' with { type: 'json' }

const gn = q => `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`

const TICKERS_PER_SOURCE = 4

// `icon` is a lucide-react icon name; the design system bans emoji.
// `holdings` is [{ ticker, name }]. News is searched by company name, since bare
// tickers collide (AG matches every "Volkswagen AG" story).
export function buildCategories(holdings = watchlist.holdings) {
  const holdingSources = []
  for (let i = 0; i < holdings.length; i += TICKERS_PER_SOURCE) {
    const group = holdings.slice(i, i + TICKERS_PER_SOURCE)
    holdingSources.push({
      id: `HOLD_${group.map(h => h.ticker).join('_')}`,
      label: group.map(h => h.ticker).join(' · '),
      url: gn(`(${group.map(h => `"${h.name}"`).join(' OR ')}) stock when:2d`),
      type: 'HOLDINGS',
    })
  }

  return {
    MARKETS: {
      label: 'Markets',
      color: '#E6A817',
      icon: 'TrendingUp',
      sources: [
        { id: 'REUTERS_MKT', label: 'Reuters', url: gn('site:reuters.com markets stocks when:1d'), type: 'MARKETS' },
        { id: 'CNBC_MKT', label: 'CNBC', url: 'https://www.cnbc.com/id/20910258/device/rss/rss.html', type: 'MARKETS' },
        { id: 'MKTWATCH', label: 'MarketWatch', url: 'https://feeds.content.dowjones.io/public/rss/mw_topstories', type: 'MARKETS' },
        { id: 'YAHOO_FIN', label: 'Yahoo Finance', url: 'https://finance.yahoo.com/news/rssindex', type: 'MARKETS' },
      ],
    },
    MACRO: {
      label: 'Fed & Macro',
      color: '#B266FF',
      icon: 'Landmark',
      sources: [
        { id: 'FED_PRESS', label: 'Federal Reserve', url: 'https://www.federalreserve.gov/feeds/press_all.xml', type: 'MACRO' },
        { id: 'TREASURY', label: 'Treasury', url: gn('site:home.treasury.gov when:7d'), type: 'MACRO' },
        { id: 'MACRO_GN', label: 'Macro', url: gn('(CPI OR jobs report OR FOMC OR "rate decision" OR VIX) when:2d'), type: 'MACRO' },
      ],
    },
    HARD_ASSETS: {
      label: 'Hard Assets',
      color: '#C2B280',
      icon: 'Gem',
      sources: [
        { id: 'GOLD_SILVER', label: 'Gold & Silver', url: gn('(gold price OR silver price OR miners) when:2d'), type: 'COMMODITY' },
        { id: 'URANIUM', label: 'Uranium', url: gn('(uranium spot OR Cameco OR nuclear fuel) when:3d'), type: 'COMMODITY' },
        { id: 'CRIT_MIN', label: 'Critical Minerals', url: gn('(rare earths OR critical minerals OR copper supply) when:3d'), type: 'COMMODITY' },
      ],
    },
    SEC_FILING: {
      label: 'SEC & Filings',
      color: '#3DBFA8',
      icon: 'FileText',
      sources: [
        { id: 'SEC_PRESS', label: 'SEC Press', url: 'https://www.sec.gov/news/pressreleases.rss', type: 'SEC' },
        { id: 'SEC_ENF', label: 'SEC Enforcement', url: gn('SEC enforcement action securities fraud charges'), type: 'SEC' },
        { id: 'SEC_INS', label: 'Insider Trades', url: gn('insider buying OR "Form 4" cluster buy when:3d'), type: 'INSIDER' },
      ],
    },
    HOLDINGS: {
      label: 'Watchlist',
      color: '#E8643A',
      icon: 'Star',
      sources: holdingSources,
    },
  }
}

export function installCategories(holdings) {
  for (const key of Object.keys(FEED_CATEGORIES)) delete FEED_CATEGORIES[key]
  Object.assign(FEED_CATEGORIES, buildCategories(holdings))
}

installCategories()

export const categoryKeys = () => Object.keys(FEED_CATEGORIES)

export function listCategories() {
  return Object.entries(FEED_CATEGORIES).map(([key, c]) => ({
    key,
    label: c.label,
    color: c.color,
    icon: c.icon,
    sources: c.sources.map(s => s.label),
  }))
}

export { getAllFeeds, getCategoryFeed }
