// Drafts the qualitative parts of a user-added ticker's ADE view with Claude. Numbers never come
// from here: they come from Yahoo (build.js). The model is given those numbers and told to stay
// generic where it lacks facts, because it has no news feed. Output is marked unverified.

import Anthropic from '@anthropic-ai/sdk'
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod'
import { z } from 'zod'

export const MODEL = 'claude-opus-5-5'

export const ProseSchema = z.object({
  story: z.string().describe('Two or three sentences: what the business does and how it makes money.'),
  drivers: z.array(z.object({ name: z.string(), dir: z.enum(['up', 'flat', 'risk', 'down']), detail: z.string() })).length(4),
  bull: z.string().describe('One sentence: the path to the upside case.'),
  bear: z.string().describe('One sentence: the path to the downside case.'),
  risks: z.array(z.object({
    sev: z.enum(['HIGH', 'MED', 'LOW']),
    prob: z.number().int().min(0).max(100),
    risk: z.string(),
    trigger: z.string(),
    catalyst: z.string(),
  })).length(4),
  killer: z.string().describe('A company-specific falsifier of the thesis, not a price level.'),
  watchlist: z.array(z.object({ item: z.string(), d: z.string(), why: z.string() })).length(3),
})

const SYSTEM = `You write the qualitative panels of a stock dashboard. You are given market data for one company from Yahoo Finance.

Rules:
- Use only the data provided plus widely known, stable facts about the company's business model.
- You have no news feed. Do not state recent events, dates, deal sizes, customer names, guidance, or any figure that is not in the data. If you are not sure of a fact, stay generic.
- Risks and falsifiers must be specific to this company's business, not generic market risk and not a price level.
- Plain, concrete English. No hype words.`

export function createProse({ apiKey = process.env.ANTHROPIC_API_KEY, client } = {}) {
  if (!client && !apiKey) return null
  const api = client ?? new Anthropic({ apiKey })

  return {
    async draft(snap) {
      const facts = {
        company: snap.name, symbol: snap.symbol, sector: snap.sector, price: snap.price, marketCap: snap.mktCap,
        forwardPE: snap.fwdPE, analystTarget: snap.avgPT, consensus: snap.consensus, nextEarnings: snap.earningsDate,
        revenueGrowthPct: snap.metrics.revGrowth, grossMarginPct: snap.metrics.grossMargin, operatingMarginPct: snap.metrics.opMargin,
        rsi: snap.rsi, aboveMa200: snap.ma.d200 ? snap.price > snap.ma.d200 : null, adeScore: snap.scores?.tool, adeBand: snap.scores?.band,
      }
      const res = await api.messages.parse({
        model: MODEL,
        max_tokens: 4000,
        system: SYSTEM,
        output_config: { effort: 'low', format: zodOutputFormat(ProseSchema) },
        messages: [{ role: 'user', content: `Data:\n${JSON.stringify(facts, null, 2)}` }],
      })
      if (res.stop_reason === 'refusal') throw new Error('the model declined to draft this one')
      const p = res.parsed_output
      if (!p) throw new Error('the model returned an unreadable draft')
      return {
        story: p.story,
        drivers: p.drivers,
        bull: p.bull,
        bear: p.bear,
        killer: p.killer,
        watchlist: p.watchlist,
        // ADE's risk cards also carry fields the model cannot know; fill them neutrally.
        risks: p.risks.map(r => ({ ...r, triggerStatus: 'watching', mitigation: 'Not assessed', pPctNetWorth: 0, daysToImpact: 0 })),
        draftedBy: MODEL,
      }
    },
  }
}
