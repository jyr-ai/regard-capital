# Methodology

## The score

One number, 0–100, per position. Five components, all measured rather than assigned.

| Component | Weight | What it measures |
|---|---|---|
| Upside to consensus | 30% | Distance from price to the average analyst 12-month target, capped at ±50% |
| Reward-to-risk | 28% | `(target − price) ÷ (price − support)`, denominator floored at 3% of price, ratio capped at 6× |
| Support quality | 17% | 60% distance (0–30% scale) + 40% defended count (capped at 6) |
| Momentum | 15% | 65% RSI headroom to 70 + 35% bonus for a positive MACD histogram |
| Structural integrity | 10% | 1.0 minus 0.2 per prior swing low now sitting above price |

Bands: above 84 Strong Buy, 69–84 Buy, 39–69 Hold, below 39 Trim/Avoid.

## What each component does not tell you

**Upside** does not tell you whether analysts are right, and targets lag price badly after a large move. A name trading above consensus usually means the targets have not caught up, not that it is overvalued.

**Reward-to-risk** does not tell you how far price could fall *through* support. The 3% floor exists because support sitting 0.4% below otherwise produces ratios above 100× that are arithmetically true and practically meaningless.

**Support quality** does not tell you whether a level will hold. Defended count buys odds, not certainty. Levels defended eight, nine and eighteen times have broken in this book.

**Momentum** is the fastest-moving and most reversible input, which is why it carries the second-lowest weight.

## Two ranking methods

The dashboard scores against the nearest observed support, including volume nodes. `tools/rank.py` also scores against the nearest level that has actually been *defended* at least once.

The difference matters. A volume node marks where heavy trading occurred, not where buyers stepped in. A name can show a node 1% below and a defended level 66% below — the first method flatters it severely. Where the two scores diverge by more than about fifteen points, treat the defended number as the honest one and the gap as the finding.

## Deliberately excluded

**News sentiment.** Was 40% of an earlier version. Removed because the scores were judgments of items written in the same session — circular. Still captured and dated in the intel tab; no longer moves the number.

**Stops.** An invented risk budget is not a market level.

**Active risks.** Across all positions these ranged only 10–18 on a 40-point scale, barely changing rank order, and rested on assigned probabilities. Now surfaced separately and re-assessed each session.

**IV rank.** Requires roughly twenty daily observations of implied volatility. Stays `null` until the history exists; absolute ATM IV is reported in the meantime.

## What the score is for

It is a timing screen, not a verdict on the business. The names scoring worst on entry are frequently the best companies — that is what it means for quality to be recognised. A low score says not now, not never.

Two questions it cannot answer: whether the thesis is right, and whether the market's classification of the business is about to change. Those are the research layer, and they are why the daily workflow keeps a human step.
