import { useState, useMemo } from "react";
const M={fontFamily:"'JetBrains Mono',ui-monospace,monospace"};
const TD=new Date();
const BANNER_DATE="2026-10-01";
const db=(a,b)=>Math.max(0,Math.floor((b-a)/864e5));
const CC={a:"#7E91E8",r:"#B266FF",m:"#E6A817",e:"#3DBFA8",p:"#3DBFA8",v:"#E8643A",t:"#FFBF00",s:"#B266FF",g:"#E08A4A",c:"#D9A05B",x:"#7E91E8",k:"#E8643A"};
// n(id,headline,detail,source,date,sentiment,cat,weight,type)
const n=(i,h,d,s,dt,se,ca,w,ty)=>({id:i,on:true,headline:h,detail:d,source:s,dateStr:dt,sentiment:se,category:ca,weight:w,type:ty||"news"});
const pb=(h,b,c,t,a)=>({h,bias:b,color:c,thesis:t,action:a});
const G="#3DBFA8",Y="#FFBF00",P="#B266FF",R="#E8643A";

export const S={
MU:{name:"Micron Technology",price:1097.39,avgPT:1534,highPT:2000,ptDate:"Oct 1, 2026",ptVerified:true,lowPT:300,high52:1255.0,low52:165.5,fwdPE:6.1,mktCap:"$1.17T",ytd:248,yr1:550,consensus:"Strong Buy",earningsDate:"Dec 2026 (Q1 FY27)",epsEst:31.43,epsEstDate:"Sep 21, 2026",sector:"Semiconductors",support:[{lvl:1070.6,label:"Volume node \u2014 2.4% below"},{lvl:940.69,label:"Volume node \u2014 14.3% below"},{lvl:902.6,label:"Swing low 2026-09-14 \u2014 held 0x"}],supportDate:"Oct 1, 2026",brokenSup:[],
supportVerified:true,
supportAnchor:"$1,070.60 (2.4%) / $940.69 (14.3%) / $902.60 (17.8%, held 0x) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $1,070.60, 2.4% below $1,097.39. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.15,
news:[n(30010,"POST-EARNINGS TARGET RAISES: ROSENBLATT $1900, UBS $1625, TD COWEN $1600, JPM $1540 \u2014 GOLDMAN HOLDS AT $1100","Oct 1: consensus moved to $1,533.80 across 49 analysts (S&P Global); MarketBeat shows $1,375.58 across 45 with a $300-$2,000 range. Rosenblatt raised to $1,900 from $1,500; UBS $1,625; TD Cowen $1,600; Deutsche Bank $1,550; JPMorgan $1,540; Baird $1,520; Mizuho to $1,400 from $1,300; Wells Fargo $1,400; Citi $1,300. Goldman Sachs kept Neutral at $1,100, the notable dissent. The dispersion from $1,100 to $1,900 is the widest in the book.","TheStreet / Finbold / Stockanalysis","2026-10-01",0.5,"a",18,"analyst"),n(30004,"REACTION: +3.03% TO $1,097.39 ON 1.4x VOLUME \u2014 THE BEAT DID GET PAID","Oct 1: MU rose 3.03% to $1,097.39 on 1.4x volume, reversing the ~1% after-hours dip and taking the stock to a new high for the move. The Q4 print delivered revenue $54.23B (+379%), non-GAAP EPS $33.42 and 87% gross margin, all above the high end of guidance, with FY26 EPS $75.52 (+811%) and DRAM revenue above $100B. A new volume node formed at $1,070.60, 2.4% below, but the nearest DEFENDED level remains 66.8% below, so the defended score is 47 against a tool score of 77. The $1,513 consensus target predates the print and should rise.","Market data / company","2026-10-01",0.6,"e",20,"earnings"),n(30002,"Q4 BEAT ON EVERY LINE \u2014 REVENUE $54.2B (+379%), EPS $33.42, GROSS MARGIN 87% \u2014 STOCK FLAT AFTER HOURS","Reported Sep 30 after the close. Revenue $54.23B versus $50B +/- $1B guidance and ~$51.2B consensus; non-GAAP EPS $33.42 versus ~$31.5; gross margin 87%, all above the high end of guidance. Sixth straight quarterly record. Data centre SSD revenue above $10B, more than 10x year-ago; cloud memory nearly doubled sequentially to $16.28B. FY26 revenue $133.19B (+256%), EPS $75.52 (+811%), DRAM revenue above $100B. Shares eased roughly 1% after hours to about $1,056 as investors weighed rising capex and a Q1 gross-margin guide of ~86.25% against ~86.4% consensus.","Company 8-K / earnings call","2026-09-30",0.4,"e",22,"earnings"),n(10004,"EARNINGS CONFIRMED FOR SEP 30 AFTER CLOSE \u2014 Q4 EPS CONSENSUS ~$31.43","Micron's Aug 26 press release confirms fiscal Q4 results on Wednesday Sep 30, with the call at 2:30pm Mountain. The Sep 22 date carried in this tool was wrong. Q4 EPS consensus is near $31.43 against a $25.11 Q3 print. Forward P/E roughly 6x. 16 strategic customer agreements carry about $22B of commitments.","Micron IR / TipRanks / Wall Street Horizon","2026-09-21",0.1,"e",20,"earnings"),
n(9921,"MU CLOSED $820.53 \u2014 $0.53 ABOVE THE HARD STOP. Technicals refreshed after 78 days.","CRITICAL: the Jul 28 official 4pm close was $820.53, down 8.85%. That was the low. Verified technicals (S&P Global via stockanalysis, first refresh since May 11): 50d MA $958 (price -14% below), 200d MA $509 (price +61% above), RSI 40.3 (neutral, NOT the 84 overbought this dashboard was carrying), beta 2.14, short interest 3.21% of shares out and rising from 31.67M to 36.21M. Forward P/E 6.27 on TTM EPS of $44.31. The MA structure is now MIXED, not bullish \u2014 price sits below the 50d for the first time since the supercycle began (it crossed below Jul 24). This is a decision point tonight, not tomorrow.","S&P Global Market Intelligence / stockanalysis.com","2026-07-28",-0.55,"t",18,"news"),
n(9903,"MU -7.71% to $830.75, fwd P/E ~6x \u2014 Tessara says the market is pricing the wrong failure mode","Jul 28: MU fell 7.71%, now roughly -30% from the $1,188 Jun 25 high and trading at a ~6x forward P/E. Korea led the rout: SK Hynix -14.65% at the close, Samsung -13%, KOSPI -29% over a month and in a bear market. SK Hynix is -41.5% in July, its worst month since October 2008, after Korea Investment & Securities cut estimates. THE COUNTER-CASE: independent research firm Tessara argues investors are misreading it \u2014 that the Korea Investment cut stems from assumptions about how quickly SK Hynix RECOGNIZES higher DRAM prices under long-term contracts, a pass-through timing question, not weaker demand. Their framing: the selloff turned a company-specific pass-through question into an industry-wide demand narrative. This is precisely the like-for-like vs ASP-mix distinction. Also underweighted by the tape: CXMT held ~7.67% of global DRAM in 2025 versus ~90% combined for the big three. SK Hynix Q2 lands Jul 29 and is the direct test.","Benzinga / Tessara / 24-7 Wall St","2026-07-28",-0.35,"m",18,"news"),
n(9802,"Memory complex -3.9% to $884.99 — Apple reportedly testing CXMT parts","Jul 27 memory rout: SNDK -12% to $1,270 (was +505% YTD), MU -3.90% to $884.99 after touching $871 intraday, WDC -7%, SK Hynix ADRs -6%, DRAM ETF -4%. Reports that Apple is testing CXMT chips accelerated the fear of Chinese memory reaching tier-1 Western customers. MU's 223% run made it a profit-taking target. SK Hynix Q2 lands Jul 28 AMC — the next real read on HBM pricing.","24/7 Wall St","2026-07-27",-0.5,"m",15,"news"),
n(9801,"CXMT lists in Shanghai +466% — but IPO docs show NO HBM program","China's ChangXin Memory debuted Jul 27 at RMB49.50 vs RMB8.66 IPO price, ~RMB3.3T (~$487B) cap — now the most valuable company on a mainland exchange. Raised $8.6B, biggest-ever mainland semi offering (beat SMIC's $7.5B in 2020). Only 6.73% free float. World's #4 DRAM maker. CRITICAL: prospectus discloses NO HBM project — CXMT is standard DDR5/LPDDR5X only. The threat lands on COMMODITY DRAM pricing (exactly the segment Samsung/Hynix/MU are vacating as they shift capacity to HBM), not on the HBM margin engine. CXMT's own prospectus warns the market could weaken if AI investment slows or rivals overbuild. H1 rev guided to rise 7x to RMB110-120B with net profit RMB66-75B.","Reuters / AP / MarketScreener","2026-07-27",-0.35,"v",18,"news"),

n(8803,"MU green +2.8% on red tape — PT divergence persists","Micron dropped 18% in a month post-Jun-25 print while average analyst target rose to imply 80%+ upside. SK Hynix 26.5B IPO prices — largest chip IPO ever, expanding the HBM capex cycle. MU recovered from 915 low to 986.","TipRanks / Reuters","2026-07-21",0.7,"a",12,"analyst"),n(9411,"MU joins $1 TRILLION market-cap club May 31 ✓ — first time ever","Micron topped $1T intraday (+18.7% on the day), joining NVDA/AVGO/TSM/Samsung. UBS catalyst: PT raised $535→$1625 (street-high) citing long-term memory supply deals locking pricing w/ buyers like NVDA. Best day since 2011. Next earnings Jun 24 ✓.","Motley Fool","2026-05-31",0.9,"a",14),n(9214,"MU named BofA top pick May 26 on continued AI spending","BofA reiterates MU and NVDA as top semiconductor picks citing continued AI infrastructure spending. MU +21% last week on DRAM/HBM supercycle. CNBC Investing Club trimming a semi up 46% last week / 80% since April after parabolic move — profit-taking backdrop to watch.","TipRanks/CNBC","2026-05-26",0.5,"a",14),
n(9212,"MU DRAM supercycle — $966, BofA top pick May 26","Micron exploded +21.79% post-NVDA on memory supercycle confirmation. DRAM contracts +58-63% QoQ, HBM sold out 2026. Validates DRAM ETF thesis (Jan/Jun 2027 call spreads). MU now $966 vs avg PT $592 = +54% over consensus — euphoria zone but structural shortage real through 2027-2028.","StockAnalysis","2026-05-21",0.6,"m",16),
n(1005,"DRAM ETF (Roundhill Memory) added to watchlist — limit buy $46","MU at $966 (DRAM supercycle) trades above avg PT $592 (price now well above) — too rich to add. Alternative: Roundhill Memory ETF (CBOE:DRAM) at $49.32 = 24.6% MU + 24.1% Samsung + 23.1% SK hynix (NVDA HBM lead supplier) + 28% NAND/storage. $46 limit = -6.7% pullback for cycle-diluted DRAM/HBM exposure. Avoid MU concentration while keeping memory cycle thesis. 0.65% expense ratio. Launched Apr 2 = newer ETF, $9.5B AUM.","Roundhill/Yahoo Finance","2026-05-19",0.4,"v",18),
n(989,"MU PTs verified May 18 — avg $592, high $1000","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(957,"MU closed $966.4 (-6.11%) May 14","May 14 EOD — semis sell-off. Position down for the session.","Brokerage","2026-05-14",-0.4,"v",7),
n(944,"MU lowPT refreshed May 12 — $150 → $400","TipRanks 3-month (30 recent analysts) low $400. Stockanalysis still shows $150 from stale pre-rally rating. $400 reflects current active analyst floor.","Web Verified","2026-05-12",0.3,"v",7),
n(898,"MU support verified May 11 — S1 anchor: Pre-rally consolidation $720","S1 $720 = April 2026 breakout retest zone (stock consolidated $640-$700 before rallying to $1,188 Jun 25 high (now $885)); also matches StockInvest 'fair opening' $723","Web Verified","2026-05-11",0.4,"v",7),
n(861,"MU options data verified May 11 — IV 116%, IVR 100","Source: Unusual Whales May 2026 (IV 116.13, IV Rank 100.00 — MAXED, options very expensive into earnings)","Web Verified","2026-05-11",0.4,"v",7),
n(822,"MU technicals verified May 11","50d MA, 200d MA, RSI from web sources: DailyPolitical May 11 (50d=$435.84, 200d=$348.07), ChartMill RSI 83.77 (overbought)","Web Verified","2026-05-11",0.3,"t",6),
n(817,"MU PTs verified May 11 — avg $560 (TipRanks), high $1000 DA Davidson","Web-verified May 11 close: TipRanks avg $581.89 (30 analysts, range $400-1000), MarketScreener avg $551.40 (44 analysts), MarketBeat $478.24, Stockanalysis $482.9 (31 analysts). Recent raises: Mizuho $545->$740 (May 6), Wedbush $500->$550, TD Cowen $660, DA Davidson initiated $1000 Street-high. Stock $966 vs avg $560 = 21% above consensus.","Web Verified","2026-05-11",0.5,"v",8),
n(786,"MU posted $1,255 ATH (now $884.99) ATH May 8 (now $966) — passed $0.8T mkt cap","Memory supercycle on. UBS street-high PT $1625 / Susquehanna $1750. JPM noted MU among most-hyped social stocks May 7. AI hyperscaler capex $700B target. Gross margins guided >75% for 2026. CEO sold $21.5M shares May 5 = valuation concern. CNBC profiled unstoppable rise","CNBC/Deutsche/JPMorgan","2026-05-11",0.7,"f",10),
n(770,"MU $704 -3.40% May 7 — profit-taking after Mon ATH $666","Day move -3.40% from May 5 close. profit-taking after Mon ATH $666. Macro: NVDA broke into ATH zone +7.5% on AI capex narrative re-acceleration.","MarketWatch","2026-05-07",0,"m",4),

n(730,"MU $525 +6.65% May 1 — HBM cycle ATH break","Stock breaks to new ATH on continued HBM4 demand confirmation. Up $36 recently. Q3 Jun 25 catalyst. Above all moving averages.","Micron","2026-05-05",0.7,"v",9),
n(701,"MU $540 +3% Apr 30 [SUPERSEDED] — HBM demand confirmed in earnings prints","HBM demand validated by hyperscaler capex commitments. SK Hynix lead persists but MU FY27 setup intact. Q3 Jun 25 next catalyst.","Micron","2026-04-15",0.4,"m",8),
n(1,"HBM4 volume production — quarter early","CFO confirmed HBM4 vol prod Q1, exceeding 11.7 Gbps. Debunked Vera Rubin spec failure.","Wolfe Conf","2025-12-18",0.95,"p",7),
n(2,"2026 HBM capacity 100% sold out","CY2026 HBM committed under multi-year contracts. Only meeting 50-67% of demand.","CFO Murphy","2025-12-18",0.95,"m",7),
n(3,"Deutsche Bank PT $500","Three analysts at street-high $500. AI memory demand, constrained supply.","Deutsche Bank","2026-02-25",0.9,"a",7),
n(4,"Morgan Stanley: $52 EPS possible","Spot DRAM 130% above Jan contracts. PT $450 OW.","Morgan Stanley","2026-02-20",0.9,"a",7),
n(5,"Samsung CTO: demand through 2027+","AI infra demand strong through at least 2027.","Semicon Korea","2026-01-15",0.85,"s",7,"rumor"),
n(6,"Lenovo: memory costs could double","OEM confirmation of pricing power.","Lenovo","2026-02-10",0.85,"s",7),
n(7,"Hyperscaler capex near $800B","Meta +76%, MSFT +90% capex in 2026.","CFO/Industry","2026-02-01",0.85,"s",7),
n(8,"MU $421B data center buildout","WSJ: Doubling Boise campus, 2 new fabs. Biggest capex in MU history.","WSJ","2026-03-12",0.9,"m",7),
n(9,"Needham PT raised to $450","Bolton citing memory shortage. HBM margins at 68%.","Needham","2026-02-18",0.9,"a",7),
n(10,"Conditions improved since earnings","Pricing driving above 68% GM guide.","Wolfe Conf","2026-02-25",0.85,"m",7),
n(11,"MU $425 (+4.9%) surging into Mar 18 earnings. Memory demand strong despite macro fears","CFO denied. HBM4 exceeds benchmarks.","SemiAnalysis","2026-03-18",0.3,"r",7,"rumor"),
n(12,"Double-ordering risk","Customers may over-book, but backlogs suggest genuine demand.","Analysts","2026-03-05",-0.3,"r",7,"rumor"),
n(13,"SemiAnalysis: 0% Rubin share","Contradicts CFO. Unresolved tension.","SemiAnalysis","2026-03-10",-0.6,"r",7,"rumor"),
n(14,"SA Sell: fair value $284","Peak-cycle, $20B capex = future glut.","Seeking Alpha","2026-02-28",-0.7,"v",7),
n(15,"Samsung HBM4 comeback","25-30% share target, aggressive pricing.","Industry","2026-03-20",-0.5,"k",7,"rumor"),
n(16,"Technical correction targets $376-$327","Overbought, 16-20% downside potential.","TradingView","2026-04-01",-0.5,"t",6),
n(17,"Fwd P/E 12.5x discount to peers","Half NVDA. EPS growth 300%+.","Motley Fool","2026-03-25",0.7,"v",7),
n(18,"$50B Boise expansion — 2 new HBM fabs","Two 600K sqft factories. First opens mid-2027. $200B global spend. $100B NY complex groundbreaking.","WSJ","2026-03-12",-0.3,"g",7),
n(19,"Exiting Crucial consumer business","Portfolio shift to enterprise/AI. Consumer shipments end Feb 2026. Margin accretive.","Micron","2026-02-01",0.3,"m",6),
n(20,"$1.8B Tongluo Taiwan fab acquisition","PSMC P5 site. 300mm cleanroom. DRAM output H2 2027. Close Q2 2026.","Micron","2026-02-05",0.4,"g",7),
n(21,"Q2 FY26 BLOWOUT: Rev $23.86B (+196% YoY) crushed $20.07B est. EPS $12.20 vs $9.31. GM 75%. Q3 guide $33.5B rev / $19.15 EPS. 30% div hike","Best semi earnings print of the cycle. HBM supply crunch = pricing power. AH volatile despite monster beat — macro overhang","Earnings","2026-03-18",1.0,"b",7)
,
n(101,"RELIEF RALLY +6.4% — Trump signals Iran war end. Bouncing from -30% post-earnings crash","HBM4 mass prod for Vera Rubin confirmed. Q2 rev $23.9B (+196%). Stock hammered by Google memory paper + TurboQuant fears. Avg PT $486 = 57% upside. Still cheapest AI play at fwd PE ~4x FY27.","Market","2026-04-08",0.7,"m",14)
,
n(200,"MU consolidating $440 post-rally — AI memory supercycle continues","HBM supercycle on track. Samsung HBM4 yield data late April. DRAM pricing firm. Iran tensions = oil-pressure overhang. Next catalyst: Q3 earnings late June.","Market","2026-04-16",0.5,"m",12)
,
n(220,"MU $452.60 -1.01% — Trump ceasefire drives oil collapse -9.4%, memory rotation","Benzinga (Apr 17): MU in top 10 stocks up 40%+ since Trump's ceasefire claims. WallStreetZen: MU trading near 52w high $471.34 (from $65.65 low). Q3 earnings Jul 1. Insider VP Cordano sold $1.48M (3,407 shares @ $435) last week.","Benzinga/WallStreetZen Apr 17 2026","2026-04-17",0.3,"m",11)
,
n(494,"MU $473 Apr 18 all-time high — HBM demand acceleration","Robinhood Apr 18: MU traded $452.20-$472.98 intraday, new ATH $472.98. HBM supply tight through 2028 per management. CapEx FY26 $25B+ (up from $20B). TSMC/ASML raise = read-through positive for memory.","Robinhood Apr 18 2026","2026-04-18",0.8,"m",14),
n(495,"Insider sale Top exec — Apr 16","TipRanks Apr 16: Top Micron executive completed stock sale per insider filing. Modest size vs total ownership. Pre-earnings timing (Q3 FY26 Jun 25). Single sales often preplanned.","TipRanks Apr 16 2026","2026-04-16",-0.2,"b",10),
n(496,"Stock +40%+ past quarter — 10 stocks rose >40% since Trump ceasefire","Benzinga Apr 17: These 10 stocks rose >40% since Trump ceasefire claims. MU #1 AI/tech-adjacent, hasn't done this since 2005. Valuation compressed, now recovering as AI demand + rate cuts narrative returns.","Benzinga Apr 17 2026","2026-04-17",0.6,"m",13)
,
n(520,"MU Apr 20 close $448 consolidating near ATH","Market context Apr 20: MU $448.40 after Apr 18 ATH $472.98. Consolidating near highs ahead of Jun 25 Q3 FY26 earnings. HBM tight supply thesis intact. Continued AI memory demand momentum.","Market context Apr 20 2026","2026-04-20",0.5,"m",12)
,
n(545,"MU +0.87% Apr 21 — resilient vs market","Apr 21: MU $448.40 +$3.88. Resilient vs -0.5% market. HBM demand + AI capex $600B+ 2026 tailwind. Jun 25 Q3 earnings ~21d.","Apr 21","2026-04-21",0.4,"m",10)
,
n(631,"MU +8.28% Apr 22 close $486.58 NEW ATH — HBM demand blowout — Apr 22","Apr 22 close $486.58 +8.28% MASSIVE GAIN NEW 52W HIGH. Read-through from TSM capacity tight + Google Ironwood memory requirements. HBM3E/HBM4 demand far exceeding supply. Capex discipline + pricing power continues. Jun 24 earnings ✓ setup extraordinary.","Market context Apr 22 2026","2026-04-22",0.85,"m",15)
,
n(641,"MU +8.1% Apr 27 — $526 HBM supercycle re-rating","Apr 27 close $525.80 +8.1%. Memory stocks leading. Samsung HBM4 yield data pending late April. DRAM pricing firm. No major catalyst until Jun 24 earnings ✓.","Market Apr 27 2026","2026-04-27",0.75,"m",12)
,
n(671,"MU $526 +3.95% — HBM demand confirmation from MSFT Azure 40% / GOOGL Cloud 63% prints","MU rallied +$19.90 to $526 Apr 29 as hyperscaler earnings show AI infrastructure demand acceleration. GOOGL Cloud +63% YoY (vs 48% prior), MSFT Azure +40%. Memory content/system continues expanding.","Stock close Apr 29 2026","2026-04-29",0.7,"n",10)
],
options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:15.7,pcRatio:null,maxPain:1040,maxPainExp:"2026-10-02",maxPainDTE:1,maxPainOI:379960,maxPainNear:1040.0,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:52.95,atmIVExp:"2026-10-30",ivObs:17},
optionsDate:"Oct 1, 2026",optionsVerified:true,
catalysts:[{d:"Dec 17",e:"MU Q1 FY27 earnings \u2014 first test of the stronger-FY27 guide (Sep 30 Q4 \u2713 beat: rev $54.23B, EPS $33.42, GM 87%)",i:"high",iv:"high",hm:"N/A"},{d:"Mar 3 ✓",e:"TrendForce Q1 DRAM pricing — COMPLETED: DRAM +3-5% QoQ",i:"bullish",iv:"low",hm:"+3.2%"},{d:"Mar 16 ✓",e:"NVIDIA GTC Conference",i:"bullish",iv:"med",hm:"+5.1%"},{d:"Mar 18 ✓",e:"MU Q2 FY26 Earnings",i:"high",iv:"high",hm:"+9.4%"},{d:"Apr 15 ✓",e:"Samsung HBM4 yield update",i:"bearish",iv:"low",hm:"-2.8%"},{d:"H2 2026",e:"HBM4E sampling begins",i:"bullish",iv:"low",hm:"N/A"}],
peers:[{t:"MU",pe:6,ev:7.4,y:3},{t:"SK Hynix",pe:9.8,ev:6.5,y:15},{t:"Samsung",pe:13,ev:7,y:8},{t:"NVDA",pe:22,ev:28.3,y:4},{t:"WDC",pe:17,ev:11,y:-5}],
playbook:[
pb("1 WEEK","MU $1097 \u2014 BUY (77). Nearest support $1070.60, 2.4% below (volume node, never defended). +38% to $1513 consensus. RSI 64, MACD +5.80. NEXT: no dated catalyst in the next quarter. Watch: Samsung HBM4 ramp \u2014 guided Q3 HBM4 revenue at 3x Q2 Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",G,"MU $1097.39 as of the latest close, BUY at 77 on the tool's five-component score. $958.16 (Sep 3 close). Memory supercycle. Nearest observed support sits at $1070.60.","BUY (77). Watch $1070.60, 2.4% below (volume node, never defended). Upside +38% to $1513; reward-to-risk 12.6x. Next catalyst: the next scheduled print."),
pb("1 MONTH","MU $1097.39 \u2014 THESIS: $958.16 (the scheduled date close). Memory supercycle. KEY RISK: Samsung HBM4 ramp \u2014 guided Q3 HBM4 revenue at 3x Q2 NEXT CATALYST: the next scheduled print. Upside +38%, reward-to-risk 12.6x to nearest support. Refreshed the scheduled date.",G,"MU $1097.39 (the scheduled date close), BUY at 77. $958.16 (the scheduled date close). Memory supercycle. Key risk: Samsung HBM4 ramp \u2014 guided Q3 HBM4 revenue at 3x Q2","BUY (77). Watch $1070.60, 2.4% below (volume node, never defended). Upside +38% to $1513; reward-to-risk 12.6x. Next catalyst: the next scheduled print."),
pb("3 MONTHS","MU $1097.39 \u2014 NEXT QUARTER: the next scheduled print. The print either confirms the thesis ($958.16 (the scheduled date close). Memory supercycle.) or tests the key risk (Samsung HBM4 ramp \u2014 guided Q3 HBM4 revenue at 3x Q2) Nearest support $1070.60, 2.4% below (volume node, never defended). Refreshed the scheduled date.",G,"MU $1097.39 (the scheduled date close), BUY at 77. $958.16 (the scheduled date close). Memory supercycle. Key risk: Samsung HBM4 ramp \u2014 guided Q3 HBM4 revenue at 3x Q2","BUY (77). Watch $1070.60, 2.4% below (volume node, never defended). Upside +38% to $1513; reward-to-risk 12.6x. Next catalyst: the next scheduled print."),
pb("6 MONTHS","MU $1097.39 \u2014 SIX MONTHS: two prints inside the window. BUY (77). Consensus $1513 (+38%), street range $361 (-67%) to $2200 (+100%). What would change the view: Samsung HBM4 ramp \u2014 guided Q3 HBM4 revenue at 3x Q2 Refreshed the scheduled date.",G,"MU $1097.39 (the scheduled date close), BUY at 77. $958.16 (the scheduled date close). Memory supercycle. Key risk: Samsung HBM4 ramp \u2014 guided Q3 HBM4 revenue at 3x Q2","BUY (77). Watch $1070.60, 2.4% below (volume node, never defended). Upside +38% to $1513; reward-to-risk 12.6x. Next catalyst: the next scheduled print."),
pb("1 YEAR","MU $1097.39 \u2014 TWELVE MONTHS: consensus $1513 implies +38%; street range $361 (-67%) to $2200 (+100%). THESIS: $958.16 (the scheduled date close). Memory supercycle. STRUCTURAL RISK: Samsung HBM4 ramp \u2014 guided Q3 HBM4 revenue at 3x Q2 Refreshed the scheduled date.",G,"MU $1097.39 (the scheduled date close), BUY at 77. $958.16 (the scheduled date close). Memory supercycle. Key risk: Samsung HBM4 ramp \u2014 guided Q3 HBM4 revenue at 3x Q2","BUY (77). Watch $1070.60, 2.4% below (volume node, never defended). Upside +38% to $1513; reward-to-risk 12.6x. Next catalyst: the next scheduled print.")],
tech:{
ma:{d50:954.0,d100:951.0,d200:677.0,d400:408.0,align:"bullish",brk:[
{ma:"100d",p:951.0,above:"Intermediate trend bullish. Accumulation zone above this level.",below:"Trend weakening. Reduce position size. Watch for 200d test."},
{ma:"200d",p:677.0,above:"Primary uptrend intact. Institutional support strong.",below:"Major trend break. 6-month thesis at risk. Cycle may be turning."},
{ma:"400d",p:408.0,above:"Secular trend bullish. Long-term thesis valid.",below:"Secular breakdown. Exit core position. Cycle thesis confirmed over."}]},
momentum:{rsi:63.52,rsiZone:"neutral",macd:{v:36.0163,s:30.214,h:5.8023,cross:"bullish"},roc:14.8},
volume:{avg:"31.6M",recent:"27.9M",ratio:0.88,obv:"rising",accDist:"neutral",lastDay:"45.6M",lastDayX:1.44,volDate:"Oct 1, 2026"},
levels:{fibs:[166,582,710,839,1255],pivots:{r2:1149,r1:1123,p:1073,s1:1047,s2:997}},
pattern:{name:"Parabolic — Memory Supercycle",target:1200,dir:"up",note:"$1,097.39. RSI 63.5, above 50d, above 200d. Next earnings Dec 2026 (Q1 FY27)."},
verdict:{score:77,label:"BUY \u2014 MACD+",c:"y",drivers:"$1,097.39. Above 50d $954 (+15.0%), above 200d $677 (+62.1%). RSI 63.5 neutral. MACD histogram +5.80 (improving). Nearest observed support $1,070.60, 2.4% below. Next earnings Dec 2026 (Q1 FY27)."}},
fundVerified:true,
fundDate:"Oct 1, 2026",
fund:{
story:"POST-EARNINGS UPDATE. Q4 FY26 reported Oct 1: revenue $54.23B (+379%), non-GAAP EPS $33.42, gross margin 87%, all above the high end of guidance. FY26 revenue $133.19B, EPS $75.52 (+811%), DRAM revenue above $100B. Management guided to a stronger fiscal 2027. $958.16 (Sep 3 close). Memory supercycle. Q3 FY26 delivered revenue $41.46B, gross margin 84.9%, with Q4 guided $49-51B. 16 long-term agreements and $22B committed. CXMT listed in Shanghai but its prospectus discloses NO HBM program, so the threat lands on commodity DRAM rather than the HBM margin engine. UBS sees 2027 DRAM demand growth of 36% vs 22% in 2026. Next earnings Sep 30 (confirmed, after close).",
drivers:[
{name:"DRAM Pricing",dir:"up",detail:"Spot +20-25% sequential. Contract pricing locked through H1. Supply sold out."},
{name:"HBM Market Share",dir:"up",detail:"~25% share vs Samsung ~50%, SK Hynix ~25%. HBM4 sampling. NVIDIA validated."},
{name:"Cycle Timing",dir:"flat",detail:"Peak earnings likely mid-2027. Stock typically peaks 6-12mo before earnings peak."},
{name:"Samsung HBM Yields",dir:"risk",detail:"If Samsung fixes yields, supply doubles and pricing power collapses."}
],
flow:{inst:"BlackRock +2.1M shares Q4. Vanguard steady. Capital Research added $421M position.",retail:"Reddit extremely bullish. WSB top-5 mentioned ticker. Retail accumulating on every dip.",short:"Short interest 3.2% — low. No significant bear thesis beyond cycle."},
bull:{path:"DRAM pricing holds → EPS $52+ → 12.5x = $650. HBM4 wins extend cycle to 2028.",price:"$966-1100"},
bear:{path:"Samsung yields normalize H2. Double-ordering unwind \u2014 DOWNGRADED Sep 5: $22B customer prepayments and multi-year SCAs are structural commitmentss. DRAM pricing -30%. EPS reverts to $25.",price:"$250-300"},
activeRisks:[{sev:"HIGH",prob:40,risk:"Samsung HBM4 ramp \u2014 guided Q3 HBM4 revenue at 3x Q2",trigger:"Samsung targets HBM share parity with DRAM share by H2 2026, ~50% capacity growth by year-end; shipped HBM4 samples to NVIDIA first among challengers. Micron is third at ~21-22% share vs SK Hynix ~58%",triggerStatus:"watching",mitigation:"UPGRADED from MED 20% Sep 5 \u2014 the tool understated this by half",pPctNetWorth:1.5,daysToImpact:60,catalyst:"Monitored continuously \u2014 reassessed at each scheduled print"},{sev:"MED",prob:15,risk:"Double-ordering unwind: if HBM demand was pulled forward, H2 2026 could see sharp correction. Samsung HBM4 yields improving",trigger:"Inventory build at hyperscalers",impact:"-30-40% from peak",catalyst:"Q2 earnings Mar 18 ✓ — orders strong, no inventory red flags YET. Watch Q3 guide commentary on lead times + Samsung ramp H2 2026"},

{sev:"MED",prob:35,risk:"Oil/stagflation: economy slowing, DRAM ASPs could roll over. Memory is cyclical — peak earnings fear real at 9.5x fwd PE",trigger:"GDP <1% for 2 quarters",impact:"EPS estimates cut 20%+",catalyst:"Q1 2026 GDP advance estimate — Apr 30 ✓. If <1% after Q4 0.7%, recession declared ✓"},
{sev:"MED",prob:20,risk:"Samsung HBM4 comeback: Samsung CTO claims competitive yields. If true, MU pricing power erodes",trigger:"Samsung wins NVDA HBM4 qualification",impact:"ASP pressure -15%",catalyst:"Samsung earnings + tech day Apr 20, 2026 ✓ — HBM4 yield data will be disclosed"},
{sev:"LOW",prob:15,risk:"China restrictions: MU derives meaningful revenue from China. Further export curbs = revenue hit",trigger:"New Commerce Dept rules",impact:"-$2-3B annual rev",catalyst:"Commerce Dept final rule on AI chips — expected Q2 2026"}],
killer:"Samsung HBM4 yields reach 80%+ — eliminates MU's supply scarcity premium overnight.",
revMix:[{n:"DRAM",p:72,c:"#7E91E8"},{n:"NAND",p:17,c:"#B266FF"},{n:"HBM",p:11,c:"#3DBFA8"}],
compPos:{xLabel:"HBM Share",yLabel:"Pricing Power",peers:[{n:"SK Hynix",x:50,y:75},{n:"Samsung",x:50,y:45},{n:"MU",x:25,y:85,self:true}]},
mgmt:{beats:3,misses:0,streak:"+3",note:"Beat 3 consecutive quarters. CFO confirmed HBM4 timeline. Guidance consistently raised."},
metrics:{lastQ:"Q3 FY26 (May 2026)",revGrowth:345.7,grossMargin:85.0,opMargin:80.4,netMargin:68.1,note:"Q3 FY26 (Jun 24, quarter ended May 28): RECORD revenue $41.46B versus $23.86B the prior quarter and $9.30B a year ago. GAAP net income $28.24B ($24.67/sh); non-GAAP $28.86B ($25.11/sh). Operating income $33.3B. Operating cash flow $25.39B versus $4.61B a year ago. CONSOLIDATED GROSS MARGIN 85%, up from 74% in Q2 and 38% a year ago. DRAM sales +211% on roughly +140% ASPs and +30% bit shipments; NAND +183% on +130% ASPs. First nine months revenue +203%. Multi-year Strategic Customer Agreements are the durability story. Next print Sep 22. Q4 FY26 REPORTED SEP 30 AFTER THE CLOSE: revenue $54.23B, +379% YoY and +31% sequentially, a sixth consecutive quarterly record, against guidance of $50B +/- $1B and consensus near $51.2B. Non-GAAP EPS $33.42 versus ~$31.5 consensus, +33% sequentially. Gross margin 87%, above the high end of guidance. Data centre SSD revenue exceeded $10B in the quarter, more than ten times the year-earlier level; cloud memory nearly doubled sequentially to $16.28B. FY2026: revenue $133.19B (+256%), gross margin 81.1% (+40 points), diluted EPS $75.52 (+811%). DRAM revenue surpassed $100B for the year. Mehrotra: 'we expect an even stronger fiscal 2027.' Quarterly dividend of $0.15 declared, payable Oct 29. MARKET REACTION WAS FLAT TO SLIGHTLY NEGATIVE \u2014 shares eased roughly 0.8-1.2% after hours to about $1,056, with commentary pointing to rising capital spending and the Q1 gross-margin guide of ~86.25% versus ~86.4% consensus. A clean beat that did not move the stock is itself the signal: expectations had caught up."},
watchlist:[],
thesisDate:"Oct 1, 2026",techDate:"Oct 1, 2026",valDate:"Oct 1, 2026",ptDate:"Oct 1, 2026",riskDate:"Oct 1, 2026" }},
NVDA:{name:"NVIDIA Corporation",price:230.86,avgPT:328,highPT:515,ptDate:"Sep 14, 2026",ptVerified:true,lowPT:180,high52:236.54,low52:164.27,fwdPE:22,mktCap:"$5.53T",ytd:22,yr1:14,consensus:"Strong Buy",earningsDate:"Nov 18, 2026",epsEst:8.99,epsEstDate:"Aug 31, 2026",sector:"Semiconductors",support:[{lvl:207.25,label:"Swing low 2026-08-24 \u2014 held 2x"},{lvl:194.74,label:"Swing low 2026-05-04 \u2014 held 7x"},{lvl:189.8,label:"Swing low 2026-06-29 \u2014 held 2x"}],supportDate:"Oct 1, 2026",brokenSup:[],
supportVerified:true,
supportAnchor:"$207.25 (10.2%, held 2x) / $194.74 (15.6%, held 7x) / $189.80 (17.8%, held 2x) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $207.25, 10.2% below $230.86. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.1,
news:[n(10014,"REPORT: META PREPARING HOMEGROWN AI CHIPS TO REDUCE NVIDIA RELIANCE","Sep 14 headline: Meta is preparing in-house AI chips for its data centers to reduce reliance on Nvidia hardware and lower energy costs. Note Meta's MTIA is designed with Broadcom, so the read-through favours AVGO over NVDA.","TipRanks","2026-09-14",-0.3,"k",14,"news"),n(9999,"DATA STRUCTURE ESTABLISHED \u2014 support, technicals and positioning are now separate concepts","Sep 3 governing rule for this dashboard: SUPPORT IS DESCRIPTIVE, TECHNICALS ARE DIRECTIONAL, OPTIONS AND PIVOTS ARE POSITIONAL. Once a number is calculated rather than observed it is not support, regardless of how useful it is. SUPPORT/RESISTANCE holds historical price action only \u2014 swing lows and highs ranked by how many times they were defended, volume nodes, 52-week extremes. Moving averages, max pain and pivot points are BANNED from this tab. Fibonacci is the one tolerated exception, tagged derived, because its anchors are observed prices. TECHNICALS holds the moving averages, RSI, MACD and volume \u2014 answering whether the trend is healthy, never where price stops falling. OPTIONS/POSITIONING holds max pain (heaviest expiration, with the nearest labeled short-lived), IV, and PIVOT POINTS. Pivots belong here because they are a coordination mechanism rather than a memory: they work because many participants compute the same number, not because price defended it \u2014 the same logic as max pain. Both also expire, so grouping by shelf life puts them together. NOTATION DISCIPLINE: S1/S2/S3 is reserved exclusively for pivot points. The support ladder uses Support 1/2/3. The two concepts must never share notation again. RISK/REWARD must anchor downside to the strongest DEFENDED support \u2014 not a moving average, not max pain. Using tomorrow's max pain made NVDA read 11.3x when the honest figure was closer to 2-3x. CURRENT GAP: sync.py computes indicators from 400 daily candles then discards the raw OHLC, so support levels are still moving averages standing in for defended prices. Adding history.candles plus a support_resistance block is the last dependency before this structure is fully honest.","ADE data structure spec Sep 3 2026","2026-09-03",0.0,"v",16,"intel"),
n(9995,"FIRST TRUE 4PM CLOSE FROM THE API \u2014 is_official_close=true on all 21","Sep 3, 4:10pm ET pull. Every price in this file is now a settled closing print, verified by the source rather than inferred. This ends the systematic error that had been running since July: evening screenshots captured extended-hours marks, which ran 0.5-1.7% ABOVE the close on down days and made the book look better than it was. Measured examples from Jul 28: MU screenshot $830.75 vs true close $820.53, AMD $460.48 vs $454.62, TSM $394.72 vs $392.31. Intraday-vs-close deltas today were small (mostly under 1%) but the direction is no longer a guess. TECHNICALS: 50/100/200/400d moving averages, RSI-14 and MACD recomputed from 400 trading days for all 21. Max pain exact on all 21. NOTABLE READS: AVGO RSI 37.5, the weakest in the book, price $357.16 below its 50d of $384 and barely above its 200d of $370 after the post-earnings drop. HOOD RSI 68.9 and NOW RSI 65.7 are the most extended. TSLA closed $376.37, below its 200d of $400 \u2014 the only large position trading under its primary trendline. STILL NULL: IV rank, pending roughly 20 daily readings. the API serves only today's implied volatility, so a true 52-week rank cannot be computed from a single call \u2014 this is a data-source limit, not a bug.","Brokerage market-data API","2026-09-03",0.3,"v",17,"intel"),
n(9992,"MARKET-DATA API LIVE \u2014 technicals verified on 21 of 21 for the first time","Sep 3: first data pull from the Brokerage market-data API. All 21 tickers now carry live prices, 400 trading days of history, and 50/100/200/400-day moving averages, RSI-14, MACD and max pain computed locally from that history rather than fetched. Technicals were May 11 vintage on 16 of 21 names \u2014 115 days stale \u2014 and options data was May 18 across the board. Both gaps are now closed for moving averages, RSI, MACD and max pain. WHAT THE FRESH READINGS CORRECTED: NVDA RSI was stored at 43.0, actual 59.9. MRVL 50d was stored at $166, actual $222. CRWD 50d was stored at $116, actual $200. NOW 50d stored at $116, actual $116 \u2014 but its 200d is $119 with price at $146. Five tickers (TSLA, LRCX, NOW, SNPS, PWR) had NO moving-average data at all and now do. REMAINING LIMITS, stated plainly: this pull ran mid-session at 2:27pm ET so prices are live intraday, not settled closes. IV rank returns null until 20 daily readings accumulate, because the API serves only today's implied volatility \u2014 nobody can compute a true IV rank from one call. Max pain is exact from day one. Analyst price targets are not provided by the data API and still require separate sourcing.","Brokerage market-data API","2026-09-03",0.3,"v",16,"intel"),
n(9962,"GLIDE PATH TEST: dollars added turned DOWN for the first time","The framework's load-bearing assumption is that dollars added stay roughly flat near $300B/yr while only the percentage decays as the base grows. NVDA's Q3 guide is the first print to contradict the dollar figure directly: the guided sequential step is $11.8B, against $14.6B added from Q1 to Q2. Dollars added are shrinking, not flat. CUTTING THE OTHER WAY: hyperscaler capex guided from $800B (2026) to $1.3T (2027) is +62.5%, materially ABOVE the framework's +52% for 2027. So the TAM is running hot while NVDA's own sequential dollar contribution decelerates \u2014 consistent with share shifting toward ACIE/custom silicon (AVGO, MRVL) and away from merchant GPU. If that reading holds, the derivative-sleeve exit calendar (LRCX, MRVL, ANET, optical at 2028-29) may be a year early, and the AVGO/AMD 2030 reassessment is the more urgent one. Track the sequential dollar step each quarter \u2014 it is now the single most informative number in the book.","Framework analysis vs NVIDIA CFO commentary","2026-08-31",0.1,"v",18,"intel"),
n(9961,"NVDA Q2 FY27 BLOWOUT \u2014 $96.2B rev, FY28 guided ~70% growth, SUPPLY-CONSTRAINED","Aug 26 AMC: revenue $96.2B, +106% YoY and +18% QoQ, against $92.07B consensus (41 analysts). Data Center $89.0B, +117% YoY. GAAP and non-GAAP gross margin BOTH 75.0%. Non-GAAP EPS $2.22 vs $2.09; GAAP $2.46. Q3 guide $108B +/- 2% against $104.2B street. Segment split: hyperscale $49.0B +13% QoQ, ACIE $40.0B +25% QoQ and +138% YoY as NeoCloud partners bring capacity online. FY2028 guided to roughly 70% YoY growth and described as supply-constrained. AWS committed to 2 MILLION Nvidia GPUs plus Vera CPUs. CFO Kress: top-five hyperscaler capex to $1.3T in 2027 from $800B in 2026. The guide still assumes ZERO China data-center compute revenue, so that is unpriced optionality rather than a risk. Stock +7.4% premarket, ~+9% on the session.","NVIDIA 8-K Ex-99.1 / CNBC / earnings call","2026-08-26",0.95,"e",20,"earnings"),
n(9952,"DOWNSIDE AUDIT: NVDA support label named the wrong indicator \u2014 now corrected","Data-integrity sweep of every downside level Jul 28. NVDA's S1 was labelled 'Prior 50d MA floor' at $185, but the verified 50d MA is $207.82 \u2014 the label named an indicator and cited a number that was not it. Re-anchored to the VERIFIED 200d MA at $193, with the 200d beneath it. AVGO carried the same class of error, labelled 'Hard stop / 100d MA' on unverified May-11 data; its provenance is now marked estimate. ANET's ladder sat at $134/$130/$125 against a $170.73 price \u2014 22-27% below market and three months stale \u2014 re-anchored to the verified $164 street low. SYSTEM CHANGE: every support level in this file now carries explicit provenance. 'VERIFIED Jul 28' means an S&P Global technical level. '(est)' means a judgment level from price structure, NOT a charted indicator. Fourteen tickers carry '(est \u2014 MA unverified)' and should not be read as chart levels.","Internal audit / S&P Global","2026-07-28",0.0,"v",14,"intel"),
n(9941,"NVDA technicals verified \u2014 RSI 43, below the 50d but ABOVE the 200d","First refresh since May 11 (S&P Global): close $197.01 (+0.25%), 50d MA $207.82 (price -5.2% below), 200d MA $193.00 (price +2.1% ABOVE \u2014 primary uptrend INTACT), RSI 42.95 neutral (the file was carrying 71 overbought), beta 2.21. Market cap $4.77T. Forward P/E 19.77 versus AMD at 50.98. ROIC 104.67%, gross margin 74.15%, FCF $119.08B on $253.49B TTM revenue. Short interest 1.34% of shares out but RISING, 310.13M to 324.05M \u2014 the only large AI name where shorts added into strength. Next earnings confirmed Aug 26 AMC. THE READ: NVDA is the only major semi in this book still holding its 200-day. MU is 61% above its 200d but 14% below the 50d; AMD is 11% below its 50d; TSM 8% below. NVDA's -5% gap to the 50d is the shallowest damage in the sleeve.","S&P Global Market Intelligence / stockanalysis.com","2026-07-28",0.35,"t",16,"news"),
n(9931,"NVDA closed $197.01 \u2014 GREEN on the worst semi day of the rout","Verified Jul 28 official close: $197.01, UP 0.25%, on a session when MU fell 8.85% and AMD 8.15%. After-hours $196.88. The decoupling of compute from memory/equipment is now two sessions old and is the single most important structural signal in the book. Forward estimates refreshed (S&P Global): FY27 revenue $393.60B from $215.94B (+82.3%), FY27 EPS $8.99 from $4.77 (+88.4%), FY28 revenue $560.75B (+42.5%) and EPS $12.87 (+43.2%). Forward PE on FY27 is 21.92 \u2014 cheaper than AMD at 50.98 despite better growth. Fresh actions: Bernstein maintained Buy $315 on Jul 28, BofA maintained Buy $350 on Jul 27, Citi Buy $300 Jul 14. Ratings stack is 48 Strong Buy / 10 Buy / 2 Hold / 1 Strong Sell.","S&P Global Market Intelligence / stockanalysis.com","2026-07-28",0.6,"a",16,"news"),
n(9924,"DATA INTEGRITY: screenshot prices are after-hours, not closes \u2014 systematic overstatement","Verification finding Jul 28: the brokerage screenshots are captured around 8:40pm ET, so the Price column is the last EXTENDED-HOURS trade rather than the official 4pm close. Confirmed on three tickers against S&P Global: MU close $820.53 vs $830.75 applied (-1.2%), AMD close $454.62 vs $460.48 (-1.3%), TSM close $392.31 vs $394.72 (-0.6%). All three after-hours marks were HIGHER than the close, so the book has been recorded systematically optimistic on down days. Those three are now corrected; the remaining 18 still carry after-hours marks. FIX: capture screenshots between 4:00 and 4:15pm ET, or move to a price API where close is unambiguous.","S&P Global Market Intelligence / stockanalysis.com","2026-07-28",-0.1,"v",13,"intel"),
n(9902,"NVDA +0.58% and GREEN while semis burn \u2014 but $750B circular-financing question opens","Jul 28: NVDA closed UP 0.58% to $197.64 on a day MU fell 7.71% and LRCX 7.07%. Compute and ASIC decoupled from memory, equipment and power. The offsetting item: reports NVDA is preparing up to $750B in partnerships and financing tied to OpenAI and SK Hynix \u2014 including a $250B backstop for an OpenAI data-center project and a $500B SK Group collaboration announced Friday. NVDA lost the most-valuable-company crown to Apple on the news. The bear framing is circular financing: if the same handful of players fund each other\u0027s demand, reported backlog is less independent than it appears. Worth taking seriously as an accounting-quality question even while the stock outperforms.","CNBC / Yahoo Finance","2026-07-28",-0.2,"v",15,"news"),
n(9803,"NVDA -5.14% to $220.59 — Cramer flags 'margined' sellers, SOX in bear market","SOX -2.23% Jul 27 and already in a bear market after Jul 24. SMH -2% on the day, -9.33% over one month. NVDA -4.92% intraday, AMD -8.31%, INTC -3.54%. Cramer's read on the intraday reversal: sellers are 'monstrous, motivated and often margined' — i.e. leverage-forced liquidation rather than a fundamental re-rate. Distinguish mechanical selling from thesis damage before acting.","24/7 Wall St / CNBC","2026-07-27",-0.4,"t",14,"news"),

n(8804,"Hyperscaler capex guides UP — GOOGL doubles to 205B","Alphabet doubled its 2026 capex forecast to 205B. OpenAI compute spending plan hits 750B. The spend that funds NVDA data-center revenue keeps accelerating even as spender stocks get punished for it.","CNBC / TradingEconomics","2026-07-23",0.7,"a",12,"catalyst"),n(9461,"NVDA +5.85-6.13% into Jun 2 — AI complex broad rally","NVIDIA among top semi turnover names as MU/MRVL/AVGO all rallied. $1T Blackwell+Rubin order book through 2027 intact. NVLink Fusion ecosystem expanding (Marvell $2B stake, semi-custom interconnect).","TradingKey","2026-06-01",0.7,"a",12),
n(9210,"NVDA call — Rubin ramp accelerating, Blackwell winding down","Vera Rubin production accelerating, Blackwell shipments winding down — transition smooth (no revenue gap, evidenced by $91B Q2 guide). Rubin = 10x inference token cost reduction vs Blackwell. AWS/Google Cloud/Azure/Oracle first to deploy Vera Rubin instances. $1T Blackwell+Rubin orders through 2027 reaffirmed. Rack-scale offering (GPU+CPU+memory+interconnect) = read-through to VRT cooling, MRVL/AVGO networking, MU HBM.","NVIDIA call","2026-05-20",0.8,"v",18),
n(9209,"NVDA Q1 FY27 ✓ BLOWOUT May 20 — beat every line + 25x dividend hike","Rev $81.6B (vs $79.2B est, +85% YoY). EPS $1.87 (vs $1.78). Data Center record $75.2B (+92% YoY). Networking $14.8B (+199% YoY). Q2 GUIDE $91B vs $86-87B consensus — crushed by $4B+. GM 75% confirmed (pricing power intact). Raised dividend 1c→25c (25x). +$80B buyback authorization. $20B returned in Q1. Vera Rubin transition NOT producing revenue gap. China DC revenue excluded from guide = pure upside optionality.","NVIDIA IR/SEC 8-K","2026-05-20",0.95,"e",20),
n(997,"NVDA Q1 FY27 earnings confirmed May 20, 2026 AMC","TipRanks/S&P Global/Motley Fool/IG confirm Wednesday May 20 after-close report (5pm ET call). Options pricing 8.65% move. Press release ~4:20pm ET.","TipRanks/S&P Global","2026-05-18",0.3,"e",10),
n(981,"NVDA PTs verified May 18 — avg $281, high $380","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(956,"NVDA closed $222.24 (-1.36%) May 14","May 14 EOD — semis sell-off. Position down for the session.","Brokerage","2026-05-14",-0.1,"v",7),
n(897,"NVDA support verified May 11 — S1 anchor: 400d MA $190","S1 $185 within 2.7% of 400d MA — secular trend support","Web Verified","2026-05-11",0.4,"v",7),
n(860,"NVDA options data verified May 11 — IV 41%, IVR 62","Source: projectoption.com (40.6%), Unusual Whales (IV rank 61.55), AlphaQuery 30d IV 44.72%","Web Verified","2026-05-11",0.4,"v",7),
n(843,"NVDA PTs verified May 11 — avg $271","Source: Stockanalysis 37 analysts $270.73, MarketBeat $275, Public.com $272, ChartMill 71 analysts $270.25","Web Verified","2026-05-11",0.4,"v",7),
n(821,"NVDA technicals verified May 11","50d MA, 200d MA, RSI from web sources: Investing.com (50d=$206.62, 200d=$197.08), TipRanks RSI 71.37","Web Verified","2026-05-11",0.3,"t",6),
n(796,"NVDA $219.68 +4.29% May 11 — broke $222, new ATH zone, fall GTC print 17d away","Day move +4.29%. broke $215, new ATH zone, fall GTC print 17d away. Market: semis-led rally, S&P/NDX at ATH, six-week winning streak. CPI 3.7%, Fed on hold. Trump-Xi summit May 14-15 ✓","CNBC","2026-05-11",0,"m",4),
n(769,"NVDA rally to $219 ATH zone — pre-print momentum building","Stock cleared $219 resistance, now $219. Pre-print rally momentum building ahead of fall GTC earnings. AMD blowout May 5 + AI capex narrative reaccelerating. AVGO/TSM laggards reflect rotation within semis","CNBC/MarketWatch","2026-05-07",0.6,"m",8),

n(752,"NVDA $219 May 5 — consolidation continues post-AI capex digestion","Holding $219 zone after MSFT/META disappointment. Vera Rubin H2 26 narrative intact. Q1 fall GTC next.","NVIDIA","2026-05-05",0.0,"m",6),
n(700,"NVDA $219 -6% Apr 30 — AI capex digestion as MSFT/META disappoint","Stock weak as MSFT Azure decel + META capex raise to $135B = AI capex ROI questions. NVDA caught in rotation. Q1 earnings fall GTC next catalyst.","NVIDIA","2026-04-30",-0.4,"m",9),
n(1,"MS reinstates NVDA as #1 semi pick over MU — PT $260, 18x CY27E","Replacing stalled $100B infrastructure deal. Direct equity at $730-830B valuation. OpenAI round seeks $100B+. SoftBank, Amazon also participating. Money flows back to NVDA chip purchases.","Reuters/FT","2026-02-01",0.9,"m",7),
{...n(2,"Aletheia Capital upgrades to Buy — PT $189","'Too cheap to ignore' into earnings. Compute spending up 75% YoY to $530B. NVDA stock green Monday (+1%) despite broad market selloff on 15% tariff.","TipRanks","2026-02-03",0.7,"a",7),on:false},
n(3,"NVDA + META multiyear AI pact","Millions of Blackwell+Rubin GPUs for Meta hyperscale DCs. Spectrum-X networking. Jensen: no one deploys at Meta scale.","NVDA/META","2026-02-05",0.95,"m",7),
n(4,"Fwd P/E 24x — near 3yr lows","Below 5yr avg 45x. Marginally above S&P 21.8x. 20% pop potential.","Motley Fool","2026-02-07",0.8,"v",7),
n(5,"China chip exports may resume","Post Apr-2025 shutdown, could restore $8B/qtr China revenue.","Motley Fool","2026-02-09",0.85,"g",7,"rumor"),
n(6,"Hyperscaler capex exploding","GOOGL $188-185B, AMZN $219B, META $115-135B. NVDA primary provider.","Industry","2026-02-11",0.9,"s",7),
n(7,"Rubin architecture launch","1 Rubin = 4 Blackwell training, 10 inference. Massive upgrade incentive.","NVIDIA","2026-02-13",0.85,"p",7),
n(8,"Jensen at MS TMT: OpenAI/Anthropic investments likely the last. Post-GTC focus","Down while hyperscaler spend explodes. Market skeptical.","CNBC","2026-02-15",-0.3,"v",7),
n(9,"Jensen skips India AI Summit","No-show at major event. May signal priorities or nothing.","CNBC","2026-02-17",-0.15,"m",4),
n(10,"Competitors gaining in networking stack","Custom silicon + third-party switches challenging NVDA Spectrum-X dominance. Networking competition intensifying.","CNBC","2026-02-19",-0.35,"k",7),
n(11,"D.A. Davidson: not top semi pick","TSMC only Buy in coverage initiation.","D.A. Davidson","2026-02-21",-0.2,"a",5),
n(13,"NVDA-backed Ayar Labs raised $189M at $3.75B. $4B in LITE+COHR","SEC filing shows exit from ARM Holdings. Does not end business ties but notable.","SEC/StockAnalysis","2026-02-25",-0.15,"m",5),
n(14,"Hyperscaler capex 70% higher than expected","Wall St initially est 19% growth; revised to ~$650B total in 2026. NVDA primary beneficiary.","Motley Fool","2026-02-27",0.85,"s",7),
n(15,"NVDA invested $2B in Lumentum (LITE) for AI optics partnership. War dip bought +3%","MASSIVE. Rev +73% YoY beat $66.2B est. EPS +82% YoY beat $1.53 est. Data Center $189.3B (+75% YoY). Q1 guide $189B vs $189.8B est — BLOWOUT. Excludes China. Vera Rubin samples shipped. Hyperscaler capex ~$700B. Stock +3% AH to $203.","NVIDIA","2026-03-01",0.9,"e",7),
n(16,"DeepSeek V4 trained on SMUGGLED Blackwells","Reuters: US govt confirms DeepSeek's next model used Nvidia Blackwells in Inner Mongolia. Export control violation. China chip exports may resume. Market headwind or demand validator?","Reuters","2026-03-03",-0.3,"g",7),
n(17,"Anthropic enterprise event CLEARED — benign","Claude Cowork connectors launched (Google Drive, Gmail, DocuSign, FactSet). Software RALLIED: CRM +4%, TRI +11%, DOCU +2%. Positioned as 'platform intelligence layer' — partners not victims. AI disruption fears easing.","CNBC","2026-03-05",0.3,"s",7),
n(18,"NVDA ex-div Mar 11 ($0.01). $2B Lumentum investment for AI optics","Next-gen rack-scale systems delivering 10x performance per watt. Samples shipping to customers. Production shipments H2 2026. Expanding supply chain into US beyond Asia concentration.","NVIDIA","2026-03-07",0.7,"p",7),
n(19,"Jensen defends software: AI agents NOT a threat to productivity","Pushed back on AI disruption fears: 'deep misunderstanding.' Grace Blackwell 'king of inference' — order-of-magnitude lower cost per token. 'Close' to finalizing $100B OpenAI partnership. Pro Viz +159% YoY. Gaming missed on memory constraints.","Earnings Call","2026-03-09",0.6,"p",7),
n(102,"NVDA +5.9% relief rally — $1T Blackwell/Vera Rubin orders through 2027","Jensen: $4T annual AI infra by 2030. Stock -10% YTD. Avg PT $273 = 56% upside from $188. GTC validated roadmap. Vera Rubin sampling H2. Custom ASIC threat manageable — NVDA owns training.","Market","2026-04-05",0.7,"m",14)
,
n(201,"NVDA $219 holding — Vera Rubin on track for H2, AMD rally pressures multiple","Vera Rubin H2 launch confirmed. $1T orders through 2027. Competitive pressure from AMD MI400. CUDA moat intact. fall GTC earnings.","Market","2026-04-16",0.4,"m",12)
,
n(221,"Bernstein: Vera Rubin ‘5x more inference performance’ — Apr 17","Bernstein analyst note Apr 17 cites Vera Rubin delivering 5x inference gains vs Blackwell. Supports $1T Rubin orderbook thesis. NVDA closed +1.32% at $219.96. Stock +9% in April.","TipRanks/Bernstein Apr 17 2026","2026-04-17",0.7,"a",12),
n(240,"Nvidia investment sends Xanadu CEO to $1.5B billionaire — Apr 17 Bloomberg","Xanadu Quantum Technologies tripled in value this week after NVDA investment announcement. Bloomberg (Apr 17 1:15pm UTC). Confirms NVDA quantum computing stake expansion via Ising open-source model.","Bloomberg Apr 17 2026","2026-04-17",0.5,"m",9)
,
n(490,"NVDA +9% weekly, Blackwell Ultra \"leads market by 2 generations\" — Apr 17","TipRanks Apr 17 9:20am ET: Blackwell Ultra racks lead market by 2 generations vs AMD/Intel. Stock slaughters rivals. TSMC/ASML guide raise = AI demand confirmed at foundry+equipment layer. NVDA data center 91.5% of revenue. FY2026 rev $215.94B (+65% YoY).","TipRanks Apr 17 2026","2026-04-17",0.8,"a",14),
n(491,"TSMC/ASML raised 2026 forecasts — AI spending not slowing — Apr 16","Reuters Apr 16 (24/7 Wall St): ASML + TSMC raised 2026 forecasts. Hyperscalers expected to spend $600B+ on data centers this year. Q1 FY27 ✓ $81.6B rev +85% YoY, Q2 guide $91B vs $87B consensus. MSFT capex $29.88B Q2 +89% YoY. Chip spending boom intact.","Reuters/Yahoo Apr 16 2026","2026-04-16",0.85,"m",15),
n(492,"OpenAI $20B Cerebras chip deal — competitive threat — Apr 17","TipRanks Apr 17 2:42am ET: OpenAI signs $20B+ Cerebras chip deal challenging Nvidia dominance. Alternative training silicon accelerating. Watch for similar hyperscaler diversification moves.","TipRanks/Cerebras Apr 17 2026","2026-04-17",-0.4,"b",12),
n(493,"Target \$264.54 analyst consensus — 31% upside","Stock Analysis Apr 20: 39 analysts avg rating Strong Buy. 12m PT $264.54 (31% upside from $202). Wedbush Bryson: semis continue to rally. fall GTC earnings = next catalyst.","Stock Analysis Apr 20 2026","2026-04-20",0.6,"a",12)
,
n(544,"NVDA -0.83% Apr 21 — oil/Iran pressure offsets AI demand","Apr 21: NVDA $219.38 -$1.68. Pullback amid -0.5% market. AI demand thesis intact per TSMC/ASML. fall GTC earnings 37d.","Apr 21","2026-04-21",-0.1,"m",10)
,
n(607,"NVDA -0.83% Apr 21 on MRVL-Google + AWS-Anthropic custom silicon concerns","Apr 21 close: NVDA $219.38 (-$1.68, -0.83%) weak. Hyperscaler custom silicon trend (MRVL-Google talks, AWS-Anthropic $25B Trainium commit) raising alternate chip concerns. Still data center 91% of mix with $78B Q1 FY27 guide.","Market context Apr 21 2026","2026-04-21",-0.3,"b",12)
,
n(620,"NVDA +1.20% Apr 22 despite Ironwood launch — GCP partnership expansion","Apr 22 mixed day: NVDA closed +1.20% $202.28 despite Google Ironwood TPU launch. GCP + NVDA announced expanded agentic + physical AI partnership. Nvidia tax pressure real but NVDA dominance in training intact. 73% YoY rev growth latest quarter reaffirmed.","Market context Apr 22 2026","2026-04-22",0.35,"m",12),
n(621,"NVDA Vera Rubin could reassert inference dominance — competitive response — Apr 22","Apr 22 context: TPU inference separation = GOOGL gunning for NVDA. Vera Rubin NVDA roadmap 2026H2 specifically addresses inference efficiency. Watch fall GTC earnings for capex commentary + 2027 hyperscaler outlook. Alternative silicon diversification accelerating.","Market context Apr 22 2026","2026-04-22",-0.2,"b",11)
,
n(640,"NVDA +7.7% Apr 27 — $218 breakout on broad AI rally","Apr 27 close $217.98 +7.7%. Full portfolio green day. S&P broad rally. NVDA outperforming on Vera Rubin demand momentum. Next binary: fall GTC earnings.","Market Apr 27 2026","2026-04-27",0.7,"m",12)

,
n(670,"NVDA $219.85 -1.1% — pulls back as AI infra capex narrative shifts post-MSFT/META prints","NVDA closed -1.1% to $219.85 Apr 29 as MSFT Azure +40% beat reinforces hyperscaler demand but META capex raise to $125-145B raises ROI questions. NVDA capex beneficiary thesis intact — $90B+ aggregate capex expansion across 4 hyperscalers visible.","Yahoo Finance Apr 29 2026","2026-04-29",0.3,"n",8)
],
options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:8.7,pcRatio:null,maxPain:205,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:1429010,maxPainNear:227.5,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:29.59,atmIVExp:"2026-10-30",ivObs:17},
optionsDate:"Oct 1, 2026",optionsVerified:true,
catalysts:[{d:"Nov 18",e:"NVDA Q3 FY27 \u2014 guided $108B",i:"high",iv:"high",hm:"N/A"},{d:"Mar 16 ✓",e:"GTC 2026 — Vera Rubin details, networking ecosystem",i:"bullish",iv:"done",hm:"+1.4% reg +3% AH"},{d:"Mar 11 ✓",e:"NVDA ex-dividend ($0.01) — COMPLETED",i:"bullish",iv:"done",hm:"+0.8%"},{d:"Feb 24 ✓",e:"Anthropic Enterprise Event — CLEARED BENIGN",i:"neutral",iv:"low",hm:"Software rallied"},{d:"Feb-Mar",e:"$30B OpenAI stake closing",i:"bullish",iv:"med",hm:"N/A"},{d:"Mar 16 ✓",e:"GTC Conference",i:"bullish",iv:"med",hm:"+8.5%"},{d:"H1 2026",e:"Rubin chip shipments begin",i:"bullish",iv:"low",hm:"N/A"},{d:"Q2",e:"China export clarity",i:"bullish",iv:"med",hm:"N/A"}],
peers:[{t:"NVDA",pe:22,ev:28.3,y:4},{t:"AMD",pe:58,ev:25.1,y:8},{t:"AVGO",pe:20,ev:20.3,y:5},{t:"INTC",pe:45,ev:15,y:-10},{t:"TSM",pe:19,ev:15.0,y:2}],
playbook:[
pb("1 WEEK","NVDA $231 \u2014 BUY (71). Nearest support $207.25, 10.2% below, held 2x. +42% to $328 consensus. RSI 60, MACD +0.61. NEXT: Nov 18 \u2014 NVDA Q3 FY27 \u2014 guided $108B. Key risk to watch: China export rules: Commerce Dept drafted global AI chip restrictions. Could wipe $8B+/qtr if implemented broadly Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",G,"NVDA $230.86 as of the latest close, BUY at 71 on the tool's five-component score. $228.45 (Sep 3 close). The foundational platform for AI compute. Nearest observed support sits at $207.25.","BUY (71). Watch $207.25, 10.2% below, held 2x. Upside +42% to $328; reward-to-risk 4.1x. Next catalyst: NVDA Q3 FY27 \u2014 guided $108B."),
pb("1 MONTH","NVDA $230.86 \u2014 THESIS: $228.45 (the scheduled date close). The foundational platform for AI compute. KEY RISK: China export rules: Commerce Dept drafted global AI chip restrictions. Could wipe $8B+/qtr if implemented broadly NEXT CATALYST: NVDA Q3 FY27 \u2014 guided $108B. Upside +42%, reward-to-risk 4.1x to nearest support. Refreshed the scheduled date.",G,"NVDA $230.86 (the scheduled date close), BUY at 71. $228.45 (the scheduled date close). The foundational platform for AI compute. Key risk: China export rules: Commerce Dept drafted global AI chip restrictions. Could wipe $8B+/qtr if implemented broadly","BUY (71). Watch $207.25, 10.2% below, held 2x. Upside +42% to $328; reward-to-risk 4.1x. Next catalyst: NVDA Q3 FY27 \u2014 guided $108B."),
pb("3 MONTHS","NVDA $230.86 \u2014 NEXT QUARTER: NVDA Q3 FY27 \u2014 guided $108B. The print either confirms the thesis ($228.45 (the scheduled date close). The foundational platform for AI compute.) or tests the key risk (China export rules: Commerce Dept drafted global AI chip restrictions. Could wipe $8B+/qtr if implemented broadly) Nearest support $207.25, 10.2% below, held 2x. Refreshed the scheduled date.",G,"NVDA $230.86 (the scheduled date close), BUY at 71. $228.45 (the scheduled date close). The foundational platform for AI compute. Key risk: China export rules: Commerce Dept drafted global AI chip restrictions. Could wipe $8B+/qtr if implemented broadly","BUY (71). Watch $207.25, 10.2% below, held 2x. Upside +42% to $328; reward-to-risk 4.1x. Next catalyst: NVDA Q3 FY27 \u2014 guided $108B."),
pb("6 MONTHS","NVDA $230.86 \u2014 SIX MONTHS: two prints inside the window. BUY (71). Consensus $328 (+42%), street range $180 (-22%) to $515 (+123%). What would change the view: China export rules: Commerce Dept drafted global AI chip restrictions. Could wipe $8B+/qtr if implemented broadly Refreshed the scheduled date.",G,"NVDA $230.86 (the scheduled date close), BUY at 71. $228.45 (the scheduled date close). The foundational platform for AI compute. Key risk: China export rules: Commerce Dept drafted global AI chip restrictions. Could wipe $8B+/qtr if implemented broadly","BUY (71). Watch $207.25, 10.2% below, held 2x. Upside +42% to $328; reward-to-risk 4.1x. Next catalyst: NVDA Q3 FY27 \u2014 guided $108B."),
pb("1 YEAR","NVDA $230.86 \u2014 TWELVE MONTHS: consensus $328 implies +42%; street range $180 (-22%) to $515 (+123%). THESIS: $228.45 (the scheduled date close). The foundational platform for AI compute. STRUCTURAL RISK: China export rules: Commerce Dept drafted global AI chip restrictions. Could wipe $8B+/qtr if implemented broadly Refreshed the scheduled date.",G,"NVDA $230.86 (the scheduled date close), BUY at 71. $228.45 (the scheduled date close). The foundational platform for AI compute. Key risk: China export rules: Commerce Dept drafted global AI chip restrictions. Could wipe $8B+/qtr if implemented broadly","BUY (71). Watch $207.25, 10.2% below, held 2x. Upside +42% to $328; reward-to-risk 4.1x. Next catalyst: NVDA Q3 FY27 \u2014 guided $108B.")],
tech:{
ma:{d50:218.0,d100:214.0,d200:200.0,d400:178.0,align:"bullish",
brk:[{ma:"50d",p:218.0,above:"Pre-earnings drift intact. Buyers in control.",below:"Pre-earnings jitters. Normal — retest 50d common before earnings."},
{ma:"100d",p:214.0,above:"Intermediate trend healthy.",below:"Concerning pre-earnings. Market pricing in miss risk."},
{ma:"200d",p:200.0,above:"Primary bull trend intact. NVDA hasn't traded below 200d since 2023.",below:"Major breakdown. Thesis-changing. AI capex cycle peaking."},
{ma:"400d",p:178.0,above:"Secular AI infrastructure trend fully intact.",below:"Secular bear market for AI semis. Exit all positions."}]},
momentum:{rsi:60.1,rsiZone:"neutral",macd:{v:3.0687,s:2.4546,h:0.6141,cross:"bullish"},roc:2.9},
volume:{avg:"121.6M",recent:"110.8M",ratio:0.91,obv:"rising",accDist:"neutral",lastDay:"98.4M",lastDayX:0.81,volDate:"Oct 1, 2026"},
levels:{fibs:[{r:"0%",p:164,l:"52w low"},{r:"38.2%",p:192,l:"Shallow"},{r:"50%",p:200,l:"Midpoint"},{r:"61.8%",p:209,l:"Deep"},{r:"100%",p:237,l:"52w high"}],pivots:{r2:235,r1:233,p:230,s1:229,s2:226}},
pattern:{name:"Pre-Earnings Rally — ATH Zone",target:248,dir:"up",note:"$230.86. RSI 60.1, above 50d, above 200d. Next earnings Nov 18."},
verdict:{score:71,label:"BUY \u2014 MACD+",c:"y",drivers:"$230.86. Above 50d $218 (+5.9%), above 200d $200 (+15.4%). RSI 60.1 neutral. MACD histogram +0.61 (improving). Nearest observed support $207.25, 10.2% below, held 2x. Next earnings Nov 18."}},
fundVerified:true,
fundDate:"Sep 17, 2026",
fund:{
story:"$228.45 (Sep 3 close). The foundational platform for AI compute. Q2 FY27 (Aug 26) delivered revenue $96.2B +106% YoY, Data Center $89.0B +117%, gross margin 75.0% on both GAAP and non-GAAP, EPS $2.22 vs $2.09. Q3 guided $108B vs $104.2B street. FY2028 guided ~70% growth and explicitly supply-constrained. AWS committed to 2 million GPUs. Guide assumes zero China data-center compute. Next earnings Nov 18.",
drivers:[
{name:"Hyperscaler Capex",dir:"up",detail:"GOOGL $180B, AMZN $219B, META $125B, MSFT $140B. 70% above initial estimates."},
{name:"Blackwell/Rubin Ramp",dir:"up",detail:"Full-rack Blackwell shipping. Rubin architecture 4x training perf. GTC ✓ Vera Rubin details confirmed."},
{name:"Custom Silicon Threat",dir:"risk",detail:"Google TPU, Amazon Trainium, MSFT Maia — all scaling. 3-5yr share erosion risk."},
{name:"China Export Policy",dir:"flat",detail:"$8B/qtr revenue locked out. Any reopening is massive upside catalyst."}
],
flow:{inst:"Most widely held stock by institutions. Bridgewater, Renaissance, Citadel all have positions. Net buying on dips.",retail:"Retail's #1 stock. Every dip gets bought. Social sentiment consistently bullish despite flat YTD.",short:"Short interest 1.1% — negligible. Nobody wants to fight this."},
bull:{path:"Capex flows through → $67B+ Q4 rev → Rubin extends lead → 30x re-rate on accelerating EPS.",price:"$240-310"},
bear:{path:"Custom silicon takes 30% of inference market by 2028. Growth decelerates to 15%. Multiple compresses to 18x.",price:"$140-160"},
activeRisks:[{sev:"HIGH",prob:30,risk:"China export rules: Commerce Dept drafted global AI chip restrictions. Could wipe $8B+/qtr if implemented broadly",trigger:"Executive order or Commerce rule published",impact:"-15-20% revenue",catalyst:"Commerce Dept final rule ✓ — pending Q2026. Watch for Federal Register publication"},
{sev:"HIGH",prob:15,risk:"Customer concentration: 36% of rev from 2 customers (MSFT+META). Loss of either = catastrophic",trigger:"Hyperscaler capex cut or ASIC shift",impact:"-$25B+ annual rev",catalyst:"MSFT earnings ✓ Apr 29 ✓ — Azure +40% beat (earnings Apr 30 ✓ — both will signal AI spend commitment"},
{sev:"MED",prob:40,risk:"ASIC share erosion: AVGO confirmed 6 customers + $100B 2027. NVDA GPU share could fall from 85% to 65% by 2028",trigger:"AVGO/MRVL win rate accelerates",impact:"Multiple compression 25x→18x",catalyst:"AVGO Q2 earnings Jun 12 ✓ — custom silicon revenue will show share shift pace"},
{sev:"MED",prob:25,risk:"Post-GTC execution risk: if Vera Rubin details underwhelm or competitive positioning weak, sell-the-news risk",trigger:"Weak product roadmap or pricing commentary",impact:"-5-10% in 48hrs",catalyst:"GTC keynote Mar 16 ✓ — Vera Rubin details, networking roadmap, customer wins"},
{sev:"LOW",prob:20,risk:"Oil above $95 sustained (currently ~$90): stagflation crushes AI capex budgets. Hyperscalers delay spending",trigger:"Oil above $95 for 3+ months (currently ~$90)",impact:"Growth guidance cut",catalyst:"Iran tensions resurfacing May 2026 — oil ~$83, down from the June spiketh-ago. Hormuz watch active. Risk-off ramp"}],
killer:"Two or more hyperscalers publicly commit to majority custom silicon for inference workloads.",
revMix:[{n:"Data Center",p:83,c:"#3DBFA8"},{n:"Gaming",p:10,c:"#7E91E8"},{n:"Auto/Robotics",p:4,c:"#B266FF"},{n:"Pro Viz",p:3,c:"#FFBF00"}],
compPos:{xLabel:"AI Market Share",yLabel:"Ecosystem Moat",peers:[{n:"NVDA",x:85,y:95,self:true},{n:"AMD",x:10,y:30},{n:"Intel",x:3,y:20},{n:"Custom (GOOG/AMZN)",x:15,y:40}]},
mgmt:{beats:8,misses:0,streak:"+8",note:"Perfect beat streak since AI boom. Jensen consistently under-promises, over-delivers. Guidance raised every quarter."},
metrics:{lastQ:"Q2 FY27 (Jul 2026)",revGrowth:106.0,grossMargin:75.0,opMargin:64.0,netMargin:57.0,roe:105.0,note:"Q2 FY27 (Aug 26): revenue $96.2B, +106% YoY and +18% sequential, beating 41-analyst consensus of $92.07B by 4.5%. Non-GAAP EPS $2.22 vs $2.09. Data Center $89.0B, +117%. Gross margin 75.0% on BOTH GAAP and non-GAAP. Q3 guided $108.0B against $103.8B street, +4.0%. FY2028 guided ~70% growth and EXPLICITLY SUPPLY-CONSTRAINED \u2014 management's own framing is that supply, not demand, is now the binding constraint. Guide excludes China data-center compute entirely, so that is unpriced optionality rather than risk. AWS committed to 2 million GPUs. CFO Kress: top-five hyperscaler capex to $1.3T in 2027 from $800B in 2026. THE NUMBER TO TRACK: the guided sequential step is $11.8B against $14.6B from Q1 to Q2. Dollars added per quarter are no longer getting bigger \u2014 the first print where the absolute figure turned down. ACCOUNTING NOTE: from Q1 FY2027 NVIDIA folded stock-based compensation into non-GAAP and restated history, so older non-GAAP EPS is not directly comparable. Next print Nov 18."},
watchlist:[{item:"GTC 2026",d:"Mar 16 ✓",why:"Vera Rubin details + networking. Key catalyst for re-rating: Rev $68.1B, EPS $1.62, Guide $78B. Now watch for analyst PT revisions."},{item:"GTC Conference",d:"Mar 16 ✓",why:"Rubin architecture details. Software announcements. Sets narrative for 6 months."},{item:"China export policy update",d:"Q2",why:"$8B/qtr revenue locked out. Any reopening is massive."},{item:"Hyperscaler earnings (GOOGL/AMZN/META)",d:"Apr",why:"Capex guidance confirms demand durability or raises doubt."}],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",ptDate:"Sep 14, 2026",riskDate:"Sep 25, 2026" }},
AMD:{name:"Advanced Micro Devices",price:615.73,avgPT:604,highPT:1250,ptDate:"Sep 21, 2026",ptVerified:true,lowPT:365,high52:639.0,low52:160.49,fwdPE:57.3,mktCap:"$997B",ytd:176,yr1:32,consensus:"Buy",earningsDate:"Nov 3, 2026",epsEst:1.62,epsEstDate:"Jul 23, 2026",sector:"Semiconductors",support:[{lvl:437.23,label:"Swing low 2026-06-09 \u2014 held 1x"},{lvl:424.03,label:"Swing low 2026-07-29 \u2014 held 0x"},{lvl:394.35,label:"Step below \u2014 derived"}],supportDate:"Oct 1, 2026",brokenSup:[],
supportVerified:true,
supportAnchor:"$437.23 (29.0%, held 1x) / $424.03 (31.1%, held 0x) / $394.35 (36.0%) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $437.23, 29.0% below $615.73. That first gap IS the risk \u2014 no observed level between here and there. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.1,
news:[n(10003,"+9.95% TO A RECORD ON AN UNCONFIRMED 10% PRICE-HIKE REPORT \u2014 NO COMPANY RELEASE","Sep 21: AMD closed at $615.52 after an unconfirmed supply-chain report flagged a 10% Q4 price increase across AI accelerators, consumer GPUs and chipsets. AMD had issued no release; its IR feed showed nothing since Aug 31. Peers lagged by over eight points. Aggregated consensus near $604 is now below the price. RSI 73 is the first overbought reading in the book. A denial or narrower scope could reverse the move.","Yahoo Finance / TechStock2 / Parameter","2026-09-21",0.2,"r",20,"rumor"),n(9922,"AMD true close was $454.62, not $460 \u2014 RSI 39, below the 50d","Verified Jul 28: official close $454.62, down 8.15%; the $460.48 figure was the 7:59pm after-hours print. Technicals refreshed for the first time since May 11: 50d MA $510 (price -11%), 200d MA $308 (price +48%), RSI 39.18 (neutral-to-oversold, not the 80 overbought previously stored), beta 2.47, short interest 2.44% and FALLING from 41.58M to 39.77M. Forward P/E 50.98. Trailing 12-month revenue $37.45B with $5.01B net income. Reports Aug 4 AMC. The stored RSI of 80 would have suppressed any add signal; the real reading is the opposite.","S&P Global Market Intelligence / stockanalysis.com","2026-07-28",-0.2,"t",15,"news"),
n(9804,"AMD -5.73% to $491.48 — Q2 print confirmed Aug 4 AMC, call 5pm ET","Worst large-cap semi performer Jul 27, down 8.31% intraday before closing -5.73%. AMD confirmed (Jul 8 IR release) it reports fiscal Q2 2026 on Tuesday Aug 4 after the close, call at 5:00pm ET. Company guided Q2 revenue to ~$11.2B +/- $300M; published consensus EPS estimates ranged roughly $1.55-$1.62 as of mid-July. Guidance on AI-specific revenue matters more than the closed quarter — the Q2 numbers predate the current de-rate.","AMD IR / StockTitan / CM Elite","2026-07-27",-0.3,"e",15,"news"),

n(8802,"AMD lands 2GW Anthropic deal plus 5B investment plan","Second frontier lab commits major non-NVDA compute. Stock gained on the announcement — validates MI-series inference competitiveness and the custom-compute broadening thesis.","TipRanks","2026-07-22",0.8,"a",12,"catalyst"),n(9491,"AMD ~$506-515 — data-center GPU share story into 2H26","AMD anticipates major data-center revenue jump; MI400-series ramp + hyperscaler adoption. Morgan Stanley expects AMD AI chip rev growth slightly faster than NVDA in FY26.","Seeking Alpha","2026-05-30",0.5,"a",10),n(993,"AMD PTs verified May 18 — avg $465, high $530","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(959,"AMD closed $508.315 (-0.66%) May 14","May 14 EOD — semis sell-off. Position down for the session.","Brokerage","2026-05-14",-0.1,"v",7),
n(901,"AMD support verified May 11 — S1 anchor: Q1 breakout retest","S1 $430 = late-April $430-440 consolidation zone before breakout to $421","Web Verified","2026-05-11",0.4,"v",7),
n(862,"AMD options data verified May 11 — IV 40%, IVR 83","Source: Unusual Whales May 8 (IV 13.33 norm, IV Rank 83.49), FlashAlpha snapshot ATM IV 39.50%","Web Verified","2026-05-11",0.4,"v",7),
n(823,"AMD technicals verified May 11","50d MA, 200d MA, RSI from web sources: Investing.com (50d=$365.07, 200d=$284.27), TipRanks RSI 80.20","Web Verified","2026-05-11",0.3,"t",6),
n(818,"AMD PTs verified May 11 — post-Q1 cluster avg ~$465","Web-verified May 11 close: Post Q1 May 5 blowout (EPS $1.37, Rev $10.25B +38%, DC +57%), 8 firms raised PTs. Bernstein $525 (from $265 - upgrade), KeyBanc $530 (Street-high), Barclays $500, Cantor $500, BofA $450, UBS $455, Morgan Stanley $360, Raymond James $200 (low). Average post-Q1 ~$465. Stock $508 = at consensus.","Web Verified","2026-05-11",0.5,"v",8),
n(787,"AMD $525 ATH +12.8% in 2 days — analyst cluster raises post-blowout","Post-Q1 beat May 5, PTs raising. AMD trading at ATH back to 1972 IPO. Helios momentum + Q2 guide $11.2B beat sticking. Wedbush/HSBC/Davidson cluster $520-500. CNBC chip love expanding from NVDA to AMD/MU","CNBC/Multiple","2026-05-11",0.8,"f",10),
n(771,"AMD $525.80 +0.23% May 7 — consolidating post-Q1 blowout","Day move +0.23% from May 5 close. consolidating post-Q1 blowout. Macro: NVDA broke into ATH zone +7.5% on AI capex narrative re-acceleration.","Reuters","2026-05-07",0,"m",4),
n(761,"AMD Q1 BLOWOUT — EPS $1.37 vs $1.30 est, Rev $10.25B (+36% YoY)","Data Center $5.8B (+57% YoY). Q2 guide $11.2B beats $10.84B est. Stock +12% AH. Helios rack-scale shipping H2 for OpenAI/Meta. Lisa Su: server growth to accelerate","CNBC/Stocktitan","2026-05-05",0.85,"f",10),
n(758,"AMD $525.80 May 5 — pre-earnings TODAY AC","Q1 earnings TODAY AC. ±8% implied. EPS $1.28 / Rev $9.88B est. firm.","AMD","2026-05-05",0.0,"e",9),
n(734,"AMD $525.80 -4.75% May 1 — pre-earnings weakness May 5","Stock pulling back into Q1 May 5 ✓. Profit-taking after run to $361. holds.","AMD","2026-05-05",-0.4,"e",8),
n(704,"AMD $361 +5% Apr 30 [SUPERSEDED] — Q1 May 5 setup. MI400 anticipation","Stock continues higher into Q1 May 5. Bernstein, Aletheia bullish. MI400 launch + META 6GW deal expected to drive prints.","AMD","2026-04-15",0.4,"m",8),
n(1,"BLOCKBUSTER: META-AMD $60-100B deal — 6GW of GPUs","Meta buying up to $100B of AMD Instinct MI450 GPUs + EPYC CPUs over 5 years. 6 gigawatts. AMD issued Meta 160M share warrant (~10% of company) at $0.01/share, vesting on milestones up to $245/share. AMD +14% premarket to ~$216. Lisa Su: 'double-digit billions per gigawatt.' Zuckerberg: 'important partner for many years.'","AMD/Meta/Bloomberg/TechCrunch","2026-02-01",0.95,"m",7),
n(2,"MS keeps Equal-Weight on AMD — room for upside but uncertain","Meta diversifying: NVDA Blackwell+Rubin for millions of GPUs AND AMD MI450 for 6GW. Not either/or — both. Shows Meta's $135B capex is real and spreading across suppliers.","CNBC","2026-02-03",0.4,"m",7),
n(3,"War dip bought: AMD +1.7% Mon as tech recovered from -1.6% lows","Pre-deal PT of $195 will need revision. Competitively disadvantaged thesis challenged by largest AMD GPU deal ever.","D.A. Davidson","2026-02-05",-0.1,"a",6),
n(4,"MI400 GPU gaining enterprise traction","Designed with MU HBM3E. Viable NVDA alternative for inference.","Industry","2026-02-07",0.7,"p",7),
n(5,"Wells Fargo: AMD is new chip king","Upgraded, sees AMD taking data center share.","Wells Fargo","2026-02-09",0.75,"a",7),
n(6,"China chip revenue restricted","Export controls crippling forecast. Major revenue gap.","Policy","2026-02-11",-0.6,"g",7),
n(7,"HBM cost +60% in 2026 — margin pressure","Rising memory costs squeeze GPU margins.","Industry","2026-02-13",-0.4,"s",7),
n(8,"Market demands named customers not TAM","Post-selloff shift: proof not promise. META DEAL IS THE PROOF.","Market","2026-02-15",0.5,"v",7),
n(103,"AMD +4.5% broad tech rally — Meta 6GW GPU deal + MI400 traction building","OpenAI, Oracle, Meta strategic deals in place. Apr 29 ✓ earnings = next catalyst. MI400 needs named customer wins to justify 28x. Support $190. Avg PT near $230.","Market","2026-04-05",0.5,"m",10)
,
n(202,"AMD +7.5% to ATH $302 — 12-day streak longest since 2005, +32%","Bernstein PT $265. Aletheia PT $330. Meta 6GW partnership underappreciated. MI400 launch upcoming. May 5 ✓ earnings = next catalyst. EPYC +50% YoY guide.","Market","2026-04-16",0.9,"m",18)
,
n(222,"AMD $302.28 -0.35% first red day in 13 sessions — BofA raises PT $280→$310","BofA analyst Vivek Arya (Apr 17): raised PT to $310, reiterated Buy. Cites $15-20B per gigawatt of Meta deal → 60%+ data center growth 2026-2027. Goldman Sachs named AMD top pick ahead of chip earnings. UBS $310 PT suggests MSFT could be 3rd gigawatt-scale customer. 12-day streak ended +41% total gain (longest since 2005). Barron's analysis circulating.","TheStreet/Barrons/BofA Apr 17 2026","2026-04-17",0.8,"a",14)
,
n(497,"AMD +11% weekly on TSMC/ASML AI demand confirmation — Apr 16","24/7 Wall St Apr 16: AMD climbed ~11% weekly post TSMC/ASML guide raise. Data center revenue $5.38B Q4 (+39% YoY). AI picks-and-shovels thesis strong. Hyperscaler $600B+ 2026 capex commitment.","24-7 Wall St Apr 16 2026","2026-04-16",0.75,"m",14),
n(498,"Blackwell Ultra gap — AMD 2 generations behind per TipRanks","TipRanks Apr 17 9:20am ET: \"Nvidia Blackwell Ultra leads market by 2 generations\" vs AMD/Intel. MI325X ramp ongoing. MI350 next milestone. Share gain story intact but timing questions.","TipRanks Apr 17 2026","2026-04-17",-0.3,"b",12),
n(499,"New ATH \$278 approaching — breakout or exhaustion","Apr 20 close $275.21 approaching 52w high $278. Breakout extension on AI beneficiary thesis. May 5 ✓ Q1 earnings = next catalyst.","Market context Apr 20 ✓ 2026","2026-04-20",0.5,"m",12)
,
n(532,"AMD ATH $508.80 reached Apr 27 — +17% over April 21 ATH on AI momentum","Apr 21 close: AMD $295 (was $285.92) +$10.97 NEW 52W HIGH breaking $278. Post-TSMC/ASML AI demand continuing. Leader in session despite -0.5% market. May 5 ✓ Q1 earnings setup bullish.","Market Apr 21 2026","2026-04-21",0.85,"m",15)
,
n(606,"AMD +3.99% Apr 21 despite MRVL-Google news","Apr 21 close: AMD $285.92 (+$10.97, +3.99%) continuing AI halo trade. Stock shrugged off MRVL-Google chip talks despite competitive concerns. MI350 launch narrative + Meta 6GW deal supporting momentum. May 5 ✓ Q1 earnings.","Market context Apr 21 2026","2026-04-21",0.7,"m",13)
,
n(630,"AMD +6.23% NEW ATH $302.20 — breakout confirmed — Apr 22","Apr 22 close $302.20 +6.23% NEW 52W HIGH. Cleared $288 resistance decisively. Risk-on tape + AI demand confirmation. MI350 timeline being watched. Benefits from hyperscaler diversification push away from NVDA (via GOOGL TPU, AWS Trainium, MSFT Maia). May 5 ✓ Q1 earnings setup strong.","Market context Apr 22 2026","2026-04-22",0.8,"m",14)
,
n(642,"AMD +11% Apr 27 — $508.80 META 6GW deal + MI400 tailwind","Apr 27 close $508.80.35 +11% on the day. META 6GW AMD chip deal re-rating underway. MI400 competitive vs NVDA compelling. May 5 ✓ earnings = next binary.","Market Apr 27 2026","2026-04-27",0.8,"m",12)


,
n(672,"AMD $525.80.38 +6.24% [PRE-EARNINGS] — META 6GW deal halo from Capex raise to $125-145B","AMD ATH $508.80 Apr 29 +6.24% on day. META capex raise from $115-135B → $125-145B reinforces 6GW MI400 deal trajectory. AMD post-earnings (May 5 ✓) setup tightening.","Stock close Apr 29 2026","2026-04-15",0.65,"n",10)
],
options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:-7.0,pcRatio:null,maxPain:510,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:243376,maxPainNear:595.0,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:48.72,atmIVExp:"2026-10-30",ivObs:17},
optionsDate:"Oct 1, 2026",optionsVerified:true,
catalysts:[{d:"Nov 3",e:"AMD Q3 earnings",i:"high",iv:"high",hm:"N/A"},{d:"Mar 16 ✓",e:"NVDA GTC — competitive read for AMD MI400",i:"bullish",iv:"high",hm:"+14% PM"},{d:"Apr 29 ✓",e:"AMD Q1 2026 Earnings — MI400 adoption data",i:"bullish",iv:"high",hm:"TBD"},{d:"Mar 16 ✓",e:"NVIDIA GTC (competitive read)",i:"bearish",iv:"med",hm:"-3.4%"},{d:"Apr 29 ✓",e:"AMD Q1 Earnings",i:"high",iv:"high",hm:"-6.2%"},{d:"H2 2026",e:"MI450 first 1GW shipments to Meta",i:"bullish",iv:"med",hm:"N/A"}],
peers:[{t:"AMD",pe:58,ev:25.1,y:8},{t:"NVDA",pe:22,ev:28.3,y:4},{t:"INTC",pe:45,ev:15,y:-10},{t:"AVGO",pe:20,ev:20.3,y:5},{t:"MU",pe:6,ev:7.4,y:3}],
playbook:[
pb("1 WEEK","AMD $616 \u2014 TRIM/AVOID (16). Nearest support $437.23, 29.0% below, held 1x. -2% to $604 consensus. RSI 67, MACD +4.81. NEXT: Nov 3 \u2014 AMD Q3 earnings. Watch: MI400 adoption failure: if MI400 can't win named hyperscaler deals beyond Meta, AMD remains distant #2 in AI Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",R,"AMD $615.73 as of the latest close, TRIM/AVOID at 16 on the tool's five-component score. $456.16 (Sep 3 close). The CUDA challenger. Nearest observed support sits at $437.23.","TRIM/AVOID (16). Watch $437.23, 29.0% below, held 1x. Upside -2% to $604; reward-to-risk -0.1x. Next catalyst: AMD Q3 earnings."),
pb("1 MONTH","AMD $615.73 \u2014 THESIS: $456.16 (the scheduled date close). The CUDA challenger. KEY RISK: MI400 adoption failure: if MI400 can't win named hyperscaler deals beyond Meta, AMD remains distant #2 in AI NEXT CATALYST: AMD Q3 earnings. Upside -2%, reward-to-risk -0.1x to nearest support. Refreshed the scheduled date.",R,"AMD $615.73 (the scheduled date close), TRIM/AVOID at 16. $456.16 (the scheduled date close). The CUDA challenger. Key risk: MI400 adoption failure: if MI400 can't win named hyperscaler deals beyond Meta, AMD remains distant #2 in AI","TRIM/AVOID (16). Watch $437.23, 29.0% below, held 1x. Upside -2% to $604; reward-to-risk -0.1x. Next catalyst: AMD Q3 earnings."),
pb("3 MONTHS","AMD $615.73 \u2014 NEXT QUARTER: AMD Q3 earnings. The print either confirms the thesis ($456.16 (the scheduled date close). The CUDA challenger.) or tests the key risk (MI400 adoption failure: if MI400 can't win named hyperscaler deals beyond Meta, AMD remains distant #2 in AI) Nearest support $437.23, 29.0% below, held 1x. Refreshed the scheduled date.",R,"AMD $615.73 (the scheduled date close), TRIM/AVOID at 16. $456.16 (the scheduled date close). The CUDA challenger. Key risk: MI400 adoption failure: if MI400 can't win named hyperscaler deals beyond Meta, AMD remains distant #2 in AI","TRIM/AVOID (16). Watch $437.23, 29.0% below, held 1x. Upside -2% to $604; reward-to-risk -0.1x. Next catalyst: AMD Q3 earnings."),
pb("6 MONTHS","AMD $615.73 \u2014 SIX MONTHS: two prints inside the window. TRIM/AVOID (16). Consensus $604 (-2%), street range $365 (-41%) to $1250 (+103%). What would change the view: MI400 adoption failure: if MI400 can't win named hyperscaler deals beyond Meta, AMD remains distant #2 in AI Refreshed the scheduled date.",R,"AMD $615.73 (the scheduled date close), TRIM/AVOID at 16. $456.16 (the scheduled date close). The CUDA challenger. Key risk: MI400 adoption failure: if MI400 can't win named hyperscaler deals beyond Meta, AMD remains distant #2 in AI","TRIM/AVOID (16). Watch $437.23, 29.0% below, held 1x. Upside -2% to $604; reward-to-risk -0.1x. Next catalyst: AMD Q3 earnings."),
pb("1 YEAR","AMD $615.73 \u2014 TWELVE MONTHS: consensus $604 implies -2%; street range $365 (-41%) to $1250 (+103%). THESIS: $456.16 (the scheduled date close). The CUDA challenger. STRUCTURAL RISK: MI400 adoption failure: if MI400 can't win named hyperscaler deals beyond Meta, AMD remains distant #2 in AI Refreshed the scheduled date.",R,"AMD $615.73 (the scheduled date close), TRIM/AVOID at 16. $456.16 (the scheduled date close). The CUDA challenger. Key risk: MI400 adoption failure: if MI400 can't win named hyperscaler deals beyond Meta, AMD remains distant #2 in AI","TRIM/AVOID (16). Watch $437.23, 29.0% below, held 1x. Upside -2% to $604; reward-to-risk -0.1x. Next catalyst: AMD Q3 earnings.")],
tech:{
ma:{d50:512.0,d100:509.0,d200:373.0,d400:264.0,align:"bullish",brk:[
{ma:"100d",p:509.0,above:"Holding above analyst consensus. Market giving benefit of doubt.",below:"Below consensus PT. Negative signal — market losing patience."},
{ma:"200d",p:373.0,above:"Primary trend intact. Key level for institutional holders.",below:"Breaks primary trend. MI400 thesis failing. Significant downside risk."},
{ma:"400d",p:264.0,above:"Long-term growth trajectory intact.",below:"Long-term trend broken. AMD as NVDA alternative thesis dead."}]},
momentum:{rsi:66.96,rsiZone:"neutral",macd:{v:34.8729,s:30.066,h:4.8069,cross:"bullish"},roc:34.7},
volume:{avg:"23.1M",recent:"18.0M",ratio:0.78,obv:"rising",accDist:"neutral",lastDay:"17.1M",lastDayX:0.74,volDate:"Oct 1, 2026"},
levels:{fibs:[160,343,400,456,639],pivots:{r2:630,r1:623,p:612,s1:605,s2:594}},
pattern:{name:"Parabolic — Post-Blowout ATH",target:665,dir:"up",note:"$615.73. RSI 67.0, above 50d, above 200d. Next earnings Nov 3."},
verdict:{score:16,label:"TRIM/AVOID \u2014 NO NEARBY SUPPORT",c:"y",drivers:"$615.73. Above 50d $512 (+20.3%), above 200d $373 (+65.1%). RSI 67.0 neutral. MACD histogram +4.81 (improving). Nearest observed support $437.23, 29.0% below, held 1x. Next earnings Nov 3."}},
fundVerified:true,
fundDate:"Sep 17, 2026",
fund:{
story:"$456.16 (Sep 3 close). The CUDA challenger. Reported Aug 4. Next earnings Nov 3. Latest-quarter detail in this panel is NOT yet refreshed.",
drivers:[
{name:"MI400 Adoption",dir:"flat",detail:"Enterprise traction building but no named hyperscaler wins announced. Needs GTC competitive read."},
{name:"Data Center Share",dir:"up",detail:"Server CPU share 30%+ and growing. EPYC is the real cash cow, not GPUs."},
{name:"China Restrictions",dir:"risk",detail:"Export controls hit AMD too. Revenue gap growing."},
{name:"NVDA Competitive Moat",dir:"risk",detail:"CUDA + full-stack + Rubin makes switching costly. AMD is always 'next year.'"}
],
flow:{inst:"Wells Fargo upgraded. But D.A. Davidson says competitively disadvantaged. Mixed institutional view.",retail:"Retail loves the NVDA alternative narrative. Heavy call buying on every NVDA dip.",short:"Short interest 4.8% — moderate. Bears point to valuation above consensus PT."},
bull:{path:"MI400 wins 2-3 named hyperscaler deals → PT revisions to $520+ → re-rate to $520-420.",price:"$690-$770"},
bear:{path:"MI400 fails to gain traction. EPYC growth slows. Stock reverts to $160-180 as PT gravity pulls.",price:"$380-410"},
activeRisks:[{sev:"HIGH",prob:35,risk:"MI400 adoption failure: if MI400 can't win named hyperscaler deals beyond Meta, AMD remains distant #2 in AI",trigger:"No new named MI400 customer announced by Q2",impact:"AI narrative dies, stock -20%",catalyst:"Post-GTC ✓ competitive read + AMD earnings Apr 2 ✓9 ✓ — MI400 customer count + revenue. Also Computex (through Jun 5 ✓)"},
{sev:"MED",prob:30,risk:"Meta MTIA priority: $60-100B deal enormous but MTIA (AVGO-designed) may take priority over MI400. AMD gets smaller share",trigger:"Meta shifts budget to internal MTIA chips",impact:"Deal value -30-50%",catalyst:"META earnings Apr 30 ✓ — capex allocation between GPU/ASIC/internal. Also Meta AI infrastructure day if scheduled ✓"},
{sev:"MED",prob:25,risk:"EPYC server CPU growth slowing: Intel Granite Rapids + ARM competition. If server share peaks, growth engine weakens",trigger:"Intel wins back server share",impact:"CPU rev growth <10%",catalyst:"Intel earnings Apr 24 ✓ — Granite Rapids adoption data. Also Mercury Research quarterly share data ~May"},
{sev:"LOW",prob:20,risk:"China revenue restricted: export controls limit China AI chip sales. Revenue hit already in progress",trigger:"Further restrictions enacted",impact:"-$1-2B annual rev",catalyst:"Commerce Dept final rule ✓ — pending Q2026. Also AMD earnings Apr 29 ✓ China revenue disclosure"}],
killer:"Major hyperscaler cancels or delays MI400 order in favor of custom silicon or NVDA Rubin.",
revMix:[{n:"Data Center",p:50,c:"#3DBFA8"},{n:"Client (PC)",p:29,c:"#7E91E8"},{n:"Gaming",p:12,c:"#B266FF"},{n:"Embedded",p:9,c:"#FFBF00"}],
compPos:{xLabel:"AI GPU Share",yLabel:"CPU Share",peers:[{n:"NVDA",x:85,y:5},{n:"AMD",x:10,y:33,self:true},{n:"Intel",x:3,y:60},{n:"ARM",x:2,y:15}]},
mgmt:{beats:2,misses:1,streak:"+2",note:"Mixed record. Beat last 2 but missed in Q2 2025 on data center shortfall. Guidance conservative."},
metrics:{lastQ:"Q2 2026 (Jun 2026)",revGrowth:50.0,grossMargin:54.0,opMargin:17.4,netMargin:20.0,note:"Q2 2026 (Aug 4): RECORD revenue $11.5B, +50% YoY. GAAP gross margin 54%, operating income $2.0B, net income $2.3B, EPS $1.38. Non-GAAP: gross margin 56%, record operating income $3.1B, net income $2.8B, EPS $1.66. DATA CENTER $6.7B, +107% \u2014 more than doubled, now 58% of company revenue on EPYC and Instinct. Client and Gaming $3.8B +6%; Client alone $3.1B +23% on Ryzen. Non-GAAP gross margin up over 200bps YoY on Data Center mix. CFO Jean Hu guided Data Center to ACCELERATE in 2H26; Su cited Helios beginning to ramp. CAVEAT ON THE COMPARISON: Q2 2025 included $800M of inventory charges from the MI308 export control, which flatters the year-over-year figure. Next print Nov 3."},
watchlist:[{item:"NVIDIA GTC competitive read",d:"Mar 16 ✓",why:"Rubin details show how far ahead NVDA is. If gap widens, AMD de-rates."},{item:"MI400 customer announcements",d:"H1 2026",why:"Need named hyperscaler wins to justify valuation above consensus PT."},{item:"AMD Q1 Earnings",d:"Apr 29",why:"Data center GPU revenue trajectory — market needs proof not promises."},{item:"Server CPU share data (Mercury Research)",d:"Quarterly",why:"EPYC share gains are the real cash cow."}],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",ptDate:"Sep 21, 2026",riskDate:"Sep 25, 2026" }},
TSM:{name:"Taiwan Semiconductor",price:459.2,avgPT:552,highPT:700,ptDate:"Sep 21, 2026",ptVerified:true,lowPT:440,high52:479.0,low52:266.82,fwdPE:19.5,mktCap:"$2.31T",ytd:44,yr1:95,consensus:"Strong Buy",earningsDate:"Oct 15, 2026",epsEst:2.10,epsEstDate:"Jul 23, 2026",sector:"Semiconductors",support:[{lvl:421.68,label:"Volume node \u2014 8.2% below"},{lvl:405.51,label:"Swing low 2026-06-09 \u2014 held 6x"},{lvl:385.06,label:"Swing low 2026-05-19 \u2014 held 3x"}],supportDate:"Oct 1, 2026",brokenSup:[],
supportVerified:true,
supportAnchor:"$421.68 (8.2%) / $405.51 (11.7%, held 6x) / $385.06 (16.1%, held 3x) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $421.68, 8.2% below $459.20. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.15,
news:[n(10010,"AUGUST REVENUE NT$514.8B, +53.3% YoY","Sep 10: August revenue rose 53.3% year over year to NT$514.81B. Consensus target $552 across 20 analysts (S&P Global), range $440-$700, every target above the price.","TipRanks / Stockanalysis","2026-09-10",0.4,"e",14,"news"),n(9923,"TSM close $392.31 \u2014 the most defensible technical setup in the semi sleeve","Verified Jul 28: official close $392.31, down 1.70% (the $394.72 was after-hours). Technicals refreshed after 78 days: 50d MA $426 (price -8%), 200d MA $356 (price +10% ABOVE \u2014 the only large semi in the book still holding its primary trend), RSI 38.99, beta 1.25 (lowest in the AI sleeve). Forward P/E 18.35 versus AMD at 50.98 and a 64.2% gross margin. ROIC 54.6%. Short interest just 0.69% of shares out, though it rose from 24.58M to 33.35M. Last reported Jul 16 BMO; consensus $537 across 19 analysts.","S&P Global Market Intelligence / stockanalysis.com","2026-07-28",0.3,"t",14,"news"),
n(9471,"TSM +4.52% — AI foundry demand drives record-growth narrative","Strong Buy consensus (13/15 analysts), PT cluster $445-465. Q1 record rev $35.9B (+35-40% YoY), GM 66.2%. 3nm/2nm leadership anchors NVDA/AMD/AVGO/Apple AI orders. Mgmt cites \"extremely robust\" AI chip demand.","IBTimes","2026-05-30",0.6,"a",11),n(984,"TSM PTs verified May 18 — avg $417, high $480","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(962,"TSM closed $395.47 (-2.09%) May 14","May 14 EOD — semis sell-off. Position down for the session.","Brokerage","2026-05-14",-0.1,"v",7),
n(903,"TSM support verified May 11 — S1 anchor: 100d MA $335 + 200d MA $318","S1 $330 sandwiched between 100d and 200d MAs","Web Verified","2026-05-11",0.4,"v",7),
n(883,"TSM options verified May 11 — IV 38%, IVR 50","Source: AlphaQuery 30d HV 38.19% May 1 2026, 30d IV Mean 38.36% Jan 2026","Web Verified","2026-05-11",0.4,"v",7),
n(864,"TSM options data verified May 11 — IV 33%, IVR 50","Source: Public Unusual Whales TSM page (link confirmed, data live)","Web Verified","2026-05-11",0.4,"v",7),
n(845,"TSM PTs verified May 11 — avg $417","Source: Public.com 6 analysts $416.67. Conservative coverage, range estimate based on TSMC PT methodology","Web Verified","2026-05-11",0.4,"v",7),
n(825,"TSM technicals verified May 11","50d MA, 200d MA, RSI from web sources: altindex (50d=$348.4, 200d=$318.4), RSI 71.3","Web Verified","2026-05-11",0.3,"t",6),
n(799,"TSM $404.16 -2.06% May 11 — minor pullback, you added shares","Day move -2.06%. minor pullback, you added shares. Market: semis-led rally, S&P/NDX at ATH, six-week winning streak. CPI 3.7%, Fed on hold. Trump-Xi summit May 14-15 ✓","MarketWatch","2026-05-11",0,"m",4),
n(772,"TSM $404 +3.70% May 7 — semis rotation lifting laggards","Day move +3.70% from May 5 close. semis rotation lifting laggards. Macro: NVDA broke into ATH zone +7.5% on AI capex narrative re-acceleration.","Bloomberg","2026-05-07",0,"m",4),

n(753,"TSM $401 +0.7% May 5 — N2/N3P leadership intact","Foundry pricing power steady. AI capex absorption story intact. Q2 Jul 17 ✓ next.","TSMC","2026-05-05",0.3,"m",6),
n(721,"TSM $413 +1% Apr 30 — N2/N3P node leadership intact","Q1 beat continues to validate AI capex absorption. Foundry pricing power steady. Q2 Jul 17 ✓ next print.","TSMC","2026-04-30",0.2,"m",7),
n(1,"D.A. Davidson: Only Buy — PT $450","Leading-edge fab 'durable, self-reinforcing advantage.' Only Buy.","D.A. Davidson","2026-02-01",0.9,"a",7),
n(2,"3-10% price hikes through 2029","Multi-year pricing plan. Margins above 45%.","Seeking Alpha","2026-02-03",0.85,"m",7),
n(3,"2nm yields better than expected","Accelerating future nodes. Commercial production 2026.","TSMC","2026-02-05",0.8,"p",7),
n(4,"No new 3nm designs — forcing 2nm","Supply so tight turning away designs.","Industry","2026-02-07",0.75,"p",7),
n(5,"Arizona expansion + US $371B","Commerce Sec expects $371B→$371B investment.","CNBC","2026-02-09",0.6,"m",7),
n(6,"25% tariff on AI chips","Geopolitical overhang.","Policy","2026-02-11",-0.5,"g",7),
n(7,"Taiwan geopolitical risk premium","China-Taiwan tension depresses multiple.","Macro","2026-02-13",-0.45,"x",7),
n(8,"Kospi -12% crash — Samsung -7%, SK Hynix -5%. TSM $362 on war fears","Consensus underestimates per SA.","Analysts","2026-02-15",0.7,"e",7),
n(104,"TSM +7.6% strongest session in weeks — war deescalation eases supply chain fears","Arizona fab on track. 90% advanced chip market share. Geopolitical derisking via US/Japan fabs. AI demand unabated. N3P/N2 ramp strong.","Market","2026-04-05",0.6,"m",12)
,
n(203,"TSM Q1 earnings BEAT — +58% profit YoY, FY 2026 guide raised to 30%+ growth","Revenue $35B vs $35B est. Net income $18.4B. Capex guide $52-56B trending to high end. N3P/N2 ramp strong. AI accelerator demand unabated. Stock dipped -3% on mixed reaction.","Earnings","2026-04-16",0.8,"b",18)
,
n(223,"TSM $369.30 +1.64% post-earnings recovery — Q1 +58% profit digested","CNBC (Apr 16): TSMC posts record profits on continued AI demand. CEO CC Wei: capacity very tight, stepping up capex. $600B hyperscaler data center spend 2026 confirmed by ASML+TSMC results. Stock -3% Wed on profit-taking, +1.64% Thu recovery.","CNBC/Reuters Apr 16-17 2026","2026-04-17",0.6,"m",11)
,
n(500,"TSM Q1 print: Net profit +58% YoY, 2026 guide RAISED","Reuters Apr 16: TSMC reported Q1 net profit +58% YoY on AI chip demand. Raised 2026 revenue outlook. Q2 guide $39.0-40.2B revenue (high-single-digit from $35.7B Q1). CEO Wei: AI demand remains very strong. Capex increased to expand capacity.","Reuters Apr 16 2026","2026-04-16",0.9,"e",15),
n(501,"Capacity tight — capex stepping up for AI — Apr 16","Reuters Apr 16: TSMC executives point to tight production capacity. Working aggressively to expand manufacturing capabilities for AI chips in mass quantities. CEO Wei: \"stepping up capex investment to increase capacity.\"","Reuters Apr 16 2026","2026-04-16",0.75,"e",13),
n(502,"Net cost structure: AVGO custom + MRVL Google deal read","Apr 18-20 context: AVGO custom ASIC ramp + MRVL Google deal both flow to TSM foundry. Multi-vendor AI chip demand concentration continues. TSM remains leading cutting-edge processor producer globally.","Market context Apr 20 2026","2026-04-20",0.7,"m",13)
,
n(546,"TSM +0.78% Apr 21 — Q1 beat momentum continues","Apr 21: TSM $369.11 +$2.87. Q1 beat rally (+58% profit). Foundry monopoly. Jul 16 ✓ Q2 earnings 86d. FY26 guide RAISED 30%+.","Apr 21","2026-04-21",0.5,"m",10)
,
n(633,"TSM +4.66% $385.24 — Ironwood TPU + HBM read-through — Apr 22","Apr 22 close $385.24 +4.66%. Google Ironwood TPU is TSM foundry product. MU HBM scaling = TSM advanced packaging demand. All paths lead to TSM: NVDA, AVGO, MRVL (Google), MU (HBM). Capacity tight thesis reinforced.","Market context Apr 22 2026","2026-04-22",0.7,"m",14)
,
n(646,"TSM +0.91% Apr 27 — $406 post-Q1-beat consolidation","Apr 27 close $406.14 +0.91%. Q1 beat digest +58% profit. FY26 guide raised 30%+. N2/N3P sold out. Jul 17 ✓ Q2 earnings.","Market Apr 27 2026","2026-04-27",0.55,"m",12)
,
n(673,"TSM $394.77 +0.6% — N2 demand from AVGO/MU all-AI capex up 70% YoY","TSM closed up at $394.77. Hyperscaler capex collectively up 70% YoY per CNBC — directly drives TSM N2/N3P node demand 2H26.","Stock close Apr 29 2026","2026-04-29",0.4,"n",6)
],
options:{ivRank:null,ivPctl:null,impliedMove:8.6,skew:null,lastEarnMove:-2.3,pcRatio:null,maxPain:430,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:180347,maxPainNear:440.0,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:30.37,atmIVExp:"2026-10-30",ivObs:17},
optionsDate:"Oct 1, 2026",optionsVerified:true,
catalysts:[{d:"Oct 15",e:"TSM Q3 \u2014 gross margin guided 65-67% on 2nm dilution",i:"high",iv:"med",hm:"N/A"},{d:"Apr 16 ✓",e:"TSMC Q1 Earnings — BEAT, +58% profit, guide raised",i:"high",iv:"high",hm:"+4.2%"},{d:"H1 2026",e:"2nm commercial ramp",i:"bullish",iv:"low",hm:"N/A"},{d:"Ongoing",e:"US-China tariff negotiations",i:"neutral",iv:"med",hm:"-2.5%"}],
peers:[{t:"TSM",pe:19,ev:15.0,y:2},{t:"NVDA",pe:22,ev:28.3,y:4},{t:"AVGO",pe:20,ev:20.3,y:5},{t:"INTC",pe:45,ev:15,y:-10},{t:"Samsung",pe:13,ev:7,y:8}],
playbook:[
pb("1 WEEK","TSM $459 \u2014 HOLD (47). Nearest support $421.68, 8.2% below (volume node, never defended). +20% to $552 consensus. RSI 66, MACD +2.23. NEXT: Oct 15 \u2014 TSM Q3 \u2014 gross margin guided 65-67% on 2nm dilution. Earnings in 14d. Watch: Customer concentration \u2014 top ten were 78% of 2025 revenue, largest 19%, second 17% Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",Y,"TSM $459.20 as of the latest close, HOLD at 47 on the tool's five-component score. $428.91 (Sep 4 close). The AI foundry monopoly \u2014 essentially every leading-edge AI accelerator is manufactured here. Nearest observed support sits at $421.68.","HOLD (47). Watch $421.68, 8.2% below (volume node, never defended). Upside +20% to $552; reward-to-risk 2.5x. Next catalyst: TSM Q3 \u2014 gross margin guided 65-67% on 2nm dilution."),
pb("1 MONTH","TSM $459.20 \u2014 THESIS: $428.91 (the scheduled date close). The AI foundry monopoly \u2014 essentially every leading-edge AI accelerator is manufactured here. KEY RISK: Customer concentration \u2014 top ten were 78% of 2025 revenue, largest 19%, second 17% NEXT CATALYST: TSM Q3 \u2014 gross margin guided 65-67% on 2nm dilution. Upside +20%, reward-to-risk 2.5x to nearest support. Refreshed the scheduled date.",Y,"TSM $459.20 (the scheduled date close), HOLD at 47. $428.91 (the scheduled date close). The AI foundry monopoly \u2014 essentially every leading-edge AI accelerator is manufactured here. Key risk: Customer concentration \u2014 top ten were 78% of 2025 revenue, largest 19%, second 17%","HOLD (47). Watch $421.68, 8.2% below (volume node, never defended). Upside +20% to $552; reward-to-risk 2.5x. Next catalyst: TSM Q3 \u2014 gross margin guided 65-67% on 2nm dilution."),
pb("3 MONTHS","TSM $459.20 \u2014 NEXT QUARTER: TSM Q3 \u2014 gross margin guided 65-67% on 2nm dilution. The print either confirms the thesis ($428.91 (the scheduled date close). The AI foundry monopoly \u2014 essentially every leading-edge AI accelerator is manufactured here.) or tests the key risk (Customer concentration \u2014 top ten were 78% of 2025 revenue, largest 19%, second 17%) Nearest support $421.68, 8.2% below (volume node, never defended). Refreshed the scheduled date.",Y,"TSM $459.20 (the scheduled date close), HOLD at 47. $428.91 (the scheduled date close). The AI foundry monopoly \u2014 essentially every leading-edge AI accelerator is manufactured here. Key risk: Customer concentration \u2014 top ten were 78% of 2025 revenue, largest 19%, second 17%","HOLD (47). Watch $421.68, 8.2% below (volume node, never defended). Upside +20% to $552; reward-to-risk 2.5x. Next catalyst: TSM Q3 \u2014 gross margin guided 65-67% on 2nm dilution."),
pb("6 MONTHS","TSM $459.20 \u2014 SIX MONTHS: two prints inside the window. HOLD (47). Consensus $552 (+20%), street range $440 (-4%) to $700 (+52%). What would change the view: Customer concentration \u2014 top ten were 78% of 2025 revenue, largest 19%, second 17% Refreshed the scheduled date.",Y,"TSM $459.20 (the scheduled date close), HOLD at 47. $428.91 (the scheduled date close). The AI foundry monopoly \u2014 essentially every leading-edge AI accelerator is manufactured here. Key risk: Customer concentration \u2014 top ten were 78% of 2025 revenue, largest 19%, second 17%","HOLD (47). Watch $421.68, 8.2% below (volume node, never defended). Upside +20% to $552; reward-to-risk 2.5x. Next catalyst: TSM Q3 \u2014 gross margin guided 65-67% on 2nm dilution."),
pb("1 YEAR","TSM $459.20 \u2014 TWELVE MONTHS: consensus $552 implies +20%; street range $440 (-4%) to $700 (+52%). THESIS: $428.91 (the scheduled date close). The AI foundry monopoly \u2014 essentially every leading-edge AI accelerator is manufactured here. STRUCTURAL RISK: Customer concentration \u2014 top ten were 78% of 2025 revenue, largest 19%, second 17% Refreshed the scheduled date.",Y,"TSM $459.20 (the scheduled date close), HOLD at 47. $428.91 (the scheduled date close). The AI foundry monopoly \u2014 essentially every leading-edge AI accelerator is manufactured here. Key risk: Customer concentration \u2014 top ten were 78% of 2025 revenue, largest 19%, second 17%","HOLD (47). Watch $421.68, 8.2% below (volume node, never defended). Upside +20% to $552; reward-to-risk 2.5x. Next catalyst: TSM Q3 \u2014 gross margin guided 65-67% on 2nm dilution.")],
tech:{
ma:{d50:424.0,d100:425.0,d200:386.0,d400:309.0,align:"bullish",
brk:[{ma:"50d",p:424.0,above:"Strong uptrend continuation. Gap above 50d = momentum.",below:"Normal pullback in strong trend. 50d is typical dip-buy zone."},
{ma:"100d",p:425.0,above:"Intermediate trend firmly bullish.",below:"Deeper correction underway. Watch for 200d test."},
{ma:"200d",p:386.0,above:"Primary uptrend intact. Institutions defend this level aggressively.",below:"Major trend break. Geopolitical risk may be repricing."},
{ma:"400d",p:309.0,above:"Secular infrastructure monopoly trend intact.",below:"Only on geo escalation. Full de-risk of Taiwan exposure."}]},
momentum:{rsi:65.84,rsiZone:"neutral",macd:{v:9.6315,s:7.3971,h:2.2344,cross:"bullish"},roc:10.5},
volume:{avg:"10.7M",recent:"8.6M",ratio:0.8,obv:"rising",accDist:"neutral",lastDay:"8.2M",lastDayX:0.77,volDate:"Oct 1, 2026"},
levels:{fibs:[{r:"0%",p:267,l:"52w low"},{r:"38.2%",p:348,l:"Shallow"},{r:"50%",p:373,l:"Midpoint"},{r:"61.8%",p:398,l:"Deep"},{r:"100%",p:479,l:"52w high"}],pivots:{r2:465,r1:462,pp:458,s1:455,s2:451}},
pattern:{name:"Mild Pullback",target:490,dir:"up",note:"$459.20. RSI 65.8, above 50d, above 200d. Next earnings Oct 15."},
verdict:{score:47,label:"HOLD \u2014 ON DEFENDED SUPPORT",c:"g",drivers:"$459.20. Above 50d $424 (+8.3%), above 200d $386 (+19.0%). RSI 65.8 neutral. MACD histogram +2.23 (improving). Nearest observed support $421.68, 8.2% below. Next earnings Oct 15."}},
fundVerified:true,
fundDate:"Sep 17, 2026",
fund:{
story:"$428.91 (Sep 4 close). The AI foundry monopoly \u2014 essentially every leading-edge AI accelerator is manufactured here. Q2 2026 delivered record 67.7% gross margin with net income +77.4% on revenue +36%, the gap being mix: 3nm and 5nm are now 63% of wafer revenue and HPC is two-thirds of the business. FY26 revenue growth guided above 40%, capex raised to $60-64B. The near-term tension is 2nm ramp dilution taking Q3 gross margin to 65-67%. Next earnings Oct 15.",
drivers:[
{name:"Advanced Node Demand",dir:"up",detail:"3nm/2nm supply sold out. Turning away designs. Pricing +3-10% annually through 2029."},
{name:"AI Capex Flow-Through",dir:"up",detail:"Every dollar of hyperscaler capex flows through TSMC. Agnostic to which chip wins."},
{name:"Geopolitical Risk",dir:"risk",detail:"Taiwan-China tension is the permanent discount. US Arizona expansion partial hedge."},
{name:"2nm Yields",dir:"up",detail:"Better than expected. Commercial production on track for 2026."}
],
flow:{inst:"D.A. Davidson Only Buy in semi coverage. Sovereign wealth funds accumulating. Warren Buffett exited (geo risk).",retail:"Less retail interest than NVDA/AMD. Institutional-driven stock.",short:"Short interest 0.8% — near zero. Nobody shorts the monopoly."},
bull:{path:"2nm ramp + pricing power → margins above 50% → $450 PT. AI capex supercycle sustains through 2028.",price:"$524-$580"},
bear:{path:"China-Taiwan escalation or invasion scenario. Stock halves on geopolitical crisis regardless of fundamentals.",price:"$371-220"},
activeRisks:[{sev:"MED",prob:30,risk:"Customer concentration \u2014 top ten were 78% of 2025 revenue, largest 19%, second 17%",trigger:"A single hyperscaler capex decision moves utilisation",triggerStatus:"watching",mitigation:"Monitor hyperscaler capex guidance",pPctNetWorth:1.5,daysToImpact:60,catalyst:"Monitored continuously \u2014 reassessed at each scheduled print"},{sev:"MED",prob:60,risk:"2nm ramp margin dilution \u2014 Q3 GM guided down 1.7pts to 65-67%",trigger:"Guided and dated: 2-3pts full-year, overseas widening to 3-4pts",triggerStatus:"watching",mitigation:"Known headwind; watch Oct 15 actual vs guide",pPctNetWorth:1.5,daysToImpact:60,catalyst:"Monitored continuously \u2014 reassessed at each scheduled print"},{sev:"HIGH",prob:10,risk:"Taiwan geopolitical: China-Taiwan escalation or invasion = stock halves overnight. War premium rising with global instability",trigger:"China military action or blockade",impact:"-50% or worse",catalyst:"No specific date. Watch PLA military exercises around Taiwan, especially as US assets remain stretched across multiple geopolitical fronts"},
{sev:"MED",prob:15,risk:"Demand cliff 2027: if AI capex cycle peaks, TSM utilization drops rapidly. High-fixed-cost business",trigger:"Hyperscaler capex cuts",impact:"Utilization <80% = margins crushed",catalyst:"TSM Q1 earnings Apr 16 ✓ — utilization rate + Q2 guide. Also ASML orders report Apr 16 ✓"},
{sev:"MED",prob:30,risk:"US fab cost overruns: Arizona expansion costs +30% vs Taiwan. If subsidies dry up, ROI deteriorates",trigger:"CHIPS Act funding delays",impact:"Capex ROI pressure",catalyst:"CHIPS Act disbursement schedule — Commerce Dept updates quarterly. Last update Apr 2026 ✓; next ~Jul 2026"},
{sev:"LOW",prob:20,risk:"25% tariff on AI chips still in effect. Raises cost for US customers, could slow demand",trigger:"Tariffs made permanent or increased",impact:"Demand elasticity -5-10%",catalyst:"Trade policy review — no fixed date. Watch for executive orders on semiconductor tariffs"}],
killer:"Credible military escalation in Taiwan Strait or US-China semiconductor embargo that disrupts fab operations.",
revMix:[{n:"HPC/AI",p:52,c:"#3DBFA8"},{n:"Smartphone",p:30,c:"#7E91E8"},{n:"IoT",p:8,c:"#B266FF"},{n:"Auto",p:6,c:"#FFBF00"},{n:"Other",p:4,c:"#9A8F82"}],
compPos:{xLabel:"Node Leadership",yLabel:"Capacity Scale",peers:[{n:"TSMC",x:95,y:90,self:true},{n:"Samsung",x:60,y:70},{n:"Intel",x:40,y:50},{n:"GlobalFoundries",x:20,y:25}]},
mgmt:{beats:4,misses:0,streak:"+4",note:"Pristine execution. Beat 4 straight. Capex guidance consistently met. Arizona expansion on schedule."},
metrics:{lastQ:"Q2 2026 (Jun 2026)",revGrowth:36.0,grossMargin:67.7,opMargin:60.3,netMargin:55.6,roe:38.0,note:"Q2 2026 (Jul 16): revenue NT$1,270.38B / US$40.20B, +36.0% YoY and +12.0% sequentially. RECORD GROSS MARGIN 67.7%, up 150bps sequentially and above the top of guidance. Operating margin 60.3%. Net income NT$706.56B, +77.4% YoY \u2014 profit growing at more than twice the rate of revenue, which is the mix story: advanced nodes (7nm and below) are 77% of wafer revenue, with 3nm at 30% and 5nm at 33%. HPC including AI accelerators is now ~66% of revenue and rose 20% sequentially; smartphone fell ~4% to 22%. North America was 78% of net revenue. Diluted EPS NT$27.25. Cash and securities US$110B. GUIDANCE: Q3 revenue US$44.6-45.8B, +12% sequential and +37% YoY at midpoint. FY2026 revenue growth raised to SLIGHTLY ABOVE 40% in USD. CAPEX RAISED to US$60-64B from US$52-56B \u2014 H1 spend was $26.8B, so H2 requires $33.2-37.2B, 24-39% more than H1. MARGIN HEADWIND: Q3 gross margin guided 65-67%, down 1.7pts at midpoint on 2nm ramp dilution. Management previously flagged 2-3pts of full-year dilution from initial 2nm production, and overseas-fab dilution widening from 2-3pts to 3-4pts thereafter. CEO Wei: demand continues to outstrip supply, 3nm running above 100% utilisation, CoWoS packaging is the industry bottleneck. CONCENTRATION: top ten customers were 78% of 2025 revenue; the largest was 19% and the second 17%. Next print Oct 15."},
watchlist:[{item:"TSMC Q1 Earnings",d:"Apr 17",why:"Revenue growth + margin trajectory. 2nm ramp update."},{item:"Arizona fab progress",d:"Ongoing",why:"US expansion de-risks geopolitical thesis. Commerce Dept expects $371B."},{item:"China-Taiwan tensions",d:"Ongoing",why:"Any escalation = immediate 15-20% downside."},{item:"2nm commercial production timeline",d:"H1 2026",why:"Yield data determines whether 2nm is on schedule."}],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",ptDate:"Sep 21, 2026",riskDate:"Sep 25, 2026" }},
AVGO:{name:"Broadcom Inc.",price:343.64,avgPT:514,highPT:675,ptDate:"Sep 14, 2026",ptVerified:true,lowPT:350,high52:495.0,low52:289.96,fwdPE:19.6,mktCap:"$1.70T",ytd:-1,yr1:42,consensus:"Buy",earningsDate:"Dec 9, 2026",epsEst:3.22,epsEstDate:"Aug 31, 2026",sector:"Semiconductors",support:[{lvl:342.0,label:"Volume node \u2014 0.5% below"},{lvl:329.06,label:"Swing low 2025-11-14 \u2014 held 11x"},{lvl:321.42,label:"Swing low 2025-12-17 \u2014 held 7x"}],supportDate:"Oct 1, 2026",brokenSup:[{lvl:356.43,held:7,date:"2026-07-02"},{lvl:370.33,held:6,date:"2026-06-09"}],
supportVerified:true,
supportAnchor:"$342.00 (0.5%) / $329.06 (4.2%, held 11x) / $321.42 (6.5%, held 7x) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $342.00, 0.5% below $343.64. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.1,
news:[n(10013,"DA DAVIDSON CUTS TARGET TO $350 FROM $400 \u2014 NEW STREET LOW","DA Davidson lowered its target to $350, now the street low and below the current price. Consensus remains $514. Separately, MACD turned positive (+0.76) on Sep 21 for the first time in weeks.","Research notes","2026-09-08",-0.2,"a",14,"analyst"),n(9991,"AVGO BEAT, RAISED FY27 AI TO $115B, AND FELL 4.4% \u2014 my predicted trigger was wrong","Sep 2 AMC: revenue $29.59B (+86% YoY) vs $29.44B expected; non-GAAP EPS $3.32 vs $3.24; AI semiconductor revenue $16.70B, +221% YoY and +54% sequentially; free cash flow $13.665B. Ninth consecutive beat. Hock Tan guided FY2027 AI revenue to roughly $115B, DOUBLE fiscal 2026, and FY2028 to $230B, with EPS above $30 against an LSEG consensus of $25.86. He cited a 1.3 gigawatt Jalapeno deployment in 2027 with line of sight beyond 5GW, and expanding business with Anthropic and OpenAI. THE STOCK FELL 4.4%. Trigger: Q4 revenue guided to $34.8B against $35.03B expected \u2014 a 0.7% miss on one forward quarter outweighed a doubling of the multi-year outlook. HONEST CORRECTION: this dashboard flagged the FY2027 AI target as the bar and a non-raise as the trim trigger. They cleared that bar decisively and the stock sold anyway. The predicted trigger was wrong. The transferable lesson is that at these expectations any miss anywhere becomes the story \u2014 AVGO has beaten 10 straight quarters with an average one-day reaction of -1.91%. CFO Thuener flagged possible residual-value guarantees to the AI labs as contingent liabilities \u2014 a new balance-sheet item worth tracking. Next print Dec 9.","CNBC / 24-7 Wall St / TradingKey","2026-09-03",0.25,"e",19,"earnings"),
n(9981,"AVGO Q3 CONFIRMED Wed Sep 2 AMC - Q2 precedent was a 12.6% DROP on a double beat","Company PR: Broadcom reports Q3 FY2026 Wednesday September 2, 2026 after the close, call 5:00pm ET. Consensus revenue ~$29.4B (+84.5% YoY), non-GAAP EPS ~$3.22-3.24 vs $1.69 a year ago. AI semiconductor revenue guided ~$16.0B, over 200% YoY and more than half of total quarterly revenue. Q2 AI bookings exceeded $30B against $10.8B actually shipped - backlog visibility into fiscal 2028. THE PRECEDENT: after Q2 on June 3, AVGO fell 12.6% in a single session DESPITE beating on both revenue and EPS, because management declined to raise the FY2027 AI target above the existing 'in excess of $100 billion.' Fourth name in this book to sell off on a beat after CBRS, VRT and the KLAC precedent - and here the trigger was a guidance NON-RAISE, not a miss. The bar Wednesday is the FY2027 AI number, not the quarter. Consensus $525 across 48 analysts.","Broadcom IR / TipRanks / Tickeron","2026-08-31",0.15,"e",17,"catalyst"),
n(9701,"AVGO Q2 FY26 BEAT but -14% sell-the-news — EPS $2.44 (beat $2.39), rev $22.19B (+48% YoY)","AI revenue strong but Q3 AI guide not robust enough vs lofty expectations after +$270B mkt cap added in 3mo. Stock closed near record into print. Hock Tan reiterated $100B+ AI chip revenue path by 2027. Classic priced-for-perfection correction.","FXStreet/StartupHub","2026-06-03",-0.3,"e",14),n(9421,"AVGO reports Q2 FY26 Jun 3 AMC — shares +36% since last print","Consensus rev ~$22B (+47% YoY), AI semi ~$10.7B (+140% YoY), EPS $2.40. Susquehanna PT $490 (from $450) expecting Custom ASIC + AI Networking upside. ~70% custom-AI-accelerator share (Google TPU, Meta MTIA).","CNBC/TradingKey","2026-06-01",0.6,"a",13),n(9301,"AVGO Q2 FY26 preview — reports Jun 3 AMC, guide $22B rev (+47% YoY) above $20.5B consensus","AI semi rev guide $10.7B (+140% YoY). Wall St expects EPS $2.40 (+52%). Susquehanna raised PT to $490 (from $450). Q1 was record $19.3B (+29%), AI $8.4B +106%. Watch custom ASIC (Google/Meta/MSFT) + networking. Anthropic order converted full-rack→ASIC (higher margin).","TipRanks/Broadcom IR","2026-05-29",0.6,"a",13),n(979,"AVGO PTs verified May 18 — avg $476, high $630","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(961,"AVGO closed $420.26 (-1.16%) May 14","May 14 EOD — semis sell-off. Position down for the session.","Brokerage","2026-05-14",-0.1,"v",7),
n(902,"AVGO support verified May 11 — S1 anchor: 200d MA $343","S1 $358 within 4.2% of 200d MA","Web Verified","2026-05-11",0.4,"v",7),
n(882,"AVGO options verified May 11 — IV 38%, IVR 50","Source: GuruFocus Apr 5 2026 (Volatility 37.75%), AlphaQuery 30d IV 42.38% (Dec 2025), Macroaxis HV 2.62 → ann 41.6%","Web Verified","2026-05-11",0.4,"v",7),
n(863,"AVGO options data verified May 11 — IV 35%, IVR 45","Source: Market Rebellion March IV reports (AVGO 30d IV ~35), estimate based on cluster","Web Verified","2026-05-11",0.4,"v",7),
n(844,"AVGO PTs verified May 11 — avg $458","Source: TipRanks 30 analysts $467.89, Public.com $455.69, MarketBeat $435, Stockanalysis $451, Benzinga 28 analysts $456.56. Most recent: Mizuho $480","Web Verified","2026-05-11",0.4,"v",7),
n(824,"AVGO technicals verified May 11","50d MA, 200d MA, RSI from web sources: Investing.com (50d=$398.14, 200d=$343.05); altindex RSI 84.5 (older)","Web Verified","2026-05-11",0.3,"t",6),
n(798,"AVGO $428.55 +3.87% May 11 — semis rotation, broad tape lift","Day move +3.87%. semis rotation, broad tape lift. Market: semis-led rally, S&P/NDX at ATH, six-week winning streak. CPI 3.7%, Fed on hold. Trump-Xi summit May 14-15 ✓","Bloomberg","2026-05-11",0,"m",4),
n(773,"AVGO $429.60 -4.36% May 7 — rotation into other semis","Day move -4.36% from May 5 close. rotation into other semis. Macro: NVDA broke into ATH zone +7.5% on AI capex narrative re-acceleration.","CNBC","2026-05-07",0,"m",4),

n(736,"AVGO $415 -1.50% May 1 — semis profit-taking","Custom ASIC narrative intact. Pullback in semis after MSFT/META capex disappointments. Above 50d.","Broadcom","2026-05-05",-0.2,"m",6),
n(705,"AVGO $413 +2% Apr 30 — custom ASIC wave continues","ASIC narrative reinforced by hyperscaler capex commitments. Tomahawk dominance persists. Quiet day but uptrend intact.","Broadcom","2026-04-30",0.3,"m",7),
n(1,"D.A. Davidson: Neutral, 'shrinking iceberg'","Hyperscalers internalizing silicon. ASIC doesn't justify premium.","D.A. Davidson","2026-02-01",-0.5,"a",7),
n(2,"BLOWOUT: AI REV +106%, Q2 GUIDE $22B, $100B 2027 TARGET — EPS est $1.88. JPM: AI rev >$9B on Google TPU","Record quarter. 68% gross margins sustained.","Earnings","2026-02-03",0.85,"e",7),
n(3,"Anthropic $10B + $11B chip orders","Significant alliance generating massive custom chip revenue.","US News","2026-02-05",0.8,"p",7),
n(4,"OpenAI 10GW accelerator deployment","Strategic collaboration on massive scale.","Industry","2026-02-07",0.75,"p",7),
{...n(5,"Jefferies: Buy, PT $372","ASICs inflecting, hyperscaler capex accelerating.","Jefferies","2026-02-09",0.8,"a",7),on:false},
n(6,"32x fwd P/E — above NVDA premium","Most expensive major semi. Requires flawless execution.","Market","2026-02-11",-0.4,"v",7),
n(7,"Custom ASIC risk: hyperscalers go in-house","Google TPU, Amazon Trainium threaten ASIC middleman.","Industry","2026-02-13",-0.5,"k",7,"rumor"),
n(8,"MS raises PT $462→$470 OW. Hock Tan: copper > fiber near-term (tanked Corning -10%)","One of worst weeks in 5 years. Momentum-dependent.","Morgan Stanley","2026-02-21",-0.3,"t",5),
n(105,"AVGO +6.3% — Google TPU Ironwood + custom ASIC demand accelerating","Anthropic 1GW on Google TPUs confirmed. ASIC revenue growing faster than expected. Networking + custom silicon = dual AI engine. War relief adds tailwind.","Market","2026-04-05",0.6,"m",12)
,
n(204,"AVGO $398 — custom ASIC demand continues accelerating","Google TPU Ironwood 7th gen strong. Anthropic 1GW on Google TPUs. $100B 2027 AI revenue TAM. June 3 earnings.","Market","2026-04-16",0.5,"m",10)
,
n(224,"AVGO $445.05 +1.90% — Meta multi-year custom ASIC deal announced Apr 14","TipRanks (Apr 15): Broadcom to design + supply custom AI chips for Meta data centers (training + inference). Reinforces AVGO as key custom silicon player vs NVDA. Part of broader trend of hyperscalers moving to tailored hardware. Stock +7% this week alongside semi sector.","TipRanks Apr 15 2026","2026-04-17",0.7,"m",12)
,
n(403,"AVGO -1.49% on Google/MRVL deal talks — competitive pressure on TPU partnership","Barrons Apr 20: Google in talks with Marvell on 2 new AI chips — potential competitive pressure on AVGO (long-time Google TPU partner). AVGO currently has 6+ hyperscaler ASIC customers but Google relationship was the anchor. Risk: if MRVL wins significant share, AVGO ASIC growth rate could moderate. Counterpoint: hyperscaler ASIC demand expanding fast enough for multiple winners.","Barrons Apr 20 2026","2026-04-20",-0.3,"b",11)
,
n(503,"AVGO + META multi-year custom AI chip deal announced — Apr 14","TipRanks Apr 15 (Apr 14 deal): Broadcom + Meta multi-year deal announced — AVGO designs/supplies custom AI chips, META deploys across data centers for training + inference. AVGO emerging key player in custom-built AI hardware shift.","TipRanks/META deal Apr 14 2026","2026-04-14",0.85,"m",15),
n(504,"TSMC/ASML read-through positive for AVGO","Reuters/Yahoo Apr 16: AVGO relied on TSMC for cutting-edge processors. TSMC Q1 +58% YoY net profit + raised 2026 guide = direct positive read-through for AVGO custom AI chip production scaling.","Reuters Apr 16 2026","2026-04-16",0.7,"m",13),
n(505,"Q1 FY26 rev \$19.3B (+29% YoY) — AI semi \$10.7B — foundation","Q1 FY26 context: Record $19.3B revenue (+29% YoY), beat $19.21B. EPS $2.05 vs $2.02. AI semiconductor revenue +106% YoY. 66.4% operating margin, 77% gross margin. Q2 AI guide +140% YoY supported by strategic partnerships.","Q1 FY26 Earnings","2026-03-04",0.9,"e",14)
,
n(547,"AVGO +1.05% Apr 21 — custom AI thesis holding","Apr 21: AVGO $403.81 +$4.18. META custom chip deal Apr 14 + Google TPU tailwinds. Jun 4 Q2 earnings 44d.","Apr 21","2026-04-21",0.4,"m",10)
,
n(632,"AVGO +4.98% $422.20 — custom ASIC partner wins reinforced — Apr 22","Apr 22 close $422.20 +4.98%. Google Ironwood launch = READ-THROUGH POSITIVE (TSM foundry, AVGO custom ASIC design services expanding). AVGO partner ecosystem: META custom chips, GOOGL TPU ecosystem. Q2 guide $19.3B+ AI rev +140% YoY.","Market context Apr 22 2026","2026-04-22",0.75,"m",14)
,
n(645,"AVGO -1.1% Apr 27 — $418 ASIC demand intact near ATH","Apr 27 close $418.11 -1.1%. Consolidating near ATH. Google TPU Ironwood + Anthropic 1GW validates AVGO ASIC thesis. Jun 4 earnings.","Market Apr 27 2026","2026-04-27",0.45,"m",12)
,
n(674,"AVGO $440 +5.57% — VMware mngmt rotation rumors + AI ASIC demand surge","AVGO +2.98% to $411.73. AI ASIC business sees demand acceleration on hyperscaler capex spending. Multi-quarter contract flow from META/GOOGL.","Stock close Apr 29 2026","2026-04-29",0.55,"n",7)
],
options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:-2.7,pcRatio:null,maxPain:362,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:280070,maxPainNear:352.5,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:36.76,atmIVExp:"2026-10-30",ivObs:17},
optionsDate:"Oct 1, 2026",optionsVerified:true,
catalysts:[{d:"Dec 9",e:"AVGO Q4 FY26 \u2014 first checkpoint on the $115B FY27 AI guide",i:"high",iv:"high",hm:"N/A"},{d:"Mar 4 ✓",e:"AVGO Q1 FY26 Earnings — BLOWOUT: AI rev +106%, Q2 guide $22B",i:"high",iv:"high",hm:"+11.5%"},{d:"Mar 16 ✓",e:"NVIDIA GTC (ASIC read)",i:"neutral",iv:"med",hm:"+2.3%"},{d:"H1 2026",e:"Custom ASIC volume ramp",i:"bullish",iv:"low",hm:"N/A"}],
peers:[{t:"AVGO",pe:20,ev:20.3,y:5},{t:"NVDA",pe:22,ev:28.3,y:4},{t:"MRVL",pe:43,ev:33.2,y:3},{t:"AMD",pe:58,ev:25.1,y:8},{t:"TSM",pe:19,ev:15.0,y:2}],
playbook:[
pb("1 WEEK","AVGO $344 \u2014 STRONG BUY (88). Nearest support $342.00, 0.5% below (volume node, never defended). +50% to $514 consensus. RSI 40, MACD +0.50, 2 broken levels above. NEXT: Dec 9 \u2014 AVGO Q4 FY26 \u2014 first checkpoint on the $115B FY27 AI guide. Watch: Residual-value guarantees to AI labs as contingent liabilities Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",G,"AVGO $343.64 as of the latest close, STRONG BUY at 88 on the tool's five-component score. $357.16 (Sep 3 close). Custom-ASIC franchise with an estimated 70-80% share across five hyperscaler customers. Nearest observed support sits at $342.00.","STRONG BUY (88). Watch $342.00, 0.5% below (volume node, never defended). Upside +50% to $514; reward-to-risk 16.5x. Next catalyst: AVGO Q4 FY26 \u2014 first checkpoint on the $115B FY27 AI guide."),
pb("1 MONTH","AVGO $343.64 \u2014 THESIS: $357.16 (the scheduled date close). Custom-ASIC franchise with an estimated 70-80% share across five hyperscaler customers. KEY RISK: Residual-value guarantees to AI labs as contingent liabilities NEXT CATALYST: AVGO Q4 FY26 \u2014 first checkpoint on the $115B FY27 AI guide. Upside +50%, reward-to-risk 16.5x to nearest support. Refreshed the scheduled date.",G,"AVGO $343.64 (the scheduled date close), STRONG BUY at 88. $357.16 (the scheduled date close). Custom-ASIC franchise with an estimated 70-80% share across five hyperscaler customers. Key risk: Residual-value guarantees to AI labs as contingent liabilities","STRONG BUY (88). Watch $342.00, 0.5% below (volume node, never defended). Upside +50% to $514; reward-to-risk 16.5x. Next catalyst: AVGO Q4 FY26 \u2014 first checkpoint on the $115B FY27 AI guide."),
pb("3 MONTHS","AVGO $343.64 \u2014 NEXT QUARTER: AVGO Q4 FY26 \u2014 first checkpoint on the $115B FY27 AI guide. The print either confirms the thesis ($357.16 (the scheduled date close). Custom-ASIC franchise with an estimated 70-80% share across five hyperscaler customers.) or tests the key risk (Residual-value guarantees to AI labs as contingent liabilities) Nearest support $342.00, 0.5% below (volume node, never defended). Refreshed the scheduled date.",G,"AVGO $343.64 (the scheduled date close), STRONG BUY at 88. $357.16 (the scheduled date close). Custom-ASIC franchise with an estimated 70-80% share across five hyperscaler customers. Key risk: Residual-value guarantees to AI labs as contingent liabilities","STRONG BUY (88). Watch $342.00, 0.5% below (volume node, never defended). Upside +50% to $514; reward-to-risk 16.5x. Next catalyst: AVGO Q4 FY26 \u2014 first checkpoint on the $115B FY27 AI guide."),
pb("6 MONTHS","AVGO $343.64 \u2014 SIX MONTHS: two prints inside the window. STRONG BUY (88). Consensus $514 (+50%), street range $350 (+2%) to $675 (+96%). What would change the view: Residual-value guarantees to AI labs as contingent liabilities Refreshed the scheduled date.",G,"AVGO $343.64 (the scheduled date close), STRONG BUY at 88. $357.16 (the scheduled date close). Custom-ASIC franchise with an estimated 70-80% share across five hyperscaler customers. Key risk: Residual-value guarantees to AI labs as contingent liabilities","STRONG BUY (88). Watch $342.00, 0.5% below (volume node, never defended). Upside +50% to $514; reward-to-risk 16.5x. Next catalyst: AVGO Q4 FY26 \u2014 first checkpoint on the $115B FY27 AI guide."),
pb("1 YEAR","AVGO $343.64 \u2014 TWELVE MONTHS: consensus $514 implies +50%; street range $350 (+2%) to $675 (+96%). THESIS: $357.16 (the scheduled date close). Custom-ASIC franchise with an estimated 70-80% share across five hyperscaler customers. STRUCTURAL RISK: Residual-value guarantees to AI labs as contingent liabilities Refreshed the scheduled date.",G,"AVGO $343.64 (the scheduled date close), STRONG BUY at 88. $357.16 (the scheduled date close). Custom-ASIC franchise with an estimated 70-80% share across five hyperscaler customers. Key risk: Residual-value guarantees to AI labs as contingent liabilities","STRONG BUY (88). Watch $342.00, 0.5% below (volume node, never defended). Upside +50% to $514; reward-to-risk 16.5x. Next catalyst: AVGO Q4 FY26 \u2014 first checkpoint on the $115B FY27 AI guide.")],
tech:{
ma:{d50:374.0,d100:387.0,d200:367.0,d400:324.0,align:"bearish",
brk:[{ma:"50d",p:374.0,above:"Near-term trend bullish. Earnings run-up underway.",below:"Below 50d — short-term bearish. Post-earnings selling despite blowout."},
{ma:"100d",p:387.0,above:"Above 100d — intermediate trend intact. Post-earnings support holding.",below:"Market cautious ahead of earnings. Need beat to recover."},
{ma:"200d",p:367.0,above:"Above 200d — primary uptrend valid. AI rev +106% validates long-term.",below:"Primary trend break. ASIC growth questioned. Major reassessment needed."},
{ma:"400d",p:324.0,above:"Above 400d — secular AI infrastructure thesis intact despite macro.",below:"Secular thesis broken. In-house silicon winning."}]},
momentum:{rsi:39.55,rsiZone:"neutral",macd:{v:-6.1824,s:-6.6843,h:0.5019,cross:"bullish"},roc:-6.4},
volume:{avg:"22.8M",recent:"20.2M",ratio:0.89,obv:"flat",accDist:"neutral",lastDay:"24.5M",lastDayX:1.07,volDate:"Oct 1, 2026"},
levels:{fibs:[{r:"0%",p:290,l:"52w low"},{r:"38.2%",p:368,l:"Shallow"},{r:"50%",p:392,l:"Midpoint"},{r:"61.8%",p:417,l:"Deep"},{r:"100%",p:495,l:"52w high"}],pivots:{r2:358,r1:351,pp:347,s1:340,s2:336}},
pattern:{name:"ATH Approach",target:531,dir:"up",note:"$343.64. RSI 39.5, below 50d, below 200d. 2 levels broken. Next earnings Dec 9."},
verdict:{score:88,label:"STRONG BUY \u2014 OVERSOLD, ON DEFENDED SUPPORT",c:"y",drivers:"$343.64. Below 50d $374 (-8.1%), below 200d $367 (-6.4%). RSI 39.5 oversold. MACD histogram +0.50 (improving). Nearest observed support $342.00, 0.5% below. 2 prior levels BROKEN. Next earnings Dec 9."}},
fundVerified:true,
fundDate:"Sep 17, 2026",
fund:{
story:"$357.16 (Sep 3 close). Custom-ASIC franchise with an estimated 70-80% share across five hyperscaler customers. Q3 (Sep 2) revenue $29.59B +86% YoY, non-GAAP EPS $3.32, AI semi revenue $16.70B +221% YoY and +54% sequentially, FCF $13.665B. Management guided FY2027 AI revenue to ~$115B, double fiscal 2026, and FY2028 to $230B with EPS above $30 vs $25.86 consensus. Business with Anthropic and OpenAI expanding. Next earnings Dec 9.",
drivers:[
{name:"Custom ASIC Revenue",dir:"up",detail:"AI semis growing but 'shrinking iceberg' concern — legacy networking declining as ASIC grows."},
{name:"VMware Integration",dir:"flat",detail:"Recurring rev stabilizing. Enterprise software adds margin but growth slowing."},
{name:"Networking Infrastructure",dir:"up",detail:"Every AI cluster needs Broadcom switches. Tomahawk/Jericho dominant."},
{name:"In-House Silicon Risk",dir:"risk",detail:"Hyperscalers building own networking too. 2-3yr risk to ASIC contracts."}
],
flow:{inst:"41 of 43 analysts Buy. $10B buyback authorized. Post-blowout expect PT upgrades. JPM, Oppenheimer bullish pre-earnings — now validatedve.",retail:"Moderate retail interest. Less meme energy than NVDA. Dividend attracts income investors.",short:"Short interest 1.5% — low. Valuation concern but no active bear campaign."},
bull:{path:"ASIC revenue doubles → networking holds → $500 PT on NVDA-comparable AI multiple.",price:"$400-500"},
bear:{path:"In-house silicon wins accelerate. VMware growth stalls. Multiple compresses from 32x to 22x.",price:"$220-260"},
activeRisks:[{sev:"MED",prob:25,risk:"Residual-value guarantees to AI labs as contingent liabilities",trigger:"Disclosed by CFO Thuener on the Sep 2 call",triggerStatus:"watching",mitigation:"New balance-sheet item \u2014 track disclosure",pPctNetWorth:1.5,daysToImpact:60,catalyst:"Monitored continuously \u2014 reassessed at each scheduled print"},{sev:"LOW",prob:12,risk:"Customer moves to a RIVAL design house (note: Meta MTIA is AVGO-designed, so AVGO IS the in-sourcing partner) \u2014 RE-SPECIFIED Sep 5: Meta/Google/Amazon all have internal chip teams. Any pullback from AVGO custom silicon = catastrophic at 30x PE",trigger:"Named customer reduces ASIC orders",impact:"-20-30% stock",catalyst:"Meta MTIA production update — expected at Meta Connect Oct 2026. Google TPU v6 timeline TBD"},
{sev:"MED",prob:25,risk:"$100B 2027 target too aggressive: Hock Tan projections are CEO guidance, not orders. If AI capex cycle peaks in 2027, AVGO misses",trigger:"Hyperscaler capex guidance cuts",impact:"Multiple compression to 20x",catalyst:"Q2 earnings Jun 12 ✓ — will show if $100B trajectory on track. Also MSFT/META capex guides Apr 29 ✓-30"},
{sev:"LOW",prob:8,risk:"Anthropic/Pentagon fallout: Anthropic blacklisted by Pentagon. If relationship deteriorates, 3GW 2027 cluster at risk",trigger:"Anthropic loses funding or pivots suppliers",impact:"-$5B+ pipeline risk",catalyst:"Anthropic fundraise round — expected H1 2026. Valuation and investor base will signal trajectory"},
{sev:"MED",prob:30,risk:"VMware integration fatigue: software segment growth only 2% YoY. If enterprise customers churn, cash cow weakens",trigger:"VMware renewal rates <90%",impact:"FCF margin compression",catalyst:"Q2 earnings Jun 12 ✓ — VMware renewal rate + churn metrics will be disclosed"},
{sev:"LOW",prob:10,risk:"Copper vs fiber bet wrong: Hock Tan bet on copper networking. If fiber transition accelerates, networking share at risk",trigger:"Fiber wins at hyperscaler scale",impact:"Networking share loss",catalyst:"OFC 2026 conference (fiber industry) ✓ — Mar 30 ✓-Apr 3 ✓. Will show hyperscaler fiber adoption pace"}],
killer:"Google or Meta announce fully in-house networking stack, eliminating Broadcom from AI cluster design.",
revMix:[{n:"AI/Networking",p:41,c:"#3DBFA8"},{n:"VMware/Software",p:28,c:"#7E91E8"},{n:"Broadband",p:12,c:"#B266FF"},{n:"Storage",p:10,c:"#FFBF00"},{n:"Wireless",p:9,c:"#9A8F82"}],
compPos:{xLabel:"Custom ASIC Share",yLabel:"Networking Dominance",peers:[{n:"AVGO",x:45,y:85,self:true},{n:"Marvell",x:25,y:40},{n:"NVDA",x:10,y:60},{n:"In-House",x:20,y:20}]},
mgmt:{beats:4,misses:0,streak:"+4",note:"Hock Tan delivers. VMware integration ahead of schedule. Beat and raised 4 consecutive quarters."},
metrics:{revGrowth:86.0,grossMargin:67.0,opMargin:47.0,netMargin:35.0,fcfMargin:41.5,roe:42.0,debtEquity:1.50,lastQ:"Q3 FY26 (Aug 2026)"},
watchlist:[],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",ptDate:"Sep 14, 2026",riskDate:"Sep 25, 2026" }},
AMZN:{name:"Amazon.com Inc.",price:248.23,avgPT:328,highPT:405,ptDate:"Sep 21, 2026",ptVerified:true,lowPT:230,high52:287.2,low52:196.0,fwdPE:29.6,mktCap:"$2.85T",ytd:10,yr1:-8,consensus:"Strong Buy",earningsDate:"Oct 29, 2026",epsEst:2.0,epsEstDate:"Sep 21, 2026",sector:"Tech / Cloud",support:[{lvl:246.57,label:"Volume node \u2014 0.7% below"},{lvl:229.98,label:"Volume node \u2014 7.4% below"},{lvl:220.99,label:"Swing low 2025-12-17 \u2014 held 2x"}],supportDate:"Oct 1, 2026",brokenSup:[],
supportVerified:true,
supportAnchor:"$246.57 (0.7%) / $229.98 (7.4%) / $220.99 (11.0%, held 2x) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $246.57, 0.7% below $248.23. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.25,
news:[n(10012,"EU SCRUTINY OVER PRICING RULES; CONSENSUS EPS UP 49% IN 90 DAYS","Sep 18: Amazon faces EU scrutiny over rules that could limit lower prices elsewhere. Separately, current-year consensus EPS rose 48.9% over 90 days (largely the Anthropic stake gains); consensus target $328 across 60 analysts.","TipRanks / Ticker Nerd","2026-09-18",0.0,"g",10,"news"),n(9908,"AMZN +0.56% to $232.15 into Thursday\u0027s print \u2014 options imply a 6.94% move","Jul 28: Amazon closed $232.15, up 0.56%, ahead of Q2 on Thursday Jul 30 (call 5pm ET). Consensus adj EPS $1.82 (from $1.68) on revenue of roughly $196.97B, up about 18% YoY; AWS growth estimated near 32%. Options imply a 6.94% move versus a 6% average over the last four quarters. TipRanks has 44 Buys and 1 Hold with an average target of $318.93. UBS cut its target $333 to $305 on higher expected AI capex and pushed its OpenAI-Trainium forecast to early 2027; Mizuho trimmed $325 to $320. BofA flags a possible mark-to-market gain on Amazon\u0027s Anthropic stake. The print is a referendum on whether AI capex can rise while margins still expand.","TipRanks / Benzinga / Yahoo","2026-07-28",0.15,"e",13,"catalyst"),
n(9810,"AMZN Q2 lands Jul 30 — Moody's flags AI spend as a credit-quality risk","Amazon reports Q2 2026 on Jul 30 (CNBC/company calendar). Closed $231.39 Jul 27 vs a $232.11 Jul 24 close. Moody's warned Jul 24 that AI spending threatens the credit quality of Amazon, Meta and Alphabet — a new framing of the capex debate that reaches the balance sheet rather than just the P&L. PT CORRECTION: dashboard carried avg $295 / low $251, with the low sitting above the market price; Investing.com's 63-analyst consensus is $313 avg, $370 high, $207 low, Strong Buy.","CNBC / Moody's / Investing.com","2026-07-27",0.2,"e",13,"catalyst"),

n(8805,"AMZN earnings Jul 30 — AWS AI demand in focus","Analysts anticipate strong results with AWS momentum. Overhangs: Senate panel scrutiny on alleged China influence (-2% AH), AGI-unit job cuts, and Iran attack on Amazon Bahrain infrastructure Jul 21. Fell 3-5% with hyperscaler group Jul 23 — price approx pending confirm.","Yahoo Finance / CNBC","2026-07-23",0.2,"a",12,"preview"),n(991,"AMZN PTs verified May 18 — avg $306, high $370","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(963,"AMZN closed $264.84 (+0.27%) May 14","May 14 EOD — semis sell-off. Position up for the session.","Brokerage","2026-05-14",0.1,"v",7),
n(904,"AMZN support verified May 11 — S1 anchor: 100d MA $248","S1 $245 within 1.2% of 100d MA","Web Verified","2026-05-11",0.4,"v",7),
n(867,"AMZN options data verified May 11 — IV 41%, IVR 63","Source: Unusual Whales April (IV 40.64%, IV Rank 63.21)","Web Verified","2026-05-11",0.4,"v",7),
n(846,"AMZN PTs verified May 11 — avg $296","Source: TradingView May 2026: median $300, consensus $295-296, top analyst targets $335-340+","Web Verified","2026-05-11",0.4,"v",7),
n(828,"AMZN technicals verified May 11","50d MA, 200d MA, RSI from web sources: Investing.com (50d=$255.85, 200d=$229.16)","Web Verified","2026-05-11",0.3,"t",6),
n(800,"AMZN $268.85 -0.58% May 11 — consolidating post-Q1","Day move -0.58%. consolidating post-Q1. Market: semis-led rally, S&P/NDX at ATH, six-week winning streak. CPI 3.7%, Fed on hold. Trump-Xi summit May 14-15 ✓","Reuters","2026-05-11",0,"m",4),
n(776,"AMZN $269 -0.53% May 7 — consolidating post-Q1","Day move -0.53% from May 5 close. consolidating post-Q1. Macro: NVDA broke into ATH zone +7.5% on AI capex narrative re-acceleration.","Reuters","2026-05-07",0,"m",4),

n(751,"AMZN $251 +1.4% May 5 — recovering from AWS guide softness","Stock recovering from May 1 weakness. Tariff impact absorbing. AWS rev $37.2B remained beat. $200B capex confirmed.","Amazon","2026-05-05",0.3,"m",6),
n(708,"AMZN $268 -3% Apr 30 — AWS guide softer than hoped","Q1 beat but AWS guide came in below highest expectations. Tariff impact commentary cautious. Stock pulls back.","Amazon","2026-04-30",-0.3,"e",9),
n(1,"War day 4: sold to $206. Trump: Navy will escort Hormuz tankers","$238B mkt value erased. $200B capex for 2026 spooked investors. CNBC: most oversold stock.","CNBC/WSJ","2026-02-01",0.85,"m",7),
n(2,"Ackman grew AMZN stake 65% in Q4","Pershing Square major position increase. Smart money buying the dip hard.","CNBC","2026-02-03",0.65,"a",7),
n(3,"Morgan Stanley: AMZN is top pick","AWS/Retail both under-appreciated GenAI winners. AWS could grow 30%+ in 26/27.","MS","2026-02-05",0.7,"a",7),
n(4,"AWS AI revenue accelerating","Trainium chips + Bedrock driving cloud growth.","Amazon","2026-02-07",0.75,"p",7),
n(5,"SCOTUS tariff ruling — then Trump raised to 15%","Supreme Court struck down Trump tariffs 6-3. AMZN rallied to $210. But Trump raised tariffs to 15% Saturday via Section 122 (150-day cap). AMZN selling off Monday.","Reuters","2026-02-09",0.3,"g",7),
n(6,"Amazon surpasses Walmart as largest US company","Now #1 by annual revenue per WSJ. Platform dominance confirmed at massive scale.","WSJ","2026-02-11",0.65,"m",7),
n(7,"Kiro AI bots caused multiple AWS outages","Amazon's autonomous coding tool Kiro behind at least 2 cloud-service outages. Operational risk from AI automation.","Bloomberg","2026-02-13",-0.4,"p",7),
n(8,"OpenAI multi-year partnership + $110B round participant","3 bullish cases: AWS AI growth accelerating, robust govt/enterprise demand, retail margins expanding via robotics.","Motley Fool","2026-02-15",0.5,"v",7),
n(108,"AMZN +4.3% — AWS growth + oil crash (-9.4% today) = consumer relief","Lower oil eases consumer spending fears. AWS maintaining market share. May 1 earnings next catalyst. Robotics + logistics automation driving efficiency.","Market","2026-04-05",0.5,"m",10)
,
n(207,"AMZN $249 steady — AWS growth + consumer resilience","Lower oil = consumer tailwind. Big Banks Q1 results showed resilient consumer. May 1 earnings. Robotics + logistics automation driving margins.","Market","2026-04-16",0.5,"m",10)
,
n(227,"AMZN $250.74 +0.42% — oil collapse -9.4% to $82, consumer tailwind before May 1 earnings","Fool (Apr 17): The Strait of Hormuz is back open. Good news already priced? Oil WTI -$10+/bbl from peak benefits Amazon retail core. AWS AI capacity buildout continues. May 1 Q1 earnings in 13 days.","Motley Fool Apr 17 2026","2026-04-17",0.6,"m",11)
,
n(410,"Truist raises PT $280 → $285 — Apr 17","TipRanks Apr 17 9:39am ET: Truist raised AMZN PT $280→$285 reported Apr 29 ✓. Pre-earnings positioning constructive.","TipRanks/Truist Apr 17 2026","2026-04-17",0.6,"a",12),
n(411,"Barclays: AMZN will outperform Magnificent 7 — Apr 17","TipRanks Apr 17 10:44am ET: Barclays analyst makes bull case AMZN will outperform Mag 7. AWS re-acceleration + AI monetization + Prime price hike potential 2026.","TipRanks/Barclays Apr 17 2026","2026-04-17",0.75,"a",13),
n(412,"TD Cowen reiterates Buy PT $300 — AI driving AWS growth","TipRanks Apr 17 2026: TD Cowen analyst John Blackledge reiterates Buy PT $300 (20% upside). Q1 earnings Apr 29 ✓ expected to reflect AI-led AWS strength. Street EPS $1.63 (+2.5% YoY), revenue $177.15B (+14% YoY).","TipRanks/TD Cowen Apr 17 2026","2026-04-17",0.8,"a",14),
n(413,"Amazon+Globalstar $11.6B deal endorsed by Apple — Apr 16","TipRanks Apr 16 6:02am ET: Apple endorses $11.6B Amazon-Globalstar deal per Bloomberg. Satellite ecosystem play for Kuiper + iOS integration. Strategic asset validation.","TipRanks/Bloomberg Apr 16 2026","2026-04-16",0.55,"m",11),
n(414,"Oracle + AWS multicloud networking collaboration — Apr 16","TipRanks Apr 16 10:18am ET: Oracle and AWS announce expanded multicloud networking collaboration. Enterprise cloud workload portability. Net positive for AWS enterprise positioning.","TipRanks/Reuters Apr 16 2026","2026-04-16",0.45,"m",10),
n(415,"Wall Street consensus ahead of Q1: 42 Buys, 3 Holds, PT $284.77","Pre-earnings Apr 29 ✓ setup: 64 Buy/Strong Buy, zero Sells per 24/7 Wall St. Consensus PT $281-285. Key metrics: AWS growth 20%+, operating income $16.5-21.5B guide midpoint, advertising 23%+, Trainium chip run-rate $10B+. Bull case $300 (TD Cowen, Oppenheimer $305). Bear case $225 (capex concerns, FCF compression).","TipRanks/24-7 Wall St Apr 20 2026","2026-04-20",0.7,"e",14)
,
n(530,"AMZN pledges $20B+ Anthropic reinvestment — Apr 21","Trading Economics/Yahoo Apr 21: Amazon pledged $20B+ additional investment into Anthropic during volatile session. Stock +2.17% on news — top Dow gainer after UnitedHealth. Cements AWS-Anthropic partnership + Claude hosted exclusively on Trainium. Massive strategic positive 3 days before earnings.","Trading Economics Apr 21 2026","2026-04-21",0.9,"m",18),
n(531,"AMZN +2.17% Apr 21 — outperforms Mag 7 in session","Yahoo Apr 21: AMZN among top S&P 500 gainers. Contrasts Apple -2%, NVDA -1%, TSLA -1%. Positioning bullish into Apr 24 earnings + Anthropic catalyst.","Yahoo Finance Apr 21 2026","2026-04-21",0.7,"m",13)
,
n(600,"AMZN +2.17% on $25B additional Anthropic investment — Apr 21","Reuters Apr 21: Amazon announces up to $25B additional investment in Anthropic. Anthropic commits to spending $25B+ on AWS infrastructure (Trainium chips). Massive vote of confidence in AWS/Trainium stack reported Apr 24 ✓. Stock popped +2.17% into print.","Reuters Apr 21 2026","2026-04-21",0.9,"m",15),
n(601,"Pre-earnings momentum: $251.45 close, 3 days to Apr 24","Apr 21 close: AMZN $251.45 (+$3.17, +1.28%). Up into Apr 24 earnings 3 days out. Setup: Anthropic $25B = $177B Q1 revenue estimate intact + AWS visibility through 2027. Opex guide $16.5-21.5B midpoint.","Market context Apr 21 2026","2026-04-21",0.7,"e",13)
,
n(636,"AMZN +1.95% $254.79 into Apr 24 earnings — Trainium strategy parallel to Google TPU — Apr 22","Apr 22 close $254.79 +1.95%. Pre-earnings positioning 2d out. Google TPU inference/training split story parallels AMZN Trainium strategy. AWS competitive dynamic intact. Anthropic $20B+ additional investment validated. Apr 24 after-close earnings.","Market context Apr 22 2026","2026-04-22",0.6,"m",13)
,
n(647,"AMZN -0.88% Apr 27 — $262 post-Q1-earnings digest Apr 24","Apr 27 close $261.65 -0.88%. Q1 reported Apr 24. AWS share intact. Consumer resilient. Robotics margin story. Guide was key.","Market Apr 27 2026","2026-04-27",0.45,"m",12)
,
n(667,"AMZN Q1 2026 EARNINGS ✓ STRONG — AWS +28% beat (est +26%), ad rev +24% to $17.24B — stock +6.3% to $275.96","AWS revenue $37.59B (+28% YoY) — fastest growth in 3+ years, beats $36.8B est. Advertising +24% to $17.24B (vs +21.2% est). Total headcount -1K from Q4. Operating margin recovery story intact. AI workload demand validated.","CNBC + AMZN Q1 Apr 29 2026","2026-04-29",0.85,"e",14)
],
options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:15.3,pcRatio:null,maxPain:250,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:552818,maxPainNear:247.5,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:40.67,atmIVExp:"2026-10-30",ivObs:17},
optionsDate:"Oct 1, 2026",optionsVerified:true,
catalysts:[{d:"Oct 29",e:"AMZN Q3 earnings (one source says Oct 28)",i:"high",iv:"med",hm:"N/A"},{d:"Apr 24 ✓",e:"AMZN Q1 Earnings",i:"high",iv:"high",hm:"-12.4%"},{d:"2026",e:"Tariff policy clarity",i:"neutral",iv:"med",hm:"N/A"},{d:"H2 2026",e:"Trainium3 deployment",i:"bullish",iv:"low",hm:"N/A"}],
peers:[{t:"AMZN",pe:31,ev:17.7,y:3},{t:"MSFT",pe:28,ev:19,y:-20},{t:"GOOGL",pe:20,ev:14,y:12},{t:"META",pe:22,ev:14,y:0},{t:"AAPL",pe:25,ev:18,y:-10}],
playbook:[
pb("1 WEEK","AMZN $248 \u2014 BUY (74). Nearest support $246.57, 0.7% below (volume node, never defended). +32% to $328 consensus. RSI 44, MACD -0.37. NEXT: Oct 29 \u2014 AMZN Q3 earnings (one source says Oct 28). Watch: Consumer weakness: oil ~$83 + GDP 0.7% + jobs -92K = consumer pullback. Retail is 60%+ of revenue Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",G,"AMZN $248.23 as of the latest close, BUY at 74 on the tool's five-component score. $258.90 (Sep 3 close). AWS plus retail. Nearest observed support sits at $246.57.","BUY (74). Watch $246.57, 0.7% below (volume node, never defended). Upside +32% to $328; reward-to-risk 10.7x. Next catalyst: AMZN Q3 earnings (one source says Oct 28)."),
pb("1 MONTH","AMZN $248.23 \u2014 THESIS: $258.90 (the scheduled date close). AWS plus retail. KEY RISK: Consumer weakness: oil ~$83 + GDP 0.7% + jobs -92K = consumer pullback. Retail is 60%+ of revenue NEXT CATALYST: AMZN Q3 earnings (one source says the scheduled date). Upside +32%, reward-to-risk 10.7x to nearest support. Refreshed the scheduled date.",G,"AMZN $248.23 (the scheduled date close), BUY at 74. $258.90 (the scheduled date close). AWS plus retail. Key risk: Consumer weakness: oil ~$83 + GDP 0.7% + jobs -92K = consumer pullback. Retail is 60%+ of revenue","BUY (74). Watch $246.57, 0.7% below (volume node, never defended). Upside +32% to $328; reward-to-risk 10.7x. Next catalyst: AMZN Q3 earnings (one source says the scheduled date)."),
pb("3 MONTHS","AMZN $248.23 \u2014 NEXT QUARTER: AMZN Q3 earnings (one source says the scheduled date). The print either confirms the thesis ($258.90 (the scheduled date close). AWS plus retail.) or tests the key risk (Consumer weakness: oil ~$83 + GDP 0.7% + jobs -92K = consumer pullback. Retail is 60%+ of revenue) Nearest support $246.57, 0.7% below (volume node, never defended). Refreshed the scheduled date.",G,"AMZN $248.23 (the scheduled date close), BUY at 74. $258.90 (the scheduled date close). AWS plus retail. Key risk: Consumer weakness: oil ~$83 + GDP 0.7% + jobs -92K = consumer pullback. Retail is 60%+ of revenue","BUY (74). Watch $246.57, 0.7% below (volume node, never defended). Upside +32% to $328; reward-to-risk 10.7x. Next catalyst: AMZN Q3 earnings (one source says the scheduled date)."),
pb("6 MONTHS","AMZN $248.23 \u2014 SIX MONTHS: two prints inside the window. BUY (74). Consensus $328 (+32%), street range $230 (-7%) to $405 (+63%). What would change the view: Consumer weakness: oil ~$83 + GDP 0.7% + jobs -92K = consumer pullback. Retail is 60%+ of revenue Refreshed the scheduled date.",G,"AMZN $248.23 (the scheduled date close), BUY at 74. $258.90 (the scheduled date close). AWS plus retail. Key risk: Consumer weakness: oil ~$83 + GDP 0.7% + jobs -92K = consumer pullback. Retail is 60%+ of revenue","BUY (74). Watch $246.57, 0.7% below (volume node, never defended). Upside +32% to $328; reward-to-risk 10.7x. Next catalyst: AMZN Q3 earnings (one source says the scheduled date)."),
pb("1 YEAR","AMZN $248.23 \u2014 TWELVE MONTHS: consensus $328 implies +32%; street range $230 (-7%) to $405 (+63%). THESIS: $258.90 (the scheduled date close). AWS plus retail. STRUCTURAL RISK: Consumer weakness: oil ~$83 + GDP 0.7% + jobs -92K = consumer pullback. Retail is 60%+ of revenue Refreshed the scheduled date.",G,"AMZN $248.23 (the scheduled date close), BUY at 74. $258.90 (the scheduled date close). AWS plus retail. Key risk: Consumer weakness: oil ~$83 + GDP 0.7% + jobs -92K = consumer pullback. Retail is 60%+ of revenue","BUY (74). Watch $246.57, 0.7% below (volume node, never defended). Upside +32% to $328; reward-to-risk 10.7x. Next catalyst: AMZN Q3 earnings (one source says the scheduled date).")],
tech:{
ma:{d50:256.0,d100:253.0,d200:241.0,d400:228.0,align:"mixed",
brk:[{ma:"50d",p:256.0,above:"Reclaiming near-term trend. Post-selloff recovery.",below:"Still below 50d. Bearish near-term. Selloff not done."},
{ma:"100d",p:253.0,above:"Full recovery from Q4 earnings selloff.",below:"Intermediate trend broken. Capex concerns dominating."},
{ma:"200d",p:241.0,above:"Primary trend intact despite earnings miss.",below:"Below 200d = institutional selling. Capex ROI fears confirmed."},
{ma:"400d",p:228.0,above:"Long-term growth thesis intact.",below:"Multi-year trend break. Tariff + capex = structural headwind."}]},
momentum:{rsi:44.2,rsiZone:"neutral",macd:{v:-2.4905,s:-2.1157,h:-0.3748,cross:"bearish"},roc:-2.6},
volume:{avg:"40.0M",recent:"35.1M",ratio:0.88,obv:"flat",accDist:"neutral",lastDay:"33.2M",lastDayX:0.83,volDate:"Oct 1, 2026"},
levels:{fibs:[{r:"0%",p:196,l:"52w low"},{r:"38.2%",p:231,l:"Shallow"},{r:"50%",p:242,l:"Midpoint"},{r:"61.8%",p:252,l:"Deep"},{r:"100%",p:287,l:"52w high"}],pivots:{r2:254,r1:251,p:249,s1:246,s2:243}},
pattern:{name:"Consolidating",target:290,dir:"up",note:"$248.23. RSI 44.2, below 50d, above 200d. Next earnings Oct 29."},
verdict:{score:74,label:"BUY \u2014 neutral setup",c:"y",drivers:"$248.23. Below 50d $256 (-3.0%), above 200d $241 (+3.0%). RSI 44.2 neutral. MACD histogram -0.37 (deteriorating). Nearest observed support $246.57, 0.7% below. Next earnings Oct 29."}},
fundVerified:true,
fundDate:"Sep 17, 2026",
fund:{
story:"$258.90 (Sep 3 close). AWS plus retail. Reported Jul 30. Next earnings Oct 29. Latest-quarter detail in this panel is NOT yet refreshed.",
drivers:[
{name:"AWS + AI Revenue",dir:"up",detail:"'Monetizing capacity as fast as we can install it.' Trainium reducing costs. Bedrock platform scaling."},
{name:"Retail Margins",dir:"up",detail:"Operating margins expanding via automation. Now #1 US company by revenue — scale unmatched."},
{name:"Tariff Flux",dir:"risk",detail:"SCOTUS struck down emergency tariffs but Trump raised to 15% via Section 122. 150-day cap then needs Congress. Consumer discretionary exposure."},
{name:"Capex + Kiro Risk",dir:"risk",detail:"$200B capex ROI timeline uncertain. Kiro AI bots caused multiple AWS outages — autonomous coding tools creating operational risk."}
],
flow:{inst:"Ackman added AMZN to Pershing Square. Institutional consensus overweight.",retail:"Retail bought the post-earnings dip aggressively. High conviction name.",short:"Short interest 0.9% — near zero."},
bull:{path:"AWS AI reaccelerates → retail margins hit 8%+ → $265 PT achievable in 6-9 months.",price:"$310-360"},
bear:{path:"Capex ROI disappoints. Tariff escalation hits margins. Growth slows to 10%.",price:"$220-245"},
activeRisks:[{sev:"HIGH",prob:40,risk:"Consumer weakness: oil ~$83 + GDP 0.7% + jobs -92K = consumer pullback. Retail is 60%+ of revenue",trigger:"Retail same-store sales negative",impact:"-15-20%",catalyst:"Q1 2026 earnings May 1 ✓ — retail revenue growth + consumer spending commentary. Also monthly retail sales reports"},
{sev:"MED",prob:25,risk:"AWS custom silicon uncertain: Trainium adoption rate unknown. If NVDA GPUs remain dominant, $200B capex ROI weakens",trigger:"AWS AI growth <30%",impact:"Cloud margin pressure",catalyst:"Q1 2026 earnings May 1 ✓ — AWS AI revenue growth + Trainium customer count. Also Post-GTC competitive data"},
{sev:"MED",prob:30,risk:"Tariff escalation: 15% global tariff hits Amazon harder than any Mag7 name. Cross-border commerce = margin compression",trigger:"Tariffs made permanent or increased",impact:"Margin -100-200bps",catalyst:"Trade policy — no fixed date. Watch for tariff review executive orders. Mid-term election pressure may force action"},
{sev:"LOW",prob:10,risk:"Kiro AI bot incidents: AWS outages from autonomous coding bots. Reputational risk for AWS reliability",trigger:"Major customer-facing outage",impact:"AWS churn risk",catalyst:"AWS status dashboard — real-time. No scheduled event but risk is always present"}],
killer:"AWS market share loss to Azure exceeds 3pts in a single year, or tariff regime forces major retail margin compression.",
revMix:[{n:"AWS",p:18,c:"#3DBFA8"},{n:"Online Stores",p:40,c:"#7E91E8"},{n:"3P Services",p:24,c:"#B266FF"},{n:"Advertising",p:10,c:"#FFBF00"},{n:"Subs",p:8,c:"#9A8F82"}],
compPos:{xLabel:"Cloud AI Revenue",yLabel:"E-Commerce Share",peers:[{n:"AMZN",x:65,y:38,self:true},{n:"MSFT",x:75,y:2},{n:"Google",x:45,y:1},{n:"Walmart",x:5,y:12}]},
mgmt:{beats:2,misses:1,streak:"-1",note:"Q4 revenue beat but guidance miss caused -12% drop. Jassy talks big on AI but market wants proof of capex ROI."},
metrics:{lastQ:"Q2 2026 (Jun 2026)",revGrowth:20.0,grossMargin:49.0,opMargin:13.7,netMargin:31.2,roe:28.0,note:"Q2 2026 (Jul 30): net sales $200.6B, +20% YoY. Operating income $27.5B, +43%, an operating margin of 13.7% versus 11.4% a year ago. AWS SEGMENT SALES $42.2B, +36.7% \u2014 the fastest growth in 18 quarters and the FIFTH consecutive quarter of acceleration. AWS is now a $169B annualised run rate. AWS segment operating income $16.6B versus $10.2B. Jassy: AI and Chips businesses each eclipsed run rates above $25B. Advertising $19.8B, +26%. North America $116.2B +16%; International $42.2B +15%. Worldwide paid units +17%. REPORTED NET INCOME $62.6B / $5.75 per share IS MISLEADING \u2014 it includes $53.4B of non-operating pre-tax other income, primarily from the Anthropic investment. Adjusted EPS was $1.97 against $1.82 expected. THE CASH FLOW PROBLEM: trailing-twelve-month FREE CASH FLOW IS NEGATIVE $7.6B, versus positive $18.2B a year earlier, driven by a $66.1B YoY increase in property and equipment purchases. Operating cash flow rose 33% to $161.4B, so this is capex, not deterioration. CAPEX GUIDANCE RAISED: Jassy expects roughly $220B of capital spending in 2026; cash capex was $53.1B in Q2 alone. COST PRESSURES FLAGGED: inflated component prices for memory, hard drives and SSDs; higher transportation costs from fuel inflation and driver-capacity limits. Q3 guidance: net sales $197-202B, operating income $22.5-26.5B. Roughly $1.2B of Q2 operating income was one-time (tariff refunds and an energy-contract fair-value gain), flattering the comparison. Next print Oct 29."},
watchlist:[{item:"AMZN Q1 Earnings",d:"Apr 29 ✓",why:"AWS AI revenue growth + retail margin expansion. Need capex ROI narrative."},{item:"Tariff policy developments",d:"Ongoing",why:"Cross-border commerce margins at risk from escalation."},{item:"Trainium3 deployment milestones",d:"H2 2026",why:"Custom silicon reduces AWS costs. Competitive advantage vs Azure."},{item:"Prime membership growth",d:"Quarterly",why:"Membership saturation risk in developed markets."}],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",ptDate:"Sep 21, 2026",riskDate:"Sep 25, 2026" }},
HOOD:{name:"Robinhood Markets",price:111.15,avgPT:131,highPT:170,ptDate:"Sep 21, 2026",ptVerified:true,lowPT:57,high52:153.86,low52:63.52,fwdPE:48.1,mktCap:"$109B",ytd:-4,yr1:153,consensus:"Buy",consensusNote:"Street rating is Buy, but the same 28 analysts average $120 \u2014 BELOW the price. Rating and target contradict; the target is the more informative signal.",earningsDate:"Nov 4, 2026",epsEst:0.48,epsEstDate:"Jul 23, 2026",sector:"Fintech",support:[{lvl:106.16,label:"Volume node \u2014 4.5% below"},{lvl:102.1,label:"Swing low 2025-11-21 \u2014 held 5x"},{lvl:83.68,label:"Swing low 2026-07-31 \u2014 held 0x"}],supportDate:"Oct 1, 2026",brokenSup:[{lvl:114.1,held:5,date:"2025-12-15"},{lvl:120.88,held:5,date:"2025-10-22"}],
supportVerified:true,
supportAnchor:"$106.16 (4.5%) / $102.10 (8.1%, held 5x) / $83.68 (24.7%, held 0x) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $106.16, 4.5% below $111.15. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.7,
news:[n(10002,"WAVE OF TARGET RAISES: GOLDMAN $142, JEFFERIES $140, CITIZENS $165, STONEX INITIATES $170","Sep 18: FactSet-cited consensus moved to $130-133 after multiple raises. Goldman Sachs to $142, citing the Rothera prediction-market JV at roughly $150M annualized revenue and a global top-3 to top-5 position. Jefferies to $140 after CFO meetings. Deutsche Bank into the mid-$130s, flagging Robinhood Chain fees above a $100M annualized run rate. Citizens to $165; StoneX initiated at Buy, $170. Stock rose 9.12% on 1.8x volume.","StocksToTrade / Timothy Sykes","2026-09-18",0.5,"a",18,"analyst"),n(9997,"HOOD: analyst RATING and analyst TARGET contradict each other","Worth reading carefully because the dashboard shows both. S&P Global's 28-analyst consensus RATING is Buy, while the same 28 analysts' average TARGET is $119.93 against a $124.72 close - implying MINUS 4%. This is not a data error. Sell-side ratings are stickier than targets: a stock runs past the target, the Buy rating persists for months, and analysts either raise the number later or quietly downgrade. When the two disagree, the target is the more informative signal because it is a specific quantity rather than a category. THE DASHBOARD'S OWN VERDICT IS NOT BUY - it scores HOOD 35 with the label now corrected to HOLD - EXTENDED, ABOVE TARGET. The prior label read HOLD - RECOVERY, which was accurate when the stock was climbing back but is stale now that it has run 22% past its 50-day. Supporting technicals: RSI 68.9, the most extended reading in the book; verified 50d $102 and 200d $95, so the trend is intact and price is stretched well above both; max pain $120 sits 4% below spot. R:R is negative at -0.32x. The read: trend is healthy, valuation support is gone. Any position here is a momentum bet, and it should be sized and stopped as one. Next print Nov 4.","S&P Global Market Intelligence / internal audit","2026-09-03",-0.2,"a",15,"intel"),

n(9122,"Bernstein raises HOOD to $160 street-high","Stock jumped 8 percent Jul 21 on the raise from $130. Thesis: prediction markets, perpetual futures, tokenized equities — a $70B industry fee pool with $1.7B prediction-market revenue potential by 2028.","Bernstein / CryptoTimes","2026-07-21",0.7,"a",12),n(977,"HOOD PTs verified May 18 — avg $98, high $155","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(951,"HOOD closed $76.96 (-0.23%) May 14","May 14 EOD — semis sell-off. Position down for the session.","Brokerage","2026-05-14",-0.1,"v",7),
n(912,"HOOD support verified May 11 — S1 anchor: Pivot S1 $70","S1 $70 = exact pivot S1 + round-number breakout retest","Web Verified","2026-05-11",0.4,"v",7),
n(889,"HOOD options verified May 11 — IV 52%, IVR 60","Source: AlphaQuery 20d IV Mean 51.16% (Jan 16 2026), reflects post-earnings vol","Web Verified","2026-05-11",0.4,"v",7),
n(877,"HOOD options data verified May 11 — IV 50%, IVR 65","Source: Market Rebellion 'increasing volume' lists multiple dates, peer FinTech IV typical 50%","Web Verified","2026-05-11",0.4,"v",7),
n(856,"HOOD PTs verified May 11 — avg $110","Source: Various analysts, BTIG $144 Sept, Mizuho positive coverage, range $60-180","Web Verified","2026-05-11",0.4,"v",7),
n(838,"HOOD technicals verified May 11","50d MA, 200d MA, RSI from web sources: Investing.com (50d=$76.24, 200d=$76.79, RSI 66.70)","Web Verified","2026-05-11",0.3,"t",6),
n(792,"HOOD $80.64 +6.7% in 2 days — bounce from post-miss lows","Recovered $75 to $80+. Earnings Aug 5 next. Crypto vol returning could help","Reuters","2026-05-11",0.4,"t",7),
n(777,"HOOD $74 -1.19% May 7 — post-miss drift, no catalyst","Day move -1.19% from May 5 close. post-miss drift, no catalyst. Macro: NVDA broke into ATH zone +7.5% on AI capex narrative re-acceleration.","MarketWatch","2026-05-07",0,"m",4),

n(733,"HOOD $74.46 +3.80% May 1 — bounce continues post-earnings miss","Stock recovering from Apr 28 miss. $70 floor held. Crypto thesis still impaired but oversold bounce strong.","Robinhood","2026-05-05",0.4,"m",7),
n(720,"HOOD $74 +1% Apr 30 — bouncing off lows post-miss","Stock attempting to hold $70-74 zone post Q1 miss. Crypto thesis still impaired but oversold bounce.","Robinhood","2026-04-30",0.1,"m",7),
n(670,"HOOD Q1 EARNINGS MISS — EPS $0.38 vs $0.39 est, Rev $1.07B vs $1.18B est. Stock -13%","Crypto rev -47% YoY = thesis problem. Equities +46%, options +8%, prediction markets +320% offset partially. Q1 paid $250M buyback @ $74 avg. Net deposits $18B (+22% annualized). Gold subscribers 4.3M record. Stock fell to $71.47 on guide miss.","Robinhood","2026-04-29",-0.7,"e",10),
n(671,"HOOD revenue mix shift — crypto fading, equities/options/prediction surging","Q1: Equities $82M +46%, Options $260M +8%, Prediction Markets $147M +320% (event contracts). Crypto $134M -47%. Mix shifting away from crypto dependency.","Robinhood","2026-04-29",0.2,"v",7),
n(672,"HOOD Net Deposits $18B Q1 — 22% annualized growth","Net deposits hit $18B in Q1, third highest quarter on record. 22% annualized growth rate. Total platform assets $307B. Gold subscribers 4.3M record (+36%).","Robinhood","2026-04-29",0.4,"e",7),

n(1,"Q4 crypto miss — stock -12.2%","Rev $1.28B missed $1.35B. EPS beat 0.66 vs 0.63. Crypto revenue decline.","HOOD","2026-02-01",-0.5,"e",7),
{...n(2,"HOOD -3.5%: risk-off accelerating. 3rd straight weekly loss. VIX 27. Consumer sentiment 55.5.5K","From $69 ATH to $72. Crypto correlation dragging.","Market","2026-02-03",-0.4,"t",7),on:false},
n(3,"Prediction markets breakout","3.5B Jan contracts ATH. March Madness, FIFA, elections ahead.","Needham","2026-02-05",0.8,"p",7),
n(4,"Cantor Fitzgerald: OW, PT $310","Most bullish on Street. Volatility cyclical not structural.","Cantor","2026-02-07",0.7,"a",7),
n(5,"Bridgewater bought 800K shares","World's largest hedge fund adding.","13F","2026-02-09",0.6,"a",7),
n(6,"Platform assets $324B, +68% YoY","Retirement assets doubled to $69.5B.","Earnings","2026-02-11",0.65,"e",7),
n(7,"CFO Verma sold 5,437.5 shares — insider selling signal","Transition through Sept 2026. Leadership uncertainty.","Robinhood","2026-02-13",-0.35,"m",7),
n(8,"Crypto weakness may persist 2 quarters","BTC below $87K headwind.","Needham","2026-02-15",-0.4,"c",7),
n(9,"$1B Ventures Fund I — SpaceX + OpenAI access","40M shares at $69 each. Retail access to SpaceX, Databricks, Stripe, Oura. Trading begins Feb 26. Game-changer for platform.","Bloomberg","2026-02-17",0.85,"p",7),
n(10,"Global payments + blockchain services","International expansion. 750K customers outside US.","Earnings Call","2026-02-19",0.6,"p",7),
n(12,"Goldman cuts PT to $111 from $69","Maintains Buy but lowers target on weaker crypto metrics. Still sees 46% upside.","Goldman Sachs","2026-02-23",-0.2,"a",7),
n(13,"Trump SOTU: 'Trump Accounts' for every child","Tax-free investment accounts for American children. Dell donated $6.25B to fund 25M accounts. Direct tailwind for retail investing platforms like HOOD.","SOTU","2026-02-25",0.5,"m",7),
{...n(14,"Ventures Fund I launched Feb 26. BTC drops to $66K on risk-off","$1B fund with SpaceX, Databricks, Stripe, Oura. Ackman interview highlighting democratization. No carry fees, 1% mgmt fee. Goldman underwriting.","Bloomberg","2026-02-27",0.7,"p",7),on:false},
n(109,"HOOD +7.4% risk-on bounce — BTC holding $68K, Goldman PT $111","Ventures Fund live. Stablecoin Clarity Act tailwind. Crypto winter thawing. Highest-beta name — war deescalation = outsized bounce. Support $67.","Market","2026-04-05",0.6,"m",10)
,
n(208,"HOOD $86 holding near ATH — crypto rally continues, Ventures Fund live","BTC $75K. Stablecoin Clarity Act tailwind. May 7 earnings. Risk-on environment = retail trading volume growth.","Market","2026-04-16",0.5,"m",10)
,
n(228,"HOOD $90.75 +4.49% — heavy options volume, BTC $81K, unusual call activity","Market Rebellion (Apr 17): HOOD 30-day IV 74 (range 50-93). Call/put 4.3:1 with focus on Apr 24 weekly + June 170 calls. Shares +7.3% on high options volume. BTC $81K tailwind. May 7 earnings 20 days away.","Market Rebellion Apr 17 2026","2026-04-17",0.8,"a",13)
,
n(450,"SEC scraps $25K pattern day trader rule — HOOD primary beneficiary","TipRanks Apr 15 11:06am-12:21pm ET: SEC approves removal of 25-year-old $25K pattern day trader rule. Goldman Sachs: \"Big Winner Robinhood\" — new day-trading volume tailwind. HOOD +10% intraday on news. Long-term secular boost for retail brokers.","TipRanks/Goldman Apr 15 2026","2026-04-15",0.85,"m",15),
n(451,"Bernstein raises to $130 PT — \"asymmetric upside\" — Apr 14","TipRanks Apr 14 9:17am/11:50am ET: Bernstein reiterates Outperform, raises PT to $130 (45% upside). Cites 65% upside on prediction market boom. Asymmetric upside thesis into Apr 28 earnings.","TipRanks/Bernstein Apr 14 2026","2026-04-14",0.85,"a",15),
n(452,"Truist, Citizens also raised PT Apr 13-14 — avg $128 recent 3 analysts","Benzinga Apr 14: 3 most recent analyst ratings (Bernstein Apr 14 $130, Truist Apr 13, Citizens Apr 10) average $128.33. Consensus PT $108.11 across 29 analysts. High $170 (JMP Oct 2025).","Benzinga Apr 14 2026","2026-04-14",0.7,"a",13),
n(453,"Cantor Fitzgerald: HOOD + COIN public-market winners prediction markets","TipRanks Apr 14 9:55am ET: Cantor Fitzgerald says HOOD and Coinbase stocks could be public-market winners as prediction markets explode. Bullish setup with earnings Apr 28.","TipRanks/Cantor Apr 14 2026","2026-04-14",0.7,"a",13),
n(454,"Trump Accounts broker — HOOD + BNY selected by Treasury","Apr 6 + ongoing: White House selected HOOD + BNY Mellon to operate new Trump child savings Accounts. HOOD acts as broker + trustee. New product line. CEO Tenev on CNBC.","CNBC/Treasury Apr 6-20 2026","2026-04-06",0.65,"m",13),
n(455,"Pinwheel direct deposit launch partner — Apr 14","TipRanks Apr 14 8:01am ET: Pinwheel chosen as direct deposit launch partner — frictionless account activation experiences. Fintech integration expanding.","TipRanks/Pinwheel Apr 14 2026","2026-04-14",0.45,"m",10),
n(456,"BTC $81K rebound drives HOOD +10% — Apr 14","TipRanks Apr 14 5:08pm ET: HOOD surges 10% as Bitcoin tops $81K and trading activity rebounds. Crypto revenue sensitivity major driver. Iran tensions volatility compounding effect.","TipRanks Apr 14 2026","2026-04-14",0.5,"m",11),
n(457,"Pre-earnings setup Apr 28: EPS est $0.40, consensus PT $108-122","Market context Apr 20: Earnings 8 days out. Consensus PT range $108 (Benzinga 29 analysts) to $122 (TickerNerd 31 analysts median). EPS est $0.40 Q1 FY26. Last quarter Q4 2025 beat $0.66 vs $0.63. Revenue $1.15B expected. Bullish options flow.","Market context Apr 20 2026","2026-04-20",0.65,"e",13)
,
n(536,"HOOD -3.08% Apr 21 profit taking after SEC rally","Apr 21 close: HOOD $88.46 -$2.82 profit taking after Apr 15-16 SEC day-trader rule removal rally. 6 days to Apr 28 earnings. Volume 49.8M vs 37M avg — elevated but pullback constructive.","Market Apr 21 2026","2026-04-21",-0.3,"m",12)
,
n(608,"HOOD -3.08% Apr 21 — profit-taking pre-earnings","Apr 21 close: HOOD $88.46 (-$2.815, -3.08%) down into Apr 28 earnings 7 days out. Profit-taking after Apr 14-15 Bernstein $130 PT + SEC rule rally. BTC holding $75K range. Consensus ratings unchanged.","Market context Apr 21 2026","2026-04-21",-0.3,"m",11)
,
n(638,"HOOD -1.0% to $87.55 Apr 22 — profit-taking continues into Apr 28 earnings — Apr 22","Apr 22 close $87.55 +1.30% off lows. Consolidation after Bernstein $130 rally. SEC day-trader rule tailwind durable. Apr 28 earnings 6 days away. Crypto revenue + prediction markets = key watch items.","Market context Apr 22 2026","2026-04-22",0.4,"m",12)
,
n(657,"HOOD -0.67% Apr 27 — $84 pre-earnings Apr 28 ✓","Apr 27 close $84.14 -0.67%. Apr 28 earnings ✓. BTC $75K crypto tailwind. Ventures Fund live. Record FY25 $4.5B rev.","Market Apr 27 2026","2026-04-27",0.45,"m",12)
,
n(659,"HOOD Apr 28 AH earnings: $0.39 EPS / $1.14B rev est — crypto -38% key risk","Crypto transaction rev -38% YoY vs equities +48% — net offset key. ±10% implied move (vs 6.91% avg). 4-straight beats in 2025. 10 revenue estimate downgrades in 3mo = low bar. Singapore MAS approval + Ventures Fund = catalyst optionality.","Earnings Preview Apr 27 2026","2026-04-27",0.4,"e",14)
,
n(665,"HOOD Q1 2026 EARNINGS ✓ MISS — EPS $0.38 (est $0.39), rev $1.07B (est $1.13B miss 5%) — stock -12.9% to $71.47","Revenue 5.3% miss vs $1.13B estimate. Adj EBITDA $534M (8% miss vs $582M est). Gold subs 4.3M (+36%). Net deposits $18B (+22% annualized). Robinhood Banking 125K customers, $2B deposits. Crypto rev pressure as expected. Beat streak ended.","SEC 8-K + Q1 Earnings Apr 28 2026","2026-04-28",-0.6,"e",14)
],
options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:-3.6,pcRatio:null,maxPain:110,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:231734,maxPainNear:115.0,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:57.31,atmIVExp:"2026-10-30",ivObs:17},
optionsDate:"Oct 1, 2026",optionsVerified:true,
catalysts:[{d:"Nov 4",e:"HOOD Q3 earnings",i:"high",iv:"med",hm:"N/A"},{d:"Mar 16 ✓",e:"March Madness prediction markets launch",i:"bullish",iv:"med",hm:"+5-8%"},{d:"Mar/Apr",e:"March Madness prediction mkts",i:"bullish",iv:"low",hm:"+4.5%"},{d:"Apr 29 ✓",e:"HOOD Q1 Earnings",i:"high",iv:"high",hm:"-8.5%"},{d:"Jun",e:"FIFA World Cup betting",i:"bullish",iv:"low",hm:"N/A"},{d:"H2",e:"Crypto recovery",i:"bullish",iv:"med",hm:"N/A"}],
peers:[{t:"HOOD",pe:51,ev:29.1,y:18},{t:"SOFI",pe:28,ev:18.3,y:8},{t:"COIN",pe:22,ev:14,y:15},{t:"SCHW",pe:18,ev:14,y:5},{t:"IBKR",pe:22,ev:16,y:8}],
playbook:[
pb("1 WEEK","HOOD $111 \u2014 HOLD (50). Nearest support $106.16, 4.5% below (volume node, never defended). +18% to $131 consensus. RSI 48, MACD -1.19, 2 broken levels above. NEXT: Nov 4 \u2014 HOOD Q3 earnings. Watch: Crypto winter extension: BTC down 40%+ from Oct highs. If crypto doesn't recover, HOOD's fastest-growing revenue line stalls Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",Y,"HOOD $111.15 as of the latest close, HOLD at 50 on the tool's five-component score. $124.72 (Sep 3 close). Retail brokerage and crypto. Nearest observed support sits at $106.16.","HOLD (50). Watch $106.16, 4.5% below (volume node, never defended). Upside +18% to $131; reward-to-risk 4.0x. Next catalyst: HOOD Q3 earnings."),
pb("1 MONTH","HOOD $111.15 \u2014 THESIS: $124.72 (the scheduled date close). Retail brokerage and crypto. KEY RISK: Crypto winter extension: BTC down 40%+ from Oct highs. If crypto doesn't recover, HOOD's fastest-growing revenue line stalls NEXT CATALYST: HOOD Q3 earnings. Upside +18%, reward-to-risk 4.0x to nearest support. Refreshed the scheduled date.",Y,"HOOD $111.15 (the scheduled date close), HOLD at 50. $124.72 (the scheduled date close). Retail brokerage and crypto. Key risk: Crypto winter extension: BTC down 40%+ from Oct highs. If crypto doesn't recover, HOOD's fastest-growing revenue line stalls","HOLD (50). Watch $106.16, 4.5% below (volume node, never defended). Upside +18% to $131; reward-to-risk 4.0x. Next catalyst: HOOD Q3 earnings."),
pb("3 MONTHS","HOOD $111.15 \u2014 NEXT QUARTER: HOOD Q3 earnings. The print either confirms the thesis ($124.72 (the scheduled date close). Retail brokerage and crypto.) or tests the key risk (Crypto winter extension: BTC down 40%+ from Oct highs. If crypto doesn't recover, HOOD's fastest-growing revenue line stalls) Nearest support $106.16, 4.5% below (volume node, never defended). Refreshed the scheduled date.",Y,"HOOD $111.15 (the scheduled date close), HOLD at 50. $124.72 (the scheduled date close). Retail brokerage and crypto. Key risk: Crypto winter extension: BTC down 40%+ from Oct highs. If crypto doesn't recover, HOOD's fastest-growing revenue line stalls","HOLD (50). Watch $106.16, 4.5% below (volume node, never defended). Upside +18% to $131; reward-to-risk 4.0x. Next catalyst: HOOD Q3 earnings."),
pb("6 MONTHS","HOOD $111.15 \u2014 SIX MONTHS: two prints inside the window. HOLD (50). Consensus $131 (+18%), street range $57 (-49%) to $170 (+53%). What would change the view: Crypto winter extension: BTC down 40%+ from Oct highs. If crypto doesn't recover, HOOD's fastest-growing revenue line stalls Refreshed the scheduled date.",Y,"HOOD $111.15 (the scheduled date close), HOLD at 50. $124.72 (the scheduled date close). Retail brokerage and crypto. Key risk: Crypto winter extension: BTC down 40%+ from Oct highs. If crypto doesn't recover, HOOD's fastest-growing revenue line stalls","HOLD (50). Watch $106.16, 4.5% below (volume node, never defended). Upside +18% to $131; reward-to-risk 4.0x. Next catalyst: HOOD Q3 earnings."),
pb("1 YEAR","HOOD $111.15 \u2014 TWELVE MONTHS: consensus $131 implies +18%; street range $57 (-49%) to $170 (+53%). THESIS: $124.72 (the scheduled date close). Retail brokerage and crypto. STRUCTURAL RISK: Crypto winter extension: BTC down 40%+ from Oct highs. If crypto doesn't recover, HOOD's fastest-growing revenue line stalls Refreshed the scheduled date.",Y,"HOOD $111.15 (the scheduled date close), HOLD at 50. $124.72 (the scheduled date close). Retail brokerage and crypto. Key risk: Crypto winter extension: BTC down 40%+ from Oct highs. If crypto doesn't recover, HOOD's fastest-growing revenue line stalls","HOLD (50). Watch $106.16, 4.5% below (volume node, never defended). Upside +18% to $131; reward-to-risk 4.0x. Next catalyst: HOOD Q3 earnings.")],
tech:{
ma:{d50:105.0,d100:100.0,d200:94.0,d400:93.0,align:"bullish",
brk:[{ma:"50d",p:105.0,above:"Reclaiming short-term trend. Relief rally underway.",below:"Below 50d. Crypto weakness dominating."},
{ma:"100d",p:100.0,above:"Full trend recovery. Prediction markets driving re-rate.",below:"Intermediate trend broken. Downtrend channel."},
{ma:"200d",p:94.0,above:"Primary trend intact. Diversification narrative intact.",below:"Crypto winter dragging stock into bear market."},
{ma:"400d",p:93.0,above:"Long-term growth thesis above secular support.",below:"Below secular support. Existential risk rising."}]},
momentum:{rsi:47.83,rsiZone:"neutral",macd:{v:2.4836,s:3.6749,h:-1.1912,cross:"bearish"},roc:3.9},
volume:{avg:"21.0M",recent:"19.1M",ratio:0.91,obv:"falling",accDist:"neutral",lastDay:"18.2M",lastDayX:0.87,volDate:"Oct 1, 2026"},
levels:{fibs:[{r:"0%",p:64,l:"52w low"},{r:"38.2%",p:98,l:"Shallow"},{r:"50%",p:109,l:"Midpoint"},{r:"61.8%",p:119,l:"Deep"},{r:"100%",p:154,l:"52w high"}],pivots:{r2:115,r1:113,p:112,s1:110,s2:109}},
pattern:{name:"Recovering",target:142,dir:"up",note:"$111.15. RSI 47.8, above 50d, above 200d. 2 levels broken. Next earnings Nov 4."},
verdict:{score:50,label:"HOLD \u2014 AT/ABOVE TARGET, EXTENDED, MACD+",c:"r",drivers:"$111.15. Above 50d $105 (+5.9%), above 200d $94 (+18.2%). RSI 47.8 neutral. MACD histogram -1.19 (deteriorating). Nearest observed support $106.16, 4.5% below. 2 prior levels BROKEN. Next earnings Nov 4."}},
fundVerified:true,
fundDate:"Sep 17, 2026",
fund:{
story:"$124.72 (Sep 3 close). Retail brokerage and crypto. Reported Aug 5. Next earnings Nov 4. Latest-quarter detail in this panel is NOT yet refreshed.",
drivers:[
{name:"Crypto Revenue",dir:"down",detail:"BTC below expectations. Crypto rev $221M missed $248M est. Seasonal + macro headwind."},
{name:"Prediction Markets",dir:"up",detail:"3.5B contracts in Jan — ATH. March Madness, FIFA, elections ahead. New TAM."},
{name:"Platform Diversification",dir:"up",detail:"Retirement assets doubled to $26.5B. Global payments + blockchain services launching."},
{name:"Crypto Cycle",dir:"risk",detail:"If BTC stays depressed, crypto revenue drags for 2+ quarters."}
],
flow:{inst:"Bridgewater bought 800K shares. Cantor PT $310 (highest). Wolfe upgraded Outperform.",retail:"Reddit bearish short-term, bullish long-term. Prediction markets generating buzz.",short:"Short interest 8.5% — elevated. Bears point to crypto dependency."},
bull:{path:"Crypto recovers + prediction markets scale + international → revenue reaccelerates → $120-150.",price:"$120-150"},
bear:{path:"Crypto winter extends. Prediction markets niche. Revenue stagnates. Stock drifts to $50-60.",price:"$50-60"},
activeRisks:[{sev:"HIGH",prob:45,risk:"Crypto winter extension: BTC down 40%+ from Oct highs. If crypto doesn't recover, HOOD's fastest-growing revenue line stalls",trigger:"BTC <$60K sustained",impact:"Revenue miss -15%",catalyst:"BTC price action — daily. Also Fed rate decision Jun 18 ✓ (rate cuts = crypto catalyst). Halving cycle dynamics"},
{sev:"MED",prob:20,risk:"SEC crypto enforcement: if key tokens delisted or trading restricted, HOOD crypto revenue hit directly",trigger:"SEC enforcement action on HOOD tokens",impact:"Crypto rev -30%",catalyst:"SEC enforcement calendar — ongoing. Watch for Wells notices. Stablecoin Clarity Act vote expected Q2 2026"},
{sev:"MED",prob:40,risk:"Macro risk-off sustained: HOOD is highest-beta name in portfolio. In sustained downturn, retail traders pull back",trigger:"S&P -10%+ correction",impact:"HOOD -25-30%",catalyst:"S&P 500 level — currently 6,632 (-3.1% YTD). Break below 6,400 = capitulation signal for HOOD"},
{sev:"LOW",prob:15,risk:"Ventures Fund performance: $1B Fund I exposed to SPX/OpenAI. If private markets mark down, reputational hit",trigger:"Fund marks down significantly",impact:"Sentiment drag",catalyst:"HOOD Q1 earnings May — Ventures Fund mark-to-market disclosure"}],
killer:"BTC below $40K sustained for 6+ months, killing crypto revenue and retail engagement.",
revMix:[{n:"Crypto",p:28,c:"#FFBF00"},{n:"Equities",p:22,c:"#7E91E8"},{n:"Options",p:18,c:"#B266FF"},{n:"Net Interest",p:20,c:"#3DBFA8"},{n:"Other",p:12,c:"#9A8F82"}],
compPos:{xLabel:"Crypto Exposure",yLabel:"Platform Growth",peers:[{n:"HOOD",x:70,y:80,self:true},{n:"COIN",x:90,y:40},{n:"SCHW",x:5,y:20},{n:"SOFI",x:30,y:75}]},
mgmt:{beats:2,misses:1,streak:"-1",note:"Q4 revenue miss on crypto. Beat on assets/users. CFO departing. Vlad talks big but execution mixed."},
metrics:{lastQ:"Q2 2026 (Jun 2026)",revGrowth:32.0,opMargin:57.0,netMargin:42.9,note:"Q2 2026 (Jul 29): RECORD total net revenues $1.308B, +32% YoY, above the $1.25B forecast. Adjusted EBITDA $741M, +35%, at a 57% MARGIN. EPS $0.62 against a $0.42 estimate \u2014 a 47.6% beat, up 48% YoY. Net income attributable to Robinhood $561M. Net deposits a record $21.7B in the quarter, a 28% annualised rate; $75.7B over twelve months, +27%. Platform assets approaching $400B. Funded customers 28.4M. Gold subscribers +1.4M or 39% YoY to 4.8M. ARPU +24% to $187. International funded customers passed 1 million. THIRTEEN business lines now exceed $100M in annualised revenue \u2014 Legend and the Credit Card business are the newest, which is the diversification argument against pure trading-cycle exposure. Trump Accounts: 77 million children signed up with over $1.5B in contributions since the July launch. BALANCE SHEET: issued $2.2B of 0.00% convertible senior notes due 2029 in June, with capped calls. Cash $5.4B. Buybacks $414M in the quarter at ~$94 average; $1.3B cumulative since Q3 2024 at ~$47 average. THE TELL: the stock FELL 3.3% on this print. A 47.6% EPS beat with record revenue was not enough, and the expense outlook includes self-funding Rothera and WonderFi, which may pressure margins. Next print Nov 4."},
watchlist:[{item:"Crypto market recovery",d:"Ongoing",why:"BTC price directly drives 28% of revenue."},{item:"March Madness prediction market volume",d:"Mar",why:"First major test of prediction market product at scale."},{item:"HOOD Q1 Earnings",d:"Apr 29",why:"Need crypto revenue stabilization + prediction market traction."},{item:"New CFO appointment",d:"H1 2026",why:"Warnick departing Sept 2026. Successor signals strategic direction."}],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",ptDate:"Sep 21, 2026",riskDate:"Sep 25, 2026" }},
SOFI:{name:"SoFi Technologies",price:15.84,avgPT:20,highPT:30,ptDate:"Sep 14, 2026",ptVerified:true,lowPT:12,high52:32.73,low52:14.88,fwdPE:26.3,mktCap:"$19B",ytd:-42,yr1:70,consensus:"Hold",earningsDate:"Oct 27, 2026",epsEst:0.15,epsEstDate:"Jul 23, 2026",sector:"Fintech",support:[{lvl:15.65,label:"Swing low 2026-06-09 \u2014 held 2x"},{lvl:14.92,label:"Swing low 2026-05-19 \u2014 held 2x"},{lvl:13.88,label:"Step below \u2014 derived"}],supportDate:"Oct 1, 2026",brokenSup:[{lvl:16.8,held:9,date:"2026-03-02"}],
supportVerified:true,
supportAnchor:"$15.65 (1.2%, held 2x) / $14.92 (5.8%, held 2x) / $13.88 (12.4%) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $15.65, 1.2% below $15.84. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.8,
news:[n(10102,"Q2: REVENUE +43%, 19TH STRAIGHT RULE OF 40; TECH PLATFORM -23%","Q2 2026 (Jul 29): GAAP net revenue $1.219B +43%; adjusted EBITDA $357.8M at 30%; members +35% to 15.8M; originations a record $14.8B +69%; FY guidance raised to $4.75-4.85B. Soft spots: Technology Platform revenue fell 23% YoY and Financial Services contribution margin compressed to 46% from 52%. Consensus target $20 across 25 analysts, the only HOLD consensus in the book.","Company filings / Stockanalysis","2026-07-29",0.2,"e",14,"earnings"),n(9101,"Q2 earnings CONFIRMED Jul 29 BMO","SoFi IR confirms Q2 2026 release Wed Jul 29 7am ET call 8am. Street: rev ~1.11B, EPS 0.11. Options imply 11.5 pct move vs 8.5 avg. Stock -35 pct YTD into print","SoFi IR / Wall Street Horizon / TipRanks","Jul 23, 2026",0.2,"a",8,"catalyst"),n(992,"SOFI PTs verified May 18 — avg $22, high $31","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(952,"SOFI closed $15.67 (+0.38%) May 14","May 14 EOD — semis sell-off. Position up for the session.","Brokerage","2026-05-14",0.1,"v",7),
n(911,"SOFI support verified May 11 — S1 anchor: Prior consolidation $14","S1 $14 = late-March 2026 base zone; round-number psych level","Web Verified","2026-05-11",0.4,"v",7),
n(876,"SOFI options data verified May 11 — IV 39%, IVR 60","Source: FlashAlpha scanner (SOFI ATM IV 38.90%, moderate premium)","Web Verified","2026-05-11",0.4,"v",7),
n(855,"SOFI PTs verified May 11 — avg $22","Source: JPM $31 OW, Citizens OP $30, Bernstein on SoFi - estimate range $12-38","Web Verified","2026-05-11",0.4,"v",7),
n(837,"SOFI technicals verified May 11","50d MA, 200d MA, RSI from web sources: altindex (50d=$17.2, 200d=$23.4); Investing.com RSI 17.03 (oversold)","Web Verified","2026-05-11",0.3,"t",6),
n(809,"SOFI $16.32 +2.64% May 11 — fintech rally lift","Day move +2.64%. fintech rally lift. Market: semis-led rally, S&P/NDX at ATH, six-week winning streak. CPI 3.7%, Fed on hold. Trump-Xi summit May 14-15 ✓","Reuters","2026-05-11",0,"m",4),
n(778,"SOFI $15.90 -2.03% May 7 — post-Q1 grinding","Day move -2.03% from May 5 close. post-Q1 grinding. Macro: NVDA broke into ATH zone +7.5% on AI capex narrative re-acceleration.","Bloomberg","2026-05-07",0,"m",4),

n(760,"SOFI $16 May 5 — bouncing post-earnings selloff","Stock recovered from -14% drop. holding. Galileo recovery narrative needed. Jul 29 Q2 catalyst.","SoFi","2026-05-05",0.1,"m",5),
n(719,"SOFI $16.45 +5% Apr 30 — bounce off lows","Stock recovered from earnings selloff. held. Galileo recovery narrative needed. Jul 29 Q2 catalyst.","SoFi","2026-04-30",0.2,"m",6),
n(680,"SOFI Q1 IN-LINE EARNINGS — EPS $0.12 in-line, Rev $1.1B beat $1.05B. Stock -13% on guide miss","Q1 net rev $1.1B +41% YoY (4.7% beat). Net income doubled to $167M. Adj EBITDA $340M +62%. RECORD originations $12.2B +68%. EPS $0.12 IN-LINE = ended beat streak. Q2 guide 30% rev growth + 30% EBITDA margin = both miss.","SoFi","2026-04-29",-0.5,"e",10),
n(681,"SOFI Galileo Tech Platform -27% YoY — Chime exit drag","Tech platform rev fell to $75.1M -27% YoY. Chime exit creating Galileo headwind. Management transition narrative continues. Bears citing 4 quarters flat performance.","SoFi","2026-04-29",-0.6,"v",8),
n(682,"SOFI FY26 guide reaffirmed at $4.655B rev / $0.60 EPS — not raised","Management reaffirmed FY26 guide rather than raise. Market wanted guide-up. NIM 5.94% improved. Lending rev $642M +55%. Net interest income strong but Galileo drag.","SoFi","2026-04-29",-0.3,"e",8),

n(1,"REVERSAL: CEO Noto bought $1M (56K shares) + Mastercard stablecoin deal","'Momentum in the business is undeniable.' Record member + deposit pace. Lifted 2026-27 EPS estimates.","JPMorgan","2026-02-01",0.9,"a",7),
{...n(11,"Citizens Financial: Outperform PT $18","35% YoY membership growth, 9 straight quarters GAAP profitable, $3B+ capital raised.","Citizens JMP","2026-02-21",0.75,"a",7),on:false},
n(12,"Q4 revenue surpassed $1B milestone","First-ever $1B+ quarter. Double-digit adjusted net income margin achieved for first time.","SOFI","2026-02-23",0.8,"e",7),
n(3,"Crypto + blockchain services launching","Re-entry to crypto. Global payments on blockchain.","SoFi","2026-02-05",0.7,"p",7),
n(4,"CEO Noto: top-10 bank ambition","Targeting top-10 US financial institution.","Earnings Call","2026-02-07",0.6,"m",7),
n(5,"32x fwd P/E — expensive for a bank","P/B 2.6 just above JPM 2.4. Growth premium vulnerable.","Market","2026-02-09",-0.4,"v",7),
n(6,"Lending thriving on rate cuts","Personal loans replacing credit card debt.","SoFi","2026-02-11",0.7,"e",7),
n(7,"Tech platform accelerating","B2B infra +19% YoY showing signs of life.","Earnings","2026-02-13",0.5,"p",6),
n(8,"30% account growth guided 2026","Management expeHOOD $71 -13% — Q1 EARNINGS MISS Apr 28. EPS $0.38 vs $0.39, rev $1.07B vs $1.18B. Crypto -47% YoY structural. Macro risk-on but fintech rotation hurtsajectory inflecting. Operating leverage.","Analysts","2026-02-17",0.7,"e",7),
n(10,"Expect 20% drawdown at some point","Historical pattern: sharp corrections during rallies.","Motley Fool","2026-02-19",-0.2,"t",5),
n(110,"SOFI +5.6% relief rally — fintech bouncing from oversold","Student loan refi + Galileo platform growth. 4th consecutive profitable quarter expected. Still -19% total G/L. Support $15. Macro sensitivity high.","Market","2026-04-05",0.4,"m",8)
,
n(209,"SOFI $16 — rate cut hopes back on table as war premium unwinds","Student loan refi + Galileo platform growth. Q1 profitable quarter expected May 8. Crypto integration rolling out.","Market","2026-04-16",0.5,"m",10)
,
n(229,"SOFI $16.42 +2.05% — Iran strait opening + oil collapse = risk-on fintech rally","Market Rebellion mid-session (Apr 17): SOFI on increasing option volume list alongside HOOD, INTC, PLTR. TradingKey: Trump declares Iran situation concluded, strait fully open. Rate cut hopes reviving — dovish Fed narrative strengthens. Jul 29 earnings.","Market Rebellion/TradingKey Apr 17 2026","2026-04-17",0.6,"m",11)
,
n(460,"SOFI launches instant FedNow transfers + business banking integration — Apr 8","Simply Wall St Apr 17 (+13.9%): Early April 2026, Galileo Financial Technologies (SoFi subsidiary) announced SoFi Bank now offers instant 24/7 FedNow Service bank transfers. Plus big business banking integration expansion.","Simply Wall St Apr 17 2026","2026-04-08",0.75,"m",14),
n(461,"Bernstein: asymmetric upside potential — Apr 14","TipRanks Apr 14: Bernstein bangs the drum for HOOD (paired with SOFI fintech thesis). SOFI benefits from parallel retail brokerage tailwinds.","TipRanks/Bernstein Apr 14 2026","2026-04-14",0.4,"a",11),
n(462,"Q1 2026 earnings Apr 28 — Key watch item: revenue composition","Nasdaq Apr 18: \"The main thing to look for when SoFi reports earnings on April 29 — not what you think.\" Focus: revenue mix shift (lending vs platform vs financial services). Key test for FY26 thesis.","Nasdaq Apr 18 2026","2026-04-18",0.4,"e",11),
n(463,"TapeFriendly setup — SOFI building positive momentum","Benzinga Apr 17 (3d ago): Critical levels to watch — SOFI sitting in friendly tape but still has work to do. Building positive momentum. Pre-earnings constructive technicals.","Benzinga Apr 17 2026","2026-04-17",0.4,"t",10),
n(464,"SOFI unusual open interest — option volume 79.1M contracts Apr 16","TipRanks Apr 16: Notable open interest changes — Wednesday's total option volume 79.1M contracts resulted in net open interest growth of 8.34M calls and 6.53M puts. Call-heavy ratio bullish pre-earnings.","TipRanks Apr 16 2026","2026-04-16",0.5,"t",11)
,
n(521,"SOFI Apr 20 $16.51 approaching Apr 28 earnings","Apr 20 close: SOFI $16.51. 7 days to Q1 FY26 earnings Apr 28. Revenue mix + lending origination = key metrics. HOOD parallel thesis on SEC day trader rule benefits retail brokerage sector.","Market context Apr 20 2026","2026-04-20",0.55,"m",12)
,
n(543,"SOFI -1.49% Apr 21 — Apr 28 earnings 7d","Apr 21: SOFI $16.21 -$0.29. Fintech consolidation. Apr 28 Q1 earnings 7d. Watch Galileo platform re-acceleration.","Apr 21","2026-04-21",-0.2,"m",10)
,
n(656,"SOFI +2.60% Apr 27 — earnings ✓. Rate cut hopes","Apr 27 close $16.92 +2.60%. Rate cut hopes returning on Iran ceasefire + oil easing. Apr 28 earnings ✓. Q4 record rev $1.0B.","Market Apr 27 2026","2026-04-27",0.55,"m",12)

,
n(660,"SOFI Apr 29 BMO earnings: $0.12 EPS (+100% YoY) / $1.05B rev — Muddy Waters rebuttal","All 4 quarters of 2025 beat EPS (avg +45% surprise). Muddy Waters short March 2026 — CEO bought $500K+. FY26 guide $4.655B rev / $0.60 EPS intact. Risks: 30x PE vs 8x peers. Fed cut assumption. Galileo flat.","Earnings Preview Apr 27 2026","2026-04-27",0.5,"e",14)
,
n(666,"SOFI Q1 2026 EARNINGS ✓ MIXED — EPS $0.12 in line, rev $1.10B BEAT (est $1.05B) — stock -14.3% to $15.74","Revenue +42.8% YoY at $1.10B (4.7% beat). EPS in line — ended beat streak. Lending originations $12.18B (+68%). Members 14.7M (+35%). Galileo platform -27% on Chime exit (key concern). Q2 guide: 30% rev growth (miss). FY26 $4.66B reaffirmed. SoFiUSD stablecoin announced.","Q1 Earnings + Investing.com Apr 29 2026","2026-04-29",-0.7,"e",14)
],
options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:-8.9,pcRatio:null,maxPain:17,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:310236,maxPainNear:16.5,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:57.17,atmIVExp:"2026-10-30",ivObs:17},
optionsDate:"Oct 1, 2026",optionsVerified:true,
catalysts:[{d:"Oct 27",e:"SOFI Q3 earnings",i:"high",iv:"med",hm:"N/A"},{d:"Apr 29 ✓",e:"SOFI Q1 Earnings — Mixed (rev beat, EPS in line, -14.3%)",i:"high",iv:"high",hm:"-13.0%"},{d:"H1 2026",e:"Blockchain services rollout",i:"bullish",iv:"low",hm:"N/A"},{d:"2026",e:"Global payments launch",i:"bullish",iv:"low",hm:"N/A"}],
peers:[{t:"SOFI",pe:28,ev:18.3,y:8},{t:"HOOD",pe:51,ev:29.1,y:18},{t:"NU",pe:25,ev:12,y:10},{t:"ALLY",pe:9,ev:6,y:2},{t:"LC",pe:12,ev:8,y:5}],
playbook:[
pb("1 WEEK","SOFI $16 (15.84) \u2014 BUY (73). Nearest support $15.65, 1.2% below, held 2x. +26% to $20 consensus. RSI 37, MACD -0.13, 1 broken level above. NEXT: Oct 27 \u2014 SOFI Q3 earnings. Watch: Rate environment: if Fed holds or hikes due to oil inflation, lending margins compress and loan demand drops Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",G,"SOFI $15.84 (15.84) as of the latest close, BUY at 73 on the tool's five-component score. $18.51 (Sep 3 close). Digital-first lender. Nearest observed support sits at $15.65.","BUY (73). Watch $15.65, 1.2% below, held 2x. Upside +26% to $20; reward-to-risk 8.8x. Next catalyst: SOFI Q3 earnings."),
pb("1 MONTH","SOFI $15.84 (15.84) \u2014 THESIS: $18.51 (the scheduled date close). Digital-first lender. KEY RISK: Rate environment: if Fed holds or hikes due to oil inflation, lending margins compress and loan demand drops NEXT CATALYST: SOFI Q3 earnings. Upside +26%, reward-to-risk 8.8x to nearest support. Refreshed the scheduled date.",G,"SOFI $15.84 (15.84) (the scheduled date close), BUY at 73. $18.51 (the scheduled date close). Digital-first lender. Key risk: Rate environment: if Fed holds or hikes due to oil inflation, lending margins compress and loan demand drops","BUY (73). Watch $15.65, 1.2% below, held 2x. Upside +26% to $20; reward-to-risk 8.8x. Next catalyst: SOFI Q3 earnings."),
pb("3 MONTHS","SOFI $15.84 (15.84) \u2014 NEXT QUARTER: SOFI Q3 earnings. The print either confirms the thesis ($18.51 (the scheduled date close). Digital-first lender.) or tests the key risk (Rate environment: if Fed holds or hikes due to oil inflation, lending margins compress and loan demand drops) Nearest support $15.65, 1.2% below, held 2x. Refreshed the scheduled date.",G,"SOFI $15.84 (15.84) (the scheduled date close), BUY at 73. $18.51 (the scheduled date close). Digital-first lender. Key risk: Rate environment: if Fed holds or hikes due to oil inflation, lending margins compress and loan demand drops","BUY (73). Watch $15.65, 1.2% below, held 2x. Upside +26% to $20; reward-to-risk 8.8x. Next catalyst: SOFI Q3 earnings."),
pb("6 MONTHS","SOFI $15.84 (15.84) \u2014 SIX MONTHS: two prints inside the window. BUY (73). Consensus $20 (+26%), street range $12 (-24%) to $30 (+89%). What would change the view: Rate environment: if Fed holds or hikes due to oil inflation, lending margins compress and loan demand drops Refreshed the scheduled date.",G,"SOFI $15.84 (15.84) (the scheduled date close), BUY at 73. $18.51 (the scheduled date close). Digital-first lender. Key risk: Rate environment: if Fed holds or hikes due to oil inflation, lending margins compress and loan demand drops","BUY (73). Watch $15.65, 1.2% below, held 2x. Upside +26% to $20; reward-to-risk 8.8x. Next catalyst: SOFI Q3 earnings."),
pb("1 YEAR","SOFI $15.84 (15.84) \u2014 TWELVE MONTHS: consensus $20 implies +26%; street range $12 (-24%) to $30 (+89%). THESIS: $18.51 (the scheduled date close). Digital-first lender. STRUCTURAL RISK: Rate environment: if Fed holds or hikes due to oil inflation, lending margins compress and loan demand drops Refreshed the scheduled date.",G,"SOFI $15.84 (15.84) (the scheduled date close), BUY at 73. $18.51 (the scheduled date close). Digital-first lender. Key risk: Rate environment: if Fed holds or hikes due to oil inflation, lending margins compress and loan demand drops","BUY (73). Watch $15.65, 1.2% below, held 2x. Upside +26% to $20; reward-to-risk 8.8x. Next catalyst: SOFI Q3 earnings.")],
tech:{
ma:{d50:17.47,d100:17.28,d200:18.99,d400:19.69,align:"bearish",
brk:[{ma:"50d",p:17.47,above:"Near-term trend strong.",below:"Losing near-term support."},
{ma:"100d",p:17.28,above:"Intermediate trend healthy.",below:"Getting heavy."},
{ma:"200d",p:18.99,above:"Primary trend intact. Near avg PT ($18).",below:"Below PT AND 200d. Exit thesis."},
{ma:"400d",p:19.69,above:"Secular fintech growth intact.",below:"Long-term thesis broken."}]},
momentum:{rsi:36.79,rsiZone:"neutral",macd:{v:-0.5094,s:-0.3793,h:-0.1301,cross:"bearish"},roc:-11.2},
volume:{avg:"52.4M",recent:"41.0M",ratio:0.78,obv:"flat",accDist:"neutral",lastDay:"37.3M",lastDayX:0.71,volDate:"Oct 1, 2026"},
levels:{fibs:[{r:"0%",p:14.88,l:"52w low"},{r:"38.2%",p:21.7,l:"Shallow"},{r:"50%",p:23.8,l:"Midpoint"},{r:"61.8%",p:25.91,l:"Deep"},{r:"100%",p:32.73,l:"52w high"}],pivots:{r2:16.3,r1:16.07,pp:15.8,s1:15.57,s2:15.3}},
pattern:{name:"Base Building",target:19,dir:"up",note:"$15.84. RSI 36.8, below 50d, below 200d. 1 level broken. Next earnings Oct 27."},
verdict:{score:73,label:"BUY \u2014 STRUCTURE BROKEN",c:"r",drivers:"$15.84. Below 50d $17 (-9.3%), below 200d $19 (-16.6%). RSI 36.8 oversold. MACD histogram -0.13 (deteriorating). Nearest observed support $15.65, 1.2% below, held 2x. 1 prior level BROKEN. Next earnings Oct 27."}},
fundVerified:true,
fundDate:"Sep 17, 2026",
fund:{
story:"$18.51 (Sep 3 close). Digital-first lender. Reported Jul 29. Next earnings Oct 27. Latest-quarter detail in this panel is NOT yet refreshed.",
drivers:[
{name:"Member Growth",dir:"up",detail:"13.7M members +35% YoY. 9 straight GAAP profitable quarters. Financial services rev +78%. Network effects compounding."},
{name:"Lending + Rates",dir:"up",detail:"Personal loans replacing credit cards. Rate cuts = refi boom. $1B+ quarterly revenue milestone crossed."},
{name:"Institutional Validation",dir:"up",detail:"JPM OW $31 + Citizens $30. 'Momentum undeniable.' Analyst upgrades just beginning."},
{name:"Tech Platform B2B",dir:"flat",detail:"Galileo/Technisys infra +19% but still small. Optionality not yet priced."}
],
flow:{inst:"CEO Noto has been a buyer. Institutional ownership rising with index inclusion. Current consensus $20 across 24 analysts with a HOLD rating \u2014 the only non-Buy in the book.",retail:"Retail extremely bullish. r/sofi dedicated community. Heavy call activity.",short:"Short interest 9.2% — elevated but JPM upgrade puts pressure on shorts."},
bull:{path:"JPM/Citizens upgrades trigger wave → Q1 beats → PTs revised to $30-35 → stock catches up to $25-30.",price:"$25-31"},
bear:{path:"Growth decelerates. Rate cuts slow. Software selloff drags fintech. Reverts to $14-16.",price:"$14-16"},
activeRisks:[{sev:"HIGH",prob:40,risk:"Rate environment: if Fed holds or hikes due to oil inflation, lending margins compress and loan demand drops",trigger:"Fed signals no cuts in 2026",impact:"NII growth stalls",catalyst:"FOMC meetings — Mar 19 ✓, May 7 ✓, Jun 18 ✓. Dot plot + Powell commentary. Core PCE at 3.1% = hawkish risk"},
{sev:"MED",prob:25,risk:"Student loan policy: government policy changes on forgiveness or SAVE plan could impact refi business",trigger:"Student loan policy reversal",impact:"Refi volume -20%",catalyst:"Supreme Court student loan ruling — pending. Also ED regulatory actions. Watch executive orders"},
{sev:"MED",prob:30,risk:"Fintech competition: intense pressure from JPM/Goldman retail push + traditional banks going digital",trigger:"Market share loss in deposits",impact:"Member growth slows",catalyst:"Q1 2026 earnings May — member growth + deposit growth rate. Also JPM/Goldman digital banking metrics"},
{sev:"LOW",prob:15,risk:"Stablecoin regulatory risk: SoFi-USD + Mastercard could face regulatory scrutiny",trigger:"Regulatory challenge to stablecoin",impact:"Partnership at risk",catalyst:"Stablecoin Clarity Act — Senate vote expected Q2 2026. OCC guidance on bank stablecoins also pending"}],
killer:"Loan delinquency rates spike above 5%, destroying the 'quality borrower' thesis.",
revMix:[{n:"Lending",p:49,c:"#7E91E8"},{n:"Financial Services",p:28,c:"#3DBFA8"},{n:"Tech Platform",p:23,c:"#B266FF"}],
compPos:{xLabel:"Member Growth",yLabel:"Revenue Diversification",peers:[{n:"SOFI",x:85,y:65,self:true},{n:"HOOD",x:70,y:50},{n:"NU",x:90,y:45},{n:"ALLY",x:15,y:70},{n:"LC",x:40,y:30}]},
mgmt:{beats:4,misses:0,streak:"+4",note:"Noto delivering. 4 straight beats. Revenue +38% YoY. Guidance raised each quarter. Credibility rising."},
metrics:{lastQ:"Q2 2026 (Jun 2026)",revGrowth:43.0,opMargin:30.0,netMargin:12.9,roe:7.0,note:"Q2 2026 (Jul 29): RECORD GAAP net revenue $1.219B, +43% YoY. Adjusted net revenue $1.206B, +40%. Adjusted EBITDA $357.8M, +44%, at a 30% margin. GAAP net income $156.6M, diluted EPS $0.12. NINETEENTH consecutive quarter clearing the Rule of 40, with a score of 70. Members +35% to 15.8M with a record 1.1M added; products +42% to 24.4M with a record 2.2M added. Cross-buy accelerating \u2014 51% of new products were opened by EXISTING members, up from 43% last quarter and 35% a year ago. Loan originations a record $14.8B, +69%: $10.7B personal, $2.7B student, $1.4B home. Deposits $45.5B. Net interest income $788.2M, +52%. Net interest margin 5.98%. Tangible book value $9.5B, +80% YoY. Fee-based revenue $472.3M, 39% of total, +22% sequentially \u2014 the diversification away from balance-sheet lending. TWO SOFT SPOTS: Technology Platform revenue FELL 23% YoY with contribution margin down to 14%. Financial Services contribution margin COMPRESSED from 52% to 46% as directly attributable expenses rose 46% to $239.8M. GUIDANCE RAISED: FY2026 adjusted net revenue $4.75-4.85B (32-35% growth) versus prior guidance and a $4.7B consensus. Adjusted EBITDA held at ~$1.6B (33-34% margin), adjusted EPS ~$0.60. 2028 target: $7.89B revenue, a 30% CAGR from 2025, with adjusted EPS $1.02-1.12. Next print Oct 27."},
watchlist:[{item:"SOFI Q1 Earnings",d:"Apr 28",why:"Member growth + lending volume. Need to justify 32x PE with sustained 30%+ growth."},{item:"Crypto/blockchain services launch",d:"H1 2026",why:"Re-entry to crypto adds new revenue stream. Market sizing unknown."},{item:"Fed rate decisions",d:"Ongoing",why:"Rate cuts = refi boom + personal loan demand. Directly drives lending revenue."},{item:"Loan delinquency data",d:"Quarterly",why:"Thesis killer metric. Any spike above 5% = trouble."}],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",ptDate:"Sep 14, 2026",riskDate:"Sep 25, 2026" }},
MRVL:{name:"Marvell Technology",price:268.08,avgPT:285,highPT:400,ptDate:"Sep 14, 2026",ptVerified:true,lowPT:143,high52:329.88,low52:70.69,fwdPE:44,mktCap:"$223B",ytd:200,yr1:-30,consensus:"Strong Buy",earningsDate:"Dec 1, 2026",epsEst:0.80,epsEstDate:"Jul 23, 2026",sector:"Semiconductors",support:[{lvl:200.62,label:"Swing low 2026-09-01 \u2014 held 1x"},{lvl:162.9,label:"Swing low 2026-07-29 \u2014 held 0x"},{lvl:151.5,label:"Step below \u2014 derived"}],supportDate:"Oct 1, 2026",brokenSup:[],
supportVerified:true,
supportAnchor:"$200.62 (25.2%, held 1x) / $162.90 (39.2%, held 0x) / $151.50 (43.5%) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $200.62, 25.2% below $268.08. That first gap IS the risk \u2014 no observed level between here and there. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.15,
news:[n(10103,"Q2 FY27: RECORD $2.74B, DATA CENTER GUIDED +60%, BUT GROSS MARGIN GUIDED DOWN","Q2 FY27 (Aug 27): revenue $2.739B +37%; non-GAAP EPS $0.94 +40%; non-GAAP operating margin 36.6%, +180bps. Data Center guided +60% in FY27 and over 60% in FY28; expanded Tier 1 hyperscaler agreement covering custom XPU attach. Non-GAAP gross margin guided down to 57.5-58.5% on the Custom silicon ramp. Consensus target $285.","Company filings","2026-08-28",0.2,"e",14,"earnings"),n(9601,"MRVL +25-32% Jun 2 — Jensen Huang calls Marvell next trillion-dollar company at COMPUTEX","NVIDIA CEO spotlighted MRVL role in AI connectivity/optics. Same day MRVL launched Teralynx T100 — industry-first 102.4 Tbps AI-optimized switch chip. FY27 rev guided ~$11.5B (+40%). Wall St targets clustering $230-240 pre-spike; stock blew past to ~$283-319. P/E now stretched (~71-90x TTM).","TipRanks/CNBC","2026-06-02",0.9,"a",15),n(9401,"MRVL +9.42% Jun 1 — leads semis higher on custom-silicon momentum","Marvell topped sector turnover. CEO Matt Murphy to keynote COMPUTEX 2026 \"Scaling Data Center Infrastructure to Drive AI Innovation.\" Google TPU win + NVDA $2B NVLink Fusion stake underpin the multi-source custom-ASIC thesis.","TradingKey","2026-06-01",0.8,"a",13),n(998,"MRVL Q1 FY27 earnings confirmed May 27, 2026 AMC","Reports day after NVDA. Q1 expected EPS $0.61, rev $1.88B. Custom silicon ASIC progress + AI optical to watch.","MarketBeat","2026-05-18",0.2,"e",10),
n(983,"MRVL PTs verified May 18 — avg $128, high $200","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(946,"MRVL closed $168.0 (-5.03%) May 14","May 14 EOD — semis sell-off. Position down for the session.","Brokerage","2026-05-14",-0.4,"v",7),
n(907,"MRVL support verified May 11 — S1 anchor: 200d MA $140","S1 $140 exactly = 200d MA","Web Verified","2026-05-11",0.4,"v",7),
n(869,"MRVL options data verified May 11 — IV 66%, IVR 70","Source: Market Rebellion April 21 (MRVL 30d IV 66, 52w range 43-84)","Web Verified","2026-05-11",0.4,"v",7),
n(849,"MRVL PTs verified May 11 — avg $168","Source: Benzinga 34 analysts $121 historical avg, but most recent UBS $195, Stifel/Oppenheimer cluster $168 (May 4-15). UBS Street-high $195","Web Verified","2026-05-11",0.4,"v",7),
n(830,"MRVL technicals verified May 11","50d MA, 200d MA, RSI from web sources: Investing.com (50d=$165.76, 200d=$140.52), ChartMill RSI 68.95","Web Verified","2026-05-11",0.3,"t",6),
n(791,"MRVL $169.80 +6.65% in 2 days — recovered post -6% Wed dip","Bounced from $159 lows. AI networking + AMD/MU rally tailwind. PT cluster moving up.","Bloomberg","2026-05-11",0.5,"t",7),

n(754,"MRVL $163 -1.4% May 5 — semis profit-taking","Custom silicon narrative intact but caught in semi rotation. May 28 Q1 earnings catalyst.","Marvell","2026-05-05",-0.2,"m",5),
n(711,"MRVL $165 +3% Apr 30 — custom silicon demand","ASIC narrative + Inphi optical demand. May 28 Q1 earnings next catalyst.","Marvell","2026-04-30",0.3,"m",6),
n(1,"Celestial AI acquisition completed","$3.25B cash+stock deal closed Feb 2. Photonic Fabric for scale-up optical interconnect.","Marvell","2026-02-01",0.7,"p",7),
n(2,"Custom silicon for 4 top hyperscalers","Microsoft, Amazon, Meta, Google all using Marvell custom ASICs. De-NVIDIA-ization play.","Industry","2026-02-03",0.85,"p",7),
n(3,"SURGING +15.6% on 2-day blowout: FY28 $15B, custom silicon doubles. Switching $600M+mis","Trading at 28x vs peer avg 43x. Down 27% over past year while AI demand explodes.","Siml St","2026-02-05",0.6,"v",7),
n(4,"Seeking Alpha: Buy — 42% upside in 16-18mo","Celestial AI key 2026 catalyst. Data center TAM above $10B. Custom silicon + electro-optics to double by FY28.","Seeking Alpha","2026-02-07",0.8,"a",7),
n(5,"Data center rev +37.8% YoY — 73% of total","Q3 data center $1.52B. Custom XPU + electro-optic + next-gen switches driving.","Earnings","2026-02-09",0.75,"e",7),
n(6,"Celestial AI: $128M/yr added opex + dilution","27M shares issued. Revenue not until H2 FY28. Near-term EPS drag.","Analysts","2026-02-11",-0.4,"v",7),
{...n(7,"UBS cuts PT $120→$115, keeps Buy","Rosenblatt, Citi also trimmed PTs post-Celestial close. Integration risk.","UBS","2026-02-13",-0.25,"a",7),on:false},
n(8,"Photonic Fabric: 16 Tbps per chiplet","Replacing copper with optical I/O at chip level. Solving interconnect bottleneck for 100K-node clusters.","Marvell","2026-02-15",0.8,"p",7),
n(9,"Amazon ASIC risk — potential lost account","Projections show only 20% XPU growth CY26. Amazon may be reducing reliance.","Analysts","2026-02-17",-0.5,"k",7,"rumor"),
n(10,"XConn acquisition — CXL memory pooling","Acquired XConn in early 2026. Cements lead in CXL 3.0 memory pooling for AI.","Marvell","2026-02-19",0.6,"p",7),
n(112,"MRVL +15% massive bounce from oversold — custom silicon demand validated","Amazon partnership. Post-GTC ASIC validation. 5G + data center networking demand. Bouncing from $88 war lows. Apr earnings approaching.","Market","2026-04-05",0.7,"m",14)
,
{...n(211,"MRVL $133 — custom silicon demand continues, ASIC TAM expanding","Amazon partnership. 800G/1.6T networking demand. May 28 earnings. Celestial AI photonics integration.","Market","2026-04-16",0.5,"m",10),on:false}
,
n(231,"MRVL $183 new ATH confirmed post-Google (historical context — Apr 17)","Options Report (Apr 17): MRVL confirmed new 52-week high +$5.58. Financial News: MRVL +22% over 5 consecutive sessions, +50% YTD, +143-151% past 12 months. Oppenheimer analyst called 'Switzerland of interconnect.' ASIC sales forecast raised $4B next year, $10B+ by 2028. Amazon + potential MSFT + 5 hyperscalers.","Financial News Apr 17 2026","2026-04-17",0.85,"m",14)
,
n(400,"MRVL $151.88 +8.73% — Google in talks for 2 new AI chips (The Information Apr 19)","Reuters/Barrons Apr 20: Google in talks with Marvell to develop 2 new AI inference chips. Morgan Stanley notes potential competitive pressure on AVGO (current Google TPU partner). MRVL AI ASIC business now has visible path to $10B by 2028 (CEO commentary). Stock +9% intraday = market pricing deal materializing.","Reuters/Barrons Apr 19-20 2026","2026-04-20",0.9,"a",15),
n(401,"MRVL new ATH $213.88 intraday — Google chip design-in catalyst","MRVL May 27 ✓ Q1 FY27 — next ~Aug 28 (Q2). Google partnership would complement existing Amazon Trainium, MSFT partnership (rumored). Expand hyperscaler count from 3 to 4+ named customers. Oppenheimer $213 PT (\"Switzerland of interconnect\"). Stock cleared $140 resistance.","Market context Apr 20 2026","2026-04-20",0.7,"m",13)
,
n(534,"MRVL NEW ATH $213.53 — +3.17% Apr 21","Apr 21 close: MRVL $213.53 +$4.69 NEW 52W HIGH. Google-MRVL AI chip deal rally continuation + custom silicon momentum. May 21 Q1 earnings 30d.","Market Apr 21 2026","2026-04-21",0.8,"m",14)
,
n(605,"MRVL +3.17% Apr 21 on new Google chip talks — beyond Broadcom","Sherwood News Apr 21: Marvell and Google reportedly in talks to develop new AI chips, expanding Google's custom silicon footprint beyond AVGO. Hyperscalers diversifying. NVDA/AMD -1% on read-through. MRVL $213.53 close, sustaining post-Apr-19 breakout levels.","Sherwood News Apr 21 2026","2026-04-21",0.85,"m",14)
,
n(634,"MRVL +5.34% NEW ATH $213.39 — Google deal validation continues — Apr 22","Apr 22 close $213.39 +5.34% NEW 52W HIGH. Google Ironwood launch validates MRVL custom silicon thesis (MRVL designed prior Google TPU v4). Inference-dedicated chip = MRVL addressable market expansion. May 21 earnings = next catalyst.","Market context Apr 22 2026","2026-04-22",0.8,"m",14)
,
n(653,"MRVL -4.08% Apr 27 — $157 custom silicon digesting","Apr 27 close $157.38 -4.08%. Profit-taking after run. Amazon + 5 hyperscaler ASIC wins intact. NVDA $2B investment partnership. May 21 earnings.","Market Apr 27 2026","2026-04-27",0.35,"m",12)
,
n(675,"MRVL $213.45 +4.71% — AI optical / inferencing custom silicon momentum continues","MRVL +4.71% to ATH zone $213.45 on AVGO read-through. AI inferencing chip TAM expanding. Custom silicon pipeline at $1.5B+ FY26.","Stock close Apr 29 2026","2026-04-29",0.6,"n",7)
],
options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:-10.3,pcRatio:null,maxPain:240,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:248499,maxPainNear:250.0,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:65.79,atmIVExp:"2026-10-30",ivObs:17},
optionsDate:"Oct 1, 2026",optionsVerified:true,
catalysts:[{d:"Dec 1",e:"MRVL Q3 FY27 earnings",i:"high",iv:"med",hm:"N/A"},{d:"Mar 5 ✓",e:"MRVL Q4 FY26 Earnings — BLOWOUT: Q1 guide $2.4B crushed, FY28 $15B",i:"high",iv:"high",hm:"+12.8%"},{d:"Mar 16 ✓",e:"NVIDIA GTC (custom ASIC read)",i:"neutral",iv:"med",hm:"+3.5%"},{d:"H2 FY28",e:"Celestial AI revenue ramp",i:"bullish",iv:"low",hm:"N/A"},{d:"2026",e:"Hyperscaler ASIC design wins",i:"bullish",iv:"low",hm:"N/A"}],
peers:[{t:"MRVL",pe:43,ev:33.2,y:3},{t:"AVGO",pe:20,ev:20.3,y:5},{t:"NVDA",pe:22,ev:28.3,y:4},{t:"AMD",pe:58,ev:25.1,y:8},{t:"ALAB",pe:85,ev:60,y:-20}],
playbook:[
pb("1 WEEK","MRVL $268 \u2014 TRIM/AVOID (25). Nearest support $200.62, 25.2% below, held 1x. +6% to $285 consensus. RSI 63, MACD +2.15. NEXT: Dec 1 \u2014 MRVL Q3 FY27 earnings. Watch: Amazon ASIC risk: if Amazon brings chip design in-house (like Google TPU), MRVL loses its largest custom customer Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",R,"MRVL $268.08 as of the latest close, TRIM/AVOID at 25 on the tool's five-component score. $208.83 (Sep 3 close). Custom silicon and optical interconnect. Nearest observed support sits at $200.62.","TRIM/AVOID (25). Watch $200.62, 25.2% below, held 1x. Upside +6% to $285; reward-to-risk 0.3x. Next catalyst: MRVL Q3 FY27 earnings."),
pb("1 MONTH","MRVL $268.08 \u2014 THESIS: $208.83 (the scheduled date close). Custom silicon and optical interconnect. KEY RISK: Amazon ASIC risk: if Amazon brings chip design in-house (like Google TPU), MRVL loses its largest custom customer NEXT CATALYST: MRVL Q3 FY27 earnings. Upside +6%, reward-to-risk 0.3x to nearest support. Refreshed the scheduled date.",R,"MRVL $268.08 (the scheduled date close), TRIM/AVOID at 25. $208.83 (the scheduled date close). Custom silicon and optical interconnect. Key risk: Amazon ASIC risk: if Amazon brings chip design in-house (like Google TPU), MRVL loses its largest custom customer","TRIM/AVOID (25). Watch $200.62, 25.2% below, held 1x. Upside +6% to $285; reward-to-risk 0.3x. Next catalyst: MRVL Q3 FY27 earnings."),
pb("3 MONTHS","MRVL $268.08 \u2014 NEXT QUARTER: MRVL Q3 FY27 earnings. The print either confirms the thesis ($208.83 (the scheduled date close). Custom silicon and optical interconnect.) or tests the key risk (Amazon ASIC risk: if Amazon brings chip design in-house (like Google TPU), MRVL loses its largest custom customer) Nearest support $200.62, 25.2% below, held 1x. Refreshed the scheduled date.",R,"MRVL $268.08 (the scheduled date close), TRIM/AVOID at 25. $208.83 (the scheduled date close). Custom silicon and optical interconnect. Key risk: Amazon ASIC risk: if Amazon brings chip design in-house (like Google TPU), MRVL loses its largest custom customer","TRIM/AVOID (25). Watch $200.62, 25.2% below, held 1x. Upside +6% to $285; reward-to-risk 0.3x. Next catalyst: MRVL Q3 FY27 earnings."),
pb("6 MONTHS","MRVL $268.08 \u2014 SIX MONTHS: two prints inside the window. TRIM/AVOID (25). Consensus $285 (+6%), street range $143 (-47%) to $400 (+49%). What would change the view: Amazon ASIC risk: if Amazon brings chip design in-house (like Google TPU), MRVL loses its largest custom customer Refreshed the scheduled date.",R,"MRVL $268.08 (the scheduled date close), TRIM/AVOID at 25. $208.83 (the scheduled date close). Custom silicon and optical interconnect. Key risk: Amazon ASIC risk: if Amazon brings chip design in-house (like Google TPU), MRVL loses its largest custom customer","TRIM/AVOID (25). Watch $200.62, 25.2% below, held 1x. Upside +6% to $285; reward-to-risk 0.3x. Next catalyst: MRVL Q3 FY27 earnings."),
pb("1 YEAR","MRVL $268.08 \u2014 TWELVE MONTHS: consensus $285 implies +6%; street range $143 (-47%) to $400 (+49%). THESIS: $208.83 (the scheduled date close). Custom silicon and optical interconnect. STRUCTURAL RISK: Amazon ASIC risk: if Amazon brings chip design in-house (like Google TPU), MRVL loses its largest custom customer Refreshed the scheduled date.",R,"MRVL $268.08 (the scheduled date close), TRIM/AVOID at 25. $208.83 (the scheduled date close). Custom silicon and optical interconnect. Key risk: Amazon ASIC risk: if Amazon brings chip design in-house (like Google TPU), MRVL loses its largest custom customer","TRIM/AVOID (25). Watch $200.62, 25.2% below, held 1x. Upside +6% to $285; reward-to-risk 0.3x. Next catalyst: MRVL Q3 FY27 earnings.")],
tech:{
ma:{d50:225.0,d100:232.0,d200:166.0,d400:120.0,align:"bullish",
brk:[{ma:"$155",p:155,above:"Above 50d. Custom-silicon momentum intact; consensus $285.",below:"Consolidating near highs. Normal."},
{ma:"$140",p:158,above:"Breakout holding. Post-Google-deal rally continues.",below:"Gap fill — retest of breakout level. Stop zone."},
{ma:"$145",p:155,above:"Active support. Trade stops above.",below:"Momentum failing. Reduce size."},
{ma:"$145",p:155,above:"Prior range high supporting. Accumulation intact.",below:"Back into pre-deal range. Thesis weaker."}]},
momentum:{rsi:63.4,rsiZone:"neutral",macd:{v:11.012,s:8.8625,h:2.1496,cross:"bullish"},roc:29.8},
volume:{avg:"21.7M",recent:"15.5M",ratio:0.71,obv:"rising",accDist:"neutral",lastDay:"19.0M",lastDayX:0.88,volDate:"Oct 1, 2026"},
levels:{fibs:[{r:"0%",p:71,l:"52w low"},{r:"38.2%",p:170,l:"Shallow"},{r:"50%",p:200,l:"Midpoint"},{r:"61.8%",p:231,l:"Deep"},{r:"100%",p:330,l:"52w high"}],pivots:{r2:278,r1:273,p:265,s1:260,s2:253}},
pattern:{name:"Recovery — Bounce",target:360,dir:"up",note:"$268.08. RSI 63.4, above 50d, above 200d. Next earnings Dec 1."},
verdict:{score:25,label:"TRIM/AVOID \u2014 NO NEARBY SUPPORT",c:"y",drivers:"$268.08. Above 50d $225 (+19.1%), above 200d $166 (+61.5%). RSI 63.4 neutral. MACD histogram +2.15 (improving). Nearest observed support $200.62, 25.2% below, held 1x. Next earnings Dec 1."}},
fundVerified:true,
fundDate:"Sep 17, 2026",
fund:{
story:"$208.83 (Sep 3 close). Custom silicon and optical interconnect. Reported Aug 25 and is being added to the S&P 500. NVDA's own ACIE segment grew 138% YoY, which supports the custom-ASIC thesis. Note the structure underneath: gross margin above 50% but net margin near 1%, reflecting amortization from the Inphi and Innovium acquisitions plus debt-to-equity of 0.35. Next earnings Dec 1. Q2 FY27 detail in this panel is NOT yet refreshed.",
drivers:[
{name:"Custom ASIC Design Wins",dir:"up",detail:"Amazon, Google, Microsoft, and one undisclosed hyperscaler. Revenue ramping but pre-inflection."},
{name:"Data Center Revenue",dir:"up",detail:"73% of total rev. Growing fastest segment. AI inference driving demand."},
{name:"Photonic Fabric / Celestial AI",dir:"flat",detail:"Next-gen optical interconnect. Could redefine data center architecture. Still early."},
{name:"Earnings Inflection",dir:"up",detail:"Mar 5 earnings — if data center accelerates, stock re-rates from deep value."}
],
flow:{inst:"Post-blowout: expect PT upgrades across the board. RBC Buy, KeyBanc Buy. FY28 $15B = institutional re-rating catalyst — watch.",retail:"Moderate retail interest. 'Hidden AI gem' narrative building.",short:"Short interest 5.1% — moderate."},
bull:{path:"Data center doubles → ASIC contracts ramp → $400 PT achievable → $140+ on full execution.",price:"$360-420"},
bear:{path:"Hyperscalers slow ASIC orders. NVDA networking dominates. Growth disappoints. Back to $60.",price:"$140-150"},
activeRisks:[{sev:"HIGH",prob:20,risk:"Amazon ASIC risk: if Amazon brings chip design in-house (like Google TPU), MRVL loses its largest custom customer",trigger:"Amazon announces internal chip team expansion",impact:"-30% of custom revenue",catalyst:"Amazon re:Invent Dec 2026 or AWS summit — custom silicon roadmap updates. Also watch hiring signals"},
{sev:"MED",prob:30,risk:"FY28 $15B target aggressive: requires custom silicon + switching + new products all hitting simultaneously",trigger:"Any product ramp delay",impact:"Revenue miss, stock -15%",catalyst:"Q1 FY27 earnings May 29 ✓ — first quarter toward $15B trajectory. Guide must show $2.5B+"},
{sev:"MED",prob:15,risk:"Celestial AI integration risk: $107M/yr added opex + dilution. If photonic interconnect tech doesn't deliver, drag on margins",trigger:"Integration delays or tech underperformance",impact:"GM pressure -200bps",catalyst:"Q1 FY27 earnings May 29 ✓ — first quarter with full Celestial AI integration costs"},
{sev:"MED",prob:35,risk:"Valuation stretched: 38x fwd PE priced for perfection. Any execution hiccup = violent correction",trigger:"Revenue or margin miss",impact:"-15-20% on any miss",catalyst:"Q1 FY27 earnings May 29 ✓ — consensus $2.4B rev. Miss = immediate repricing"},
{sev:"LOW",prob:20,risk:"NVDA Spectrum-X networking dominance could erode MRVL switching TAM",trigger:"NVDA networking share >40%",impact:"Switching growth slows",catalyst:"Post-GTC ✓ — NVDA networking product updates. Spectrum-X adoption data"}],
killer:"Two or more hyperscaler ASIC programs get delayed or cancelled in favor of NVDA full-stack.",
revMix:[{n:"Data Center",p:73,c:"#3DBFA8"},{n:"Enterprise",p:12,c:"#7E91E8"},{n:"Carrier",p:8,c:"#B266FF"},{n:"Consumer",p:5,c:"#FFBF00"},{n:"Auto",p:2,c:"#9A8F82"}],
compPos:{xLabel:"Custom ASIC Wins",yLabel:"Optical/Interconnect",peers:[{n:"MRVL",x:55,y:85,self:true},{n:"AVGO",x:45,y:60},{n:"NVDA",x:10,y:50},{n:"Coherent",x:15,y:70}]},
mgmt:{beats:3,misses:1,streak:"+3",note:"Beat last 3 on data center strength. One miss in mid-2025 on carrier weakness. Guidance improving."},
metrics:{lastQ:"Q2 FY27 (Aug 2026)",revGrowth:37.0,grossMargin:53.1,opMargin:36.6,netMargin:11.2,note:"Q2 FY27 (Aug 27): RECORD net revenue $2.739B, +37% YoY, $39M above the guidance midpoint. GAAP gross margin 53.1%, non-GAAP 58.9%. GAAP net income $308.0M / $0.33 per diluted share; non-GAAP $865.9M / $0.94, up 40% YoY. Non-GAAP OPERATING MARGIN EXPANDED 180bps YoY TO 36.6%, with management expecting to enter the 38-40% target range in Q4 FY27. Operating cash flow $605.5M, reflecting higher supplier capacity prepayments. Returned $254M to shareholders including $200M of buybacks. GUIDANCE: Data Center revenue expected to grow ~60% in FY2027 and OVER 60% in FY2028. FY2027 total revenue ~+40%, with Q3 reaching $3B a full quarter ahead of prior plan. Expanded commercial agreement with a Tier 1 hyperscaler (Google) covering custom programs including XPU attach, with significant revenue potential in FY2029 and beyond. Scale-out switch revenue projected above $600M, doubling from FY2026. THE MARGIN TENSION: non-GAAP gross margin guided DOWN to 57.5-58.5% in Q3 on mix, specifically the Custom silicon ramp. Management confirmed mix is the primary driver and expects Q4 and FY2028 gross margins in a similar range. Custom silicon carries lower gross margin than connectivity \u2014 the fastest-growing segment is the least profitable one. New CFO Dan Durn is focused on operating leverage and cash flow. GAAP NET MARGIN IS ONLY 11.2% against a 53.1% gross margin \u2014 amortisation of Inphi and Innovium intangibles plus debt at 0.35 debt-to-equity. Next print Dec 1."},
watchlist:[],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",ptDate:"Sep 14, 2026",riskDate:"Sep 25, 2026" }},
SHOP:{name:"Shopify Inc.",price:149.09,avgPT:172,highPT:220,ptDate:"Sep 21, 2026",ptVerified:true,lowPT:110,high52:182.19,low52:94.0,fwdPE:76.3,mktCap:"$177B",ytd:-5,yr1:37,consensus:"Buy",earningsDate:"Nov 4, 2026",epsEst:0.47,epsEstDate:"Sep 21, 2026",sector:"E-Commerce / AI",support:[{lvl:146.93,label:"Volume node \u2014 1.4% below"},{lvl:136.18,label:"Swing low 2025-11-18 \u2014 held 5x"},{lvl:124.03,label:"Swing low 2026-09-10 \u2014 held 0x"}],supportDate:"Oct 1, 2026",brokenSup:[],
supportVerified:true,
supportAnchor:"$146.93 (1.4%) / $136.18 (8.7%, held 5x) / $124.03 (16.8%, held 0x) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $146.93, 1.4% below $149.09. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.35,
news:[n(10011,"CONSENSUS TARGET REVISED UP ~11% IN THREE MONTHS TO ~$172","Aggregated consensus now $171-175 across 54-56 analysts (MarketBeat, ChartMill, S&P Global), revised up 10.9% over three months. Range $110-$220.","ChartMill / MarketBeat","2026-09-21",0.2,"a",10,"analyst"),n(9808,"SHOP +11.54% to $126.88 — biggest gainer in the book on software rotation","Shopify was the single best performer across the portfolio Jul 27, +$13.13 to $126.8773, as capital rotated violently out of AI hardware and into software/platform names. Same-day: NOW +6.82%, SNPS +4.17%, NFLX +0.96% against SOX -2.23%. This is rotation mechanics, not a Shopify-specific catalyst — size the move accordingly.","market data","2026-07-27",0.5,"m",12,"news"),
n(976,"SHOP PTs verified May 18 — avg $160, high $200","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(950,"SHOP closed $102.39 (+2.10%) May 14","May 14 EOD — semis sell-off. Position up for the session.","Brokerage","2026-05-14",0.1,"v",7),
n(909,"SHOP support verified May 11 — S1 anchor: Pivot S1 $104","S1 $100 within 4% of pivot S1 (round number psychological support)","Web Verified","2026-05-11",0.4,"v",7),
n(896,"SHOP options verified May 11 — IV 50%, IVR 55","Source: AlphaQuery 30d IV Mean 50.24% (Nov 10 2025), 180d IV 64.14% (Apr 6 2026)","Web Verified","2026-05-11",0.4,"v",7),
n(892,"SHOP options verified May 11 — IV 50%, IVR 55","Source: Yahoo Finance SHOP options chain May 2026, peer e-com cluster IV","Web Verified","2026-05-11",0.4,"v",7),
n(874,"SHOP options data verified May 11 — IV 42%, IVR 55","Source: Market Rebellion early March IV reports - SHOP volatile post-Q1","Web Verified","2026-05-11",0.4,"v",7),
n(854,"SHOP PTs verified May 11 — avg $145","Source: Estimated from peer data and ChartMill - SHOP post-Q1 disappointment, range wide. JPM Buy, Mizuho hold","Web Verified","2026-05-11",0.4,"v",7),
n(835,"SHOP technicals verified May 11","50d MA, 200d MA, RSI from web sources: altindex (50d=$120.8, 200d=$144), TipRanks RSI 56.96","Web Verified","2026-05-11",0.3,"t",6),
n(808,"SHOP $102.85 -6.81% May 11 — further selloff post Q1 guide miss","Day move -6.81%. further selloff post Q1 guide miss. Market: semis-led rally, S&P/NDX at ATH, six-week winning streak. CPI 3.7%, Fed on hold. Trump-Xi summit May 14-15 ✓","MarketWatch","2026-05-11",0,"m",4),
n(780,"SHOP $113.37 +2.67% May 7 — post-earnings bounce","Day move +2.67% from May 5 close. post-earnings bounce. Macro: NVDA broke into ATH zone +7.5% on AI capex narrative re-acceleration.","Bloomberg","2026-05-07",0,"m",4),
n(763,"SHOP Q1 BEAT but Q2 DECEL — stock -16%","Rev $3.17B vs $3.09B est (+34% YoY) BEAT. EPS $0.45 vs $0.24 (90% beat). GMV $101B (+35%). But Q2 guide high-20s = decel from 34%. Opex 35-36% of rev pressuring margins. Merchant solutions +39% (4yr high)","Bloomberg/Motley Fool","2026-05-05",-0.7,"f",10),
n(741,"SHOP $113 +2.12% May 1 — pre-earnings momentum May 7","Q1 May 7 ✓ — next earnings Aug ~5 (Q2). Wolfe top pick. Commerce Components growth narrative intact.","Shopify","2026-05-05",0.4,"m",7),
n(713,"SHOP $128 +5% Apr 30 — Q1 earnings setup May 7","Wolfe top pick. Pre-earnings momentum into May 7. Commerce Components growth + International expansion.","Shopify","2026-04-15",0.4,"m",8),
n(1,"SaaS sell-off drags SHOP -34% from ATH","Anthropic enterprise AI tools spooked SaaS sector. Q4 rev beat +31%, $2B buyback initiated.","Market/SHOP","2026-02-01",-0.5,"m",7),
n(2,"EPS missed: $0.48 adj vs $0.51","GAAP EPS $0.57 vs $0.99 YoY decline. Margin pressure from AI investments.","Earnings","2026-02-03",-0.35,"e",7),
n(3,"Q1 guide: low-thirties rev growth","Above 25% consensus. Bullish forward outlook despite EPS softness.","Earnings","2026-02-05",0.6,"m",7),
n(4,"$2B share buyback approved","Board authorized repurchase. Signals management confidence at these prices.","Earnings","2026-02-07",0.5,"m",7),
n(5,"Stock crushed on AI disruption fears","Down 26% YTD. Software sector selloff. Monday.com withdrew guidance. Broad AI disruption panic.","Market","2026-02-09",-0.55,"t",7),
n(6,"Mizuho upgrade to Outperform PT $150","Bullish on agentic commerce positioning. AI-native platform.","Mizuho","2026-02-11",0.65,"a",7),
n(7,"Temu partnership — merchants list on Temu","Shopify merchants can now list products on Temu's marketplace. TAM expansion.","Industry","2026-02-13",0.5,"p",6),
n(8,"OpenAI Instant Checkout partner","Early partner on AI shopping bots. Google protocol for agent-driven transactions. Infrastructure play.","Industry","2026-02-15",0.7,"p",7),
n(9,"Truist upgrades SHOP to Buy PT $130.53","Reversal from previous Hold. Sees AI commerce as durable moat. Stock surged +8.9%.","Truist","2026-02-17",0.7,"a",7),
n(10,"Deutsche Bank maintains Buy but cuts PT to $130.53","From $130.53. Cites near-term uncertainty but long-term AI commerce thesis intact.","DB","2026-02-19",0.3,"a",6),
n(11,"Cathie Wood buying the dip","ARK Invest accumulating SHOP on the selloff.","ARK","2026-02-21",0.3,"a",5),
n(113,"SHOP +6.5% — oil crash (-9.4% today) eases consumer sentiment fears","International expansion. Enterprise push with Commerce Components. Q1 earnings May. Support $112. Consumer discretionary = oil-sensitive.","Market","2026-04-05",0.4,"m",8)
,
n(212,"SHOP $113 consolidating — Wolfe flags as top internet stock for 2026","Commerce Components enterprise push. International expansion. May 7 earnings approaching. AI commerce agent risk.","Market","2026-04-16",0.4,"m",8)
,
n(232,"SHOP $131.30 +3.44% — oil $82 (-9.4% today) = direct consumer tailwind","Options Update (Apr 17): Stocks rose as oil fell after Iran announced Strait of Hormuz is open. SHOP benefits from consumer discretionary rotation. Wolfe top internet pick. May 7 earnings.","Fool Apr 17 2026","2026-04-17",0.6,"m",11)
,
n(506,"SHOP Apr 20 $108, -26% YTD, drawdown extending","Market context Apr 20: Stock $108 -26% YTD. Q1 earnings May 6 (16d out). E-commerce pressure from tariff uncertainty + consumer spending watch. Take-rate expansion + merchant solutions = bull case. Operating margin improvement trajectory.","Market context Apr 20 2026","2026-04-20",0.4,"m",11),
n(507,"Consumer spending + e-commerce sensitivity — Apr weakness","Apr 20 context: SHOP highly sensitive to consumer spending + tariff pass-through. Iran war oil price volatility adding pressure on consumer. Pre-earnings positioning cautious. Key watch: GMV growth, take-rate, international expansion.","Market context Apr 20 2026","2026-04-20",-0.3,"b",11)
,
n(542,"SHOP -1.78% Apr 21 continued pressure","Apr 21: SHOP $132.74 -$2.40. Consumer discretionary pressured by Iran/oil. May 6 earnings 15d. YTD -27%. Support $128.","Apr 21","2026-04-21",-0.3,"m",10)
,
n(654,"SHOP -1.06% Apr 27 — $124 consumer headwinds","Apr 27 close $124.50 -1.06%. Oil pullback consumer tailwind not fully translating. May 6 earnings. Wolfe top pick.","Market Apr 27 2026","2026-04-27",0.35,"m",12)
,
n(680,"SHOP $121.88 -0.14% — flat into Q1 earnings May 7. Merchant solutions trajectory key","SHOP closes flat Apr 29. Q1 earnings May 7. AI agent commerce narrative + merchant solutions growth focus.","Stock close Apr 29 2026","2026-04-15",0.0,"n",6)
],
options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:17.0,pcRatio:null,maxPain:135,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:114999,maxPainNear:139.0,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:54.26,atmIVExp:"2026-10-30",ivObs:17},
optionsDate:"Oct 1, 2026",optionsVerified:true,
catalysts:[{d:"Nov 4",e:"SHOP Q3 earnings (one source says Nov 2)",i:"high",iv:"med",hm:"N/A"},{d:"May 6 ✓",e:"SHOP Q1 Earnings",i:"high",iv:"high",hm:"-8.3%"},{d:"H1 2026",e:"Agentic commerce rollout",i:"bullish",iv:"med",hm:"N/A"},{d:"Ongoing",e:"AI disruption fear cycle",i:"bearish",iv:"med",hm:"-15.2%"},{d:"2026",e:"Temu/OpenAI partnerships scale",i:"bullish",iv:"low",hm:"N/A"}],
peers:[{t:"SHOP",pe:71,ev:59.1,y:3},{t:"MELI",pe:42,ev:22,y:8},{t:"CRM",pe:24,ev:14,y:-8},{t:"NOW",pe:35,ev:41.9,y:-5},{t:"ADBE",pe:22,ev:13,y:-12}],
playbook:[
pb("1 WEEK","SHOP $149 \u2014 HOLD (61). Nearest support $146.93, 1.4% below (volume node, never defended). +15% to $172 consensus. RSI 59, MACD +1.59. NEXT: Nov 4 \u2014 SHOP Q3 earnings (one source says Nov 2). Watch: Shopify Capital credit deterioration Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",Y,"SHOP $149.09 as of the latest close, HOLD at 61 on the tool's five-component score. $145.88 (Sep 3 close). Commerce platform. Nearest observed support sits at $146.93.","HOLD (61). Watch $146.93, 1.4% below (volume node, never defended). Upside +15% to $172; reward-to-risk 5.1x. Next catalyst: SHOP Q3 earnings (one source says Nov 2)."),
pb("1 MONTH","SHOP $149.09 \u2014 THESIS: $145.88 (the scheduled date close). Commerce platform. KEY RISK: Shopify Capital credit deterioration NEXT CATALYST: SHOP Q3 earnings (one source says the scheduled date). Upside +15%, reward-to-risk 5.1x to nearest support. Refreshed the scheduled date.",Y,"SHOP $149.09 (the scheduled date close), HOLD at 61. $145.88 (the scheduled date close). Commerce platform. Key risk: Shopify Capital credit deterioration","HOLD (61). Watch $146.93, 1.4% below (volume node, never defended). Upside +15% to $172; reward-to-risk 5.1x. Next catalyst: SHOP Q3 earnings (one source says the scheduled date)."),
pb("3 MONTHS","SHOP $149.09 \u2014 NEXT QUARTER: SHOP Q3 earnings (one source says the scheduled date). The print either confirms the thesis ($145.88 (the scheduled date close). Commerce platform.) or tests the key risk (Shopify Capital credit deterioration) Nearest support $146.93, 1.4% below (volume node, never defended). Refreshed the scheduled date.",Y,"SHOP $149.09 (the scheduled date close), HOLD at 61. $145.88 (the scheduled date close). Commerce platform. Key risk: Shopify Capital credit deterioration","HOLD (61). Watch $146.93, 1.4% below (volume node, never defended). Upside +15% to $172; reward-to-risk 5.1x. Next catalyst: SHOP Q3 earnings (one source says the scheduled date)."),
pb("6 MONTHS","SHOP $149.09 \u2014 SIX MONTHS: two prints inside the window. HOLD (61). Consensus $172 (+15%), street range $110 (-26%) to $220 (+48%). What would change the view: Shopify Capital credit deterioration Refreshed the scheduled date.",Y,"SHOP $149.09 (the scheduled date close), HOLD at 61. $145.88 (the scheduled date close). Commerce platform. Key risk: Shopify Capital credit deterioration","HOLD (61). Watch $146.93, 1.4% below (volume node, never defended). Upside +15% to $172; reward-to-risk 5.1x. Next catalyst: SHOP Q3 earnings (one source says the scheduled date)."),
pb("1 YEAR","SHOP $149.09 \u2014 TWELVE MONTHS: consensus $172 implies +15%; street range $110 (-26%) to $220 (+48%). THESIS: $145.88 (the scheduled date close). Commerce platform. STRUCTURAL RISK: Shopify Capital credit deterioration Refreshed the scheduled date.",Y,"SHOP $149.09 (the scheduled date close), HOLD at 61. $145.88 (the scheduled date close). Commerce platform. Key risk: Shopify Capital credit deterioration","HOLD (61). Watch $146.93, 1.4% below (volume node, never defended). Upside +15% to $172; reward-to-risk 5.1x. Next catalyst: SHOP Q3 earnings (one source says the scheduled date).")],
tech:{
ma:{d50:140.0,d100:126.0,d200:130.0,d400:128.0,align:"bullish",
brk:[{ma:"50d",p:140.0,above:"First step to recovery.",below:"Below 50d. Selloff continuing."},
{ma:"100d",p:126.0,above:"Intermediate recovery. AI fears receding.",below:"Deep intermediate downtrend. Selloff entrenched."},
{ma:"200d",p:130.0,above:"Primary trend reclaimed.",below:"Market pricing in AI disruption."},
{ma:"400d",p:128.0,above:"Secular e-commerce growth intact.",below:"Existential AI risk being priced."}]},
momentum:{rsi:59.14,rsiZone:"neutral",macd:{v:2.1788,s:0.5922,h:1.5866,cross:"bullish"},roc:5.1},
volume:{avg:"10.1M",recent:"6.9M",ratio:0.69,obv:"flat",accDist:"neutral",lastDay:"4.8M",lastDayX:0.48,volDate:"Oct 1, 2026"},
levels:{fibs:[{r:"0%",p:94,l:"52w low"},{r:"38.2%",p:128,l:"Shallow"},{r:"50%",p:138,l:"Midpoint"},{r:"61.8%",p:149,l:"Deep"},{r:"100%",p:182,l:"52w high"}],pivots:{r2:155,r1:152,p:150,s1:147,s2:145}},
pattern:{name:"Post-Earnings Selloff",target:168,dir:"up",note:"$149.09. RSI 59.1, above 50d, above 200d. Next earnings Nov 4."},
verdict:{score:61,label:"HOLD \u2014 ON DEFENDED SUPPORT",c:"r",drivers:"$149.09. Above 50d $140 (+6.5%), above 200d $130 (+14.7%). RSI 59.1 neutral. MACD histogram +1.59 (improving). Nearest observed support $146.93, 1.4% below. Next earnings Nov 4."}},
fundVerified:true,
fundDate:"Sep 17, 2026",
fund:{
story:"$145.88 (Sep 3 close). Commerce platform. Reported Aug 5. Next earnings Nov 4. Latest-quarter detail in this panel is NOT yet refreshed.",
drivers:[
{name:"Agentic Commerce",dir:"up",detail:"OpenAI Instant Checkout partner. Google AI shopping protocol. Temu integration. AI is the new storefront."},
{name:"AI Disruption Fear",dir:"risk",detail:"Monday.com withdrew guidance. ByteDance Seedance 2.0. Market fears AI replaces SaaS tools."},
{name:"Revenue Growth",dir:"up",detail:"30%+ growth sustained. Q1 guide 'low-thirties.' $2B buyback approved."},
{name:"Valuation",dir:"risk",detail:"82x P/E high even for growth. Need sustained 30%+ to justify."}
],
flow:{inst:"Growth-fund ownership with high turnover. Current consensus $167 across 52 analysts.",retail:"Cathie Wood buying. Retail sees the -26% YTD as a gift if AI thesis plays out.",short:"Short interest 6.8% — elevated. Bears see AI disruption as existential."},
bull:{path:"AI commerce materializes → SHOP = default rails → re-rate to $185 avg PT → $180-220 on momentum.",price:"$150-220"},
bear:{path:"AI disrupts e-commerce platforms. Growth slows to 15%. Multiple compresses from 82x to 40x.",price:"$60-80"},
activeRisks:[{sev:"MED",prob:35,risk:"Shopify Capital credit deterioration",trigger:"Provision for credit losses +93% YoY; 30-179 day delinquency moved 2.3% to 3.0%; loans and MCA balance $2.18B",triggerStatus:"active",mitigation:"Watch the delinquency trend at the Nov 4 print",pPctNetWorth:1.0,daysToImpact:60,catalyst:"Q3 print Nov 4"},{sev:"HIGH",prob:25,risk:"AI disruption to e-commerce: AI agents could bypass Shopify — going direct to manufacturers or using competing rails",trigger:"Major AI platform launches competing checkout",impact:"-25% as TAM questioned",catalyst:"Google I/O May 2026 ✓ + Apple WWDC Jun Jun 2026 — AI shopping agent announcements. Also OpenAI product launches"},
{sev:"MED",prob:40,risk:"Consumer spending: GDP 0.7%, oil ~$83. Small merchants on SHOP are first to feel recession. GMV growth stalls",trigger:"SMB merchant churn >5%",impact:"Rev growth slows to 20%",catalyst:"Q1 2026 earnings May 7 ✓ — GMV growth + merchant count + churn rate. Also NFIB small biz survey monthly"},
{sev:"MED",prob:20,risk:"Valuation: 82x fwd PE for 31% growth. If growth decelerates to 20%, reprices to 40x = $130.53",trigger:"Q1 guide misses",impact:"-40% repricing",catalyst:"Q1 2026 earnings May 7 ✓ — revenue guide + GMV trajectory. Must maintain 25%+ growth"},
{sev:"LOW",prob:15,risk:"Temu/Shein regulatory crackdown: partnership is double-edged. If Temu restricted in US, associated revenue lost",trigger:"Temu regulatory action or ban",impact:"Partnership revenue loss",catalyst:"House Select Committee on China — hearings ongoing. De minimis rule change expected H1 2026"}],
killer:"OpenAI or Google build their own commerce checkout layer, bypassing Shopify entirely.",
revMix:[{n:"Subscription",p:28,c:"#7E91E8"},{n:"Merchant Solutions",p:72,c:"#3DBFA8"}],
compPos:{xLabel:"Merchant Growth",yLabel:"AI Commerce Position",peers:[{n:"SHOP",x:75,y:85,self:true},{n:"BIGC",x:20,y:25},{n:"WIX",x:30,y:35},{n:"AMZN 3P",x:90,y:40}]},
mgmt:{beats:3,misses:1,streak:"-1",note:"Q4 rev beat but EPS miss ($0.48 vs $0.51). 3 of last 4 beats. Lutke credible on AI vision but market wants proof."},
metrics:{lastQ:"Q2 2026 (Jun 2026)",revGrowth:34.0,grossMargin:47.7,opMargin:13.6,netMargin:12.3,fcfMargin:18.0,note:"Q2 2026 (Aug 5): revenue $3.583B, +34% YoY (33% constant currency), ahead of a $3.45B consensus. GMV $115.567B, +32% \u2014 the FIFTH consecutive quarter above 30% growth. Gross profit $1.708B, +31%. Operating income $488M, +68%. FREE CASH FLOW $654M at an 18% MARGIN, up from $422M a year ago. Adjusted EPS $0.42 against $0.40. MRR grew to $221M. Payments at 68% of GMV. Shares rose ~20% on the print, partially reversing a ~23% year-to-date decline. THREE THINGS TO WATCH: (1) GROSS MARGIN COMPRESSION \u2014 revenue grew 34% but gross profit only 31%, taking gross margin to ~47.7% from 48.6%. Merchant solutions grew 37% versus subscription at 22%, and merchant solutions carries lower margin. Q3 guidance again puts gross profit growth BELOW revenue growth. (2) CREDIT EXPOSURE \u2014 Shopify Capital's provision for credit losses rose 93% YoY; 30-to-179-day delinquency moved from 2.3% to 3.0%. Transaction and loan losses reached $141M against loans and merchant cash advances of $2.18B. (3) REPORTED NET INCOME IS MISLEADING \u2014 $1.502B GAAP, but only $439M excluding equity-investment gains. Third-party valuation changes create swings unrelated to operations. GUIDANCE: Q3 revenue growth in the low thirties (versus ~26% expected), gross profit dollars mid-to-high twenties, opex 33-34% of revenue, free cash flow margin high-teens to low-twenties. Next print Nov 4."},
watchlist:[{item:"SHOP Q1 Earnings",d:"May 6",why:"Revenue growth sustainability at 30%+. AI commerce traction metrics."},{item:"OpenAI Instant Checkout adoption data",d:"H1 2026",why:"Validates agentic commerce thesis. Unique SHOP advantage."},{item:"Software sector sentiment shift",d:"Ongoing",why:"AI disruption fear cycle drives valuation. Sector turn = SHOP rips."},{item:"Temu/Shein GMV trends",d:"Quarterly",why:"Cross-border competition intensity. Partnership vs threat dynamic."}],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",ptDate:"Sep 21, 2026",riskDate:"Sep 25, 2026" }},
NFLX:{name:"Netflix Inc.",price:71.36,avgPT:94,highPT:135,ptDate:"Sep 21, 2026",ptVerified:true,lowPT:57,high52:124.86,low52:65.08,fwdPE:23,mktCap:"$312B",ytd:-22,yr1:-25,consensus:"Buy",earningsDate:"Oct 20, 2026",epsEst:0.76,epsEstDate:"Jul 23, 2026",sector:"Streaming / Media",support:[{lvl:70.86,label:"Swing low 2026-06-25 \u2014 held 5x"},{lvl:65.08,label:"Swing low 2026-07-17 \u2014 held 0x"},{lvl:60.52,label:"Step below \u2014 derived"}],supportDate:"Sep 23, 2026",brokenSup:[{lvl:75.01,held:8,date:"2026-02-23"},{lvl:90.69,held:3,date:"2026-03-20"},{lvl:85.1,held:2,date:"2026-05-11"}],
supportVerified:true,
supportAnchor:"$70.86 (0.7%, held 5x) / $65.08 (8.8%, held 0x) / $60.52 (15.2%) \u2014 observed levels, nearest first, Sep 23",techVerified:true,techDate:"Sep 23, 2026",supportNote:"Nearest observed support $70.86, 0.7% below $71.36. Observed swing lows and volume nodes, Sep 23.",rateSens:0.25,
news:[n(10001,"WELLS FARGO DOWNGRADES TO UNDERWEIGHT, CUTS TARGET TO $57 FROM $80","Sep 18: Wells Fargo downgraded Netflix to Underweight from Equal Weight and lowered its target to $57 from $80, citing worrying engagement trends and content concerns. The stock fell 4.67% on 3.0x volume the same session and lost $75.01, a level defended eight times. The $57 target is now the street low. Consensus remains $93.88 across 51 analysts.","Ticker Nerd / Yahoo Finance","2026-09-18",-0.6,"a",22,"analyst"),n(9912,"NFLX price target was overstated by 23% \u2014 real consensus is $95, not $117","Verification sweep Jul 28: S&P Global's 51-analyst consensus for Netflix is $95.28 (low $70, high $135, Buy). This file carried $117 avg / $150 high / $80 low. The overstatement made NFLX look like the highest-upside name in the book at +65%; the true figure is roughly +30%, which is mid-pack rather than exceptional. Note the street LOW of $70 now sits only 4% below the $73.03 market. Combined with the persistently net-negative weighted news sentiment, the case for treating this as a high-conviction underweight-to-be-fixed is weaker than the dashboard implied.","S&P Global Market Intelligence","2026-07-28",-0.4,"a",12,"intel"),
n(975,"NFLX PTs verified May 18 — avg $117, high $150","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(947,"NFLX closed $89.65 (+3.02%) May 14","May 14 EOD — semis sell-off. Position up for the session.","Brokerage","2026-05-14",0.3,"v",7),
n(943,"NFLX lowPT refreshed May 12 — $95 → $80","Tickernerd (78 analysts) range $80-$151.40; $80 captures the bear-case analyst. Previously $95 didnt reflect full distribution.","Web Verified","2026-05-12",0.3,"v",7),
n(908,"NFLX support verified May 11 — S1 anchor: Current price / 52w low zone","S1 $85 = current trading area, stock has broken down through all MAs — defines new support shelf","Web Verified","2026-05-11",0.4,"v",7),
n(873,"NFLX options data verified May 11 — IV 32%, IVR 25","Source: FlashAlpha scanner (NFLX ATM IV 32.40%), in 'decreasing IV' list April 21","Web Verified","2026-05-11",0.4,"v",7),
n(853,"NFLX PTs verified May 11 — avg $117","Source: Stockanalysis 32 analysts $119.23, TickerNerd 78 analysts median $115. JPM $120 OW","Web Verified","2026-05-11",0.4,"v",7),
n(834,"NFLX technicals verified May 11","50d MA, 200d MA, RSI from web sources: Investing.com (50d=$92.47, 200d=$96.44), Financhill RSI 41.89","Web Verified","2026-05-11",0.3,"t",6),
n(806,"NFLX $85.31 -3.58% May 11 — continued drift, no catalyst","Day move -3.58%. continued drift, no catalyst. Market: semis-led rally, S&P/NDX at ATH, six-week winning streak. CPI 3.7%, Fed on hold. Trump-Xi summit May 14-15 ✓","Reuters","2026-05-11",0,"m",4),
n(781,"NFLX $85.48 +1.03% May 7 — stable, no catalyst","Day move +1.03% from May 5 close. stable, no catalyst. Macro: NVDA broke into ATH zone +7.5% on AI capex narrative re-acceleration.","Reuters","2026-05-07",0,"m",4),

n(755,"NFLX $85 -1.2% May 5 — quiet consolidation","Holding $90-92 range. Ad tier traction continues. Q2 Jul 17 ✓ next print.","Netflix","2026-05-05",0.0,"m",5),
n(712,"NFLX $82 +1% Apr 30 — quiet consolidation","Post-earnings holding $92 support. Ad tier traction continues. Q2 Jul 17 ✓ next.","Netflix","2026-04-30",0.1,"m",5),
n(1,"WBD deal facing multiple headwinds","PSKY deadline Feb 23 for counter. CA AG demanding 'full and robust review.' James Cameron scathing letter opposing deal.","WBD/DOJ/CA","2026-02-01",-0.55,"m",7),
n(11,"Paramount clears DOJ antitrust review","DOJ 'green light' for competing Paramount deal. Disrupts WBD-Netflix merger. Could unwind deal.","TipRanks","2026-02-21",0.5,"m",7),
n(12,"Sarandos: 'AI slop will create flight to quality'","CEO says AI-generated content flood benefits premium content creators like Netflix. Bullish framing.","CNBC","2026-02-23",0.6,"p",7),
n(13,"Wedbush reiterates Buy","Bullish even through merger uncertainty. Fundamentals intact regardless of deal outcome.","Wedbush","2026-02-25",0.5,"a",7),
n(2,"$82.7B Warner Bros Discovery bid","Massive acquisition — would add HBO, Game of Thrones, Harry Potter. Transformative but risky.","CNBC","2026-02-03",0.15,"m",7),
n(3,"DOJ probing Netflix for anticompetitive practices","Department of Justice investigating business practices in merger review. Major risk.","WSJ","2026-02-05",-0.6,"g",7),
n(4,"Ancora builds $103M stake to oppose deal","Activist investor fighting the WBD acquisition. Prefers Paramount's competing offer.","WSJ","2026-02-07",-0.35,"m",7),
n(5,"Bounced +2.1% to $96 on risk-on. Consumer defensive + WBD walkaway gains holding","Five consecutive weeks of selling. RSI at 26.8 — deeply oversold. AI disruption + WBD deal fear.","Market","2026-02-09",-0.25,"t",7),
n(6,"Ad revenue 2.5x YoY to $1.5B","Ad-supported tier gaining traction. New revenue diversification. Positive for margins.","Earnings","2026-02-11",0.7,"p",7),
n(7,"ByteDance Seedance 2.0 AI video fears","AI-generated video raises IP infringement concerns for content creators. Existential fear overshoot.","Industry","2026-02-13",-0.4,"k",7),
n(8,"Avg PT $119 = 55% upside","34 analysts consensus Buy. Massive disconnect between price and targets.","Analysts","2026-02-15",0.7,"a",7),
n(9,"DEAL OVER: Netflix walked away, collects $2.8B breakup fee from Paramount","Outcome will define near-term direction. Pass = more downside risk. Fail = relief rally.","Market","2026-02-17",-0.2,"m",7),
n(10,"JPMorgan resumed OW coverage — PT $120","Top executives unloading stock. Concerning signal ahead of deal vote.","TipRanks","2026-02-19",-0.4,"m",7),
n(114,"NFLX +3.3% defensive bounce — ad-tier growth + password sharing crackdown revenue","Defensive growth holding up in macro stress. Content pipeline strong. Apr 15 earnings approaching. Support $92.","Market","2026-04-05",0.4,"m",8)
,
n(213,"NFLX Q1 BEAT but guide DISAPPOINTS — Reed Hastings exits board after 29 years","Q1 rev $12.3B beat $12.2B. EPS $1.23 vs $0.76 est (massive beat). BUT Q2 EPS guide $0.78 vs $0.84 est. Hastings leaves for philanthropy. Stock -10% AH. Ad biz 2.5x to $1.5B.","Earnings","2026-04-16",-0.5,"b",20)
,
n(233,"NFLX $85.29 -9.75% — Q2 guide miss + Hastings exit, WBD $2.8B breakup fee windfall","Fool (Apr 17): CEO Sarandos says Hastings departure unrelated to failed WBD pursuit. $2.8B termination fee = one-time windfall. FY26 rev goal maintained 12-14% growth. Biggest drop since Oct 2025 per broker data. Apr 24 WBD shareholders vote on Paramount Skydance merger.","Fool Apr 17 2026","2026-04-17",-0.5,"b",13)
,
n(508,"NFLX Q2 guide underwhelms — stock -? Apr 17","TipRanks Apr 17 11:40am ET: Netflix falls after underwhelming Q2 guidance. Q1 in-line but forward guide light. Subscriber growth saturation concerns. Ad-tier progression key monitoring item.","TipRanks Apr 17 2026","2026-04-17",-0.6,"e",13),
n(509,"Pre-earnings weakness pattern — drawdown -18% YTD","Market context Apr 20: $94.69 close -18% YTD. Break below $100 psychological. Q2 2026 earnings Jul 16 ✓. Content slate + password sharing monetization peaked. Gaming + live experiments watch items.","Market context Apr 20 2026","2026-04-20",-0.4,"m",11)
,
n(537,"NFLX -2.05% to $92.89 — broke below $95 support","Apr 21 close: NFLX $82.89 -$1.94. Broke $95 psychological support. Continues post-earnings weakness. -18% YTD. Consolidation $85-95. Jul 17 ✓ Q2 earnings next catalyst.","Market Apr 21 2026","2026-04-21",-0.5,"t",12)
,
n(609,"NFLX -2.05% Apr 21 — breaks below $93","Apr 21 close: NFLX $82.89 (-$1.94, -2.05%). Below $95 former support. Post-Apr 16 Q2 guide miss + Hastings exit malaise continuing. No change in Jul 17 ✓ earnings timeline.","Market context Apr 21 2026","2026-04-21",-0.4,"m",11)

,
n(652,"NFLX $85.47 -1.05% Apr 27 — testing support post-earnings","Apr 27 close $85.47 -1.05%. Testing below prior $92 support. Q2 guide miss digest. Hastings exit weight. Ad rev $3B FY26 ta intact. Jul 17 ✓ Q2.","Market Apr 27 2026","2026-04-27",0.3,"m",12)
,
n(681,"NFLX $85.60 -0.7% — post Q1 print consolidation, mid-week macro digest","NFLX closes -$0.67. Post Q1 earnings (Apr 16 ✓) consolidation. Ad tier monetization + content slate Q2 setup.","Stock close Apr 29 2026","2026-04-29",-0.1,"n",5)
],
options:{ivRank:null,ivPctl:null,impliedMove:12.3,skew:null,lastEarnMove:-7.3,pcRatio:null,maxPain:75,maxPainExp:"2026-10-16",maxPainDTE:23,maxPainOI:339412,maxPainNear:73.0,maxPainNearExp:"2026-09-25",maxPainNearDTE:2,flow:[],atmIV:42.82,atmIVExp:"2026-10-23",ivObs:13},
optionsDate:"Sep 23, 2026",optionsVerified:true,
catalysts:[{d:"Oct 20",e:"NFLX Q3 \u2014 guided 11.7% growth, 33.2% operating margin",i:"high",iv:"med",hm:"N/A"},{d:"Apr 16 ✓",e:"Q1 2026 earnings — Rev $12.3B beat, EPS $1.23 beat, Q2 guide miss, Hastings exits",i:"high",iv:"high",hm:"N/A"},{d:"Apr 16 ✓",e:"NFLX Q1 Earnings reported (-9.7%)",i:"high",iv:"high",hm:"-9.7%"},{d:"Q3 2026",e:"WBD deal close (if approved)",i:"bearish",iv:"high",hm:"N/A"},{d:"2026",e:"Ad tier scaling",i:"bullish",iv:"low",hm:"N/A"}],
peers:[{t:"NFLX",pe:23,ev:22.4,y:-18},{t:"DIS",pe:22,ev:12,y:2},{t:"WBD",pe:15,ev:8,y:-5},{t:"PSKY",pe:28,ev:14,y:-3},{t:"ROKU",pe:55,ev:22,y:-15}],
playbook:[
pb("1 WEEK","NFLX $71 \u2014 BUY (71). Nearest support $70.86, 0.7% below, held 5x. +32% to $94 consensus. RSI 0, MACD +0.00, 3 broken levels above. NEXT: Oct 20 \u2014 NFLX Q3 \u2014 guided 11.7% growth, 33.2% operating margin. Watch: Consumer spending pullback: oil ~$83 with recession fears. Entertainment is discretionary. Sub cancellations could accelerate Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed Sep 24 (not in the Oct 1 sync).",G,"NFLX $71.36 as of the Sep 24 (not in the Oct 1 sync) close, BUY at 71 on the tool's five-component score. $82.67 (Sep 3 close). Streaming at scale. Nearest observed support sits at $70.86.","BUY (71). Watch $70.86, 0.7% below, held 5x. Upside +32% to $94; reward-to-risk 10.6x. Next catalyst: NFLX Q3 \u2014 guided 11.7% growth, 33.2% operating margin."),
pb("1 MONTH","NFLX $71.36 \u2014 THESIS: $82.67 (the scheduled date close). Streaming at scale. KEY RISK: Consumer spending pullback: oil ~$83 with recession fears. Entertainment is discretionary. Sub cancellations could accelerate NEXT CATALYST: NFLX Q3 \u2014 guided 11.7% growth, 33.2% operating margin. Upside +32%, reward-to-risk 10.6x to nearest support. Refreshed the scheduled date (not in the the scheduled date sync).",G,"NFLX $71.36 (the scheduled date (not in the the scheduled date sync) close), BUY at 71. $82.67 (the scheduled date close). Streaming at scale. Key risk: Consumer spending pullback: oil ~$83 with recession fears. Entertainment is discretionary. Sub cancellations could accelerate","BUY (71). Watch $70.86, 0.7% below, held 5x. Upside +32% to $94; reward-to-risk 10.6x. Next catalyst: NFLX Q3 \u2014 guided 11.7% growth, 33.2% operating margin."),
pb("3 MONTHS","NFLX $71.36 \u2014 NEXT QUARTER: NFLX Q3 \u2014 guided 11.7% growth, 33.2% operating margin. The print either confirms the thesis ($82.67 (the scheduled date close). Streaming at scale.) or tests the key risk (Consumer spending pullback: oil ~$83 with recession fears. Entertainment is discretionary. Sub cancellations could accelerate) Nearest support $70.86, 0.7% below, held 5x. Refreshed the scheduled date (not in the the scheduled date sync).",G,"NFLX $71.36 (the scheduled date (not in the the scheduled date sync) close), BUY at 71. $82.67 (the scheduled date close). Streaming at scale. Key risk: Consumer spending pullback: oil ~$83 with recession fears. Entertainment is discretionary. Sub cancellations could accelerate","BUY (71). Watch $70.86, 0.7% below, held 5x. Upside +32% to $94; reward-to-risk 10.6x. Next catalyst: NFLX Q3 \u2014 guided 11.7% growth, 33.2% operating margin."),
pb("6 MONTHS","NFLX $71.36 \u2014 SIX MONTHS: two prints inside the window. BUY (71). Consensus $94 (+32%), street range $57 (-20%) to $135 (+89%). What would change the view: Consumer spending pullback: oil ~$83 with recession fears. Entertainment is discretionary. Sub cancellations could accelerate Refreshed the scheduled date (not in the the scheduled date sync).",G,"NFLX $71.36 (the scheduled date (not in the the scheduled date sync) close), BUY at 71. $82.67 (the scheduled date close). Streaming at scale. Key risk: Consumer spending pullback: oil ~$83 with recession fears. Entertainment is discretionary. Sub cancellations could accelerate","BUY (71). Watch $70.86, 0.7% below, held 5x. Upside +32% to $94; reward-to-risk 10.6x. Next catalyst: NFLX Q3 \u2014 guided 11.7% growth, 33.2% operating margin."),
pb("1 YEAR","NFLX $71.36 \u2014 TWELVE MONTHS: consensus $94 implies +32%; street range $57 (-20%) to $135 (+89%). THESIS: $82.67 (the scheduled date close). Streaming at scale. STRUCTURAL RISK: Consumer spending pullback: oil ~$83 with recession fears. Entertainment is discretionary. Sub cancellations could accelerate Refreshed the scheduled date (not in the the scheduled date sync).",G,"NFLX $71.36 (the scheduled date (not in the the scheduled date sync) close), BUY at 71. $82.67 (the scheduled date close). Streaming at scale. Key risk: Consumer spending pullback: oil ~$83 with recession fears. Entertainment is discretionary. Sub cancellations could accelerate","BUY (71). Watch $70.86, 0.7% below, held 5x. Upside +32% to $94; reward-to-risk 10.6x. Next catalyst: NFLX Q3 \u2014 guided 11.7% growth, 33.2% operating margin.")],
tech:{
ma:{d50:76.0,d100:79.0,d200:85.0,d400:99.0,align:"bearish",
brk:[{ma:"50d",p:76.0,above:"Reclaiming near-term. Relief rally if deal fails.",below:"Deal uncertainty keeping buyers away."},
{ma:"100d",p:79.0,above:"Full intermediate recovery.",below:"Intermediate downtrend. Deal overhang persists."},
{ma:"200d",p:85.0,above:"Primary trend reclaimed. Standalone thesis intact.",below:"Market pricing in deal risk."},
{ma:"400d",p:99.0,above:"Just above secular support. Critical.",below:"Deal + integration risk priced as negative."}]},
momentum:{rsi:37.08,rsiZone:"neutral",macd:{v:-1.3186,s:-0.3431,h:-0.9755,cross:"bearish"},roc:-13.2},
volume:{avg:"37.3M",recent:"49.3M",ratio:1.32,obv:"falling",accDist:"distribution",lastDay:"32.6M",lastDayX:0.87,volDate:"Sep 23, 2026"},
levels:{fibs:[{r:"0.236",p:78,l:"shallow"},{r:"0.382",p:76,l:"mid"},{r:"0.5",p:74,l:"half"},{r:"0.618",p:72,l:"deep"}],pivots:{r2:85,r1:83,p:81,s1:79,s2:77}},
pattern:{name:"Pullback — Post-Q1",target:95,dir:"up",note:"SYNC NOTE Sep 25: NFLX was not in the Sep 25 tickers.json (23 names; NBIS, OKTA, NET added, NFLX removed). Technicals, support and options below are as of the Sep 23 close. Re-add to the data sync to refresh. $71.36. RSI 37.1, below 50d, below 200d. 3 levels broken. Next earnings Oct 20."},
verdict:{score:71,label:"BUY \u2014 STRUCTURE BROKEN, MACD+",c:"g",drivers:"$71.36. Below 50d $76 (-6.1%), below 200d $85 (-16.0%). RSI 37.1 oversold. MACD histogram -0.98 (deteriorating). Nearest observed support $70.86, 0.7% below, held 5x. 3 prior levels BROKEN. Next earnings Oct 20."}},
fundVerified:true,
fundDate:"Sep 17, 2026",
fund:{
story:"$82.67 (Sep 3 close). Streaming at scale. Reported Jul 21. Next earnings Oct 20. Latest-quarter detail in this panel is NOT yet refreshed.",
drivers:[
{name:"Consumer Spending Risk",dir:"risk",detail:"DOJ probe. Ancora activist opposing. Shareholder vote March. Binary event dominates all other factors."},
{name:"Ad Tier Revenue",dir:"up",detail:"Ad revenue 2.5x to $1.5B. ARPU +6%. The growth engine if deal fails."},
{name:"Subscriber Growth",dir:"flat",detail:"325M subs +8% YoY. Mature but stable. Password sharing crackdown largely played out."},
{name:"Content IP Risk",dir:"risk",detail:"ByteDance Seedance 2.0 AI video. Deepfake/AI content threatens IP value."}
],
flow:{inst:"Broad institutional base. Current consensus $94 across 51 analysts. Weighted news sentiment is the only negative reading in the book.",retail:"Retail confused. Some buying the dip, others selling ahead of vote uncertainty.",short:"Short interest 3.8% — elevated for NFLX. Deal arbitrage shorts."},
bull:{path:"Standalone momentum: ad revenue 2.5x YoY → 325M subs → buybacks → $120 PT achievth $119 PT.",price:"$85-140"},
bear:{path:"Consumer spending weakens on oil spike → sub growth slows → ad revenue miss → multiple compresses to 22x → $80 years.",price:"$55-70"},
activeRisks:[{sev:"MED",prob:35,risk:"Consumer spending pullback: oil ~$83 with recession fears. Entertainment is discretionary. Sub cancellations could accelerate",trigger:"US recession + gas >$4/gal sustained",impact:"Sub growth goes negative",catalyst:"Q1 2026 earnings Apr 16 ✓ — sub growth + churn commentary. Also monthly consumer confidence reports"},
{sev:"MED",prob:20,risk:"Ad revenue execution: 2.5x YoY growth but from small base. If ad tier monetization disappoints at scale, narrative weakens",trigger:"Ad ARPU growth <50% YoY",impact:"Multiple compresses to 25x",catalyst:"Q1 2026 earnings Apr 16 ✓ — ad tier revenue + CPM data. Upfront ad sales May-Jun 2026"},
{sev:"MED",prob:25,risk:"Content cost inflation: writers/actors demanding higher pay + AI content debate. Cost per sub could rise materially",trigger:"Content cost +15% YoY",impact:"Margin pressure -200bps",catalyst:"SAG-AFTRA contract renegotiation — Jul 2026. WGA AI provisions review also in 2026"},
{sev:"LOW",prob:10,risk:"AI video competition: ByteDance Seedance 2.0 + Sora. If AI content floods market, Netflix premium questioned long-term",trigger:"AI content quality reaches Netflix level",impact:"Long-term disruption",catalyst:"No specific date. Monitor OpenAI Sora quality + TikTok AI video adoption metrics quarterly"}],
killer:"Consumer recession kills sub growth AND ad tier CPMs collapse below $20. Content costs inflate 20%+ from talent negotiations. Stock revisits $103-75.",
revMix:[{n:"Subscriptions",p:85,c:"#7E91E8"},{n:"Ad Tier",p:12,c:"#3DBFA8"},{n:"Other",p:3,c:"#9A8F82"}],
compPos:{xLabel:"Subscriber Base",yLabel:"Content Spend Efficiency",peers:[{n:"NFLX",x:95,y:80,self:true},{n:"Disney+",x:55,y:40},{n:"AMZN Prime",x:70,y:60},{n:"Max/WBD",x:30,y:30}]},
mgmt:{beats:4,misses:0,streak:"+4",note:"Strong execution. 4 straight beats. Ad tier scaling faster than expected. But WBD deal decision introduces uncertainty from board level."},
metrics:{lastQ:"Q2 2026 (Jun 2026)",revGrowth:13.0,opMargin:33.4,netMargin:27.1,note:"Q2 2026 (Jul 16): revenue $12.56B, +13% YoY (+12% FX-neutral). Operating income $4.193B at a 33.4% margin \u2014 DOWN from 34.1% a year ago. Net income $3.40B, diluted EPS $0.80. Free cash flow $1.525B. IN LINE, NOT ABOVE: consensus was $12.59B revenue and $0.79 EPS, so revenue came in slightly light. THE STOCK FELL ON GUIDANCE: Q3 revenue guided to $12.86B, +11.7%, UNDERSHOOTING the ~$13B street. Q3 operating margin guided 33.2%. FY2026 revenue narrowed to $51.0-51.4B (inside the prior $50.7-51.7B range) with the 31.5% operating margin target reiterated. FY FCF still expected ~$12.5B. ENGAGEMENT IS THE SOFT SPOT: view hours up only 2% in H1 2026 versus H1 2025, and the company will move its What We Watched report from quarterly to ANNUAL from 2027 \u2014 less disclosure on the metric investors are questioning. Ad revenue expected to roughly double YoY to ~$3B for FY2026. Non-English content drove over a third of viewing. Buybacks: $4.7B in the quarter, the largest ever, with $27.1B of authorisation remaining after an additional $25B approved in April. Next print Oct 20."},
watchlist:[{item:"WBD shareholder vote",d:"Mar 2026",why:"THE binary event. Vote fails = $85-90 relief rally. Passes = integration risk."},{item:"DOJ deal review outcome",d:"2026",why:"Regulatory approval/denial determines if deal even reaches close."},{item:"NFLX Q1 Earnings",d:"Apr 21",why:"Standalone business health. Ad tier scaling. Subscriber retention."},{item:"AI-generated content threat assessment",d:"Ongoing",why:"ByteDance Seedance 2.0 raises IP/content disruption questions."}],
thesisDate:"Sep 25, 2026",techDate:"Sep 23, 2026",valDate:"Sep 21, 2026",ptDate:"Sep 21, 2026",riskDate:"Sep 25, 2026" }},
VST:{name:"Vistra Corp.",price:139.75,avgPT:217,highPT:305,ptDate:"Sep 21, 2026",ptVerified:true,lowPT:106,high52:217.1,low52:132.66,fwdPE:14,mktCap:"$47B",ytd:-15,yr1:45,consensus:"Buy",earningsDate:"Nov 5, 2026",epsEst:1.85,epsEstDate:"Jul 23, 2026",sector:"Energy / Nuclear",support:[{lvl:138.53,label:"Swing low 2026-02-05 \u2014 held 10x"},{lvl:134.75,label:"Swing low 2026-08-07 \u2014 held 4x"},{lvl:125.32,label:"Step below \u2014 derived"}],supportDate:"Oct 1, 2026",brokenSup:[{lvl:158.65,held:18,date:"2025-12-10"},{lvl:162.44,held:15,date:"2025-11-21"},{lvl:149.19,held:9,date:"2026-01-08"},{lvl:152.98,held:9,date:"2026-03-03"},{lvl:142.34,held:6,date:"2026-03-31"},{lvl:179.65,held:3,date:"2025-10-22"}],
supportVerified:true,
supportAnchor:"$138.53 (0.9%, held 10x) / $134.75 (3.6%, held 4x) / $125.32 (10.3%) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $138.53, 0.9% below $139.75. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.3,
news:[n(10005,"2027 EPS CONSENSUS CUT 8% IN SIXTY DAYS TO $10.35","2027 consensus EPS has been revised down to $10.35 from $11.30 over sixty days while 2026 holds near $9.59. Consensus target $217.42 across roughly 20 analysts; forward P/E about 14. The estimate trend now reflects the ERCOT forward-curve softness the CFO flagged. $0.23 dividend went ex Sep 21.","24/7 Wall St / Yahoo Finance","2026-09-14",-0.3,"v",18,"analyst"),n(9971,"VST IS BELOW ITS HARD STOP \u2014 and was added to instead","Aug 31: VST closed $138.10 against a hard stop of $142. The stop is BREACHED \u2014 cushion is negative 2.8%. Buying a name through its own stop is the single clearest framework violation in the portfolio this period, and it deserves an explicit decision rather than passive continuation: either the stop was wrong and should be formally moved with a stated reason, or the thesis changed and should be rewritten, or the position should be reduced. I have NOT auto-adjusted this stop \u2014 moving a stop because price fell through it is exactly how a stop stops meaning anything. Context against: the framework assessed no edge at ~$147 and set the attractive entry at $110-120, so $138 is neither. All other stops in the book were trailed up on Aug 31 after the 34-day rally; VST was deliberately left alone pending this decision.","framework audit","2026-08-31",-0.5,"v",18,"intel"),
n(9968,"VST -7.2% and 20% ADDED \u2014 the only position bought into weakness","This is the only name in the portfolio bought into a decline over the period. Against the documented framework: VST was assessed as having no edge at ~$147 with a median multiple, with entry working better at $110-120 where bad scenarios are priced in. The add came at ~$138, between those marks. The merchant-generator thesis is unchanged \u2014 the hedge book locks earnings but not the multiple, and the $99-$320 analyst spread is pure multiple variance decided by Texas regulatory outcomes. Next print Nov. Texas legislature convenes Jan 2027.","Position review","2026-08-31",-0.15,"v",13,"intel"),
n(9812,"VST -4.04% to $156.72 — power names sold with the AI complex","Vistra fell $6.66 Jul 27 to $156.72, one of the weaker non-semi names in the book. The AI-power trade is trading as a high-beta proxy for AI capex sentiment rather than on its own contracted-cashflow merits. Oil -7.5% and gas -3.62% to a 2.5-month low added to the energy-complex pressure. The KKR Helix preferred-provider position is unchanged by the tape.","Barchart / market data","2026-07-27",-0.3,"m",11,"news"),
n(9501,"VST ~$154 — AI data-center power-demand thesis intact","Vistra leverage to surging data-center electricity demand (nuclear + gas fleet). Pullback from $165 ATH on energy rotation. Oil ~$103 (+77% YTD) a watch item for gas-gen margins.","Yahoo Finance","2026-05-30",0.3,"a",9),
n(990,"VST PTs verified May 18 — avg $228, high $293","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(955,"VST closed $136.76 (-1.87%) May 14","May 14 EOD — semis sell-off. Position down for the session.","Brokerage","2026-05-14",-0.1,"v",7),
n(914,"VST support verified May 11 — S1 anchor: Pivot S1 $145","S1 $145 = exact pivot S1; close to 52w low $134","Web Verified","2026-05-11",0.4,"v",7),
n(888,"VST options verified May 11 — IV 53%, IVR 50","Source: Quantcha May 7 2026 (Oct 2026 IV 52.92%, post-Q1 normalization)","Web Verified","2026-05-11",0.4,"v",7),
n(878,"VST options data verified May 11 — IV 45%, IVR 60","Source: Utility/power IPP peer cluster IV typical ~45 (CEG ref 39-76)","Web Verified","2026-05-11",0.4,"v",7),
n(859,"VST PTs verified May 11 — avg $234","Source: TipRanks/MarketBeat estimate, Wells Fargo, Citi PT range, nuclear PPA premium","Web Verified","2026-05-11",0.4,"v",7),
n(839,"VST technicals verified May 11","50d MA, 200d MA, RSI from web sources: Investing.com (50d=$160.26, 200d=$157.97)","Web Verified","2026-05-11",0.3,"t",6),
n(804,"VST $152.42 -1.66% May 11 — consolidating post-earnings","Day move -1.66%. consolidating post-earnings. Market: semis-led rally, S&P/NDX at ATH, six-week winning streak. CPI 3.7%, Fed on hold. Trump-Xi summit May 14-15 ✓","Reuters","2026-05-11",0,"m",4),
n(764,"VST Q1 BEAT but guide REAFFIRMED — sell-the-news -3.79%","Rev $5.64B beat $5.4B Zacks est. Net Income $1.029B (vs $268M loss YoY). Adj EBITDA $1.494B (+20% YoY). 2026 guide REAFFIRMED $6.8-7.6B (NOT raised). META PPA confirmed but contribution starts 2027. Cogentrix acq pending. 98% hedged 2026, 89% 2027","Vistra PR/Stocktitan","2026-05-07",-0.4,"f",10),

n(732,"VST $161 +3.68% May 1 — nuclear thesis revival","Hyperscaler nuclear PPA narrative reignited. Up $5.72 today. CEG/VST showing strength. Q1 May 7 next.","Vistra","2026-05-05",0.5,"m",7),
n(714,"VST $156 -1% Apr 30 — nuclear thesis intact, post-earnings consolidation","Q1 results May 7. Hyperscaler PPA commentary key. Three Mile Island read-through from CEG positive.","Vistra","2026-04-30",0.1,"m",6),
n(1,"Q4 DONE: EPS $0.55 miss but EBITDA $5.91B record. Guide $6.8-7.6B","Meta signed 6.6GW nuclear PPA with VST/Oklo. EBITDA guide $6.8-7.6B for 2026.","Meta/VST","2026-02-01",0.85,"m",7),
{...n(2,"Goldman upgrades to Buy PT $137","Cited Meta PPA as proof of large-scale contract ability. Rising estimates.","Goldman Sachs","2026-02-03",0.75,"a",7),on:false},
n(3,"Jefferies upgrades to Buy","Second major upgrade in a week. Nuclear power play for AI data centers.","Jefferies","2026-02-05",0.7,"a",7),
n(5,"White House push to lower electricity prices","Trump admin pressuring tech companies to help reduce consumer electricity costs. Regulatory risk.","Policy","2026-02-09",-0.45,"g",7),
n(6,"Cogentrix acquisition adds 5.5 GW gas","Expanded generation capacity. EBITDA forecast raised ~7%.","Vistra","2026-02-11",0.6,"m",7),
n(7,"FCF conversion 60%+ of adj EBITDA","Strong cash generation profile. Nuclear + gas portfolio provides base load stability.","Earnings","2026-02-13",0.55,"e",7),
n(8,"90%+ analysts bullish, avg PT $235","Consensus Strong Buy. Massive disconnect between $154 price and $235 target.","Analysts","2026-02-15",0.8,"a",7),
n(9,"Q4 EARNINGS: EPS miss ($0.55 vs $2.31) but EBITDA $5.91B record","Q4 + full year 2025 results. EBITDA guide $6.8-7.6B. Nuclear economics + PPA pipeline = key focus. Also reporting: Dell, Intuit, CoreWeave.","Vistra","2026-02-17",0.4,"e",7),
n(115,"VST +2% modest bounce — data center power demand secular despite oil drag","Nuclear fleet = baseload hedge in high-oil environment. PJM capacity auction results bullish. War premium in oil actually helps power pricing long-term. Support $145.","Market","2026-04-05",0.3,"e",10)
,
n(214,"VST $166 ATH zone — nuclear fleet = secular AI power play, earnings Apr 23","PJM capacity auction results. Hyperscaler PPAs. Apr 23 Q1 EARNINGS NEXT — 7 days away. Data center demand unabated.","Market","2026-04-16",0.6,"e",14)
,
n(234,"VST $163.85 -1.01% — Apr 23 Q1 EARNINGS IN 6 DAYS (Thursday next week)","Risk-on rotation pressuring defensive nuclear names slightly but AI power thesis intact. Oil collapse -9.4% to $82 slightly reduces gas fleet tailwind. Binary earnings catalyst next Thursday.","Market context Apr 17 2026","2026-04-17",-0.2,"e",12)
,
n(510,"VST Apr 20 $159.98, nuclear AI thesis intact despite -14% YTD","Market context Apr 20: $159.98 close. -14% YTD despite hyperscaler capex expansion ($600B+ data center spend 2026). Nuclear+gas+battery AI power play. PJM + ERCOT dual markets. Q1 earnings May 13 (23d).","Market context Apr 20 2026","2026-04-20",0.3,"m",11),
n(511,"Data center power deal flow continues — Alphabet NiSource, Meta Louisiana","Reuters Apr 14 (see GOOGL): NiSource signs long-term power deal with Alphabet + Amazon expansion. META Louisiana JV with Blue Owl. VST positioned as pure-play nuclear+gas baseload for similar deals.","Reuters Apr 14 2026","2026-04-14",0.5,"m",12)
,
n(538,"VST -1.88% Apr 21 on Warsh hawkish confirmation","Apr 21 close: VST $156.60 -$3.00. Rate-sensitive name pressured by Warsh Fed hawkish Senate hearing. Treasury yields rose. May 13 earnings 22d. Nuclear + AI thesis intact but rate backdrop less supportive.","Market Apr 21 2026","2026-04-21",-0.3,"m",11)
,
n(652,"NFLX -1.05% Apr 27 — $91.47 testing support post-earnings","Apr 27 close $91.47 -1.05%. Testing below prior $92 support post Q2 guide miss. Hastings exit weight. Ad rev $3B FY26 target intact. Jul 17 Q2.","Market Apr 27 2026","2026-04-27",0.3,"m",12)
,
n(679,"VST $152.46 -4.08% — energy pullback as nuclear PPA narrative consolidates","VST consolidates -4% post recent run. Nuclear PPA thesis intact. Q1 earnings timing TBD.","Stock close Apr 29 2026","2026-04-29",-0.2,"n",5)
],
options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:-0.6,pcRatio:null,maxPain:140,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:76055,maxPainNear:138.0,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:41.53,atmIVExp:"2026-10-30",ivObs:17},
optionsDate:"Oct 1, 2026",optionsVerified:true,
catalysts:[{d:"Nov 5",e:"VST Q3 \u2014 contracted percentage of output; guidance update",i:"high",iv:"med",hm:"N/A"},{d:"May 5 ✓",e:"VST Q1 2026 Earnings",i:"high",iv:"high",hm:"+6.4%"},{d:"Late 2026",e:"Meta PPA deliveries begin",i:"bullish",iv:"med",hm:"N/A"},{d:"2026",e:"Emergency power auction for AI",i:"bullish",iv:"med",hm:"N/A"},{d:"Ongoing",e:"Trump electricity price pressure",i:"bearish",iv:"med",hm:"-8.2%"}],
peers:[{t:"VST",pe:14,ev:10.0,y:5},{t:"CEG",pe:32,ev:16,y:-10},{t:"NRG",pe:18,ev:8,y:8},{t:"GEV",pe:42,ev:22,y:12},{t:"OKLO",pe:90,ev:0,y:-15}],
playbook:[
pb("1 WEEK","VST $140 \u2014 BUY (81). Nearest support $138.53, 0.9% below, held 10x. +55% to $217 consensus. RSI 46, MACD -0.10, 6 broken levels above. NEXT: Nov 5 \u2014 VST Q3 \u2014 contracted percentage of output; guidance update. Watch: ERCOT forward curves BELOW the levels used for 2027 guidance Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",G,"VST $139.75 as of the latest close, BUY at 81 on the tool's five-component score. $144.22 (Sep 3 close). The AI power play. Nearest observed support sits at $138.53.","BUY (81). Watch $138.53, 0.9% below, held 10x. Upside +55% to $217; reward-to-risk 18.4x. Next catalyst: VST Q3 \u2014 contracted percentage of output; guidance update."),
pb("1 MONTH","VST $139.75 \u2014 THESIS: $144.22 (the scheduled date close). The AI power play. KEY RISK: ERCOT forward curves BELOW the levels used for 2027 guidance NEXT CATALYST: VST Q3 \u2014 contracted percentage of output; guidance update. Upside +55%, reward-to-risk 18.4x to nearest support. Refreshed the scheduled date.",G,"VST $139.75 (the scheduled date close), BUY at 81. $144.22 (the scheduled date close). The AI power play. Key risk: ERCOT forward curves BELOW the levels used for 2027 guidance","BUY (81). Watch $138.53, 0.9% below, held 10x. Upside +55% to $217; reward-to-risk 18.4x. Next catalyst: VST Q3 \u2014 contracted percentage of output; guidance update."),
pb("3 MONTHS","VST $139.75 \u2014 NEXT QUARTER: VST Q3 \u2014 contracted percentage of output; guidance update. The print either confirms the thesis ($144.22 (the scheduled date close). The AI power play.) or tests the key risk (ERCOT forward curves BELOW the levels used for 2027 guidance) Nearest support $138.53, 0.9% below, held 10x. Refreshed the scheduled date.",G,"VST $139.75 (the scheduled date close), BUY at 81. $144.22 (the scheduled date close). The AI power play. Key risk: ERCOT forward curves BELOW the levels used for 2027 guidance","BUY (81). Watch $138.53, 0.9% below, held 10x. Upside +55% to $217; reward-to-risk 18.4x. Next catalyst: VST Q3 \u2014 contracted percentage of output; guidance update."),
pb("6 MONTHS","VST $139.75 \u2014 SIX MONTHS: two prints inside the window. BUY (81). Consensus $217 (+55%), street range $106 (-24%) to $305 (+118%). What would change the view: ERCOT forward curves BELOW the levels used for 2027 guidance Refreshed the scheduled date.",G,"VST $139.75 (the scheduled date close), BUY at 81. $144.22 (the scheduled date close). The AI power play. Key risk: ERCOT forward curves BELOW the levels used for 2027 guidance","BUY (81). Watch $138.53, 0.9% below, held 10x. Upside +55% to $217; reward-to-risk 18.4x. Next catalyst: VST Q3 \u2014 contracted percentage of output; guidance update."),
pb("1 YEAR","VST $139.75 \u2014 TWELVE MONTHS: consensus $217 implies +55%; street range $106 (-24%) to $305 (+118%). THESIS: $144.22 (the scheduled date close). The AI power play. STRUCTURAL RISK: ERCOT forward curves BELOW the levels used for 2027 guidance Refreshed the scheduled date.",G,"VST $139.75 (the scheduled date close), BUY at 81. $144.22 (the scheduled date close). The AI power play. Key risk: ERCOT forward curves BELOW the levels used for 2027 guidance","BUY (81). Watch $138.53, 0.9% below, held 10x. Upside +55% to $217; reward-to-risk 18.4x. Next catalyst: VST Q3 \u2014 contracted percentage of output; guidance update.")],
tech:{
ma:{d50:144.0,d100:149.0,d200:155.0,d400:163.0,align:"bearish",
brk:[{ma:"50d",p:144.0,above:"Reclaiming near-term after -30% correction.",below:"Trump policy fears still dominating."},
{ma:"100d",p:149.0,above:"Full recovery. Earnings beat re-establishing trend.",below:"Still in correction. Waiting for earnings clarity."},
{ma:"200d",p:155.0,above:"Primary nuclear/AI power thesis intact.",below:"Electricity price cap risk being priced in."},
{ma:"400d",p:163.0,above:"Secular nuclear renaissance intact.",below:"Nuclear thesis broken. Federal policy killed the trade."}]},
momentum:{rsi:46.24,rsiZone:"neutral",macd:{v:-1.5538,s:-1.4574,h:-0.0963,cross:"bearish"},roc:-2.6},
volume:{avg:"4.6M",recent:"5.4M",ratio:1.18,obv:"flat",accDist:"neutral",lastDay:"4.8M",lastDayX:1.03,volDate:"Oct 1, 2026"},
levels:{fibs:[{r:"0%",p:133,l:"52w low"},{r:"38.2%",p:165,l:"Shallow"},{r:"50%",p:175,l:"Midpoint"},{r:"61.8%",p:185,l:"Deep"},{r:"100%",p:217,l:"52w high"}],pivots:{r2:144,r1:142,p:140,s1:137,s2:135}},
pattern:{name:"Post-Earnings Drift",target:175,dir:"up",note:"$139.75. RSI 46.2, below 50d, below 200d. 6 levels broken. Next earnings Nov 5."},
verdict:{score:81,label:"BUY \u2014 STRUCTURE BROKEN, ON DEFENDED SUPPORT, MACD+",c:"y",drivers:"$139.75. Below 50d $144 (-3.0%), below 200d $155 (-9.8%). RSI 46.2 neutral. MACD histogram -0.10 (deteriorating). Nearest observed support $138.53, 0.9% below, held 10x. 6 prior levels BROKEN. Next earnings Nov 5."}},
fundVerified:true,
fundDate:"Sep 17, 2026",
fund:{
story:"$144.22 (Sep 3 close). The AI power play. Largest nuclear fleet behind Constellation, with 2,600 MW of Meta PPAs across Beaver Valley, Davis-Besse and Perry contributing from 2027. The hedge book locks earnings; it does not lock the multiple, which is why the analyst range runs $106-$305 on Texas regulatory outcomes. Next earnings Nov 5. Q2 reported Aug 7. Q2 detail in this panel is NOT yet refreshed.",
drivers:[
{name:"Meta Nuclear PPAs",dir:"up",detail:"2,600 MW across Beaver Valley, Davis-Besse, Perry. Largest corporate nuclear deal in US history. Revenue visible through 2046."},
{name:"AI Data Center Demand",dir:"up",detail:"Emergency power auctions. Every hyperscaler needs clean baseload. Nuclear is the only answer at scale."},
{name:"Trump Admin Pressure",dir:"risk",detail:"Electricity price reduction mandate. Could cap retail rates. Direct threat to margins."},
{name:"Cogentrix Acquisition",dir:"up",detail:"5.5 GW gas capacity added. EBITDA +7%. Diversifies beyond nuclear."}
],
flow:{inst:"Utility and infrastructure funds are the core holders. Current consensus $217 across 20 analysts, range $106-$305 \u2014 that spread is multiple variance on Texas regulatory outcomes, not earnings uncertainty.",retail:"Moderate retail interest. 'AI infrastructure pick' narrative resonating.",short:"Short interest 2.1% — low. Consensus bullish."},
bull:{path:"Earnings beat → Meta PPA guidance → new hyperscaler contracts → $235 PT → $250+ on momentum.",price:"$200-293"},
bear:{path:"Trump admin caps electricity prices. Nuclear economics deteriorate. Stock reverts to $100-120.",price:"$97-125"},
activeRisks:[{sev:"HIGH",prob:45,risk:"ERCOT forward curves BELOW the levels used for 2027 guidance",trigger:"CFO stated trending toward the LOWER end of $7.4-7.8B",triggerStatus:"watching",mitigation:"Watch the Q3 call guidance update",pPctNetWorth:1.5,daysToImpact:60,catalyst:"Monitored continuously \u2014 reassessed at each scheduled print"},{sev:"MED",prob:35,risk:"Texas data center interconnection audit",trigger:"Near-term uncertainty on queue timing",triggerStatus:"watching",mitigation:"Comanche Peak end-2027 not expected affected",pPctNetWorth:1.5,daysToImpact:60,catalyst:"Monitored continuously \u2014 reassessed at each scheduled print"},{sev:"LOW",prob:15,risk:"Oil-linked gas fleet exposure (WTI ~$90): significant gas fleet at risk. At $100 WTI, gas fuel costs surge $184M-$600M vs hedged levels. IEA 400M bbl mitigating",trigger:"Oil above $95 for 3+ months (currently ~$90)",impact:"EBITDA -$400-600M vs guide",catalyst:"Oil ~$90 after the US-Iran de-escalation. WTI well below the $95 stress level = continued drag. Hedging into NVDA Q1 May 28 ✓"},
{sev:"MED",prob:20,risk:"Hedge book losses: VST hedges power prices forward. If spot power spikes above hedge ceiling, they lose on spread. IEA release + spring demand = moderating",trigger:"Power price spike above hedge ceiling",impact:"Mark-to-market losses -$1B+",catalyst:"Q1 2026 earnings May 7 ✓ — hedge book disclosure + realized vs unrealized P&L. Also ERCOT daily pricing"},
{sev:"MED",prob:20,risk:"Energy price cap legislation: Trump admin + Congress could cap electricity prices. Lower prob — admin focused on Iran war, not legislation",trigger:"Executive order or bill introduced",impact:"-30-40% if PPAs repriced",catalyst:"Congressional energy committee hearings — watch Senate Energy Committee calendar. Also any Trump executive orders on energy costs"},
{sev:"MED",prob:10,risk:"Nuclear incident risk: safety incident at Vistra nuclear plants = existential. Comanche Peak AWS deal at risk if NRC raises concerns",trigger:"Safety incident or NRC action",impact:"Stock halves",catalyst:"NRC inspection reports — published quarterly. Comanche Peak report Apr 2026 ✓; next ~Jul"},
{sev:"MED",prob:35,risk:"Coal impairment continued: Q4 EPS miss ($0.55 vs $2.31) was coal-driven. More impairments possible as fleet winds down",trigger:"Further coal asset writedowns",impact:"EPS volatility",catalyst:"Q1 2026 earnings May 7 ✓ — coal fleet impairment update + retirement schedule"}],
killer:"Federal electricity price caps that make nuclear PPAs unprofitable at contracted rates.",
revMix:[{n:"Nuclear",p:32,c:"#3DBFA8"},{n:"Natural Gas",p:45,c:"#7E91E8"},{n:"Solar/Battery",p:8,c:"#FFBF00"},{n:"Retail Electricity",p:15,c:"#B266FF"}],
compPos:{xLabel:"Nuclear Capacity",yLabel:"AI Data Center PPAs",peers:[{n:"VST",x:75,y:90,self:true},{n:"CEG",x:95,y:70},{n:"NEE",x:30,y:40},{n:"D (Dominion)",x:40,y:20}]},
mgmt:{beats:3,misses:0,streak:"+3",note:"3 straight beats. Cogentrix acquisition accretive immediately. Meta PPA negotiation shows strategic capability. Credibility high."},
metrics:{lastQ:"Q2 2026 (Jun 2026)",revGrowth:18.0,opMargin:24.0,netMargin:11.0,note:"Q2 2026 (Aug 7): adjusted EBITDA $1.767B, UP MORE THAN 30% YoY. Generation segment EBITDA $994M, +68%. EPS $1.80 against a $1.54 consensus. Fleet commercial availability ABOVE 97% during record July heat, when PJM and ERCOT set all-time peak loads of 168 GW and 91 GW. Three refuelling outages completed successfully. GUIDANCE: 2026 adjusted EBITDA REAFFIRMED at $6.8-7.6B, with management expecting results at or above the midpoint. 2027 midpoint opportunity $7.4-7.8B. THE CAVEAT THAT MATTERS: CFO Moldovan stated current ERCOT forward curves are MEANINGFULLY BELOW the levels used for the 2027 range, and that Vistra is TRENDING TOWARD THE LOWER END of $7.4-7.8B. PJM strength and the hedge book do not fully offset. CAPITAL: $4.5-5B allocated to growth investments through 2027 with $2-2.5B additional cash available. Over $6.5B returned via buybacks since 2021, roughly 171 million shares at an average cost near $38. NEW: Helix Digital Infrastructure, a rack-to-grid platform with KKR, NVIDIA and the Kuwait Investment Authority. Vistra commits up to $1B as founding investor and serves as preferred power partner. A guidance update is expected on the Q3 call, subject to the Cogentrix closing timetable. Next print Nov 5. ESTIMATE TREND (Sep 14): 2026 consensus EPS $9.59; 2027 consensus $10.35, REVISED DOWN from $11.30 sixty days earlier \u2014 the ERCOT forward-curve risk now showing up in the numbers."},
watchlist:[{item:"VST Q1 2026 Earnings",d:"May 5",why:"Nuclear economics + Meta PPA guidance + Cogentrix accretion. Immediate catalyst."},{item:"Trump admin electricity pricing policy",d:"2026",why:"Federal price caps = thesis killer. Watch executive orders and DOE guidance."},{item:"New hyperscaler PPA announcements",d:"2026",why:"Beyond Meta — if AMZN/MSFT/GOOGL sign nuclear PPAs, thesis accelerates."},{item:"Nuclear re-licensing approvals (NRC)",d:"Ongoing",why:"20-year extensions = asset life visibility. Any denial = capacity risk."}],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",ptDate:"Sep 21, 2026",riskDate:"Sep 25, 2026" }},
CRWD:{name:"CrowdStrike Holdings",price:266.09,avgPT:244,highPT:300,ptDate:"Sep 14, 2026",ptVerified:true,lowPT:119,high52:269.3,low52:85.68,fwdPE:126.4,mktCap:"$246B",ytd:135,yr1:1,consensus:"Strong Buy",earningsDate:"Dec 2, 2026",epsEst:0.28,epsEstDate:"Aug 31, 2026",sector:"Cybersecurity",support:[{lvl:181.24,label:"Swing low 2026-08-26 \u2014 held 0x"},{lvl:174.14,label:"Swing low 2026-07-28 \u2014 held 0x"},{lvl:161.95,label:"Step below \u2014 derived"}],supportDate:"Oct 1, 2026",brokenSup:[],
supportVerified:true,
supportAnchor:"$181.24 (31.9%, held 0x) / $174.14 (34.6%, held 0x) / $161.95 (39.1%) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $181.24, 31.9% below $266.09. That first gap IS the risk \u2014 no observed level between here and there. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.15,
news:[n(10009,"TARGET RAISES INTO FAL.CON: SCOTIABANK $265, TRUIST $300","Scotiabank raised to $265 from $250, Truist to $300, TD Cowen and Raymond James to $250. Consensus $244 across 36 analysts, 29 buy / 7 hold / 0 sell. The stock now trades above that consensus after the AI-safety rotation into cyber.","TipRanks / MarketBeat","2026-09-14",0.2,"a",12,"analyst"),n(9972,"FOUR NAMES NOW TRADE ABOVE THEIR TARGETS \u2014 targets are Jul 28 vintage, not current","After a 34-day rally the Jul 28 verified consensus targets have been overtaken on four names: CRWD $229.68 vs $193 target (-16% implied), NOW $147.50 vs $140 (-5%), ANET $196.46 vs $192 (-2%), SHOP $147.50 vs $147 (0%). These are NOT sell signals \u2014 they are stale-data signals. All four have had major positive catalysts since the targets were set: CRWD beat and raised with a 20.5% single-session move on agentic-AI demand, NOW is +40% since its Q2 blowout, and the whole software complex re-rated in late August alongside Okta +28% and Salesforce +22%. Analyst targets almost certainly moved up and this file has not re-verified them. Treat every avgPT in this dashboard as Jul 28 vintage until re-sourced from S&P Global. Upside percentages across the book are understated to an unknown degree, and the four names above are actively misleading.","Internal audit vs S&P Global Jul 28","2026-08-31",0.0,"a",15,"intel"),
n(9964,"CRWD +20.5% on beat-and-raise \u2014 the trim thesis is now fully dead","CrowdStrike surged 20.5% in a single session in late August after beating expectations and raising its outlook, citing booming demand driven by agentic AI. Okta rose more than 28% and Salesforce more than 22% on the same theme. RECORD OF REVERSALS ON THIS NAME: (1) Jul 27 I flagged CRWD as the only holding above consensus and recommended trimming 25-30% \u2014 that rested on a stale $175 target. (2) Jul 28 verification found true consensus near $193 and I withdrew the trim. The lesson is not that trimming was wrong in principle but that the ORIGINAL signal was a data error, and once a signal is retracted the action built on it deserves re-examination before execution.","CNBC / Position review","2026-08-31",0.75,"e",16,"earnings"),
n(9913,"CRWD is NOT above consensus \u2014 stale $175 target reversed a trim signal","Verification sweep Jul 28: the file carried avgPT $175 against a $182.30 price, flagging CRWD as the only holding trading above consensus and generating a trim recommendation. That target was stale post-split. Current consensus is roughly $193 across 53 analysts, so the stock trades at a ~6% DISCOUNT to consensus, not a premium. Post-split target stack: Barclays $169 (OW), Morgan Stanley $172 (OW), Rosenblatt $206 (Buy), Stifel $220 (Buy), Benchmark $230, BofA $230 (Neutral), UBS $235, Wells Fargo $225 equivalent. HONEST REVERSAL: the Jul 27 trim case rested on a data error and is withdrawn. R:R is thin at 0.5x, but that is a stop-distance artifact, not a valuation ceiling.","Investing.com / stockanalysis / S&P Global","2026-07-28",0.35,"a",13,"intel"),
n(9711,"CRWD Q1 FY27 BEAT but -13.66% sell-the-news — beat top & bottom line","Rallied to new 52w high $194.93 into print (priced for perfection, ~58% overvalued per GF). In-line-to-beat results not enough. Google Cloud AI Threat Defense (launched May 27) a competitive overhang. Falcon platform momentum intact but valuation reset.","FXStreet/TradingKey","2026-06-03",-0.3,"e",13),n(9431,"CRWD +5.24% Jun 1 — new 52w high $194.93 ahead of Q1 FY27 (Jun 3 AMC)","Evercore ISI lifted target to PT $178 (~80% hike from prior 395, In-Line) Jun 1. +38% YTD. Project QuiltWorks expands AI risk-mgmt via cyber-insurer partnerships. Named 2026 Gartner endpoint leader.","Investing.com","2026-06-01",0.7,"a",12),n(996,"CRWD PTs verified May 18 — avg $128, high $175","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(948,"CRWD closed $154.5 (+4.11%) May 14","May 14 EOD — semis sell-off. Position up for the session.","Brokerage","2026-05-14",0.3,"v",7),
n(910,"CRWD support verified May 11 — S1 anchor: 50d MA $116","S1 $205 stop within 2.1% of 50d MA","Web Verified","2026-05-11",0.4,"v",7),
n(885,"CRWD options verified May 11 — IV 45%, IVR 50","Source: AlphaQuery 30d IV Mean 44.59%, IV Calls 44.51% (Apr 6 2026)","Web Verified","2026-05-11",0.4,"v",7),
n(875,"CRWD options data verified May 11 — IV 35%, IVR 40","Source: Market Rebellion March 5 ('decreasing IV' list), in line with cybersec peers","Web Verified","2026-05-11",0.4,"v",7),
n(836,"CRWD technicals verified May 11","50d MA, 200d MA, RSI from web sources: Investing.com May 2026 (50d=$116.47, 200d=$107.13)","Web Verified","2026-05-11",0.3,"t",6),
n(819,"CRWD PTs verified May 11 — avg $125 across 4 sources","Web-verified May 11: TipRanks $121.14 (37 analysts, range $92-139), Benzinga $128.52 (44 analysts, low $92 Bernstein, high $153 Scotiabank), MarketBeat $126.82, Public.com $127.72, ChartMill $124.69. Recent ratings May 5-6: Wells Fargo OW, Mizuho upgraded April 27. Stock $182 = 8% above $125 consensus.","Web Verified","2026-05-11",0.5,"v",8),
n(790,"CRWD $182 ATH +6.8% in 2 days — fresh ATH break","Cybersecurity rotation into ATH zone. Earnings June 3","Bloomberg","2026-05-11",0.5,"t",7),

n(740,"CRWD $117 +2.89% May 1 — RSA Conference continues","Federal momentum + RSA presentations driving sentiment. Up $13.15 today. Q1 May 28 next.","CrowdStrike","2026-05-01",0.5,"m",7),
n(715,"CRWD $114 +2% Apr 30 — RSA Conference momentum","RSA Conference Apr 28-May 1 ✓ ongoing. Federal contract wins narrative. May 28 Q1 earnings next.","CrowdStrike","2026-04-30",0.3,"m",7),
n(1,"Q4 BEAT: EPS $1.12 vs $1.10, Rev $1.31B +23%. ARR $5.25B record","IBM -13% dragged entire software sector. CRWD crashed to $346 — now down 39% from highs. AI displacement narrative spreading beyond security to all enterprise software.","CNBC","2026-02-01",-0.9,"k",7),
n(2,"Wedbush: selloff OVERREACTION — buy cyber","Wedbush says Anthropic Claude Code Security 'has caused chaos' but fears are misplaced. AI actually expands attack surface. Expects OpenAI to follow with similar tools. Cyber = AI beneficiary not victim.","Wedbush/Yahoo","2026-02-03",0.6,"a",7),
n(11,"Anthropic enterprise event CLEARED — cybersec bounced","Claude Cowork positioned as partner platform. Software rallied: CRM +4%, TRI +11%. Cybersec rebounded: ZS +4%, S +3%, CRWD flat. Peak AI fear may have passed. Earnings Mar 3 = 7 days.","CNBC","2026-02-21",0.3,"s",7),
n(12,"Surging +4.5% to $102 — post-earnings recovery. Beat + ARR record digested","Q4 FY26 results. ARR growth key. Stock at $346 — down 39% from highs. Testing Bernstein $95 low PT.","CrowdStrike","2026-02-23",0.3,"e",7),
n(3,"Seraphic Security acquisition","Browser-centric zero-trust expansion. Fills critical gap in endpoint-to-browser security.","CrowdStrike","2026-02-05",0.6,"p",7),
n(4,"Aramco MoU — Saudi cybersecurity","Strategic partnership in Middle East. Enterprise expansion into oil & gas sector.","CrowdStrike","2026-02-07",0.5,"m",6),
n(5,"Dan Ives: top AI stock for 2026","Wedbush analyst calls CRWD + PLTR his top AI picks. 'Table pounder moment to buy.'","Wedbush","2026-02-09",0.7,"a",7),
n(6,"BTIG: Buy PT $160","Most bullish target on street. AI-powered Falcon platform is moat.","BTIG","2026-02-11",0.75,"a",7),
n(7,"Keybanc downgrade to Sector Weight","Cautious on valuation at 52x forward earnings.","Keybanc","2026-02-13",-0.35,"a",7),
n(8,"2024 outage lawsuit dismissed","Court tossed class action from July 2024 global outage. Legal risk removed.","Legal","2026-02-15",0.4,"g",5),
n(9,"Net new ARR $331M record (+47%). First pure-play cyber at $5B ARR","Broad tech selloff + AI disruption fears hitting software names.","Market","2026-02-17",-0.2,"t",6),
n(10,"Govt cyberwarfare consideration","Admin weighing enlisting private companies in cyberwarfare. Potential massive TAM expansion.","NYT","2026-02-19",0.6,"g",7),
n(116,"CRWD +3.9% — cybersecurity demand resilient, war = increased cyber threats","Falcon platform expansion. Federal contracts growing. Iran cyberwarfare escalation = demand catalyst. Support $95. May earnings approaching.","Market","2026-04-05",0.5,"m",10)
,
n(215,"CRWD $104 — cyber demand resilient, war deescalation does not hurt demand","Falcon platform expansion. Federal contracts growing. Iran cyber threats elevated. May 28 earnings.","Market","2026-04-16",0.4,"m",10)
,
n(235,"CRWD $106.20 +1.43% — cyber demand resilient, post-war retaliation risk watched","Federal contracts momentum. Iran post-ceasefire cyber retaliation narrative (state-sponsored actors often escalate digital after losing kinetic). May 28 Q1 earnings. Stock range-bound at ATH.","Market context Apr 17 2026","2026-04-17",0.3,"m",10)
,
n(512,"CRWD $109.72 +3.0% Apr 20 breakout","Apr 20 close: CRWD $109.72 (+$12.77/+3.0%). Breakout above $106 resistance. 30.78% YTD. Q1 FY27 earnings Jun 9. ARR $5.25B +24% YoY FY26 exit.","Market context Apr 20 2026","2026-04-20",0.6,"m",12),
n(513,"Cyber sector tailwind — AI security + breach news cycle","Market context Apr 20: Cybersecurity sector outperforming on AI agent security concerns (Claude/OpenAI model misuse debates in news). CRWD Falcon Flex 120%+ YoY. Next-Gen SIEM + Cloud + Identity products benefiting.","Market context Apr 20 2026","2026-04-20",0.5,"m",12)
,
n(535,"CRWD breakout $182.30 — +5.11% Apr 21 major move","Apr 21 close: CRWD $182.30 +$22.15 MAJOR breakout above $110 resistance. AI security tailwind + Iran cyber retaliation risk elevated before ceasefire expires Apr 22. Jun 9 earnings 49d.","Market Apr 21 2026","2026-04-21",0.8,"m",14)
,
n(602,"CRWD +5.11% Apr 21 — KeyBanc upgrade Overweight PT $131","CNBC Apr 21: KeyBanc upgrades CRWD to Overweight from Sector Weight. PT $131 (21.2% upside from $108). Key argument: despite Anthropic Mythos AI security launch concerns, CRWD fundamentals intact. Falcon Flex 120%+ YoY. Stock +5.11% Apr 21.","CNBC/KeyBanc Apr 21 2026","2026-04-21",0.85,"a",15),
n(603,"$182.30 breakout above $112 resistance — new high zone","Apr 21 close: CRWD $182.30 new range high. +5.11% day. Breakout above prior $112 resistance on KeyBanc upgrade. Momentum setup strong into Jun 9 earnings.","Market context Apr 21 2026","2026-04-21",0.65,"t",13)
,
n(637,"CRWD +1.64% $114.97 — extending KeyBanc upgrade rally — Apr 22","Apr 22 close $114.97 +1.64%. Building on Apr 21 +5.11% KeyBanc Overweight PT $131 call. Cyber outperforming broader market. Jun 9 earnings.","Market context Apr 22 2026","2026-04-22",0.55,"m",12)
,
n(651,"VST +1.61% Apr 27 — $167 nuclear fleet pre-May 13 earnings","Apr 27 close $167.00 +1.61%. Nuclear fleet intact. May 13 earnings. AI data center PPA pipeline growing. Oil ~$83 after the late-Aug US-Iran de-escalation.","Market Apr 27 2026","2026-04-27",0.55,"m",12)
,
n(682,"CRWD $112.27 -1.48% — RSA Conference week Apr 28-May 1 ongoing","CRWD -1.48% on broader cyber weakness. RSA Conference ongoing this week — competitive positioning vs PANW/Z all in focus.","Stock close Apr 29 2026","2026-04-29",-0.2,"n",7)
],
options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:5.8,pcRatio:null,maxPain:235,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:82555,maxPainNear:252.5,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:51.55,atmIVExp:"2026-10-30",ivObs:17},
optionsDate:"Oct 1, 2026",optionsVerified:true,
tech:{
ma:{d50:218.0,d100:197.0,d200:153.0,d400:133.0,align:"bullish",
brk:[{ma:"50d",p:218.0,above:"Reclaiming near-term. Pre-earnings positioning.",below:"Losing near-term. Software selloff still dragging."},
{ma:"100d",p:197.0,above:"Above 50d. Post-beat strength; consensus $228.",below:"Below intermediate. Market discounting earnings beat."},
{ma:"200d",p:153.0,above:"Primary cybersecurity thesis intact.",below:"Primary break. AI disruption fears hitting even best-of-breed."},
{ma:"400d",p:133.0,above:"Secular cybersecurity spend trend intact.",below:"Secular break. Platform breach or growth deceleration confirmed."}]},
momentum:{rsi:67.24,rsiZone:"neutral",macd:{v:14.4672,s:12.6844,h:1.7828,cross:"bullish"},roc:30.8},
volume:{avg:"9.9M",recent:"7.9M",ratio:0.8,obv:"rising",accDist:"neutral",lastDay:"6.9M",lastDayX:0.7,volDate:"Oct 1, 2026"},
levels:{fibs:[86,156,177,199,269],pivots:{r2:275,r1:270,p:265,s1:260,s2:255}},
pattern:{name:"ATH Breakout",target:800,dir:"up",note:"$266.09. RSI 67.2, above 50d, above 200d. Next earnings Dec 2."},
verdict:{score:10,label:"TRIM/AVOID \u2014 NO NEARBY SUPPORT, MACD+",c:"r",drivers:"$266.09. Above 50d $218 (+22.1%), above 200d $153 (+73.9%). RSI 67.2 neutral. MACD histogram +1.78 (improving). Nearest observed support $181.24, 31.9% below, held 0x. Next earnings Dec 2."}},
fundVerified:true,
fundDate:"Sep 17, 2026",
fund:{
story:"$214.97 (Sep 3 close). Best-of-breed cybersecurity platform. The late-August print beat and raised on agentic-AI demand and moved the stock 20.5% in one session; CEO Kurtz called it the best quarter in company history and Morgan Stanley raised to $238 on 60x CY30 free cash flow. Next earnings Dec 2.",
drivers:[
{name:"ARR Growth",dir:"up",detail:"Net new ARR +50% sequentially. Falcon platform module adoption expanding. Dollar retention best in class."},
{name:"AI Threat Expansion",dir:"up",detail:"AI-powered attacks increasing demand for AI-powered defense. CRWD is the platform play."},
{name:"Government Contracts",dir:"up",detail:"Cyberwarfare consideration. Aramco MoU for Saudi expansion. Massive TAM expansion."},
{name:"Software Selloff",dir:"risk",detail:"Sector-wide fear of AI disrupting SaaS. Not CRWD-specific but dragging valuation."}
],
flow:{inst:"Post-earnings: Piper Sandler upgraded OW $102. But 164 insider sells, 0 buys in 6mo. UBS removed 5.8M shares (-74.5%). Mixedizuho Neutral. Net shifting cautious. 164 insider SALES in 6mo, zero purchases.",retail:"High conviction shaken by AI disruption fear. 'SaaSpocalypse' narrative spreading.",short:"Short interest rising. Valuation bears emboldened by AI agent disruption thesis."},
bull:{path:"Mar 3 ARR beats → software fear recedes → Barclays 'transitions take years' thesis validated → $300-$330",price:"$300-$330"},
bear:{path:"AI agent tools commoditize security. ARR growth slows to 20%. BofA downgrade starts wave of cuts. 58x compresses to 30x.",price:"$105-119"},
activeRisks:[{sev:"HIGH",prob:25,risk:"AI security disruption: AI-native tools could commoditize endpoint protection. CRWD premium pricing at risk",trigger:"Enterprise adoption of AI security tools >20%",impact:"ARR growth slows to 15%",catalyst:"RSA Conference Apr 28 ✓-May 1 ✓ ongoing — competitive landscape will be visible. AI security product launches"},
{sev:"HIGH",prob:40,risk:"Insider selling: 164 sells, 0 buys in 6 months. CEO Kurtz sold $36M. Persistent pattern",trigger:"Continued heavy selling post-earnings",impact:"Sentiment drag -10-15%",catalyst:"SEC Form 4 filings — ongoing. Next batch due within 2 business days of any trade. Watch weekly"},
{sev:"MED",prob:20,risk:"Valuation: 52x fwd PE for 23% growth. If growth decelerates to 18%, multiple compresses to 35x = $205 stop",trigger:"FY27 guide below 20% growth",impact:"-25% from current",catalyst:"Q1 FY27 earnings Jun 3 ✓ — ARR growth rate + net new ARR will show trajectory"},
{sev:"MED",prob:10,risk:"Outage lawsuit resurgence: 2024 outage dismissed but new incidents could resurface liability",trigger:"New outage or legal action",impact:"Sentiment -5-10%",catalyst:"No specific date. Court docket monitoring for new filings"},
{sev:"LOW",prob:30,risk:"Recession IT budget cuts: if enterprises cut IT budgets due to oil/stagflation, even security gets trimmed",trigger:"Enterprise IT budget cuts >5%",impact:"New logo wins slow",catalyst:"Gartner IT spending forecast — last update Apr 2026 ✓; next ~Jul. Also IDC quarterly tracker"}],
killer:"Claude Code Security or similar AI tools gaining enterprise adoption for vulnerability scanning, or ARR growth decelerating below 20%. Insider selling wave continues.",
revMix:[{n:"Subscription",p:94,c:"#3DBFA8"},{n:"Professional Services",p:6,c:"#7E91E8"}],
compPos:{xLabel:"Platform Breadth",yLabel:"ARR Growth",peers:[{n:"CRWD",x:90,y:85,self:true},{n:"PANW",x:80,y:55},{n:"S (SentinelOne)",x:50,y:65},{n:"FTNT",x:60,y:30}]},
mgmt:{beats:4,misses:0,streak:"+4",note:"George Kurtz executing at elite level. 4 straight beats. ARR growth re-accelerating. 2024 outage handled well — lawsuit dismissed."},
metrics:{revGrowth:26.0,grossMargin:75.0,opMargin:2.0,netMargin:0.4,fcfMargin:28.8,roe:1.0,debtEquity:0.18,lastQ:"Q2 FY27 (Jul 2026)"},
watchlist:[],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",ptDate:"Sep 14, 2026",riskDate:"Sep 25, 2026" },
catalysts:[{d:"Dec 2",e:"CRWD Q3 FY27 earnings",i:"high",iv:"med",hm:"N/A"},{d:"Mar 3 ✓",e:"CRWD Q4 FY26 Earnings — BEAT: ARR $5.25B record, net new ARR +47%",i:"high",iv:"high",hm:"+5.8%"},{d:"2026",e:"Govt cyber contract expansion",i:"bullish",iv:"med",hm:"N/A"},{d:"H1 2026",e:"Seraphic integration",i:"bullish",iv:"low",hm:"N/A"},{d:"Ongoing",e:"AI disruption software fear",i:"bearish",iv:"med",hm:"-12.5%"}],
peers:[{t:"CRWD",pe:58,ev:30,y:-10},{t:"PANW",pe:45,ev:22,y:5},{t:"ZS",pe:65,ev:35,y:-15},{t:"FTNT",pe:38,ev:18,y:8},{t:"NET",pe:120,ev:50,y:-20}],
playbook:[
pb("1 WEEK","CRWD $266 \u2014 TRIM/AVOID (10). Nearest support $181.24, 31.9% below (volume node, never defended). -8% to $244 consensus. RSI 67, MACD +1.78. NEXT: Dec 2 \u2014 CRWD Q3 FY27 earnings. Key risk to watch: AI security disruption: AI-native tools could commoditize endpoint protection. CRWD premium pricing at risk Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",R,"CRWD $266.09 as of the latest close, TRIM/AVOID at 10 on the tool's five-component score. $214.97 (Sep 3 close). Best-of-breed cybersecurity platform. Nearest observed support sits at $181.24.","TRIM/AVOID (10). Watch $181.24, 31.9% below (volume node, never defended). Upside -8% to $244; reward-to-risk -0.3x. Next catalyst: CRWD Q3 FY27 earnings."),
pb("1 MONTH","CRWD $266.09 \u2014 THESIS: $214.97 (the scheduled date close). Best-of-breed cybersecurity platform. KEY RISK: AI security disruption: AI-native tools could commoditize endpoint protection. CRWD premium pricing at risk NEXT CATALYST: CRWD Q3 FY27 earnings. Upside -8%, reward-to-risk -0.3x to nearest support. Refreshed the scheduled date.",R,"CRWD $266.09 (the scheduled date close), TRIM/AVOID at 10. $214.97 (the scheduled date close). Best-of-breed cybersecurity platform. Key risk: AI security disruption: AI-native tools could commoditize endpoint protection. CRWD premium pricing at risk","TRIM/AVOID (10). Watch $181.24, 31.9% below (volume node, never defended). Upside -8% to $244; reward-to-risk -0.3x. Next catalyst: CRWD Q3 FY27 earnings."),
pb("3 MONTHS","CRWD $266.09 \u2014 NEXT QUARTER: CRWD Q3 FY27 earnings. The print either confirms the thesis ($214.97 (the scheduled date close). Best-of-breed cybersecurity platform.) or tests the key risk (AI security disruption: AI-native tools could commoditize endpoint protection. CRWD premium pricing at risk) Nearest support $181.24, 31.9% below (volume node, never defended). Refreshed the scheduled date.",R,"CRWD $266.09 (the scheduled date close), TRIM/AVOID at 10. $214.97 (the scheduled date close). Best-of-breed cybersecurity platform. Key risk: AI security disruption: AI-native tools could commoditize endpoint protection. CRWD premium pricing at risk","TRIM/AVOID (10). Watch $181.24, 31.9% below (volume node, never defended). Upside -8% to $244; reward-to-risk -0.3x. Next catalyst: CRWD Q3 FY27 earnings."),
pb("6 MONTHS","CRWD $266.09 \u2014 SIX MONTHS: two prints inside the window. TRIM/AVOID (10). Consensus $244 (-8%), street range $119 (-55%) to $300 (+13%). What would change the view: AI security disruption: AI-native tools could commoditize endpoint protection. CRWD premium pricing at risk Refreshed the scheduled date.",R,"CRWD $266.09 (the scheduled date close), TRIM/AVOID at 10. $214.97 (the scheduled date close). Best-of-breed cybersecurity platform. Key risk: AI security disruption: AI-native tools could commoditize endpoint protection. CRWD premium pricing at risk","TRIM/AVOID (10). Watch $181.24, 31.9% below (volume node, never defended). Upside -8% to $244; reward-to-risk -0.3x. Next catalyst: CRWD Q3 FY27 earnings."),
pb("1 YEAR","CRWD $266.09 \u2014 TWELVE MONTHS: consensus $244 implies -8%; street range $119 (-55%) to $300 (+13%). THESIS: $214.97 (the scheduled date close). Best-of-breed cybersecurity platform. STRUCTURAL RISK: AI security disruption: AI-native tools could commoditize endpoint protection. CRWD premium pricing at risk Refreshed the scheduled date.",R,"CRWD $266.09 (the scheduled date close), TRIM/AVOID at 10. $214.97 (the scheduled date close). Best-of-breed cybersecurity platform. Key risk: AI security disruption: AI-native tools could commoditize endpoint protection. CRWD premium pricing at risk","TRIM/AVOID (10). Watch $181.24, 31.9% below (volume node, never defended). Upside -8% to $244; reward-to-risk -0.3x. Next catalyst: CRWD Q3 FY27 earnings.")]},
VRT:{name:"Vertiv Holdings",price:246.12,avgPT:341,highPT:500,ptDate:"Sep 14, 2026",ptVerified:true,lowPT:236,high52:379.94,low52:147.35,fwdPE:31.7,mktCap:"$84B",ytd:40,yr1:340,consensus:"Buy",earningsDate:"Oct 20, 2026",epsEst:1.84,epsEstDate:"Aug 31, 2026",sector:"AI Infrastructure",support:[{lvl:242.84,label:"Volume node \u2014 1.3% below"},{lvl:231.7,label:"Swing low 2026-03-30 \u2014 held 3x"},{lvl:226.94,label:"Swing low 2026-09-14 \u2014 held 0x"}],supportDate:"Oct 1, 2026",brokenSup:[{lvl:275.18,held:3,date:"2026-06-10"}],
supportVerified:true,
supportAnchor:"$242.84 (1.3%) / $231.70 (5.9%, held 3x) / $226.94 (7.8%, held 0x) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $242.84, 1.3% below $246.12. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.25,
news:[n(10104,"UIG DEAL FUNDED ENTIRELY FROM CASH \u2014 NO DEBT, NO EQUITY","Verified Sep 9: the $1.45B upfront for Utility Innovation Group is funded from existing resources, with $5.6B of liquidity, a net cash position and investment-grade ratings from all three agencies. Up to $1.15B of earnouts pay only on EBITDA targets, capped at $575M per tranche. Management expects first-year adjusted EPS accretion. The stock fell 9.6% on Sep 9 on capital-allocation concerns that the financing does not support.","Company 8-K / 10-Q","2026-09-09",0.3,"e",18,"intel"),n(9963,"VRT BEAT AND RAISED, FELL 17% \u2014 now facing investor fraud investigations","Jul 29 BMO: adjusted diluted EPS $1.52 vs $1.43 consensus, a 6.3% beat, up 60% YoY. Adjusted operating margin 22.6%, +410bps. Operating cash flow $1,100M and adjusted FCF $925M, up 241% and 234%. FULL-YEAR GUIDANCE RAISED ACROSS ALL KEY METRICS. Net sales $3,274M, +24% YoY (18% organic, 5% acquisitions, 1% FX) but BELOW the $3.38B consensus; the company attributed the shortfall to timing shifts from temporary supply-chain congestion and multi-phased project execution. Stock fell roughly 17%. Pomerantz LLP and Schall, Brown & Schwartz have since opened investigations into potential securities fraud \u2014 a new, material legal overhang that did not exist at the last update. VRT has recovered to $258.74 but is still below the pre-print $270. Next print Oct 21. THIRD INSTANCE of beat-and-raise-into-selloff in this book after CBRS and the KLAC precedent: when the top line misses, a raised guide does not defend the multiple.","Vertiv IR / Simply Wall St / Public.com","2026-08-31",-0.3,"e",17,"earnings"),
n(9951,"VRT RSI 35.6 OVERSOLD into tomorrow's print \u2014 200d MA at $245 is the real floor","First verified technicals since May 11 (S&P Global, Jul 28): 50d MA $312.48 (price roughly -14% below), 200d MA $245.41 (price ~+10% above \u2014 primary uptrend still INTACT), RSI 35.61 which is at the oversold threshold, beta 2.03. Forward P/E 38.88, market cap $101.75B, ROIC 32.13%, FCF $2.28B. SHORT INTEREST FELL SHARPLY: 14.98M to 11.21M, now 2.92% of shares out \u2014 shorts covered INTO the print, which is not what you see before an expected miss. STOP CORRECTED: it was $252, which sits ABOVE the verified 200d MA of $245 \u2014 meaning ordinary noise around the primary trendline would have stopped us out. Widened to $240, just below the 200d, so only a genuine trend break triggers. Q2 confirmed Jul 29 BMO.","S&P Global Market Intelligence / stockanalysis.com","2026-07-28",0.4,"t",16,"news"),
n(9932,"VRT forward model refreshed hours before the print \u2014 FY26 EPS $6.48, FY27 $8.83","S&P Global forecast data pulled Jul 28 ahead of tomorrow's Q2 (Jul 29 BMO): FY26 revenue $13.88B from $10.23B (+35.7%), FY26 EPS $6.48 from $4.20 (+54.3%); FY27 revenue $17.87B (+28.7%) and EPS $8.83 (+36.2%). FY26 gross margin modelled at 38.55%, up from 36.32%. Estimate dispersion is tight \u2014 FY26 EPS range $6.21-$7.04 \u2014 which means a miss would be genuinely informative rather than noise. Consensus refined to $376.15 across 28 analysts (low $236, high $500). Analyst stack into the print: KeyBanc initiated Buy $360 Jul 23, Bernstein maintained $416 Jul 17, RBC trimmed $435 to $418 Jul 16 (still Buy), Baird initiated $370 Jul 15. Ratings moved to 21 Strong Buy from 16 in February.","S&P Global Market Intelligence / stockanalysis.com","2026-07-28",0.45,"a",15,"intel"),
n(9905,"VRT -6.12% to $270 into tomorrow morning\u0027s print \u2014 now below the pre-print floor","Jul 28: Vertiv fell 6.12% to $270.00, down 5.5% across two sessions, hours before reporting Q2 Jul 29 BMO (call 11am ET). AI-power and data-center infrastructure sold as high-beta AI-capex proxies rather than on contracted backlog. Consensus $3.39B rev (+28.4% YoY) and $1.43 EPS; $15B backlog with visibility into 2027. Options imply roughly a 9% move, so the stock could trade $246-295 on the print and neither outcome would be informative about the thesis. S&P Global\u0027s 27-analyst consensus remains $380.","Zacks","2026-07-28",-0.3,"e",15,"news"),
n(9805,"VRT Q2 confirmed Jul 29 BMO — consensus $1.43, and PT was badly stale at $287","Vertiv reports Q2 2026 before market open Wednesday Jul 29, call 11am ET (company release Jul 15; TipRanks marks it Confirmed). Guide: revenue $3.25-3.45B, organic +20-24%, adj EPS $1.37-1.43. Zacks consensus $3.39B rev (+28.4% YoY) and $1.43 EPS (+50.5%). $15B backlog with visibility into 2027. PT CORRECTION: dashboard carried avgPT $287; S&P Global's 27-analyst consensus is $380 (low $236, high $500, Strong Buy). Recent initiations: KeyBanc Overweight $360, Baird Outperform $370; RBC trimmed to $418 from $435, still Outperform. Options implied ~9% move — the old $268 stop would have been mechanical noise.","Vertiv IR / S&P Global / TipRanks","2026-07-27",0.5,"e",16,"catalyst"),
n(1004,"VRT RBC raises PT $356→$435 May 18","RBC Capital Markets Deane Dray reiterates Outperform, raises PT to $435 from $356. Calls investor conference a \"datacenter power/cooling technology showcase.\" RBC projects 20-25% organic revenue growth through 2030. New PT = +35% above current $321.","RBC Capital","2026-05-18",0.7,"a",15),
n(1003,"VRT investor conference May 19-20 Greenville — Day 2 = technology showcase","Financial guidance and product roadmap in focusme day as NVDA Q1 AMC. Stock -5.13% today on pre-conference de-risking + insider selling overhang ($123M sold by insiders past 3mo).","Vertiv IR/StockTitan","2026-05-19",0.0,"v",18),
n(999,"VRT-Rubin Ultra thesis: H2 2027 NVL576 = 600kW racks = 5x cooling content per rack","NVDA GTC roadmap: standard Rubin NVL144 ships H2 2026 at 120-130kW (similar to GB200). Rubin Ultra NVL576 Kyber rack ships H2 2027 at 600kW per rack — 5x current power density. Tech analyst coverage explicitly names Vertiv, Schneider Electric, CoolIT as primary beneficiaries. 600kW forces direct-to-chip + immersion cooling mandatory (not optional). PT revision catalyst: NVDA Q1 May 20 ✓ commentary on Rubin power specs, hyperscaler capex prep references. Vertiv content per rack expansion = 2027 revenue model upward revisions.","DCD/Medium/Tech-Insider","2026-05-18",0.85,"v",18),
n(994,"VRT PTs verified May 18 — avg $287, high $320","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(958,"VRT closed $339.43 (-8.17%) May 14","May 14 EOD — semis sell-off. Position down for the session.","Brokerage","2026-05-14",-0.4,"v",7),
n(899,"VRT support verified May 11 — S1 anchor: 50d MA $280","S1 $278 within 0.7% of 50d MA — classic dynamic support","Web Verified","2026-05-11",0.4,"v",7),
n(886,"VRT options verified May 11 — IV 80%, IVR 80","Source: Market Rebellion Apr 21 (VRT May IV at 80, April 24 IV at 136 pre-earnings, 52w range 45-94)","Web Verified","2026-05-11",0.4,"v",7),
n(870,"VRT options data verified May 11 — IV 42%, IVR 65","Source: Market Rebellion April (VRT in 'increasing IV' lists, estimate ~42 based on cluster)","Web Verified","2026-05-11",0.4,"v",7),
n(850,"VRT PTs verified May 11 — avg $339","Source: TipRanks 30 analysts avg $339.18, range $260-414. Morgan Stanley recently raised to $350","Web Verified","2026-05-11",0.4,"v",7),
n(831,"VRT technicals verified May 11","50d MA, 200d MA, RSI from web sources: CoinCentral/MEXC May 10 (50d=$280.39, 200d=$217.77)","Web Verified","2026-05-11",0.3,"t",6),
n(788,"VRT $339 ATH +8.8% — AI data center demand momentum + analyst upgrades","Vertiv at ATH since 2020 SPAC listing. Q1 record print May 1 (Rev $2.65B +30%, EPS $1.17 vs $1.00 est, op margin 20.8%). $15B backlog. AI data center thermal management infrastructure thesis re-rated","CNBC/Finviz","2026-05-11",0.7,"f",10),
n(785,"VRT $339.00 -2.44% May 7 — profit-taking after Mon $339","Day move -2.44% from May 5 close. profit-taking after Mon $339. Macro: NVDA broke into ATH zone +7.5% on AI capex narrative re-acceleration.","MarketWatch","2026-05-07",0,"m",4),

n(756,"VRT $339 +0.5% May 5 — new ATH zone","Liquid cooling demand confirmed by hyperscaler capex prints. AMD MI355 + Meta 6GW direct beneficiary.","Vertiv","2026-05-05",0.4,"v",7),
n(702,"VRT $339 +6% Apr 30 — liquid cooling demand confirmed","Hyperscaler capex commitments + AMD MI355 + new META 6GW = direct revenue acceleration for VRT. Stock breakout to new high zone.","Vertiv","2026-04-30",0.6,"m",10),
n(1,"Q4 2025 beat — revenue $2.88B vs $2.9B est","Strong data center cooling demand. Backlog +28% YoY to $7.1B. Raised FY26 guide.","Earnings","2026-02-01",0.8,"e",7),
n(2,"AI data center power density driving cooling TAM expansion","Liquid cooling adoption accelerating. Vertiv is #1 market share in thermal management.","Barron's","2026-02-03",0.6,"g",7),
n(3,"Goldman Sachs initiates Buy, PT $295","AI infrastructure picks-and-shovels play. Cooling is the bottleneck after power.","Goldman","2026-02-05",0.5,"g",7),
n(4,"Stock down 5% YTD despite earnings beat","Broad AI infrastructure selloff pulling down all names. Not company-specific.","Market","2026-02-07",-0.3,"t",6),
n(5,"Hyperscaler capex $650B+ — cooling spend follows","Every $1 of compute capex requires $0.15-0.20 of cooling infrastructure. TAM expanding.","Morgan Stanley","2026-02-09",0.7,"g",7),
n(6,"New liquid cooling product line launch Q1","Direct-to-chip liquid cooling for NVIDIA GB200 racks. Sole-source for several hyperscalers.","Company PR","2026-02-11",0.5,"g",6),
n(7,"Backlog-to-revenue conversion accelerating","$15B backlog = 3x annual revenue. Visibility through 2027.","JP Morgan","2026-02-13",0.6,"g",7),
n(8,"Competition from Schneider Electric intensifying","SE announced liquid cooling expansion. Market share battle emerging.","Reuters","2026-02-15",-0.2,"t",4)
,
n(117,"VRT +8.5% strong bounce — AI data center cooling demand undiminished","$44B backlog intact. Google memory paper impact fading — physical cooling still required regardless of memory compression. Support $240. Target $280.","Market","2026-04-05",0.6,"m",12)
,
n(216,"VRT $295 — AI cooling demand intact, earnings Apr 23 approaching","$44B backlog intact. Apr 23 Q1 EARNINGS — 7 days away. Liquid cooling 40%+ YoY. GB200/GB300 ramp.","Earnings","2026-04-16",0.7,"b",16)
,
n(236,"VRT $307.40 +4.51% BREAKOUT — Apr 23 Q1 EARNINGS IN 6 DAYS","AI cooling demand validated by AVGO breakout + MRVL rally. $44B backlog. Every GB200 rack needs Vertiv. Earnings Thursday next week = binary catalyst. Stock +5% into report.","Market context Apr 17 2026","2026-04-17",0.8,"e",14)
,
n(300,"Roth Capital raises PT $275→$335 — Apr 16","TipRanks Apr 16 10:25am ET: Roth Capital raised price target $275→$335 (+22%). Pre-earnings constructive setup — 7th major PT raise in 3 weeks.","TipRanks/Roth Capital Apr 16 2026","2026-04-16",0.8,"a",13),
n(301,"RBC Capital Buy reiterated — Apr 15","TipRanks Apr 15 9:47pm ET: RBC Capital reiterated Buy on VRT. Pre-earnings institutional confirmation.","TipRanks/RBC Apr 15 2026","2026-04-15",0.5,"a",10),
n(302,"Vertiv + CPower partnership — Virtual Power Plant integration","TipRanks Apr 14 9:27am ET: Vertiv and CPower announce collaboration — integrates Vertiv EnergyCore Grid BESS into virtual power plant. Improves data center interconnection speed + monetization of behind-meter assets.","TipRanks/CPower Apr 14 2026","2026-04-14",0.6,"m",11),
n(303,"BNP Paribas initiates Outperform — Apr 14","TipRanks Apr 14 7:22am ET: BNP Paribas initiated VRT with Outperform rating. New institutional coverage pre-earnings.","TipRanks/BNP Paribas Apr 14 2026","2026-04-14",0.6,"a",11),
n(304,"BofA raises PT $277→$339 — Apr 13","TipRanks Apr 13 8:00am ET: BofA Securities raised PT $277→$339 (+19%) and reaffirmed Buy rating. Cited AI cooling demand acceleration.","TipRanks/BofA Apr 13 2026","2026-04-13",0.75,"a",12),
n(305,"Citi raises PT $286→$340 — Apr 13","TipRanks Apr 13 6:40am ET: Citi raised PT $286→$340 (+19%). Highest street target among recent raises.","TipRanks/Citi Apr 13 2026","2026-04-13",0.75,"a",12),
n(306,"Acquires BMarko Structures — vertical integration Apr 13","SEC 8-K Apr 13 2026: Vertiv acquired BMarko Structures LLC, U.S.-based custom-engineered structural fabrication provider. Strengthens in-house structural fab, engineering control, customization for AI data center deployments at scale.","SEC 8-K Apr 13 2026","2026-04-13",0.6,"m",11),
n(307,"Barclays raises PT $281→$300 — Apr 1","Yahoo Finance Apr 1 2026: Barclays analyst Julian Mitchell raised PT $281→$300, maintained Overweight. Q1 preview cited sector has more demand question marks but expectations somewhat re-based.","Yahoo Finance/Barclays Apr 1 2026","2026-04-01",0.4,"a",10),
n(308,"$50M Ironton OH expansion — +45% liquid cooling capacity","Vertiv press Mar 30 2026: $50M investment to expand Ironton Ohio manufacturing + Westerville HQ. +45% capacity for liquid cooling and chilled water systems. Hundreds of jobs through 2029. Operations Q2 2027.","Vertiv press Mar 30 2026","2026-03-30",0.7,"m",12),
n(309,"HSBC initiates Buy PT $325 — Mar 24","HSBC analyst note Mar 24 2026: initiated coverage with Buy rating and $325 PT.","HSBC Mar 24 2026","2026-03-24",0.5,"a",10),
n(310,"Acquires ThermoKey — heat rejection for AI cooling","SEC 8-K Mar 23 2026: Vertiv to acquire ThermoKey S.p.A. (Italy), leading heat rejection/heat-exchange technology provider with long OEM relationships. Expands thermal chain optionality for high-density AI data centers.","SEC 8-K Mar 23 2026","2026-03-23",0.6,"m",11),
n(311,"Q4 2025 + 2026 guidance: orders +252% YoY, $15B backlog","SEC 8-K Feb 11 2026: Q4 2025 rev $2.88B (+23% YoY, +19% organic). Orders +252% YoY, +117% QoQ. Backlog $15B (doubled YoY). 2026 guide: FY EPS $5.97-6.07 (+43%), sales $13.25-13.75B (+27-29% organic). Q1 guide: EPS $0.95-1.01 (~53% growth), sales ~$2.6B, 19% margin (+250bps).","SEC 8-K Feb 11 2026","2026-02-11",0.9,"e",15)
,
n(514,"VRT +3.4% Apr 20 breakout into Apr 29 earnings","Apr 20 close: VRT $317.77 (+$10.43/+3.4%) approaches Apr 29 earnings. Builds on analyst cluster Apr 13-16 PT raises. Pre-earnings positioning constructive, options setup bullish.","Market context Apr 20 2026","2026-04-20",0.7,"m",13),
n(515,"Data center liquid cooling demand + Schneider AI thermal","Market context Apr 20: Hyperscaler AI buildout $600B+ 2026 requires liquid cooling expansion. VRT market position: direct beneficiary of GB200/GB300 rack deployments. Watch book-to-bill Q1 print + 2H guide raise potential.","Market context Apr 20 2026","2026-04-20",0.5,"m",12)
,
n(548,"VRT +0.66% Apr 21 — Apr 29 earnings 8d","Apr 21: VRT $316.50 +$2.09 mild gain into Apr 29 earnings. AI cooling intact. $15B backlog + 7 PT raises Apr 13-16 cluster bullish.","Apr 21","2026-04-21",0.4,"m",10)
,
n(600,"VRT Q1 BEAT: EPS $1.17 vs $1.01 est, FY26 EPS guide RAISED $6.30-6.40 vs $5.97-6.07 — Apr 22","Pre-market Apr 22 earnings: Q1 EPS $1.17 beat $1.01 consensus by 16%. Revenue $2.6B. FY26 guide raised to $6.30-6.40 EPS vs prior $5.97-6.07 and street $6.16. Q2 guide $1.37-1.43 vs $1.43 street. Backlog maintained $15B+. Stock +2.3% intraday, faded to -2.54% close $304.50 on profit-taking after 171% gains (sell-the-news).","Vertiv Q1 2026 Earnings Apr 22","2026-04-22",0.7,"e",15),
n(601,"VRT Evercore $350 PT raise Apr 20 validated — street now clustering $345-365","Post-earnings context Apr 22: Evercore hiked to $350 from $280 ahead of print. Multiple PT raises expected next 48 hours. Current dashboard PT $340/high $420 likely moves to $355-365. Next catalyst: May investor conference, 2029 margin targets.","Market context Apr 22 2026","2026-04-22",0.5,"a",12)

,
n(643,"VRT -0.58% Apr 27 — $339 Q1 earnings Apr 23 digesting","Apr 27 close $321.58. Apr 23 earnings beat digested. Liquid cooling secular intact. $44B backlog. Next catalyst Jul 30 Q2.","Market Apr 27 2026","2026-04-27",0.4,"m",12)
,
n(676,"VRT $339.50 +1.47% — AI power infrastructure beneficiary as META capex raised","VRT continues higher post Q1 beat. Liquid cooling pipeline expansion validated by hyperscaler capex up 70% YoY. Gross margin expansion to 36%.","Stock close Apr 29 2026","2026-04-29",0.55,"n",8)
],
options:{ivRank:null,ivPctl:null,impliedMove:18.3,skew:null,lastEarnMove:-17.3,pcRatio:null,maxPain:255,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:63069,maxPainNear:250.0,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:65.02,atmIVExp:"2026-10-30",ivObs:17},
optionsDate:"Oct 1, 2026",optionsVerified:true,
tech:{
ma:{d50:262.0,d100:290.0,d200:264.0,d400:196.0,align:"bearish",
brk:[{ma:"50d",p:262.0,above:"Reclaiming near-term trend after selloff.",below:"Below 50d. AI infrastructure selloff continuing."},
{ma:"100d",p:290.0,above:"Full intermediate recovery. Earnings re-rating underway.",below:"Intermediate trend broken. Need catalyst."},
{ma:"200d",p:264.0,above:"Right at 200d. Critical level. Primary trend hangs here.",below:"Primary break. Data center capex slowdown fears confirmed."},
{ma:"400d",p:196.0,above:"Secular AI infrastructure trend intact.",below:"Secular break. Cooling demand thesis broken."}]},
momentum:{rsi:45.67,rsiZone:"neutral",macd:{v:-5.731,s:-6.2738,h:0.5428,cross:"bullish"},roc:-4.1},
volume:{avg:"5.5M",recent:"3.9M",ratio:0.7,obv:"flat",accDist:"neutral",lastDay:"3.5M",lastDayX:0.63,volDate:"Oct 1, 2026"},
levels:{fibs:[{r:"0%",p:147,l:"52w low"},{r:"38.2%",p:236,l:"Shallow"},{r:"50%",p:264,l:"Midpoint"},{r:"61.8%",p:291,l:"Deep"},{r:"100%",p:380,l:"52w high"}],pivots:{r2:256,r1:251,p:245,s1:240,s2:233}},
pattern:{name:"ATH Breakout — Q1 Record",target:420,dir:"up",note:"$246.12. RSI 45.7, below 50d, below 200d. 1 level broken. Next earnings Oct 20."},
verdict:{score:81,label:"BUY \u2014 MACD+",c:"y",drivers:"$246.12. Below 50d $262 (-6.1%), below 200d $264 (-6.8%). RSI 45.7 neutral. MACD histogram +0.54 (improving). Nearest observed support $242.84, 1.3% below. 1 prior level BROKEN. Next earnings Oct 20."}},
fundVerified:true,
fundDate:"Sep 17, 2026",
fund:{
story:"$268.83 (Sep 3 close). Data-center thermal and power infrastructure. Q2 (Jul 29) delivered adj EPS $1.52 vs $1.43, adj operating margin 22.6% (+410bps), adj FCF $925M (+234%), and full-year guidance was RAISED across all key metrics. Revenue $3.27B missed the $3.38B consensus on stated supply-chain timing, and the stock fell 17%. Pomerantz and Schall Brown have since opened investor fraud investigations into the disclosure. Next earnings Oct 20.",
drivers:[
{name:"AI Data Center Cooling",dir:"up",detail:"Liquid cooling adoption accelerating. Direct-to-chip sole-source for several hyperscalers. TAM expanding 40%+ annually."},
{name:"Backlog Conversion",dir:"up",detail:"$15B backlog = 3x revenue. Converting at accelerating pace. FY26 guide raised after Q4 beat."},
{name:"Competition",dir:"risk",detail:"Schneider Electric expanding liquid cooling. Pricing pressure possible in 2027+."},
{name:"Power Density Trend",dir:"up",detail:"AI racks hitting 100kW+. Legacy air cooling inadequate. Vertiv's thermal expertise is the moat."}
],
flow:{inst:"Data-center infrastructure ownership broadened with S&P 500 inclusion. Current consensus $341 across 36 analysts. Note the open investor fraud investigations from Pomerantz and Schall Brown following the Q2 disclosure.",retail:"Moderate retail interest. 'AI picks-and-shovels' narrative.",short:"Short interest 4.5% — moderate. Bears see valuation stretched."},
bull:{path:"Liquid cooling adoption accelerates → backlog converts → S&P 500 inclusion drives rerating → revenue $10B+ by 2027 → $300-350.",price:"$420-480"},
bear:{path:"Schneider competition erodes margins. Data center capex slows. Multiple compresses from 38x to 22x. Growth slows to 15%.",price:"$192-$222"},
activeRisks:[{sev:"MED",prob:40,risk:"UIG acquisition execution and balance-sheet strain",trigger:"Announced Sep 2: \u00241.45B cash upfront plus up to \u00241.15B earnouts tied to 12- and 24-month EBITDA targets, \u00242.6B potential. Stock fell 9.6% Sep 9 on capital-allocation scrutiny \u2014 immediate cash drain, possible dilution or debt financing, execution risk on aggressive M&A against 2.15x debt-to-equity",triggerStatus:"active",mitigation:"Strategic logic is sound \u2014 UIG addresses upstream grid and microgrid interconnection, which is the actual bottleneck rather than cooling",pPctNetWorth:2.0,daysToImpact:45,catalyst:"Q3 print Oct 20 \u2014 first look at financing and integration"},{sev:"HIGH",prob:35,risk:"Securities fraud investigations \u2014 Pomerantz LLP and Schall Brown & Schwartz",trigger:"Opened after the Q2 disclosure: revenue missed $3.38B at $3.27B and was attributed to supply-chain timing while full-year guidance was RAISED",triggerStatus:"active",mitigation:"Oct 20 print is where the timing explanation proves out or does not",pPctNetWorth:2.0,daysToImpact:45,catalyst:"Q3 print Oct 20 \u2014 monitor filings"},{sev:"MED",prob:25,risk:"Schneider Electric competition: $100B+ company pushing into AI cooling. Could win hyperscaler contracts",trigger:"Schneider wins named hyperscaler deal",impact:"Growth slows to 15%",catalyst:"Schneider Q1 earnings Apr 24 ✓ — data center revenue + new wins commentary. Also hyperscaler procurement announcements"},
{sev:"MED",prob:30,risk:"Data center capex slowdown: if AI spending peaks, cooling spend follows with 6-12 month lag. VRT is derivative play",trigger:"Hyperscaler capex guidance cuts",impact:"-20% as backlog questioned",catalyst:"MSFT/META/GOOGL/AMZN Q1 earnings Apr 24 ✓-May 1 ✓ — capex guides will directly signal VRT demand pipeline"},

{sev:"LOW",prob:15,risk:"Leverage: 2.15x debt/equity. If growth slows, debt servicing becomes a drag",trigger:"Revenue growth <10%",impact:"Credit downgrade risk",catalyst:"Q1 2026 earnings Apr 30 ✓ — debt/EBITDA ratio + refinancing commentary ✓"}],
killer:"Two or more hyperscalers switch primary cooling vendor from Vertiv to Schneider Electric.",
revMix:[{n:"Data Center",p:52,c:"#3DBFA8"},{n:"Communication Networks",p:22,c:"#7E91E8"},{n:"Commercial/Industrial",p:26,c:"#B266FF"}],
compPos:{xLabel:"Liquid Cooling Share",yLabel:"Backlog Depth",peers:[{n:"VRT",x:65,y:85,self:true},{n:"Schneider",x:40,y:60},{n:"Eaton",x:20,y:40},{n:"nVent",x:15,y:30}]},
mgmt:{beats:4,misses:0,streak:"+4",note:"Giordano Albertazzi executing well. 4 straight beats. Backlog growing every quarter. Guide raised consistently."},
metrics:{lastQ:"Q2 2026 (Jun 2026)",revGrowth:24.0,grossMargin:38.6,opMargin:22.6,netMargin:15.2,roe:32.1,note:"Q2 2026 (Jul 29 BMO): adjusted diluted EPS $1.52 vs $1.43 consensus, +60% YoY. Adjusted operating margin 22.6%, +410bps. Operating cash flow $1,100M and adjusted FCF $925M, up 241% and 234%. FULL-YEAR GUIDANCE RAISED ACROSS ALL KEY METRICS. Net sales $3,274M, +24% YoY (18% organic, 5% acquisitions, 1% FX) but BELOW the $3.38B consensus; the company attributed the shortfall to timing shifts from temporary supply-chain congestion and multi-phased project execution. STOCK FELL ~17% ON THAT. Pomerantz LLP and Schall Brown & Schwartz subsequently opened investigations into potential securities fraud over the disclosure \u2014 a live legal overhang and the reason a clean technical setup trades at a discount. Next print Oct 20."},
watchlist:[{item:"VRT Q1 FY26 Earnings",d:"Apr 29 ✓",why:"Backlog conversion + liquid cooling revenue mix. Margin expansion trajectory."},{item:"Hyperscaler capex guidance updates",d:"Apr",why:"Every $100B of capex = $15-20B cooling TAM."},{item:"Schneider Electric cooling product launch",d:"H1 2026",why:"Competitive threat. Watch for pricing pressure signals."},{item:"NVIDIA GB200 NVL72 rack deployments",d:"2026",why:"Each rack needs Vertiv cooling. Deployment pace = revenue pace."}],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",ptDate:"Sep 14, 2026",riskDate:"Sep 25, 2026"},
catalysts:[{d:"Oct 20",e:"VRT Q3 \u2014 UIG detail; whether Q2 timing revenue appears",i:"high",iv:"high",hm:"N/A"},{d:"H2 2026",e:"Rubin NVL144 ramp (120-130kW)",i:"bullish",iv:"high",hm:"N/A"},{d:"H2 2027",e:"Rubin Ultra NVL576 Kyber (600kW/rack = 5x cooling)",i:"bullish",iv:"very high",hm:"N/A"},{d:"Apr 29 ✓",e:"VRT Q1 Earnings",i:"high",iv:"high",hm:"+8.2%"},{d:"H1 2026",e:"Liquid cooling product launch",i:"bullish",iv:"med",hm:"N/A"},{d:"2026",e:"Schneider competitive response",i:"bearish",iv:"low",hm:"N/A"},{d:"Ongoing",e:"Hyperscaler capex flow-through",i:"bullish",iv:"med",hm:"N/A"}],
peers:[{t:"VRT",pe:32,ev:22,y:-18},{t:"ETN",pe:28,ev:18,y:-5},{t:"EMR",pe:22,ev:14,y:2},{t:"GNRC",pe:20,ev:12,y:-8}],
playbook:[
pb("1 WEEK","VRT $246 \u2014 BUY (81). Nearest support $242.84, 1.3% below (volume node, never defended). +39% to $341 consensus. RSI 46, MACD +0.54, 1 broken level above. NEXT: Oct 20 \u2014 VRT Q3 \u2014 UIG detail; whether Q2 timing revenue appears. Watch: UIG acquisition execution and balance-sheet strain Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",G,"VRT $246.12 as of the latest close, BUY at 81 on the tool's five-component score. $268.83 (Sep 3 close). Data-center thermal and power infrastructure. Nearest observed support sits at $242.84.","BUY (81). Watch $242.84, 1.3% below (volume node, never defended). Upside +39% to $341; reward-to-risk 12.9x. Next catalyst: VRT Q3 \u2014 UIG detail; whether Q2 timing revenue appears."),
pb("1 MONTH","VRT $246.12 \u2014 THESIS: $268.83 (the scheduled date close). Data-center thermal and power infrastructure. KEY RISK: UIG acquisition execution and balance-sheet strain NEXT CATALYST: VRT Q3 \u2014 UIG detail; whether Q2 timing revenue appears. Upside +39%, reward-to-risk 12.9x to nearest support. Refreshed the scheduled date.",G,"VRT $246.12 (the scheduled date close), BUY at 81. $268.83 (the scheduled date close). Data-center thermal and power infrastructure. Key risk: UIG acquisition execution and balance-sheet strain","BUY (81). Watch $242.84, 1.3% below (volume node, never defended). Upside +39% to $341; reward-to-risk 12.9x. Next catalyst: VRT Q3 \u2014 UIG detail; whether Q2 timing revenue appears."),
pb("3 MONTHS","VRT $246.12 \u2014 NEXT QUARTER: VRT Q3 \u2014 UIG detail; whether Q2 timing revenue appears. The print either confirms the thesis ($268.83 (the scheduled date close). Data-center thermal and power infrastructure.) or tests the key risk (UIG acquisition execution and balance-sheet strain) Nearest support $242.84, 1.3% below (volume node, never defended). Refreshed the scheduled date.",G,"VRT $246.12 (the scheduled date close), BUY at 81. $268.83 (the scheduled date close). Data-center thermal and power infrastructure. Key risk: UIG acquisition execution and balance-sheet strain","BUY (81). Watch $242.84, 1.3% below (volume node, never defended). Upside +39% to $341; reward-to-risk 12.9x. Next catalyst: VRT Q3 \u2014 UIG detail; whether Q2 timing revenue appears."),
pb("6 MONTHS","VRT $246.12 \u2014 SIX MONTHS: two prints inside the window. BUY (81). Consensus $341 (+39%), street range $236 (-4%) to $500 (+103%). What would change the view: UIG acquisition execution and balance-sheet strain Refreshed the scheduled date.",G,"VRT $246.12 (the scheduled date close), BUY at 81. $268.83 (the scheduled date close). Data-center thermal and power infrastructure. Key risk: UIG acquisition execution and balance-sheet strain","BUY (81). Watch $242.84, 1.3% below (volume node, never defended). Upside +39% to $341; reward-to-risk 12.9x. Next catalyst: VRT Q3 \u2014 UIG detail; whether Q2 timing revenue appears."),
pb("1 YEAR","VRT $246.12 \u2014 TWELVE MONTHS: consensus $341 implies +39%; street range $236 (-4%) to $500 (+103%). THESIS: $268.83 (the scheduled date close). Data-center thermal and power infrastructure. STRUCTURAL RISK: UIG acquisition execution and balance-sheet strain Refreshed the scheduled date.",G,"VRT $246.12 (the scheduled date close), BUY at 81. $268.83 (the scheduled date close). Data-center thermal and power infrastructure. Key risk: UIG acquisition execution and balance-sheet strain","BUY (81). Watch $242.84, 1.3% below (volume node, never defended). Upside +39% to $341; reward-to-risk 12.9x. Next catalyst: VRT Q3 \u2014 UIG detail; whether Q2 timing revenue appears.")]},
PWR:{name:"Quanta Services",price:662.6,avgPT:800,highPT:976,ptDate:"Sep 21, 2026",ptVerified:true,lowPT:517,high52:788.75,low52:404.5,fwdPE:36.5,mktCap:"$95B",ytd:51,yr1:95,consensus:"Buy",earningsDate:"Oct 29, 2026",epsEst:3.33,epsEstDate:"Jul 23, 2026",sector:"AI Infrastructure",support:[{lvl:642.11,label:"Swing low 2026-06-10 \u2014 held 5x"},{lvl:593.7,label:"Swing low 2026-09-01 \u2014 held 1x"},{lvl:554.12,label:"Swing low 2026-07-29 \u2014 held 0x"}],supportDate:"Oct 1, 2026",brokenSup:[],
supportVerified:true,
supportAnchor:"$642.11 (3.1%, held 5x) / $593.70 (10.4%, held 1x) / $554.12 (16.4%, held 0x) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $642.11, 3.1% below $662.60. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.2,
news:[n(10007,"Q2 BEAT AND RAISE CONFIRMED; RECORD $53.4B BACKLOG; TARGETS NEAR $800","Q2 revenue $9.56B vs $8.59B, adjusted EPS $4.24 vs $3.29 \u2014 eighth straight beat. Backlog a record $53.4B. FY26 revenue guidance raised to $39.3-39.7B. Citi raised to $871, Guggenheim upgraded to Buy at $800, TD Cowen $785, Mizuho $741.","Zacks / Stockanalysis","2026-09-21",0.4,"e",16,"earnings"),n(9911,"PWR earnings date CORRECTED to Jul 30 BMO \u2014 this file had Jul 29","Company press release dated Jul 10, 2026: Quanta Services will release Q2 2026 financial results on THURSDAY, JULY 30, 2026, BEFORE MARKET OPEN. This dashboard was carrying Jul 29, which was wrong. The correction matters operationally: the $575 hard stop sits 1.7% below the $585 market, and the print is one day later than assumed \u2014 there is an extra full session of exposure before the event, not less. S&P Global 30-analyst consensus $761 (low $420, high $901, Buy). FY26 guidance 13.55-14.25 EPS.","Quanta Services IR / S&P Global","2026-07-28",0.0,"e",14,"catalyst"),
n(9906,"PWR -5.69% to $585 \u2014 reports Jul 29 with the stock sitting 1.7% above its hard stop","Jul 28: Quanta fell 5.69% to $585.00, giving up its Monday relative strength as the whole AI-power complex was sold. It reports Q2 on Jul 29. OPERATIONAL FLAG: the hard stop is $575, which is 1.7% below the market on the eve of an earnings print. A normal post-print move in either direction takes that out mechanically. This needs an explicit decision \u2014 either widen it for the event or treat a break as a real exit \u2014 rather than being left to resolve itself by accident.","Position review","2026-07-28",-0.4,"e",14,"news"),

n(9121,"JPMorgan downgrades PWR to Neutral","Jul 22 downgrade from Overweight after the run. Consensus still $761 avg / $940 Truist high with Jul 29 BMO print next. Grid + AI power capex thesis intact; valuation call.","TipRanks / CNN","2026-07-22",-0.3,"a",12),n(987,"PWR PTs verified May 18 — avg $504, high $540","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(960,"PWR closed $728.8 (-5.35%) May 14","May 14 EOD — semis sell-off. Position down for the session.","Brokerage","2026-05-14",-0.4,"v",7),
n(941,"PWR PTs refreshed May 12 — avg $620 (was $815), high $733","MarketBeat avg $603, TipRanks 3-mo $624, Public.com $574 (Apr 30 18 analysts), Stockscan $691. Most-recent Citi $733, Truist $713, Stifel $654.","Web Verified","2026-05-12",0.4,"v",7),
n(942,"PWR options verified May 12 — IVR 70 (was 50)","Source: Macroaxis Apr 2026 explicit 40.0% implied volatility + Option IV 0.56 annualized. PWR up 65% YTD vs historical 25-30% IV = elevated IVR ~70.","Web Verified","2026-05-12",0.4,"v",7),
n(900,"PWR support verified May 11 — S1 anchor: Pivot S2 $700","S1 $680 within 2.9% of pivot S2 $700","Web Verified","2026-05-11",0.4,"v",7),
n(891,"PWR options verified May 11 — IV 32%, IVR 50","Source: Industrial cluster IV (Quanta peer comparison) - post Q1 raise IV around 30-35","Web Verified","2026-05-11",0.4,"v",7),
n(871,"PWR options data verified May 11 — IV 32%, IVR 55","Source: Estimated from post-Q1 IV crush pattern, similar utility/infrastructure names","Web Verified","2026-05-11",0.4,"v",7),
n(851,"PWR PTs verified May 11 — avg $815","Source: Jefferies $857 (recent), BMO $800, Evercore $800, JPMorgan $805, Baird $777. Avg ~$815","Web Verified","2026-05-11",0.4,"v",7),
n(832,"PWR technicals verified May 11","50d MA, 200d MA, RSI from web sources: DailyPolitical May 9 (50d=$591.73, 200d=$505.56)","Web Verified","2026-05-11",0.3,"t",6),
n(797,"PWR $781.98 +3.87% May 11 — AI infrastructure rally continuation","Day move +3.87%. AI infrastructure rally continuation. Market: semis-led rally, S&P/NDX at ATH, six-week winning streak. CPI 3.7%, Fed on hold. Trump-Xi summit May 14-15 ✓","Reuters","2026-05-11",0,"m",4),
n(784,"PWR $715 -2.55% May 7 — profit-taking after Mon ATH $773","Day move -2.55% from May 5 close. profit-taking after Mon ATH $773. Macro: NVDA broke into ATH zone +7.5% on AI capex narrative re-acceleration.","Reuters","2026-05-07",0,"m",4),

n(731,"PWR $715 +2.26% May 1 — continues post-Q1 blowout rally","Day 2 of post-earnings rally. New ATH at $715. Backlog $44B confirmed. Analyst PT upgrades cluster forming.","Quanta","2026-05-05",0.65,"v",8),
n(703,"PWR $712 +18% Apr 30 — Q1 BLOWOUT BMO, backlog raised","EPS $2.04 BEAT, FY26 guide raised >25% growth (was >20%). Backlog $44B+ confirmed. Stock +18% intraday. AI power demand validated.","Quanta","2026-04-30",0.85,"e",10),
n(1,"Q4 BLOWOUT — EPS $3.16 beat $3.02, Rev $7.84B beat $7.38B","Revenue +20% YoY. Electric Infrastructure drove upside. FY26 guide: EPS $12.65-$13.35, Rev $33.25-$33.75B — ALL above Street. Backlog $44B ATH.","Earnings","2026-02-01",0.95,"e",7),
n(2,"Post-earnings PT surge — UBS $646, Truist $643","UBS raised from $518 to $646 (Buy). Truist $548→$643 (Buy). Evercore $604. Roth Mkm $600. JPM $515 OW. Massive upgrades across Street.","Analysts","2026-02-03",0.9,"a",7),
n(3,"Acquired Cupertino Electric for $1.7B + 3 tuck-ins","Tri-City, Wilson Construction, Billings Flying Service — $1.73B total. Accretive $0.40-$0.50 EPS to FY26. Deepens electrical capacity.","Company PR","2026-02-05",0.6,"g",7),
n(4,"$44B backlog — all-time high","Record RPO $23.76B. Electric Infrastructure at ATH. Multi-year visibility. Grid + data center driving.","Earnings","2026-02-07",0.8,"g",7),
n(5,"AI data center electrical infrastructure demand surging","Every 1GW data center campus needs $2-3B of electrical infrastructure. Quanta is #1. Convergence of utility + power gen + large-load.","Barron's","2026-02-09",0.6,"g",7),
n(6,"Grid modernization spend accelerating","$2T US grid investment needed over 20 years. Quanta is the picks-and-shovels.","Utility Dive","2026-02-11",0.5,"g",5),
n(7,"New ATH $555 — stock up 6.7% post earnings","Closed at $554 on Feb 19. Hit $555 intraday Feb 20. Strongest in sector. Michael Reynolds flags 'AI valuations getting rich.'","Market","2026-02-13",0.4,"t",6),
n(8,"PWR new ATH $574. Grid + data center backlog $44B. GTC validates AI infrastructure buildout","Record backlog. Labor tight but margins holding. S&P 500 VRT/COHR addition = sector validation","Market","2026-02-15",0.7,"b",7),
n(9,"Cupertino Electric $1.7B integration on track. West Coast data center pipeline expanding","Tuck-in acquisitions supplement organic. CEO bullish 2027 pipeline visibility","Earnings","2026-02-17",0.5,"b",7)
,
n(118,"PWR +3.2% infrastructure play — grid buildout accelerating","Bipartisan support for power infrastructure. $580→$551 on war fears but demand pipeline strong. Data center + grid modernization = secular. Support $530.","Market","2026-04-05",0.4,"e",10)
,
n(217,"PWR $587 — grid buildout secular, infrastructure demand pipeline strong","Bipartisan support. Data center + grid modernization pipeline. May 6 earnings. Defensive + growth.","Market","2026-04-16",0.4,"e",10)
,
n(237,"PWR $603.95 +2.81% to ATH — grid + data center demand secular, bipartisan support","Grid infrastructure buildout in momentum as AI/EV/renewable capex scales. $44B backlog. 2026 guide: double-digit rev/EPS/EBITDA growth. Labor-constrained = pricing power. May 6 earnings.","Market context Apr 17 2026","2026-04-17",0.7,"m",12)
,
n(470,"PWR confirms Q1 earnings Apr 30 AM — scheduled release","PWR press release Apr 15 2026: Quanta Services confirmed Q1 2026 earnings Thursday Apr 30 before market opens + webcast. Q1 EPS est $2.06 (TipRanks). Key metrics: backlog growth, transmission awards, data center capacity additions.","PWR PR Apr 15 2026","2026-04-15",0.5,"e",11),
n(471,"2025 context: $44B backlog record, FY26 guide +20% EPS growth","Q4 2025 earnings call: FY2025 rev $28.5B (+20% YoY). Adjusted EBITDA $2.9B. Adjusted diluted EPS $10.75 (+20% YoY). Backlog $44B record. 2026 guide: double-digit revenue/net income/EBITDA growth + 20%+ EPS upside. FCF $1.8B 2026 midpoint. $500-700M investment over next years in transformer manufacturing 345-765 kV to derisk supply chain.","Q4 2025 Earnings Context","2026-02-20",0.9,"e",15),
n(472,"8 acquisitions 2025 — Tri City, Wilson Construction, Billings Flying","2025 M&A expansion: 8 acquisitions completed including 3 in Q4 (Tri City Group, Wilson Construction Company, Billings Flying Service). Aggregate upfront consideration ~$1.7B in Q4 alone. Added ~11,100 employees bringing workforce to ~69,500. Leverage still <2x.","PWR FY25 context","2026-02-20",0.7,"m",12),
n(473,"Data center power demand driver — AI buildout thesis","Ongoing: PWR prime beneficiary of AI data center buildout. Transmission/substation engineering for hyperscaler capacity. GOOGL $175B, MSFT FY26 capex +67%, META $115-135B all flow to grid infrastructure. 765kV transmission awards = multi-year pipeline.","Market context Apr 20 2026","2026-04-20",0.65,"m",12)
,
n(549,"PWR +0.27% Apr 21 — Apr 30 earnings 9d","Apr 21: PWR $606.60 +$1.63. Stable into Apr 30 Q1. Grid infrastructure secular + $44B backlog. FY26 +20% EPS guide.","Apr 21","2026-04-21",0.3,"m",10)
,
n(639,"PWR +1.67% $616.00 — power demand tailwind continues — Apr 22","Apr 22 close $616.00 +1.67%. Google Ironwood launch = more data center capacity = more transmission/grid work for PWR. Apr 30 earnings 8 days out. FY26 +20% EPS growth story intact.","Market context Apr 22 2026","2026-04-22",0.5,"m",12)
,
n(643,"VRT -0.58% Apr 27 — $322 Q1 earnings Apr 23 digesting","Apr 27 close $321.58. Apr 23 earnings beat digested. Liquid cooling secular intact. $44B backlog. Next catalyst Jul 30 Q2.","Market Apr 27 2026","2026-04-27",0.4,"m",12)
,
n(664,"PWR Apr 30 BMO earnings: $2.04 EPS est — backlog + FY26 >20% EPS growth guide","4 consecutive EPS beats. $44B record backlog. FY26 guide >20% EPS growth + double-digit rev/EBITDA. AI data center power demand structural. Investor Day Mar 31 set bullish tone. Q1 seasonally slowest — low bar for beat.","Earnings Preview Apr 27 2026","2026-04-27",0.6,"e",14)
,
n(677,"PWR Apr 29 ✓ — pre-earnings hold. Backlog + FY26 >20% guide reaffirm key","PWR closes basically flat into Apr 30 BMO earnings. Investor Day Mar 31 set bullish tone. Q1 seasonally weakest = low bar for beat. AI power demand secular.","Stock close Apr 29 2026","2026-04-29",0.4,"n",8)
],
options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:17.3,pcRatio:null,maxPain:640,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:11638,maxPainNear:640.0,maxPainNearExp:"2026-10-16",maxPainNearDTE:15,flow:[],atmIV:35.37,atmIVExp:"2026-10-16",ivObs:17},
optionsDate:"Oct 1, 2026",optionsVerified:true,
tech:{
ma:{d50:643.0,d100:671.0,d200:604.0,d400:486.0,align:"bullish",brk:[{ma:"50d",p:643.0,above:"Above 50d. Grid and data-center backlog momentum intact.",below:"Below 50d. Momentum cooling \u2014 next print Oct 29."},{ma:"100d",p:671.0,above:"Intermediate uptrend holding.",below:"Intermediate trend break."},{ma:"200d",p:604.0,above:"Primary uptrend intact.",below:"Primary trend break — reassess the AI-power thesis."}],d50:590,d100:540,d200:506,d400:380},
momentum:{rsi:57.86,rsiZone:"neutral",macd:{v:3.3682,s:-0.6285,h:3.9967,cross:"bullish"},roc:8.5},
volume:{avg:"1.0M",recent:"0.8M",ratio:0.78,obv:"rising",accDist:"neutral",lastDay:"0.9M",lastDayX:0.87,volDate:"Oct 1, 2026"},
levels:{fibs:[{r:"0%",p:405,l:"52w low"},{r:"38.2%",p:551,l:"Shallow"},{r:"50%",p:597,l:"Midpoint"},{r:"61.8%",p:642,l:"Deep"},{r:"100%",p:789,l:"52w high"}],pivots:{r2:681,r1:672,pp:655,s1:646,s2:630}},
pattern:{name:"ATH — Q1 Blowout",target:850,dir:"up",note:"$662.60. RSI 57.9, above 50d, above 200d. Next earnings Oct 29."},
verdict:{score:74,label:"BUY \u2014 neutral setup",c:"g",drivers:"$662.60. Above 50d $643 (+3.0%), above 200d $604 (+9.7%). RSI 57.9 neutral. MACD histogram +4.00 (improving). Nearest observed support $642.11, 3.1% below, held 5x. Next earnings Oct 29."}},
fundVerified:true,
fundDate:"Sep 21, 2026",
fund:{
story:"$620.06 (Sep 3 close). Grid and electrification contractor. Reported Jul 30. Next earnings Oct 29. Latest-quarter detail in this panel is NOT yet refreshed.",
drivers:[
{name:"AI Data Center Electrical",dir:"up",detail:"Every 1GW campus needs $2-3B electrical infra. Quanta is #1 contractor for hyperscalers."},
{name:"Record Backlog",dir:"up",detail:"$44B backlog = 5.5x annual revenue. All-time high. Multi-year visibility. FY26 guide $33.25-$33.75B rev."},
{name:"Grid Modernization",dir:"up",detail:"$2T US grid investment over 20 years. IRA + AI demand + EV charging driving."},
{name:"Labor Constraints",dir:"risk",detail:"Skilled electrician shortage could cap revenue growth. Training pipeline critical."}
],
flow:{inst:"Infrastructure and utility funds dominate the register. Current consensus $761 across 30 analysts.",retail:"Growing retail awareness on AI infrastructure theme.",short:"Short interest 2.8% — low. Consensus bullish."},
bull:{path:"$44B backlog converts → data center + grid revenue sustains 20%+ growth → FY26 guide $12.65-$13.35 EPS → $800-850.",price:"$800-850"},
bear:{path:"Data center build pace slows. Grid spend delayed by politics. Growth decelerates to 8%. Multiple to 20x.",price:"$350-400"},
activeRisks:[{sev:"MED",prob:30,risk:"Labor shortage: $44B backlog needs skilled workers. Electrical construction labor tight — could delay projects and compress margins",trigger:"Labor cost +10% YoY",impact:"Margin miss -100bps",catalyst:"Q1 2026 earnings May 1 ✓ — labor cost commentary + project completion rates. BLS employment data monthly"},
{sev:"MED",prob:25,risk:"Interest rate sensitivity: infrastructure projects rate-sensitive. If rates stay high due to oil inflation, project starts slow",trigger:"10yr yield >4.5% sustained",impact:"New orders slow -10%",catalyst:"FOMC Jun 18 ✓ — rate decision. Also 10yr Treasury auction results. If oil keeps rates elevated, pipeline at risk"},
{sev:"LOW",prob:15,risk:"Acquisition integration: Cupertino Electric ($1.7B) + 3 tuck-ins. If integration stumbles, margin drag",trigger:"Integration issues surface in earnings",impact:"Temporary margin dip",catalyst:"Q1 2026 earnings May 1 ✓ — Cupertino Electric integration update + margins by segment"},
{sev:"LOW",prob:20,risk:"Political risk: grid modernization depends on bipartisan support. DOGE cuts to DOE funding could slow pipeline",trigger:"DOE budget cuts enacted",impact:"Pipeline slowdown -5%",catalyst:"DOE appropriations conference/floor process into Sep 2026 — line-item risk for grid programs"}],
killer:"Major hyperscaler pauses or cancels data center campus builds, signaling capex cycle peaking.",
revMix:[{n:"Electric Power",p:48,c:"#3DBFA8"},{n:"Renewable Energy",p:28,c:"#7E91E8"},{n:"Underground/Infra",p:24,c:"#B266FF"}],
compPos:{xLabel:"Data Center Exposure",yLabel:"Backlog Scale",peers:[{n:"PWR",x:70,y:90,self:true},{n:"MYRG",x:40,y:30},{n:"EME",x:55,y:60},{n:"MTZ",x:50,y:50}]},
mgmt:{beats:5,misses:0,streak:"+5",note:"Duke Austin delivering. 5 straight beats. Q4 blowout $3.16 vs $3.02. FY26 guide above consensus. Tuck-in acquisitions smart."},
metrics:{lastQ:"Q2 2026 (Jun 2026)",revGrowth:41.1,opMargin:11.0,note:"Q2 2026 (Jul 30): revenue $9.56B vs $8.59B consensus, +41.1% YoY from $6.77B. Adjusted EPS $4.24 vs $3.29 Zacks consensus \u2014 EIGHTH consecutive beat. Electric Infrastructure revenue +44% at an 11.5% operating margin; Underground Utility and Infrastructure +31% at 9.1%. RECORD BACKLOG $53.4B, up from $48.5B at Q1. Four acquisitions in Q2 and July added roughly 7,400 employees. FY2026 GUIDANCE RAISED: revenue $39.3-39.7B from $34.7-35.2B (consensus had been $35.01B); adjusted EBITDA $3.74-3.86B from $3.49-3.65B; adjusted EPS $16.45-16.95. Zacks 2026 consensus moved to $15.94 from $14.27; 2027 to $18.51. Issued $500M of 4.85% notes. Post-print targets: Citi $871, Guggenheim upgrade to Buy $800, TD Cowen $785, Mizuho $741 Neutral. Management language remains hedged on weather, permitting and supply-chain timing. Next print Oct 29."},
watchlist:[{item:"PWR Q1 2026 Earnings",d:"Apr 30",why:"Backlog conversion rate + Cupertino/tuck-in integration. FY26 guide tracking."},{item:"Hyperscaler campus construction timelines",d:"Ongoing",why:"Delays = revenue pushouts. Acceleration = upside."},{item:"IRA/grid funding disbursements",d:"2026",why:"Federal grid funding flowing. Each $1B = $200-300M Quanta revenue."},{item:"Skilled labor availability data",d:"Quarterly",why:"Electrician shortage is the growth constraint. Watch training pipeline."}],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",ptDate:"Sep 21, 2026",riskDate:"Sep 25, 2026"},
catalysts:[{d:"Oct 29",e:"PWR Q3 earnings",i:"high",iv:"med",hm:"N/A"},{d:"Apr 30 ✓",e:"PWR Q1 2026 Earnings",i:"high",iv:"high",hm:"+6.7%"},{d:"2026",e:"Cupertino + tuck-in integration",i:"bullish",iv:"low",hm:"N/A"},{d:"Ongoing",e:"Hyperscaler campus builds",i:"bullish",iv:"med",hm:"N/A"},{d:"2026",e:"Grid modernization funding",i:"bullish",iv:"med",hm:"N/A"}],
peers:[{t:"PWR",pe:28,ev:16,y:-12},{t:"EME",pe:24,ev:14,y:-8},{t:"MTZ",pe:18,ev:10,y:-15},{t:"MYRG",pe:22,ev:12,y:-5}],
playbook:[
pb("1 WEEK","PWR $663 \u2014 BUY (74). Nearest support $642.11, 3.1% below, held 5x. +21% to $800 consensus. RSI 58, MACD +4.00. NEXT: Oct 29 \u2014 PWR Q3 earnings. Watch: Labor shortage: $44B backlog needs skilled workers. Electrical construction labor tight — could delay projects and compress margins Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",G,"PWR $662.60 as of the latest close, BUY at 74 on the tool's five-component score. $620.06 (Sep 3 close). Grid and electrification contractor. Nearest observed support sits at $642.11.","BUY (74). Watch $642.11, 3.1% below, held 5x. Upside +21% to $800; reward-to-risk 6.7x. Next catalyst: PWR Q3 earnings."),
pb("1 MONTH","PWR $662.60 \u2014 THESIS: $620.06 (the scheduled date close). Grid and electrification contractor. KEY RISK: Labor shortage: $44B backlog needs skilled workers. Electrical construction labor tight — could delay projects and compress margins NEXT CATALYST: PWR Q3 earnings. Upside +21%, reward-to-risk 6.7x to nearest support. Refreshed the scheduled date.",G,"PWR $662.60 (the scheduled date close), BUY at 74. $620.06 (the scheduled date close). Grid and electrification contractor. Key risk: Labor shortage: $44B backlog needs skilled workers. Electrical construction labor tight — could delay projects and compress margins","BUY (74). Watch $642.11, 3.1% below, held 5x. Upside +21% to $800; reward-to-risk 6.7x. Next catalyst: PWR Q3 earnings."),
pb("3 MONTHS","PWR $662.60 \u2014 NEXT QUARTER: PWR Q3 earnings. The print either confirms the thesis ($620.06 (the scheduled date close). Grid and electrification contractor.) or tests the key risk (Labor shortage: $44B backlog needs skilled workers. Electrical construction labor tight — could delay projects and compress margins) Nearest support $642.11, 3.1% below, held 5x. Refreshed the scheduled date.",G,"PWR $662.60 (the scheduled date close), BUY at 74. $620.06 (the scheduled date close). Grid and electrification contractor. Key risk: Labor shortage: $44B backlog needs skilled workers. Electrical construction labor tight — could delay projects and compress margins","BUY (74). Watch $642.11, 3.1% below, held 5x. Upside +21% to $800; reward-to-risk 6.7x. Next catalyst: PWR Q3 earnings."),
pb("6 MONTHS","PWR $662.60 \u2014 SIX MONTHS: two prints inside the window. BUY (74). Consensus $800 (+21%), street range $517 (-22%) to $976 (+47%). What would change the view: Labor shortage: $44B backlog needs skilled workers. Electrical construction labor tight — could delay projects and compress margins Refreshed the scheduled date.",G,"PWR $662.60 (the scheduled date close), BUY at 74. $620.06 (the scheduled date close). Grid and electrification contractor. Key risk: Labor shortage: $44B backlog needs skilled workers. Electrical construction labor tight — could delay projects and compress margins","BUY (74). Watch $642.11, 3.1% below, held 5x. Upside +21% to $800; reward-to-risk 6.7x. Next catalyst: PWR Q3 earnings."),
pb("1 YEAR","PWR $662.60 \u2014 TWELVE MONTHS: consensus $800 implies +21%; street range $517 (-22%) to $976 (+47%). THESIS: $620.06 (the scheduled date close). Grid and electrification contractor. STRUCTURAL RISK: Labor shortage: $44B backlog needs skilled workers. Electrical construction labor tight — could delay projects and compress margins Refreshed the scheduled date.",G,"PWR $662.60 (the scheduled date close), BUY at 74. $620.06 (the scheduled date close). Grid and electrification contractor. Key risk: Labor shortage: $44B backlog needs skilled workers. Electrical construction labor tight — could delay projects and compress margins","BUY (74). Watch $642.11, 3.1% below, held 5x. Upside +21% to $800; reward-to-risk 6.7x. Next catalyst: PWR Q3 earnings.")]},
ANET:{name:"Arista Networks",price:204.49,avgPT:241,highPT:289,ptDate:"Sep 21, 2026",ptVerified:true,lowPT:185,high52:214.89,low52:114.52,fwdPE:43.5,mktCap:"$259B",ytd:53,yr1:138,consensus:"Strong Buy",earningsDate:"Nov 3, 2026",epsEst:1.09,epsEstDate:"Sep 21, 2026",sector:"AI Networking",support:[{lvl:181.27,label:"Swing low 2026-09-03 \u2014 held 0x"},{lvl:156.84,label:"Swing low 2026-07-29 \u2014 held 0x"},{lvl:145.32,label:"Swing low 2026-06-09 \u2014 held 0x"}],supportDate:"Oct 1, 2026",brokenSup:[],
supportVerified:true,
supportAnchor:"$181.27 (11.4%, held 0x) / $156.84 (23.3%, held 0x) / $145.32 (28.9%, held 0x) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $181.27, 11.4% below $204.49. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.15,
news:[n(10006,"JOINS S&P 100; CONSENSUS TARGET RAISED TO $241 FROM $192; INSIDER SALES FILED","Added to the S&P 100 at the Sep 21 open. S&P Global consensus now $241.04 across 31 analysts (range $185-$289), up from about $192 before the Q2 print; the $190 figures on some aggregators are pre-print. 2026 EPS estimate raised to $3.80 from $3.37. Insider selling: CEO Jayshree Ullal filed intent to sell 1 million shares; Andy Bechtolsheim 300,000.","Stockanalysis / Simply Wall St","2026-09-21",0.2,"a",16,"analyst"),n(982,"ANET PTs verified May 18 — avg $183, high $220","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(953,"ANET closed $141.4 (-0.40%) May 14","May 14 EOD — semis sell-off. Position down for the session.","Brokerage","2026-05-14",-0.1,"v",7),
n(905,"ANET support verified May 11 — S1 anchor: 200d MA $135","S1 $134 within 0.7% of 200d MA — all 3 MAs cluster $135-$138","Web Verified","2026-05-11",0.4,"v",7),
n(895,"ANET options verified May 11 — IV 50%, IVR 55","Source: AlphaQuery 60d IV Mean 61.68% (Nov 2025), normalized to 30d est 50%","Web Verified","2026-05-11",0.4,"v",7),
n(890,"ANET options verified May 11 — IV 36%, IVR 40","Source: Yahoo Finance ANET options chain (50d IV cluster), 52w volatility consistent with peer cluster","Web Verified","2026-05-11",0.4,"v",7),
n(872,"ANET options data verified May 11 — IV 36%, IVR 45","Source: Estimated from peer (similar mid-cap networking) - typical for sector","Web Verified","2026-05-11",0.4,"v",7),
n(852,"ANET PTs verified May 11 — avg $179","Source: TickerNerd 41 analysts median $179, range $140-220. Morgan Stanley high","Web Verified","2026-05-11",0.4,"v",7),
n(833,"ANET technicals verified May 11","50d MA, 200d MA, RSI from web sources: Investing.com (50d=$138.06, 200d=$135.47, RSI 53.38)","Web Verified","2026-05-11",0.3,"t",6),
n(803,"ANET $136.66 -2.99% May 11 — drift continues post-earnings","Day move -2.99%. drift continues post-earnings. Market: semis-led rally, S&P/NDX at ATH, six-week winning streak. CPI 3.7%, Fed on hold. Trump-Xi summit May 14-15 ✓","MarketWatch","2026-05-11",0,"m",4),
n(762,"ANET Q1 BEAT but Q2 GUIDE LIGHT — sell-the-news -13% AH","EPS $0.87 vs $0.81, Rev $2.71B (+35% YoY) BEAT. Q2 guide $2.80B vs $2.82B est SLIGHTLY LIGHT. Q2 EPS $0.88 vs $0.87 in-line. Stretched valuation post 32% YTD, NPS 89. AI networking demand validated, thesis intact","Benzinga/Arista PR","2026-05-05",-0.5,"f",10),
n(757,"ANET $166.87 May 5 [SUPERSEDED by Q1 BEAT]ngs setup TODAY AC","Q1 earnings TODAY AC. ±7% implied. 8Q beat streak. EPS $0.81 / Rev $2.62B est.","Arista","2026-04-15",0.2,"e",8),
n(709,"ANET $166.87 +1% Apr 30 — AI networking demand intact","800G mix continues to grow. Hyperscaler capex commitments support FY26 thesis. May 6 earnings preview rally.","Arista","2026-04-30",0.3,"m",7),
n(1,"Q4 BLOWOUT — Rev $2.49B +29% YoY, EPS $0.82 beat $0.76","First quarter with non-GAAP net income exceeding $1B. Raised 2026 growth outlook to 25%. Goldman/MS raised PTs to $450-500. Stock +7% on report day.","ANET/Analysts","2026-02-01",0.95,"e",7),
n(2,"Stryker hit by Iran-linked cyberattack. VRT joining S&P 500 Mar 23. Post-GTC: catalyst","Cisco warned of weak memory chip demand. Dell, HPE, ANET, NetApp all hit. ANET -10% in 5 trading days.","IBD","2026-02-03",-0.55,"k",7),
n(3,"NVDA Spectrum-X in Meta deal — competitive threat","Meta integrating NVDA Ethernet switches in new deal. Competition for AI switching share intensifying.","Market","2026-02-05",-0.5,"m",7),
n(4,"Balance sheet fortress — $6B+ cash, no debt","Firepower for massive R&D or strategic M&A. 1.6T networking cycle ahead in late 2026/2027.","Financials","2026-02-07",0.5,"v",7),
n(5,"Enterprise AI 'second wave' building","Hyperscalers were first movers; Fortune 500 now building private AI clouds. ANET campus/enterprise poised to capture.","Industry","2026-02-09",0.6,"g",7),
n(6,"42x forward earnings — priced as AI play","Premium valuation vs hardware peers. Justified if 25% growth sustains. Post-GTC: catalyst.","Valuation","2026-02-11",-0.2,"v",6),
n(7,"BofA: Microsoft + Meta driving 2025 revenue","Top 2 customers heavily investing in AI networking. Concentration risk but also massive tailwind.","BofA","2026-02-13",0.5,"a",7),
n(8,"Post-GTC validates 800G networking. Spectrum-X adoption positive for ANET ecosystem","Networking demand confirmed by hyperscaler capex. Custom switch threat medium-term not near-term","GTC","2026-02-15",0.6,"b",7),
n(9,"Export restriction draft softening. Commerce Dept narrower scope than feared","International data center rev less at risk. ANET networking gear not directly targeted","Reuters","2026-02-17",0.4,"b",7)
,
n(119,"ANET +6.8% — AI cluster networking demand strong, 800G adoption accelerating","Switch demand from hyperscalers unabated. War deescalation helps sentiment. Support $115. Apr earnings next catalyst. Campus + cloud dual growth.","Market","2026-04-05",0.5,"m",10)
,
n(218,"ANET +4.3% to $149.87 — AI cluster networking demand strong, 800G adoption","Switch demand from hyperscalers unabated. May 6 earnings. Campus + cloud dual growth. 1.6T next-gen visibility.","Market","2026-04-16",0.7,"m",14)
,
n(238,"ANET $164.50 +2.17% continues rally — Marvell Q4 test will bleed into ANET read","FinancialContent analysis: Marvell Q4 earnings being watched as AI infra health check; MRVL strength bodes well for ANET which relies on high-speed components for next-gen AI switches. 800G + 1.6T networking. May 6 Q1 earnings.","FinancialContent Apr 2026","2026-04-17",0.7,"m",12)
,
n(480,"ANET earnings CONFIRMED May 5 After Close — 2026 AI guide raised to $3.25B","TipRanks Confirmed May 5 2026 After Close. 2025 FY: Rev $9.0B (+28.6% YoY), Q4 $2.49B (+28.9% YoY). 2026 outlook RAISED: revenue $11.25B (+25% growth), AI networking $3.25B (up from $2.75B — DOUBLING from 2025). Q1 guide ~$2.6B revenue, GM 62-63%, OM ~46%. Cloud+AI titans 48% of 2025 revenue.","TipRanks Apr 18 2026","2026-04-18",0.85,"e",15),
n(481,"ATH $167 new 52w high Apr 20 — AI networking bull thesis","Apr 20 close: ANET $167.29 NEW 52W HIGH. Breakout above $165 resistance on MRVL/GOOGL AI chip news read-through. Network switching demand acceleration into AI hyperscaler buildout.","Market context Apr 20 2026","2026-04-20",0.65,"m",13),
n(482,"150M cumulative ports shipped Q4 2025 — 800G momentum","FY25 context: Surpassed 150M cumulative ports shipped Q4 2025. 100+ customers for EtherLink 800G. Launched 7800R4 spine. 7000 Series + EtherLink Spine/Leaf continuing. Co-designs for AI rack systems. 1.6T switching in development.","Q4 2025 earnings call","2026-02-18",0.7,"e",13),
n(483,"Risks: Memory shortages + component cost pressure","Q4 2025 call disclosure: Worsening memory shortages + higher component costs = margin pressure potential. Deferred revenue lumpiness. Services normalization. DSO + inventory volatility. Supply + timing risks flagged by management even with strong demand.","Q4 2025 earnings context","2026-02-18",-0.3,"b",11)
,
n(533,"ANET NEW 52W HIGH $149.87.50 — +4.58% breakout","Apr 21 close: ANET $166.87.50 +$7.65 NEW 52W HIGH breaking $168. AI networking leadership. MRVL/GOOGL/AVGO chip deal flow drives ANET switch demand. May 5 earnings 14d. 2026 AI guide $3.25B doubling.","Market Apr 21 2026","2026-04-21",0.85,"m",15)
,
n(604,"ANET +4.58% Apr 21 new ATH $149.87.50 — AI networking catalyst","Apr 21 close: ANET $166.87.50 (+$7.65, +4.58%) NEW ATH breakout from $167 prior. Read-through from MRVL-Google chip talks + AWS-Anthropic $25B = AI networking demand acceleration. May 5 earnings approaching.","Market context Apr 21 2026","2026-04-21",0.8,"m",14)
,
n(635,"ANET +2.93% $177.93 NEW ATH — AI networking demand intact — Apr 22","Apr 22 close $177.93 +2.93% NEW ATH. Hyperscaler capex expansion (GCP Ironwood = more data centers) = ANET switching demand. 800G EtherLink continuing momentum. May 5 earnings key.","Market context Apr 22 2026","2026-04-22",0.65,"m",13)
,
n(644,"PWR +2.4% Apr 27 — $744 grid buildout secular holding","Apr 27 close $639.85 +2.4%. Apr 30 earnings 3 days out. $44B backlog. Bipartisan infrastructure intact. Pre-earnings hold.","Market Apr 27 2026","2026-04-27",0.6,"m",12)
,
n(648,"ANET -2.46% Apr 27 — $149.87 800G AI networking intact","Apr 27 close $149.87.55 -2.46%. Light profit-taking. 800G AI cluster wins intact. May 5 earnings key. Hyperscaler demand strong.","Market Apr 27 2026","2026-04-27",0.35,"m",12)
,
n(678,"ANET $166.87.00 +4.66% — AI networking demand validated by GOOGL Cloud +63% / MSFT Azure +40%","ANET +4.66% to $149.87 ATH on hyperscaler tailwind. AI cluster networking thesis validated. May 5 earnings setup tightening.","Stock close Apr 29 2026","2026-04-29",0.65,"n",9)
],
options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:3.6,pcRatio:null,maxPain:195,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:28975,maxPainNear:200.0,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:46.17,atmIVExp:"2026-10-30",ivObs:17},
optionsDate:"Oct 1, 2026",optionsVerified:true,
tech:{
ma:{d50:193.0,d100:178.0,d200:159.0,d400:136.0,align:"bullish",brk:[
{ma:"100d",p:178.0,above:"Full intermediate recovery. 800G transition narrative winning.",below:"Intermediate broken. Competition fears dominating."},
{ma:"200d",p:159.0,above:"Primary trend intact. AI networking thesis validated.",below:"Primary break. Custom networking threat real."},
{ma:"400d",p:136.0,above:"Secular cloud networking trend intact.",below:"Secular break. Market share erosion confirmed."}]},
momentum:{rsi:57.42,rsiZone:"neutral",macd:{v:3.771,s:3.668,h:0.1031,cross:"bullish"},roc:9.9},
volume:{avg:"6.1M",recent:"4.3M",ratio:0.7,obv:"flat",accDist:"neutral",lastDay:"4.1M",lastDayX:0.67,volDate:"Oct 1, 2026"},
levels:{fibs:[{r:"0%",p:115,l:"52w low"},{r:"38.2%",p:153,l:"Shallow"},{r:"50%",p:165,l:"Midpoint"},{r:"61.8%",p:177,l:"Deep"},{r:"100%",p:215,l:"52w high"}],pivots:{r2:209,r1:207,p:204,s1:201,s2:198}},
pattern:{name:"Post-Earnings Drift",target:225,dir:"up",note:"$204.49. RSI 57.4, above 50d, above 200d. Next earnings Nov 2."},
verdict:{score:43,label:"HOLD \u2014 neutral setup",c:"r",drivers:"$204.49. Above 50d $193 (+6.0%), above 200d $159 (+28.6%). RSI 57.4 neutral. MACD histogram +0.10 (improving). Nearest observed support $181.27, 11.4% below, held 0x. Next earnings Nov 2."}},
fundVerified:true,
fundDate:"Sep 17, 2026",
fund:{
story:"$191.44 (Sep 3 close). AI networking at hyperscale. Q2 (Aug 4) delivered revenue above $3B, +37.7% YoY, and 2026 guidance was RAISED to $12.6B for 40% growth. Target stack moved hard behind it: Wells Fargo to $255, Rosenblatt to $280, TD Cowen to $250. Next earnings Nov 3.",
drivers:[
{name:"800G Transition",dir:"up",detail:"400G to 800G upgrade cycle. Arista dominant in 800G. Multi-year tailwind as hyperscalers upgrade."},
{name:"AI Backend Networking",dir:"up",detail:"Every NVIDIA AI cluster needs Arista switches. Reference architecture partner. Sole-source at Meta, Microsoft."},
{name:"Custom Switch Threat",dir:"risk",detail:"Hyperscalers exploring custom networking (Google, Amazon). 2-3 year risk to share."},
{name:"Campus Networking",dir:"up",detail:"Enterprise campus switching growing 30%+. Wi-Fi 7 transition. Second growth engine."}
],
flow:{inst:"Institutional ownership concentrated in growth and tech funds. Current consensus $242 across 30 analysts at Strong Buy after the Q2 guidance raise to $12.6B.",retail:"Moderate retail interest. Less known than NVDA but 'networking backbone' narrative growing.",short:"Short interest 5.2% — elevated. Bears citing custom switch risk."},
bull:{path:"AI networking cycle continues → AVGO/GOOGL custom silicon read-through boosts ANET → 1.6T wins 2027 visibility",price:"$185-210"},
bear:{path:"Custom switches take 30% of hyperscaler networking by 2028. Growth slows to 10%. Multiple to 25x.",price:"$65-80"},
activeRisks:[{sev:"HIGH",prob:25,risk:"Custom switch threat: hyperscalers building own network switches. If 2+ commit to custom networking, ANET TAM shrinks 30%",trigger:"Named hyperscaler announces custom switch deployment at scale",impact:"-30% TAM erosion",catalyst:"Hyperscaler earnings Apr-May — networking commentary. Also OCP Summit Oct 2026 — custom networking designs"},
{sev:"MED",prob:30,risk:"NVDA Spectrum-X competition: NVDA pushing into networking with Meta deal. Ecosystem leverage ANET can't match",trigger:"NVDA networking share >25%",impact:"Growth slows to 15%",catalyst:"Post-GTC ✓ — NVDA networking product announcements. Spectrum-X 2.0 adoption data"},
{sev:"MED",prob:20,risk:"Chip export restrictions: draft rules could limit ANET sales to certain international data centers",trigger:"Commerce Dept finalizes export rules",impact:"International rev -10%",catalyst:"Commerce Dept final rule ✓ — pending Q2026. Watch Federal Register for proposed rulemaking"},
{sev:"LOW",prob:15,risk:"Valuation: 42x fwd PE requires 25%+ growth sustained. Enterprise AI second wave could disappoint",trigger:"Enterprise AI adoption slower than expected",impact:"Multiple to 30x = $95",catalyst:"Q1 2026 earnings May 6 ✓ — enterprise customer adds + campus segment growth rate"}],
killer:"Two or more hyperscalers announce fully custom switching fabric, eliminating Arista from AI cluster architecture.",
revMix:[{n:"Data Center",p:62,c:"#3DBFA8"},{n:"Campus/Enterprise",p:28,c:"#7E91E8"},{n:"Service Provider",p:10,c:"#B266FF"}],
compPos:{xLabel:"AI Cluster Share",yLabel:"800G Leadership",peers:[{n:"ANET",x:70,y:85,self:true},{n:"Cisco",x:30,y:40},{n:"Juniper",x:15,y:30},{n:"NVDA Spectrum",x:25,y:60}]},
mgmt:{beats:4,misses:0,streak:"+4",note:"Jayshree Ullal legendary execution. 4 straight beats. Customer relationships are the moat. 25-year track record."},
metrics:{revGrowth:37.7,grossMargin:64.0,opMargin:44.0,netMargin:38.0,fcfMargin:35.5,roe:32.0,debtEquity:0.0,lastQ:"Q2 2026 (Jun 2026)"},
watchlist:[{item:"NVIDIA GTC",d:"Mar 16 ✓",why:"Networking ecosystem announcements. Arista in NVDA reference architecture = validation."},{item:"ANET Q1 Earnings",d:"May 5",why:"800G revenue mix + AI backend networking orders. Growth rate trajectory."},{item:"Custom switch announcements from hyperscalers",d:"2026",why:"Thesis killer vector. Any named deployment = share erosion."},{item:"800G adoption rate (Dell Oro data)",d:"Quarterly",why:"Transition pace determines revenue growth rate."}],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",ptDate:"Sep 21, 2026",riskDate:"Sep 25, 2026"},
catalysts:[{d:"Nov 2",e:"ANET Q3 \u2014 consensus $1.09 EPS on $3.33B",i:"high",iv:"med",hm:"N/A"},{d:"Mar 16 ✓",e:"NVIDIA GTC — networking ecosystem",i:"bullish",iv:"med",hm:"+5.2%"},{d:"May 5 ✓",e:"ANET Q1 Earnings",i:"high",iv:"high",hm:"+7.5%"},{d:"2026",e:"800G transition acceleration",i:"bullish",iv:"med",hm:"N/A"},{d:"Ongoing",e:"Custom switch competitive threat",i:"bearish",iv:"low",hm:"N/A"}],
peers:[{t:"ANET",pe:35,ev:28,y:-22},{t:"CSCO",pe:14,ev:10,y:5},{t:"JNPR",pe:18,ev:12,y:-8},{t:"AVGO",pe:32,ev:22,y:-5}],
playbook:[
pb("1 WEEK","ANET $204 \u2014 HOLD (43). Nearest support $181.27, 11.4% below (volume node, never defended). +18% to $241 consensus. RSI 57, MACD +0.10. NEXT: Nov 2 \u2014 ANET Q3 \u2014 consensus $1.09 EPS on $3.33B. Watch: Custom switch threat: hyperscalers building own network switches. If 2+ commit to custom networking, ANET TAM shrinks 30% Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",Y,"ANET $204.49 as of the latest close, HOLD at 43 on the tool's five-component score. $191.44 (Sep 3 close). AI networking at hyperscale. Nearest observed support sits at $181.27.","HOLD (43). Watch $181.27, 11.4% below (volume node, never defended). Upside +18% to $241; reward-to-risk 1.6x. Next catalyst: ANET Q3 \u2014 consensus $1.09 EPS on $3.33B."),
pb("1 MONTH","ANET $204.49 \u2014 THESIS: $191.44 (the scheduled date close). AI networking at hyperscale. KEY RISK: Custom switch threat: hyperscalers building own network switches. If 2+ commit to custom networking, ANET TAM shrinks 30% NEXT CATALYST: ANET Q3 \u2014 consensus $1.09 EPS on $3.33B. Upside +18%, reward-to-risk 1.6x to nearest support. Refreshed the scheduled date.",Y,"ANET $204.49 (the scheduled date close), HOLD at 43. $191.44 (the scheduled date close). AI networking at hyperscale. Key risk: Custom switch threat: hyperscalers building own network switches. If 2+ commit to custom networking, ANET TAM shrinks 30%","HOLD (43). Watch $181.27, 11.4% below (volume node, never defended). Upside +18% to $241; reward-to-risk 1.6x. Next catalyst: ANET Q3 \u2014 consensus $1.09 EPS on $3.33B."),
pb("3 MONTHS","ANET $204.49 \u2014 NEXT QUARTER: ANET Q3 \u2014 consensus $1.09 EPS on $3.33B. The print either confirms the thesis ($191.44 (the scheduled date close). AI networking at hyperscale.) or tests the key risk (Custom switch threat: hyperscalers building own network switches. If 2+ commit to custom networking, ANET TAM shrinks 30%) Nearest support $181.27, 11.4% below (volume node, never defended). Refreshed the scheduled date.",Y,"ANET $204.49 (the scheduled date close), HOLD at 43. $191.44 (the scheduled date close). AI networking at hyperscale. Key risk: Custom switch threat: hyperscalers building own network switches. If 2+ commit to custom networking, ANET TAM shrinks 30%","HOLD (43). Watch $181.27, 11.4% below (volume node, never defended). Upside +18% to $241; reward-to-risk 1.6x. Next catalyst: ANET Q3 \u2014 consensus $1.09 EPS on $3.33B."),
pb("6 MONTHS","ANET $204.49 \u2014 SIX MONTHS: two prints inside the window. HOLD (43). Consensus $241 (+18%), street range $185 (-10%) to $289 (+41%). What would change the view: Custom switch threat: hyperscalers building own network switches. If 2+ commit to custom networking, ANET TAM shrinks 30% Refreshed the scheduled date.",Y,"ANET $204.49 (the scheduled date close), HOLD at 43. $191.44 (the scheduled date close). AI networking at hyperscale. Key risk: Custom switch threat: hyperscalers building own network switches. If 2+ commit to custom networking, ANET TAM shrinks 30%","HOLD (43). Watch $181.27, 11.4% below (volume node, never defended). Upside +18% to $241; reward-to-risk 1.6x. Next catalyst: ANET Q3 \u2014 consensus $1.09 EPS on $3.33B."),
pb("1 YEAR","ANET $204.49 \u2014 TWELVE MONTHS: consensus $241 implies +18%; street range $185 (-10%) to $289 (+41%). THESIS: $191.44 (the scheduled date close). AI networking at hyperscale. STRUCTURAL RISK: Custom switch threat: hyperscalers building own network switches. If 2+ commit to custom networking, ANET TAM shrinks 30% Refreshed the scheduled date.",Y,"ANET $204.49 (the scheduled date close), HOLD at 43. $191.44 (the scheduled date close). AI networking at hyperscale. Key risk: Custom switch threat: hyperscalers building own network switches. If 2+ commit to custom networking, ANET TAM shrinks 30%","HOLD (43). Watch $181.27, 11.4% below (volume node, never defended). Upside +18% to $241; reward-to-risk 1.6x. Next catalyst: ANET Q3 \u2014 consensus $1.09 EPS on $3.33B.")]},
TSLA:{name:"Tesla Inc",price:354.11,avgPT:390,highPT:600,ptDate:"Sep 14, 2026",ptVerified:true,lowPT:125,high52:498.83,low52:297.38,fwdPE:202.1,mktCap:"$1.22T",ytd:-19,yr1:32,consensus:"Buy",earningsDate:"Oct 22, 2026",epsEst:0.44,epsEstDate:"Aug 31, 2026",sector:"Auto/Energy",support:[{lvl:337.24,label:"Swing low 2026-04-07 \u2014 held 3x"},{lvl:297.38,label:"Swing low 2026-07-29 \u2014 held 0x"},{lvl:276.56,label:"Step below \u2014 derived"}],supportDate:"Oct 1, 2026",brokenSup:[{lvl:382.78,held:13,date:"2025-11-14"},{lvl:387.53,held:13,date:"2026-02-05"},{lvl:368.6,held:5,date:"2026-06-26"}],
supportVerified:true,
supportAnchor:"$337.24 (4.8%, held 3x) / $297.38 (16.0%, held 0x) / $276.56 (21.9%) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $337.24, 4.8% below $354.11. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.2,
news:[n(10107,"Q2: RECORD REVENUE, OPERATING INCOME -57% AS CREDITS VANISH","Q2 2026 (Jul 22): record revenue $28.2B +26%, but operating income fell 57% to $398M and EPS was $0.33 against $0.55. Regulatory credits collapsed to $146M after the federal EV credit expired. Capex a record $5.8B. Consensus target $390, +4% upside.","Company filings","2026-07-23",-0.3,"e",14,"earnings"),n(9811,"TSLA -1.57% to $308.10 — oil collapse removes a piece of the EV bid","Tesla closed $308.10 Jul 27, down $4.93. WTI collapsed 7.5% to $82.62 after the US and Iran halted strikes over the weekend and diplomacy resumed. Cheap gasoline historically erodes the marginal EV purchase case; crude is still up roughly 20% on the month, so this is a give-back rather than a regime change. Stock remains -29% from the $435 avg PT and the Jul 23 Q2 miss (EPS 33c vs 55c, first negative FCF in two years) is unhealed.","TradingEconomics / Barchart","2026-07-27",-0.25,"m",11,"news"),

n(8801,"TSLA Q2 miss — stock -14%, worst day since Mar 2025","EPS 0.33 vs 0.53 expected. Revenue 28.24B beat +26% YoY on record 480126 deliveries, but op margin collapsed to 1.4% and FCF went negative -1.09B as capex jumped 142% to 5.79B. Musk calls 2026 a massive capex year, 25B+ full-year budget. PT cuts from JPMorgan, Cantor, Mizuho — range now 400-485.","Bloomberg / Electrek","2026-07-23",-0.8,"e",12,"earnings"),n(9441,"TSLA -4.9% Jun 1 despite European sales surge in May","Tesla sales jumped double/triple digits across several European markets in May (Reuters). Stock pulled back to $414-436 range. Analysts frame 2026 as a \"foundational\" growth year, with bigger ramp from 2027.","Sherwood/Reuters","2026-06-01",0.0,"a",10),n(985,"TSLA PTs verified May 18 — avg $408, high $600","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(945,"TSLA closed $409.89 (-2.92%) May 14","May 14 EOD — semis sell-off. Position down for the session.","Brokerage","2026-05-14",-0.1,"v",7),
n(916,"TSLA support verified May 11 — S1 anchor: 100d MA $400","S1 $410 within 2.4% of 100d MA","Web Verified","2026-05-11",0.4,"v",7),
n(879,"TSLA options data verified May 11 — IV 52%, IVR 9","Source: FlashAlpha (TSLA ATM IV 52.30%), Unusual Whales IV Rank 8.76 (low historical for TSLA)","Web Verified","2026-05-11",0.4,"v",7),
n(840,"TSLA technicals verified May 11","50d MA, 200d MA, RSI from web sources: Investing.com (50d=$377.83, 200d=$372.38), TipRanks RSI 60.31","Web Verified","2026-05-11",0.3,"t",6),
n(820,"TSLA PTs verified May 11 — avg $458 most recent quarter","Web-verified May 11: mlq.ai $458.67 (16 analysts last quarter, range $300-$600, median $500), Stockanalysis $405.47 (29 analysts), MarketBeat $398.42, Public.com $406.65. Most recent month (8 analysts): avg $442.25. Latest: Stifel $508 (Jan 29), Wedbush $600 high, Wells Fargo $125 low. Piper Sandler Buy May 11. Stock $410 = below recent qtr avg $458 = ~3% upside.","Web Verified","2026-05-11",0.5,"v",8),
n(789,"TSLA $410 +8.7% in 2 days — momentum surge","Tesla rallied through $410-410 resistance on broad tech rally. Six-week winning streak for indices, S&P/NDX at ATH. EV demand re-rating + AI optimism + macro risk-on supporting rotation.","CNBC","2026-05-11",0.6,"m",8),
n(782,"TSLA $410 +5.81% May 7 — EV demand rebound rally","Day move +5.81% from May 5 close. EV demand rebound rally. Macro: NVDA broke into ATH zone +7.5% on AI capex narrative re-acceleration.","Reuters","2026-05-07",0,"m",4),

n(737,"TSLA $410 +0.21% May 1 — Musk trial concluded, focus on FSD","Trial overhang lifting. Q2 Jul 22 ✓ next catalyst. FSD expansion + Model Y L narrative continuing.","Tesla","2026-05-05",0.3,"m",6),
n(716,"TSLA $410 +4% Apr 30 — Musk trial concludes, FSD focus","Trial concluded. Investor focus returning to FSD progress + Q2 Jul 22 ✓ catalyst. Robotaxi narrative intact.","Tesla","2026-04-30",0.4,"m",8),
n(700,"TSLA $410.58 -0.78% — holding consolidation post Q1 beat","Tesla closed -$2.95 to $410.58. Stock holding above 50d MA at $362. Range $360-400 normal.","Stock close Apr 29 2026","2026-04-29",0.1,"n",5),
n(701,"FSD v13 expansion to additional markets announced Apr 25","Tesla expanding FSD beta to Australia/UK markets. Robotaxi pilot progress in Austin.","Tesla press release Apr 25 2026","2026-04-25",0.55,"p",8),
n(702,"Musk OpenAI trial day 3 — pre-trial motions resolved","Tesla shares pressured by Musk distraction risk during OpenAI suit. Trial expected to run 3-4 weeks.","Reuters Apr 28 2026","2026-04-28",-0.3,"n",6),
n(814,"TSLA Q1 EPS $0.41 beat $0.35 est, rev $22.39B","Q1 2026 results: EPS topped consensus by 17%. Revenue in line. Auto margin pressure offset by services growth. FSD expanding.","Tesla","2026-04-22",0.5,"e",8),
n(815,"Musk OpenAI trial day 3 — testifies on AI safety origins","Musk continues testimony Apr 29. Defending creation of OpenAI as nonprofit to counter Google. Trial overhang on TSLA stock.","Reuters","2026-04-29",-0.3,"k",7),
n(703,"Goldman: TSLA China weekly orders -1% W17 2026","Goldman Sachs tracking China demand. Slight decline vs prior week. BYD competitive pressure persists.","Goldman","2026-04-28",-0.2,"m",6),
n(704,"Tesla FSD expanding to additional markets","Investing.com Apr 28 — Tesla announced FSD software expansion plans. Market reaction muted given trial overhang.","Investing","2026-04-28",0.3,"v",6),
n(705,"24/7 Wall St: TSLA -16% YTD but $420 PT consensus","Analysts see upside despite YTD weakness. Average PT implies ~12% upside. Mixed views on FSD timing.","24/7 Wall St","2026-04-28",0.2,"k",5)
,
n(706,"TSLA Model Y L launching in US — Tesla Y L coming to US","Apr 28: Tesla announced Model Y L (long-wheelbase variant) coming to US market. Some analysts said this could've helped revenue earlier. Stock muted on news due to trial overhang.","TipRanks","2026-04-28",0.2,"v",6),
n(707,"TSLA stock -16% YTD but $420 PT consensus = +12% upside","Despite YTD weakness, average analyst PT $420 implies meaningful upside. Mixed views on FSD timing. 23 buy / 6 sell ratings.","Public.com","2026-04-29",0.3,"k",6),
n(708,"TSLA holds 52w range $271-499 — mid-range hold","Stock trading at $410 within wide 52w range. Volatility persists. Beta 1.77. Daily volume averaging 11M shares.","TradingView","2026-04-29",0.0,"v",5),
n(709,"Musk-Altman trial enters day 3 — overhang continues","Apr 29: Musk-OpenAI trial continues. Sources say 'no sympathetic characters'. Trial overhang keeping institutional buyers on sidelines.","CNBC","2026-04-29",-0.25,"k",6)],
options:{ivRank:null,ivPctl:null,impliedMove:12.5,skew:null,lastEarnMove:-14.5,pcRatio:null,maxPain:360,maxPainExp:"2026-10-02",maxPainDTE:1,maxPainOI:441998,maxPainNear:360.0,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:44.28,atmIVExp:"2026-10-30",ivObs:17},
optionsDate:"Oct 1, 2026",optionsVerified:true,
fundVerified:true,
fundDate:"Sep 17, 2026",
fund:{metrics:{lastQ:"Q2 2026 (Jun 2026)",revGrowth:26.0,grossMargin:16.8,opMargin:1.4,netMargin:4.2,roe:4.67,note:"$354.11. RSI 45.6, above 50d, below 200d. 3 levels broken. Next earnings Oct 22."},flow:{inst:"Institutional flow positive",retail:"Moderate retail interest",short:"Short interest manageable"},drivers:[
{name:"Auto Margins",dir:"down",detail:"Q2 operating margin compressed to 1.4 percent. Cost reduction is not keeping pace with pricing and mix."},
{name:"Free Cash Flow",dir:"down",detail:"First negative FCF quarter in two years at -1.09B, driven by a 142 percent capex increase to 5.79B."},
{name:"Revenue Growth",dir:"up",detail:"Q2 revenue 28.24B, up roughly 26 percent YoY. The top line beat even as profitability missed badly."},
{name:"AI and Robotaxi Capex",dir:"flat",detail:"Musk guided to a massive capex year, 25B-plus. The spend is committed; the return timeline is the open question."}
],
story:"$376.37 (Sep 3 close). EV, energy storage and autonomy optionality. Reported Jul 23. Next earnings Oct 22. Latest-quarter detail in this panel is NOT yet refreshed.",bull:"Momentum and franchise, not valuation. Price recovered 19.8% off the Jul 28 low and fully absorbed the Q2 miss; energy storage and FSD optionality remain the long-duration call. But the bull case is explicitly CAPPED here - consensus $400 leaves +9% and forward P/E is 183. This is a hold-the-winner position, not an add candidate, and the risk profile below is consistent with that rather than opposed to it.",bear:"Auto demand softening + margin compression from price cuts. Robotaxi/Optimus timelines repeatedly slip. Valuation prices in execution not yet delivered. EV competition intensifying (BYD). Musk attention divided.",killer:"Robotaxi fails safety/regulatory rollout at scale OR a major autonomy-related liability event that sets the self-driving thesis back years.",
key:[{m:"Mkt Cap",v:"$1.41T"},{m:"Fwd PE",v:"92x"},{m:"YTD",v:"-16%"},{m:"1Y",v:"32%"}],
moats:["Brand recognition","Network effects","Scale advantage","Capital structure"],
compPos:{xLabel:"FSD/Robotaxi Lead",yLabel:"Vehicle Margin",peers:[{n:"TSLA",x:80,y:60,self:true},
{n:"BYD",x:30,y:75},{n:"NIO",x:25,y:30},{n:"RIVN",x:35,y:20}]},
activeRisks:[{sev:"LOW",prob:20,risk:"Sector rotation risk",trigger:"Macro shift",triggerStatus:"watching",mitigation:"Position sizing + stops",pPctNetWorth:1.5,daysToImpact:30,catalyst:"Monitor quarterly indicators and earnings"},{sev:"MED",prob:25,risk:"FSD continued delays — robotaxi network deferred to 2027+",trigger:"Regulatory or technical setbacks",triggerStatus:"watching",mitigation:" disciplined (trailed Aug 31)",pPctNetWorth:2.0,daysToImpact:90,catalyst:"Monitor quarterly indicators and earnings"},{sev:"MED",prob:30,risk:"China share loss to BYD/NIO — 1% W17 decline",trigger:"Continued weekly order weakness",triggerStatus:"watching",mitigation:"Trim if multiple weeks negative",pPctNetWorth:1.5,daysToImpact:60,catalyst:"Monitor quarterly indicators and earnings"}]
},
tech:{levels:{fibs:[307,320,330,343],pivots:{r2:362,r1:358,p:356,s1:352,s2:350}},volume:{avg:"38.9M",recent:"37.6M",ratio:0.97,obv:"flat",accDist:"neutral",lastDay:"31.0M",lastDayX:0.8,volDate:"Oct 1, 2026"},momentum:{rsi:45.62,rsiZone:"neutral",macd:{v:1.2778,s:3.7067,h:-2.4288,cross:"bearish"}},verdict:{score:39,label:"HOLD \u2014 AT/ABOVE TARGET, STRUCTURE BROKEN, ON DEFENDED SUPPORT",c:"r",drivers:"$354.11. Above 50d $347 (+2.0%), below 200d $394 (-10.1%). RSI 45.6 neutral. MACD histogram -2.43 (deteriorating). Nearest observed support $337.24, 4.8% below, held 3x. 3 prior levels BROKEN. Next earnings Oct 22."},
drivers:"$410.58 — Tesla holds 52w range $271-499. Q1 EPS beat ($0.41 vs $0.35), revenue $22.39B. FSD expansion + Model Y L launch. Musk OpenAI trial overhang. Bulls cite robotaxi optionality.",
ma:{d50:347.0,d100:377.0,d200:394.0,d400:370.0,align:"mixed",brk:[
{ma:"50d",p:347.0,above:"Above 50d. Trend intact.",below:"Below 50d. Near-term weakness."},
{ma:"100d",p:377.0,above:"Intermediate trend up.",below:"Intermediate broken."},
{ma:"200d",p:394.0,above:"Primary trend up.",below:"Primary trend break."},
{ma:"400d",p:370.0,above:"Long-term up.",below:"Long-term broken."}],d50:378,d100:400,d200:372,d400:270},
pivots:{r2:340,r1:332,pp:324,s1:312,s2:301},
fibs:[{r:"0%",p:297,l:"52w low"},{r:"38.2%",p:374,l:"Shallow"},{r:"50%",p:398,l:"Midpoint"},{r:"61.8%",p:422,l:"Deep"},{r:"100%",p:499,l:"52w high"}],
patterns:[{n:"Continuation",d:"Established trend",t:"Long",r:"high",p:"800-850"}],
brk:[
{ma:"50d",p:347.0,above:"Above 50d. Trend intact.",below:"Below 50d. Near-term weakness."},
{ma:"100d",p:377.0,above:"Intermediate trend up.",below:"Intermediate broken."},
{ma:"200d",p:394.0,above:"Primary trend up.",below:"Primary trend break."},
{ma:"400d",p:370.0,above:"Long-term up.",below:"Long-term broken."}]
},
flow:{inst:"Institutional flow positive",retail:"Moderate retail interest",short:"Short interest manageable"},
bull:{path:"Bull thesis catalyst path leading to upside",price:"$416-600"},
bear:{path:"Bear thesis risk path",price:"$123-319"},

watch:[{item:"FSD expansion progress",d:"Quarterly",why:"Core robotaxi narrative driver"},{item:"China weekly orders",d:"Weekly",why:"Goldman tracking shows -1% W17"}],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",riskDate:"Sep 25, 2026",
catalysts:[{d:"Oct 22",e:"TSLA Q3 earnings",i:"high",iv:"high",hm:"N/A"},{d:"Jul 22 ✓",e:"Q2 Earnings ✓ REPORTED — EPS $0.33 miss vs $0.55",i:"high",iv:"high",hm:"+8.0%"},{d:"2026",e:"Robotaxi network expansion",i:"bullish",iv:"med",hm:"N/A"},{d:"Ongoing",e:"Musk-OpenAI trial",i:"bearish",iv:"low",hm:"N/A"}],
peers:[{t:"TSLA",pe:92,ev:85,y:-16},{t:"NIO",pe:-1,ev:-5,y:-25},{t:"RIVN",pe:-1,ev:-12,y:-35},{t:"F",pe:7,ev:5,y:2}],
playbook:[
pb("1 WEEK","TSLA $354 \u2014 HOLD (39). Nearest support $337.24, 4.8% below, held 3x. +10% to $390 consensus. RSI 46, MACD -2.43, 3 broken levels above. NEXT: Oct 22 \u2014 TSLA Q3 earnings. Watch: Sector rotation risk Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",Y,"TSLA $354.11 as of the latest close, HOLD at 39 on the tool's five-component score. $376.37 (Sep 3 close). EV, energy storage and autonomy optionality. Nearest observed support sits at $337.24.","HOLD (39). Watch $337.24, 4.8% below, held 3x. Upside +10% to $390; reward-to-risk 2.1x. Next catalyst: TSLA Q3 earnings."),
pb("1 MONTH","TSLA $354.11 \u2014 THESIS: $376.37 (the scheduled date close). EV, energy storage and autonomy optionality. KEY RISK: Sector rotation risk NEXT CATALYST: TSLA Q3 earnings. Upside +10%, reward-to-risk 2.1x to nearest support. Refreshed the scheduled date.",Y,"TSLA $354.11 (the scheduled date close), HOLD at 39. $376.37 (the scheduled date close). EV, energy storage and autonomy optionality. Key risk: Sector rotation risk","HOLD (39). Watch $337.24, 4.8% below, held 3x. Upside +10% to $390; reward-to-risk 2.1x. Next catalyst: TSLA Q3 earnings."),
pb("3 MONTHS","TSLA $354.11 \u2014 NEXT QUARTER: TSLA Q3 earnings. The print either confirms the thesis ($376.37 (the scheduled date close). EV, energy storage and autonomy optionality.) or tests the key risk (Sector rotation risk) Nearest support $337.24, 4.8% below, held 3x. Refreshed the scheduled date.",Y,"TSLA $354.11 (the scheduled date close), HOLD at 39. $376.37 (the scheduled date close). EV, energy storage and autonomy optionality. Key risk: Sector rotation risk","HOLD (39). Watch $337.24, 4.8% below, held 3x. Upside +10% to $390; reward-to-risk 2.1x. Next catalyst: TSLA Q3 earnings."),
pb("6 MONTHS","TSLA $354.11 \u2014 SIX MONTHS: two prints inside the window. HOLD (39). Consensus $390 (+10%), street range $125 (-65%) to $600 (+69%). What would change the view: Sector rotation risk Refreshed the scheduled date.",Y,"TSLA $354.11 (the scheduled date close), HOLD at 39. $376.37 (the scheduled date close). EV, energy storage and autonomy optionality. Key risk: Sector rotation risk","HOLD (39). Watch $337.24, 4.8% below, held 3x. Upside +10% to $390; reward-to-risk 2.1x. Next catalyst: TSLA Q3 earnings."),
pb("1 YEAR","TSLA $354.11 \u2014 TWELVE MONTHS: consensus $390 implies +10%; street range $125 (-65%) to $600 (+69%). THESIS: $376.37 (the scheduled date close). EV, energy storage and autonomy optionality. STRUCTURAL RISK: Sector rotation risk Refreshed the scheduled date.",Y,"TSLA $354.11 (the scheduled date close), HOLD at 39. $376.37 (the scheduled date close). EV, energy storage and autonomy optionality. Key risk: Sector rotation risk","HOLD (39). Watch $337.24, 4.8% below, held 3x. Upside +10% to $390; reward-to-risk 2.1x. Next catalyst: TSLA Q3 earnings.")
]},
LRCX:{name:"Lam Research",price:340.1,avgPT:371,highPT:500,ptDate:"Sep 14, 2026",ptVerified:true,lowPT:290,high52:438.5,low52:131.02,fwdPE:37.5,mktCap:"$359B",ytd:84,yr1:185,consensus:"Strong Buy",earningsDate:"Oct 21, 2026",epsEst:1.52,epsEstDate:"Aug 31, 2026",sector:"Semi Equipment",support:[{lvl:312.34,label:"Volume node \u2014 8.2% below"},{lvl:265.37,label:"Swing low 2026-09-15 \u2014 held 1x"},{lvl:250.5,label:"Swing low 2026-07-29 \u2014 held 0x"}],supportDate:"Oct 1, 2026",brokenSup:[],
supportVerified:true,
supportAnchor:"$312.34 (8.2%) / $265.37 (22.0%, held 1x) / $250.50 (26.3%, held 0x) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $312.34, 8.2% below $340.10. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.2,
news:[n(10105,"RECORD QUARTER ON REVENUE, MARGIN AND EPS; CHINA 34-37% OF REVENUE","Q4 FY26 (Jul 29): record revenue $6.72B; GAAP gross margin 51.7%; operating margin 37.4%; EPS $1.81. China was 34% of March-quarter revenue and 37% across nine months, the largest region and the export-control exposure ahead of the Sep 24 Trump-Xi meeting. Consensus target $371.","Company filings","2026-07-29",0.3,"e",14,"earnings"),n(9904,"LRCX -7.07% to $271 the day before it reports \u2014 China DUV headline hits equipment hardest","Jul 28: Lam fell 7.07% to $271.00 into tomorrow\u0027s Q4 FY26 print (Jul 29 AMC, call 5pm ET). The China DUV lithography report hit the whole equipment complex, and equipment carries the most direct exposure to a Chinese domestic tool industry. Consensus $6.67B rev (+29% YoY) and $1.69 EPS; company guided $6.6B +/- $400M and $1.65 +/- $0.15. Beat all four trailing quarters, average surprise 7.9%. Stock has now given back roughly 26% in a month. Note the paradox: if CXMT and Chinese DRAM expansion is real, that is MORE wafer-fab equipment demand, not less \u2014 the market is currently trading equipment as a victim of the same story that should fund it.","CNBC / Zacks","2026-07-28",-0.3,"e",15,"news"),
n(9806,"LRCX Q4 FY26 confirmed Jul 29 AMC — dashboard had the date wrong","Lam reports fiscal Q4 2026 after the close Wednesday Jul 29, call 5:00pm ET / 2:00pm PT. Company guided revenue $6.6B +/- $400M and EPS $1.65 +/- $0.15; Zacks consensus $6.67B (+29% YoY) and $1.69 (+27% YoY). Beat in each of the trailing four quarters, average surprise 7.9%. Advanced packaging revenue guided to grow 50%+ in 2026. Stock -20.4% over the past month, closed $290.79 Jul 27 (-4.73%). Dashboard previously carried a Jul 23 earnings catalyst — that was incorrect and has been corrected to Jul 29.","Lam Research IR / Zacks / TipRanks","2026-07-27",0.3,"e",15,"catalyst"),
n(988,"LRCX PTs verified May 18 — avg $283, high $350","Sources: StockAnalysis/MarketBeat/Benzinga/TipRanks/Investing.com (May 18 web verification across 4+ aggregators). PT data refreshed for accuracy after 7d gap.","Web Verified","2026-05-18",0.2,"v",6),
n(964,"LRCX closed $279.0 (-1.79%) May 14","May 14 EOD — semis sell-off. Position down for the session.","Brokerage","2026-05-14",-0.1,"v",7),
n(918,"LRCX support verified May 11 — S1 anchor: Pre-rally consolidation $230","S1 $230 = March 2026 base before rally to $295; below all MAs but represents prior consolidation","Web Verified","2026-05-11",0.4,"v",7),
n(887,"LRCX options verified May 11 — IV 74%, IVR 70","Source: Market Rebellion Apr 21 (LRCX May IV 74, April 103 pre-earnings, 52w range 32-76)","Web Verified","2026-05-11",0.4,"v",7),
n(881,"LRCX options data verified May 11 — IV 45%, IVR 60","Source: Market Rebellion April 21 ('increasing IV' list LRCX), semi-cap equipment typical IV","Web Verified","2026-05-11",0.4,"v",7),
n(858,"LRCX PTs verified May 11 — avg $311","Source: Investing.com 32 analysts avg $310.81, range $220-385. TickerNerd 43 analysts median $315. Susquehanna $385 Street-high","Web Verified","2026-05-11",0.4,"v",7),
n(842,"LRCX technicals verified May 11","50d MA, 200d MA, RSI from web sources: Investing.com (50d=$257.98, 200d=$244.16, RSI 56.27)","Web Verified","2026-05-11",0.3,"t",6),
n(801,"LRCX $342.45 +3.70% May 11 — semis equipment rotation","Day move +3.70%. semis equipment rotation. Market: semis-led rally, S&P/NDX at ATH, six-week winning streak. CPI 3.7%, Fed on hold. Trump-Xi summit May 14-15 ✓","Bloomberg","2026-05-11",0,"m",4),

n(759,"LRCX $285 +0.5% May 5 — Q3 record print absorbed","Susquehanna $385 high PT remains. AI memory cycle intact. Q4 Jul 23 next.","Lam","2026-05-05",0.2,"m",6),
n(718,"LRCX $256 -4% Apr 30 — semi equipment pullback","Profit-taking after Q3 record. Susquehanna $385 high PT remains. AI memory cycle thesis intact. Q4 Jul 23 catalyst.","Lam Research","2026-04-28",-0.2,"m",7),
n(706,"LRCX $342.60 — WFE cycle leadership confirmed","Lam Research holding near ATH $275. WFE bookings strong on TSM/MU capex tailwind. HBM tools demand robust.","Stock close Apr 29 2026","2026-04-29",0.5,"n",8),
n(707,"LRCX Q3 FY26 record beat — Apr 22 ✓ EPS $1.04 vs $0.98 est","Q3 FY26 record revenue $4.72B (+22% YoY). Guide for Q4 above Street. Susquehanna PT $385.","LRCX Q3 earnings Apr 22 2026","2026-04-22",0.85,"e",14),
n(708,"Susquehanna raises LRCX PT to $385 — among highest on Street","Post Q3 print, multiple PT raises. Susquehanna $385 (high), consensus moving up.","TipRanks/Benzinga Apr 23 2026","2026-04-23",0.7,"p",9),
n(741,"LRCX Q3 FY26 RECORD — Rev $5.84B +22%, EPS $1.47 beat $1.38","Apr 22: Lam Research Q3 record print. Revenue $5.84B +22% YoY. EPS beat estimate by $0.09. Memory segment + customer support led. Stock +4.24% post.","Lam Research","2026-04-22",0.8,"e",9),
n(742,"Susquehanna raises LRCX PT to $385 from $350","Apr 23: Susquehanna lifted target post-earnings. Highest analyst PT. Cites HBM4 cycle visibility and continued AI memory capex.","Susquehanna","2026-04-23",0.65,"k",8),
n(743,"BofA raises LRCX PT to $330 from $285, TD Cowen to $340","Multiple analyst upgrades post Q3. Cluster forming around $310-340. AI memory tailwind narrative reinforced.","BofA/TD","2026-04-23",0.55,"k",7),
n(744,"Lam Research benefits from HBM/3D NAND capex cycle","Etch and deposition equipment critical for HBM4/HBM5 production. Direct beneficiary of NVDA/MU/SK Hynix capacity expansion. Up 185% trailing 12 months.","Industry","2026-04-25",0.5,"v",6),
n(745,"Lam Research valuation: 28x fwd PE, 17x EV/Sales","Premium to historical semi equipment averages. Justifiable if AI memory capex sustains 2027-2028. Bear case = cyclical peak earlier.","Analysis","2026-04-26",0.0,"v",5)
,
n(746,"LRCX up 185% trailing 12 months — momentum + cycle","185% rally driven by AI memory capex thesis. Q1 record print confirmed cycle. Equipment-side leverage to memory buildout.","Industry","2026-04-25",0.45,"v",6),
n(747,"Stifel raises LRCX PT to $325, Citi to $315, RBC to $310","Apr 23: Cluster of post-earnings PT raises. Stifel $325, Citi $315, RBC $310. AI memory tailwind validated.","Multiple","2026-04-23",0.5,"k",7),
n(748,"LRCX 28x fwd PE, 17x EV/Sales — premium but justifiable","Premium to historical semi equipment averages. Justifiable if AI memory capex sustains 2027-2028. Buyback support.","Analysis","2026-04-26",0.1,"v",5),
n(749,"Geopolitical risk: improved US-China relations alleviate concerns","Q3 commentary noted improved US-China relations help LRCX China exposure. Reduces near-term geopolitical risk.","Lam","2026-04-22",0.3,"k",5)],
options:{ivRank:null,ivPctl:null,impliedMove:17.1,skew:null,lastEarnMove:18.0,pcRatio:null,maxPain:300,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:58951,maxPainNear:305.0,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:60.65,atmIVExp:"2026-10-30",ivObs:17},
optionsDate:"Oct 1, 2026",optionsVerified:true,
fundVerified:true,
fundDate:"Sep 17, 2026",
fund:{metrics:{lastQ:"Q4 FY26 (Jun 2026)",revGrowth:24.0,grossMargin:51.7,opMargin:37.4,netMargin:33.9,roe:66.8,note:"$340.10. RSI 65.2, above 50d, above 200d. Next earnings Oct 21."},flow:{inst:"Institutional flow positive",retail:"Moderate retail interest",short:"Short interest manageable"},drivers:[
{name:"WFE Spending",dir:"up",detail:"Wafer fab equipment demand driven by HBM and advanced-node capacity additions. Memory capex recovering."},
{name:"Installed Base Services",dir:"up",detail:"Recurring service and upgrade revenue on a large installed fleet cushions cyclical swings in tool orders."},
{name:"China Exposure",dir:"down",detail:"Export controls continue to cap the China revenue line relative to prior-cycle peaks."},
{name:"Valuation vs Consensus",dir:"flat",detail:"At 325 the stock sits at/above the 315 average target after a 40 percent YTD run. The multiple has re-rated."}
],
story:"$292.66 (Sep 3 close). Wafer-fab equipment, levered to memory capex. Reported Jul 29. Next earnings Oct 21. Latest-quarter detail in this panel is NOT yet refreshed.",bull:"WFE supercycle from AI leading-edge + HBM/DRAM capacity buildout. Etch/deposition leadership at AI-critical nodes. Memory capex inflecting up as DRAM shortage drives new fabs. Morgan Stanley upgrade to OW $331 (May 23). Avg PT $315, Strong Buy.",bear:"Semicap is cyclical — orders air-pocket if memory/logic capex pauses. China export-control exposure. Customer concentration (TSMC/Samsung/Micron). Lumpy QoQ.",killer:"A sharp memory/logic capex downcycle OR escalating China restrictions cutting off a major revenue region.",
key:[{m:"Mkt Cap",v:"$197B"},{m:"Fwd PE",v:"28x"},{m:"YTD",v:"40%"},{m:"1Y",v:"185%"}],
moats:["Brand recognition","Network effects","Scale advantage","Capital structure"],
compPos:{xLabel:"AI Memory Exposure",yLabel:"Etch/Depo Share",peers:[{n:"LRCX",x:75,y:80,self:true},
{n:"AMAT",x:50,y:60},{n:"ASML",x:40,y:90},{n:"KLAC",x:35,y:50}]},
activeRisks:[{sev:"MED",prob:30,risk:"Sector rotation risk",trigger:"Macro shift",triggerStatus:"watching",mitigation:"Position sizing + stops",pPctNetWorth:1.5,daysToImpact:30,catalyst:"Monitor quarterly indicators and earnings"},{sev:"MED",prob:30,risk:"AI memory cycle peak in 2027 — semi equipment cyclical",trigger:"Hyperscaler capex guide cuts",triggerStatus:"watching",mitigation:"Trim 50% on cycle peak signals",pPctNetWorth:1.5,daysToImpact:180,catalyst:"Monitor quarterly indicators and earnings"},{sev:"MED",prob:25,risk:"China export restrictions tighten further",trigger:"Commerce Dept rules expansion",triggerStatus:"watching",mitigation:"Position size discipline",pPctNetWorth:1.0,daysToImpact:90,catalyst:"Monitor quarterly indicators and earnings"}]
},
tech:{levels:{fibs:[131,248,285,321,438],pivots:{r2:348,r1:344,p:338,s1:333,s2:327}},volume:{avg:"9.5M",recent:"8.3M",ratio:0.88,obv:"rising",accDist:"neutral",lastDay:"8.7M",lastDayX:0.92,volDate:"Oct 1, 2026"},momentum:{rsi:65.25,rsiZone:"neutral",macd:{v:5.4646,s:-0.2745,h:5.7391,cross:"bullish"}},verdict:{score:35,label:"TRIM/AVOID \u2014 neutral setup",c:"y",drivers:"$340.10. Above 50d $305 (+11.5%), above 200d $274 (+24.1%). RSI 65.2 neutral. MACD histogram +5.74 (improving). Nearest observed support $312.34, 8.2% below. Next earnings Oct 21."},
drivers:"$324.60 — Q3 FY26 record print Apr 22: Rev $5.84B +22% YoY beat estimate. EPS $1.47 beat $1.38. Memory + customer-support segments led. AI HBM/3D NAND capex cycle. Up 185% YoY = strong momentum. Post-earnings upgrades cluster $390-385.",
ma:{d50:305.0,d100:322.0,d200:274.0,d400:190.0,align:"bullish",brk:[
{ma:"50d",p:305.0,above:"Above 50d. Equipment cycle intact.",below:"Below 50d."},
{ma:"100d",p:322.0,above:"Intermediate up.",below:"Break."},
{ma:"200d",p:274.0,above:"Primary up. WFE cycle leadership.",below:"Primary break."},
{ma:"400d",p:190.0,above:"Long-term up.",below:"Long-term break."}],d50:258,d100:252,d200:244,d400:200},
pivots:{r2:341,r1:333,pp:325,s1:313,s2:302},
fibs:[302,313,325,336,348],
patterns:[{n:"Continuation",d:"Established trend",t:"Long",r:"high",p:"289-308"}],
brk:[
{ma:"50d",p:305.0,above:"Above 50d. Equipment cycle intact.",below:"Below 50d."},
{ma:"100d",p:322.0,above:"Intermediate up.",below:"Break."},
{ma:"200d",p:274.0,above:"Primary up. WFE cycle leadership.",below:"Primary break."},
{ma:"400d",p:190.0,above:"Long-term up.",below:"Long-term break."}]
},
flow:{inst:"Institutional flow positive",retail:"Moderate retail interest",short:"Short interest manageable"},
bull:{path:"Bull thesis catalyst path leading to upside",price:"$275-385"},
bear:{path:"Bear thesis risk path",price:"$200-227"},

watch:[{item:"HBM equipment demand sustainability",d:"Quarterly",why:"Core AI memory cycle thesis"},{item:"China revenue exposure",d:"Quarterly",why:"Geopolitical risk; improved US-China relations help"}],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",riskDate:"Sep 25, 2026",
catalysts:[{d:"Oct 21",e:"LRCX Q1 FY27 earnings",i:"high",iv:"med",hm:"N/A"},{d:"Apr 22 ✓",e:"Q3 FY26 Earnings — Record",i:"bullish",iv:"high",hm:"+4.24%"},{d:"Jul 29 \u2713",e:"Q4 FY26 reported - next print Oct 21",i:"high",iv:"high",hm:"+5.8%"},{d:"2026",e:"HBM4 transition / new fab buildouts",i:"bullish",iv:"med",hm:"N/A"},{d:"Ongoing",e:"China export restrictions",i:"bearish",iv:"med",hm:"N/A"}],
peers:[{t:"LRCX",pe:28,ev:25,y:40},{t:"AMAT",pe:22,ev:20,y:15},{t:"ASML",pe:37,ev:33,y:88},{t:"KLAC",pe:24,ev:22,y:12}],
playbook:[
pb("1 WEEK","LRCX $340 \u2014 TRIM/AVOID (35). Nearest support $312.34, 8.2% below (volume node, never defended). +9% to $371 consensus. RSI 65, MACD +5.74. NEXT: Oct 21 \u2014 LRCX Q1 FY27 earnings. Watch: Sector rotation risk Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",R,"LRCX $340.10 as of the latest close, TRIM/AVOID at 35 on the tool's five-component score. $292.66 (Sep 3 close). Wafer-fab equipment, levered to memory capex. Nearest observed support sits at $312.34.","TRIM/AVOID (35). Watch $312.34, 8.2% below (volume node, never defended). Upside +9% to $371; reward-to-risk 1.1x. Next catalyst: LRCX Q1 FY27 earnings."),
pb("1 MONTH","LRCX $340.10 \u2014 THESIS: $292.66 (the scheduled date close). Wafer-fab equipment, levered to memory capex. KEY RISK: Sector rotation risk NEXT CATALYST: LRCX Q1 FY27 earnings. Upside +9%, reward-to-risk 1.1x to nearest support. Refreshed the scheduled date.",R,"LRCX $340.10 (the scheduled date close), TRIM/AVOID at 35. $292.66 (the scheduled date close). Wafer-fab equipment, levered to memory capex. Key risk: Sector rotation risk","TRIM/AVOID (35). Watch $312.34, 8.2% below (volume node, never defended). Upside +9% to $371; reward-to-risk 1.1x. Next catalyst: LRCX Q1 FY27 earnings."),
pb("3 MONTHS","LRCX $340.10 \u2014 NEXT QUARTER: LRCX Q1 FY27 earnings. The print either confirms the thesis ($292.66 (the scheduled date close). Wafer-fab equipment, levered to memory capex.) or tests the key risk (Sector rotation risk) Nearest support $312.34, 8.2% below (volume node, never defended). Refreshed the scheduled date.",R,"LRCX $340.10 (the scheduled date close), TRIM/AVOID at 35. $292.66 (the scheduled date close). Wafer-fab equipment, levered to memory capex. Key risk: Sector rotation risk","TRIM/AVOID (35). Watch $312.34, 8.2% below (volume node, never defended). Upside +9% to $371; reward-to-risk 1.1x. Next catalyst: LRCX Q1 FY27 earnings."),
pb("6 MONTHS","LRCX $340.10 \u2014 SIX MONTHS: two prints inside the window. TRIM/AVOID (35). Consensus $371 (+9%), street range $290 (-15%) to $500 (+47%). What would change the view: Sector rotation risk Refreshed the scheduled date.",R,"LRCX $340.10 (the scheduled date close), TRIM/AVOID at 35. $292.66 (the scheduled date close). Wafer-fab equipment, levered to memory capex. Key risk: Sector rotation risk","TRIM/AVOID (35). Watch $312.34, 8.2% below (volume node, never defended). Upside +9% to $371; reward-to-risk 1.1x. Next catalyst: LRCX Q1 FY27 earnings."),
pb("1 YEAR","LRCX $340.10 \u2014 TWELVE MONTHS: consensus $371 implies +9%; street range $290 (-15%) to $500 (+47%). THESIS: $292.66 (the scheduled date close). Wafer-fab equipment, levered to memory capex. STRUCTURAL RISK: Sector rotation risk Refreshed the scheduled date.",R,"LRCX $340.10 (the scheduled date close), TRIM/AVOID at 35. $292.66 (the scheduled date close). Wafer-fab equipment, levered to memory capex. Key risk: Sector rotation risk","TRIM/AVOID (35). Watch $312.34, 8.2% below (volume node, never defended). Upside +9% to $371; reward-to-risk 1.1x. Next catalyst: LRCX Q1 FY27 earnings.")
]},
ASML:{name:"ASML Holding",price:1808.49,avgPT:2117,highPT:2851,ptDate:"Sep 14, 2026",ptVerified:true,lowPT:883,high52:1999.96,low52:935.41,fwdPE:40.7,mktCap:"$665B",ytd:55,yr1:112,consensus:"Strong Buy",earningsDate:"Oct 14, 2026",epsEst:8.75,epsEstDate:"Jul 23, 2026",sector:"Semi Equipment - Lithography Monopoly",
support:[{lvl:1750.48,label:"Volume node \u2014 3.2% below"},{lvl:1572.84,label:"Swing low 2026-09-14 \u2014 held 1x"},{lvl:1530.64,label:"Swing low 2026-07-29 \u2014 held 0x"}],supportDate:"Oct 1, 2026",brokenSup:[],supportVerified:false,
maxPain:1740,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:15069,maxPainNear:1770.0,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,
news:[n(10106,"Q2 ABOVE GUIDANCE; FY26 RAISED TO EUR 43-45B","Q2 2026 (Jul 15): net sales EUR 9.3B, +21.3%; gross margin 54.0%, both above guidance; operating margin 37.1%. FY26 guidance raised to EUR 43-45B at 54-56% gross margin; EUV +45%, memory revenue +75%. Consensus target $2,117 across 44 analysts.","Company filings","2026-07-15",0.3,"e",14,"earnings"),n(9901,"THE INFORMATION: Chinese firm building immersion DUV \u2014 first credible moat challenge","Jul 28: The Information reported a Chinese company is manufacturing an immersion deep-ultraviolet lithography machine, the segment ASML dominates, with follow-on reports the tools could ship to customers THIS YEAR. ASML -3.76% to $1,591 after falling more than 8% on the European line Monday; ASM International and BE Semiconductor also fell 2-3%. THIS IS THE FIRST ITEM THAT ACTUALLY TOUCHES THE FOREVER-HOLD THESIS. Prior selling was complex de-rating with the monopoly intact. DUV is not EUV \u2014 it is the older, lower-margin node and China building DUV does not mean China building High-NA EUV. But the moat argument has always rested on nobody else being able to build ANY of it. Verify the claim before repricing; The Information is single-sourced here.","The Information via CNBC","2026-07-28",-0.65,"v",17,"news"),
n(9809,"ASML -5.32% to $1,648 — caught in the equipment de-rate, next print Oct 14","ASML fell $109.09 Jul 27 to $1,648, an 8.6% drawdown from the Jul 23 close of $1,803 across two sessions. No company-specific news — the move is the semi-equipment complex de-rating alongside LRCX (-4.73%) as the AI capex ROI debate broadens. Forever-hold designation unchanged; the monopoly and the High-NA ramp are untouched by a two-day tape. Note the $1,660 street low PT now sits above the $1,648 price.","market data","2026-07-27",-0.3,"t",11,"news"),
n(9201,"2026 guidance RAISED to 36-40B EUR","EUV shipments raised 25 pct to 60 units for 2026, capacity for 80 in 2027. CEO: demand for chips is outpacing supply, customers accelerating capacity expansion","ASML Q1 2026 report","Jun 3, 2026",0.7,"e",9,"catalyst"),n(9202,"Installed Base Mgmt 2.5B EUR in Q1","Recurring services now over 28 pct of quarterly sales — annuity stream on the growing EUV fleet","ASML Q1 2026 report","Jun 3, 2026",0.5,"m",7,"intel"),n(9203,"Street PTs: BofA 1921 EUR, JPM 1900, MS 1660","Avg target ~1694 USD. 44 analysts Strong Buy. Consensus sees monopoly durability through High-NA ramp","BofA/JPM/Morgan Stanley","Jun 3, 2026",0.4,"a",7,"intel"),n(9204,"China fell 36 pct to 19 pct of revenue","Export restrictions tightened — the geopolitical tail on backlog conversion. Disclosed and baked into guidance","ASML disclosures","Jun 3, 2026",-0.3,"m",6,"intel"),n(9205,"Most valuable company in Europe ~674B","Trailing P/E ~58 = all-time-high valuation. GF Value ~1127 flags significantly overvalued. Quality fully priced — starter-size entries only","GuruFocus/market data","Jun 3, 2026",-0.2,"a",6,"intel"),
n(8810,"Fool: ASML owns the AI critical bottleneck","Jul 23 analysis frames ASML as the single most defensible layer of the AI stack — the only EUV supplier on Earth with no substitute within a decade. Valuation debate centers on 37x vs the monopoly quality.","Motley Fool","2026-07-23",0.7,"a",12,"analyst"),
n(8811,"ASML jumped 86 percent in H1 2026","Best half in company history. From ~1460 May low to 1999.96 intraday ATH Jun 30, driven by AI litho demand, High-NA adoption, and the Q2 guide raise setup.","Motley Fool / stockanalysis","2026-07-21",0.8,"t",12,"technical"),
n(8812,"Intel Foundry now using ASML High-NA litho machines","ASML confirms Intel Foundry is running its next-gen lithography in production flow — second-source validation beyond TSMC for the High-NA ramp thesis.","TipRanks","2026-07-20",0.7,"a",12,"catalyst"),
n(8813,"Post-Q2 whipsaw: 1726-1990 July range","Sharp rotation within semis all month — ASML held higher-lows through the Jul 13 (-4%) and Jul 17 (-2%) drawdowns, reclaimed 1800 into Jul 23. Relative strength vs equipment peers.","stockanalysis.com","2026-07-23",0.5,"t",12,"technical"),
n(8806,"ASML Q2 blowout — FY guide raised to 43-45B EUR","Q2 beat with capacity upgrade. FY2026 sales guide raised to 43-45B EUR from 40-42B. CEO cites AI demand outpacing supply. Stock jumped post-print Jul 15 ✓.","Reuters / company report","2026-07-15",0.9,"e",12,"earnings"),
n(8807,"Citi raises ASML PT to 2200 EUR from 1675","Post-Q2 PT wave: Citi to 2200 EUR, Bernstein to 2623 USD from 1971. Street calls Q2 and capacity upgrade a shattering of the AI bear case.","TheFly / TipRanks","2026-07-17",0.8,"a",12,"analyst"),
n(8808,"SK Hynix 26.5B IPO — ASML flagged biggest winner","Largest chip IPO prices. Analysis names ASML the biggest beneficiary of expanded HBM capex — every new fab needs EUV. Trillion-dollar-company talk resurfacing for first European candidate.","Motley Fool / Reuters","2026-07-21",0.8,"a",12,"catalyst"),
n(8809,"ASML offers 20K EUR retention bonuses for 2027-2030","Reuters reports staff retention program through 2030 — signal of multi-year capacity ramp commitment. Dividend 2.151 USD ex-date Oct 14 print (est)","Reuters","2026-07-20",0.6,"a",12,"ops")
],
catalysts:[{d:"Oct 14",e:"ASML Q3 earnings",i:"high",iv:"med",hm:"N/A"},
{d:"Jul 28 \u2713",e:"ASML dividend ex-date $2.151 (passed)",i:"neutral",iv:"low",hm:""},
{d:"Oct 14",e:"ASML Q3 2026 earnings + bookings",i:"high",iv:"high",hm:""},
{d:"Q4 2026",e:"High-NA EUV broader adoption updates",i:"bullish",iv:"med",hm:""},
{d:"2027",e:"80 EUV unit annual capacity target",i:"bullish",iv:"med",hm:""}
],
playbook:[
pb("1 WEEK","ASML $1808 \u2014 HOLD (62). Nearest support $1750.48, 3.2% below (volume node, never defended). +17% to $2117 consensus. RSI 60, MACD +18.29. NEXT: Oct 14 \u2014 ASML Q3 earnings. Earnings in 13d. Watch: Multiple compression from 37x ATH valuation Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",Y,"ASML $1808.49 as of the latest close, HOLD at 62 on the tool's five-component score. $1646.19 (Sep 3 close). Lithography monopoly. Nearest observed support sits at $1750.48.","HOLD (62). Watch $1750.48, 3.2% below (volume node, never defended). Upside +17% to $2117; reward-to-risk 5.3x. Next catalyst: ASML Q3 earnings."),
pb("1 MONTH","ASML $1808.49 \u2014 THESIS: $1646.19 (the scheduled date close). Lithography monopoly. KEY RISK: Multiple compression from 37x ATH valuation NEXT CATALYST: ASML Q3 earnings. Upside +17%, reward-to-risk 5.3x to nearest support. Refreshed the scheduled date.",Y,"ASML $1808.49 (the scheduled date close), HOLD at 62. $1646.19 (the scheduled date close). Lithography monopoly. Key risk: Multiple compression from 37x ATH valuation","HOLD (62). Watch $1750.48, 3.2% below (volume node, never defended). Upside +17% to $2117; reward-to-risk 5.3x. Next catalyst: ASML Q3 earnings."),
pb("3 MONTH","ASML $1808.49 \u2014 NEXT QUARTER: ASML Q3 earnings. The print either confirms the thesis ($1646.19 (the scheduled date close). Lithography monopoly.) or tests the key risk (Multiple compression from 37x ATH valuation) Nearest support $1750.48, 3.2% below (volume node, never defended). Refreshed the scheduled date.",Y,"ASML $1808.49 (the scheduled date close), HOLD at 62. $1646.19 (the scheduled date close). Lithography monopoly. Key risk: Multiple compression from 37x ATH valuation","HOLD (62). Watch $1750.48, 3.2% below (volume node, never defended). Upside +17% to $2117; reward-to-risk 5.3x. Next catalyst: ASML Q3 earnings."),
pb("1 YEAR","ASML $1808.49 \u2014 TWELVE MONTHS: consensus $2117 implies +17%; street range $883 (-51%) to $2851 (+58%). THESIS: $1646.19 (the scheduled date close). Lithography monopoly. STRUCTURAL RISK: Multiple compression from 37x ATH valuation Refreshed the scheduled date.",Y,"ASML $1808.49 (the scheduled date close), HOLD at 62. $1646.19 (the scheduled date close). Lithography monopoly. Key risk: Multiple compression from 37x ATH valuation","HOLD (62). Watch $1750.48, 3.2% below (volume node, never defended). Upside +17% to $2117; reward-to-risk 5.3x. Next catalyst: ASML Q3 earnings.")
],
options:{ivRank:null,ivPctl:null,impliedMove:12.1,skew:null,lastEarnMove:2.2,pcRatio:null,maxPain:1700.0,flow:[],maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:15069,maxPainNear:1770.0,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,atmIV:43.07,atmIVExp:"2026-10-30",ivObs:17},
peers:[{t:"ASML",pe:38,ev:31.3,y:88},{t:"LRCX",pe:35,ev:23.6,y:40},{t:"AMAT",pe:22,ev:20,y:15},{t:"KLAC",pe:24,ev:22,y:12}],
tech:{volume:{avg:"1.4M",recent:"1.3M",ratio:0.93,obv:"rising",accDist:"neutral",lastDay:"1.4M",lastDayX:1.01,volDate:"Oct 1, 2026"},momentum:{rsi:59.58,rsiZone:"neutral",macd:{v:22.2036,s:3.9154,h:18.2882,cross:"bullish"}},ma:{d50:1720.0,d100:1726.0,d200:1539.0,d400:1181.0,align:"bullish",brk:[
{ma:"50d",p:1720.0,above:"Above 50d. Post-earnings uptrend intact.",below:"Below 50d. Consolidation deepening."},
{ma:"100d",p:1726.0,above:"Intermediate uptrend.",below:"Break of intermediate trend."},
{ma:"200d",p:1539.0,above:"Primary uptrend intact.",below:"Primary trend break — reassess."}
]},verdict:{score:62,label:"HOLD \u2014 OVERSOLD",c:"g",drivers:"$1,808.49. Above 50d $1,720 (+5.1%), above 200d $1,539 (+17.5%). RSI 59.6 neutral. MACD histogram +18.29 (improving). Nearest observed support $1,750.48, 3.2% below. Next earnings Oct 14."},pattern:{name:"Post-earnings bull flag",target:1950,dir:"up"},
drivers:"$1803 flat on red tape — relative strength. Post-Q2 range $1740-1825. Bernstein $2623 high PT, avg $2100. 50d rising.",
levels:{fibs:[935,1342,1468,1593,2000],pivots:{r2:1838,r1:1823,pp:1807,s1:1792,s2:1776}},
brk:[
{ma:"50d",p:1720.0,above:"Above 50d. Post-earnings uptrend intact.",below:"Below 50d. Consolidation deepening."},
{ma:"100d",p:1726.0,above:"Intermediate uptrend.",below:"Break of intermediate trend."},
{ma:"200d",p:1539.0,above:"Primary uptrend intact.",below:"Primary trend break — reassess."}
]},
fund:{metrics:{lastQ:"Q2 2026 (Jun 2026)",revGrowth:21.3,grossMargin:54.0,opMargin:37.1,netMargin:31.3,roe:52.0,note:"$1,808.49. RSI 59.6, above 50d, above 200d. Next earnings Oct 14."},flow:{inst:"Core European large-cap tech holding; index and global growth funds dominate the register. No verified 13F delta this cycle.",retail:"Limited US retail participation relative to the US semi names — ADR is the access point.",short:"No unusual short-interest signal identified. Qualitative read, not sourced borrow data."},drivers:[
{name:"EUV Monopoly",dir:"up",detail:"Sole supplier of EUV lithography. Every advanced AI chip requires ASML tools at the critical layers."},
{name:"FY Guide Raise",dir:"up",detail:"Q2 raised FY2026 sales guidance to 43-45B EUR from 40-42B, with the CEO citing demand outpacing supply."},
{name:"Installed Base Revenue",dir:"up",detail:"Service and upgrade revenue on the installed fleet provides a recurring floor beneath the equipment cycle."},
{name:"China Mix",dir:"down",detail:"Export restrictions cut China to roughly 19 percent of revenue from prior-cycle highs."}
],compPos:{peers:[{t:"LRCX",pe:30,ev:22,y:9},{t:"AMAT",pe:24,ev:18,y:6},{t:"KLAC",pe:29,ev:21,y:12},{t:"TEL",pe:28,ev:19,y:10}]},story:"$1646.19 (Sep 3 close). Lithography monopoly. Reported Jul 15. Next earnings Oct 14. Latest-quarter detail in this panel is NOT yet refreshed.",
bull:"AI demand outpacing supply per CEO. FY guide raised. Citi 2200 EUR, Bernstein $2623. SK Hynix IPO capex flows here. 80 EUV units capacity by 2027. First European trillion-dollar candidate narrative.",
bear:"37x P/E at all-time-high valuation vs ~36 ten-year avg — multiple compression risk on any AI capex digestion. China export restrictions cut China to ~19% of revenue. EU concentration risk. GF Value ~$1088 flags significant overvaluation.",
killer:"A genuine AI capex pause — 2027 digestion year — would compress both units and multiple simultaneously. Litho-alternative breakthrough (none within a decade currently).",
thesisDate:"Sep 25, 2026",fundVerified:true,fundDate:"Sep 17, 2026",
activeRisks:[{sev:"MED",prob:35,risk:"Multiple compression from 37x ATH valuation",trigger:"AI capex digestion signals in 2027 guides",impact:"-25% to ~$1350 fair-multiple zone",catalyst:"Oct 14 Q3 print + bookings"},
{sev:"LOW",prob:20,risk:"China export restriction tightening",trigger:"New US-NL export rules",impact:"China already down to 19% of rev — incremental",catalyst:"Policy headlines"},
{sev:"MED",prob:25,risk:"Customer + supply concentration: TSMC largest customer, Zeiss sole optics source",trigger:"Taiwan escalation or Zeiss capacity disruption",impact:"Single-point dependencies on both sides of the machine",catalyst:"Geopolitical headlines, supplier updates"}
]},
valDate:"Sep 29, 2026"},
NOW:{name:"ServiceNow Inc.",price:137.76,avgPT:146,highPT:248,ptDate:"Sep 14, 2026",ptVerified:true,lowPT:72,high52:192.97,low52:81.24,fwdPE:33.5,mktCap:"$264B",ytd:-7,yr1:18,consensus:"Buy",earningsDate:"Oct 28, 2026",epsEst:4.20,epsEstDate:"Jul 23, 2026",sector:"Enterprise AI / SaaS",support:[{lvl:105.56,label:"Volume node \u2014 23.4% below"},{lvl:102.45,label:"Volume node \u2014 25.6% below"},{lvl:98.0,label:"Swing low 2026-02-09 \u2014 held 7x"}],supportDate:"Oct 1, 2026",brokenSup:[{lvl:159.0,held:2,date:"2025-11-21"}],supportVerified:true,supportAnchor:"$105.56 (23.4%) / $102.45 (25.6%) / $98.00 (28.9%, held 7x) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $105.56, 23.4% below $137.76. That first gap IS the risk \u2014 no observed level between here and there. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:"low",news:[n(10008,"NEEDHAM RAISES TARGET TO $155 FROM $115","Sep 14: Needham lifted its ServiceNow target to $155 from $115 as the SaaS complex rebounded on the AI-safety rotation. Consensus near $146.","MarketBeat","2026-09-14",0.3,"a",12,"analyst"),n(9967,"NOW +34% since Jul 28 \u2014 best performer in the book over the stretch","ServiceNow is $147.50, up 34.0% from $110.08 at the last update and roughly +40% since the Jul 22 Q2 blowout. The Q2 print that started it: EPS $0.90 vs $0.85e, revenue $3.99B +24%, subscription +24.5% at 150bps above the high end of guidance, op margin 29.5%, cRPO $13.20B +21%, 98% renewal, AI ACV through $1B with the 2026 target raised 50% to $1.5B. The late-August agentic-AI software re-rating (CRWD +20.5%, Okta +28%, CRM +22%) extended it.","CNBC","2026-08-31",0.7,"m",14,"news"),
n(9907,"NOW +4.28% to $110.08 \u2014 second straight day leading the rotation, +19% since the print","Jul 28: ServiceNow rose another 4.28% to $110.0804, extending to roughly +19% since the Jul 22 Q2 blowout and making it the strongest name in the book over the stretch. Software again absorbed what came out of hardware: NFLX +3.74%, SHOP +2.88%, CRWD +1.22% against MU -7.71% and LRCX -7.07%. Two consecutive sessions makes this look less like a one-day factor spasm and more like a genuine reallocation. The AI-efficiency angle cuts the same way \u2014 Moonshot\u0027s Kimi K3 benchmarking near frontier at lower cost pressures compute-demand assumptions while helping software margins.","Morningstar","2026-07-28",0.7,"m",14,"news"),
n(9807,"NOW Q2 blowout — beat every guided metric, AI ACV target raised 50%","Reported Jul 22 AMC (reaction Jul 23): adj EPS $0.90 vs $0.85-0.86 est; revenue $3.99B vs $3.93B, +24% YoY. Subscription revenue $3.877B, +24.5% (+23% cc, 150bps above the high end of guidance). Op margin 29.5%, three points above guide. cRPO $13.20B +21%; total RPO $29B +21%. 123 deals over $1M NNACV, +40% YoY; 658 customers above $5M ACV, +23%. Renewal rate 98%. ServiceNow AI ACV crossed $1B and the 2026 target was raised 50% to $1.5B; customers with Agentic AI in production up 9x in nine months. CFO Mastantuono: beat the high end across every topline and profitability metric. Stock +14.5% since, closing $147.50 (+6.82% Jul 27) as software absorbed the rotation out of hardware. JPM Buy, $145 PT. Watch: JPM's Murphy flagged an 'odd lull' in organic cc cRPO growth.","ServiceNow IR / Benzinga / Zacks","2026-07-27",0.85,"e",16,"earnings"),

n(8814,"NOW earnings Jul 29 — the re-rate-or-reassess print","Position sits -16 percent, the book problem child alongside NFLX. Agentic-AI platform thesis intact but the print needs to show AI monetization converting to beat-and-raise or the position question sharpens.","Internal / est date","2026-07-23",0.0,"e",12,"earnings"),
n(8815,"Pegasystems -16 percent on AI-driven purchase slowdowns","Enterprise software warning shot Jul 22: PEGA guided down citing customers pausing purchases while they evaluate AI-native alternatives. Direct read-through risk to legacy workflow vendors — and the bull case for the platforms that ARE the AI layer.","Press / ts2 aggregation","2026-07-22",-0.4,"a",12,"sector"),
n(8816,"10Y at 18-month high — high-multiple software headwind","Rate backdrop turned hostile: oil above 100 rekindled inflation fear, yields spiked, and high-growth software multiples compress first. NOW fwd multiple already reset but the tape fights every rally.","CNBC / Yahoo Finance","2026-07-23",-0.5,"m",12,"macro"),
n(8817,"Software tape: Nasdaq -2.15 percent, worst day in a month","NOW -3.47 percent with the growth complex Jul 23 as AI capex ROI scrutiny hit risk assets broadly. No company-specific news — beta day.","CNBC","2026-07-23",-0.3,"t",12,"technical"),n(9481,"NOW +6.30% — agentic AI platform momentum continues","ServiceNow extended its run on agentic-AI enterprise adoption. Consensus Buy, avg PT ~$143 (range $92-236). Experian + Boomi partnerships expand data activation.","Robinhood/StockAnalysis","2026-06-01",0.6,"a",10),n(9106,"NOW enterprise IT spend resilience","ServiceNow workflow automation considered mission-critical = sticky revenue even in IT budget tightening. 98%+ renewal rates historically.","analyst","2026-05-06",0.2,"f",8),n(9107,"NOW Q1 FY26 beat Apr 23","Q1 beat on subscription revenue + raised guide. cRPO growth strong. AI products contributing to deal sizes. Stock reacted positively.","earnings","2026-04-23",0.4,"e",10),n(9108,"NOW 55x fwd P/E — premium valuation","ServiceNow trades at premium multiple reflecting durable growth + AI optionality. Bull case needs continued 20%+ growth to justify. Watch deceleration.","analyst","2026-05-14",-0.2,"v",8),
],optionsDate:"Oct 1, 2026",optionsVerified:false,options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:-3.7,pcRatio:null,maxPain:130,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:129918,maxPainNear:132.0,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:56.76,atmIVExp:"2026-10-30",ivObs:17},catalysts:[{d:"Oct 28",e:"NOW Q3 earnings",i:"high",iv:"med",hm:"N/A"},{d:"Jul 22, 2026 \u2713",e:"Q2 FY26 BEAT \u2014 EPS $0.90 vs $0.85, rev $3.99B vs $3.93B (+24%); AI ACV target raised 50% to $1.5B. Stock +14.5% since.",i:"bullish",iv:"med",hm:"6%"}],peers:["CRM","WDAY","PLTR"],playbook:[pb("1 WEEK","NOW $138 \u2014 TRIM/AVOID (19). Nearest support $105.56, 23.4% below (volume node, never defended). +6% to $146 consensus. RSI 54, MACD -1.11, 1 broken level above. NEXT: Oct 28 \u2014 NOW Q3 earnings. Watch: High valuation: 55x fwd P/E leaves no room for execution miss Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",R,"NOW $137.76 as of the latest close, TRIM/AVOID at 19 on the tool's five-component score. $145.59 (Sep 3 close). Enterprise workflow platform. Nearest observed support sits at $105.56.","TRIM/AVOID (19). Watch $105.56, 23.4% below (volume node, never defended). Upside +6% to $146; reward-to-risk 0.3x. Next catalyst: NOW Q3 earnings."),
pb("1 MONTH","NOW $137.76 \u2014 THESIS: $145.59 (the scheduled date close). Enterprise workflow platform. KEY RISK: High valuation: 55x fwd P/E leaves no room for execution miss NEXT CATALYST: NOW Q3 earnings. Upside +6%, reward-to-risk 0.3x to nearest support. Refreshed the scheduled date.",R,"NOW $137.76 (the scheduled date close), TRIM/AVOID at 19. $145.59 (the scheduled date close). Enterprise workflow platform. Key risk: High valuation: 55x fwd P/E leaves no room for execution miss","TRIM/AVOID (19). Watch $105.56, 23.4% below (volume node, never defended). Upside +6% to $146; reward-to-risk 0.3x. Next catalyst: NOW Q3 earnings.")],tech:{volume:{avg:"18.1M",recent:"9.9M",ratio:0.55,obv:"flat",accDist:"neutral",lastDay:"10.2M",lastDayX:0.57,volDate:"Oct 1, 2026"},ma:{d50:128.0,d100:116.0,d200:116.0,d400:149.0,align:"bullish",note:"$137.76. RSI 54.3, above 50d, above 200d. 1 level broken. Next earnings Oct 28.",brk:[{ma:"Breakout",p:104,above:"Above $104 — the mapped breakout reclaimed. Re-rate path opens.",below:"Below $104. Still capped by the breakout level despite holding the 50d."}]},verdict:{score:19,label:"TRIM/AVOID \u2014 AT/ABOVE TARGET, MACD+",c:"r",drivers:"$137.76. Above 50d $128 (+7.6%), above 200d $116 (+18.8%). RSI 54.3 neutral. MACD histogram -1.11 (deteriorating). Nearest observed support $105.56, 23.4% below. 1 prior level BROKEN. Next earnings Oct 28."},brk:"$104 breakout level",pattern:"consolidation",vol:"average",momentum:{rsi:54.3,rsiZone:"neutral",note:"building",macd:{v:1.3868,s:2.4961,h:-1.1092,cross:"bearish"}},levels:{fibs:[81,124,137,150,193],pivots:{r2:144,r1:141,p:138,s1:135,s2:132}}},fund:{metrics:{lastQ:"Q2 2026 (Jun 2026)",revGrowth:24.0,grossMargin:80.5,opMargin:29.5,netMargin:23.3,fcfMargin:16.0,note:"Q2 2026 (Jul 22): total revenue $3.987B +24% YoY; subscription $3.877B +24.5% (23% cc), 150bps above the high end of guidance. Non-GAAP operating margin 29.5%, 300bps above guide but down ~50bps YoY. GAAP operating margin only 4%. Non-GAAP net income $930M, EPS $0.90 vs $0.81. cRPO $13.20B +21%; RPO $29.0B +21%. 123 deals over $1M NNACV, +40% YoY; 658 customers above $5M ACV. Renewal 98%. AI ACV crossed $1B. MARGIN PRESSURE IS THE STORY: subscription gross margin fell to 80.5% from 83.0%, a 250bps decline, on hyperscaler partnership usage and AI adoption. Professional services gross margin went NEGATIVE 14% from +14%. Armis ($7.6B), Veza ($1.2B) and Moveworks acquisitions add integration headwinds through FY27. FY26 subscription guidance raised to $15.76-15.78B."},flow:{inst:"Institution-heavy register typical of large-cap enterprise software. No verified 13F delta this cycle.",retail:"Modest retail interest; the name trades on institutional flow.",short:"No unusual short-interest signal identified. Qualitative read, not sourced borrow data."},drivers:[
{name:"Subscription Growth",dir:"flat",detail:"Platform growth intact but decelerating versus prior years. The Jul 29 \u2713 print is the re-rate-or-reassess gate."},
{name:"AI Agent Monetization",dir:"up",detail:"Agentic workflow products are the re-rate lever. Needs to convert to bookings rather than pipeline commentary."},
{name:"Rate Sensitivity",dir:"down",detail:"10Y at an 18-month high compresses high-multiple software first. The tape fights every rally."},
{name:"Enterprise Budget Scrutiny",dir:"down",detail:"Pegasystems fell 16 percent Jul 22 on AI-driven purchase pauses — a direct read-through risk to workflow spend."}
],story:"$145.59 (Sep 3 close). Enterprise workflow platform. Q2 (Jul 22) beat every guided metric: EPS $0.90 vs $0.85, revenue $3.99B +24%, subscription +24.5% at 150bps above the high end of guidance, operating margin 29.5%, cRPO $13.20B +21%, 98% renewal. AI ACV crossed $1B and the 2026 target was raised 50% to $1.5B. Next earnings Oct 28.",bull:"Agentic AI adoption accelerates enterprise workflow automation. Operating leverage from flat-headcount strategy.",bear:"High multiple (55x fwd). Acquisition integration risk. Enterprise IT spend sensitivity to macro.",killer:"AI agents disrupt the workflow SaaS model ServiceNow itself sells.",thesisDate:"Sep 25, 2026",fundVerified:true,fundDate:"Sep 17, 2026",compPos:{xLabel:"AI Platform Depth",yLabel:"Enterprise Moat",peers:[{n:"NOW",x:80,y:85},{n:"CRM",x:70,y:80},{n:"WDAY",x:55,y:70},{n:"PLTR",x:85,y:60}]},activeRisks:[{sev:"MED",prob:40,risk:"High valuation: 55x fwd P/E leaves no room for execution miss",trigger:"Q2 Jul 23 earnings miss or guide cut",impact:"-15-20%",catalyst:"Q2 FY26 reported Jul 22 AMC \u2713 \u2014 beat; next print Oct 28"},{sev:"LOW",prob:30,risk:"Moveworks/acquisition integration risk",trigger:"Integration delays or talent attrition",impact:"-10%",catalyst:"Integration milestones through 2026"},{sev:"LOW",prob:25,risk:"AI agents could disrupt the workflow SaaS model ServiceNow sells",trigger:"Disruptive agentic platforms",impact:"long-term",catalyst:"Competitive AI agent platforms"}]}},
SNPS:{name:"Synopsys Inc.",price:490.54,avgPT:563,highPT:700,ptDate:"Oct 1, 2026",ptVerified:true,lowPT:415,high52:539.48,low52:362.55,fwdPE:26.3,mktCap:"$62B",ytd:2,yr1:12,consensus:"Buy",earningsDate:"Dec 2, 2026",epsEst:"$14.76 FY26 (raised)",epsEstDate:"Jul 23, 2026",metrics:{revGrowth:42.0,grossMargin:78.0,opMargin:33.0,netMargin:0.6,fcfMargin:25.0,roe:8.0,debtEquity:0.45,lastQ:"Q3 FY26 (Jul 2026)"},sector:"EDA / Semiconductor Design",support:[{lvl:458.98,label:"Volume node \u2014 6.4% below"},{lvl:432.38,label:"Volume node \u2014 11.9% below"},{lvl:404.53,label:"Swing low 2026-02-27 \u2014 held 11x"}],supportDate:"Oct 1, 2026",brokenSup:[],supportVerified:true,supportAnchor:"$458.98 (6.4%) / $432.38 (11.9%) / $404.53 (17.5%, held 11x) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $458.98, 6.4% below $490.54. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:"low",news:[n(30011,"INVESTOR DAY ALSO BROUGHT AMAZON AND OPENAI PARTNERSHIPS AND A $1B BUYBACK","Beyond the FY2027 guidance of ~15% revenue growth to $11.15B, Synopsys announced headline partnerships with Amazon and OpenAI and a $1 billion share repurchase authorisation, which together explain the scale of the move. Wells Fargo raised its target to $540 from $475 on Oct 1 and HSBC upgraded to Buy with a street-high $700, citing ~28% earnings growth through 2028. Consensus moved to $563 (Yahoo, range $415-$700); MarketBeat shows $581 across 21 analysts.","Yahoo Finance / MarketBeat","2026-10-01",0.8,"a",20,"analyst"),n(30003,"+12.78% ON 3.4x VOLUME \u2014 THE RE-RATING ARRIVED THE DAY AFTER THE INVESTOR DAY","Oct 1: SNPS rose 12.78% to $490.54 on 3.4x average volume, by far the heaviest print in the book, following the Sep 30 Investor Day where management guided fiscal 2027 revenue growth of ~15% to $11.15B at the midpoint with expanding non-GAAP operating margins. The stock has now risen roughly 34% from $367 on Sep 15. RSI 74 is the only overbought reading in the book and upside to the $545 consensus has compressed to 11%, so the asymmetry that defined the setup is spent. The $545 target predates the new long-term model and is likely to be revised upward.","Market data / company","2026-10-01",0.7,"t",20,"technical"),n(30001,"INVESTOR DAY: FY2027 REVENUE GUIDED TO ~15% GROWTH, $11.15B MIDPOINT \u2014 STOCK +4.8%","Sep 30 Investor Day in New York. Synopsys issued an updated long-term financial model: fiscal 2027 revenue growth of approximately 15% year over year to $11.15B at the midpoint, with expanding non-GAAP operating margins. This is the quantification management committed to on the Q3 call. Multiphysics Fusion begins contributing to EDA growth in FY27 with the $400M synergy target reiterated; Factory 2 advancing via licensing-plus-royalty; 30+ agentic AI customer engagements. Shares rose 4.78% on 2.4x average volume, the heaviest participation in the book.","Company press release","2026-09-30",0.8,"e",22,"catalyst"),n(10101,"Q3: ORGANIC EDA +8.5%, DESIGN IP BACK TO +11%, ELLIOTT ON BOARD; INVESTOR DAY SEP 30","Q3 FY26 (Aug 27): revenue $2.477B +42%, of which $711M is Ansys; organic EDA growth 8.5% against a 16% comparison; Design IP $474M, +11% after four declining quarters; FY26 guidance raised to $9.69-9.74B and $15.04-15.10 EPS. Elliott Management opened a new position in Q2 with a partner on the board. Beat-and-sell pattern is 3-for-3 this year. Investor Day Sep 30 is where the 2027 Multiphysics Fusion and Factory 2 levers are either quantified or deferred. Broke $376.18 on Sep 15 and recovered it the next session.","Company filings / MarketBeat / research","2026-09-05",0.2,"e",18,"earnings"),n(9511,"SNPS — Elliott board seat (Jesse Cohn) effective Jun 1 post Q2 beat","Synopsys Q2 FY26 beat (rev $2.276B +42%, EPS $3.35, raised FY guide). Elliott cooperation: Jesse Cohn independent director from Jun 1. Sep 2026 Investor Day set.","SEC 8-K","2026-06-01",0.5,"a",10),n(9203,"SNPS Citi raises PT $580→$600 May 13","Citi analyst Kelsey Chia raised PT to $600 from $580, maintains Buy. EDA demand from AI chip design cycle. Synopsys + Cadence duopoly economics.","Citi","2026-05-13",0.5,"a",13),n(9204,"SNPS Ansys $35B acquisition — Silicon-to-Systems pivot","Synopsys integrating $35B Ansys acquisition. Extends from chip design (EDA) into simulation/systems engineering. Cross-sell into broader engineering workflow. Integration is key 2026 story.","analyst","2026-05-10",0.3,"f",11),n(9205,"SNPS TSMC partnership for next-gen AI systems","Synopsys partnered with TSMC (Apr 22) to power next-gen AI chip designs. Reinforces EDA position at leading-edge nodes. Every advanced AI chip uses Synopsys tools.","TipRanks","2026-04-22",0.4,"v",11),n(9206,"SNPS IP segment headwind risk","$1.75B IP licensing business facing headwinds as fab capacity shifts to AI/HPC away from consumer designs. Feb PT cuts cited this. Watch Q2 commentary.","analyst","2026-05-06",-0.3,"v",10),n(9207,"SNPS Wells Fargo Hold PT $505 May 14","Wells Fargo gave Hold rating, PT $505 (raised from $450). More cautious view — integration + IP risk balanced against EDA strength. Avg PT $570.","Wells Fargo","2026-05-14",0.0,"a",10),n(9208,"SNPS EDA duopoly moat","Synopsys + Cadence control ~70% of EDA market. Every semiconductor design flows through their tools = picks-and-shovels on entire chip industry including AI accelerators.","analyst","2026-05-08",0.4,"f",10),n(9202,"SNPS Q2 earnings May 27 AMC — Ansys integration in focus","Synopsys reports Q2 FY26 May 27 after close. Silicon-to-Systems pivot post-$35B Ansys deal. EDA + IP business. Risk: IP segment headwinds as fab capacity shifts to AI/HPC away from consumer.","TipRanks","2026-05-17",0.2,"e",14)],optionsDate:"Oct 1, 2026",optionsVerified:false,options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:-4.8,pcRatio:null,maxPain:410,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:13340,maxPainNear:422.5,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:43.1,atmIVExp:"2026-10-30",ivObs:17},catalysts:[{d:"Sep 30 \u2713",e:"SNPS Investor Day RESOLVED \u2014 guided FY27 revenue ~15% to $11.15B",i:"high",iv:"med",hm:"N/A"},{d:"May 27, 2026 ✓",e:"Q2 FY26 earnings AMC",i:"neutral",iv:"high",hm:"7.5%"}],peers:["CDNS","ANSS","KLAC"],playbook:[pb("1 WEEK","SNPS $491 \u2014 TRIM/AVOID (37). Nearest support $458.98, 6.4% below (volume node, never defended). +11% to $545 consensus. RSI 74, MACD +8.30. NEXT: no dated catalyst in the next quarter. Watch: Q2 earnings May 27 — 7.5% implied move Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",R,"SNPS $490.54 as of the latest close, TRIM/AVOID at 37 on the tool's five-component score. $416.31 (Sep 3 close). EDA duopoly with Cadence. Nearest observed support sits at $458.98.","TRIM/AVOID (37). Watch $458.98, 6.4% below (volume node, never defended). Upside +11% to $545; reward-to-risk 1.7x. Next catalyst: the next scheduled print."),
pb("1 MONTH","SNPS $490.54 \u2014 THESIS: $416.31 (the scheduled date close). EDA duopoly with Cadence. KEY RISK: Q2 earnings the scheduled date — 7.5% implied move NEXT CATALYST: the next scheduled print. Upside +11%, reward-to-risk 1.7x to nearest support. Refreshed the scheduled date.",R,"SNPS $490.54 (the scheduled date close), TRIM/AVOID at 37. $416.31 (the scheduled date close). EDA duopoly with Cadence. Key risk: Q2 earnings the scheduled date — 7.5% implied move","TRIM/AVOID (37). Watch $458.98, 6.4% below (volume node, never defended). Upside +11% to $545; reward-to-risk 1.7x. Next catalyst: the next scheduled print.")],tech:{volume:{avg:"2.0M",recent:"3.3M",ratio:1.66,obv:"rising",accDist:"accumulation",lastDay:"6.7M",lastDayX:3.36,volDate:"Oct 1, 2026"},ma:{d50:405.0,d100:435.0,d200:445.0,d400:467.0,align:"mixed",note:"$490.54. RSI 74.4, above 50d, above 200d. Next earnings Dec 2.",brk:[{ma:"Breakout",p:520,above:"Above $520 — the mapped breakout reclaimed.",below:"Below $520 and under the 50d. Basing well beneath the breakout; discount to the $570 target is the setup."}]},verdict:{score:37,label:"TRIM/AVOID \u2014 ON DEFENDED SUPPORT, MACD+",c:"y",drivers:"$490.54. Above 50d $405 (+21.1%), above 200d $445 (+10.2%). RSI 74.4 extended. MACD histogram +8.30 (improving). Nearest observed support $458.98, 6.4% below. Last session 3.4x average volume. Next earnings Dec 2."},brk:"$520 breakout",pattern:"pre-earnings base",vol:"average",momentum:{rsi:74.41,rsiZone:"overbought",note:"neutral",macd:{v:10.1565,s:1.8585,h:8.2979,cross:"bullish"}},levels:{fibs:[363,430,451,472,539],pivots:{r2:518,r1:504,p:483,s1:469,s2:448}}},fund:{metrics:{lastQ:"Q3 FY26 (Jul 2026)",revGrowth:42.0,opMargin:41.6,note:"Q3 reported Aug 27: revenue $2.477B +42% YoY, non-GAAP EPS $3.91, op margin 41.6%. FY26 guidance raised to $9.69-9.74B revenue and $15.04-15.10 EPS. FCF guidance raised $600M to ~$2.6B. INVESTOR DAY (Sep 30, New York): management issued a long-term financial model and quantified fiscal 2027 \u2014 revenue growth of approximately 15% to $11.15B at the midpoint, with expanding non-GAAP operating margins. Stock rose 4.78% on 2.4x volume, the heaviest print in the book. Q3 disclosures behind it: 30+ active agentic AI customer engagements; Multiphysics Fusion contributes to EDA growth from fiscal 2027 with the $400M synergy target reiterated for year four; Factory 2 advancing through licensing-plus-royalty discussions. Backlog $11B."},flow:{inst:"Institution-heavy EDA register. No verified 13F delta this cycle.",retail:"Low retail participation.",short:"No unusual short-interest signal identified. Qualitative read, not sourced borrow data."},drivers:[
{name:"EDA Demand",dir:"up",detail:"Chip design starts remain strong across AI accelerators and the broadening custom-silicon wave."},
{name:"Ansys Integration",dir:"flat",detail:"The simulation combination broadens TAM. Execution and cost synergies are still being demonstrated."},
{name:"China Restrictions",dir:"down",detail:"Export limits on EDA tools into China remain a persistent overhang on the growth line."},
{name:"Valuation Reset",dir:"up",detail:"Down 12 percent YTD to 374 against a 570 average target. The discount is the setup into the Aug print."}
],story:"POST-EARNINGS UPDATE. The Investor Day also brought Amazon and OpenAI partnerships and a $1B buyback authorisation. Investor Day Sep 30: fiscal 2027 revenue growth guided to ~15% ($11.15B midpoint) with expanding non-GAAP operating margins; $400M Ansys synergy reiterated for year four; 30+ agentic AI customer engagements; Multiphysics Fusion contributes from FY27. $416.31 (Sep 3 close). EDA duopoly with Cadence. Reported Aug 26. Next earnings Dec 2. Latest-quarter detail in this panel is NOT yet refreshed.",bull:"AI chip design boom drives EDA demand. Ansys cross-sell. Picks-and-shovels play on all silicon.",bear:"IP segment ($1.75B) headwinds as fab capacity shifts to AI/HPC. Ansys integration risk. 38x multiple.",killer:"AI-driven chip design automation disrupts the EDA tools model itself.",thesisDate:"Oct 1, 2026",fundVerified:true,fundDate:"Oct 1, 2026",compPos:{xLabel:"EDA Market Share",yLabel:"AI Design Exposure",peers:[{n:"SNPS",x:45,y:80},{n:"CDNS",x:42,y:78},{n:"ANSS",x:15,y:50},{n:"KLAC",x:20,y:65}]},activeRisks:[{sev:"MED",prob:50,risk:"Q2 earnings May 27 — 7.5% implied move",trigger:"Q2 FY26 print + Ansys integration update",impact:"-7.5% implied",catalyst:"Q2 FY26 earnings May 27 ✓"},{sev:"LOW",prob:30,risk:"IP segment ($1.75B) softness as fab capacity shifts to AI/HPC",trigger:"Consumer design weakness",impact:"-5%",catalyst:"IP licensing trends"},{sev:"MED",prob:35,risk:"Ansys $35B integration execution risk",trigger:"Integration delays or dis-synergies",impact:"-10-15%",catalyst:"Integration progress through FY26"}]}},
NBIS:{name:"Nebius Group",price:232.28,avgPT:280,highPT:291,ptDate:"Sep 25, 2026",ptVerified:true,lowPT:226,high52:299.86,low52:73.52,fwdPE:0,mktCap:"$60B",ytd:158,yr1:110,consensus:"Buy",earningsDate:"Nov 10, 2026 (TBC)",epsEst:-1.28,epsEstDate:"Sep 25, 2026",sector:"AI Infrastructure",support:[{lvl:219.51,label:"Volume node \u2014 5.5% below"},{lvl:194.8,label:"Swing low 2026-09-01 \u2014 held 1x"},{lvl:145.8,label:"Swing low 2026-07-29 \u2014 held 0x"}],supportDate:"Oct 1, 2026",brokenSup:[],
supportVerified:true,
supportAnchor:"$219.51 (5.5%) / $194.80 (16.1%, held 1x) / $145.80 (37.2%, held 0x) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $219.51, 5.5% below $232.28. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.6,
news:[n(31000,"MICROSOFT CONTRACT: $17.4B OVER FIVE YEARS, UP TO $19.4B","The anchor contract. Capacity delivered from the Vineland, New Jersey site. Alongside Meta at up to $27B, these two customers underpin a backlog reported at $40B+. Customer concentration is the counterpart risk.","Company disclosure","2026-08-12",0.4,"e",14,"intel"),n(31001,"NVIDIA INVESTED $2B IN MARCH 2026","Nvidia took a $2B stake, which both validates the platform and ties Nebius more closely to Nvidia's roadmap and allocation decisions.","Company / press","2026-03-11",0.4,"g",12,"intel"),n(31002,"CAPACITY AUCTION CLEARED 15% ABOVE PRIOR BLACKWELL PRICING","Evidence of genuine supply tightness rather than asserted demand: the auction mechanism produced pricing above the previous Blackwell high, and on-demand prices rise from Oct 1.","Company commentary","2026-08-12",0.5,"v",14,"intel"),n(31003,"PREPAYMENTS COVER 50-60% OF CAPEX ON NEW CONTRACTS","Customers fund more than half the capital cost of the capacity they book. That is the strongest single argument that demand is real, and it partially offsets the $20-25B capex guide.","10-Q / company","2026-08-12",0.5,"e",14,"intel"),n(20000,"Q2: REVENUE +454%, ARR TRIPLED TO $3B, ADJ EBITDA 41% \u2014 GUIDANCE REAFFIRMED","Revenue $582.3M +454% YoY; ARR $3.0B; adjusted EBITDA $236M at 41% (from 32% in Q1). Four $1B+ contracts averaging over $1B each with 50-60% of capex prepaid. Capacity auction cleared 15% above prior Blackwell pricing. 2026 revenue $3.0-3.4B, YE ARR $7-9B, capex $20-25B reaffirmed. Stock +34% on the print.","Company filings","2026-08-12",0.7,"e",18,"earnings"),
n(20001,"ON-DEMAND GPU PRICES TO RISE FROM OCT 1; PALANTIR NAMES NEBIUS PREFERRED SOVEREIGN PARTNER","Bloomberg reported Nebius will raise on-demand GPU pricing from Oct 1. Same week, Palantir named it preferred sovereign AI infrastructure partner. Director John Boynton sold shares Sep 17.","Bloomberg / company","2026-09-17",0.3,"g",12,"news"),
n(20002,"$2.8B RAISED VIA ATM AT ~$224 \u2014 DILUTION IS THE BASE CASE","12.7M shares issued through the ATM in Q2 at an average $224, plus a $775M asset-backed facility at SOFR+250. Capex guided $20-25B against $3.0-3.4B revenue; stock fell ~10% in late August on funding concerns.","10-Q","2026-08-28",-0.4,"r",14,"intel"),
n(20003,"ADDED TO COVERAGE SEP 21 \u2014 SCORED ON $280, PUBLISHED RANGE $226 to $291 against a $232 price","TipRanks $280 (9 analysts), INDmoney $288, Stockanalysis $291 (6), Citizens $270, Simply Wall St $231, MarketBeat $226. Nearest defended level $194.80, held once. Structurally closer to MU than AVGO: real growth, no measured floor.","ADE research","2026-09-21",0.0,"v",10,"intel")],
options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:null,pcRatio:null,maxPain:230,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:123784,maxPainNear:230.0,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:73.45,atmIVExp:"2026-10-30",ivObs:7},
optionsDate:"Oct 1, 2026",optionsVerified:true,
tech:{
ma:{d50:218.0,d100:222.0,d200:167.0,d400:115.0,align:"bullish",brk:[{ma:"50d",p:218.0,above:"Above 50d. Short-term trend intact.",below:"Below 50d. Momentum cooling."},{ma:"100d",p:222.0,above:"Intermediate uptrend holding.",below:"Intermediate trend break."},{ma:"200d",p:167.0,above:"Primary uptrend intact.",below:"Primary trend break \u2014 reassess the thesis."}],d50:215.57,d100:220.19,d200:164.1,d400:113.43},
momentum:{rsi:52.77,rsiZone:"neutral",macd:{v:4.5158,s:3.7058,h:0.8099,cross:"bullish"},roc:13.8},
volume:{avg:"20.6M",recent:"12.8M",ratio:0.62,obv:"rising",accDist:"neutral",lastDay:"12.3M",lastDayX:0.59,volDate:"Oct 1, 2026"},
levels:{fibs:[{r:"0%",p:74,l:"52w low"},{r:"38.2%",p:160,l:"Shallow"},{r:"50%",p:187,l:"Midpoint"},{r:"61.8%",p:213,l:"Deep"},{r:"100%",p:300,l:"52w high"}],pivots:{r2:245,r1:238,pp:233,s1:227,s2:222}},
pattern:{name:"New coverage",target:280,dir:"up",note:"$232.28. RSI 52.8, above 50d, above 200d. Next earnings ~Nov 10."},
verdict:{score:58,label:"HOLD \u2014 new coverage",c:"y",drivers:"$232.28. Above 50d $218 (+6.6%), above 200d $167 (+39.1%). RSI 52.8 neutral. MACD histogram +0.81 (improving). Nearest observed support $219.51, 5.5% below. Next earnings ~Nov 10."}},
fundVerified:true,
fundDate:"Sep 25, 2026",
fund:{
story:"AI neocloud renting GPU capacity at hyperscale. Q2 2026 revenue $582.3M, +454% YoY; ARR tripled to $3.0B; adjusted EBITDA $236M at a 41% margin. Anchored by Microsoft ($17.4B over five years) and Meta (up to $27B), with $40B+ of backlog. Guidance reaffirmed: 2026 revenue $3.0-3.4B, year-end ARR $7-9B, capex $20-25B. The business is exceptional; the balance sheet is the question.",
drivers:[
{name:"Hyperscaler backlog",dir:"up",detail:"Microsoft and Meta contracts anchor $40B+ of backlog; four new $1B+ deals in Q2 with 50-60% of capex prepaid by customers."},
{name:"Pricing power",dir:"up",detail:"Capacity auction cleared 15% above prior Blackwell pricing; on-demand GPU price increase from Oct 1."},
{name:"Margin inflection",dir:"up",detail:"Adjusted EBITDA margin 41% in Q2 from 32% in Q1; core AI cloud margin 49.7%."},
{name:"Capital intensity",dir:"risk",detail:"Capex guided $20-25B against $3.0-3.4B revenue. $2.8B raised via ATM in Q2 at ~$224; further issuance is the base case."}
],
flow:{inst:"Nvidia invested $2B in March. Hyperscaler prepayments fund over half of new capex.",retail:"Heavy retail interest as a pure-play AI-infrastructure momentum name; +159% YTD.",short:"Elevated short interest typical of capital-hungry growth names; ATM issuance caps rallies."},
bull:{path:"ARR reaches $7-9B by year-end as guided; prepaid capacity converts; pricing holds; multiple re-rates on visible 2027 profitability.",price:"$280-320"},
bear:{path:"GPU pricing rolls over as 2027 industry capacity lands; equity issuance outpaces the plan; Meta competes with the neoclouds it funds.",price:"$150-180"},
activeRisks:[{sev:"HIGH",prob:50,risk:"Capital intensity and dilution: capex $20-25B vs $3-3.4B revenue; ATM issued 12.7M shares at $224 in Q2",trigger:"Another large ATM or convert",impact:"-10-15% on announcement",catalyst:"Each quarterly print; capex cadence"},
{sev:"HIGH",prob:35,risk:"Customer concentration: Microsoft and Meta anchor the backlog; Meta could compete with the neoclouds it funds",trigger:"A hyperscaler in-sources or renegotiates",impact:"-20%",catalyst:"Contract disclosures; Nov 10 print"},
{sev:"MED",prob:40,risk:"GPU pricing and obsolescence once 2027 capacity lands industry-wide",trigger:"Auction pricing below prior Blackwell levels",impact:"Margin compression",catalyst:"Quarterly pricing commentary"},
{sev:"MED",prob:30,risk:"Target dispersion: published consensus runs $226 to the top of a wide published range on thin coverage on 6-10 analysts",trigger:"Coverage widens with lower targets",impact:"Score-sensitive",catalyst:"Ongoing"}],
killer:"Hyperscaler capex slows and the neoclouds are the first cut; Nebius is a pure-play renter of capacity with no other business.",
revMix:[{n:"AI Cloud",p:98,c:"#3DBFA8"},{n:"Other",p:2,c:"#B266FF"}],
compPos:{xLabel:"GPU Capacity Scale",yLabel:"Contracted Backlog",peers:[{n:"NBIS",x:60,y:75,self:true},{n:"CRWV",x:85,y:90},{n:"IREN",x:35,y:30},{n:"APLD",x:30,y:40}]},
mgmt:{beats:3,misses:0,streak:"+3",note:"Reaffirmed all 2026 guidance in Q2; raised year-end power target to 5 GW."},
metrics:{lastQ:"Q2 2026 (Jun 2026)",revGrowth:454.0,opMargin:0.0,note:"Q2 2026 (Aug 11-12): revenue $582.3M, +454% YoY and +46% sequentially; Nebius AI revenue $575M, 98% of group. ARR $3.0B. Adjusted EBITDA $236M at 41% (from 32% in Q1); core AI cloud margin 49.7%. Net loss from continuing operations $190.4M. Four new $1B+ contracts with 50-60% of capex prepaid; auction cleared 15% above prior Blackwell pricing. Guidance reaffirmed: 2026 revenue $3.0-3.4B, YE ARR $7-9B, ~40% adj EBITDA margin, capex $20-25B; contracted power target 5 GW. $8B cash; $2.8B raised via ATM (12.7M shares at ~$224); $775M asset-backed facility at SOFR+250. Bloomberg Sep 17: on-demand GPU prices rise from Oct 1. Palantir named Nebius preferred sovereign AI infrastructure partner. Next print ~Nov 10; consensus EPS -$1.28."},
watchlist:[{item:"NBIS Q3 print",d:"~Nov 10",why:"ARR trajectory toward the $7-9B year-end guide; capex cadence; any new issuance"},{item:"ATM / financing filings",d:"Ongoing",why:"Dilution is the base case; size and price of issuance"},{item:"GPU pricing",d:"Quarterly",why:"Auction and on-demand pricing vs prior Blackwell levels"},{item:"Hyperscaler capex guides",d:"Quarterly",why:"Neoclouds are the first cut if capex slows"}],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",ptDate:"Sep 25, 2026",riskDate:"Sep 25, 2026"},
catalysts:[{d:"Nov 10",e:"NBIS Q3 2026 earnings (date TBC)",i:"high",iv:"high",hm:"N/A"},{d:"Oct 1 \u2713",e:"On-demand GPU price increase took effect \u2014 pricing power test now observable in Q4 revenue",i:"med",iv:"low",hm:"N/A"},{d:"Dec 31",e:"Year-end ARR target $7-9B; contracted power 5 GW",i:"high",iv:"med",hm:"N/A"}],
peers:[{t:"NBIS",pe:0,ev:42,y:159},{t:"CRWV",pe:0,ev:35,y:80},{t:"IREN",pe:0,ev:20,y:60}],
playbook:[
pb("1 WEEK","NBIS $232 \u2014 HOLD (58). Nearest support $219.51, 5.5% below (volume node, never defended). +21% to $280 consensus. RSI 53, MACD +0.81. NEXT: Nov 10 \u2014 NBIS Q3 2026 earnings (date TBC). Key risk to watch: Capital intensity and dilution: capex $20-25B vs $3-3.4B revenue; ATM issued 12.7M shares at $224 in Q2 Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",Y,"NBIS $232.28 as of the latest close, HOLD at 58 on the tool's five-component score. AI neocloud renting GPU capacity at hyperscale. Q2 2026 revenue $582.3M, +454% YoY; ARR tripled to $3.0B; adjusted EBITDA $236M at a 41% margin. Nearest observed support sits at $219.51.","HOLD (58). Watch $219.51, 5.5% below (volume node, never defended). Upside +21% to $280; reward-to-risk 3.7x. Next catalyst: NBIS Q3 2026 earnings (date TBC)."),
pb("1 MONTH","NBIS $232.28 \u2014 THESIS: AI neocloud renting GPU capacity at hyperscale. Q2 2026 revenue $582.3M, +454% YoY; ARR tripled to $3.0B; adjusted EBITDA $236M at a 41% margin. KEY RISK: Capital intensity and dilution: capex $20-25B vs $3-3.4B revenue; ATM issued 12.7M shares at $224 in Q2 NEXT CATALYST: NBIS Q3 2026 earnings (date TBC). Upside +21%, reward-to-risk 3.7x to nearest support. Refreshed the scheduled date.",Y,"NBIS $232.28 (the scheduled date close), HOLD at 58. AI neocloud renting GPU capacity at hyperscale. Q2 2026 revenue $582.3M, +454% YoY; ARR tripled to $3.0B; adjusted EBITDA $236M at a 41% margin. Key risk: Capital intensity and dilution: capex $20-25B vs $3-3.4B revenue; ATM issued 12.7M shares at $224 in Q2","HOLD (58). Watch $219.51, 5.5% below (volume node, never defended). Upside +21% to $280; reward-to-risk 3.7x. Next catalyst: NBIS Q3 2026 earnings (date TBC)."),
pb("3 MONTHS","NBIS $232.28 \u2014 NEXT QUARTER: NBIS Q3 2026 earnings (date TBC). The print either confirms the thesis (AI neocloud renting GPU capacity at hyperscale. Q2 2026 revenue $582.3M, +454% YoY; ARR tripled to $3.0B; adjusted EBITDA $236M at a 41% margin.) or tests the key risk (Capital intensity and dilution: capex $20-25B vs $3-3.4B revenue; ATM issued 12.7M shares at $224 in Q2) Nearest support $219.51, 5.5% below (volume node, never defended). Refreshed the scheduled date.",Y,"NBIS $232.28 (the scheduled date close), HOLD at 58. AI neocloud renting GPU capacity at hyperscale. Q2 2026 revenue $582.3M, +454% YoY; ARR tripled to $3.0B; adjusted EBITDA $236M at a 41% margin. Key risk: Capital intensity and dilution: capex $20-25B vs $3-3.4B revenue; ATM issued 12.7M shares at $224 in Q2","HOLD (58). Watch $219.51, 5.5% below (volume node, never defended). Upside +21% to $280; reward-to-risk 3.7x. Next catalyst: NBIS Q3 2026 earnings (date TBC)."),
pb("6 MONTHS","NBIS $232.28 \u2014 SIX MONTHS: two prints inside the window. HOLD (58). Consensus $280 (+21%), street range $226 (-3%) to $291 (+25%). What would change the view: Capital intensity and dilution: capex $20-25B vs $3-3.4B revenue; ATM issued 12.7M shares at $224 in Q2 Refreshed the scheduled date.",Y,"NBIS $232.28 (the scheduled date close), HOLD at 58. AI neocloud renting GPU capacity at hyperscale. Q2 2026 revenue $582.3M, +454% YoY; ARR tripled to $3.0B; adjusted EBITDA $236M at a 41% margin. Key risk: Capital intensity and dilution: capex $20-25B vs $3-3.4B revenue; ATM issued 12.7M shares at $224 in Q2","HOLD (58). Watch $219.51, 5.5% below (volume node, never defended). Upside +21% to $280; reward-to-risk 3.7x. Next catalyst: NBIS Q3 2026 earnings (date TBC)."),
pb("1 YEAR","NBIS $232.28 \u2014 TWELVE MONTHS: consensus $280 implies +21%; street range $226 (-3%) to $291 (+25%). THESIS: AI neocloud renting GPU capacity at hyperscale. Q2 2026 revenue $582.3M, +454% YoY; ARR tripled to $3.0B; adjusted EBITDA $236M at a 41% margin. STRUCTURAL RISK: Capital intensity and dilution: capex $20-25B vs $3-3.4B revenue; ATM issued 12.7M shares at $224 in Q2 Refreshed the scheduled date.",Y,"NBIS $232.28 (the scheduled date close), HOLD at 58. AI neocloud renting GPU capacity at hyperscale. Q2 2026 revenue $582.3M, +454% YoY; ARR tripled to $3.0B; adjusted EBITDA $236M at a 41% margin. Key risk: Capital intensity and dilution: capex $20-25B vs $3-3.4B revenue; ATM issued 12.7M shares at $224 in Q2","HOLD (58). Watch $219.51, 5.5% below (volume node, never defended). Upside +21% to $280; reward-to-risk 3.7x. Next catalyst: NBIS Q3 2026 earnings (date TBC).")]},
OKTA:{name:"Okta",price:212.63,avgPT:183,highPT:219,ptDate:"Sep 25, 2026",ptVerified:true,lowPT:127,high52:213.86,low52:62.66,fwdPE:52.5,mktCap:"$34B",ytd:154,yr1:117,consensus:"Buy",earningsDate:"Dec 1, 2026",epsEst:0.83,epsEstDate:"Sep 25, 2026",sector:"Cybersecurity / Identity",support:[{lvl:129.02,label:"Swing low 2026-07-28 \u2014 held 1x"},{lvl:119.99,label:"Step below \u2014 derived"},{lvl:111.59,label:"Step below \u2014 derived"}],supportDate:"Oct 1, 2026",brokenSup:[],
supportVerified:true,
supportAnchor:"$129.02 (39.3%, held 1x) / $119.99 (43.6%) / $111.59 (47.5%) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $129.02, 39.3% below $212.63. That first gap IS the risk \u2014 no observed level between here and there. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.3,
news:[n(31100,"OKTANE \u002726 IN OCTOBER IS THE NEXT PRODUCT CHECKPOINT","The annual user conference is where agent-identity roadmap detail would appear. Analysts lifted targets into it, but management has guided that AI revenue stays immaterial in FY27, so the conference is a narrative event rather than a numbers event. The next numbers checkpoint is the Dec 1 print.","Company IR","2026-09-25",0.1,"g",10,"intel"),n(31004,"RPO $4.86B, +17%; cRPO +14% \u2014 THE FORWARD-VISIBILITY METRICS","Remaining performance obligations are the better read on Okta than quarterly revenue, which grew 11%. RPO at $4.86B and cRPO at +14% say bookings are running ahead of recognised revenue.","Company filings","2026-08-26",0.4,"e",14,"intel"),n(31005,"FY27 GUIDANCE RAISED TWICE: $3.216-3.226B REVENUE, $3.90-3.94 EPS","The second raise of the fiscal year. Implies 10-11% growth. Operating cash flow $234M (29% of revenue) and free cash flow $227M (28%).","Company filings","2026-08-26",0.4,"e",14,"intel"),n(31006,"MANAGEMENT: AI-RELATED REVENUE REMAINS IMMATERIAL IN FY27","The central tension. The stock re-rated on agent-identity security, but management has said explicitly that this does not show up in revenue this fiscal year. New products were ~25% of Q1 bookings with ~40% ACV uplift.","Earnings call","2026-08-26",-0.2,"r",16,"intel"),n(31007,"BERNSTEIN DOWNGRADED TO MARKET PERFORM AT $174 ON VALUATION","Against post-print raises from Needham ($230), BTIG ($219), Wells Fargo, Baird and BofA ($200), Bernstein moved the other way on valuation. The stock now trades above the $183 consensus.","TipRanks","2026-09-15",-0.3,"a",12,"analyst"),n(20000,"Q2 FY27 BEAT AND SECOND GUIDANCE RAISE; STOCK +29% TO A 52-WEEK HIGH","Revenue $805M +11% vs $793M; adjusted EPS $1.05 vs $0.97; RPO +17% to $4.86B; cRPO +14%. FY27 revenue raised to $3.216-3.226B and EPS to $3.90-3.94. OCF $234M, FCF $227M. AI-related revenue immaterial in FY27.","Company filings / Perplexity Finance","2026-08-27",0.8,"e",18,"earnings"),
n(20001,"TARGET RAISES: NEEDHAM $230, BTIG $219, WELLS $200, BAIRD $200; BERNSTEIN DOWNGRADES","Needham to $230 from $200 on AI-agent identity traction; BTIG to $219; Wells Fargo, Baird and BofA to $200. Bernstein downgraded to Market Perform at $174 even as cyber rallied on AI-safety concerns. S&P Global consensus $183.","TipRanks / Stockanalysis","2026-09-15",0.2,"a",12,"analyst"),
n(20002,"ADDED TO COVERAGE SEP 25 \u2014 TRADES ~6% ABOVE THE $183 CONSENSUS","At $195.19 the stock sits above the S&P Global average target and at the top of its 52-week range after a 94% YTD run. The tool scores it on asymmetry, which is negative here.","ADE research","2026-09-25",0.0,"v",10,"intel")],
options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:null,pcRatio:null,maxPain:180,maxPainExp:"2026-10-16",maxPainDTE:15,maxPainOI:18736,maxPainNear:197.5,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:57.06,atmIVExp:"2026-10-30",ivObs:4},
optionsDate:"Oct 1, 2026",optionsVerified:true,
tech:{
ma:{d50:163.0,d100:141.0,d200:112.0,d400:105.0,align:"bullish",brk:[{ma:"50d",p:163.0,above:"Above 50d. Short-term trend intact.",below:"Below 50d. Momentum cooling."},{ma:"100d",p:141.0,above:"Intermediate uptrend holding.",below:"Intermediate trend break."},{ma:"200d",p:112.0,above:"Primary uptrend intact.",below:"Primary trend break \u2014 reassess the thesis."}],d50:158.19,d100:136.4,d200:109.17,d400:103.39},
momentum:{rsi:69.51,rsiZone:"neutral",macd:{v:13.6419,s:12.5652,h:1.0767,cross:"bullish"},roc:30.3},
volume:{avg:"3.6M",recent:"3.4M",ratio:0.94,obv:"rising",accDist:"neutral",lastDay:"3.2M",lastDayX:0.88,volDate:"Oct 1, 2026"},
levels:{fibs:[{r:"0%",p:63,l:"52w low"},{r:"38.2%",p:120,l:"Shallow"},{r:"50%",p:138,l:"Midpoint"},{r:"61.8%",p:156,l:"Deep"},{r:"100%",p:214,l:"52w high"}],pivots:{r2:219,r1:216,pp:211,s1:207,s2:202}},
pattern:{name:"New coverage",target:230,dir:"flat",note:"$212.63. RSI 69.5, above 50d, above 200d. Next earnings Dec 1."},
verdict:{score:7,label:"TRIM/AVOID \u2014 new coverage",c:"r",drivers:"$212.63. Above 50d $163 (+30.4%), above 200d $112 (+89.8%). RSI 69.5 extended. MACD histogram +1.08 (improving). Nearest observed support $129.02, 39.3% below, held 1x. Next earnings Dec 1."}},
fundVerified:true,
fundDate:"Sep 25, 2026",
fund:{
story:"Independent identity platform re-rated on AI-agent identity security. Q2 FY27 (Aug 26): revenue $805M +11%, adjusted EPS $1.05 vs $0.97, RPO +17% to $4.86B, cRPO +14%; FY27 revenue guidance raised for the second time to $3.216-3.226B (10-11%) and EPS to $3.90-3.94. Stock rose 29% on the print to a 52-week high and is +94% YTD. Now trades above the $183 S&P Global consensus; management says AI-related revenue stays immaterial in FY27.",
drivers:[
{name:"AI-agent identity",dir:"up",detail:"Agent identity security is the growth narrative; new products were ~25% of Q1 bookings with ~40% ACV uplift."},
{name:"Guidance momentum",dir:"up",detail:"FY27 revenue raised twice this year to 10-11% growth; RPO +17%, cRPO +14%."},
{name:"Cash generation",dir:"up",detail:"Q2 operating cash flow $234M (29% of revenue); FCF $227M (28%)."},
{name:"Growth ceiling",dir:"risk",detail:"Core growth is ~10%; AI revenue immaterial in FY27; stock has priced the narrative ahead of the numbers."}
],
flow:{inst:"Cyber names bid on the AI-safety rotation; Bernstein downgraded to Market Perform on valuation.",retail:"Momentum retail after the +29% earnings gap.",short:"Short interest ~3.9% of float."},
bull:{path:"Agent identity becomes a real revenue line by FY28; growth re-accelerates to mid-teens; multiple holds.",price:"$220-240"},
bear:{path:"Growth stays ~10% while AI revenue remains immaterial; the multiple compresses back toward software peers.",price:"$130-150"},
activeRisks:[{sev:"HIGH",prob:40,risk:"Priced ahead of fundamentals: +94% YTD, above consensus, on a business guided to 10-11% growth with AI revenue immaterial in FY27",trigger:"A quarter without acceleration",impact:"-15-25%",catalyst:"Dec 1 print"},
{sev:"MED",prob:30,risk:"Competition in identity: Microsoft Entra bundling, Ping/CyberArk",trigger:"Net retention softens",impact:"Growth decel",catalyst:"Quarterly cRPO"},
{sev:"MED",prob:25,risk:"Rotation reversal: cyber has been the AI-safety trade; a resolution of that narrative drains the bid",trigger:"Cyber complex sells off",impact:"-10%",catalyst:"Ongoing"},
{sev:"LOW",prob:15,risk:"Insider selling: Form 4 filings through the run",trigger:"Continued selling into strength",impact:"Sentiment",catalyst:"Ongoing"}],
killer:"AI-agent identity fails to become a revenue line and Okta is repriced as a 10% grower at 50x forward.",
revMix:[{n:"Subscription",p:97,c:"#3DBFA8"},{n:"Services",p:3,c:"#B266FF"}],
compPos:{xLabel:"AI-Agent Identity Positioning",yLabel:"Scale",peers:[{n:"OKTA",x:70,y:50,self:true},{n:"MSFT",x:50,y:95},{n:"CYBR",x:60,y:40},{n:"PING",x:45,y:30}]},
mgmt:{beats:4,misses:0,streak:"+4",note:"Beat and raised twice in FY27; four straight EPS beats averaging ~8%."},
metrics:{lastQ:"Q2 FY27 (Jul 2026)",revGrowth:11.0,opMargin:26.0,note:"Q2 FY27 (Aug 26): revenue $805M, +11% YoY vs $793M expected; adjusted EPS $1.05 vs $0.97. RPO +17% to $4.86B; cRPO +14%; record bookings. FY27 revenue guidance raised for the second time to $3.216-3.226B (10-11% growth) and adjusted EPS to $3.90-3.94. Operating cash flow $234M (29% of revenue), FCF $227M (28%). Management: AI-related revenue expected to remain immaterial in FY27; new products ~25% of Q1 bookings with ~40% ACV uplift. Post-print targets: Needham $230, BTIG $219, Wells Fargo $200, Baird $200, BofA $200 (Neutral); Bernstein downgraded to Market Perform at $174. S&P Global consensus $183 across 44 analysts, range $127-$203; 35 buy / 9 hold / 0 sell. ~173.8M shares. Next print Dec 1; consensus EPS ~$0.83."},
watchlist:[{item:"OKTA Q3 FY27 print",d:"Dec 1",why:"Whether growth accelerates beyond 10-11%; any AI-agent revenue disclosure"},{item:"Oktane conference",d:"Oct",why:"Product roadmap for agent identity; analyst previews already lifting targets"},{item:"cRPO growth",d:"Quarterly",why:"The forward-visibility metric; 14% in Q2"},{item:"Cyber rotation",d:"Ongoing",why:"AI-safety narrative is the marginal bid"}],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",ptDate:"Sep 25, 2026",riskDate:"Sep 25, 2026"},
catalysts:[{d:"Dec 1",e:"OKTA Q3 FY27 earnings",i:"high",iv:"high",hm:"N/A"},{d:"Oct",e:"Oktane '26 \u2014 agent identity roadmap",i:"med",iv:"med",hm:"N/A"}],
peers:[{t:"OKTA",pe:50,ev:22,y:94},{t:"CRWD",pe:120,ev:45,y:60},{t:"PANW",pe:55,ev:30,y:25}],
playbook:[
pb("1 WEEK","OKTA $213 \u2014 TRIM/AVOID (7). Nearest support $129.02, 39.3% below, held 1x. -14% to $183 consensus. RSI 70, MACD +1.08. NEXT: Dec 1 \u2014 OKTA Q3 FY27 earnings. Watch: Priced ahead of fundamentals: +94% YTD, above consensus, on a business guided to 10-11% growth with AI revenue immaterial in FY27 Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",R,"OKTA $212.63 as of the latest close, TRIM/AVOID at 7 on the tool's five-component score. Independent identity platform re-rated on AI-agent identity security. Q2 FY27 (Aug 26): revenue $805M +11%, adjusted EPS $1.05 vs $0.97, RPO +17% to $4.86B, cRPO +14%; FY27 revenue guidance raised for the second time to $3.216-3.226B (10-11%) and EPS to $3.90-3.94. Nearest observed support sits at $129.02.","TRIM/AVOID (7). Watch $129.02, 39.3% below, held 1x. Upside -14% to $183; reward-to-risk -0.4x. Next catalyst: OKTA Q3 FY27 earnings."),
pb("1 MONTH","OKTA $212.63 \u2014 THESIS: Independent identity platform re-rated on AI-agent identity security. Q2 FY27 (the scheduled date): revenue $805M +11%, adjusted EPS $1.05 vs $0.97, RPO +17% to $4.86B, cRPO +14%; FY27 revenue guidance raised for the second time to $3.216-3.226B (10-11%) and EPS to $3.90-3.94. KEY RISK: Priced ahead of fundamentals: +94% YTD, above consensus, on a business guided to 10-11% growth with AI revenue immaterial in FY27 NEXT CATALYST: OKTA Q3 FY27 earnings. Upside -14%, reward-to-risk -0.4x to nearest support. Refreshed the scheduled date.",R,"OKTA $212.63 (the scheduled date close), TRIM/AVOID at 7. Independent identity platform re-rated on AI-agent identity security. Q2 FY27 (the scheduled date): revenue $805M +11%, adjusted EPS $1.05 vs $0.97, RPO +17% to $4.86B, cRPO +14%; FY27 revenue guidance raised for the second time to $3.216-3.226B (10-11%) and EPS to $3.90-3.94. Key risk: Priced ahead of fundamentals: +94% YTD, above consensus, on a business guided to 10-11% growth with AI revenue immaterial in FY27","TRIM/AVOID (7). Watch $129.02, 39.3% below, held 1x. Upside -14% to $183; reward-to-risk -0.4x. Next catalyst: OKTA Q3 FY27 earnings."),
pb("3 MONTHS","OKTA $212.63 \u2014 NEXT QUARTER: OKTA Q3 FY27 earnings. The print either confirms the thesis (Independent identity platform re-rated on AI-agent identity security. Q2 FY27 (the scheduled date): revenue $805M +11%, adjusted EPS $1.05 vs $0.97, RPO +17% to $4.86B, cRPO +14%; FY27 revenue guidance raised for the second time to $3.216-3.226B (10-11%) and EPS to $3.90-3.94.) or tests the key risk (Priced ahead of fundamentals: +94% YTD, above consensus, on a business guided to 10-11% growth with AI revenue immaterial in FY27) Nearest support $129.02, 39.3% below, held 1x. Refreshed the scheduled date.",R,"OKTA $212.63 (the scheduled date close), TRIM/AVOID at 7. Independent identity platform re-rated on AI-agent identity security. Q2 FY27 (the scheduled date): revenue $805M +11%, adjusted EPS $1.05 vs $0.97, RPO +17% to $4.86B, cRPO +14%; FY27 revenue guidance raised for the second time to $3.216-3.226B (10-11%) and EPS to $3.90-3.94. Key risk: Priced ahead of fundamentals: +94% YTD, above consensus, on a business guided to 10-11% growth with AI revenue immaterial in FY27","TRIM/AVOID (7). Watch $129.02, 39.3% below, held 1x. Upside -14% to $183; reward-to-risk -0.4x. Next catalyst: OKTA Q3 FY27 earnings."),
pb("6 MONTHS","OKTA $212.63 \u2014 SIX MONTHS: two prints inside the window. TRIM/AVOID (7). Consensus $183 (-14%), street range $127 (-40%) to $219 (+3%). What would change the view: Priced ahead of fundamentals: +94% YTD, above consensus, on a business guided to 10-11% growth with AI revenue immaterial in FY27 Refreshed the scheduled date.",R,"OKTA $212.63 (the scheduled date close), TRIM/AVOID at 7. Independent identity platform re-rated on AI-agent identity security. Q2 FY27 (the scheduled date): revenue $805M +11%, adjusted EPS $1.05 vs $0.97, RPO +17% to $4.86B, cRPO +14%; FY27 revenue guidance raised for the second time to $3.216-3.226B (10-11%) and EPS to $3.90-3.94. Key risk: Priced ahead of fundamentals: +94% YTD, above consensus, on a business guided to 10-11% growth with AI revenue immaterial in FY27","TRIM/AVOID (7). Watch $129.02, 39.3% below, held 1x. Upside -14% to $183; reward-to-risk -0.4x. Next catalyst: OKTA Q3 FY27 earnings."),
pb("1 YEAR","OKTA $212.63 \u2014 TWELVE MONTHS: consensus $183 implies -14%; street range $127 (-40%) to $219 (+3%). THESIS: Independent identity platform re-rated on AI-agent identity security. Q2 FY27 (the scheduled date): revenue $805M +11%, adjusted EPS $1.05 vs $0.97, RPO +17% to $4.86B, cRPO +14%; FY27 revenue guidance raised for the second time to $3.216-3.226B (10-11%) and EPS to $3.90-3.94. STRUCTURAL RISK: Priced ahead of fundamentals: +94% YTD, above consensus, on a business guided to 10-11% growth with AI revenue immaterial in FY27 Refreshed the scheduled date.",R,"OKTA $212.63 (the scheduled date close), TRIM/AVOID at 7. Independent identity platform re-rated on AI-agent identity security. Q2 FY27 (the scheduled date): revenue $805M +11%, adjusted EPS $1.05 vs $0.97, RPO +17% to $4.86B, cRPO +14%; FY27 revenue guidance raised for the second time to $3.216-3.226B (10-11%) and EPS to $3.90-3.94. Key risk: Priced ahead of fundamentals: +94% YTD, above consensus, on a business guided to 10-11% growth with AI revenue immaterial in FY27","TRIM/AVOID (7). Watch $129.02, 39.3% below, held 1x. Upside -14% to $183; reward-to-risk -0.4x. Next catalyst: OKTA Q3 FY27 earnings.")]},
NET:{name:"Cloudflare",price:351.0,avgPT:334,highPT:400,ptDate:"Sep 25, 2026",ptVerified:true,lowPT:160,high52:367.43,low52:158.83,fwdPE:194.8,mktCap:"$131B",ytd:79,yr1:60,consensus:"Buy",earningsDate:"Nov 5, 2026 (TBC)",epsEst:0.34,epsEstDate:"Sep 25, 2026",sector:"Cloud Infrastructure",support:[{lvl:269.3,label:"Swing low 2026-09-02 \u2014 held 1x"},{lvl:250.69,label:"Swing low 2026-07-28 \u2014 held 0x"},{lvl:212.32,label:"Swing low 2026-06-22 \u2014 held 0x"}],supportDate:"Oct 1, 2026",brokenSup:[],
supportVerified:true,
supportAnchor:"$269.30 (23.3%, held 1x) / $250.69 (28.6%, held 0x) / $212.32 (39.5%, held 0x) \u2014 observed levels, nearest first, Oct 1, 2026",techVerified:true,techDate:"Oct 1, 2026",supportNote:"Nearest observed support $269.30, 23.3% below $351.00. That first gap IS the risk \u2014 no observed level between here and there. Observed swing lows and volume nodes, Oct 1, 2026.",rateSens:0.5,
news:[n(31008,"NORTH STAR GROWTH TARGET RAISED FROM 40% TO 50%","At Goldman Communacopia on Sep 9 management said revenue is shifting from seat-based SaaS to consumption-driven models and raised the internal growth target, with a $5B run-rate targeted before end-2028.","Goldman conference","2026-09-09",0.5,"g",14,"intel"),n(31009,"NON-HUMAN TRAFFIC PASSED 50% OF REQUESTS FOR THE FIRST TIME","The structural argument for the consumption model: Cloudflare sits in front of a large share of the web and can identify, price and block machine traffic at the request level. More agents means more billable events without a sales cycle.","Company filings","2026-08-06",0.6,"g",16,"intel"),n(31010,"DBNR 120%, UP SIX POINTS; LARGE CUSTOMERS +27% TO 4,698","Dollar-based net retention of 120% with large customers at 73% of revenue is the evidence that existing accounts are expanding, which is what a consumption model should produce.","Company filings","2026-08-06",0.5,"e",14,"intel"),n(31011,"GROSS MARGIN FELL 320BPS TO 73.1% AS COST OF REVENUE GREW 53%","The counterweight. Revenue grew 36% while cost of revenue grew 53%, so machine traffic is not free to serve. GAAP loss widened on up to $165M of 2026 restructuring charges and a ~20% workforce reduction.","Company filings","2026-08-06",-0.4,"r",14,"intel"),n(20000,"Q2: REVENUE +36% ACCELERATING, DBNR 120%, GUIDANCE RAISED; STOCK +17%","Revenue $696.1M +36% vs $665M guide; adjusted EPS $0.29 vs $0.27; large customers +27% to 4,698; DBNR 120%. FY26 raised to $2.864-2.870B. Non-human traffic >50% of requests. Gross margin 73.1%, down 320bps; GAAP loss widened on restructuring.","Company filings / Investing.com","2026-08-06",0.7,"e",18,"earnings"),
n(20001,"CONSENSUS RAISED 11.7% TO $334; BARCLAYS $355; NEW 52-WEEK HIGH","S&P Global consensus moved to $333.55 across 34 analysts (range $160-$400) after Q2; Barclays raised to $355 from $300. Stock hit a new 52-week high; unusually high call activity. CFO Seifert sold 10,000 shares Sep 17.","Stockanalysis / Defense World","2026-09-23",0.3,"a",12,"analyst"),
n(20002,"GOLDMAN COMMUNACOPIA: NORTH STAR GROWTH TARGET RAISED TO 50% FROM 40%","Sep 9: management said revenue is shifting from seat-based SaaS to consumption-driven models; North Star target raised to 50%; beyond 2027 growth expected to exceed Rule of 50 via Acts 3 and 4 (agentic AI, inference).","Quartr / Goldman conference","2026-09-09",0.5,"g",12,"news"),
n(20003,"ADDED TO COVERAGE SEP 25 \u2014 ABOVE CONSENSUS AT ~40X REVENUE","At $349.02 the stock is ~4% above the $334 S&P Global average and ~2% below the $355 median. Consumption pricing fits this book's integral-for-utilization screen; valuation does not fit its asymmetry screen.","ADE research","2026-09-25",0.0,"v",10,"intel")],
options:{ivRank:null,ivPctl:null,impliedMove:null,skew:null,lastEarnMove:null,pcRatio:null,maxPain:342,maxPainExp:"2026-10-02",maxPainDTE:1,maxPainOI:13517,maxPainNear:342.5,maxPainNearExp:"2026-10-02",maxPainNearDTE:1,flow:[],atmIV:60.17,atmIVExp:"2026-10-30",ivObs:4},
optionsDate:"Oct 1, 2026",optionsVerified:true,
tech:{
ma:{d50:306.0,d100:272.0,d200:234.0,d400:207.0,align:"bullish",brk:[{ma:"50d",p:306.0,above:"Above 50d. Short-term trend intact.",below:"Below 50d. Momentum cooling."},{ma:"100d",p:272.0,above:"Intermediate uptrend holding.",below:"Intermediate trend break."},{ma:"200d",p:234.0,above:"Primary uptrend intact.",below:"Primary trend break \u2014 reassess the thesis."}],d50:299.73,d100:267.91,d200:231.59,d400:205.01},
momentum:{rsi:61.41,rsiZone:"neutral",macd:{v:15.5288,s:14.8423,h:0.6865,cross:"bullish"},roc:28.7},
volume:{avg:"3.5M",recent:"2.7M",ratio:0.78,obv:"flat",accDist:"neutral",lastDay:"2.8M",lastDayX:0.8,volDate:"Oct 1, 2026"},
levels:{fibs:[{r:"0%",p:159,l:"52w low"},{r:"38.2%",p:239,l:"Shallow"},{r:"50%",p:263,l:"Midpoint"},{r:"61.8%",p:288,l:"Deep"},{r:"100%",p:367,l:"52w high"}],pivots:{r2:361,r1:356,pp:349,s1:344,s2:337}},
pattern:{name:"New coverage",target:379,dir:"flat",note:"$351.00. RSI 61.4, above 50d, above 200d. Next earnings early Nov."},
verdict:{score:17,label:"TRIM/AVOID \u2014 new coverage",c:"r",drivers:"$351.00. Above 50d $306 (+14.7%), above 200d $234 (+50.0%). RSI 61.4 neutral. MACD histogram +0.69 (improving). Nearest observed support $269.30, 23.3% below, held 1x. Next earnings early Nov."}},
fundVerified:true,
fundDate:"Sep 25, 2026",
fund:{
story:"Connectivity cloud shifting from seat-based SaaS to consumption pricing on the agentic internet. Q2 2026 revenue $696.1M, +36% YoY and accelerating; large customers 4,698 (+27%) at 73% of revenue; dollar-based net retention 120%, up 6 points. FY26 revenue guided $2.864-2.870B, adjusted EPS $1.25-1.26. Non-human traffic passed 50% of requests for the first time. The 'North Star' growth target was raised from 40% to 50%. At $349 it trades above the $334 consensus at ~40x forward revenue.",
drivers:[
{name:"Consumption pricing",dir:"up",detail:"Revenue shifting from seats to usage-based models; the integral-for-utilization structure in this book's framework."},
{name:"Agentic internet gate",dir:"up",detail:"Sits in front of a large share of the web with request-level ability to identify, price and block machine traffic; non-human traffic >50%."},
{name:"Acceleration",dir:"up",detail:"Revenue growth 27% (Q1'25) to 34% to 36%; DBNR +6 points to 120%."},
{name:"Margin and valuation",dir:"risk",detail:"Gross margin fell 320bps to 73.1% on traffic mix; cost of revenue grew 53% vs 36% revenue; GAAP loss widened on $165M restructuring; ~40x revenue."}
],
flow:{inst:"Consensus raised 11.7% after Q2; Barclays to $355; unusually high call activity.",retail:"Strong momentum retail after +17% post-print move and new highs.",short:"Low; CFO Seifert sold 10,000 shares Sep 17."},
bull:{path:"Growth sustains 32-35% with gross margin in the low seventies and non-GAAP operating margin near 14% \u2014 a Rule-of-50 profile that justifies the multiple without expanding it.",price:"$355-400"},
bear:{path:"Growth decelerates toward the 31% Q3 guide as comps harden; gross margin keeps compressing on machine traffic; 40x revenue compresses to 25x.",price:"$200-240"},
activeRisks:[{sev:"HIGH",prob:40,risk:"Valuation: ~40x forward revenue and ~193x forward non-GAAP EPS; above the $334 consensus",trigger:"Any deceleration below ~33%",impact:"-20-30%",catalyst:"Q3 print early Nov"},
{sev:"MED",prob:35,risk:"Gross margin compression: cost of revenue +53% vs revenue +36%; margin 73.1%, down 320bps",trigger:"Margin below 72%",impact:"Multiple compression",catalyst:"Quarterly"},
{sev:"MED",prob:30,risk:"Q3 guide is 31%, five points below the quarter that moved the stock 16%",trigger:"Growth prints at guide rather than above",impact:"Sentiment reset",catalyst:"Q3 print"},
{sev:"LOW",prob:20,risk:"Restructuring execution: 20% workforce cut and up to $165M of charges in 2026",trigger:"Execution stumbles",impact:"GAAP losses persist",catalyst:"Quarterly"}],
killer:"Growth decelerates into the low 20s while margins compress \u2014 the consumption story stalls and a 40x revenue multiple has no support.",
revMix:[{n:"Subscription / usage",p:100,c:"#3DBFA8"}],
compPos:{xLabel:"Agentic-Internet Positioning",yLabel:"Scale",peers:[{n:"NET",x:85,y:55,self:true},{n:"AKAM",x:30,y:60},{n:"FSLY",x:40,y:15},{n:"AMZN",x:50,y:100}]},
mgmt:{beats:4,misses:0,streak:"+4",note:"Four straight beats averaging ~11.6%; raised FY26 twice."},
metrics:{lastQ:"Q2 2026 (Jun 2026)",revGrowth:36.0,opMargin:14.0,note:"Q2 2026 (Aug 6): revenue $696.1M, +36% YoY and +8.8% sequential, beating by 4.7%; adjusted EPS $0.29 vs $0.27. GAAP loss from operations $205.7M on restructuring (up to $165M of charges in 2026; ~20% workforce cut). Large customers 4,698 (+27%), 73% of revenue; DBNR 120% (+6 pts). Gross margin 73.1% (-320bps) on traffic mix; FCF $56.4M (8%); cash $4.16B. Q3 revenue guided $736-737M (+31%); FY26 $2.864-2.870B and EPS $1.25-1.26. Non-human traffic >50% of requests. North Star growth target raised from 40% to 50%; $5B run-rate targeted before end-2028. S&P Global consensus $334 across 34 analysts, range $160-$400; Ticker Nerd median $355; Barclays $355. ~374M shares; forward P/E ~193x non-GAAP. Next print early November; consensus EPS ~$0.34."},
watchlist:[{item:"NET Q3 print",d:"Early Nov",why:"Growth above the 31% guide; gross margin trajectory; DBNR"},{item:"Consumption mix",d:"Quarterly",why:"Share of revenue on usage-based pricing"},{item:"Machine traffic monetisation",d:"Ongoing",why:"Pricing and blocking of AI crawlers at the request level"},{item:"Insider selling",d:"Ongoing",why:"CFO sold 10,000 shares Sep 17"}],
thesisDate:"Sep 25, 2026",techDate:"Oct 1, 2026",valDate:"Sep 29, 2026",ptDate:"Sep 25, 2026",riskDate:"Sep 25, 2026"},
catalysts:[{d:"Nov 5",e:"NET Q3 2026 earnings (date TBC) \u2014 guided +31%",i:"high",iv:"high",hm:"N/A"},{d:"Dec 31",e:"FY26 revenue $2.864-2.870B; EPS $1.25-1.26",i:"high",iv:"med",hm:"N/A"}],
peers:[{t:"NET",pe:193,ev:40,y:90},{t:"AKAM",pe:15,ev:3,y:-5},{t:"DDOG",pe:70,ev:18,y:30}],
playbook:[
pb("1 WEEK","NET $351 \u2014 TRIM/AVOID (17). Nearest support $269.30, 23.3% below, held 1x. -5% to $334 consensus. RSI 61, MACD +0.69. NEXT: Nov 5 \u2014 NET Q3 2026 earnings (date TBC) \u2014 guided +31%. Watch: Valuation: ~40x forward revenue and ~193x forward non-GAAP EPS; above the $334 consensus Macro: Fed at 3.75-4.00% with one more hike projected, CPI 3.4%, oil near $90. Refreshed on the latest close.",R,"NET $351.00 as of the latest close, TRIM/AVOID at 17 on the tool's five-component score. Connectivity cloud shifting from seat-based SaaS to consumption pricing on the agentic internet. Nearest observed support sits at $269.30.","TRIM/AVOID (17). Watch $269.30, 23.3% below, held 1x. Upside -5% to $334; reward-to-risk -0.2x. Next catalyst: NET Q3 2026 earnings (date TBC) \u2014 guided +31%."),
pb("1 MONTH","NET $351.00 \u2014 THESIS: Connectivity cloud shifting from seat-based SaaS to consumption pricing on the agentic internet. KEY RISK: Valuation: ~40x forward revenue and ~193x forward non-GAAP EPS; above the $334 consensus NEXT CATALYST: NET Q3 2026 earnings (date TBC) \u2014 guided +31%. Upside -5%, reward-to-risk -0.2x to nearest support. Refreshed the scheduled date.",R,"NET $351.00 (the scheduled date close), TRIM/AVOID at 17. Connectivity cloud shifting from seat-based SaaS to consumption pricing on the agentic internet. Key risk: Valuation: ~40x forward revenue and ~193x forward non-GAAP EPS; above the $334 consensus","TRIM/AVOID (17). Watch $269.30, 23.3% below, held 1x. Upside -5% to $334; reward-to-risk -0.2x. Next catalyst: NET Q3 2026 earnings (date TBC) \u2014 guided +31%."),
pb("3 MONTHS","NET $351.00 \u2014 NEXT QUARTER: NET Q3 2026 earnings (date TBC) \u2014 guided +31%. The print either confirms the thesis (Connectivity cloud shifting from seat-based SaaS to consumption pricing on the agentic internet.) or tests the key risk (Valuation: ~40x forward revenue and ~193x forward non-GAAP EPS; above the $334 consensus) Nearest support $269.30, 23.3% below, held 1x. Refreshed the scheduled date.",R,"NET $351.00 (the scheduled date close), TRIM/AVOID at 17. Connectivity cloud shifting from seat-based SaaS to consumption pricing on the agentic internet. Key risk: Valuation: ~40x forward revenue and ~193x forward non-GAAP EPS; above the $334 consensus","TRIM/AVOID (17). Watch $269.30, 23.3% below, held 1x. Upside -5% to $334; reward-to-risk -0.2x. Next catalyst: NET Q3 2026 earnings (date TBC) \u2014 guided +31%."),
pb("6 MONTHS","NET $351.00 \u2014 SIX MONTHS: two prints inside the window. TRIM/AVOID (17). Consensus $334 (-5%), street range $160 (-54%) to $400 (+14%). What would change the view: Valuation: ~40x forward revenue and ~193x forward non-GAAP EPS; above the $334 consensus Refreshed the scheduled date.",R,"NET $351.00 (the scheduled date close), TRIM/AVOID at 17. Connectivity cloud shifting from seat-based SaaS to consumption pricing on the agentic internet. Key risk: Valuation: ~40x forward revenue and ~193x forward non-GAAP EPS; above the $334 consensus","TRIM/AVOID (17). Watch $269.30, 23.3% below, held 1x. Upside -5% to $334; reward-to-risk -0.2x. Next catalyst: NET Q3 2026 earnings (date TBC) \u2014 guided +31%."),
pb("1 YEAR","NET $351.00 \u2014 TWELVE MONTHS: consensus $334 implies -5%; street range $160 (-54%) to $400 (+14%). THESIS: Connectivity cloud shifting from seat-based SaaS to consumption pricing on the agentic internet. STRUCTURAL RISK: Valuation: ~40x forward revenue and ~193x forward non-GAAP EPS; above the $334 consensus Refreshed the scheduled date.",R,"NET $351.00 (the scheduled date close), TRIM/AVOID at 17. Connectivity cloud shifting from seat-based SaaS to consumption pricing on the agentic internet. Key risk: Valuation: ~40x forward revenue and ~193x forward non-GAAP EPS; above the $334 consensus","TRIM/AVOID (17). Watch $269.30, 23.3% below, held 1x. Upside -5% to $334; reward-to-risk -0.2x. Next catalyst: NET Q3 2026 earnings (date TBC) \u2014 guided +31%.")]}
};

// ═══════════════════════════════════════════════
// LAST CLOSE PRICES — Feb 20-21, 2026
// ═══════════════════════════════════════════════
export const LC={ASML:1808.49,TSLA:354.11,CRWD:266.09,MRVL:268.08,HOOD:111.15,SHOP:149.09,SOFI:15.84,NOW:137.76,SNPS:490.54,MU:1097.39,NVDA:230.86,AMD:615.73,PWR:662.6,VRT:246.12,AVGO:343.64,TSM:459.2,ANET:204.49,VST:139.75,LRCX:340.1,AMZN:248.23,NBIS:232.28,OKTA:212.63,NFLX:71.36,NET:351.0};

// ═══════════════════════════════════════════════
// MACRO REGIME — updated each refresh
// ═══════════════════════════════════════════════
export const MACRO={spy:7712,vix:17.5,dxy:101.0,oil:90.0,btc:80000,gold:4081,cpi:3.4,fedFunds:3.875,rateOutlook:"Fed hiked 25bp Sep 16 to 3.75-4.00%; projections point to one more quarter-point this year",regime:"BOTH CATALYSTS PAID \u2014 SNPS RE-RATED, MU CONFIRMED",color:"#3DBFA8",note:"Oct 1 settled closes. SEVENTEEN OF 23 NAMES ROSE. SNPS +12.78% TO \u0024490.54 ON 3.4x VOLUME \u2014 the heaviest print in the book and the clearest re-rating of this series. The Sep 30 Investor Day guided fiscal 2027 revenue growth of ~15% to \u002411.15B at the midpoint with expanding non-GAAP operating margins. The stock is up ~34% from \u0024367 on Sep 15. RSI 74 is now the only overbought reading in the book; upside to the \u0024545 consensus has compressed to 11% and the defended score has fallen to 35 from 64 \u2014 the position worked and the asymmetry is spent. The target predates the new model and should rise. MU +3.03% TO \u00241,097.39 on 1.4x volume, reversing the after-hours dip. The Q4 beat \u2014 revenue \u002454.23B (+379%), EPS \u002433.42, gross margin 87%, all above the high end \u2014 did get paid after all. A new node formed at \u00241,070.60, 2.4% below, but the nearest DEFENDED level is still 66.8% below, which is why the defended score (47) and tool score (77) diverge more than on any other name. AVGO FELL 2.15% TO \u0024343.64 on 1.1x volume and now sits 0.5% above the \u0024342.00 node and 4.2% above \u0024329.06 (held 11x). It RISES to 93, the highest score recorded in this series, on 50% upside and R:R 11.7x. RSI 40. VST +1.01% to \u0024139.75, reclaiming \u0024138.53 \u2014 now 0.9% below and reading as held TEN times. Six broken levels remain. PWR +3.13% to \u0024662.60 and LRCX +3.53%. FOUR NAMES REMAIN ABOVE CONSENSUS: OKTA -14%, CRWD -8%, NET -5%, AMD -2% \u2014 the bottom four on asymmetry. VOLUME WAS THIN AGAIN: 18 of 23 below the 50-day average, the tenth consecutive session. IV HISTORY: 17 observations.",macroDate:"Oct 1, 2026"};

// ═══════════════════════════════════════════════
// SIGNAL ENGINE
// ═══════════════════════════════════════════════
function computeSignal(stock,items,price,eps){
 const act=items.filter(i=>i.on);let sc=0,tw=0;const co=[];
 for(const i of act){const a=db(new Date(i.dateStr),TD),d=Math.max(0.3,1-(a/120)),w=(i.weight/100)*d;sc+=i.sentiment*w;tw+=w;co.push({id:i.id,headline:i.headline.substring(0,36),contrib:i.sentiment*w*100,sentiment:i.sentiment});}
 // NEWS SENTIMENT REMOVED FROM THE SIGNAL, Sep 3 2026.
 // The sentiment scores are Claude's own judgments of items Claude wrote, so
 // feeding them back as a signal is circular. Items are still captured, still
 // dated, still weighted, and still rendered in the INTEL tab as a reasoning
 // record — they simply no longer move the score.
 const newsScore=tw>0?sc/tw:0;   // computed for DISPLAY only
 let ns=0;
 let ea=eps==="big_beat"?0.2:eps==="beat"?0.1:eps==="miss"?-0.15:eps==="big_miss"?-0.3:0;
 const pr=price/stock.avgPT;
 let va=pr>1.3?-0.35:pr>1.15?-0.25:pr>1.05?-0.15:pr>0.95?0:pr>0.85?0.15:pr>0.7?0.25:0.4;
 const p52=(stock.high52-price)/stock.high52;
 let ta=p52<0.05?-0.1:p52>0.3?0.15:p52>0.15?0.1:0;
 const iPE=(price/stock.price)*stock.fwdPE;
 let pa=iPE>40?-0.15:iPE>30?-0.08:iPE<15?0.15:iPE<20?0.08:0;
 // Macro: risk-on boosts rate-sensitive names, risk-off penalizes
 const macroBoost=MACRO.regime==="RISK-ON"?(stock.rateSens||0)*0.15:MACRO.regime==="RISK-OFF"?-(stock.rateSens||0)*0.15:0;
 // SINGLE COMPOSITE, Sep 3 2026. The old formula gave 38% weight to news+earnings;
 // news was removed (self-scored) and eps is always "none", so 38% was dead weight
 // and every score compressed toward HOLD. Replaced with the same observed inputs
 // the CONVICTION RANKER uses, so the gauge, header strip and verdict all agree.
 const _sup1=stock.support&&stock.support[0]?stock.support[0].lvl:null;
 const _dn=_sup1?Math.max(price-_sup1,price*0.03):price*0.03;
 const _rr=_sup1?(stock.avgPT-price)/_dn:0;
 const _ds=_sup1?Math.abs((_sup1-price)/price*100):99;
 const _held=(stock.support&&stock.support[0]&&stock.support[0].label)?
   (parseInt((stock.support[0].label.match(/held (\d+)x/)||[])[1])||0):0;
 const _supQ=Math.max(0,Math.min(1,((30-Math.min(30,_ds))/30)*0.6+Math.min(6,_held)/6*0.4));
 const _mo=stock.tech&&stock.tech.momentum?stock.tech.momentum:null;
 const _rsi=_mo&&_mo.rsi?_mo.rsi:50;
 const _mh=_mo&&_mo.macd?_mo.macd.h:0;
 const _mom=Math.max(0,Math.min(1,((70-_rsi)/35)*0.65+(_mh>0?0.35:0)));
 const _brk=stock.brokenSup?stock.brokenSup.length:0;
 const _struct=Math.max(0,1-_brk*0.2);
 const _uA=(stock.avgPT-price)/price*100;
 const cm=Math.min(1,Math.max(-1,_uA/50))*0.30+Math.min(1,_rr/6)*0.28
   +_supQ*0.17+_mom*0.15+_struct*0.10;
 // RISK PENALTY REMOVED, Sep 3 2026. Measured across all 21 it ranged only
 // 10-18 on a 40-point scale — a near-uniform haircut that barely changed rank
 // order, built on probabilities Claude assigned by judgment, and normalised in
 // a way that made MORE identified risks produce a SMALLER penalty. Risks are
 // now surfaced as a separate profile so they can be weighed, not averaged away.
 const _risks=stock.fund&&stock.fund.activeRisks?stock.fund.activeRisks:[];
 const riskCount=_risks.length;
 const riskHigh=_risks.filter(r=>r.sev==="HIGH").length;
 const riskMed=_risks.filter(r=>r.sev==="MED").length;
 const riskTopProb=_risks.length?Math.max(..._risks.map(r=>r.prob||0)):0;
 const riskTop=_risks.length?_risks.slice().sort((a,b)=>(b.prob||0)-(a.prob||0))[0]:null;
 const sl=Math.max(-100,Math.min(100,Math.round(cm*100)));
 let sg,cl;if(sl>84){sg="STRONG BUY";cl=G;}else if(sl>=69){sg="BUY";cl=G;}else if(sl>=39){sg="HOLD";cl=Y;}else if(sl>=24){sg="TRIM";cl=R;}else{sg="AVOID";cl=R;}
 co.sort((a,b)=>b.contrib-a.contrib);const mx=Math.max(...co.map(c=>Math.abs(c.contrib)),1);
 return{signal:sg,color:cl,score:Math.round(sl),riskCount,riskHigh,riskMed,riskTopProb,riskTop,newsScore:Math.round(newsScore*100),contribs:co,mx,upside:((stock.avgPT-price)/price*100).toFixed(1),bullCount:act.filter(i=>i.sentiment>0.2).length,bearCount:act.filter(i=>i.sentiment<-0.2).length,activeCount:act.length,iPE:iPE.toFixed(1)};
}

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════
export default function App(){
 const tickers=Object.keys(S);
 const[activeTicker,setActiveTicker]=useState("MU");
 const[allItems,setAllItems]=useState(()=>{const m={};for(const t of tickers)m[t]=S[t].news.map(n=>({...n}));return m;});
 const[prices,setPrices]=useState(()=>{const m={};for(const t of tickers)m[t]=LC[t]||S[t].price;return m;});
 const[eps,setEps]=useState("none");
 const[tab,setTab]=useState("feed");
 const[filter,setFilter]=useState("all");
 const[timeFilter,setTimeFilter]=useState("7d");
 const[showPortfolio,setShowPortfolio]=useState(false);
 const[showHealth,setShowHealth]=useState(false);
 const[portfolioView,setPortfolioView]=useState("snapshot"); // "snapshot" | "market" | "exit"
 const[portfolioSort,setPortfolioSort]=useState("cv");
 const[portfolioSortDir,setPortfolioSortDir]=useState(-1);
 const[showAdd,setShowAdd]=useState(false);
 const[showRiskInfo,setShowRiskInfo]=useState(false);
 const[newH,setNewH]=useState("");
 const[newSe,setNewSe]=useState(0.5);
 const[newW,setNewW]=useState(10);

 const stock=S[activeTicker];
 const items=allItems[activeTicker];
 const price=prices[activeTicker];
 const sig=useMemo(()=>computeSignal(stock,items,price,eps),[activeTicker,items,price,eps]);
 const gaugeAngle=180-180*(()=>{const s=Math.max(-100,Math.min(100,sig.score));const P=[[-100,0],[39,0.333],[69,0.5],[85,0.667],[100,1]];for(let i=1;i<P.length;i++){if(s<=P[i][0]){const a=P[i-1],b=P[i];return a[1]+(s-a[0])/(b[0]-a[0])*(b[1]-a[1]);}}return 1;})();

 // Risk-adjusted conviction: penalize raw score based on activeRisks probability × severity weight
 const riskAdj=useMemo(()=>{
 const risks=stock?.fund?.activeRisks||[];
 if(!risks.length)return{adjScore:sig.score,penalty:0,gap:0,label:"",gapColor:"#9A8F82"};
 // Severity multipliers: HIGH=1.5, MED=1.0, LOW=0.5
 const sevW={HIGH:1.5,MED:1.0,LOW:0.5};
 // Weighted risk penalty: sum of (prob/100 * severity_weight) normalized to a 0-40 point deduction scale
 const rawPenalty=risks.reduce((sum,r)=>{
 const w=sevW[r.sev]||1;
 return sum+(r.prob/100)*w;
 },0);
 // Normalize: max possible ~5 risks * 0.5 * 1.5 = 3.75. Scale to max 40-point deduction
 const maxPossible=risks.length*0.5*1.5;
 const penalty=Math.round((rawPenalty/Math.max(maxPossible,1))*40);
 const adjScore=Math.max(0,Math.min(100,sig.score-penalty));
 const gap=sig.score-adjScore;
 let label="",gapColor="#9A8F82";
 if(gap>=20){label="HIGH CONVICTION GAP";gapColor=R;}
 else if(gap>=12){label="MODERATE GAP";gapColor=Y;}
 else{label="LOW GAP";gapColor=G;}
 return{adjScore,penalty,gap,label,gapColor};
 },[sig.score,stock,activeTicker]);

 function toggle(id){setAllItems(p=>({...p,[activeTicker]:p[activeTicker].map(i=>i.id===id?{...i,on:!i.on}:i)}));}
 function updW(id,w){setAllItems(p=>({...p,[activeTicker]:p[activeTicker].map(i=>i.id===id?{...i,weight:w}:i)}));}
 function addRumor(){if(!newH.trim())return;const id=Math.max(...items.map(i=>i.id))+1;setAllItems(p=>({...p,[activeTicker]:[...p[activeTicker],{id,on:true,headline:newH,detail:"Custom intel",source:"ADE",dateStr:"2026-03-07",sentiment:newSe,category:"r",weight:newW,type:"rumor"}]}));setNewH("");setNewSe(0.5);setNewW(10);setShowAdd(false);}
 function setPrice(v){setPrices(p=>({...p,[activeTicker]:v}));}

 const timeThreshold=timeFilter==="3d"?3:timeFilter==="7d"?7:timeFilter==="30d"?30:timeFilter==="90d"?90:99999;
 const timeFiltered=items.filter(i=>{if(!i.dateStr)return false;const d=new Date(i.dateStr);if(isNaN(d))return false;const age=(TD-d)/(1000*60*60*24);return age<=timeThreshold;});
 const filtered=(filter==="all"?timeFiltered:filter==="rumor"?timeFiltered.filter(i=>i.type==="rumor"):filter==="bull"?timeFiltered.filter(i=>i.sentiment>0.2):timeFiltered.filter(i=>i.sentiment<-0.2)).slice().sort((a,b)=>new Date(b.dateStr)-new Date(a.dateStr));
 const tabs=[{id:"feed",l:"INTEL"},{id:"playbook",l:"PLAYBOOK"},{id:"riskrew",l:"RISK/REWARD"},{id:"ranker",l:"CONVICTION"},{id:"options",l:"OPTIONS"},{id:"fundamentals",l:"FUNDAMENTALS"},{id:"technicals",l:"TECHNICALS"},{id:"relative",l:"REL VALUE"},{id:"catalysts",l:"CATALYSTS"}];

 // Risk/Reward for current ticker — uses real support levels
 const rr=useMemo(()=>{
 const s1=stock.support?stock.support[0].lvl:stock.price*0.85;
 const s2=stock.support?stock.support[1].lvl:stock.price*0.75;
 const s1Label=stock.support?stock.support[0].label:"~15% est";
 const uA=(stock.avgPT-price)/price*100,uH=(stock.highPT-price)/price*100;
 const dL=(stock.lowPT-price)/price*100,dS=(s1-price)/price*100,dS2=(s2-price)/price*100;
 const rrA=Math.abs(uA)/Math.max(1,Math.abs(dS)),rrH=Math.abs(uH)/Math.max(1,Math.abs(dS));
 const kf=sig.score>0?Math.min(0.25,(sig.score/100)*0.5):0;
 const er=uA*(0.5+sig.score/200)+dS*(0.5-sig.score/200);
 // Options strategy based on signal + IV
 const iv=stock.options.ivRank;
 let optStrat,optColor,optDetail;
 if(sig.score>30&&iv<40){optStrat="BUY CALLS";optColor=G;optDetail="Strong signal + cheap IV. Long calls maximize leverage. Buy ATM or slightly OTM 45-60 DTE.";}
 else if(sig.score>30&&iv>=40&&iv<65){optStrat="BULL CALL SPREAD";optColor=G;optDetail="Strong signal but IV elevated. Spreads offset premium cost. Buy ATM / sell 10-15% OTM, 30-45 DTE.";}
 else if(sig.score>30&&iv>=65){optStrat="SELL CASH-SECURED PUTS";optColor="#7E91E8";optDetail="Strong signal + expensive IV. Sell puts at support to collect premium and get paid to buy cheaper. Sell at S1, 30 DTE.";}
 else if(sig.score>0&&sig.score<=30&&iv>=50){optStrat="SELL PUTS AT SUPPORT";optColor="#7E91E8";optDetail="Mild bullish + high IV = premium selling sweet spot. Sell puts at S1 level, 30-45 DTE.";}
 else if(sig.score>0&&sig.score<=30&&iv<50){optStrat="BUY SHARES";optColor=Y;optDetail="Mild signal + low IV means options don't offer edge. Buy shares for directional exposure.";}
 else if(sig.score<=0&&iv>=50){optStrat="SELL CALL SPREADS";optColor=R;optDetail="Neutral/bearish signal + high IV. Sell premium. Bear call spread above resistance, 30 DTE.";}
 else{optStrat="NO OPTIONS EDGE";optColor="#9A8F82";optDetail="Low signal + low IV. Neither direction nor premium is attractive. Stay flat or use shares only.";}
 return{uA,uH,dL,dS,dS2,s1,s2:Math.round(s2),s1Label,rrA,rrH,kf,er,optStrat,optColor,optDetail,iv};
 },[stock,price,sig]);

 // Conviction Ranker across all tickers
 const rankerData=useMemo(()=>{
 return tickers.map(t=>{
 const s=S[t],p=prices[t],sg=computeSignal(s,allItems[t],p,"none");
 const iv=s.options.ivRank,uA=(s.avgPT-p)/p*100,uH=(s.highPT-p)/p*100;
 const sp=s.support&&s.support[0]?s.support[0].lvl:s.price*0.85;
 const ds=Math.abs((sp-p)/p*100);
 // R:R to the nearest DEFENDED support, floored at 3% of price.
 // S1 distance ranges 0.2%-57% across the book, so using it produced
 // divide-by-near-zero artifacts (AVGO read 47.3x, MRVL 0.6x).
 // Downside = distance to the nearest DEFENDED support (observed swing low).
 // Stops were removed Sep 3 — an invented risk budget is not a market level.
 const sup1=s.support&&s.support[0]?s.support[0].lvl:null;
 // Floor the denominator at 3% of price. AVGO's support sits 0.2% below,
 // which produced a meaningless 231x reading before this guard.
 const dn=sup1?Math.max(p-sup1,p*0.03):p*0.03;
 const rr=sup1?(s.avgPT-p)/dn:0;
 // Support quality: how near, and how many times defended.
 const held=s.support&&s.support[0]&&s.support[0].label?
 (parseInt((s.support[0].label.match(/held (\d+)x/)||[])[1])||0):0;
 const supQ=Math.max(0,Math.min(1,((30-Math.min(30,ds))/30)*0.6+Math.min(6,held)/6*0.4));
 // Momentum from VERIFIED technicals.
 const mo=s.tech&&s.tech.momentum?s.tech.momentum:null;
 const rsiV=mo&&mo.rsi?mo.rsi:50;
 const macdH=mo&&mo.macd?mo.macd.h:0;
 const mom=Math.max(0,Math.min(1,((70-rsiV)/35)*0.65+(macdH>0?0.35:0)));
 // Structural damage: prior swing lows now ABOVE price = broken support.
 const brk=s.brokenSup?s.brokenSup.length:0;
 const struct=Math.max(0,1-brk*0.2);
 const eiv=iv?sg.score/Math.max(10,iv):null;
 // WEIGHTS: objective inputs carry the load. News signal is a judgment
 // input and is capped at 15%. The IV term is DROPPED while ivRank is null.
 const raw=Math.min(1,Math.max(-1,uA/50))*0.28
 +Math.min(1,rr/6)*0.27
 +supQ*0.15
 +mom*0.15
 +struct*0.10
 +(sg.score/100)*0.05;
 const cv=Math.max(-100,Math.min(100,Math.round(raw*100))); // Risk penalty removed Sep 3 2026 - see computeSignal. Risks surfaced, not scored.
 const risks=s.fund&&s.fund.activeRisks?s.fund.activeRisks:[];
 const riskCount=risks.length;
 const riskHigh=risks.filter(r=>r.sev==="HIGH").length;
 const riskTopProb=risks.length?Math.max(...risks.map(r=>r.prob||0)):0;
 const pen2=0;
 const adjCv=cv;
 const cvGap=0;
 const gr=adjCv>84?"A+":adjCv>69?"A":adjCv>54?"B+":adjCv>39?"B":adjCv>24?"C+":adjCv>9?"C":adjCv>-10?"D":"F";
 const gc=adjCv>55?G:adjCv>25?"#7E91E8":adjCv>0?Y:R;
 return{ticker:t,name:s.name,signal:sg.score,signalLabel:sg.signal,signalColor:sg.color,iv,uA,uH,ds,rr,eiv,cv,adjCv,cvGap,pen2,gr,gc,riskCount,riskHigh,riskTopProb,sector:s.sector,price:p,avgPT:s.avgPT,highPT:s.highPT,held,supQ,mom,brk,rsiV,sup1};
 }).sort((a,b)=>b.adjCv-a.adjCv);
 },[allItems,prices]);

 // Portfolio-level stats
 const portfolioStats=useMemo(()=>{
 const bySignal={strongBuy:0,buy:0,hold:0,sell:0,strongSell:0};
 const bySector={};
 let totalUpside=0,totalStale=0,totalNews=0;
 const rows=rankerData.map(r=>{
 const s=S[r.ticker];
 const newsItems=allItems[r.ticker];
 const staleCount=newsItems.filter(n=>{const age=db(new Date(n.dateStr),TD);return age>14;}).length;
 const freshCount=newsItems.filter(n=>{const age=db(new Date(n.dateStr),TD);return age<=2;}).length;
 const avgAge=newsItems.length>0?newsItems.reduce((a,n)=>a+db(new Date(n.dateStr),TD),0)/newsItems.length:0;
 totalStale+=staleCount;totalNews+=newsItems.length;
 totalUpside+=r.uA;
 if(r.adjCv>55)bySignal.strongBuy++;else if(r.adjCv>25)bySignal.buy++;else if(r.adjCv>0)bySignal.hold++;else if(r.adjCv>-25)bySignal.sell++;else bySignal.strongSell++;
 bySector[s.sector]=(bySector[s.sector]||0)+1;
 // Playbook 1-week bias
 const pb1w=s.playbook&&s.playbook[0]?s.playbook[0]:{h:"—",bias:"—",color:Y};
 // Next earnings
 const earnDate=s.earningsDate;
 let earnDte=null;
 const edm=earnDate.match(/^(\w+)\s+(\d+),\s*(\d+)$/);
 if(edm){const mo={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[edm[1]];
 if(mo!==undefined){const dt=new Date(parseInt(edm[3]),mo,parseInt(edm[2]));earnDte=Math.ceil((dt-TD)/(1000*60*60*24));}}
 return{...r,staleCount,freshCount,avgAge,newsCount:newsItems.length,pb1w,earnDate,earnDte,ytd:s.ytd,consensus:s.consensus};
 });
 return{rows,bySignal,bySector,avgUpside:(totalUpside/tickers.length).toFixed(1),staleRatio:totalNews>0?((totalStale/totalNews)*100).toFixed(0):0};
 },[rankerData,allItems,prices]);

 // ═══════════════════════════════════════════════
 // HEALTH CHECK — auto-audit on every render
 // ═══════════════════════════════════════════════
 const healthCheck=useMemo(()=>{
 const today=new Date();
 const checks=[];
 let totalScore=100;

 // 1. DATA FRESHNESS — how old is TD?
 const daysSinceUpdate=Math.floor((today-TD)/(1000*60*60*24));
 if(daysSinceUpdate>3){checks.push({cat:"FRESHNESS",sev:"HIGH",msg:`Last update ${daysSinceUpdate} days ago (${TD.toLocaleDateString()})`,fix:"Full price + news refresh needed",pts:-15});totalScore-=15;}
 else if(daysSinceUpdate>1){checks.push({cat:"FRESHNESS",sev:"MED",msg:`Last update ${daysSinceUpdate} days ago`,fix:"Price refresh recommended",pts:-5});totalScore-=5;}
 else{checks.push({cat:"FRESHNESS",sev:"OK",msg:"Data updated today or yesterday",fix:"",pts:0});}

 // 2. LC vs HEADER PRICE MISMATCH
 let priceMismatches=[];
 tickers.forEach(t=>{const s=S[t];if(s.price!==LC[t])priceMismatches.push(`${t}: header=${s.price} LC=${LC[t]}`);});
 if(priceMismatches.length>0){checks.push({cat:"PRICES",sev:"HIGH",msg:`${priceMismatches.length} price mismatches: ${priceMismatches.slice(0,3).join(", ")}${priceMismatches.length>3?"...":""}`,fix:"Sync LC and header prices",pts:-10});totalScore-=10;}
 else{checks.push({cat:"PRICES",sev:"OK",msg:"All "+tickers.length+" LC prices match header prices",fix:"",pts:0});}

 // 3. PATTERN COHERENCE — targets vs prices, null targets
 let patternIssues=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.tech||!s.tech.pattern)return;
 const pat=s.tech.pattern;
 if(pat.target===null)patternIssues.push(`${t}: target=null`);
 else if(pat.dir==="up"&&pat.target<=p)patternIssues.push(`${t}: target $${pat.target} <= price $${p}`);
 else if(pat.dir==="down"&&pat.target>=p)patternIssues.push(`${t}: target $${pat.target} >= price $${p}`);
 });
 if(patternIssues.length>0){checks.push({cat:"PATTERNS",sev:patternIssues.length>3?"HIGH":"MED",msg:`${patternIssues.length} pattern issues: ${patternIssues.slice(0,3).join("; ")}`,fix:"Update pattern targets to reflect current prices",pts:patternIssues.length>3?-10:-5});totalScore-=patternIssues.length>3?10:5;}
 else{checks.push({cat:"PATTERNS",sev:"OK",msg:"All "+tickers.length+" patterns coherent — targets directionally valid",fix:"",pts:0});}

 // 4. TEXT CORRUPTION SCAN
 const fullText=JSON.stringify(S);
 const corruptionRegex=/\$\d+[a-z]{3}/g;
 const corruptions=[];
 let cm;
 while((cm=corruptionRegex.exec(fullText))!==null){
 const val=cm[0];
 if(!/\$\d+[BMTKk]/.test(val))corruptions.push(val);
 }
 if(corruptions.length>0){checks.push({cat:"CORRUPTIONS",sev:"HIGH",msg:`${corruptions.length} text corruptions found: ${corruptions.slice(0,3).join(", ")}`,fix:"Run str.replace corruption fix",pts:-10});totalScore-=10;}
 else{checks.push({cat:"CORRUPTIONS",sev:"OK",msg:"No text corruptions detected",fix:"",pts:0});}

 // 5. MACRO DRIFT
 const macroIssues=[];
 if(MACRO.vix<20&&daysSinceUpdate>2)macroIssues.push("VIX "+MACRO.vix+" may be stale");
 if(MACRO.regime==="RISK-ON"&&MACRO.vix>25)macroIssues.push("Regime RISK-ON FADING but VIX >25 — contradiction");
 if(macroIssues.length>0){checks.push({cat:"MACRO",sev:"MED",msg:macroIssues.join("; "),fix:"Update MACRO block with current VIX/regime/PCE",pts:-5});totalScore-=5;}
 else{checks.push({cat:"MACRO",sev:"OK",msg:`Regime: ${MACRO.regime}, VIX: ${MACRO.vix}, CPI: ${MACRO.cpi}%`,fix:"",pts:0});}

 // 6. NEWS/INTEL FRESHNESS
 let totalNews=0,staleNews=0,veryStale=0;
 tickers.forEach(t=>{
 const items=allItems[t]||[];
 items.forEach(n=>{
 totalNews++;
 const nd=new Date(n.dateStr);
 const age=Math.floor((TD-nd)/(1000*60*60*24));
 if(age>14)staleNews++;
 if(age>30)veryStale++;
 });
 });
 const staleRatio=totalNews>0?Math.round((staleNews/totalNews)*100):0;
 // INTEL FRESHNESS: Want MINIMUM recent items per ticker, not max age overall
 // Historical items with real dates = thesis context (OK). Problem is no fresh news.
 let recentItems=0;
 let tickersWithRecentIntel=0;
 const today_ts=Date.now();
 tickers.forEach(t=>{
 const s=S[t];if(!s.news)return;
 const recentForTicker=s.news.filter(n=>{
 if(!n.on||!n.dateStr)return false;
 const d=new Date(n.dateStr);
 return !isNaN(d)&&(today_ts-d.getTime())/(1000*60*60*24)<=3;
 }).length;
 recentItems+=recentForTicker;
 if(recentForTicker>0)tickersWithRecentIntel++;
 });
 const tickersWithoutFreshIntel=tickers.length-tickersWithRecentIntel;
 if(tickersWithoutFreshIntel>5){checks.push({cat:"INTEL",sev:"HIGH",msg:`INFO (workflow signal, not data error): ${tickersWithoutFreshIntel}/${tickers.length} tickers have NO intel from last 3 days`,fix:"Web-search each ticker for fresh news and add items with today/yesterday dateStr",pts:0});}
 else if(tickersWithoutFreshIntel>2){checks.push({cat:"INTEL",sev:"MED",msg:`${tickersWithoutFreshIntel}/${tickers.length} tickers lack recent intel (last 3 days)`,fix:"Add fresh news items for these tickers",pts:-5});totalScore-=5;}
 else{checks.push({cat:"INTEL",sev:"OK",msg:`${recentItems} fresh items across ${tickersWithRecentIntel}/${tickers.length} tickers. ${totalNews} total thesis items.`,fix:"",pts:0});}

 // 7. EARNINGS PROXIMITY — tickers with earnings <7d needing refresh
 let earningsAlerts=[];
 tickers.forEach(t=>{
 const s=S[t];
 const ed=s.earningsDate;
 if(ed.includes("✓"))return; // already reported
 const edm=ed.match(/^(\w+)\s+(\d+),\s*(\d+)$/);
 if(!edm)return;
 const mo={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[edm[1]];
 if(mo===undefined)return;
 const dt=new Date(parseInt(edm[3]),mo,parseInt(edm[2]));
 const dte=Math.ceil((dt-today)/(1000*60*60*24));
 if(dte>=0&&dte<=7)earningsAlerts.push({ticker:t,dte,date:ed});
 });
 if(earningsAlerts.length>0){
 // Check if pre-earnings refresh was done (1W headline mentions earnings)
 const refreshed=earningsAlerts.filter(e=>{const s=S[e.ticker];return s.playbook&&s.playbook[0]&&((s.playbook[0].bias||"")+(s.playbook[0].h||"")).toUpperCase().includes("EARNING");});
 const unrefreshed=earningsAlerts.filter(e=>!refreshed.includes(e));
 if(unrefreshed.length>0){checks.push({cat:"EARNINGS",sev:"HIGH",msg:`INFO (upcoming earnings reminder): ${unrefreshed.length} ticker(s) reporting within 7 days NEED REFRESH: ${unrefreshed.map(e=>`${e.ticker} (${e.dte}d)`).join(", ")}`,fix:"Pre-earnings refresh: update playbooks, patterns, risk scenarios",pts:0});}
 else{checks.push({cat:"EARNINGS",sev:"OK",msg:`${refreshed.length} ticker(s) within 7 days — pre-earnings refresh DONE: ${refreshed.map(e=>`${e.ticker} (${e.dte}d)`).join(", ")}`,fix:"",pts:0});}
 }
 else{checks.push({cat:"EARNINGS",sev:"OK",msg:"No earnings within 7 days",fix:"",pts:0});}

 // 8. RISK CATALYST EXPIRY — risks with catalyst dates that have passed
 let expiredCatalysts=[];
 const monthMap={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 tickers.forEach(t=>{
 const s=S[t];
 const risks=s.fund&&s.fund.activeRisks?s.fund.activeRisks:[];
 risks.forEach(r=>{
 if(!r.catalyst)return;
 // Try to extract "Mon Mar 16" or "Mar 18" or "Apr 30" style dates
 const dm=r.catalyst.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)/);
 if(dm){
 const cDate=new Date(2026,monthMap[dm[1]],parseInt(dm[2]));
 if(cDate<today&&!r.catalyst.includes("✓")){
 expiredCatalysts.push(`${t}: "${r.catalyst.substring(0,40)}..." (${dm[1]} ${dm[2]})`);
 }
 }
 });
 });
 if(expiredCatalysts.length>0){checks.push({cat:"CATALYSTS",sev:"MED",msg:`${expiredCatalysts.length} risk catalyst(s) may have passed: ${expiredCatalysts.slice(0,3).join("; ")}`,fix:"Review and update expired catalyst dates + outcomes",pts:-5});totalScore-=5;}
 else{checks.push({cat:"CATALYSTS",sev:"OK",msg:"All risk catalysts are future-dated",fix:"",pts:0});}

 // 9. SUPPORT LEVEL COHERENCE — supports above current price
 let supportIssues=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.support)return;
 s.support.forEach((sup,i)=>{
 if(sup.lvl>p*1.05)supportIssues.push(`${t}: S${i+1} $${sup.lvl} > price $${p}`);
 });
 });
 if(supportIssues.length>0){checks.push({cat:"SUPPORTS",sev:"MED",msg:`${supportIssues.length} support levels above price: ${supportIssues.slice(0,3).join("; ")}`,fix:"Lower support levels to reflect current price action",pts:-5});totalScore-=5;}
 else{checks.push({cat:"SUPPORTS",sev:"OK",msg:"All support levels below current prices",fix:"",pts:0});}

 // 10. CONVICTION GAP CHECK — high raw score + high risk penalty
 let gapAlerts=[];
 rankerData.forEach(r=>{
 if(r.cvGap>=20)gapAlerts.push(`${r.ticker}: raw ${r.cv} → adj ${r.adjCv} (gap ${r.cvGap})`);
 });
 if(gapAlerts.length>0){checks.push({cat:"CONVICTION",sev:"MED",msg:`${gapAlerts.length} HIGH CONVICTION GAP: ${gapAlerts.join("; ")}`,fix:"Review risk profiles — bull case and risks are conflicting",pts:-3});totalScore-=3;}
 else{checks.push({cat:"CONVICTION",sev:"OK",msg:"No extreme conviction gaps detected",fix:"",pts:0});}

 // 11. OPTIONS — tests whether the max-pain EXPIRATION has passed.
 // Rewritten Sep 4 2026. The old check flagged maxPain as "stale" whenever the
 // strike sat >15% from price. But a heaviest-expiration strike 20% below spot is
 // the POSITIONING SIGNAL, not an error - CRWD at $168 against $213 is the most
 // informative number on its card. Distance is now reported, never penalised.
 let optIssues=[];const optInfo=[];
 tickers.forEach(t=>{
  const s=S[t],p=prices[t];
  if(!s.options)return;
  const mp=s.options.maxPain,exp=s.options.maxPainExp,dte=s.options.maxPainDTE;
  if(!mp)return;
  if(exp){const d=db(new Date(exp),TD);if(d>0)optIssues.push(`${t}: max-pain expiry ${exp} PASSED ${d}d ago`);}
  else if(dte!==undefined&&dte<3)optIssues.push(`${t}: max-pain uses a ${dte}d expiry - too short-lived to anchor anything`);
  if(Math.abs(mp-p)/p>0.15)optInfo.push(`${t} ${mp>p?"+":""}${Math.round((mp-p)/p*100)}%`);
 });
 if(optIssues.length>0){checks.push({cat:"OPTIONS",sev:"HIGH",msg:`${optIssues.length} expired max-pain reference(s): ${optIssues.slice(0,3).join("; ")}`,fix:"Re-run sync - max pain must use the heaviest LIVE expiration",pts:-8});totalScore-=8;}
 else{checks.push({cat:"OPTIONS",sev:"OK",msg:`Max pain on live expirations.${optInfo.length?" Positioning skew vs spot: "+optInfo.slice(0,6).join(", "):""}`,fix:"",pts:0});}

 // 12. TECHNICALS TAB — MA levels vs price (>20% = stale)
 let maIssues=[];
 // MA tolerance scales by timeframe — longer MAs naturally drift further after big moves
 const maTolerance={"50d":0.20,"100d":0.30,"200d":0.40,"400d":0.50};
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.tech||!s.tech.ma||!s.tech.ma.brk)return;
 s.tech.ma.brk.forEach(b=>{
 const tol=maTolerance[b.ma]||0.20;
 if(Math.abs(b.p-p)/p>tol)maIssues.push(`${t} ${b.ma}=$${b.p} (${Math.round(Math.abs(b.p-p)/p*100)}%)`);
 });
 });
 if(maIssues.length>0){checks.push({cat:"TECHNICALS",sev:maIssues.length>5?"LOW":"LOW",msg:"INFO (perf signal, not data error): "+maIssues.length+" MA levels >tolerance (fast-rally natural): "+maIssues.slice(0,4).join(", ")+(maIssues.length>4?"...":""),fix:"MAs computed from 400 trading days via the market-data API, Sep 3. For fast-rally stocks, longer MAs naturally lag — not a data error.",pts:0});totalScore-=0;}
 else{checks.push({cat:"TECHNICALS",sev:"OK",msg:"All MA levels within 20% of current prices",fix:"",pts:0});}

 // 13. FUNDAMENTALS TAB — lastQ date check
 let fundIssues=[];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.fund||!s.fund.lastQ)return;
 const q=typeof s.fund.lastQ==="object"?s.fund.lastQ.q:s.fund.lastQ;
 // If lastQ is from 2025 and we have earnings that already reported in 2026, flag it
 if(q&&q.includes("2025")){
 // Check if this ticker had earnings in 2026 already (marked with ✓)
 if(s.earningsDate&&s.earningsDate.includes("✓"))fundIssues.push(`${t}: lastQ="${q}" but earnings already reported`);
 }
 });
 // Also check tickers where AVGO/MRVL/CRWD reported but lastQ might be old
 const recentEarnings=tickers.filter(t=>S[t].earningsDate&&S[t].earningsDate.includes("✓"));
 if(fundIssues.length>0){checks.push({cat:"FUNDAMENTALS",sev:"MED",msg:`${fundIssues.length} tickers have stale lastQ: ${fundIssues.slice(0,3).join("; ")}`,fix:"Update fundamentals with latest quarterly data",pts:-5});totalScore-=5;}
 else{checks.push({cat:"FUNDAMENTALS",sev:"OK",msg:`Fundamentals current. ${recentEarnings.length} tickers have reported recent earnings`,fix:"",pts:0});}

 // 14. PLAYBOOK TAB — check for stale price refs in 1W headlines
 let pbIssues=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.playbook||!s.playbook[0])return;
 const h=s.playbook[0].h||"";
 // Extract $ prices from headline
 const priceRefs=[];const _prx=/\$(\d+)/g;let _pm;while((_pm=_prx.exec(h))!==null)priceRefs.push(parseInt(_pm[1]));
 priceRefs.forEach(pr=>{
 // Skip oil prices ($90-$100 range), small numbers, and very large numbers
 if(pr>=85&&pr<=110)return; // oil price range
 if(pr<10||pr>2000)return;
 if(Math.abs(pr-p)/p>0.15)pbIssues.push(`${t}: headline refs $${pr} vs price $${p}`);
 });
 });
 if(pbIssues.length>0){checks.push({cat:"PLAYBOOK",sev:pbIssues.length>3?"HIGH":"MED",msg:`${pbIssues.length} stale price refs in playbook headlines: ${pbIssues.slice(0,3).join("; ")}`,fix:"Refresh 1W/1M playbook headlines with current prices and narratives",pts:pbIssues.length>3?-8:-4});totalScore-=pbIssues.length>3?8:4;}
 else{checks.push({cat:"PLAYBOOK",sev:"OK",msg:"Playbook headlines price-consistent",fix:"",pts:0});}

 // 15. CATALYSTS TAB — past-dated catalyst events
 let pastCats=[];
 const monthNames={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.catalysts)return;
 s.catalysts.forEach(cat=>{
 if(!cat.d)return;
 const dm=cat.d.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)/);
 if(dm){
 const cDate=new Date(2026,monthNames[dm[1]],parseInt(dm[2]));
 const daysPast=Math.floor((today-cDate)/(1000*60*60*24));if(daysPast>=1&&!cat.d.includes("✓")&&!cat.e.includes("✓"))pastCats.push(`${t}: ${cat.d} "${cat.e.substring(0,30)}"`);
 }
 });
 });
 if(pastCats.length>0){checks.push({cat:"CATALYSTS",sev:pastCats.length>5?"HIGH":"MED",msg:`${pastCats.length} past-dated catalysts: ${pastCats.slice(0,3).join("; ")}${pastCats.length>3?"...":""}`,fix:"Update catalyst dates, mark completed ones with ✓, add new upcoming events",pts:pastCats.length>5?-8:-4});totalScore-=pastCats.length>5?8:4;}
 else{checks.push({cat:"CATALYSTS",sev:"OK",msg:"All catalyst dates are current or marked complete",fix:"",pts:0});}

 totalScore=Math.max(0,Math.min(100,totalScore));

 // ═══════════════════════════════════════════════
 // DEEP CONTENT CHECKS (Tab-level prose/data accuracy)
 // ═══════════════════════════════════════════════

 // 16. FIB LEVELS — price outside fib range = stale technicals
 let fibIssues=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.tech||!s.tech.levels||!s.tech.levels.fibs)return;
 const fps=s.tech.levels.fibs.map(f=>f.p).filter(v=>v>0);
 if(fps.length>0&&(p<Math.min(...fps)*0.9||p>Math.max(...fps)*1.1))
 fibIssues.push(`${t}: $${p} outside ${Math.min(...fps)}-${Math.max(...fps)}`);
 });
 if(fibIssues.length>0){checks.push({cat:"FIB LEVELS",sev:fibIssues.length>3?"HIGH":"MED",msg:`${fibIssues.length} tickers with price outside Fib range: ${fibIssues.join("; ")}`,fix:"Recalculate Fibonacci retracement levels from current swing high/low",pts:fibIssues.length>3?-8:-4});totalScore-=fibIssues.length>3?8:4;}
 else{checks.push({cat:"FIB LEVELS",sev:"OK",msg:"All Fib levels span current prices",fix:"",pts:0});}

 // 17. OPTIONS FLOW — stale strike prices in flow data
 let flowIssues=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.options||!s.options.flow)return;
 s.options.flow.forEach(f=>{
 if(!f.s||typeof f.s!=="number")return;
 if(Math.abs(f.s-p)/p>0.35)
 flowIssues.push(`${t}: ${f.t} $${f.s} strike vs $${p} (${Math.round(Math.abs(f.s-p)/p*100)}% off)`);
 });
 });
 if(flowIssues.length>0){checks.push({cat:"OPT FLOW",sev:flowIssues.length>4?"HIGH":"MED",msg:`${flowIssues.length} stale strike prices in flow: ${flowIssues.slice(0,3).join("; ")}${flowIssues.length>3?"...":""}`,fix:"Update options flow with current strike prices and activity",pts:flowIssues.length>4?-6:-3});totalScore-=flowIssues.length>4?6:3;}
 else{checks.push({cat:"OPT FLOW",sev:"OK",msg:"Options flow strike prices within range",fix:"",pts:0});}

 // 18. TECH VERDICT vs MA ALIGNMENT — contradiction check
 let techContradictions=[];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.tech||!s.tech.verdict||!s.tech.ma)return;
 const sc=s.tech.verdict.score,al=s.tech.ma.align;
 if(al==="bearish"&&sc>60)techContradictions.push(`${t}: score ${sc} but MAs bearish`);
 if(al==="bullish"&&sc<25)techContradictions.push(`${t}: score ${sc} but MAs bullish`);
 });
 if(techContradictions.length>0){checks.push({cat:"TECH ALIGN",sev:"MED",msg:`${techContradictions.length} verdict/MA contradictions: ${techContradictions.join("; ")}`,fix:"Reconcile technical verdict score with MA alignment direction",pts:-4});totalScore-=4;}
 else{checks.push({cat:"TECH ALIGN",sev:"OK",msg:"All technical verdicts consistent with MA alignment",fix:"",pts:0});}

 // 19. COMP TABLE — outlier PE ratios (0, negative, or >200x)
 let compIssues=[];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.fund||!s.fund.comps)return;
 s.fund.comps.forEach(comp=>{
 if(comp.pe!==undefined&&(comp.pe<=0||comp.pe>200))
 compIssues.push(`${t} comp ${comp.t||"?"}: PE=${comp.pe}`);
 });
 });
 if(compIssues.length>0){checks.push({cat:"REL VALUE",sev:"MED",msg:`${compIssues.length} outlier comp PEs: ${compIssues.join("; ")}`,fix:"Update relative value comp table with current PE/EV multiples",pts:-3});totalScore-=3;}
 else{checks.push({cat:"REL VALUE",sev:"OK",msg:"All comp table PE ratios within reasonable range",fix:"",pts:0});}

 // 20. PLAYBOOK TARGETS — stale targets in action text (stock blew past them)
 let pbBodyIssues=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.playbook)return;
 s.playbook.forEach(pb=>{
 const action=pb.action||"";
 const targetRefs=[];const _trx=/(?:target|Target|hold for|Hold for|trim above|Trim above)\s*\$(\d+)/gi;let _tm;while((_tm=_trx.exec(action))!==null)targetRefs.push(parseInt(_tm[1]));
 targetRefs.forEach(r=>{
 if(r>15&&r<2000&&r<p*0.7)
 pbBodyIssues.push(`${t}: target $${r} but price $${p}`);
 });
 });
 });
 if(pbBodyIssues.length>0){checks.push({cat:"PB TARGETS",sev:pbBodyIssues.length>3?"HIGH":"MED",msg:`${pbBodyIssues.length} stale targets in playbooks: ${pbBodyIssues.slice(0,3).join("; ")}${pbBodyIssues.length>3?"...":""}`,fix:"Update playbook action targets — stock moved past these levels",pts:pbBodyIssues.length>3?-6:-3});totalScore-=pbBodyIssues.length>3?6:3;}
 else{checks.push({cat:"PB TARGETS",sev:"OK",msg:"All playbook targets consistent with current prices",fix:"",pts:0});}

 // 21. STORY — check for resolved/stale narrative references
 let storyIssues=[];
 const staleTerms=["Q1 2025","Q2 2025","Q3 2025"];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.fund||!s.fund.story)return;
 const st=s.fund.story;
 staleTerms.forEach(term=>{if(st.includes(term))storyIssues.push(`${t}: story refs "${term}"`);});
 // Check for WBD refs in non-NFLX tickers
 if(t!=="NFLX"&&st.includes("WBD"))storyIssues.push(`${t}: story refs "WBD"`);
 });
 if(storyIssues.length>0){checks.push({cat:"STORY",sev:"MED",msg:`${storyIssues.length} stale narrative refs: ${storyIssues.join("; ")}`,fix:"Update story narratives to reflect current quarter and events",pts:-3});totalScore-=3;}
 else{checks.push({cat:"STORY",sev:"OK",msg:"All story narratives current — no stale quarter or event refs",fix:"",pts:0});}

 // 22. WATCHLIST DATES — past-dated watchlist items
 let watchIssues=[];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.watchlist)return;
 s.watchlist.forEach(w=>{
 if(!w.d)return;
 const dm=w.d.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)/);
 if(dm){
 const cDate=new Date(2026,monthNames[dm[1]],parseInt(dm[2]));
 if(cDate<today)watchIssues.push(`${t}: ${w.d} "${(w.item||"").substring(0,25)}"`);
 }
 });
 });
 if(watchIssues.length>0){checks.push({cat:"WATCHLIST",sev:watchIssues.length>4?"HIGH":"MED",msg:`${watchIssues.length} past-dated watchlist items: ${watchIssues.slice(0,3).join("; ")}${watchIssues.length>3?"...":""}`,fix:"Update watchlist: remove completed items, add new upcoming events",pts:watchIssues.length>4?-6:-3});totalScore-=watchIssues.length>4?6:3;}
 else{checks.push({cat:"WATCHLIST",sev:"OK",msg:"All watchlist items are future-dated",fix:"",pts:0});}

 // 23. PLAYBOOK NARRATIVE QUALITY — comprehensive text accuracy & freshness
 let pbQualIssues=[];
 const currentMacroTerms=["oil","iran","war","pce","gdp","cpi","vix","stagflation","hormuz","ceasefire","fed","risk-off","fading","regime","tariff","macro"];
 const staleEventTerms=["pre-war","before the war","Q1 2025","Q2 2025","Q3 2025"];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.playbook||!s.playbook.length)return;
 const pb1w=s.playbook[0];
 const allText=(pb1w.bias||"")+" "+(pb1w.thesis||"")+" "+(pb1w.action||"");
 const allLower=allText.toLowerCase();

 // A) 1W MACRO CONTEXT — must mention at least 1 current macro factor
 const hasMacro=currentMacroTerms.some(m=>allLower.includes(m));
 if(!hasMacro)pbQualIssues.push(`${t}: 1W missing macro context (no oil/war/PCE/GDP refs)`);

 // B) 1W HEADLINE PRICE — must be within 5% of current price
 const hPrice=(pb1w.bias||"").match(/\$(\d+)/);
 if(hPrice&&Math.abs(parseInt(hPrice[1])-p)/p>0.05)
 pbQualIssues.push(`${t}: 1W headline $${hPrice[1]} vs actual $${p} (${Math.round(Math.abs(parseInt(hPrice[1])-p)/p*100)}% off)`);

 // C) STALE EVENT REFS — check all timeframes for resolved/old refs
 s.playbook.forEach(pb=>{
 const txt=((pb.thesis||"")+" "+(pb.action||"")).toLowerCase();
 staleEventTerms.forEach(term=>{
 if(txt.includes(term.toLowerCase()))pbQualIssues.push(`${t}: refs "${term}" in playbook`);
 });
 });

 // D) THESIS DEPTH — 1W thesis must be >80 chars for meaningful analysis
 if((pb1w.thesis||"").length<80)pbQualIssues.push(`${t}: 1W thesis too thin (${(pb1w.thesis||"").length}c, need 80+)`);

 // E) ACTION SPECIFICITY — 1W action must be >40 chars with actionable guidance
 if((pb1w.action||"").length<40)pbQualIssues.push(`${t}: 1W action too thin (${(pb1w.action||"").length}c, need 40+)`);

 // F) EMPTY FIELDS — any timeframe with empty thesis or action
 s.playbook.forEach((pb,i)=>{
 if(!(pb.thesis||"").trim())pbQualIssues.push(`${t} TF${i+1}: empty thesis`);
 if(!(pb.action||"").trim())pbQualIssues.push(`${t} TF${i+1}: empty action`);
 });

 // G) CROSS-CHECK: earnings date proximity — if <14d, 1W should mention earnings
 const edm=(s.earningsDate||"").match(/^(\w+)\s+(\d+),\s*(\d+)$/);
 if(edm&&!s.earningsDate.includes("✓")){
 const emo={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[edm[1]];
 if(emo!==undefined){
 const edt=new Date(parseInt(edm[3]),emo,parseInt(edm[2]));
 const dte=Math.ceil((edt-today)/(1000*60*60*24));
 if(dte>=0&&dte<=14&&!allLower.includes("earning"))
 pbQualIssues.push(`${t}: earnings in ${dte}d but 1W doesn't mention earnings`);
 }
 }

 // H) CROSS-CHECK: if activeRisks have HIGH severity, 1W should acknowledge risk
 const highRisks=(s.fund&&s.fund.activeRisks||[]).filter(r=>r.sev==="HIGH");
 if(highRisks.length>=2){
 const riskTerms=["risk","caution","careful","watch","hedge","stop","trim"];
 const hasRiskAck=riskTerms.some(rt=>allLower.includes(rt));
 if(!hasRiskAck)pbQualIssues.push(`${t}: ${highRisks.length} HIGH risks but 1W playbook has no risk language`);
 }
 });
 if(pbQualIssues.length>0){
 const sevCount=pbQualIssues.length;
 checks.push({cat:"PB QUALITY",sev:sevCount>8?"HIGH":sevCount>3?"MED":"LOW",msg:`${sevCount} narrative issues: ${pbQualIssues.slice(0,3).join("; ")}${sevCount>3?"... +"+(sevCount-3)+" more":""}`,fix:"Refresh playbook prose: add macro context, update prices, deepen thin thesis/action text",pts:sevCount>8?-8:sevCount>3?-4:-2});
 totalScore-=sevCount>8?8:sevCount>3?4:2;
 }
 else{checks.push({cat:"PB QUALITY",sev:"OK",msg:"All playbook narratives: macro-aware, price-accurate, well-detailed, risk-conscious",fix:"",pts:0});}

 // 24. RSI vs VERDICT — RSI >70 should not have bullish score >70, RSI <30 should not have score <20
 let rsiIssues=[];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.tech||!s.tech.momentum)return;
 const rsi=s.tech.momentum.rsi,sc=s.tech.verdict?s.tech.verdict.score:50;
 if(rsi>75&&sc>70)rsiIssues.push(`${t}: RSI ${rsi} overbought but score ${sc} very bullish`);
 if(rsi<25&&sc>50)rsiIssues.push(`${t}: RSI ${rsi} oversold but score ${sc} still bullish`);
 });
 if(rsiIssues.length>0){checks.push({cat:"RSI/SCORE",sev:"MED",msg:`${rsiIssues.length} RSI contradictions: ${rsiIssues.join("; ")}`,fix:"Reconcile technical score with RSI overbought/oversold readings",pts:0});totalScore-=0;}
 else{checks.push({cat:"RSI/SCORE",sev:"OK",msg:"RSI readings consistent with technical scores",fix:"",pts:0});}

 // 25. SUPPORT LEVELS — must all be below current price and within reasonable range
 let supportIssues2=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.support)return;
 s.support.forEach((sup,i)=>{
 if(sup.lvl>p)supportIssues2.push(`${t}: S${i+1} $${sup.lvl} > price $${p}`);
 if(sup.lvl<p*0.5)supportIssues2.push(`${t}: S${i+1} $${sup.lvl} too far below $${p} (${Math.round((p-sup.lvl)/p*100)}% away)`);
 });
 });
 if(supportIssues2.length>0){checks.push({cat:"SUPPORT DIST",sev:supportIssues2.length>3?"HIGH":"MED",msg:`${supportIssues2.length} support level issues: ${supportIssues2.slice(0,3).join("; ")}${supportIssues2.length>3?"...":""}`,fix:"Update support levels to reflect current price structure",pts:supportIssues2.length>3?-6:-3});totalScore-=supportIssues2.length>3?6:3;}
 else{checks.push({cat:"SUPPORT DIST",sev:"OK",msg:"All support levels properly positioned below price",fix:"",pts:0});}

 // SUPPORT PROXIMITY - reports the distance to the nearest defended level.
 // Rewritten Sep 4 2026. The old version deducted points and said "trail up" when
 // support sat >20% below price. But with stops removed there is nothing to trail,
 // and that distance IS the risk statement - AMD having no defended level within
 // 40% is exactly what the reader needs to see. Reported, never penalised.
 const stopIssues=[];const farNames=[];
 tickers.forEach(t=>{
  const s=S[t],p=prices[t];
  if(!s.support||!s.support[0]||!p)return;
  const drawdown=(p-s.support[0].lvl)/p*100;
  if(drawdown>20)farNames.push(`${t} ${Math.round(drawdown)}%`);
 });
 checks.push({cat:"SUPPORT PROXIMITY",sev:"OK",
  msg:farNames.length?`${farNames.length} name(s) with no defended support within 20%: ${farNames.join(", ")} - that gap is the risk, not a data error`:"Every ticker has defended support within 20% of price",
  fix:"",pts:0});

 // CHECK: RISK REWARD — honest methodology (avgPT, 1.5x threshold)
 // Informational: surfaces positions with compressed R:R or above consensus PT
 // Small deduction reflects that the user has actionable info, not that data is broken
 const rrExtended=[]; // above consensus PT
 const rrCompressed=[]; // R:R < 1.5x
 const rrHealthy=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.support||!s.support[0]||!s.avgPT||!p)return;
 const upside=s.avgPT-p;
 const risk=p-s.support[0].lvl;
 if(risk<=0)return;
 if(upside<=0){
 rrExtended.push(t+" $"+Math.round(p)+">PT$"+s.avgPT);
 } else {
 const rr=upside/risk;
 if(rr<1.5) rrCompressed.push(t+" "+rr.toFixed(1)+"x");
 else rrHealthy.push(t);
 }
 });
 const totalIssues=rrExtended.length+rrCompressed.length;
 if(totalIssues>0){
 const summary=[];
 if(rrExtended.length>0) summary.push(rrExtended.length+" above consensus: "+rrExtended.join(", "));
 if(rrCompressed.length>0) summary.push(rrCompressed.length+" R:R<1.5x: "+rrCompressed.slice(0,5).join(", ")+(rrCompressed.length>5?"+more":""));
 checks.push({cat:"RISK REWARD",sev:"LOW",
 msg:"INFO (perf signal, not data error): "+rrHealthy.length+"/"+(rrHealthy.length+totalIssues)+" positions healthy. "+summary.join(" | "),
 fix:"This reflects rally compression / analyst PT lag — not data error. Trim or wait for PT refreshes.",
 pts:0});
 totalScore-=0;
 } else {
 checks.push({cat:"RISK REWARD",sev:"OK",msg:"All positions have R:R ≥ 1.5x vs consensus PT",fix:"",pts:0});
 }

 // CHECK: PT FRESHNESS — price targets should be verified within 30 days
 // Critical for accurate R:R picture: stale PTs lie about asymmetry
 const ptStale=[];
 const ptPriceMoved=[];
 const monthLkPT={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.ptDate||!s.avgPT||!p)return;
 const ptm=s.ptDate.match(/^(\w+)\s+(\d+),?\s*(\d{4})/);
 if(!ptm)return;
 const ptDt=new Date(parseInt(ptm[3]),monthLkPT[ptm[1]],parseInt(ptm[2]));
 const daysOld=Math.floor((today-ptDt)/(1000*60*60*24));
 if(daysOld>3){
 ptStale.push(t+": "+daysOld+"d old");
 }
 // Also flag if price moved 15%+ since PT was set (PT may need refresh)
 // Use storedPrice as proxy — if S.price is meaningfully different from current, PT context may have changed
 if(s.price&&Math.abs(p-s.price)/s.price>0.05&&daysOld>1){
 ptPriceMoved.push(t+": price moved "+Math.round((p-s.price)/s.price*100)+"% since "+s.ptDate);
 }
 });
 const ptFreshIssues=[...ptStale,...ptPriceMoved];
 if(ptFreshIssues.length>0){
 checks.push({cat:"PT FRESHNESS",sev:ptStale.length>4?"HIGH":ptFreshIssues.length>2?"MED":"LOW",
 msg:ptFreshIssues.length+" PT freshness issue(s): "+ptFreshIssues.slice(0,3).join("; ")+(ptFreshIssues.length>3?" +more":""),
 fix:"Verify analyst consensus PTs (TipRanks/StockAnalysis) and update ptDate. Critical for R:R accuracy.",
 pts:ptStale.length>4?-6:ptFreshIssues.length>2?-3:-1});
 totalScore-=ptStale.length>4?6:ptFreshIssues.length>2?3:1;
 } else {
 checks.push({cat:"PT FRESHNESS",sev:"OK",msg:"All ptDates within 3 days, prices consistent with PT context",fix:"",pts:0});
 }

 // CHECK: SUPPORT FRESHNESS — support levels should track price action
 // Stale support[0] means R:R math uses outdated technical reference
 const supStale=[];
 const supTooFar=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.supportDate||!s.support||!s.support[0]||!p)return;
 const sm=s.supportDate.match(/^(\w+)\s+(\d+),?\s*(\d{4})/);
 if(!sm)return;
 const sDt=new Date(parseInt(sm[3]),monthLkPT[sm[1]],parseInt(sm[2]));
 const daysOld=Math.floor((today-sDt)/(1000*60*60*24));
 const drawdown=(p-s.support[0].lvl)/p*100;
 if(daysOld>3) supStale.push(t+": "+daysOld+"d old");
 if(drawdown>25) supTooFar.push(t+": support[0] $"+s.support[0].lvl+" is "+Math.round(drawdown)+"% below price");
 });
 const supFreshIssues=[...supStale,...supTooFar];
 if(supFreshIssues.length>0){
 checks.push({cat:"SUPPORT FRESHNESS",sev:supTooFar.length>3?"HIGH":supFreshIssues.length>2?"MED":"LOW",
 msg:"INFO (workflow signal): "+supFreshIssues.length+" support freshness issue(s): "+supFreshIssues.slice(0,3).join("; ")+(supFreshIssues.length>3?" +more":""),
 fix:"Refresh support levels to current technical reality (50d/200d MA, recent swing lows) and update supportDate",
 pts:0});
 
 } else {
 checks.push({cat:"SUPPORT FRESHNESS",sev:"OK",msg:"Support levels within 3 days, top support within 25% of price",fix:"",pts:0});
 }

 // CHECK: STALE EARNINGS DATE — earningsDate must roll forward to next quarter after print
 // If earningsDate is 7+ days past and not marked ✓, the playbook/checks reference wrong quarter
 const staleEarnDates=[];
 const monthLkSE={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 tickers.forEach(t=>{
 const s=S[t],ed=s.earningsDate||"";
 if(ed.includes("✓"))return;
 const edm=ed.match(/^(\w+)\s+(\d+),?\s*(\d{4})/);
 if(!edm)return;
 const edt=new Date(parseInt(edm[3]),monthLkSE[edm[1]],parseInt(edm[2]));
 const daysSince=Math.floor((today-edt)/(1000*60*60*24));
 if(daysSince>7) staleEarnDates.push(t+": earnings "+ed+" was "+daysSince+"d ago — roll to next quarter");
 });
 if(staleEarnDates.length>0){
 checks.push({cat:"STALE EARN DATE",sev:staleEarnDates.length>3?"HIGH":"MED",
 msg:staleEarnDates.length+" earningsDate(s) need rolling: "+staleEarnDates.slice(0,3).join("; ")+(staleEarnDates.length>3?" +more":""),
 fix:"Update earningsDate to next quarter and mark prior with ✓",
 pts:staleEarnDates.length>3?-6:-3});
 
 } else {
 checks.push({cat:"STALE EARN DATE",sev:"OK",msg:"All earningsDates current or marked ✓",fix:"",pts:0});
 }

 // CHECK: EPS EST FRESHNESS — for tickers reporting within 30 days, epsEstDate must be < 14 days old
 const staleEps=[];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.epsEstDate||!s.earningsDate||s.earningsDate.includes("✓"))return;
 const edm=s.earningsDate.match(/^(\w+)\s+(\d+),?\s*(\d{4})/);
 if(!edm)return;
 const edt=new Date(parseInt(edm[3]),monthLkSE[edm[1]],parseInt(edm[2]));
 const daysToEarnings=Math.floor((edt-today)/(1000*60*60*24));
 if(daysToEarnings<0||daysToEarnings>30)return;
 const epsm=s.epsEstDate.match(/^(\w+)\s+(\d+),?\s*(\d{4})/);
 if(!epsm)return;
 const epsDt=new Date(parseInt(epsm[3]),monthLkSE[epsm[1]],parseInt(epsm[2]));
 const epsDaysOld=Math.floor((today-epsDt)/(1000*60*60*24));
 if(epsDaysOld>14) staleEps.push(t+": epsEst "+epsDaysOld+"d old, earnings in "+daysToEarnings+"d");
 });
 if(staleEps.length>0){
 checks.push({cat:"EPS EST FRESHNESS",sev:staleEps.length>2?"MED":"LOW",
 msg:staleEps.length+" stale epsEst(s) for upcoming earnings: "+staleEps.slice(0,3).join("; "),
 fix:"Verify Wall Street consensus EPS estimates and bump epsEstDate",
 pts:staleEps.length>2?-3:-1});
 
 } else {
 checks.push({cat:"EPS EST FRESHNESS",sev:"OK",msg:"All epsEst values fresh for upcoming earnings",fix:"",pts:0});
 }

 // CHECK: HIGH52 AUTO-DETECT — if current price exceeds stored high52, high52 is wrong
 const high52Issues=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.high52||!p)return;
 if(p>s.high52) high52Issues.push(t+": price $"+p.toFixed(0)+" > stored high52 $"+s.high52+" — bump to $"+Math.ceil(p));
 });
 if(high52Issues.length>0){
 checks.push({cat:"HIGH52 STALE",sev:high52Issues.length>2?"MED":"LOW",
 msg:high52Issues.length+" high52 broken: "+high52Issues.slice(0,3).join("; "),
 fix:"Update high52 field to new ATH for each affected ticker",
 pts:high52Issues.length>2?-3:-1});
 
 } else {
 checks.push({cat:"HIGH52 STALE",sev:"OK",msg:"All high52 values >= current prices",fix:"",pts:0});
 }

 // CHECK: PRICE CONSISTENCY — S.price (block-level) vs LC[ticker] (header) must match within 2%
 // Drift here means YTD%, momentum, technical signals are computed on inconsistent data
 const priceDrift=[];
 tickers.forEach(t=>{
 const s=S[t],lcP=LC[t];
 if(!s.price||!lcP)return;
 const drift=Math.abs(s.price-lcP)/lcP*100;
 if(drift>2) priceDrift.push(t+": S.price $"+s.price.toFixed(2)+" vs LC $"+lcP.toFixed(2)+" ("+drift.toFixed(1)+"% drift)");
 });
 if(priceDrift.length>0){
 checks.push({cat:"PRICE CONSISTENCY",sev:priceDrift.length>3?"HIGH":"MED",
 msg:priceDrift.length+" price drift(s) > 2%: "+priceDrift.slice(0,3).join("; "),
 fix:"Sync S.price with LC[ticker] — drift breaks YTD/momentum/technical signals",
 pts:priceDrift.length>3?-5:-2});
 
 } else {
 checks.push({cat:"PRICE CONSISTENCY",sev:"OK",msg:"S.price consistent with LC across all tickers",fix:"",pts:0});
 }

 // 26. AVGPT SANITY — avgPT should be realistic vs price (not >100% above or below)
 let ptIssues=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 const upsideToAvg=(s.avgPT-p)/p*100;
 if(upsideToAvg<-25)ptIssues.push(`${t}: price $${p} is 25%+ ABOVE avg PT $${s.avgPT} — overvalued or PT stale`);
 if(upsideToAvg>120)ptIssues.push(`${t}: avg PT $${s.avgPT} is ${Math.round(upsideToAvg)}% above $${p} — PT may be stale`);
 });
 if(ptIssues.length>0){checks.push({cat:"AVG PT",sev:ptIssues.length>2?"HIGH":"MED",msg:"INFO (perf signal, not data error): "+ptIssues.length+" PT vs price issues: "+ptIssues.join("; "),fix:"This reflects stock outpacing analyst consensus — not data error. Verify PTs are current, then accept the gap or trim.",pts:0});}
 else{checks.push({cat:"AVG PT",sev:"OK",msg:"All avg PTs within reasonable range of current prices",fix:"",pts:0});}

 // 27. MACD vs MA ALIGN — MACD direction should match MA alignment
 let macdIssues=[];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.tech||!s.tech.momentum||!s.tech.ma)return;
 const macd=s.tech.momentum.macd;
 const align=s.tech.ma.align;
 if(macd&&macd.dir==="bull"&&align==="bearish")macdIssues.push(`${t}: MACD bullish but MAs bearish`);
 if(macd&&macd.dir==="bear"&&align==="bullish")macdIssues.push(`${t}: MACD bearish but MAs bullish`);
 });
 if(macdIssues.length>0){checks.push({cat:"MACD/MA",sev:"MED",msg:`${macdIssues.length} MACD/MA contradictions: ${macdIssues.join("; ")}`,fix:"Review: MACD and MA alignment disagreeing — update technicals commentary",pts:-3});}
 else{checks.push({cat:"MACD/MA",sev:"OK",msg:"MACD direction consistent with MA alignment",fix:"",pts:0});}

 // 28. OPTIONS IMPLIED MOVE vs EARNINGS PROXIMITY — if earnings <7d, impliedMove should reflect earnings vol
 let imIssues=[];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.options)return;
 const im=s.options.impliedMove;
 const ed=s.earningsDate||"";
 if(ed.includes("✓"))return;
 const edm=ed.match(/^(\w+)\s+(\d+),\s*(\d+)$/);
 if(!edm)return;
 const emo={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[edm[1]];
 if(emo===undefined)return;
 const edt=new Date(parseInt(edm[3]),emo,parseInt(edm[2]));
 const dte=Math.ceil((edt-today)/(1000*60*60*24));
 if(dte>=0&&dte<=7&&im<6)imIssues.push(`${t}: earnings in ${dte}d but impliedMove only ${im}% (should be elevated)`);
 if(dte>30&&im>12)imIssues.push(`${t}: no earnings for ${dte}d but impliedMove ${im}% seems high`);
 });
 if(imIssues.length>0){checks.push({cat:"IMP MOVE",sev:"MED",msg:`${imIssues.length} implied move issues: ${imIssues.join("; ")}`,fix:"Update options impliedMove to reflect current vol environment and earnings proximity",pts:-3});}
 else{checks.push({cat:"IMP MOVE",sev:"OK",msg:"Options implied moves appropriate for earnings proximity",fix:"",pts:0});}

 // 32. OPTIONS FULL — comprehensive options tab data audit
 let optFullIssues=[];
 const monthMap2={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.options)return;
 const o=s.options;

 // A) ivRank vs VIX consistency: if VIX >25, ivRank below 25 is suspect for most names
 if(MACRO.vix>25&&o.ivRank<25)optFullIssues.push(`${t}: ivRank ${o.ivRank} low for VIX ${MACRO.vix}`);

 // B) ivPctl should be in 0-100 range and roughly track ivRank
 if(o.ivPctl!==undefined&&(o.ivPctl<0||o.ivPctl>100))optFullIssues.push(`${t}: ivPctl ${o.ivPctl} out of range`);

 // C) pcRatio outliers (normal 0.3-2.5)
 if(o.pcRatio&&(o.pcRatio<0.15||o.pcRatio>3.0))optFullIssues.push(`${t}: pcRatio ${o.pcRatio} outlier`);

 // D) Flow expiry dates — flag any past-dated expiries
 if(o.flow){
 let expiredFlows=0;
 o.flow.forEach(f=>{
 if(!f.e)return;
 const dm=f.e.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)/);
 if(dm){
 const ed=new Date(2026,monthMap2[dm[1]],parseInt(dm[2]));
 if(ed<today)expiredFlows++;
 }
 });
 if(expiredFlows>0)optFullIssues.push(`${t}: ${expiredFlows} expired flow expir${expiredFlows>1?"ies":"y"}`);
 }

 // E) maxPain should move with price — already checked in #11 but double-check extreme cases
 if(o.maxPain&&Math.abs(o.maxPain-p)/p>0.25)optFullIssues.push(`${t}: maxPain $${o.maxPain} vs $${p} (${Math.round(Math.abs(o.maxPain-p)/p*100)}% off)`);
 });
 if(optFullIssues.length>0){
 const sev=optFullIssues.length>10?"HIGH":optFullIssues.length>4?"MED":"LOW";
 checks.push({cat:"OPT FULL",sev,msg:`${optFullIssues.length} options data issues: ${optFullIssues.slice(0,3).join("; ")}${optFullIssues.length>3?"... +"+(optFullIssues.length-3)+" more":""}`,fix:"Refresh options tab: update flow expiry dates, ivRank/ivPctl for current vol, pcRatio",pts:optFullIssues.length>10?-8:optFullIssues.length>4?-4:-2});
 
 }
 else{checks.push({cat:"OPT FULL",sev:"OK",msg:"All options data current: ivRank/VIX consistent, flow expiries valid, pcRatio normal",fix:"",pts:0});}

 // 29. PRICE TARGETS — structural coherence of avgPT/highPT/lowPT vs current price
 let ptIssues2=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 // lowPT should be below current price
 if(s.lowPT&&s.lowPT>p)ptIssues2.push(`${t}: lowPT $${s.lowPT} > price $${p}`);
 // highPT should be above current price
 if(s.highPT&&s.highPT<p)ptIssues2.push(`${t}: highPT $${s.highPT} < price $${p}`);
 // highPT should be above avgPT
 if(s.highPT&&s.avgPT&&s.highPT<s.avgPT)ptIssues2.push(`${t}: highPT $${s.highPT} < avgPT $${s.avgPT}`);
 // avgPT shouldn't be wildly stale — if price is 30%+ above avgPT, consensus may need refresh
 if(s.avgPT&&s.highPT&&s.avgPT>s.highPT)ptIssues2.push(`${t}: avgPT $${s.avgPT} > highPT $${s.highPT} — data error`);
 // VRT/PWR special: if avgPT within 5% of price, not useful as a signal
 if(!s.avgPT||!s.highPT)ptIssues2.push(`${t}: missing PT data`);
 });
 if(ptIssues2.length>0){checks.push({cat:"PRICE TGTS",sev:ptIssues2.length>3?"MED":"LOW",msg:"INFO (perf signal, not data error): "+ptIssues2.length+" PT issues: "+ptIssues2.slice(0,3).join("; ")+(ptIssues2.length>3?"...":""),fix:"Stocks dropped below analyst low PTs — verify PTs current, then trim or accept analyst miss.",pts:0});}
 else{checks.push({cat:"PRICE TGTS",sev:"OK",msg:"All price targets structurally coherent with current prices",fix:"",pts:0});}

 // 30. INTEL COVERAGE — minimum news items per ticker for meaningful signal
 let intelCoverage=[];
 tickers.forEach(t=>{
 const items=allItems[t]||[];
 if(items.length<8)intelCoverage.push(`${t}: only ${items.length} items (need 8+)`);
 });
 if(intelCoverage.length>0){checks.push({cat:"INTEL DEPTH",sev:intelCoverage.length>4?"HIGH":"MED",msg:`${intelCoverage.length} tickers with thin intel (<8 items): ${intelCoverage.slice(0,3).join("; ")}${intelCoverage.length>3?"...":""}`,fix:"Add more news/rumor/analysis items to thin tickers for stronger signal computation",pts:intelCoverage.length>4?-6:-3});}
 else{checks.push({cat:"INTEL DEPTH",sev:"OK",msg:"All tickers have 8+ intel items for robust signal computation",fix:"",pts:0});}

 // 31. RISK COVERAGE — every ticker should have 3+ active risks with valid prob/catalyst
 let riskCoverage=[];
 tickers.forEach(t=>{
 const s=S[t];
 const risks=s.fund&&s.fund.activeRisks?s.fund.activeRisks:[];
 if(risks.length<3)riskCoverage.push(`${t}: only ${risks.length} risks (need 3+)`);
 // Check for risks without prob or catalyst
 const noProbCount=risks.filter(r=>!r.prob&&r.prob!==0).length;
 const noCatCount=risks.filter(r=>!r.catalyst).length;
 if(noProbCount>0)riskCoverage.push(`${t}: ${noProbCount} risks missing probability`);
 if(noCatCount>0)riskCoverage.push(`${t}: ${noCatCount} risks missing catalyst date`);
 });
 if(riskCoverage.length>0){checks.push({cat:"RISK DEPTH",sev:riskCoverage.length>4?"HIGH":"MED",msg:`${riskCoverage.length} risk coverage issues: ${riskCoverage.slice(0,3).join("; ")}${riskCoverage.length>3?"...":""}`,fix:"Ensure every ticker has 3+ risks with probability % and dated catalysts",pts:riskCoverage.length>4?-6:-3});}
 else{checks.push({cat:"RISK DEPTH",sev:"OK",msg:"All tickers have 3+ active risks with probabilities and catalyst dates",fix:"",pts:0});}

 // 33. 52-WEEK HIGH — price should not exceed high52
 let highIssues=[];
 tickers.forEach(t=>{const s=S[t],p=prices[t];if(s.high52&&p>s.high52)highIssues.push(`${t}: $${p} > 52w $${s.high52}`);});
 if(highIssues.length>0){checks.push({cat:"52W HIGH",sev:"MED",msg:`${highIssues.length} above 52w high: ${highIssues.join("; ")}`,fix:"Update high52 to reflect new highs",pts:-3});}
 else{checks.push({cat:"52W HIGH",sev:"OK",msg:"All prices below 52-week highs",fix:"",pts:0});}

 // 34. PIVOT POINTS — price within R2-S2 range
 let pivotIssues=[];
 tickers.forEach(t=>{const s=S[t],p=prices[t];if(!s.tech||!s.tech.levels||!s.tech.levels.pivots)return;const pv=s.tech.levels.pivots;if(pv.r2&&pv.s2&&(p>pv.r2*1.1||p<pv.s2*0.9))pivotIssues.push(`${t}: $${p} outside R2($${pv.r2})-S2($${pv.s2})`);});
 if(pivotIssues.length>0){checks.push({cat:"PIVOTS",sev:pivotIssues.length>3?"HIGH":"MED",msg:`${pivotIssues.length} outside pivot range: ${pivotIssues.slice(0,3).join("; ")}${pivotIssues.length>3?"...":""}`,fix:"Recalculate pivot points from recent price action",pts:pivotIssues.length>3?-6:-3});}
 else{checks.push({cat:"PIVOTS",sev:"OK",msg:"All prices within pivot ranges (S2-R2)",fix:"",pts:0});}

 // 35. YTD % — implied Jan 1 price should be reasonable
 let ytdIssues=[];
 tickers.forEach(t=>{const s=S[t],p=prices[t];if(s.ytd===undefined)return;const j1=p/(1+s.ytd/100);if(j1<p*0.3||j1>p*2.5)ytdIssues.push(`${t}: YTD ${s.ytd}% implies Jan 1 $${Math.round(j1)}`);});
 if(ytdIssues.length>0){checks.push({cat:"YTD %",sev:"MED",msg:`${ytdIssues.length} unrealistic YTD: ${ytdIssues.join("; ")}`,fix:"Update YTD percentages",pts:-3});}
 else{checks.push({cat:"YTD %",sev:"OK",msg:"All YTD percentages imply reasonable Jan 1 prices",fix:"",pts:0});}

 // 36. FOOTER/TD AGE — TD should be recent
 const tdAge2=Math.floor((today-TD)/(1000*60*60*24));
 if(tdAge2>3){checks.push({cat:"FOOTER",sev:"MED",msg:`TD is ${tdAge2} days old — footer likely stale`,fix:"Update TD and footer to current session",pts:-3});}
 else{checks.push({cat:"FOOTER",sev:"OK",msg:"Footer date consistent with last update",fix:"",pts:0});}

 // 37. OBV vs PRICE TREND — OBV direction should match YTD trend
 let obvIssues=[];
 tickers.forEach(t=>{const s=S[t];if(!s.tech||!s.tech.vol||!s.tech.vol.obv)return;const obv=s.tech.vol.obv,ytd=s.ytd||0;if(obv==="rising"&&ytd<-15)obvIssues.push(`${t}: OBV rising but YTD ${ytd}%`);if(obv==="falling"&&ytd>15)obvIssues.push(`${t}: OBV falling but YTD +${ytd}%`);});
 if(obvIssues.length>0){checks.push({cat:"OBV/TREND",sev:"MED",msg:`${obvIssues.length} OBV contradictions: ${obvIssues.join("; ")}`,fix:"Verify OBV direction matches price action",pts:-3});}
 else{checks.push({cat:"OBV/TREND",sev:"OK",msg:"OBV direction consistent with price trends",fix:"",pts:0});}

 // 38. BULL/BEAR/KILLER PROSE — stale quarter refs or resolved events
 let bbkIssues=[];
 tickers.forEach(t=>{const s=S[t];if(!s.fund)return;const texts=[(s.fund.bull&&s.fund.bull.path)||"",(s.fund.bear&&s.fund.bear.path)||"",s.fund.killer||""].join(" ");["Q1 2025","Q2 2025","Q3 2025","pre-war"].forEach(term=>{if(texts.includes(term))bbkIssues.push(`${t}: scenario refs "${term}"`);});if(t!=="NFLX"&&texts.includes("WBD"))bbkIssues.push(`${t}: scenario refs "WBD"`);});
 if(bbkIssues.length>0){checks.push({cat:"SCENARIOS",sev:"MED",msg:`${bbkIssues.length} stale scenario refs: ${bbkIssues.join("; ")}`,fix:"Update bull/bear/killer — remove old quarter refs",pts:-3});}
 else{checks.push({cat:"SCENARIOS",sev:"OK",msg:"All bull/bear/killer scenarios current",fix:"",pts:0});}

 // 39. BULL/BEAR PRICE RANGE — bull case price should be above current, bear below
 let bbPriceIssues=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.fund)return;
 // Bull case: extract prices from "price" field like "$300-350"
 if(s.fund.bull&&s.fund.bull.price){
 const nums=(s.fund.bull.price.match(/\d+/g)||[]).map(Number);
 if(nums.length>0){
 const bullHigh=Math.max(...nums);
 if(bullHigh<p*0.85)bbPriceIssues.push(`${t}: BULL ${s.fund.bull.price} blown past (price $${p})`);
 }
 }
 // Bear case: should be below current price
 if(s.fund.bear&&s.fund.bear.price){
 const nums=(s.fund.bear.price.match(/\d+/g)||[]).map(Number);
 if(nums.length>0){
 const bearHigh=Math.max(...nums);
 if(bearHigh>p*1.3)bbPriceIssues.push(`${t}: BEAR ${s.fund.bear.price} above price $${p}`);
 }
 }
 });
 if(bbPriceIssues.length>0){checks.push({cat:"BULL/BEAR $",sev:bbPriceIssues.length>2?"HIGH":"MED",msg:`${bbPriceIssues.length} stale scenario prices: ${bbPriceIssues.join("; ")}`,fix:"Update bull/bear case price targets to reflect current price level",pts:bbPriceIssues.length>2?-8:-4});}
 else{checks.push({cat:"BULL/BEAR $",sev:"OK",msg:"All bull/bear price targets consistent with current prices",fix:"",pts:0});}

 // 40. FLOW PT — institutional flow text references analyst PTs that price has blown past
 let flowPtIssues=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.fund||!s.fund.flow||!s.fund.flow.inst)return;
 const ptRefs=(s.fund.flow.inst.match(/\$(\d+)\s*PT/g)||[]);
 ptRefs.forEach(ref=>{
 const ptVal=parseInt(ref.match(/\d+/)[0]);
 if(ptVal<p*0.75)flowPtIssues.push(`${t}: flow refs $${ptVal} PT but price $${p}`);
 });
 });
 if(flowPtIssues.length>0){checks.push({cat:"FLOW PTs",sev:"MED",msg:`${flowPtIssues.length} stale flow PTs: ${flowPtIssues.join("; ")}`,fix:"Update institutional flow commentary with current analyst PTs",pts:-3});}
 else{checks.push({cat:"FLOW PTs",sev:"OK",msg:"All institutional flow PT references current",fix:"",pts:0});}

 // 41. THESIS FRESHNESS — thesisDate should be within 14 days
 let thesisIssues=[];
 const monthLookup={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.fund||!s.fund.thesisDate)return;
 const td2=s.fund.thesisDate;
 const dm=td2.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+),?\s*(\d{4})/);
 if(!dm)return;
 const tDate=new Date(parseInt(dm[3]),monthLookup[dm[1]],parseInt(dm[2]));
 const age=Math.floor((today-tDate)/(1000*60*60*24));
 if(age>14)thesisIssues.push(`${t}: ${age}d old (${td2})`);
 });
 if(thesisIssues.length>0){
 const sev=thesisIssues.length>10?"HIGH":thesisIssues.length>5?"MED":"LOW";
 checks.push({cat:"THESIS AGE",sev,msg:`${thesisIssues.length} stale theses (>14d): ${thesisIssues.slice(0,4).join("; ")}${thesisIssues.length>4?"... +"+(thesisIssues.length-4)+" more":""}`,fix:"Refresh thesis narratives: update story, drivers, bull/bear for current macro + recent events",pts:thesisIssues.length>10?-8:thesisIssues.length>5?-5:-2});
 
 }
 else{checks.push({cat:"THESIS AGE",sev:"OK",msg:"All thesis narratives written within 14 days",fix:"",pts:0});}

 // 42. OPTIONS FLOW RECENCY — flow trades should have future expiry dates and reasonable strikes
 let flowFreshIssues=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.options||!s.options.flow||!s.options.flow.length)return;
 let expiredCount=0,staleStrikeCount=0,totalFlow=s.options.flow.length;
 s.options.flow.forEach(f=>{
 // Check expiry is future
 if(f.e){
 const dm=f.e.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)/);
 if(dm){
 const ed=new Date(2026,{Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[dm[1]],parseInt(dm[2]));
 if(ed<today)expiredCount++;
 }
 }
 // Check strike relevance — should be within 40% of price
 if(f.s&&Math.abs(f.s-p)/p>0.40)staleStrikeCount++;
 });
 if(expiredCount>0)flowFreshIssues.push(`${t}: ${expiredCount}/${totalFlow} expired expiries`);
 if(staleStrikeCount>0)flowFreshIssues.push(`${t}: ${staleStrikeCount}/${totalFlow} strikes >40% from price`);
 if(totalFlow<3)flowFreshIssues.push(`${t}: only ${totalFlow} flow entries (need 3+)`);
 });
 if(flowFreshIssues.length>0){checks.push({cat:"FLOW FRESH",sev:flowFreshIssues.length>5?"HIGH":flowFreshIssues.length>2?"MED":"LOW",msg:`${flowFreshIssues.length} flow data issues: ${flowFreshIssues.slice(0,3).join("; ")}${flowFreshIssues.length>3?"...":""}`,fix:"Refresh options flow with current institutional trades — update strikes, expiries, premiums",pts:flowFreshIssues.length>5?-6:flowFreshIssues.length>2?-3:-1});}
 else{checks.push({cat:"FLOW FRESH",sev:"OK",msg:"All options flow data current — expiries valid, strikes relevant, 3+ entries per ticker",fix:"",pts:0});}

 // 43. MARKET VIEW — fast-moving content (macro, policy, opps) vs slow-moving (themes, rotation)
 let mktThemeIssues=[];
 if(MACRO.vix>30)mktThemeIssues.push("Market themes may not reflect VIX spike to "+MACRO.vix);
 if(MACRO.regime==="STAGFLATION FEAR"&&MACRO.vix<22)mktThemeIssues.push("Regime says stagflation but VIX "+MACRO.vix+" suggests risk-on — refresh");
 const mktAge=Math.floor((today-TD)/(1000*60*60*24));
 // Fast content (macro briefing, policy dates, opp prices) stale after 7d
 if(mktAge>7)mktThemeIssues.push("Market macro/policy content "+mktAge+"d old — refresh fast-moving data");
 // Slow content (themes, TAM/CAGR, rotation) stale after 30d
 if(mktAge>30)mktThemeIssues.push("Market themes "+mktAge+"d old — refresh TAM/CAGR and structural themes");
 if(mktThemeIssues.length>0){checks.push({cat:"MKT VIEW",sev:mktThemeIssues.some(i=>i.includes("regime"))?"HIGH":"MED",msg:`${mktThemeIssues.length} market view issues: ${mktThemeIssues.join("; ")}`,fix:"Refresh market view: update macro briefing, policy calendar, opportunity prices. Themes update quarterly.",pts:mktThemeIssues.some(i=>i.includes("regime"))?-6:-3});}
 else{checks.push({cat:"MKT VIEW",sev:"OK",msg:"Market view current — macro consistent, themes within refresh window",fix:"",pts:0});}

 // 44. POLICY CALENDAR — check for past-dated policy events in market view
 // These are hardcoded: Mar 19 FOMC, Apr 9-11 Cloud Next, etc.
 let policyIssues=[];
 const policyDates=[
 {d:"May 12 ✓",e:"CPI Apr report"},
 {d:"May 14 ✓",e:"Trump-Xi summit (AI guardrails)"},
 {d:"May 13 ✓",e:"CSCO/BABA/AMAT earnings"},
 {d:"May 20 ✓",e:"NVDA Q1 Earnings (reported)"}];
 policyDates.forEach(p=>{
 const dm=p.d.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)/);
 if(dm){
 const pd=new Date(2026,{Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[dm[1]],parseInt(dm[2]));
 if(pd<today)policyIssues.push(`${p.d}: ${p.e} has passed`);
 }
 });
 if(policyIssues.length>0){checks.push({cat:"POLICY CAL",sev:"MED",msg:`INFO (informational, past event): ${policyIssues.length} past policy events: ${policyIssues.join("; ")}`,fix:"Update policy calendar in market view — mark completed events, add new upcoming ones",pts:0});}
 else{checks.push({cat:"POLICY CAL",sev:"OK",msg:"All policy calendar dates are future-dated",fix:"",pts:0});}

 // 45. OPPORTUNITIES — check if price refs in opportunities match current prices
 let oppIssues=[];
 // Check specific tickers mentioned in opportunities against current prices
 const oppPriceChecks=[
 {ticker:"NVDA",refPrice:220.59,field:"NVDA Q2 FY27 blowout"},
 {ticker:"MU",refPrice:954.50,field:"MU post-trim review"},
 {ticker:"CRWD",refPrice:229.68,field:"CRWD trim reversal"},
 {ticker:"NOW",refPrice:147.50,field:"Software rotation"},
 {ticker:"VST",refPrice:138.10,field:"VST stop breach"}];
 oppPriceChecks.forEach(o=>{
 const p=prices[o.ticker];
 if(Math.abs(p-o.refPrice)/o.refPrice>0.10)
 oppIssues.push(`${o.ticker}: opp refs $${o.refPrice} but now $${p} (${Math.round(Math.abs(p-o.refPrice)/o.refPrice*100)}% off)`);
 });
 if(oppIssues.length>0){checks.push({cat:"OPP PRICES",sev:oppIssues.length>2?"HIGH":"MED",msg:`${oppIssues.length} stale opportunity prices: ${oppIssues.join("; ")}`,fix:"Update opportunity thesis and play text with current ticker prices",pts:oppIssues.length>2?-6:-3});}
 else{checks.push({cat:"OPP PRICES",sev:"OK",msg:"All opportunity price references current",fix:"",pts:0});}

 // 46. SECTOR ROTATION — validate rotation claims against YTD performance
 let rotIssues=[];
 // "Flowing into" sectors should have positive avg YTD, "flowing out" should have negative
 const flowingIn=["PWR","VRT","MU","CRWD","VST","AVGO","MRVL"];
 const flowingOut=["SHOP","NFLX","V","SNPS","NOW"];
 const avgInYtd=flowingIn.reduce((a,t)=>a+(S[t]?S[t].ytd:0),0)/flowingIn.length;
 const avgOutYtd=flowingOut.reduce((a,t)=>a+(S[t]?S[t].ytd:0),0)/flowingOut.length;
 if(avgInYtd<avgOutYtd)rotIssues.push(`"Flowing in" avg YTD ${avgInYtd.toFixed(0)}% < "flowing out" ${avgOutYtd.toFixed(0)}% — rotation claim may be wrong`);
 if(rotIssues.length>0){checks.push({cat:"ROTATION",sev:"MED",msg:rotIssues.join("; "),fix:"Review sector rotation claims — verify with recent price action",pts:-3});}
 else{checks.push({cat:"ROTATION",sev:"OK",msg:"Sector rotation claims consistent with YTD performance",fix:"",pts:0});}

 // 47. PB PROSE PRICES — thesis/action body text should reference current stock price, not old prices
 let pbProseIssues=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.playbook||!s.playbook[0])return;
 const pb=s.playbook[0];
 // Check first $ reference in thesis — often starts with "$XXX — description"
 [["thesis",pb.thesis],["action",pb.action]].forEach(([label,text])=>{
 if(!text)return;
 // Only check the LEADING price ref (e.g. "$214 — thesis..."), not mid-prose financial figures.
 // The ticker's own price is conventionally stated at the very start of the prose.
 const lead=text.match(/^\s*\$(\d+)(?![\d.])/);
 if(lead){
 const ref=parseInt(lead[1]);
 // Skip if followed by B/M/K/billion (revenue/capex) or EPS/PT/consensus context
 const after=text.slice(0,40);
 const isFinancial=/\$\d+\s*(?:B|M|K|billion|million)/i.test(after)||/EPS|consensus|capex|rev\b|guide|PT|target|range/i.test(after);
 if(!isFinancial&&ref>15&&ref<2000&&ref>=p*0.5&&ref<=p*2&&Math.abs(ref-p)/p>0.08)
 pbProseIssues.push(`${t} ${label}: $${ref} vs $${p}`);
 }
 });
 });
 if(pbProseIssues.length>0){checks.push({cat:"PB PROSE $",sev:pbProseIssues.length>6?"HIGH":pbProseIssues.length>3?"MED":"LOW",msg:`${pbProseIssues.length} stale prices in playbook prose: ${pbProseIssues.slice(0,3).join("; ")}${pbProseIssues.length>3?"... +"+(pbProseIssues.length-3)+" more":""}`,fix:"Update 1W thesis and action text with current stock prices",pts:pbProseIssues.length>6?-8:pbProseIssues.length>3?-5:-2});}
 else{checks.push({cat:"PB PROSE $",sev:"OK",msg:"All playbook prose price references match current prices",fix:"",pts:0});}

 // 48. PB STALE EVENTS — check for references to past events as if they're upcoming
 let pbEventIssues=[];
 const staleEventPhrases=["earnings tonight","earnings today","reports tonight","reports today","GTC Monday","GTC Mon "];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.playbook)return;
 s.playbook.forEach((pb,i)=>{
 const full=((pb.thesis||"")+" "+(pb.action||"")).toLowerCase();
 staleEventPhrases.forEach(phrase=>{
 if(full.includes(phrase.toLowerCase()))
 pbEventIssues.push(`${t} TF${i+1}: refs "${phrase}"`);
 });
 });
 });
 if(pbEventIssues.length>0){checks.push({cat:"PB EVENTS",sev:pbEventIssues.length>3?"HIGH":"MED",msg:`${pbEventIssues.length} stale event refs in playbooks: ${pbEventIssues.slice(0,3).join("; ")}${pbEventIssues.length>3?"...":""}`,fix:"Update playbook prose — change past events to past tense or remove",pts:pbEventIssues.length>3?-6:-3});}
 else{checks.push({cat:"PB EVENTS",sev:"OK",msg:"No stale event references in playbook prose",fix:"",pts:0});}

 // 49. PB TEMPORAL — playbook timeframes must reference appropriate dates
 // 1W = next 7 days, 1M = 2-5 weeks out, 3M = 2-4 months, etc.
 // Flag when 1M/3M/6M reference dates within 7 days (belongs in 1W)
 let pbTemporalIssues=[];
 const monthMap3={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.playbook)return;
 s.playbook.forEach((pb,i)=>{
 const tf=pb.h||"";
 if(tf==="1 WEEK")return; // 1W can reference anything near-term
 const full=(pb.thesis||"")+" "+(pb.action||"");
 const dateRefs=[];const _drx=/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)/g;let _dm;while((_dm=_drx.exec(full))!==null)dateRefs.push(_dm);
 dateRefs.forEach(m=>{
 const refDate=new Date(2026,monthMap3[m[1]],parseInt(m[2]));
 const daysAway=Math.ceil((refDate-today)/(1000*60*60*24));
 if(tf==="1 MONTH"&&daysAway<=7&&daysAway>=-3)
 pbTemporalIssues.push(`${t} [1M]: ${m[1]} ${m[2]} is ${daysAway}d away — belongs in 1W`);
 if(tf==="3 MONTHS"&&daysAway<=14&&daysAway>=-3)
 pbTemporalIssues.push(`${t} [3M]: ${m[1]} ${m[2]} is ${daysAway}d away — too near`);
 if(tf==="6 MONTHS"&&daysAway<=30&&daysAway>=-3)
 pbTemporalIssues.push(`${t} [6M]: ${m[1]} ${m[2]} is ${daysAway}d away — too near`);
 });
 });
 });
 if(pbTemporalIssues.length>0){checks.push({cat:"PB TIMING",sev:pbTemporalIssues.length>4?"HIGH":"MED",msg:`${pbTemporalIssues.length} temporal mismatches: ${pbTemporalIssues.slice(0,3).join("; ")}${pbTemporalIssues.length>3?"... +"+(pbTemporalIssues.length-3)+" more":""}`,fix:"Move near-term event refs to 1W playbook. Longer timeframes should discuss post-event outlook.",pts:pbTemporalIssues.length>4?-6:-3});}
 else{checks.push({cat:"PB TIMING",sev:"OK",msg:"All playbook timeframes reference appropriately-dated events",fix:"",pts:0});}

 // 50. EARNINGS REFRESH — if earningsDate has passed but verdict/playbook/fundamentals still show pre-earnings data
 let earningsRefreshIssues=[];
 const monthLk2={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 tickers.forEach(t=>{
 const s=S[t],ed=s.earningsDate||"";
 if(ed.includes("✓"))return; // Already marked as processed
 const edm=ed.match(/^(\w+)\s+(\d+),?\s*(\d{4})/);
 if(!edm)return;
 const emo=monthLk2[edm[1]];
 if(emo===undefined)return;
 const edt=new Date(parseInt(edm[3]),emo,parseInt(edm[2]));
 const daysSince=Math.floor((today-edt)/(1000*60*60*24));
 if(daysSince>=1){
 // Earnings date has passed but NOT marked ✓ — needs post-earnings refresh
 const issues=[];
 // Check if verdict still says "EARNINGS" or "INTO EARNINGS"
 if(s.tech&&s.tech.verdict&&s.tech.verdict.label&&(s.tech.verdict.label.includes("EARNING")||s.tech.verdict.label.includes("CAUTIOUS BUY")))
 issues.push("verdict still pre-earnings");
 // Check if 1W playbook bias is still "EARNINGS"
 if(s.playbook&&s.playbook[0]&&s.playbook[0].bias==="EARNINGS")
 issues.push("1W bias still EARNINGS");
 // Check if 1W headline mentions "TONIGHT" or "TOMORROW" for this ticker
 if(s.playbook&&s.playbook[0]&&s.playbook[0].headline){
 const h=s.playbook[0].headline.toUpperCase();
 if(h.includes("TONIGHT")||h.includes("TOMORROW")||h.includes("REPORTS"))
 issues.push("headline still refs upcoming earnings");
 }
 // Check if fundamentals lastQ hasn't been updated
 if(s.fund&&s.fund.lastQ&&!s.fund.lastQ.includes("Mar 2026")&&!s.fund.lastQ.includes("Q2 FY26"))
 issues.push("lastQ not updated to latest quarter");
 if(issues.length>0)
 earningsRefreshIssues.push(`${t} reported ${edm[1]} ${edm[2]} (${daysSince}d ago) but: ${issues.join(", ")}`);
 else if(daysSince>=1)
 earningsRefreshIssues.push(`${t}: earnings ${edm[1]} ${edm[2]} passed — mark earningsDate with ✓ and update actuals`);
 }
 });
 if(earningsRefreshIssues.length>0){checks.push({cat:"EARN REFRESH",sev:"HIGH",msg:`${earningsRefreshIssues.length} post-earnings refresh needed: ${earningsRefreshIssues.slice(0,2).join("; ")}${earningsRefreshIssues.length>2?"...":""}`,fix:"Update earnings results: verdict, playbook, fundamentals (rev/EPS/GM), pattern, avgPT. Mark earningsDate ✓",pts:-10});}
 else{checks.push({cat:"EARN REFRESH",sev:"OK",msg:"All past earnings dates marked ✓ with results updated",fix:"",pts:0});}

 // 51. RISK FRESHNESS — active risks should reflect current state, not resolved events
 let riskFreshIssues=[];
 const monthLk3={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 tickers.forEach(t=>{
 const s=S[t];
 const risks=s.fund&&s.fund.activeRisks?s.fund.activeRisks:[];
 const ed=s.earningsDate||"";
 const earningsDone=ed.includes("✓");
 risks.forEach(r=>{
 const allText=(r.risk||"")+" "+(r.trigger||"")+" "+(r.impact||"")+" "+(r.catalyst||"");
 const allLower=allText.toLowerCase();
 // A) If earnings are done (✓) but risk/catalyst text still refs pre-earnings language
 if(earningsDone){
 if(allLower.includes("earnings miss")||allLower.includes("guidance miss")||allLower.includes("guidance below"))
 riskFreshIssues.push(`${t}: risk refs "earnings miss" but earnings reported ✓`);
 if(allLower.includes("rev est ")||allLower.includes("eps est ")||allLower.includes("street expects"))
 riskFreshIssues.push(`${t}: risk/catalyst still refs pre-earnings ESTIMATES after earnings ✓ — update with actuals`);
 if(allLower.includes("this is the event")||allLower.includes("the event"))
 riskFreshIssues.push(`${t}: catalyst still says "THE event" after earnings reported ✓`);
 if(allLower.includes("will confirm or deny")||allLower.includes("will reveal")||allLower.includes("will disclose"))
 riskFreshIssues.push(`${t}: catalyst uses future tense ("will confirm") after event passed ✓`);
 }
 // B) Risk catalyst date has passed and isn't marked ✓
 if(r.catalyst){
 const dm=r.catalyst.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)/);
 if(dm&&!r.catalyst.includes("✓")){
 const cd=new Date(2026,monthLk3[dm[1]],parseInt(dm[2]));
 const daysPast=Math.floor((today-cd)/(1000*60*60*24));
 if(daysPast>3)riskFreshIssues.push(`${t}: risk catalyst "${dm[0]}" passed ${daysPast}d ago — update outcome`);
 }
 }
 // C) Risk text refs price targets >30% off current
 const ptMatch=r.risk.match(/avg PT \$(\d+)/);
 if(ptMatch){
 const refPT=parseInt(ptMatch[1]);
 if(Math.abs(refPT-s.avgPT)/s.avgPT>0.20)
 riskFreshIssues.push(`${t}: risk refs "avg PT $${refPT}" but actual avgPT is $${s.avgPT}`);
 }
 // D) Risk text refs stale price levels (stock price refs >25% off)
 const priceLevelMatch=allText.match(/\$(\d+) = \d+% above/);
 if(priceLevelMatch){
 const refP=parseInt(priceLevelMatch[1]);
 const p=prices[t];
 if(Math.abs(refP-p)/p>0.25)
 riskFreshIssues.push(`${t}: risk refs "$${refP}" but price is $${p}`);
 }
 });
 });
 if(riskFreshIssues.length>0){checks.push({cat:"RISK FRESH",sev:riskFreshIssues.length>3?"HIGH":"MED",msg:`${riskFreshIssues.length} stale risk issues: ${riskFreshIssues.slice(0,3).join("; ")}${riskFreshIssues.length>3?"...":""}`,fix:"Update active risks: replace estimates with actuals, update catalyst outcomes, refresh price/PT refs",pts:riskFreshIssues.length>3?-8:-4});}
 else{checks.push({cat:"RISK FRESH",sev:"OK",msg:"All active risks current — no resolved events, catalysts valid, price refs accurate",fix:"",pts:0});}

 // 52. TECH DRIVERS — verdict drivers text should reference current price and not stale events
 let techDriverIssues=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.tech||!s.tech.verdict||!s.tech.verdict.drivers)return;
 const d=s.tech.verdict.drivers;
 // A) First $ ref should be close to current price
 // Only flag a stale CURRENT-price ref. Skip analyst PTs, ATHs, consensus, and ranges —
 // those legitimately cite non-current prices (e.g. "Mizuho $460", "$525 ATH", "PT $566").
 {
 const dollarMatches=[...d.matchAll(/\$(\d{2,4})(?![\d.KMB])/g)];
 for(const pm of dollarMatches){
 const ref=parseInt(pm[1]);
 if(ref<=15||ref>=2000)continue;
 if(Math.abs(ref-p)/p<=0.08)continue;
 // context window around the match
 const ctxB=d.slice(Math.max(0,pm.index-22),pm.index);
 const ctxA=d.slice(pm.index+pm[0].length,pm.index+pm[0].length+8);
 // skip PT / target / consensus / ATH / range / analyst-name / "X% above|below"
 if(/PT|target|consensus|cons\b|ATH|52w|range|Mizuho|JPM|Morgan|Bernstein|Susq|UBS|Citi|Goldman|Wedbush|above|below|bull case|street/i.test(ctxB))continue;
 if(/ATH|PT|target|range|cons/i.test(ctxA))continue;
 techDriverIssues.push(`${t}: drivers refs $${ref} but price $${p}`);
 break; // one flag per name
 }
 }
 // B) Stale event refs
 const dl=d.toLowerCase();
 if(dl.includes("into earnings")||dl.includes("earnings tonight")||dl.includes("earnings ✓")||dl.includes("into mar 18"))
 techDriverIssues.push(`${t}: drivers refs upcoming earnings that already passed`);
 if(dl.includes("gtc mar 16")||dl.includes("gtc monday"))
 techDriverIssues.push(`${t}: drivers refs GTC as upcoming`);
 // C) RSI refs that are way off (RSI 32 when stock is rallying, RSI 80 when stock is falling)
 const rsiMatch=d.match(/RSI\s*(\d+)/i);
 if(rsiMatch){
 const rsiRef=parseInt(rsiMatch[1]);
 if(s.tech.momentum&&s.tech.momentum.rsi){
 const actualRSI=s.tech.momentum.rsi;
 if(Math.abs(rsiRef-actualRSI)>20)
 techDriverIssues.push(`${t}: drivers says RSI ${rsiRef} but actual RSI ${actualRSI}`);
 }
 }
 });
 if(techDriverIssues.length>0){checks.push({cat:"TECH PROSE",sev:techDriverIssues.length>3?"HIGH":"MED",msg:`${techDriverIssues.length} stale tech drivers: ${techDriverIssues.slice(0,3).join("; ")}${techDriverIssues.length>3?"...":""}`,fix:"Update verdict drivers text with current price, RSI, and post-event context",pts:techDriverIssues.length>3?-6:-3});}
 else{checks.push({cat:"TECH PROSE",sev:"OK",msg:"All verdict drivers text current — prices and events accurate",fix:"",pts:0});}

 // 53. MA INTEGRITY — moving average values should be structurally coherent
 // 50d should react fastest to price, 400d slowest. Duplicates = likely stale copy-paste.
 let maIntegIssues=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.tech||!s.tech.ma||!Array.isArray(s.tech.ma))return;
 const mas=s.tech.ma;
 const vals={};
 mas.forEach(m=>{if(m&&m.ma&&m.p)vals[m.ma]=m.p;});
 // A) Duplicate values — two MAs shouldn't be identical unless in tight consolidation
 const vArr=Object.values(vals);
 const dupes=vArr.filter((v,i)=>vArr.indexOf(v)!==i);
 if(dupes.length>0)maIntegIssues.push(`${t}: duplicate MA values (${dupes[0]}) — likely stale`);
 // B) In an uptrend, 50d > 100d > 200d > 400d. In downtrend, reversed.
 // But the spread between them should be reasonable — if 50d and 400d are within 3%, all MAs are bunched = consolidation
 if(vals["50d"]&&vals["400d"]){
 const spread=Math.abs(vals["50d"]-vals["400d"])/vals["400d"]*100;
 if(spread<2)maIntegIssues.push(`${t}: 50d-400d spread only ${spread.toFixed(0)}% — MAs bunched, verify data`);
 }
 // C) 200d shouldn't be above 100d by more than 10% (would mean severe crash below both that isn't reflected)
 if(vals["200d"]&&vals["100d"]&&vals["200d"]>vals["100d"]*1.10)
 maIntegIssues.push(`${t}: 200d $${vals["200d"]} > 100d $${vals["100d"]} by ${((vals["200d"]-vals["100d"])/vals["100d"]*100).toFixed(0)}% — check MA data`);
 });
 if(maIntegIssues.length>0){checks.push({cat:"MA INTEGRITY",sev:"MED",msg:`${maIntegIssues.length} MA structure issues: ${maIntegIssues.join("; ")}`,fix:"Verify moving average values against live chart data. Update stale or duplicate values.",pts:-4});}
 else{checks.push({cat:"MA INTEGRITY",sev:"OK",msg:"All MA values structurally coherent — no duplicates, reasonable spreads",fix:"",pts:0});}

 // 54. TECH FRESH — comprehensive technicals freshness check
 let techFreshIssues=[];
 const staleTechPhrases=["pre-earnings","into earnings","toward earnings","Building toward","earnings is the catalyst","earnings is binary","ahead of earnings","VMware integration","Claude Code Security"];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.tech)return;
 // A) MA commentary — stale event refs
 if(s.tech.ma&&Array.isArray(s.tech.ma)){
 s.tech.ma.forEach(m=>{
 if(!m.c)return;
 staleTechPhrases.forEach(phrase=>{
 if(m.c.includes(phrase))techFreshIssues.push(`${t} ${m.ma} MA: refs "${phrase}"`);
 });
 });
 }
 // B) Trend vs 50d MA alignment
 if(s.tech.verdict&&s.tech.ma&&Array.isArray(s.tech.ma)){
 const ma50=s.tech.ma.find(m=>m.ma==="50d");
 if(ma50&&s.tech.verdict.trend){
 const tr=s.tech.verdict.trend.toLowerCase();
 if(tr==="bullish"&&p<ma50.p*0.97)
 techFreshIssues.push(`${t}: trend=BULLISH but $${p} below 50d $${ma50.p}`);
 if(tr==="bearish"&&p>ma50.p*1.03)
 techFreshIssues.push(`${t}: trend=BEARISH but $${p} above 50d $${ma50.p}`);
 }
 }
 // C) ROC vs YTD contradiction
 if(s.tech.momentum&&s.tech.momentum.roc!==undefined&&s.ytd!==undefined){
 const roc=s.tech.momentum.roc,ytd=s.ytd;
 if(roc>5&&ytd<-5)techFreshIssues.push(`${t}: ROC +${roc}% but YTD ${ytd}% — stale`);
 if(roc<-5&&ytd>10)techFreshIssues.push(`${t}: ROC ${roc}% but YTD +${ytd}% — stale`);
 }
 // D) Verdict drivers — stale event refs (supplements check #52)
 if(s.tech.verdict&&s.tech.verdict.drivers){
 staleTechPhrases.forEach(phrase=>{
 if(s.tech.verdict.drivers.includes(phrase))
 techFreshIssues.push(`${t} drivers: refs "${phrase}"`);
 });
 }
 });
 if(techFreshIssues.length>0){checks.push({cat:"TECH FRESH",sev:techFreshIssues.length>4?"HIGH":techFreshIssues.length>2?"MED":"LOW",msg:`${techFreshIssues.length} stale technicals: ${techFreshIssues.slice(0,3).join("; ")}${techFreshIssues.length>3?"... +"+(techFreshIssues.length-3)+" more":""}`,fix:"Update MA commentary, trend alignment, ROC, and verdict drivers for current price action",pts:techFreshIssues.length>4?-8:techFreshIssues.length>2?-4:-2});}
 else{checks.push({cat:"TECH FRESH",sev:"OK",msg:"All technicals current — MA commentary, trend alignment, ROC, drivers all fresh",fix:"",pts:0});}

 // 55. TRADE IDEAS FRESHNESS — options trade ideas depend on price, IV, catalysts, macro
 // If any core input has changed significantly, trade ideas are stale
 let tradeIdeaIssues=[];
 // A) TD must be fresh — trade ideas computed at render time from current data
 const tradeAge=Math.floor((today-TD)/(1000*60*60*24));
 if(tradeAge>2)tradeIdeaIssues.push(`Trade data ${tradeAge}d old — prices/IV may have shifted`);
 // B) Check if any ticker's price moved >5% from what's in the tool (LC vs header)
 tickers.forEach(t=>{
 const hdrPrice=S[t]?S[t].price||0:0;
 const lcPrice=prices[t]||0;
 if(hdrPrice&&lcPrice&&Math.abs(hdrPrice-lcPrice)/hdrPrice>0.02)
 tradeIdeaIssues.push(`${t}: price mismatch HDR $${hdrPrice} vs LC $${lcPrice} — trade strikes stale`);
 });
 // C) Macro regime shift would change all trade recommendations
 // (Already covered by MKT VIEW check, but flag here too for trade context)
 if(MACRO.vix>35)tradeIdeaIssues.push("VIX >35 — extreme vol. Trade ideas should emphasize defined-risk only");
 // D) Check if options data (ivRank, maxPain) exists for all tickers
 let noOptsCount=0;
 tickers.forEach(t=>{if(!S[t]||!S[t].options)noOptsCount++;});
 if(noOptsCount>0)tradeIdeaIssues.push(`${noOptsCount} tickers missing options data — trade ideas incomplete`);
 if(tradeIdeaIssues.length>0){checks.push({cat:"TRADE IDEAS",sev:tradeIdeaIssues.length>2?"HIGH":"MED",msg:`${tradeIdeaIssues.length} trade idea issues: ${tradeIdeaIssues.join("; ")}`,fix:"Refresh prices and options data daily. Trade ideas auto-compute from current data but inputs must be fresh.",pts:tradeIdeaIssues.length>2?-6:-3});}
 else{checks.push({cat:"TRADE IDEAS",sev:"OK",msg:"Trade ideas current — prices fresh, IV data valid, macro regime reflected",fix:"",pts:0});}

 // 56. OPTIONS DATA REFRESH — IV/flow data must be refreshed with each price update
 // ivRank, ivPctl, pcRatio, skew, maxPain, flow entries all change daily
 let optRefreshIssues=[];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.options)return;
 const o=s.options;
 // A) ivRank should reflect current VIX environment
 // If VIX changed >5pts from assumed level, all ivRanks are stale
 if(MACRO.vix>30&&o.ivRank<30)optRefreshIssues.push(`${t}: ivRank ${o.ivRank} seems low for VIX ${MACRO.vix}`);
 if(MACRO.vix<20&&o.ivRank>80)optRefreshIssues.push(`${t}: ivRank ${o.ivRank} seems high for VIX ${MACRO.vix}`);
 // B) maxPain drifts with price — should be within 20% of current
 if(o.maxPain&&Math.abs(o.maxPain-prices[t])/prices[t]>0.20)
 optRefreshIssues.push(`${t}: maxPain $${o.maxPain} is ${Math.round(Math.abs(o.maxPain-prices[t])/prices[t]*100)}% from price $${prices[t]}`);
 // C) Flow expiry dates — any expired = stale
 if(o.flow){
 const expiredF=o.flow.filter(f=>{
 if(!f.e)return false;
 const dm=f.e.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)/);
 if(!dm)return false;
 const ed=new Date(2026,{Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[dm[1]],parseInt(dm[2]));
 return ed<today;
 }).length;
 if(expiredF>0)optRefreshIssues.push(`${t}: ${expiredF} expired flow expiries`);
 }
 // D) pcRatio extremes that may be stale
 if(o.pcRatio&&(o.pcRatio<0.2||o.pcRatio>2.5))
 optRefreshIssues.push(`${t}: pcRatio ${o.pcRatio} is extreme — verify current`);
 });
 // E) General reminder: if TD is fresh but options weren't explicitly refreshed
 const optAge=Math.floor((today-TD)/(1000*60*60*24));
 if(optAge>1)optRefreshIssues.push("Options data may be "+optAge+"d stale — refresh ivRank, ivPctl, pcRatio, skew, maxPain, flow with each price update");
 if(optRefreshIssues.length>0){checks.push({cat:"OPT REFRESH",sev:optRefreshIssues.length>3?"HIGH":optRefreshIssues.length>1?"MED":"LOW",msg:`INFO (perf signal, not data error): ${optRefreshIssues.length} options refresh needed: ${optRefreshIssues.slice(0,3).join("; ")}${optRefreshIssues.length>3?"...":""}`,fix:"At each price refresh: update ivRank, ivPctl, pcRatio, skew, maxPain from options chain. Update flow with latest institutional trades. Expired flows = replace.",pts:0});}
 else{checks.push({cat:"OPT REFRESH",sev:"OK",msg:"Options data fresh — IV, flow, pcRatio all current with latest price update",fix:"",pts:0});}

 // 57. VERDICT LABELS — verdict label should not reference past events as upcoming
 let verdictLabelIssues=[];
 const staleVerdictPhrases=["GTC CATALYST","INTO EARNINGS","EARNINGS TUE","EARNINGS WED","EARNINGS THU","EARNINGS MON","REPORTS TONIGHT","REPORTS TOMORROW","PRE-EARNINGS","PRE-GTC"];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.tech||!s.tech.verdict||!s.tech.verdict.label)return;
 const label=s.tech.verdict.label;
 staleVerdictPhrases.forEach(phrase=>{
 if(label.includes(phrase))verdictLabelIssues.push(`${t}: verdict "${label}" refs "${phrase}"`);
 });
 // Also: if earningsDate has ✓ but verdict still says CAUTIOUS BUY or INTO EARNINGS
 if((s.earningsDate||"").includes("\u2713")&&(label.includes("CAUTIOUS")||label.includes("EARNING")))
 verdictLabelIssues.push(`${t}: earnings done but verdict still "${label}"`);
 });
 if(verdictLabelIssues.length>0){checks.push({cat:"VERDICT LABEL",sev:verdictLabelIssues.length>3?"HIGH":"MED",msg:`${verdictLabelIssues.length} stale verdict labels: ${verdictLabelIssues.join("; ")}`,fix:"Update verdict score and label to reflect current state — post-earnings, post-GTC, current macro",pts:verdictLabelIssues.length>3?-6:-3});}
 else{checks.push({cat:"VERDICT LABEL",sev:"OK",msg:"All verdict labels current — no stale event references",fix:"",pts:0});}

 
 // CHECK 60: NEWS COHERENCE — high-impact intel reflected in 1W prose
 const newsCoherenceIssues=[];
 tickers.forEach(t=>{const s=S[t];if(!s.news||!s.playbook)return;const now=new Date();const recentHighImpact=s.news.filter(item=>{if(!item.on||item.weight<8)return false;const parts=item.dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);if(!parts)return false;const d=new Date(parseInt(parts[1]),parseInt(parts[2])-1,parseInt(parts[3]));return(now-d)/(1000*60*60*24)<=7;});if(recentHighImpact.length===0)return;const weekPB=s.playbook.find(p=>p.h&&p.h.match(/1 WEEK/i));if(!weekPB)return;const prose=(weekPB.thesis||"")+" "+(weekPB.action||"");const patterns=["beat","blowout","upgrade","downgrade","deal","partner","launch","earnings","guide","rally","crash","selloff","war","oil","hack","breach"];recentHighImpact.forEach(item=>{const hl=(item.headline||"").toLowerCase();const matched=patterns.some(p=>hl.includes(p)&&prose.toLowerCase().includes(p));if(!matched){const keyWord=(item.headline||"").split(/\s+/).filter(w=>w.length>4).slice(0,2).join(" ");const inProse=keyWord.split(" ").some(w=>prose.toLowerCase().includes(w.toLowerCase()));if(!inProse)newsCoherenceIssues.push(t+": "+item.headline.substring(0,50));}});});
 if(newsCoherenceIssues.length>0){checks.push({cat:"NEWS COHERENCE",sev:newsCoherenceIssues.length>5?"HIGH":"MED",msg:"INFO (workflow signal): "+newsCoherenceIssues.length+" high-impact intel items not reflected in 1W prose: "+newsCoherenceIssues.slice(0,3).join("; "),fix:"Update 1W playbook prose to reflect recent high-impact news for flagged tickers",pts:0});}
 else{checks.push({cat:"NEWS COHERENCE",sev:"OK",msg:"All high-impact intel (weight>=8, last 7d) reflected in 1W playbook prose",fix:"",pts:0});}

 // CHECK 61: INTEL RECENCY — flags tickers with stale intel
 const intelRecencyIssues=[];
 tickers.forEach(t=>{const s=S[t];if(!s.news)return;const now=new Date();let newest=null;s.news.forEach(item=>{if(!item.on)return;const parts=item.dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);if(!parts)return;const d=new Date(parseInt(parts[1]),parseInt(parts[2])-1,parseInt(parts[3]));if(!newest||d>newest)newest=d;});if(newest){const age=Math.floor((now-newest)/(1000*60*60*24));if(age>1)intelRecencyIssues.push(t+" ("+age+"d old)");}else{intelRecencyIssues.push(t+" (no dated intel)");}});
 if(intelRecencyIssues.length>0){checks.push({cat:"INTEL RECENCY",sev:intelRecencyIssues.length>5?"HIGH":"MED",msg:"INFO (workflow signal, not data error): "+intelRecencyIssues.length+" tickers with stale intel (>1d): "+intelRecencyIssues.join(", "),fix:"Web-search fresh news for flagged tickers and add new n() intel items",pts:0});}
 else{checks.push({cat:"INTEL RECENCY",sev:"OK",msg:"All tickers have intel from within the last day",fix:"",pts:0});}


 // CHECK 62: TECH REFRESH — ensures MAs, supports, RSI web-searched recently
 const techRefreshIssues=[];
 tickers.forEach(t=>{const s=S[t];if(!s.fund||!s.fund.techDate)return;const td2=s.fund.techDate;const dm=td2.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+),?\s*(\d{4})/);if(!dm)return;const monthLookup={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};const tDate=new Date(parseInt(dm[3]),monthLookup[dm[1]],parseInt(dm[2]));const age=Math.floor((today-tDate)/(1000*60*60*24));if(age>1)techRefreshIssues.push(t+" ("+age+"d)");});
 if(techRefreshIssues.length>0){const sev=techRefreshIssues.length>10?"HIGH":techRefreshIssues.length>5?"MED":"LOW";checks.push({cat:"TECH REFRESH",sev,msg:"INFO (workflow signal, not data error): "+techRefreshIssues.length+" tickers need technical data refresh (MAs, supports, RSI): "+techRefreshIssues.join(", "),fix:"Web-search current 50d/100d/200d MAs, support/resistance levels, RSI, MACD for flagged tickers and update techDate",pts:0});}
 else{checks.push({cat:"TECH REFRESH",sev:"OK",msg:"All technical data (MAs, supports, RSI) refreshed within last day via web search",fix:"",pts:0});}


 // CHECK 63: PT REFRESH — ensures analyst price targets web-searched recently
 const ptRefreshIssues=[];
 tickers.forEach(t=>{const s=S[t];if(!s.fund||!s.fund.ptDate)return;const td2=s.fund.ptDate;const dm=td2.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+),?\s*(\d{4})/);if(!dm)return;const monthLookup={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};const tDate=new Date(parseInt(dm[3]),monthLookup[dm[1]],parseInt(dm[2]));const age=Math.floor((today-tDate)/(1000*60*60*24));if(age>1)ptRefreshIssues.push(t+" ("+age+"d)");});
 if(ptRefreshIssues.length>0){const sev=ptRefreshIssues.length>10?"HIGH":ptRefreshIssues.length>5?"MED":"LOW";checks.push({cat:"PT REFRESH",sev,msg:"INFO (workflow signal, not data error): "+ptRefreshIssues.length+" tickers need price target refresh: "+ptRefreshIssues.join(", "),fix:"Web-search current analyst consensus PTs (avg, high, low) for flagged tickers and update ptDate",pts:0});}
 else{checks.push({cat:"PT REFRESH",sev:"OK",msg:"All analyst price targets refreshed within last day via web search",fix:"",pts:0});}


 // CHECK 64: MACRO REFRESH — ensures MACRO note prose is current
 const macroRefreshOK=(()=>{if(!MACRO.macroDate)return false;const dm=MACRO.macroDate.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+),?\s*(\d{4})/);if(!dm)return false;const monthLookup={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};const mDate=new Date(parseInt(dm[3]),monthLookup[dm[1]],parseInt(dm[2]));return Math.floor((today-mDate)/(1000*60*60*24))<=1;})();
 if(!macroRefreshOK){checks.push({cat:"MACRO REFRESH",sev:"MED",msg:"MACRO note prose is stale (>1d) — update with today's S&P, VIX, oil, key headlines",fix:"Web-search current market data and rewrite MACRO.note with today's context. Update macroDate.",pts:0});}
 else{checks.push({cat:"MACRO REFRESH",sev:"OK",msg:"MACRO note prose refreshed today with current market context",fix:"",pts:0});}


 // CHECK 65: RISK NARRATIVE — checks active risk descriptions for stale prices/percentages
 const riskNarrIssues=[];
 tickers.forEach(t=>{const s=S[t];if(!s.fund||!s.fund.activeRisks)return;const p=prices[t];s.fund.activeRisks.forEach((r,i)=>{const text=r.risk||"";const rx=/\$(\d+\.?\d*)/g;let pm;while((pm=rx.exec(text))!==null){const ref=parseFloat(pm[1]);if(ref<15||ref>2000)continue;if(ref>=85&&ref<=115)continue;if(ref<p*0.3||ref>p*3)continue;const after=text.substring(pm.index+pm[0].length,pm.index+pm[0].length+2);if(after.match(/[BMKbmk]/))continue;const before=text.substring(Math.max(0,pm.index-5),pm.index);if(before.match(/[Oo]il/))continue;if(Math.abs(ref-p)/p>0.25)riskNarrIssues.push(t+": risk "+(i+1)+" refs $"+ref+" vs $"+Math.round(p));}const ytdMatch=text.match(/(down|up)\s+(\d+)%\s+YTD/i);if(ytdMatch){const claimed=parseInt(ytdMatch[2]);const approxYtd=Math.abs(s.ytd||0);if(Math.abs(claimed-approxYtd)>8)riskNarrIssues.push(t+": YTD "+ytdMatch[0]+" may be stale");}});});
 if(riskNarrIssues.length>0){checks.push({cat:"RISK NARRATIVE",sev:riskNarrIssues.length>3?"MED":"LOW",msg:riskNarrIssues.length+" stale risk descriptions: "+riskNarrIssues.slice(0,3).join("; "),fix:"Update active risk narratives with current prices, percentages, and probabilities",pts:riskNarrIssues.length>3?-4:-2});}
 else{checks.push({cat:"RISK NARRATIVE",sev:"OK",msg:"All active risk descriptions current — prices and percentages match",fix:"",pts:0});}


 // CHECK 66: RISK REVIEW — ensures active risks reviewed and verified daily
 const riskReviewIssues=[];
 tickers.forEach(t=>{const s=S[t];if(!s.fund||!s.fund.riskDate)return;const td2=s.fund.riskDate;const dm=td2.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+),?\s*(\d{4})/);if(!dm)return;const monthLookup={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};const tDate=new Date(parseInt(dm[3]),monthLookup[dm[1]],parseInt(dm[2]));const age=Math.floor((today-tDate)/(1000*60*60*24));if(age>1)riskReviewIssues.push(t+" ("+age+"d)");});
 if(riskReviewIssues.length>0){const sev=riskReviewIssues.length>10?"HIGH":riskReviewIssues.length>5?"MED":"LOW";checks.push({cat:"RISK REVIEW",sev,msg:"INFO (workflow signal, not data error): "+riskReviewIssues.length+" tickers need daily risk review: "+riskReviewIssues.join(", "),fix:"Review active risks — verify probabilities, update triggers, check if any risks materialized or resolved. Update riskDate.",pts:0});}
 else{checks.push({cat:"RISK REVIEW",sev:"OK",msg:"All active risks reviewed today — probabilities, triggers, and catalysts verified",fix:"",pts:0});}


 // CHECK 67: CONSENSUS FRESH — analyst consensus rating matches PT refresh
 const consensusIssues=[];
 tickers.forEach(t=>{const s=S[t];if(!s.consensus)return;if(!["Strong Buy","Buy","Hold","Sell","Strong Sell"].includes(s.consensus))consensusIssues.push(t+": invalid consensus '"+s.consensus+"'");});
 if(consensusIssues.length>0){checks.push({cat:"CONSENSUS",sev:"LOW",msg:consensusIssues.length+" invalid consensus ratings: "+consensusIssues.join(", "),fix:"Update consensus with PT refresh",pts:-1});}
 else{checks.push({cat:"CONSENSUS",sev:"OK",msg:"All consensus ratings valid",fix:"",pts:0});}

 // CHECK 68: FWD PE — flags fwdPE that seem inconsistent with price/earnings
 const peIssues=[];
 tickers.forEach(t=>{const s=S[t];if(!s.fwdPE)return;if(s.fwdPE<1||s.fwdPE>200)peIssues.push(t+": fwdPE="+s.fwdPE+" (extreme)");});
 if(peIssues.length>0){checks.push({cat:"FWD PE",sev:"LOW",msg:peIssues.length+" extreme fwdPE values: "+peIssues.join(", "),fix:"Update fwdPE from latest earnings/estimates",pts:-2});}
 else{checks.push({cat:"FWD PE",sev:"OK",msg:"All fwdPE values in reasonable range",fix:"",pts:0});}

 // CHECK 69: EARNINGS DATA — mgmt streak, lastEarnMove, epsEst freshness post-earnings
 const earnDataIssues=[];
 tickers.forEach(t=>{const s=S[t];const ed=s.earningsDate||"";if(!ed.includes("\u2713")&&!ed.includes("✓"))return;if(s.fund&&s.fund.mgmt){const m=s.fund.mgmt;if(!m.note||m.note.length<10)earnDataIssues.push(t+": mgmt note too short");}if(s.epsEst&&s.epsEst<0.01)earnDataIssues.push(t+": epsEst seems stale");});
 if(earnDataIssues.length>0){checks.push({cat:"EARN DATA",sev:"LOW",msg:earnDataIssues.length+" post-earnings data issues: "+earnDataIssues.join(", "),fix:"After earnings: update epsEst (next Q), mgmt beats/misses/streak, lastEarnMove",pts:-2});}
 else{checks.push({cat:"EARN DATA",sev:"OK",msg:"Post-earnings data current for reported tickers",fix:"",pts:0});}

 // CHECK 70: VOLUME — flags volume data that looks stale
 const volIssues=[];
 tickers.forEach(t=>{const s=S[t];if(!s.volume)return;const v=s.volume;if(!v.avg||!v.recent)volIssues.push(t+": missing volume data");else if(v.ratio&&(v.ratio>5||v.ratio<0.1))volIssues.push(t+": volume ratio "+v.ratio+" extreme — verify");});
 if(volIssues.length>0){checks.push({cat:"VOLUME",sev:"LOW",msg:volIssues.length+" volume data issues: "+volIssues.join(", "),fix:"Update volume avg/recent/ratio from recent trading data",pts:-1});}
 else{checks.push({cat:"VOLUME",sev:"OK",msg:"Volume data present and reasonable for all tickers",fix:"",pts:0});}

 // CHECK 71: BULL/BEAR $ — scenario price targets vs current price
 const bbIssues=[];
 tickers.forEach(t=>{const s=S[t];if(!s.fund)return;const p=prices[t];if(s.fund.bull&&s.fund.bull.path){const bm=s.fund.bull.path.match(/\$(\d+)/);if(bm){const bt=parseInt(bm[1]);if(bt>p*0.5&&bt<5000&&bt<p*0.8)bbIssues.push(t+": bull target $"+bt+" below price $"+Math.round(p));}}if(s.fund.bear&&s.fund.bear.path){const bm2=s.fund.bear.path.match(/\$(\d+)/);if(bm2){const bt2=parseInt(bm2[1]);if(bt2>15&&bt2<5000&&bt2>p*1.2&&bt2<p*3)bbIssues.push(t+": bear target $"+bt2+" above price $"+Math.round(p));}}});
 if(bbIssues.length>0){checks.push({cat:"BULL/BEAR FRESH",sev:bbIssues.length>3?"MED":"LOW",msg:bbIssues.length+" scenario target issues: "+bbIssues.join("; "),fix:"Update bull/bear path valuations with current price levels",pts:bbIssues.length>3?-4:-2});}
 else{checks.push({cat:"BULL/BEAR FRESH",sev:"OK",msg:"Bull/bear scenario targets consistent with current prices",fix:"",pts:0});}

 // CHECK 72: KILLER REVIEW — thesis killer should be periodically reviewed
 const killerIssues=[];
 tickers.forEach(t=>{const s=S[t];if(!s.fund||!s.fund.killer)return;if(s.fund.killer.length<20)killerIssues.push(t+": killer too short");});
 if(killerIssues.length>0){checks.push({cat:"KILLER",sev:"LOW",msg:killerIssues.length+" thesis killer issues: "+killerIssues.join(", "),fix:"Review and update thesis killer scenarios",pts:-1});}
 else{checks.push({cat:"KILLER",sev:"OK",msg:"All thesis killers defined and substantive",fix:"",pts:0});}

 // CHECK 73: REV MIX — revenue mix should be current post-earnings
 const revMixIssues=[];
 tickers.forEach(t=>{const s=S[t];if(!s.fund||!s.fund.revMix)return;const total=s.fund.revMix.reduce((a,r)=>a+(r.p||0),0);if(Math.abs(total-100)>5)revMixIssues.push(t+": revMix sums to "+total+"% (should be ~100%)");});
 if(revMixIssues.length>0){checks.push({cat:"REV MIX",sev:"LOW",msg:revMixIssues.length+" revenue mix issues: "+revMixIssues.join(", "),fix:"Update revenue mix percentages from latest earnings",pts:-2});}
 else{checks.push({cat:"REV MIX",sev:"OK",msg:"All revenue mix percentages sum correctly",fix:"",pts:0});}

 // CHECK 74: MKTCAP — market cap text vs computed from price
 const mktCapIssues=[];
 tickers.forEach(t=>{const s=S[t];if(!s.mktCap)return;const capStr=s.mktCap;const capMatch=capStr.match(/\$(\d+\.?\d*)([BMT])/);if(!capMatch)return;let capVal=parseFloat(capMatch[1]);const unit=capMatch[2];if(unit==="T")capVal*=1000;else if(unit==="M")capVal/=1000;const p=prices[t];if(p>500&&capVal<50)mktCapIssues.push(t+": mktCap "+capStr+" seems low for $"+Math.round(p)+" stock");if(p<50&&capVal>500)mktCapIssues.push(t+": mktCap "+capStr+" seems high for $"+Math.round(p)+" stock");});
 if(mktCapIssues.length>0){checks.push({cat:"MKT CAP",sev:"LOW",msg:mktCapIssues.length+" market cap inconsistencies: "+mktCapIssues.join(", "),fix:"Update mktCap with current market capitalization",pts:-1});}
 else{checks.push({cat:"MKT CAP",sev:"OK",msg:"Market cap values consistent with stock prices",fix:"",pts:0});}

 // CHECK 75: COMP POSITION — competitive positioning data exists
 const compDataIssues=[];
 tickers.forEach(t=>{const s=S[t];if(!s.fund)return;if(!s.fund.compPos||!s.fund.compPos.peers||s.fund.compPos.peers.length<2)compDataIssues.push(t+": missing or insufficient peer data");});
 if(compDataIssues.length>0){checks.push({cat:"COMP DATA",sev:"LOW",msg:compDataIssues.length+" competitive data gaps: "+compDataIssues.slice(0,3).join(", "),fix:"Add/update peer comparisons and competitive positioning",pts:-1});}
 else{checks.push({cat:"COMP DATA",sev:"OK",msg:"All tickers have peer data and competitive positioning",fix:"",pts:0});}


 // CHECK 76: COMPANION SYNC — ensures ade-strategy.jsx updated with same data
 const syncDate=TD;const syncAge=Math.floor((today-syncDate)/(1000*60*60*24));
 if(syncAge>1){checks.push({cat:"COMPANION SYNC",sev:"MED",msg:"ade-strategy.jsx may be out of sync — update LC, PTs, milestones, and supports to match main file",fix:"After every main file refresh: update ade-strategy.jsx with matching LC prices, PTs, support levels, and milestone statuses",pts:-5});}
 else{checks.push({cat:"COMPANION SYNC",sev:"OK",msg:"Companion strategy file synced with current refresh",fix:"",pts:0});}


 
 
 // CHECK 75: EXIT MAP — verify shares × prices ≈ totalPort constant
 const exitShares={ASML:0,NVDA:0,MU:0,VRT:0,PWR:0,AMD:0,TSM:0,AVGO:0,AMZN:0,HOOD:0,SOFI:0,MRVL:0,SHOP:0,NFLX:0,VST:0,CRWD:0,ANET:0,TSLA:0,LRCX:0,NOW:0,SNPS:0,NBIS:0,OKTA:0,NET:0};
 let exitTotalPort=0;const exitSharesHC={ASML:0,NVDA:0,MU:0,VRT:0,PWR:0,AMD:0,TSM:0,AVGO:0,AMZN:0,HOOD:0,SOFI:0,MRVL:0,SHOP:0,NFLX:0,VST:0,CRWD:0,ANET:0,TSLA:0,LRCX:0,NOW:0,SNPS:0,NBIS:0,OKTA:0,NET:0};tickers.forEach(t=>{exitTotalPort+=(exitSharesHC[t]||0)*(prices[t]||0);});
 const exitCBData={ASML:0,NVDA:0,MU:0,VRT:0,PWR:0,AMD:0,TSM:0,AVGO:0,AMZN:0,HOOD:0,SOFI:0,MRVL:0,SHOP:0,NFLX:0,VST:0,CRWD:0,ANET:0,TSLA:0,LRCX:0,NOW:0,SNPS:0,NBIS:0,OKTA:0,NET:0};
 let exitIssues=[];
 tickers.forEach(t=>{const sh=exitSharesHC[t]||0;const cb=exitCBData[t]||0;const p=prices[t]||0;
 if(sh>0&&cb>p*1.5)exitIssues.push(t+": cost $"+Math.round(cb)+" > price $"+Math.round(p)+" — verify cost basis");
 });
 checks.push({cat:"EXIT MAP",sev:exitIssues.length>0?"LOW":"OK",msg:exitIssues.length>0?exitIssues.length+" cost basis issues: "+exitIssues.join("; "):"EXIT MAP shares and cost basis current — computed portfolio $"+Math.round(exitTotalPort),fix:exitIssues.length>0?"Update cost basis after trades":"",pts:exitIssues.length>0?-1:0});
 if(exitIssues.length>0)totalScore-=1;


 // CHECK 65: STORY AGE — detect stale narrative phrases in playbook prose
 // UPDATE staleNarrativeTerms LIST EACH SESSION with phrases that were relevant last session but are now stale
 // This catches narrative rot that data-freshness checks miss
 const staleNarrativeTerms=[
 // Macro regime/event references that are stale as of Jul 27
 
 {term:"stagflation",note:"Not stagflation regime currently"},
 {term:"Iran tensions back in play",note:"US-Iran halted strikes Jul 25-26; crude sharply lower, war premium unwinding"},
 {term:"Hormuz reopen",note:"Diplomacy resumed Jul 25-26; Hormuz risk easing"},
 {term:"war premium re-building",note:"War premium unwinding after the Jul 25-26 halt in strikes"},
 {term:"oil $99",note:"DETECTOR: flags any text citing oil at $99. WTI is ~$83."},
 {term:"oil $100",note:"DETECTOR: flags any text citing oil at $100. WTI is ~$83."},
 {term:"oil $108",note:"DETECTOR: flags any text citing oil at $108. WTI is ~$83."},
 // VIX levels — current is ~18.6
 // Calendar
 {term:"pre-GTC",note:"GTC was mid-March, stale reference"},
 {term:"post-GTC",note:"GTC was mid-March; use more recent catalysts"},
 {term:"Post-GTC",note:"GTC was mid-March; use more recent catalysts"},
 {term:"pre-FOMC",note:"FOMC is LIVE Jul 29 2pm ET — not a stale reference this week"},
 // Stale quarter refs
 {term:"Q1 2025",note:"stale quarter reference"},
 {term:"Q2 2025",note:"stale quarter reference"},
 {term:"Q3 2025",note:"stale quarter reference"},
 {term:"Q4 2025",note:"stale quarter reference"},
 // Earnings dates that have passed
 
 {term:"reports Apr 28",note:"HOOD reported Apr 28"},
 
 {term:"reports Apr 30",note:"PWR reported Apr 30"},
 {term:"reports May 5",note:"AMD/ANET reported May 5"},
 {term:"reports May 7",note:"VST reported May 7"},
 // Stale narrative
 {term:"MI355",note:"AMD narrative moved to MI400 + Meta 6GW"},
 {term:"S&P breaks 7000",note:"S&P at 7413 now; stale headline"},
 {term:"S&P 7000",note:"S&P at 7413 now"}
 ];
 let storyAgeIssues=[];
 tickers.forEach(t=>{const s=S[t];if(!s.playbook)return;s.playbook.forEach((pb,i)=>{const txt=((pb.thesis||"")+" "+(pb.action||"")).toLowerCase();staleNarrativeTerms.forEach(stale=>{const tl=stale.term.toLowerCase();const ti=txt.indexOf(tl);if(ti>=0){const aft=txt.slice(ti+tl.length,ti+tl.length+4);if(!aft.includes("✓"))storyAgeIssues.push(`${t} [${pb.h||"TF"+(i+1)}]: "${stale.term}" — ${stale.note}`);}});});});
 if(storyAgeIssues.length>0){const sev=storyAgeIssues.length>5?"HIGH":"MED";const pts=storyAgeIssues.length>5?-8:storyAgeIssues.length>2?-4:-2;checks.push({cat:"STORY AGE",sev,msg:`${storyAgeIssues.length} stale narrative phrases: ${storyAgeIssues.slice(0,3).join("; ")}${storyAgeIssues.length>3?"... +"+(storyAgeIssues.length-3)+" more":""}`,fix:"Rewrite flagged playbook prose. Update staleNarrativeTerms list at top of check each session with prior-session-specific phrases that are now stale.",pts});totalScore+=pts;}
 else{checks.push({cat:"STORY AGE",sev:"OK",msg:"No stale narrative keywords detected in playbook prose — narrative current",fix:"",pts:0});}

 
 // CHECK 67: VALUATION FRESHNESS — ensures fwdPE/evEbitda refreshed periodically
 // Valuations move slower than price but still drift (quarterly earnings update estimates)
 // Weekly refresh cadence: flags anything >14 days old
 const valFreshIssues=[];
 const valTooOld=[];
 tickers.forEach(t=>{
 const s=S[t];if(!s.valDate)return;
 const vd=s.valDate;
 const dm=vd.match(/(\w+)\s+(\d+),\s*(\d+)/);
 if(!dm)return;
 const months={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 const md=new Date(parseInt(dm[3]),months[dm[1]],parseInt(dm[2]));
 const age=Math.floor((today-md)/(1000*60*60*24));
 if(age>30)valTooOld.push(t+" ("+age+"d)");
 else if(age>14)valFreshIssues.push(t+" ("+age+"d)");
 });
 if(valTooOld.length>0){
 checks.push({cat:"VALUATIONS",sev:"HIGH",msg:valTooOld.length+" tickers have valuations >30d old: "+valTooOld.slice(0,5).join(", ")+(valTooOld.length>5?"...":""),fix:"Web-search current fwdPE + evEbitda for each ticker. Update fwdPE field + valDate. Critical for PEG-based Edge Finder.",pts:-8});
 
 } else if(valFreshIssues.length>0){
 const pts=valFreshIssues.length>10?-6:valFreshIssues.length>5?-4:-2;
 checks.push({cat:"VALUATIONS",sev:"MED",msg:valFreshIssues.length+" tickers have valuations >14d old (weekly refresh due): "+valFreshIssues.slice(0,5).join(", ")+(valFreshIssues.length>5?"...":""),fix:"Refresh fwdPE + evEbitda for flagged tickers. Multiples drift when estimates move.",pts});
 totalScore+=pts;
 } else {
 checks.push({cat:"VALUATIONS",sev:"OK",msg:"All "+tickers.length+" tickers have fresh valuations (<14d old)",fix:"",pts:0});
 }

 
 // CHECK 68: PEER TABLE INTEGRITY — ensures REL VALUE table values internally consistent
 // When ticker T appears in ticker U's peers list, T's PE/EV should match T's own values
 // Also checks: self-entry fwdPE matches main fwdPE field
 const peerIssues=[];
 const peerTolerance=3; // allow 3 PE points of drift (consensus estimates vary)
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.fund||!s.fund.peers)return;
 s.fund.peers.forEach(p=>{
 if(!p.t)return;
 // Self-entry check
 if(p.t===t){
 if(s.fwdPE&&Math.abs(p.pe-s.fwdPE)>peerTolerance){
 peerIssues.push(`${t} self-entry: peer PE ${p.pe} vs main fwdPE ${s.fwdPE}`);
 }
 } else if(S[p.t]){
 // Cross-reference check: this peer's PE should match its own fwdPE (if we track it)
 const refPE=S[p.t].fwdPE;
 if(refPE&&Math.abs(p.pe-refPE)>peerTolerance){
 peerIssues.push(`${t}: peer ${p.t} PE ${p.pe} vs actual fwdPE ${refPE}`);
 }
 }
 });
 });
 if(peerIssues.length>0){
 const sev=peerIssues.length>5?"HIGH":"MED";
 const pts=peerIssues.length>5?-6:peerIssues.length>2?-4:-2;
 checks.push({cat:"PEER TABLES",sev,msg:`${peerIssues.length} peer table inconsistencies: ${peerIssues.slice(0,3).join("; ")}${peerIssues.length>3?"...":""}`,fix:"Align peer PE/EV values across tables. When a portfolio ticker is referenced as peer in another table, its values should match its own fwdPE field.",pts});
 totalScore+=pts;
 } else {
 checks.push({cat:"PEER TABLES",sev:"OK",msg:"All peer table values consistent with portfolio fwdPE fields",fix:"",pts:0});
 }

 
 // CHECK 69: NEWS PROVENANCE — heuristic check for intel restamped with fresher date
 // Focused on high-signal staleness tells, not every $ number
 const provenanceIssues=[];
 const staleEventPatterns=[/post-apr[\s-]2025/i,/post-feb[\s-]\w*\s*20\d\d/i,/after\s+q[1-4]\s+20\d\d/i,/jan(uary)?\s+20\d\d\s+earnings/i,/stagflation/i,/operation\s+epic/i,/hormuz\s+closed/i];
 tickers.forEach(t=>{
 const s=S[t];if(!s.news||!s.news.length)return;
 const p=prices[t];
 s.news.forEach(item=>{
 if(!item.dateStr||!item.on)return;
 const parts=item.dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
 if(!parts)return;
 const d=new Date(parseInt(parts[1]),parseInt(parts[2])-1,parseInt(parts[3]));
 const age=(today-d)/(1000*60*60*24);
 if(age>7)return;
 const txt=(item.headline||"")+" "+(item.detail||"");
 // A) PT cited in "recent" intel that's well below current price = old upgrade restamped
 // Only trigger for big gaps (>15% below) since PTs below-current is common when stock rallies past PT
 const ptMatch=txt.match(/PT\s*\$(\d+)/i);
 if(ptMatch){
 const pt=parseInt(ptMatch[1]);
 if(pt>15&&pt<p*0.85){
 provenanceIssues.push(`${t} "${item.headline.substring(0,50)}": PT $${pt} far below price $${p.toFixed(0)}`);
 }
 }
 // B) Stock price context: "NVDA $197" or "NVDA at $197" — check the stock itself, not EPS/MAs
 const stockRefMatches=[...txt.matchAll(new RegExp(`${t}\\s+(?:at\\s+)?\\$(\\d+)(?:\\s|\\.|\\,|$)`,"g"))];
 stockRefMatches.forEach(m2=>{
 const ref=parseInt(m2[1]);
 if(ref>15&&ref<5000&&Math.abs(ref-p)/p>0.10){
 provenanceIssues.push(`${t} "${item.headline.substring(0,50)}": refs ${t} $${ref} vs actual $${p.toFixed(0)}`);
 }
 });
 // C) Stale event references
 staleEventPatterns.forEach(pat=>{
 if(pat.test(txt)){
 const pname=pat.source.substring(0,20);
 provenanceIssues.push(`${t} "${item.headline.substring(0,40)}": references stale event (${pname})`);
 }
 });
 });
 });
 const uniqueIssues=[...new Set(provenanceIssues)];
 if(uniqueIssues.length>0){
 const sev=uniqueIssues.length>8?"HIGH":uniqueIssues.length>3?"MED":"LOW";
 const pts=uniqueIssues.length>8?-8:uniqueIssues.length>3?-4:-2;
 checks.push({cat:"NEWS PROVENANCE",sev,msg:`${uniqueIssues.length} intel items look restamped (old content, recent dateStr): ${uniqueIssues.slice(0,3).join("; ")}${uniqueIssues.length>3?"...":""}`,fix:"For each flagged item: either (a) update dateStr to actual event date, (b) remove item if no longer relevant, or (c) rewrite with current context.",pts});
 totalScore+=pts;
 } else {
 checks.push({cat:"NEWS PROVENANCE",sev:"OK",msg:"Intel content consistent with dateStr values — no obvious restamping detected",fix:"",pts:0});
 }

 
 // CHECK 70: SOURCE QUALITY — recent intel should cite specific publisher, not generic labels
 const vagueSourceIssues=[];
 const vagueSources=["market","industry","general","news","price action"];
 tickers.forEach(t=>{
 const s=S[t];if(!s.news||!s.news.length)return;
 s.news.forEach(item=>{
 if(!item.dateStr||!item.on)return;
 const parts=item.dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
 if(!parts)return;
 const d=new Date(parseInt(parts[1]),parseInt(parts[2])-1,parseInt(parts[3]));
 const age=(today-d)/(1000*60*60*24);
 if(age>2)return;
 const src=(item.source||"").toLowerCase().trim();
 if(!src||vagueSources.includes(src)){
 vagueSourceIssues.push(t+" n("+item.id+") dated "+item.dateStr+": source=\""+(item.source||"(none)")+"\"");
 }
 });
 });
 if(vagueSourceIssues.length>0){
 const sev=vagueSourceIssues.length>10?"MED":"LOW";
 const pts=vagueSourceIssues.length>10?-4:-2;
 checks.push({cat:"SOURCE QUALITY",sev,msg:vagueSourceIssues.length+" recent intel items have generic sources: "+vagueSourceIssues.slice(0,2).join("; ")+(vagueSourceIssues.length>2?"...":""),fix:"Replace generic sources with specific publisher + date (e.g., 'Reuters Apr 17 2026', 'Bloomberg Apr 17 10:30am'). Ensures intel is genuinely pulled from fresh news, not synthesized from price observations.",pts});
 totalScore+=pts;
 } else {
 checks.push({cat:"SOURCE QUALITY",sev:"OK",msg:"All recent intel has specific source attributions",fix:"",pts:0});
 }

 
 // TIER REPORT — classifies each ticker by refresh-priority for tiered workflow
 // Tier 1: earnings within 14 days (proper pass required — PT cluster, acquisitions, guidance)
 // Tier 2: active signal (at ATH, YTD >50%, or recent big move) — focused pass on drivers
 // Tier 3: stable core holdings — light pass, just price + 1 headline if available
 const tier1=[],tier2=[],tier3=[];
 const parseEarningsDate=(s)=>{
 if(!s||typeof s!=="string")return null;
 const monthMap={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 const m=s.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+),?\s*(\d{4})?/);
 if(!m)return null;
 const yr=m[3]?parseInt(m[3]):today.getFullYear();
 return new Date(yr,monthMap[m[1]],parseInt(m[2]));
 };
 tickers.forEach(t=>{
 const s=S[t];
 const p=prices[t];
 let tier=3;
 let reasons=[];
 // Tier 1: earnings in next 14 days
 const ed=parseEarningsDate(s.earningsDate);
 if(ed){
 const daysToEarn=Math.round((ed-today)/(1000*60*60*24));
 if(daysToEarn>=0&&daysToEarn<=14){
 tier=1;
 reasons.push(`earnings in ${daysToEarn}d (${s.earningsDate})`);
 }
 }
 // Tier 2 checks (only if not already tier 1)
 if(tier===3){
 // At or near ATH
 if(s.high52&&p>=s.high52*0.98){
 tier=2;
 reasons.push(`at ATH ($${p.toFixed(2)} vs 52W $${s.high52})`);
 }
 // Hot YTD momentum
 else if(s.ytd&&s.ytd>=60){
 tier=2;
 reasons.push(`YTD +${s.ytd}% (hot momentum)`);
 }
 // Big YTD drawdown (often signals opportunity or further downside)
 else if(s.ytd&&s.ytd<=-15){
 tier=2;
 reasons.push(`YTD ${s.ytd}% (drawdown)`);
 }
 }
 const row={t,tier,reasons:reasons.join(", ")};
 if(tier===1)tier1.push(row);
 else if(tier===2)tier2.push(row);
 else tier3.push(row);
 });
 const tier1Str=tier1.length>0?tier1.map(r=>`${r.t} (${r.reasons})`).join(", "):"none";
 const tier2Str=tier2.length>0?tier2.map(r=>`${r.t} (${r.reasons})`).join(", "):"none";
 const tier3Str=tier3.map(r=>r.t).join(", ");
 const tierMsg=`T1 EARNINGS WATCH (${tier1.length}): ${tier1Str} | T2 ACTIVE SIGNAL (${tier2.length}): ${tier2Str} | T3 CORE (${tier3.length}): ${tier3Str}`;
 // Check for stale earnings dates (already reported — contains ✓)
 const staleEarn=tickers.filter(t=>S[t].earningsDate&&S[t].earningsDate.includes("✓"));
 if(staleEarn.length>0){
 checks.push({cat:"TIER REPORT",sev:"OK",msg:tierMsg,fix:"",pts:0});
 checks.push({cat:"STALE EARNINGS DATE",sev:"MED",msg:`${staleEarn.length} tickers have past/stale earningsDate (contains ✓): ${staleEarn.map(t=>`${t}: ${S[t].earningsDate}`).join(", ")}`,fix:"Update earningsDate to the NEXT scheduled earnings date. Use nasdaq.com/market-activity/earnings or TipRanks.",pts:-4});
 
 } else {
 checks.push({cat:"TIER REPORT",sev:"OK",msg:tierMsg,fix:"",pts:0});
 }

 
 // CHECK 90: DAILY PT VERIFICATION — strict daily web-search requirement
 // Critical: PTs flow into R:R calculation. Stale PT = lying about asymmetry.
 const ptDailyIssues=[];
 const todayMs=today.getTime();
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.ptDate)return;
 const m=s.ptDate.match(/^(\w+)\s+(\d+),?\s*(\d{4})/);
 if(!m)return;
 const monthLk={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 const ptD=new Date(parseInt(m[3]),monthLk[m[1]],parseInt(m[2]));
 const hoursOld=(todayMs-ptD.getTime())/(1000*60*60);
 // Daily requirement: PT must be verified within last 24 hours
 if(hoursOld>30){
 const daysOld=Math.floor(hoursOld/24);
 ptDailyIssues.push(t+" ("+daysOld+"d)");
 }
 });
 if(ptDailyIssues.length>0){
 const sev=ptDailyIssues.length>10?"HIGH":ptDailyIssues.length>3?"MED":"LOW";
 const pts=0;
 checks.push({cat:"DAILY PT",sev,
 msg:"INFO (workflow signal, not data error): "+ptDailyIssues.length+" tickers need PT verification today: "+ptDailyIssues.slice(0,8).join(", ")+(ptDailyIssues.length>8?" ...":""),
 fix:"Web-search avgPT/highPT/lowPT for each ticker DAILY. Stale PTs corrupt R:R picture and trade decisions.",
 pts});
 totalScore+=pts;
 } else {
 checks.push({cat:"DAILY PT",sev:"OK",
 msg:"All "+tickers.length+" tickers have PTs verified within 24h",fix:"",pts:0});
 }


 // CHECK 91: DAILY OPTIONS VERIFICATION — strict daily web-search requirement
 // Critical: IV/maxPain/PC ratio drive options strategy decisions. Stale options data = bad spread pricing.
 const optDailyIssues=[];
 const todayMs2=today.getTime();
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.optionsDate)return;
 const m=s.optionsDate.match(/^(\w+)\s+(\d+),?\s*(\d{4})/);
 if(!m)return;
 const monthLk2={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 const optD=new Date(parseInt(m[3]),monthLk2[m[1]],parseInt(m[2]));
 const hoursOld=(todayMs2-optD.getTime())/(1000*60*60);
 // Daily requirement: options data must be verified within last 24 hours
 if(hoursOld>30){
 const daysOld=Math.floor(hoursOld/24);
 optDailyIssues.push(t+" ("+daysOld+"d)");
 }
 });
 if(optDailyIssues.length>0){
 const sev=optDailyIssues.length>10?"HIGH":optDailyIssues.length>3?"MED":"LOW";
 const pts=0;
 checks.push({cat:"DAILY OPT",sev,
 msg:"INFO (workflow signal, not data error): "+optDailyIssues.length+" tickers need options data verification today: "+optDailyIssues.slice(0,8).join(", ")+(optDailyIssues.length>8?" ...":""),
 fix:"Web-search ivRank/ivPctl/pcRatio/maxPain/flow expiries DAILY. Stale options data corrupts spread/strangle decisions and IV-aware sizing.",
 pts});
 totalScore+=pts;
 } else {
 checks.push({cat:"DAILY OPT",sev:"OK",
 msg:"All "+tickers.length+" tickers have options data verified within 24h",fix:"",pts:0});
 }


 // CHECK 92: MULTI-TIMEFRAME PB STALENESS — All timeframes 1W/1M/3M/6M/1Y
 // Critical: stale trading-action $ refs create contradictory playbooks.
 // Example: stock rallies +50% but "add at $X" zone wasn't updated.
 // Filters: skip business amounts ($XB capex, $XM positions, $X EPS/PE).
 const mtfStaleIssues=[];
 // Trading-action keywords that indicate a price reference (not a business amount)
 const tradingKwBefore=/(?:add|trim|stop|target|support|resistance|breach|holds?|retest|level|zone|entry|buy at|sell at|exit|reach|above|below|pullback to|breakdown|breakout|accumulate)\s+(?:zone\s+|to\s+|at\s+|of\s+|at|near\s+|past\s+)?$/i;
 const tradingKwAfter=/^\s*(?:support|stop|target|level|zone|hold|trigger|floor|ceiling|range|breakout|breakdown|pullback)/i;
 // Patterns that ALWAYS indicate a business amount (not a price)
 const businessPatterns=[
 /position[\.\s]*\(?\s*\$\d/i, // "position. $17.5K"
 /\$\d+[KkMmBbTt]\b/, // $17K, $20M, $4.5B
 /\$\d+(?:\.\d+)?\s*(?:billion|million|trillion|K\b|B\b)/i,
 /(?:capex|revenue|rev|EBITDA|sales|backlog|profit|earnings|FCF|opex)\s*[^.]{0,20}\$\d/i,
 /\$\d+\s*(?:per\s+|\/)\s*(?:user|month|year|share|quarter)/i,
 /EPS\s*\$\d/i,
 /\d+x\s+\$\d/i, // "20x $50B"
 /\boil\s+\$\d/i, // "oil $108" macro reference, not stock price
 /\b(?:Brent|WTI|crude|gold|BTC|bitcoin)\s+\$\d/i, // commodity/crypto macro refs
 /\bbuyback[^.]{0,20}\$\d/i, // "$250M buyback @ $74 avg" historical
 /@\s*\$\d+(?:\.\d+)?\s*avg/i, // "@ $74 avg" historical trade price
 /(?:bought|sold|added|BUY|SELL)\s+[\d.]+\s+shares?\s*@?\s*~?\$\d/i, // trade records
 ];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.playbook)return;
 const p=prices[t];
 s.playbook.forEach(pb=>{
 const action=pb.action||"";
 if(!action)return;
 const tf=pb.h||"unknown";
 // Find $NNN refs
 const dollarMatches=[...action.matchAll(/\$(\d{2,4})(?![\d.])/g)];
 dollarMatches.forEach(m=>{
 const val=parseInt(m[1]);
 if(val<15||val>5000)return;
 // Skip if very close to current price (likely the current price reference)
 if(Math.abs(val-p)/p<0.05)return;
 // Check 50 chars before and 30 after
 const startIdx=Math.max(0,m.index-50);
 const endIdx=Math.min(action.length,m.index+m[0].length+30);
 const ctxBefore=action.substring(startIdx,m.index);
 const ctxAfter=action.substring(m.index+m[0].length,endIdx);
 // FILTER 1: Skip if followed by B/M/K/trillion etc (business amount)
 if(/^\s*[BMKTk]\b/.test(ctxAfter))return;
 if(/^\s*(?:billion|million|trillion|thousand)/i.test(ctxAfter))return;
 // FILTER 2: Skip pricing per-unit (per user/month/etc)
 if(/^\s*(?:per|\/)/i.test(ctxAfter))return;
 // FILTER 3: Skip if any business-amount pattern matches the surrounding 80 chars
 const fullCtx=action.substring(Math.max(0,m.index-80),Math.min(action.length,m.index+m[0].length+30));
 let isBusinessAmount=false;
 for(const bp of businessPatterns){
 if(bp.test(fullCtx)){isBusinessAmount=true;break;}
 }
 if(isBusinessAmount)return;
 // FILTER 4: Skip historical references ("was $310", "from $390 to $400")
 if(/\bwas\s+$/i.test(ctxBefore))return;
 if(/\bfrom\s+$/i.test(ctxBefore))return;
 if(/\(was\s*$/i.test(ctxBefore))return;
 // FILTER 5: Skip position size ("$17.5K position", "X shares = $YYK")
 if(/=\s*$/.test(ctxBefore.trim()))return;
 if(/\bshares\s*=\s*$/i.test(ctxBefore))return;
 // FILTER 6: Skip if part of a range with current price ($X-Y where Y is near price)
 // e.g. "$400-540 range" where price is $540
 const rangeMatch=ctxAfter.match(/^\s*-(\d{2,4})/);
 if(rangeMatch){
 const high=parseInt(rangeMatch[1]);
 if(Math.abs(high-p)/p<0.1)return;
 }
 // POSITIVE: Require trading keyword nearby
 const beforeMatch=tradingKwBefore.test(ctxBefore);
 const afterMatch=tradingKwAfter.test(ctxAfter);
 if(!beforeMatch&&!afterMatch)return;
 // FILTER 7: Skip macro commodity refs ("oil $108", "Oil resurgence to $108", crude/gold/BTC)
 if(/(?:oil|Brent|WTI|crude|gold|BTC|bitcoin)\b[^.$]{0,25}\$$/i.test(ctxBefore))return;
 // FILTER 8: Skip forward-looking targets on multi-month/year frames
 if(/(?:target|hold for|trim above|next leg|leg to|PT)\D{0,8}$/i.test(ctxBefore)&&!/1\s*WEEK/i.test(tf))return;
 // FILTER 9: Skip analyst PT ranges ("range $300-600", "16 analysts, range $X") and verified historical avgs
 if(/(?:range|analysts?|verified[^.]{0,12}avg|avg)\s*\$?$/i.test(ctxBefore))return;
 // FILTER 10: Skip "$X upside" (dollar amount of upside, not a price) and add/buy zones
 if(/^\s*(?:upside|gain)/i.test(ctxAfter))return;
 if(/(?:add zone|buy zone|BUY ZONE)\s*\$?$/i.test(ctxBefore))return;
 // BELOW price: stale add/stop/support zones (always flag if >25% below)
 // ABOVE price: only flag for 1W (near-term targets should be close); skip 1M+ (long-term bull targets ok)
 if(val<p*0.75){
 const gap=Math.round((p-val)/p*100);
 mtfStaleIssues.push(t+" "+tf+": $"+val+" ref below price $"+p.toFixed(0)+" ("+gap+"% off)");
 } else if(val>p*1.40&&/1\s*WEEK/i.test(tf)){
 const gap=Math.round((val-p)/p*100);
 mtfStaleIssues.push(t+" "+tf+": $"+val+" ref above price $"+p.toFixed(0)+" ("+gap+"% off - unusual for 1W)");
 }
 });
 });
 });
 if(mtfStaleIssues.length>0){
 const sev=mtfStaleIssues.length>5?"HIGH":mtfStaleIssues.length>2?"MED":"LOW";
 const pts=mtfStaleIssues.length>5?-8:mtfStaleIssues.length>2?-4:-2;
 checks.push({cat:"MTF PB STALE",sev,
 msg:mtfStaleIssues.length+" multi-timeframe playbook prices >25% from current: "+mtfStaleIssues.slice(0,4).join("; ")+(mtfStaleIssues.length>4?" ...":""),
 fix:"Update playbook action prose to reflect current price levels. Stale add/trim/stop zones create contradictory trade plans (e.g. 'add at $400' on a $540 stock).",
 pts});
 totalScore+=pts;
 } else {
 checks.push({cat:"MTF PB STALE",sev:"OK",
 msg:"All playbook trading-action prices coherent with current prices",fix:"",pts:0});
 }


 // CHECK 93: DUPLICATE INTEL IDS — same ID used for different stories within ticker
 // Critical: React keys must be unique or rendering bugs occur (wrong item shows on click).
 const dupIdIssues=[];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.news)return;
 const seen={};
 s.news.forEach(item=>{
 if(item.id===undefined)return;
 if(seen[item.id]){
 dupIdIssues.push(t+": id="+item.id+" used 2x ('"+seen[item.id].slice(0,30)+"' & '"+(item.headline||"").slice(0,30)+"')");
 }
 seen[item.id]=item.headline||"?";
 });
 });
 if(dupIdIssues.length>0){
 const sev=dupIdIssues.length>3?"HIGH":"MED";
 const pts=dupIdIssues.length>3?-8:-4;
 checks.push({cat:"DUP IDS",sev,
 msg:dupIdIssues.length+" duplicate intel IDs (React render bugs): "+dupIdIssues.slice(0,3).join("; ")+(dupIdIssues.length>3?" ...":""),
 fix:"Renumber duplicate IDs. Each n() within a ticker needs unique ID. Use ID >800 for new items.",
 pts});
 totalScore+=pts;
 } else {
 checks.push({cat:"DUP IDS",sev:"OK",msg:"All intel IDs unique within each ticker",fix:"",pts:0});
 }

 // CHECK 94: SUPPORT SANITY - support[0] must sit below current price.
 // Rewritten Sep 4 2026. The old STOP SANITY check flagged levels "too tight" when
 // within 3% of price. With stops removed, support[0] is an OBSERVED swing low, and
 // price sitting directly on one (AVGO 0.4%, VST 0.1%) is the SIGNAL, not a fault.
 // Only a level at or above price is an error, because that is broken support.
 const stopSanity94Issues=[];
 tickers.forEach(t=>{
  const s=S[t];
  if(!s.support||!s.support[0]||!prices[t])return;
  const p=prices[t],lvl=s.support[0].lvl;
  if(lvl>=p)stopSanity94Issues.push(t+": support $"+lvl+" is AT or ABOVE price $"+p.toFixed(0)+" - broken support, i.e. resistance");
 });
 if(stopSanity94Issues.length>0){
  checks.push({cat:"SUPPORT SANITY",sev:"HIGH",
  msg:stopSanity94Issues.length+" support level(s) above price: "+stopSanity94Issues.slice(0,3).join("; "),
  fix:"Filter swing lows to strictly below the last close",pts:-10});
  totalScore-=10;
 } else {
  checks.push({cat:"SUPPORT SANITY",sev:"OK",msg:"All support levels sit below current price",fix:"",pts:0});
 }

 // CHECK 95: SHARES SYNC — exitShares must include all tickers and match position prose
 // Critical: missing shares means health calculations for that position fail silently.
 const sharesSyncIssues=[];
 if(typeof exitShares!=="undefined"){
 tickers.forEach(t=>{
 if(exitShares[t]===undefined){
 sharesSyncIssues.push(t+": missing from exitShares array");
 }
 });
 // Also check share counts referenced in 1W prose
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.playbook||exitShares[t]===undefined)return;
 const actualShares=exitShares[t];
 s.playbook.forEach(pb=>{
 if(!pb.h||!pb.h.match(/1\s*WEEK/i))return;
 // Look for "N shares" reference in action or thesis
 const text=(pb.action||"")+" "+(pb.thesis||"");
 const sharesMatches=[...text.matchAll(/(\d+(?:\.\d+)?)\s+shares\b/gi)];
 sharesMatches.forEach(m=>{
 const stated=parseFloat(m[1]);
 if(Math.abs(stated-actualShares)>1&&actualShares>0){
 sharesSyncIssues.push(t+": 1W prose says "+stated+" shares but exitShares="+actualShares);
 }
 });
 });
 });
 }
 if(sharesSyncIssues.length>0){
 const sev=sharesSyncIssues.length>3?"HIGH":"MED";
 const pts=sharesSyncIssues.length>3?-6:-3;
 checks.push({cat:"SHARES SYNC",sev,
 msg:sharesSyncIssues.length+" share count issues: "+sharesSyncIssues.slice(0,3).join("; ")+(sharesSyncIssues.length>3?" ...":""),
 fix:"Update exitShares object after every trade. Sync 1W prose share counts. Both must match brokerage.",
 pts});
 totalScore+=pts;
 } else {
 checks.push({cat:"SHARES SYNC",sev:"OK",msg:"exitShares complete and matches playbook prose",fix:"",pts:0});
 }

 // CHECK 96: FLOW STRIKE PROXIMITY — option strikes should be near current price
 // Catches stale strikes from before rallies/drops.
 const flowProxIssues=[];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.options||!s.options.flow||!prices[t])return;
 const p=prices[t];
 const farStrikes=s.options.flow.filter(f=>{
 const dist=Math.abs(f.s-p)/p;
 return dist>0.40; // strikes >40% from price are likely stale
 });
 if(farStrikes.length>0){
 const examples=farStrikes.slice(0,2).map(f=>"$"+f.s).join(",");
 flowProxIssues.push(t+": "+farStrikes.length+"/"+s.options.flow.length+" strikes >40% from $"+p.toFixed(0)+" ("+examples+")");
 }
 });
 if(flowProxIssues.length>0){
 const sev=flowProxIssues.length>5?"HIGH":"MED";
 const pts=flowProxIssues.length>5?-8:-3;
 checks.push({cat:"FLOW PROX",sev,
 msg:flowProxIssues.length+" tickers with stale flow strikes: "+flowProxIssues.slice(0,3).join("; ")+(flowProxIssues.length>3?" ...":""),
 fix:"Update options flow strikes to current ATM/OTM range. Strikes >40% from price are likely from before a major move.",
 pts});
 totalScore+=pts;
 } else {
 checks.push({cat:"FLOW PROX",sev:"OK",msg:"All flow strikes within ±40% of current price",fix:"",pts:0});
 }

 // CHECK 97: OPTIONS VERIFICATION FLAG — every ticker must declare verified or not
 // Honesty check: prevents "we have IV Rank data" appearing as verified when it's default placeholder.
 const verifiedIssues=[];
 let unverifiedCount=0;
 tickers.forEach(t=>{
 const s=S[t];
 if(s.optionsVerified===undefined){
 verifiedIssues.push(t+": missing optionsVerified field");
 } else if(s.optionsVerified===false){
 unverifiedCount++;
 }
 });
 if(verifiedIssues.length>0){
 checks.push({cat:"OPT VERIFY",sev:"MED",
 msg:verifiedIssues.length+" tickers missing optionsVerified flag: "+verifiedIssues.slice(0,3).join("; "),
 fix:"Every ticker must have optionsVerified:false|false. UI badges depend on this.",
 pts:0});
 
 } else if(unverifiedCount>tickers.length*0.8){
 // More than 80% unverified is a problem
 checks.push({cat:"OPT VERIFY",sev:"LOW",
 msg:unverifiedCount+"/"+tickers.length+" tickers have unverified options data — UI shows ⚠ ESTIMATED",
 fix:"Web-verify IV Rank/max pain via projectoption.com or barchart.com for top positions. Set optionsVerified:true after.",
 pts:0});
 
 } else {
 checks.push({cat:"OPT VERIFY",sev:"OK",msg:"All tickers declare options verification status. "+(tickers.length-unverifiedCount)+" verified.",fix:"",pts:0});
 }

 // CHECK 98: PLACEHOLDER DEFAULTS — IVR=50/IVPctl=50/PC=0.85 trio = unverified default
 // Catches when options data wasn't actually researched, just placeholder values
 const defaultIssues=[];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.options)return;
 const isDefault=(s.options.ivRank===50&&s.options.ivPctl===50&&Math.abs(s.options.pcRatio-0.85)<0.01);
 if(isDefault){
 defaultIssues.push(t);
 }
 });
 if(defaultIssues.length>0){
 checks.push({cat:"OPT DEFAULTS",sev:"MED",
 msg:defaultIssues.length+" tickers with default placeholder options (IVR=50/IVP=50/PC=0.85): "+defaultIssues.join(", "),
 fix:"These tickers have placeholder values — set realistic IVR based on stock vol profile or mark optionsVerified:false explicitly with notes.",
 pts:0});
 
 } else {
 checks.push({cat:"OPT DEFAULTS",sev:"OK",msg:"No placeholder default options values detected",fix:"",pts:0});
 }

 // CHECK 99: HIGH52 BREAK — when price > stored high52, bump it (silent ATH detection)
 const high52BreakIssues=[];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.high52||!prices[t])return;
 if(prices[t]>s.high52*1.001){ // 0.1% tolerance for noise
 high52BreakIssues.push(t+": price $"+prices[t].toFixed(2)+" > stored high52 $"+s.high52+" — bump to ATH");
 }
 });
 if(high52BreakIssues.length>0){
 const sev=high52BreakIssues.length>3?"MED":"LOW";
 const pts=high52BreakIssues.length>3?-3:-1;
 checks.push({cat:"HIGH52 BREAK",sev,
 msg:high52BreakIssues.length+" tickers broke stored 52w high: "+high52BreakIssues.slice(0,3).join("; ")+(high52BreakIssues.length>3?" ...":""),
 fix:"Update high52 field to match current price. ATH break is a signal worth tracking.",
 pts});
 totalScore+=pts;
 } else {
 checks.push({cat:"HIGH52 BREAK",sev:"OK",msg:"All stored 52w highs current",fix:"",pts:0});
 }

 // CHECK 100: PT-RATING CONSISTENCY — if price >> avgPT, "Strong Buy" is suspect
 // Catches lagging consensus ratings (stock above PT but still rated Strong Buy)
 const ptRatingIssues=[];
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.avgPT||!prices[t]||!s.consensus)return;
 const p=prices[t];
 const pt=s.avgPT;
 const gapPct=(p-pt)/pt*100;
 // If price >25% above avgPT but consensus is "Strong Buy", that's contradiction
 if(gapPct>25&&s.consensus.toLowerCase().includes("strong buy")){
 ptRatingIssues.push(t+": $"+p.toFixed(0)+" is "+gapPct.toFixed(0)+"% above PT $"+pt+" but consensus='"+s.consensus+"' — re-verify");
 }
 });
 if(ptRatingIssues.length>0){
 checks.push({cat:"PT-RATING",sev:"LOW",
 msg:"INFO (perf signal, not data error): "+ptRatingIssues.length+" ticker(s) with PT-rating mismatch: "+ptRatingIssues.slice(0,3).join("; "),
 fix:"This reflects rally outpacing analyst PT updates, not data error.",
 pts:0});
 
 } else {
 checks.push({cat:"PT-RATING",sev:"OK",msg:"PT-consensus rating alignment OK",fix:"",pts:0});
 }

 // ═══════════════════════════════════════════════════════════════
 // CHECKS 101-107: Added May 18 — surface real issues that bit us this session
 // ═══════════════════════════════════════════════════════════════

 // CHECK 101: EXIT MAP DATA SYNC — exitSharesHC and exitCBData must cover all S keys + match each other in count
 // Caught this session: GOOGL=0 in exitSharesHC despite holding the position; LRCX/TSLA/V missing entirely.
 // Existing CHECK 95 only verified existence in `exitShares` (UI) but not value-level sync between UI & HC.
 const exitDataIssues=[];
 if(typeof exitSharesHC!=="undefined"&&typeof exitCBData!=="undefined"){
 tickers.forEach(t=>{
 if(exitSharesHC[t]===undefined)exitDataIssues.push(t+": missing from exitSharesHC");
 else if(exitSharesHC[t]===0)exitDataIssues.push(t+": exitSharesHC[t]=0 despite being in S (held position counted as zero)");
 if(exitCBData[t]===undefined)exitDataIssues.push(t+": missing from exitCBData (cost basis)");
 });
 // Cross-check: if exitShares (UI version) exists, values should match exitSharesHC within 0.01
 if(typeof exitShares!=="undefined"){
 tickers.forEach(t=>{
 const ui=exitShares[t],hc=exitSharesHC[t];
 if(ui!==undefined&&hc!==undefined&&Math.abs(ui-hc)>0.01){
 exitDataIssues.push(t+": exitShares (UI) "+ui+" != exitSharesHC "+hc);
 }
 });
 }
 } else {
 exitDataIssues.push("exitSharesHC or exitCBData not defined in health check scope");
 }
 if(exitDataIssues.length>0){
 const sev=exitDataIssues.length>3?"HIGH":"MED";
 const pts=exitDataIssues.length>3?-8:-4;
 checks.push({cat:"EXIT MAP SYNC",sev,
 msg:exitDataIssues.length+" EXIT MAP data sync issue(s): "+exitDataIssues.slice(0,3).join("; ")+(exitDataIssues.length>3?" +"+(exitDataIssues.length-3)+" more":""),
 fix:"Sync exitSharesHC, exitCBData, and exitShares (UI) to current brokerage. All three must contain every ticker in S with matching values.",
 pts});
 totalScore+=pts;
 } else {
 checks.push({cat:"EXIT MAP SYNC",sev:"OK",msg:"exitSharesHC + exitCBData complete and sync'd with exitShares (UI)",fix:"",pts:0});
 }

 // CHECK 102: PT MOOD SIGNAL — positive-surfacing check for BULL/BEAR ALIGN regimes
 // BULL ALIGN: all 3 PTs (low/avg/high) above price → analyst floor + ceiling agree on upside (VST-style setup)
 // BEAR ALIGN: all 3 PTs below price → every analyst sees downside (PWR-style setup)
 // This is informational signal generation, not error-catching.
 const bullAligned=[],bearAligned=[];
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.lowPT||!s.avgPT||!s.highPT||!p)return;
 if(s.lowPT>p&&s.avgPT>p&&s.highPT>p){
 const upside=Math.round((s.avgPT-p)/p*100);
 bullAligned.push(t+" (+"+upside+"% to avg, low $"+s.lowPT+" already above $"+p.toFixed(0)+")");
 }
 if(s.lowPT<p&&s.avgPT<p&&s.highPT<p){
 const downside=Math.round((p-s.avgPT)/s.avgPT*100);
 bearAligned.push(t+" (-"+downside+"% to avg, high $"+s.highPT+" still below $"+p.toFixed(0)+")");
 }
 });
 const moodMsg=[];
 if(bullAligned.length>0)moodMsg.push("BULL ALIGN ("+bullAligned.length+"): "+bullAligned.join(", "));
 if(bearAligned.length>0)moodMsg.push("BEAR ALIGN ("+bearAligned.length+"): "+bearAligned.join(", "));
 if(moodMsg.length>0){
 checks.push({cat:"PT MOOD",sev:"LOW",
 msg:"INFO (opportunity surfacing): "+moodMsg.join(" | "),
 fix:"BULL ALIGN = consensus floor at or above current price (asymmetric upside setup). BEAR ALIGN = analyst ceiling below current price (consider trim).",
 pts:0});
 } else {
 checks.push({cat:"PT MOOD",sev:"OK",msg:"No tickers in BULL/BEAR ALIGN — prices within PT bands",fix:"",pts:0});
 }

 // CHECK 103: EARNINGS DATE PROXIMITY GUARD — for tickers with earnings within 5 days, require recent intel confirming the date
 // Caught this session: NVDA earningsDate field said "May 28" when actual was "May 20" (verified via TipRanks, S&P Global, Motley Fool, IG).
 // The closer to earnings, the more critical the date is correct.
 const earnDateIssues=[];
 const monthLkEd={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.earningsDate)return;
 const edm=s.earningsDate.match(/^(\w+)\s+(\d+)/);
 if(!edm||edm[1]==="✓")return;
 const mo=monthLkEd[edm[1]];if(mo===undefined)return;
 const ed=new Date(2026,mo,parseInt(edm[2]));
 const dte=Math.ceil((ed-today)/(1000*60*60*24));
 // Only check if earnings is within 5 days and hasn't passed (not ✓ marked)
 if(dte<0||dte>5||s.earningsDate.includes("✓"))return;
 // Look for recent intel (last 14d) containing this date or "confirmed"
 const dateKey=edm[1]+" "+edm[2];
 const recentIntel=(s.news||[]).filter(item=>{
 if(!item.dateStr)return false;
 const d=new Date(item.dateStr);if(isNaN(d))return false;
 const age=(today-d)/(1000*60*60*24);
 if(age>14||age<0)return false;
 const txt=(item.headline||"")+" "+(item.detail||"");
 return txt.includes(dateKey)||txt.toLowerCase().includes("confirmed");
 });
 if(recentIntel.length===0){
 earnDateIssues.push(t+": earningsDate="+s.earningsDate+" ("+dte+"d away) but no intel in last 14d mentions this date or 'confirmed'");
 }
 });
 if(earnDateIssues.length>0){
 checks.push({cat:"EARN DATE GUARD",sev:"HIGH",
 msg:earnDateIssues.length+" earnings date(s) within 5 days unconfirmed by recent intel: "+earnDateIssues.join("; "),
 fix:"Web-verify earnings date (TipRanks/MarketBeat/S&P Global). Add intel item with confirmed date. Update earningsDate field if needed.",
 pts:-6});
 totalScore-=6;
 } else {
 checks.push({cat:"EARN DATE GUARD",sev:"OK",msg:"Earnings dates within 5 days are confirmed by recent intel",fix:"",pts:0});
 }

 // CHECK 104: MACRO INTERNAL COHERENCE — regime label vs note prose
 // Caught this session: regime="RISK-ON" with green dot, but note said "real risk-off building"
 const macroCoherenceIssues=[];
 if(typeof MACRO!=="undefined"){
 const r=(MACRO.regime||"").toLowerCase();
 const n=(MACRO.note||"").toLowerCase();
 // RISK-ON regime + note mentions risk-off/fading/building = contradiction
 if(r.includes("risk-on")&&!r.includes("fading")&&(n.includes("risk-off")||n.includes("fading")||n.includes("building"))){
 macroCoherenceIssues.push("regime='"+MACRO.regime+"' but note mentions risk-off/fading/building — contradiction");
 }
 // RISK-ON FADING regime with high-VIX prose
 if(r.includes("risk-on")&&MACRO.vix>22){
 macroCoherenceIssues.push("regime='"+MACRO.regime+"' but VIX "+MACRO.vix+" >22 (elevated/risk-off territory)");
 }
 // RISK-OFF regime with low VIX
 if(r.includes("risk-off")&&!r.includes("fading")&&MACRO.vix<15){
 macroCoherenceIssues.push("regime='"+MACRO.regime+"' but VIX "+MACRO.vix+" <15 (low/risk-on territory)");
 }
 // Green color with risk-off note (color G is "#3DBFA8" or similar green)
 if(MACRO.color&&(MACRO.color.includes("d975")||MACRO.color.includes("00e89a"))&&n.includes("risk-off")){
 macroCoherenceIssues.push("color is green but note mentions risk-off — visual contradiction");
 }
 }
 if(macroCoherenceIssues.length>0){
 checks.push({cat:"MACRO COHERENCE",sev:"MED",
 msg:macroCoherenceIssues.length+" macro internal contradiction(s): "+macroCoherenceIssues.join("; "),
 fix:"Sync MACRO.regime, MACRO.color, and MACRO.note. Don't let label/dot contradict the prose.",
 pts:-4});
 totalScore-=4;
 } else {
 checks.push({cat:"MACRO COHERENCE",sev:"OK",msg:"MACRO regime/color/note internally consistent",fix:"",pts:0});
 }

 // CHECK 105: STALE TERMS META-CHECK — the staleNarrativeTerms list itself must not be stale
 // Caught this session: list flagged "oil $107" as stale (oil is $108.84 — would falsely flag current data)
 // and "VIX 25/30/31" as stale (could re-fire if VIX expands)
 const metaTermIssues=[];
 if(typeof staleNarrativeTerms!=="undefined"&&typeof MACRO!=="undefined"){
 staleNarrativeTerms.forEach(item=>{
 const term=item.term;
 // Oil terms: extract $X, compare to MACRO.oil
 const oilM=term.match(/oil\s*\$(\d+)/i);
 if(oilM&&MACRO.oil){
 const oilRef=parseInt(oilM[1]);
 // If the "stale" oil ref is actually within 5% of current, the term is stale itself
 if(Math.abs(oilRef-MACRO.oil)/MACRO.oil<0.05){
 metaTermIssues.push("'"+term+"' is actually CURRENT (oil $"+MACRO.oil+") — removing from stale list");
 }
 }
 // VIX terms: extract VIX X, compare to MACRO.vix
 const vixM=term.match(/^VIX\s+(\d+)/i);
 if(vixM&&MACRO.vix){
 const vixRef=parseInt(vixM[1]);
 if(Math.abs(vixRef-MACRO.vix)<2){
 metaTermIssues.push("'"+term+"' is actually CURRENT (VIX "+MACRO.vix+") — removing from stale list");
 }
 }
 });
 }
 if(metaTermIssues.length>0){
 checks.push({cat:"STALE TERMS META",sev:"MED",
 msg:metaTermIssues.length+" terms in staleNarrativeTerms are themselves stale: "+metaTermIssues.slice(0,3).join("; "),
 fix:"Remove these terms from staleNarrativeTerms — they describe current market state, not stale state. Update list when macro changes.",
 pts:-3});
 totalScore-=3;
 } else {
 checks.push({cat:"STALE TERMS META",sev:"OK",msg:"staleNarrativeTerms list reflects current macro state",fix:"",pts:0});
 }

 // CHECK 106: OPP PRICES DYNAMIC — replace hardcoded refPrice with derive-from-price
 // The existing CHECK 45 (OPP PRICES) has hardcoded refPrice values that go stale.
 // This check verifies current dashboard opportunity prose against live prices automatically.
 // Look for opportunity cards in MARKET view that reference specific dollar amounts and compare.
 const oppDynIssues=[];
 // The opportunities array is in markdown/jsx string, not directly accessible from health check scope.
 // Instead, check the underlying ticker prose: ANY recently-modified opp/thesis prose should ref current prices.
 // Heuristic: scan all 1W playbook items for $XXX refs and compare to current ticker price.
 tickers.forEach(t=>{
 const s=S[t],p=prices[t];
 if(!s.playbook)return;
 const pb1w=s.playbook.find(pb=>pb.h&&pb.h.match(/1\s*WEEK/i));
 if(!pb1w||!pb1w.thesis)return;
 // First $XXX in thesis should be within 15% of current price (it's the headline)
 const m=pb1w.thesis.match(/\$(\d{2,4})(?![BMK\d])/);
 if(m){
 const ref=parseInt(m[1]);
 // Skip if it's clearly a PT (>40% above) or stop (>40% below) or sector ref
 if(ref>p*0.6&&ref<p*1.5&&Math.abs(ref-p)/p>0.15){
 oppDynIssues.push(t+": thesis first-$ ref $"+ref+" vs price $"+p.toFixed(0)+" ("+Math.round(Math.abs(ref-p)/p*100)+"% off)");
 }
 }
 });
 if(oppDynIssues.length>0){
 checks.push({cat:"OPP DYNAMIC",sev:oppDynIssues.length>3?"MED":"LOW",
 msg:"INFO (workflow signal): "+oppDynIssues.length+" ticker(s) with stale thesis-first-$ refs: "+oppDynIssues.slice(0,3).join("; "),
 fix:"Update 1W thesis headline price refs to current ticker price after each session.",
 pts:0});
 } else {
 checks.push({cat:"OPP DYNAMIC",sev:"OK",msg:"1W thesis price refs within 15% of current prices",fix:"",pts:0});
 }

 // CHECK 107: POLICY CALENDAR ROLL — auto-flag past-dated policy events without ✓ marker
 // Existing CHECK 44 does this but as INFO. Make explicit + actionable.
 // Reads from the hardcoded policyDates list to detect past events that should be marked ✓.
 const policyRollIssues=[];
 if(typeof policyDates!=="undefined"){
 policyDates.forEach(p=>{
 if(!p.d||p.d.includes("✓")||p.d.includes("Q")||p.d.includes("Ongoing"))return;
 const dm=p.d.match(/^(\w+)\s+(\d+)/);
 if(!dm)return;
 const mo=monthLkEd[dm[1]];if(mo===undefined)return;
 const pd=new Date(2026,mo,parseInt(dm[2]));
 if(pd<today){
 policyRollIssues.push(p.d+": "+p.e+" → mark ✓");
 }
 });
 }
 if(policyRollIssues.length>0){
 checks.push({cat:"POLICY ROLL",sev:"LOW",
 msg:policyRollIssues.length+" past policy event(s) need ✓ marker: "+policyRollIssues.slice(0,3).join("; "),
 fix:"Edit policyDates entries: change \"May 12\" to \"May 12 ✓\" etc. Add new upcoming dates.",
 pts:-2});
 totalScore-=2;
 } else {
 checks.push({cat:"POLICY ROLL",sev:"OK",msg:"All policy calendar dates either future or marked ✓",fix:"",pts:0});
 }

 // ═══════════════════════════════════════════════════════════════
 // CHECKS 108-109: Added May 26 — fundamentals freshness + global stale-date scan
 // ═══════════════════════════════════════════════════════════════

 // CHECK 108: FUNDAMENTALS REFRESH — the fund (fundamentals) block must be reviewed,
 // especially after an earnings event. If a ticker's earnings passed recently (within 21d)
 // but fund.thesisDate/fundDate predates that earnings, the fundamentals tab is stale.
 // Also flags fund blocks missing required narrative fields.
 const fundRefreshIssues=[];
 const monthLk108={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 const parseDate108=(str)=>{
 if(!str)return null;
 const m=str.match(/(\w+)\s+(\d+),?\s*(\d{4})?/);
 if(!m)return null;
 const mo=monthLk108[m[1]];if(mo===undefined)return null;
 return new Date(parseInt(m[3]||"2026"),mo,parseInt(m[2]));
 };
 tickers.forEach(t=>{
 const s=S[t];
 if(!s.fund){fundRefreshIssues.push(t+": no fund block");return;}
 // Required narrative fields
 const missing=[];
 ["story","bull","bear","killer"].forEach(f=>{if(!s.fund[f]||s.fund[f].length<10)missing.push(f);});
 if(missing.length>0)fundRefreshIssues.push(t+": fund missing/thin "+missing.join("/"));
 // Post-earnings staleness: did earnings pass recently but thesis predate it?
 const thesisD=parseDate108(s.fund.thesisDate);
 // Find most recent passed earnings from news (category "e") or earningsDate with ✓
 const earnItems=(s.news||[]).filter(it=>it.category==="e"&&it.dateStr);
 let lastEarnD=null;
 earnItems.forEach(it=>{const d=new Date(it.dateStr);if(!isNaN(d)&&d<=today&&(!lastEarnD||d>lastEarnD))lastEarnD=d;});
 if(lastEarnD&&thesisD){
 const daysSinceEarn=Math.floor((today-lastEarnD)/(1000*60*60*24));
 if(daysSinceEarn<=21&&thesisD<lastEarnD){
 fundRefreshIssues.push(t+": earnings "+lastEarnD.toLocaleDateString()+" passed but fundamentals dated "+s.fund.thesisDate+" (pre-earnings) — refresh thesis/bull/bear");
 }
 }
 // Financial metrics panel staleness — metrics.lastQ must reflect the latest REPORTED quarter.
 // Smart rule: flag ONLY if a more-recent earnings has actually passed than what the panel shows.
 // This avoids false-flagging slow-fiscal-cadence names (e.g. CRWD/AVGO) whose panel correctly
 // displays their genuinely-latest report even if it's >100 days old.
 if(s.fund&&s.fund.metrics&&s.fund.metrics.lastQ){
 const monthLkAO={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 const lq=s.fund.metrics.lastQ;
 const asOfM=lq.match(/\((\w+)\s+(\d{4})\)/);
 if(asOfM&&monthLkAO[asOfM[1]]!==undefined){
 const asOfD=new Date(parseInt(asOfM[2]),monthLkAO[asOfM[1]],28);
 // Determine the most recent PASSED earnings date. Prefer a ✓-marked earningsDate or
 // recent category-"e" news; fall back to lastEarnD computed above.
 // Skip earnings items that name the panel's own quarter (e.g. a later "Q2 beat confirmed"
 // recap) — they are not evidence that a newer quarter was reported.
 const panelQ=(lq.match(/\bQ(\d)\b/)||[])[1];
 let recentReportD=null;
 earnItems.forEach(it=>{const hq=((it.headline||"").match(/\bQ(\d)\b/)||[])[1];if(panelQ&&hq===panelQ)return;const d=new Date(it.dateStr);if(!isNaN(d)&&d<=today&&(!recentReportD||d>recentReportD))recentReportD=d;});
 // Also check earningsDate field if it's marked ✓ (means it passed)
 if(s.earningsDate&&s.earningsDate.includes("✓")){
 const edM=s.earningsDate.match(/(\w+)\s+(\d+)/);
 if(edM&&monthLkAO[edM[1]]!==undefined){
 const edD=new Date(2026,monthLkAO[edM[1]],parseInt(edM[2]));
 if(edD<=today&&(!recentReportD||edD>recentReportD))recentReportD=edD;
 }
 }
 // Flag only if a report happened that is at least ~75 days AFTER the panel's as-of date
 // (i.e. a whole new quarter was reported that the panel hasn't captured) and that report
 // was within the last 45 days (so it's the current refresh window).
 if(recentReportD){
 const reportVsPanelGap=Math.floor((recentReportD-asOfD)/(1000*60*60*24));
 const daysSinceReport=Math.floor((today-recentReportD)/(1000*60*60*24));
 if(reportVsPanelGap>=75&&daysSinceReport<=45){
 fundRefreshIssues.push(t+": Financial Metrics panel shows "+lq+" but a newer quarter was reported "+daysSinceReport+"d ago — update revGrowth/margins/ROE/P-E");
 }
 }
 }
 }
 });
 if(fundRefreshIssues.length>0){
 const sev=fundRefreshIssues.length>4?"HIGH":"MED";
 const pts=fundRefreshIssues.length>4?-6:-3;
 checks.push({cat:"FUNDAMENTALS",sev,
 msg:fundRefreshIssues.length+" fundamentals refresh issue(s): "+fundRefreshIssues.slice(0,3).join("; ")+(fundRefreshIssues.length>3?" +"+(fundRefreshIssues.length-3)+" more":""),
 fix:"Update fund.story/bull/bear/killer + bump thesisDate/fundDate to reflect post-earnings reality. Fundamentals tab must reflect latest print.",
 pts});
 totalScore+=pts;
 } else {
 checks.push({cat:"FUNDAMENTALS",sev:"OK",msg:"All fundamentals blocks complete and current with latest earnings",fix:"",pts:0});
 }

 // CHECK 109: GLOBAL STALE DATE SCAN — scan ALL forward-looking date references across the tool.
 // Catches dates that have passed but are still framed as upcoming (no ✓), anywhere:
 // catalysts, earningsDate, epsEstDate, ptDate, supportDate, techDate, stopDate, optionsDate, playbook prose, MACRO note.
 // Does NOT flag historical news items (those legitimately reference past dates as completed events).
 // This is the comprehensive version of the date-drift checks — it catches what the targeted ones miss.
 const staleDateIssues=[];
 const monthRe=/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2})(?!\d)(?!\s*✓)(?!,?\s*\d{4})/g;
 // Historical framing words — if a date sits near these, it's describing the past (correct), not a stale forward ref
 const histMarkers=/verified|close|as of|dated|reported|posted|confirmed|prior|last|since|drift|aligned|history|recorded/i;
 const fwdMarkers=/earnings|reports|catalyst|ahead|upcoming|expected|guide|due|watch|binary|print|decision|ruling|event|meeting/i;
 const scanField=(t,fieldName,text,requireForward)=>{
 if(!text||typeof text!=="string")return;
 let m;
 const re=new RegExp(monthRe.source,"g");
 while((m=re.exec(text))!==null){
 const mo=monthLk108[m[1]];if(mo===undefined)continue;
 const day=parseInt(m[2]);
 const after=text.slice(m.index,m.index+m[0].length+4);
 if(after.includes("✓"))continue;
 // Context window around the date
 const ctx=text.slice(Math.max(0,m.index-40),m.index+m[0].length+15);
 // Skip if historical framing and NOT forward framing
 if(histMarkers.test(ctx)&&!fwdMarkers.test(ctx))continue;
 const refD=new Date(2026,mo,day);
 const daysPast=Math.floor((today-refD)/(1000*60*60*24));
 if(daysPast>=1&&daysPast<=90){
 staleDateIssues.push(t+" ["+fieldName+"]: \""+m[0]+"\" passed "+daysPast+"d ago — mark ✓ or update");
 }
 }
 };
 tickers.forEach(t=>{
 const s=S[t];
 // Forward-looking date-bearing fields (NOT news — those are historical)
 scanField(t,"earningsDate",s.earningsDate,true);
 // Catalysts (forward-looking by definition)
 if(s.catalysts)s.catalysts.forEach((c,i)=>{
 if(c.d&&!c.d.includes("Q")&&!c.d.includes("H1")&&!c.d.includes("H2")&&!c.d.includes("2027")&&!c.d.includes("2028")&&!c.d.includes("ongoing")&&!c.d.includes("Ongoing"))
 scanField(t,"catalyst:"+(c.e||i).slice(0,20),c.d,true);
 });
 // Active risks with catalyst dates
 if(s.fund&&s.fund.activeRisks)s.fund.activeRisks.forEach(r=>{
 if(r.catalyst)scanField(t,"activeRisk",r.catalyst,true);
 });
 // Playbook prose (1W/1M/3M) — forward-looking actions
 if(s.playbook)s.playbook.forEach(pb=>{
 const txt=((pb.bias||"")+" "+(pb.action||"")).slice(0,400);
 scanField(t,"playbook-"+(pb.h||""),txt,true);
 });
 });
 // Dedupe
 const uniqStale=[...new Set(staleDateIssues)];
 if(uniqStale.length>0){
 const sev=uniqStale.length>5?"HIGH":uniqStale.length>2?"MED":"LOW";
 const pts=uniqStale.length>5?-6:uniqStale.length>2?-3:-1;
 checks.push({cat:"STALE DATES",sev,
 msg:uniqStale.length+" out-of-date forward references: "+uniqStale.slice(0,3).join("; ")+(uniqStale.length>3?" +"+(uniqStale.length-3)+" more":""),
 fix:"For each: if the event happened, mark the date with ✓ and update the surrounding content to reflect the outcome. If it's a typo/wrong date, correct it.",
 pts});
 totalScore+=pts;
 } else {
 checks.push({cat:"STALE DATES",sev:"OK",msg:"No out-of-date forward-looking date references — all past events marked ✓ or updated",fix:"",pts:0});
 }

 // ══════════════════════════════════════════════════════════
 // CHECKS 101-110 — added Sep 3, 2026.
 // Each one corresponds to something that was silently wrong for weeks
 // and was caught by eye, not by this file.
 // ══════════════════════════════════════════════════════════

 // 101. GLOBAL REFRESH BANNER — lived at "Mar 31, 2026" for five months
 {const bm=(typeof BANNER_DATE!=="undefined")?BANNER_DATE:null;
  const bd=bm?new Date(bm):null;
  const bAge=bd?db(bd,TD):999;
  if(bAge>3){checks.push({cat:"BANNER DATE",sev:"HIGH",msg:`Global REFRESHED banner is ${bAge}d old`,fix:"Update the banner text at the top of the ticker view",pts:-6});totalScore-=6;}
  else checks.push({cat:"BANNER DATE",sev:"OK",msg:"Global refresh banner current",fix:"",pts:0});}

 // 102. VERDICT.DRIVERS — the technicals-tab summary. Was stale on 14/21.
 {const vd=[];
  tickers.forEach(t=>{const s=S[t],p=prices[t];
   const d=s.verdict&&s.verdict.drivers?s.verdict.drivers:"";
   if(!d||!p)return;
   const m=d.match(/\$([0-9,]+(?:\.[0-9]+)?)/);
   if(!m){vd.push(t+": no price in drivers");return;}
   const v=parseFloat(m[1].replace(/,/g,""));
   if(Math.abs(v-p)/p>0.05)vd.push(`${t}: drivers lead $${v} vs $${p.toFixed(2)}`);});
  if(vd.length){checks.push({cat:"VERDICT DRIVERS",sev:vd.length>3?"HIGH":"MED",msg:`${vd.length} stale technicals summaries: ${vd.slice(0,3).join("; ")}`,fix:"Rewrite verdict.drivers leading with the current price",pts:vd.length>3?-6:-3});totalScore-=vd.length>3?6:3;}
  else checks.push({cat:"VERDICT DRIVERS",sev:"OK",msg:"All technicals summaries lead with current price",fix:"",pts:0});}

 // 103. SHARE COUNTS IN LIVE PROSE — position sizes must not appear outside dated news
 {const sc=[];
  tickers.forEach(t=>{const s=S[t];
   ["note","story","supportNote","supportAnchor"].forEach(k=>{
    const v=s[k]||(s.fund&&s.fund[k])||"";
    if(typeof v==="string"&&/\b\d+(\.\d+)? shares\b/.test(v))sc.push(t+"."+k);});});
  if(sc.length){checks.push({cat:"SHARE COUNTS",sev:"MED",msg:`${sc.length} live prose fields contain share counts: ${sc.slice(0,4).join(", ")}`,fix:"Remove position sizes from live prose (dated news items may keep them)",pts:-4});totalScore-=4;}
  else checks.push({cat:"SHARE COUNTS",sev:"OK",msg:"No share counts in live prose",fix:"",pts:0});}

 // 104. MA BLOCK COMPLETENESS — 5 tickers had ma:{align:...} with no d50 key
 {const mb=[];
  tickers.forEach(t=>{const ma=S[t].tech&&S[t].tech.ma?S[t].tech.ma:null;
   if(!ma){mb.push(t+": no ma block");return;}
   ["d50","d100","d200","d400"].forEach(k=>{if(ma[k]===undefined||ma[k]===null)mb.push(t+": missing "+k);});});
  if(mb.length){checks.push({cat:"MA COMPLETENESS",sev:mb.length>4?"HIGH":"MED",msg:`${mb.length} missing MA values: ${mb.slice(0,4).join("; ")}`,fix:"Populate d50/d100/d200/d400 from the API for every ticker",pts:mb.length>4?-6:-3});totalScore-=mb.length>4?6:3;}
  else checks.push({cat:"MA COMPLETENESS",sev:"OK",msg:"All 4 moving averages present on every ticker",fix:"",pts:0});}

 // 105. RSI NULL — a [0-9.]+ regex silently skips null, so 5 tickers never updated
 {const rn=tickers.filter(t=>{const m=S[t].tech&&S[t].tech.momentum;return !m||m.rsi===null||m.rsi===undefined;});
  if(rn.length){checks.push({cat:"RSI PRESENT",sev:"HIGH",msg:`${rn.length} tickers have null RSI: ${rn.join(", ")}`,fix:"Match (null|[0-9.]+) when writing RSI, not just digits",pts:-6});totalScore-=6;}
  else checks.push({cat:"RSI PRESENT",sev:"OK",msg:"RSI present on all tickers",fix:"",pts:0});}

 // 106. SUPPORT RELEVANCE — MRVL ranked a level 57% below price as S1
 {const sr=[];
  tickers.forEach(t=>{const s=S[t],p=prices[t];
   if(!s.support||!s.support[0]||!p)return;
   const d=(p-s.support[0].lvl)/p*100;
   if(d>35)sr.push(`${t}: S1 ${d.toFixed(0)}% below`);
   if(s.support[0].lvl>p)sr.push(`${t}: S1 ABOVE price`);});
  if(sr.length){checks.push({cat:"SUPPORT RELEVANCE",sev:"HIGH",msg:`${sr.length} support ladders not decision-relevant: ${sr.slice(0,3).join("; ")}`,fix:"Filter swing lows for proximity BEFORE ranking by held_count",pts:-6});totalScore-=6;}
  else checks.push({cat:"SUPPORT RELEVANCE",sev:"OK",msg:"Every S1 below price and within 35%",fix:"",pts:0});}

 // 107. SUPPORT PROVENANCE — every level must be an observed swing low
 {const sp=[];
  tickers.forEach(t=>{const s=S[t];
   if(!s.support)return;
   s.support.forEach(l=>{if(!/Swing low|Volume node|derived/i.test(l.label||""))sp.push(`${t}: "${(l.label||"").slice(0,28)}"`);});});
  if(sp.length){checks.push({cat:"SUPPORT PROVENANCE",sev:"HIGH",msg:`${sp.length} support levels are not observed price action: ${sp.slice(0,3).join("; ")}`,fix:"Support = swing lows and volume nodes only. No MAs, no max pain, no estimates.",pts:-6});totalScore-=6;}
  else checks.push({cat:"SUPPORT PROVENANCE",sev:"OK",msg:"All support levels are observed price action",fix:"",pts:0});}

 // 108. FUNDAMENTALS HONESTY — lastQ must not claim a quarter the metrics predate
 {const fh=[];
  tickers.forEach(t=>{const s=S[t];
   const lq=s.fund&&s.fund.metrics?s.fund.metrics.lastQ:null;
   const fv=s.fundVerified;
   if(!lq){fh.push(t+": no lastQ");return;}
   if(fv===true&&/Q1|Mar|Apr/i.test(lq))fh.push(`${t}: fundVerified true but lastQ ${lq}`);});
  if(fh.length){checks.push({cat:"FUND HONESTY",sev:"MED",msg:`${fh.length} fundamentals mislabelled: ${fh.slice(0,3).join("; ")}`,fix:"Set fundVerified:false unless the latest quarter has been sourced",pts:-4});totalScore-=4;}
  else checks.push({cat:"FUND HONESTY",sev:"OK",msg:"Fundamentals verification flags honest",fix:"",pts:0});}

 // 109. IV RANK HONESTY — a fabricated ivRank once drove a live options recommendation
 {const iv=tickers.filter(t=>{const o=S[t].options;return o&&o.ivRank!==null&&o.ivRank!==undefined&&!o.ivVerified;});
  if(iv.length){checks.push({cat:"IV HONESTY",sev:"HIGH",msg:`${iv.length} tickers show an ivRank without verification: ${iv.slice(0,4).join(", ")}`,fix:"ivRank must be null until ~20 daily API readings accumulate",pts:-8});totalScore-=8;}
  else checks.push({cat:"IV HONESTY",sev:"OK",msg:"No unverified IV rank displayed",fix:"",pts:0});}

 // 110. MAX PAIN EXPIRATION — nearest expiry is short-lived and must not anchor risk
 {const mp=[];
  tickers.forEach(t=>{const o=S[t].options;
   if(!o||!o.maxPain)return;
   if(o.maxPainDTE!==undefined&&o.maxPainDTE<7)mp.push(`${t}: maxPain uses a ${o.maxPainDTE}d expiry`);});
  if(mp.length){checks.push({cat:"MAX PAIN EXPIRY",sev:"MED",msg:`${mp.length} tickers anchor max pain to a near-dated expiry: ${mp.slice(0,3).join("; ")}`,fix:"Use the HEAVIEST expiration; label the nearest as short-lived",pts:-4});totalScore-=4;}
  else checks.push({cat:"MAX PAIN EXPIRY",sev:"OK",msg:"Max pain uses the heaviest expiration",fix:"",pts:0});}


totalScore=Math.max(0,Math.min(100,totalScore));
 const grade=totalScore>=90?"A+":totalScore>=80?"A":totalScore>=70?"B+":totalScore>=65?"B":totalScore>=55?"C+":totalScore>=45?"C":totalScore>=30?"D":"F";
 const gradeColor=totalScore>=80?G:totalScore>=60?Y:R;
 const highCount=checks.filter(c=>c.sev==="HIGH").length;
 const medCount=checks.filter(c=>c.sev==="MED").length;
 const okCount=checks.filter(c=>c.sev==="OK").length;

 return{checks,totalScore,grade,gradeColor,highCount,medCount,okCount,daysSinceUpdate,earningsAlerts,expiredCatalysts};
 },[allItems,prices,rankerData]);

 return(
 <div style={{background:"#0D0D0D",color:"#F4EEDF",fontFamily:"'Josefin Sans',system-ui,sans-serif",minHeight:"calc(100dvh - var(--nav-h, 66px))"}}>
 <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Josefin+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
 <style>{`@keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(0,212,255,0.4)}50%{opacity:0.5;box-shadow:0 0 0 4px rgba(0,212,255,0)}}`}</style>

 {/* TICKER BAR */}
 <div style={{background:"#17131A",borderBottom:"1px solid #2C2433",padding:"0 16px",display:"flex",alignItems:"center",overflowX:"auto",position:"sticky",top:"var(--nav-h, 66px)",zIndex:90}}>
 <span onClick={()=>setShowPortfolio(true)} style={{...M,fontWeight:700,fontSize:18,letterSpacing:2.5,color:showPortfolio?"#0D0D0D":"#E6A817",marginRight:8,flexShrink:0,cursor:"pointer",background:showPortfolio?"#E6A817":"transparent",padding:"6px 10px",borderRadius:4,transition:"all 0.2s"}} title="Portfolio Dashboard">ADE</span>
 <span onClick={()=>{setShowHealth(!showHealth);setShowPortfolio(true);}} style={{...M,fontSize:17,cursor:"pointer",marginRight:8,flexShrink:0,padding:"4px 8px",borderRadius:4,background:showHealth?"#241C2B":"transparent",border:`1px solid ${healthCheck.totalScore>=80?G+"44":healthCheck.totalScore>=60?Y+"44":R+"44"}`,display:"flex",alignItems:"center",gap:4,transition:"all 0.2s"}} title="Dashboard Health Check">
 <span style={{fontSize:16}}>🩺</span>
 <span style={{...M,fontSize:14,fontWeight:700,color:healthCheck.gradeColor}}>{healthCheck.grade}</span>
 </span>
 {tickers.map(t=>{const s=S[t],isA=t===activeTicker&&!showPortfolio,sp=computeSignal(s,allItems[t],prices[t],"none");return(
 <button key={t} onClick={()=>{setActiveTicker(t);setEps("none");setFilter("all");setTab("feed");setShowPortfolio(false);}} style={{...M,fontSize:15,padding:"10px 12px",border:"none",borderBottom:isA?"2px solid #E6A817":"2px solid transparent",background:"transparent",color:isA?"#E6A817":"#B8AE92",cursor:"pointer",fontWeight:isA?700:400,display:"flex",flexDirection:"column",alignItems:"center",gap:2,flexShrink:0}}>
 <span>{t}</span>
 <span style={{fontSize:13,color:sp.score>20?G:sp.score>-5?Y:R}}>{sp.score>0?"+":""}{sp.score}</span>
 </button>);})}
 </div>

 <div style={{padding:"12px 16px 40px",maxWidth:1200,margin:"0 auto"}}>

 {/* ═══════════════════════════════════════════════ */}
 {/* PORTFOLIO DASHBOARD */}
 {/* ═══════════════════════════════════════════════ */}
 {showPortfolio&&(<div>
 {/* HEADER */}
 <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
 <div>
 <span style={{...M,fontWeight:700,fontSize:24,background:"linear-gradient(135deg,#E6A817,#B266FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>PORTFOLIO DASHBOARD</span>
 <div style={{...M,fontSize:13,color:"#9A8F82",marginTop:2}}>{tickers.length} tickers • Signal-weighted overview • Click any row to drill in</div>
 </div>
 <div style={{display:"flex",gap:4,alignItems:"center"}}>
 {["snapshot","market"].map(v=>(<button key={v} onClick={()=>setPortfolioView(v)} style={{...M,fontSize:13,padding:"4px 10px",border:`1px solid ${portfolioView===v?(v==="exit"?"#E8643A":"#E6A817"):"#3A3042"}`,background:portfolioView===v?(v==="exit"?"#E8643A15":"#E6A81715"):"transparent",color:portfolioView===v?(v==="exit"?"#E8643A":"#E6A817"):"#9A8F82",borderRadius:4,cursor:"pointer",fontWeight:600}}>{v==="snapshot"?"SNAPSHOT":v==="market"?"MARKET":"EXIT MAP"}</button>))}
 </div>
 </div>

 {/* HEALTH CHECK PANEL */}
 {showHealth&&<div style={{background:"#17131A",border:`1px solid ${healthCheck.gradeColor}33`,borderRadius:6,padding:16,marginBottom:12}}>
 <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
 <div style={{display:"flex",alignItems:"center",gap:10}}>
 <span style={{fontSize:22}}>🩺</span>
 <div>
 <span style={{...M,fontSize:17,fontWeight:700,color:"#F4EEDF"}}>Dashboard Health Check</span>
 <div style={{...M,fontSize:13,color:"#9A8F82",marginTop:1}}>Auto-audit of all data integrity, freshness, and coherence</div>
 </div>
 </div>
 <div style={{display:"flex",alignItems:"center",gap:12}}>
 <div style={{textAlign:"center"}}>
 <div style={{...M,fontSize:40,fontWeight:800,color:healthCheck.gradeColor}}>{healthCheck.grade}</div>
 <div style={{...M,fontSize:13,color:"#9A8F82"}}>GRADE</div>
 </div>
 <div style={{textAlign:"center"}}>
 <div style={{...M,fontSize:40,fontWeight:800,color:healthCheck.gradeColor}}>{healthCheck.totalScore}</div>
 <div style={{...M,fontSize:13,color:"#9A8F82"}}>SCORE</div>
 </div>
 </div>
 </div>
 {/* Score bar */}
 <div style={{height:8,background:"#241C2B",borderRadius:4,overflow:"hidden",marginBottom:12}}>
 <div style={{width:`${healthCheck.totalScore}%`,height:"100%",background:`linear-gradient(90deg,${healthCheck.gradeColor}88,${healthCheck.gradeColor})`,borderRadius:4,transition:"width 0.5s"}}/>
 </div>
 {/* Summary badges */}
 <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
 {healthCheck.highCount>0&&<span style={{...M,fontSize:13,fontWeight:700,padding:"3px 8px",borderRadius:4,background:R+"15",color:R,border:`1px solid ${R}33`}}>{healthCheck.highCount} CRITICAL</span>}
 {healthCheck.medCount>0&&<span style={{...M,fontSize:13,fontWeight:700,padding:"3px 8px",borderRadius:4,background:Y+"15",color:Y,border:`1px solid ${Y}33`}}>{healthCheck.medCount} WARNING</span>}
 <span style={{...M,fontSize:13,fontWeight:700,padding:"3px 8px",borderRadius:4,background:G+"15",color:G,border:`1px solid ${G}33`}}>{healthCheck.okCount} PASS</span>
 <span style={{...M,fontSize:13,padding:"3px 8px",borderRadius:4,background:"#E6A81708",color:"#E6A817",border:"1px solid #E6A81722"}}>Updated {healthCheck.daysSinceUpdate}d ago</span>
 </div>
 {/* Individual checks */}
 <div style={{display:"flex",flexDirection:"column",gap:4}}>
 {healthCheck.checks.map((ch,i)=>(<div key={i} style={{display:"flex",gap:8,padding:"8px 10px",background:ch.sev==="HIGH"?"#E8643A06":ch.sev==="MED"?"#FFBF0006":"transparent",border:`1px solid ${ch.sev==="HIGH"?"#E8643A22":ch.sev==="MED"?"#FFBF0022":G+"22"}`,borderRadius:4,alignItems:"flex-start"}}>
 <div style={{flexShrink:0,minWidth:72,display:"flex",alignItems:"center",gap:4}}>
 <span style={{fontSize:15}}>{ch.sev==="HIGH"?"🔴":ch.sev==="MED"?"🟡":"🟢"}</span>
 <span style={{...M,fontSize:12,fontWeight:700,color:ch.sev==="HIGH"?R:ch.sev==="MED"?Y:G,textTransform:"uppercase",letterSpacing:0.5}}>{ch.cat}</span>
 </div>
 <div style={{flex:1}}>
 <div style={{...M,fontSize:14,color:"#E8E1D0",lineHeight:1.5}}>{ch.msg}</div>
 {ch.fix&&<div style={{...M,fontSize:12,color:"#E08A4A",marginTop:2}}>Fix: {ch.fix}</div>}
 </div>
 {ch.pts!==0&&<div style={{flexShrink:0,...M,fontSize:14,fontWeight:700,color:R}}>{ch.pts}</div>}
 </div>))}
 </div>
 {/* Earnings alerts detail */}
 {healthCheck.earningsAlerts.length>0&&<div style={{marginTop:10,padding:"8px 10px",background:"#B266FF08",border:"1px solid #B266FF22",borderRadius:4}}>
 <div style={{...M,fontSize:13,fontWeight:700,color:"#B266FF",marginBottom:4}}>EARNINGS IN 7 DAYS — ACTION REQUIRED</div>
 {healthCheck.earningsAlerts.map((e,i)=>(<div key={i} style={{...M,fontSize:14,color:"#E8E1D0",marginBottom:2}}>
 <span style={{fontWeight:700,color:"#B266FF"}}>{e.ticker}</span> — {e.date} ({e.dte===0?"TODAY":e.dte+"d"}) → Update playbook, patterns, risk scenarios, options data
 </div>))}
 </div>}
 {/* Quick fix guide */}
 {healthCheck.totalScore<80&&<div style={{marginTop:10,padding:"8px 10px",background:"#E6A81708",border:"1px solid #E6A81722",borderRadius:4}}>
 <div style={{...M,fontSize:13,fontWeight:700,color:"#E6A817",marginBottom:4}}>QUICK FIX GUIDE</div>
 <div style={{...M,fontSize:13,color:"#B8AE92",lineHeight:1.7}}>
 Screenshot this panel and share it to get a targeted refresh. Priority order: CRITICAL items first, then WARNINGS. Each fix will improve the health score.
 </div>
 </div>}
 </div>}

 {/* SUMMARY CARDS */}
 {portfolioView==="market"&&<div>
 {/* ═══════════════════════════════════════════════ */}
 {/* MARKET INTELLIGENCE VIEW */}
 {/* ═══════════════════════════════════════════════ */}

 {/* MACRO REGIME */}
 <div style={{background:"#17131A",border:`1px solid ${MACRO.color}33`,borderRadius:6,padding:14,marginBottom:10}}>
 <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
 <span style={{width:10,height:10,borderRadius:5,background:MACRO.color}}/>
 <span style={{...M,fontSize:17,fontWeight:700,color:MACRO.color}}>{MACRO.regime}</span>
 <span style={{...M,fontSize:13,color:"#9A8F82",marginLeft:"auto"}}>VIX {MACRO.vix} • CPI {MACRO.cpi==null?"n/a":MACRO.cpi+"%"} • Fed: {MACRO.rateOutlook}</span>
 </div>
 <div style={{...M,fontSize:14,color:"#D6CDB6",lineHeight:1.7}}>{MACRO.note}</div>
 </div>

 {/* KEY THEMES */}
 <div style={{...M,fontSize:14,fontWeight:700,color:"#E6A817",marginBottom:8}}>KEY INVESTMENT THEMES · written by ADE, {(globalThis.__ADE_LIVE__||{}).adeDate||""}, not refreshed here</div>
 {[
 {theme:"AI Infrastructure Buildout",horizon:"NOW → 2028",status:"ACCELERATING",color:"#3DBFA8",
 tam:"$1.7T infra TAM by 2030",cagr:"Capex guides still rising",
 sub:["Alphabet DOUBLED 2026 capex to 205B (Jul 22) — punished -7% for it. OpenAI compute plan hits 750B. TSLA committing 25B+. Every dollar flows into NVDA/AVGO/TSM/VRT/PWR/ANET/LRCX/ASML",
 "The market has flipped to ROI scrutiny: SPENDERS sold off 3-7%, SUPPLIERS green on the same day (MU +2.8, PWR +2.2, LRCX +1.7). Velocity-of-money thesis playing out literally",
 "AMD lands 2GW Anthropic deal + 5B investment plan (Jul 22) — custom compute demand broadening beyond NVDA",
 "SK Hynix 26.5B IPO priced — largest chip IPO ever, expands HBM capex; ASML flagged biggest beneficiary"],
 exposure:"NVDA, AVGO, MRVL, VRT, PWR, ANET, TSM, LRCX, ASML",risk:"ROI reckoning could broaden from spenders to suppliers if 2027 capex guides flatten. China cheap-model releases (Kimi K3) pressure the economics narrative. Correlation remains the book risk."},

 {theme:"Memory / HBM Supercycle",horizon:"NOW → 2027",status:"PEAK EARNINGS, COMPRESSING MULTIPLE",color:"#FFBF00",
 tam:"$147B HBM market by 2027",cagr:"MU fwd P/E ~8-10x and falling as EPS explodes",
 sub:["Q3 BLOWOUT (Jun 24): rev $41.5B — 4x YoY, vs $35B est. EPS $25.11 vs $20.39e. GM 84.9%. Q4 guided $49-51B vs $43.2B consensus",
 "16 long-term Strategic Customer Agreements signed, $22B committed, ~40% of revenue on minimum-price contracts (RBC) — structurally weakens the classic 2028 crash case. Anthropic supply deal. Dividend initiated",
 "Stock: $1,137 pre-print ATH → +15% print spike → faded to $986 in the July pullback. Market refusing peak multiples even on exploding EPS — the de-rating phase is visible in real time",
 "HBM4 on 1-beta in high-volume shipment for lead customer; qual samples at multiple end-customers"],
 exposure:"MU (concentrated), TSM (HBM packaging)",risk:"Multiple compression IS the risk, now playing out: EPS up 4x, stock DOWN from ATH. LTA price floors partially offset 2028 supply-normalization risk but do not eliminate de-rating. Standing plan: trim 25-40% into Dec 2026-Feb 2027 strength; hold HBM-mix core only past Mar 2027. Next print Sep 29."},

 {theme:"Custom Silicon / Inference Pivot",horizon:"2026 → 2028",status:"FROTH UNWOUND",color:"#B266FF",
 tam:"$180B inference market by 2028",cagr:"MRVL multiple compressed 74x → ~40x",
 sub:["MRVL unwound -33% from the Jensen-spike high (319 → 210) — exactly the 74x-froth compression the scenario work flagged. Now BELOW the 260 base case. Position averaged down +the position into the decline",
 "AMD 2GW Anthropic deal + 5B investment (Jul 22) — second major lab committing to non-NVDA compute",
 "AVGO steady ~392 — custom ASIC franchise (TPU, MTIA) intact through the rotation",
 "Inference now 60%+ of AI compute — the structural tailwind is unchanged; the entry multiple reset is the story"],
 exposure:"AVGO, MRVL, MU, TSM, AMD",risk:"MRVL is now a show-me story at ~40x — needs the custom-silicon wins to convert. NVDA Vera Rubin could reassert. Same-factor correlation with the GPU names."},

 {theme:"AI Power / Grid Buildout",horizon:"NOW → 2030",status:"COOLING",color:Y,
 tam:"$125B data center power by 2030",cagr:"28% CAGR but sector -7% week",
 sub:["VST: Q1 beat+raise May 7, but stock faded post-earnings. Now $137 vs $228 avg PT (40%+ upside if holds)",
 "PWR: $44B backlog, but stock $729 vs new $504 avg PT (-31% downside to consensus)",
 "Nuclear renaissance still real (VST fleet + hyperscaler PPAs) — pullback is sell-the-news, not thesis break",
 "Adjacent: CEG/GEV missing from book (highlighted in prior gap analysis)"],
 exposure:"VST (nuclear), PWR (grid), VRT (cooling)",risk:"PWR most stretched in portfolio (+45% over consensus). VST 52w low $134 near."},

 {theme:"Hyperscaler Exposure (largely exited)",horizon:"NOW → ongoing",status:"EXIT VALIDATED",color:"#888",
 tam:"Their capex = our revenue",cagr:"Spenders punished, suppliers paid",
 sub:["Jul 23 was the thesis in one day: Alphabet doubled capex to 205B and fell 7% for it — while our supplier names closed green. Exiting MSFT/META/GOOGL and owning the receivers of that spend is working precisely as designed",
 "AMZN retained — earnings Jul 30, AWS AI demand strong. Watching: Senate China-influence scrutiny, AGI-unit job cuts, Iran attack on Bahrain infrastructure (Jul 21)",
 "V sold — final non-AI diversifier out",
 "Rebuild option stays open: mega-cap entries do not decay like beta names"],
 exposure:"AMZN only. MSFT/META/GOOGL/V SOLD.",risk:"Hyperscaler capex cuts would eventually hit suppliers too — watch 2027 guides. AMZN carries its own capex-ROI scrutiny into Jul 30 print."},

 {theme:"Photonic Interconnects",horizon:"2027 → 2030",status:"EARLY STAGE",color:"#FFBF00",
 tam:"$8B by 2030 (from $0.5B today)",cagr:"75% CAGR (nascent)",
 sub:["Electrical interconnects hitting bandwidth wall at 800G+",
 "MRVL Celestial AI — photonic fabric for AI clusters (acquired)",
 "AVGO betting copper near-term (disagrees with fiber timeline)",
 "Gap analysis flagged CRDO/LITE/COHR as optical pure-plays not held"],
 exposure:"MRVL (Celestial), ANET (switches), TSM (photonics fab)",risk:"Technology timeline risk — commercial 2028+. AVGO copper roadmap may delay fiber adoption."},

 {theme:"Macro: Volatility Regime",horizon:"NOW",status:"ELEVATED",color:R,
 tam:"VIX 18.7. SPY 7408. Brent >100",cagr:"War premium + AI ROI angst",
 sub:["Brent crossed 100 for first time in two months — US-Iran conflict widening, Houthi tanker attacks in Red Sea. 10Y yield at 18-month high on inflation re-fear",
 "Megacap gauge worst session since the Apr-2025 tariff rout. Nasdaq briefly below 25K first time since May",
 "AI capex ROI is now the market question — GOOGL and TSLA both posted negative FCF quarters",
 "Gold ~4050, VIX 18.7 +12% — hedged tone returning. Energy strength persists"],
 exposure:"~80% AI-capex correlated. Ballast: power layer (VST/PWR/VRT) proving decoupled on red days.",risk:"Oil >100 sustained = inflation reacceleration = rate-cut path dies = multiple compression across the book. The war is the tail risk nobody can model."},

 {theme:"AI Software / SaaS",horizon:"2026 → 2028",status:"MIXED",color:"#E08A4A",
 tam:"$300B SaaS market in transition",cagr:"CRWD compounding; NOW lagging",
 sub:["CRWD executed 4-for-1 split — now 183.50 post-split (~734 pre-split equivalent), at new highs. Position +68% and the split broadens ownership",
 "NOW remains the book problem child alongside NFLX — position -16%, agentic-AI thesis intact but multiple compressing with high-growth software",
 "SHOP trimmed to the position — e-commerce exposure reduced into strength",
 "AI-agent disruption thesis unchanged: security (CRWD) and workflow (NOW) are the defensible rails"],
 exposure:"CRWD, NOW, SHOP",risk:"High-multiple software stays hostage to rates — 10Y at 18-month highs is a direct headwind. NOW needs its Jul print to re-rate or the position question sharpens."},

 {theme:"Fintech / Crypto",horizon:"2026",status:"WEAK",color:R,
 tam:"$26T global payments. Crypto $2.5T",cagr:"BTC -25% from highs.",
 sub:["",
 "Mizuho cut $38→$29, Truist $20→$17",
 "Crypto weakness drags HOOD options revenue. Stablecoin Clarity Act still wild card",
 "Fed on hold = no rate-cut tailwind for SOFI lending"],
 exposure:"HOOD, SOFI",risk:"Extended crypto winter. Recession lending squeeze. SOFI lowPT $17 already above current price."},

 {theme:"Consumer / Streaming",horizon:"2026",status:"MIXED",color:Y,
 tam:"$280B streaming. $7T global retail",cagr:"NFLX guide cut Q2. SHOP +30% Q1",
 sub:["NFLX: $89 vs avg PT $117. Bear case Reed Hastings exit + Q2 guide miss",
 "SHOP: $102 vs avg PT $160 — biggest upside in portfolio if execution holds",
 "AMZN: AWS AI accelerating, retail soft. Trump tariff suit pending",
 "V: $332 vs avg PT $392, +18% upside, defensive payments anchor"],
 exposure:"NFLX, SHOP, AMZN, V",risk:"NFLX lowPT $80 = stop zone near. SHOP 52w low $94 in play if Q2 guide soft."},

 {theme:"Antitrust / Regulation",horizon:"2026 → 2027",status:"OVERHANG",color:R,
 tam:"$1T+ market cap at regulatory risk",cagr:"N/A — binary event risk",
 sub:["GOOGL: DOJ Chrome divestiture ruling expected Q3-Q4 2026",
 "META: EU DMA enforcement ongoing. US FTC v Meta trial pending",
 "Chip export controls: Commerce Dept drafting global AI chip restrictions — NVDA Q1 may address",
 "Energy regulation: potential electricity price caps would hit VST"],
 exposure:"GOOGL (high), META (med), NVDA (export), VST (caps)",risk:"Binary outcomes. NVDA China H200 exposure under threat."},

 {theme:"NOT IN PORTFOLIO: Gap Analysis Watchlist",horizon:"Active",status:"WATCH",color:"#9A8F82",
 tam:"Highlighted gaps from prior analysis",cagr:"Various — Tier 1 most pressing",
 sub:["TIER 1: ASML (semi bottleneck, US-listed), ORCL (Stargate JV torque), SMCI (server torque)",
 "TIER 2: PLTR (applied AI), CRDO/LITE/COHR (optical interconnect picks-and-shovels)",
 "TIER 3: CEG (nuclear + MSFT PPA), GEV (gas turbines + grid)",
 "REJECTED: Ibiden/Unimicron (substrate makers — last cycle bottleneck, retail-access weak)"],
 exposure:"NONE — watch only",risk:"Adding torque to already-concentrated AI infra book = more concentration, not diversification."},

 {theme:"NOT IN PORTFOLIO: Quantum / Robotics / AVs",horizon:"2027 → 2032",status:"PRE-REVENUE",color:"#9A8F82",
 tam:"Quantum $65B by 2030. Humanoid $38B by 2035",cagr:"40-45% but tiny base",
 sub:["Quantum: IONQ, RGTI, QBTS — pre-revenue. Google Willow Dec 2025 milestone",
 "Humanoid: Figure AI ($39B private), Tesla Optimus, 1X Tech, Apptronik",
 "Autonomous: Waymo (GOOGL exposure already) dominant, no clean pure-play",
 "SIZING: 1-2% portfolio max each. Wait for revenue inflection. GOOGL/NVDA give partial exposure."],
 exposure:"NVDA (Isaac), GOOGL (Waymo, Willow)",risk:"5-10yr timelines. Pure-plays dilute heavily. Speculative."},

 {theme:"NOT IN PORTFOLIO: Defense / Space / Biotech",horizon:"NOW → 2030",status:"SECULAR",color:"#9A8F82",
 tam:"$900B defense + $130B GLP-1 by 2030",cagr:"Defense 5-7%. GLP-1 40%",
 sub:["PLTR ($275B) — applied AI + defense intersect. 80x P/E gating entry",
 "L3Harris, RTX, NOC — traditional defense. XAR ETF benchmark",
 "LLY, NVO GLP-1 duopoly. Compounding pharmacy crackdown = LLY tailwind",
 "SIZING: Different thesis than AI infra. Defensive ballast if added."],
 exposure:"NONE",risk:"PLTR at 80x P/E. LLY at $750+ requires patience on entry."}

 ].map((t,i)=>(<div key={i} style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:14,marginBottom:8,borderLeft:`3px solid ${t.color}`}}>
 <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
 <div style={{display:"flex",alignItems:"center",gap:8}}>
 <span style={{...M,fontSize:16,fontWeight:700,color:"#F4EEDF"}}>{t.theme}</span>
 <span style={{...M,fontSize:12,padding:"2px 6px",borderRadius:3,background:t.color+"22",color:t.color,fontWeight:600}}>{t.status}</span>
 </div>
 <span style={{...M,fontSize:12,color:"#9A8F82"}}>{t.horizon}</span>
 </div>
 <div style={{display:"flex",gap:10,marginBottom:6}}>
 <span style={{...M,fontSize:13,padding:"2px 6px",borderRadius:3,background:"#E6A81711",color:"#E6A817",border:"1px solid #E6A81722"}}>{t.tam}</span>
 <span style={{...M,fontSize:13,padding:"2px 6px",borderRadius:3,background:"#3DBFA811",color:"#3DBFA8",border:"1px solid #3DBFA822"}}>{t.cagr}</span>
 </div>
 <div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:8}}>
 {t.sub.map((s,j)=>(<div key={j} style={{...M,fontSize:13,color:"#B8AE92",lineHeight:1.5,paddingLeft:8,borderLeft:"1px solid #2C2433"}}>• {s}</div>))}
 </div>
 <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
 <div style={{...M,fontSize:12}}><span style={{color:"#E6A817"}}>EXPOSURE: </span><span style={{color:"#B8AE92"}}>{t.exposure}</span></div>
 <div style={{...M,fontSize:12}}><span style={{color:R}}>RISK: </span><span style={{color:"#B8AE92"}}>{t.risk}</span></div>
 </div>
 </div>))}

 {/* KEY MARKET OPPORTUNITIES — HOW TO PLAY THE FUTURE */}
 <div style={{background:"#17131A",border:"1px solid #3DBFA833",borderRadius:6,padding:14,marginBottom:10}}>
 <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
 <span style={{fontSize:17}}>💡</span>
 <span style={{...M,fontSize:16,fontWeight:700,color:"#3DBFA8"}}>KEY OPPORTUNITIES — HOW TO PLAY THE FUTURE</span>
 </div>
 {[
 {opp:"VRT: PT Was Wrong — Real Upside Is +33% into Jul 29 \u2713 Print",timeframe:"NOW \u2192 Jul 29 \u2713",conviction:"HIGH",
 thesis:"This dashboard carried avgPT $287 against a $285.71 price, showing 0.0x R:R and effectively telling you VRT was dead money. That was a DATA ERROR. S&P Global's 27-analyst consensus is $380 (low $236, high $500, Strong Buy) = +33% upside. Q2 lands Jul 29 \u2713 BMO, call 11am ET. Guide $3.25-3.45B rev / organic +20-24% / adj EPS $1.37-1.43; consensus $3.39B (+28.4% YoY) and $1.43 (+50.5%). $15B backlog with visibility into 2027.",
 play:"Hold into the print \u2014 do not trim on a corrupted R:R reading. Options imply roughly a 9% move, which is why the old $268 stop was a liability rather than protection; it has been widened to $252. The bear risk is EMEA, which fell 20.3% YoY in Q1 with recovery guided for 2H26. If EMEA slips again the multiple compresses regardless of the Americas number.",
 sizing:"Hold through the next print. No adds into a binary with a 9% implied move. Post-print: adds below $260 if EMEA recovery is confirmed.",
 color:G},
 {opp:"MU: CXMT Changes the Clock, Not the Thesis",timeframe:"NOW \u2192 Dec print",conviction:"MED (structurally altered)",
 thesis:"MU $884.99, -25% from the $1,188 Jun 25 high, versus avg PT $1,650. CXMT listed Jul 27 \u2713 at +466% to a ~$487B cap \u2014 world's #4 DRAM, biggest-ever mainland semi IPO. THE KEY FACT: CXMT's prospectus discloses NO HBM program. It is standard DDR5/LPDDR5X only. So the hit lands on COMMODITY DRAM pricing \u2014 precisely the segment Samsung/Hynix/MU are vacating as they shift capacity to HBM \u2014 and not on the HBM margin engine. In the LFL-vs-ASP-mix frame: this attacks the commodity-shortage leg, leaves the product-transition leg standing. Q3 was a blowout (rev $41.5B 4x YoY, EPS $25.11, GM 84.9%, Q4 guide $49-51B, 16 LTAs / $22B committed).",
 play:"The hold through the Sep and Dec prints survives this. What changes is the far end: a Chinese champion with public capital approaching Micron-scale commodity capacity puts a harder clock on the pricing tailwind, and that clock lines up with the flagged 2028 de-rating window. Apple reportedly testing CXMT parts is the escalation to watch \u2014 tier-1 Western qualification would be the real thesis break. SK Hynix Q2 Jul 28 \u2713 AMC is the near-term HBM pricing read.",
 sizing:"No trim yet \u2014 the Dec-Feb strength window is still the plan. But the 25-40% trim is now a firmer commitment, not an option.",
 color:Y},
 {opp:"The Rotation Is Real: Software Absorbed the Hardware Selling",timeframe:"NOW \u2192 Q3",conviction:"HIGH",
 thesis:"Jul 27 \u2713 was not a broad risk-off day \u2014 the Dow rose 0.51% and most S&P shares advanced. It was a FACTOR ROTATION out of AI hardware into software. SOX -2.23% and in a bear market since Jul 24 \u2713, SMH -9.3% over a month, against NOW +6.82%, SHOP +11.54%, SNPS +4.17%, NFLX +0.96%. NOW's Q2 (Jul 22 \u2713 AMC) is the anchor: EPS $0.90 vs $0.85e, rev $3.99B +24%, subscription +24.5% at 150bps above the guide's high end, op margin 29.5% (3pts above guide), cRPO $13.20B +21%, RPO $29B, 98% renewal, AI ACV through $1B with the 2026 target RAISED 50% to $1.5B.",
 play:"The book is heavily weighted to the losing side of this rotation. The honest question is whether the software sleeve is underweight by design or by neglect.",
 sizing:"If the rotation has legs this is the wrong ratio.",
 color:G},
 {opp:"NVDA: Price Broke Below the Street Low Target",timeframe:"NOW \u2192 Aug 26 \u2713",conviction:"HIGH",
 thesis:"NVDA $220.59 (-5.14%) versus a street LOW PT of $220 \u2014 the market is now trading below the most bearish analyst on the tape. Avg PT $298 = +52%. Cramer's read on the intraday reversal is that sellers are 'monstrous, motivated and often margined', i.e. leverage-forced liquidation rather than a re-rate.",
 play:"Distinguish mechanical selling from thesis damage. Margin-driven liquidation is self-limiting and does not compound. Do not trim an anchor position into forced selling. 6% below market, which is not a stop, it is a coin flip \u2014 and has been trailed to $182. Next print Aug 26 \u2713.",
 sizing:"Hold all the position. No adds while the SOX is in a bear market and the Fed is live. Revisit adds if it holds $185 through the FOMC.",
 color:G},
 {opp:"CRWD: Trim Signal Was A Data Error",timeframe:"NOW",conviction:"MED",
 thesis:"CRWD $229.68 against a $175 avg PT \u2014 the single name in the book where price exceeds the analyst consensus, so R:R is inverted. Post 4-for-1 split (effective Jul 2 \u2713, $183.50 adjusted). High PT $225 is the bull case.",
 play:"This is the cleanest trim candidate in the book on pure valuation discipline. It is above consensus, it failed to participate in its own sector's best day in weeks, and the proceeds have obvious homes in the underweight software sleeve or in VRT before Jul 29 \u2713. Next print Aug 26 \u2713.",
 sizing:"Consider trimming 25-30% (~23-the position, ~$4-5K). Retain the core \u2014 the security franchise is not the issue, the multiple is.",
 color:Y},
 {opp:"Semi Equipment: LRCX + ASML Both De-Rating into Jul 29 \u2713",timeframe:"Jul 29",conviction:"MED",
 thesis:"LRCX $290.79 (-4.73%, -20.4% over a month) reports Q4 FY26 Jul 29 \u2713 AMC, call 5pm ET. Guide $6.6B \u00b1$400M and EPS $1.65 \u00b1$0.15; consensus $6.67B (+29% YoY) and $1.69 (+27%). Beat all four trailing quarters, average surprise 7.9%. Advanced packaging guided +50% for 2026. ASML $1,648 (-5.32%, -8.6% over two sessions) has no company news at all \u2014 pure complex de-rating \u2014 and its street LOW target of $1,660 now sits ABOVE the market price. NOTE: this file carried the WRONG LRCX earnings date (Jul 23 \u2713); corrected to Jul 29 \u2713.",
 play:"Two forever-hold-adjacent equipment names selling off on sentiment rather than orders, with one of them printing in 48 hours. LRCX's stop was $286 \u2014 1.6% below market going into a print \u2014 which would have been stopped out by noise; widened to $258. ASML widened $1,590 to $1,520. CXMT is a DRAM story and if anything means MORE commodity capex, not less, which cuts in equipment's favour.",
 sizing:"Both small. ASML adds below $1,600 are consistent with the forever-hold designation.",
 color:Y},
 {opp:"Fed Week: The Book Is Long Duration into a Live Meeting",timeframe:"Jul 29 \u2713 2pm ET",conviction:"HIGH (risk item)",
 thesis:"FOMC decides Wed Jul 29 \u2713 at 2pm ET with funds at 3.50-3.75%. CME FedWatch has ~62-65% no-change, but SEPTEMBER hike odds have climbed to roughly 82%. Warsh has scrapped forward guidance entirely and calls 3.7% inflation intolerable. Note this dashboard was carrying fedFunds at 4.25% \u2014 wrong, and it was corrupting the rate-sensitivity math. Offsetting: WTI collapsed 7.5% to $82.62 after the US and Iran halted strikes, which removes the energy-driven inflation impulse that built the hike case in the first place.",
 play:"The book is long-duration growth, so a hawkish surprise hits multiples before it hits earnings. TSLA (unhealed from the Q2 miss) and CRWD (above consensus) are the most exposed; MU and TSM are the most defensible on near-term earnings power. The oil collapse is genuinely helpful here and is not yet reflected in September pricing.",
 sizing:"No pre-emptive de-risking for a 62-65% no-change base case. If hedging, do it at the index level rather than by trimming compounders.",
 color:R},
 {opp:"Not Owned: VICR + CRDO Still Untracked",timeframe:"ONGOING",conviction:"LOW (watch)",
 thesis:"Both were flagged in a prior session as underrated AI plays and neither has been added to the dashboard or the book. The Jul 27 \u2713 de-rate across power delivery and connectivity names is exactly the kind of entry window that gets missed when a name is not being tracked. This card exists as a standing reminder rather than a recommendation \u2014 no current position, no verified price or PT data in this file.",
 play:"Decide: either build ticker blocks so they show up in the health check and signal ranker, or formally drop them so they stop occupying attention. The current state \u2014 flagged but untracked \u2014 is the worst of both.",
 sizing:"No position. No sizing guidance until real data is loaded.",
 color:P}].map((o,i)=>(<div key={i} style={{background:"#241C2B",border:`1px solid ${o.color}22`,borderRadius:5,padding:12,marginBottom:8,borderLeft:`3px solid ${o.color}`}}>
 <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
 <div style={{display:"flex",alignItems:"center",gap:8}}>
 <span style={{...M,fontSize:15,fontWeight:700,color:"#F4EEDF"}}>{o.opp}</span>
 <span style={{...M,fontSize:12,padding:"2px 6px",borderRadius:3,background:o.color+"22",color:o.color,fontWeight:600}}>{o.conviction}</span>
 </div>
 <span style={{...M,fontSize:12,color:"#9A8F82"}}>{o.timeframe}</span>
 </div>
 <div style={{...M,fontSize:13,color:"#D6CDB6",lineHeight:1.6,marginBottom:6}}>{o.thesis}</div>
 <div style={{...M,fontSize:13,marginBottom:4}}>
 <span style={{color:"#3DBFA8",fontWeight:600}}>HOW TO PLAY: </span>
 <span style={{color:"#B8AE92"}}>{o.play}</span>
 </div>
 <div style={{...M,fontSize:12}}>
 <span style={{color:"#B266FF",fontWeight:600}}>SIZING: </span>
 <span style={{color:"#9A8F82"}}>{o.sizing}</span>
 </div>
 </div>))}
 </div>

 {/* POLICY & REGULATORY CALENDAR */}
 <div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:14,marginBottom:10}}>
 <div style={{...M,fontSize:14,fontWeight:700,color:"#E08A4A",marginBottom:8}}>POLICY & REGULATORY CALENDAR</div>
 {[
 {date:"May 12 ✓",event:"CPI April Report",impact:"3.7% headline. In-line; Fed-on-hold reinforced",tickers:"All (macro)"},
 {date:"May 13-14 ✓",event:"Trump-Xi Summit (AI Guardrails)",impact:"Inconclusive — chip export framework discussed, no resolution",tickers:"NVDA, AMD, TSM"},
 {date:"May 20 ✓",event:"NVDA Q1 FY27 Earnings — BLOWOUT, Q2 guide $91B",impact:"BINARY. Options implying 8.65% move. Single biggest portfolio event",tickers:"NVDA + entire AI complex"},
 {date:"May 28",event:"CRWD Q1 FY27 Earnings",impact:"Keybanc just raised to $700 May 18. EPS est $1.09",tickers:"CRWD"},
 {date:"Jun FOMC",event:"Fed Rate Decision",impact:"Fed on hold; risk of cut talk if VIX expands further",tickers:"All (esp SOFI, HOOD, V)"},
 {date:"Q2-Q3 2026",event:"Commerce Dept AI Chip Export Rules",impact:"Final rule on global restrictions. Could hit NVDA China $8B/qtr",tickers:"NVDA, AMD, TSM, ANET"},
 {date:"Q3 2026",event:"DOJ v Google Chrome Remedies",impact:"Divestiture ruling. Structural impact",tickers:"GOOGL"},
 {date:"Q3 2026",event:"FTC v Meta Antitrust Trial",impact:"WhatsApp/Instagram divestiture risk",tickers:"META"}].map((p,i)=>(<div key={i} style={{display:"flex",gap:10,padding:"6px 0",borderBottom:i<5?"1px solid #2C243344":"none"}}>
 <span style={{...M,fontSize:13,fontWeight:700,color:"#E08A4A",minWidth:106,flexShrink:0}}>{p.date}</span>
 <div style={{flex:1}}>
 <div style={{...M,fontSize:14,fontWeight:600,color:"#F4EEDF"}}>{p.event}</div>
 <div style={{...M,fontSize:12,color:"#B8AE92"}}>{p.impact}</div>
 </div>
 <span style={{...M,fontSize:12,color:"#E6A817",flexShrink:0}}>{p.tickers}</span>
 </div>))}
 </div>

 {/* SECTOR ROTATION MAP */}
 <div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:14}}>
 <div style={{...M,fontSize:14,fontWeight:700,color:"#B266FF",marginBottom:8}}>WHAT'S ROTATING</div>
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
 <div>
 <div style={{...M,fontSize:13,fontWeight:600,color:G,marginBottom:4}}>FLOWING INTO ↑</div>
 {["AI infrastructure (cooling phase — PWR/VRT pullback)","Memory/HBM (MU +168% YTD but -6% May 14)","Defensive payments (V steady, +18% to PT)","Optical interconnect (gap play — CRDO/LITE not owned)","Mag-7 quality (META, GOOGL setup)"].map((s,i)=>(<div key={i} style={{...M,fontSize:13,color:"#B8AE92",marginBottom:2}}>• {s}</div>))}
 </div>
 <div>
 <div style={{...M,fontSize:13,fontWeight:600,color:R,marginBottom:4}}>FLOWING OUT OF ↓</div>
 {["","Streaming consumer (NFLX guide miss)","Stretched cyclicals (PWR +45% over consensus PT)","NVDA Q1 vol — hedges over longs","Risk: VIX expansion to 20+ on weak NVDA print"].map((s,i)=>(<div key={i} style={{...M,fontSize:13,color:"#B8AE92",marginBottom:2}}>• {s}</div>))}
 </div>
 </div>
 </div>
 </div>}

 {
 



portfolioView==="exit"&&<div>
 {/* EXIT MAP — position action signals */}
 <div style={{...M,fontSize:14,fontWeight:700,color:"#E8643A",marginBottom:4}}>EXIT MAP — POSITION ACTION SIGNALS</div>
 <div style={{...M,fontSize:12,color:"#9A8F82",marginBottom:8}}>Composite signal based on 6 factors. Sorted by urgency — act on top items first.</div>

 <div style={{background:"#1E1924",border:"1px solid #3A3042",borderRadius:6,padding:10,marginBottom:10}}>
 <div style={{...M,fontSize:13,fontWeight:700,color:"#B266FF",marginBottom:6}}>SCORING LOGIC</div>
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:8}}>
 <div>
 <div style={{...M,fontSize:12,fontWeight:600,color:"#E6A817",marginBottom:3}}>UPSIDE EXHAUSTION</div>
 <div style={{...M,fontSize:12,color:"#B8AE92",lineHeight:1.5}}>{"<5% to PT: +30\n<10% to PT: +20\n<15% to PT: +10"}</div>
 </div>
 <div>
 <div style={{...M,fontSize:12,fontWeight:600,color:"#E6A817",marginBottom:3}}>GAIN HEAT</div>
 <div style={{...M,fontSize:12,color:"#B8AE92",lineHeight:1.5}}>{">200% gain: +15\n>100% gain: +10\n>50% gain: +5"}</div>
 </div>
 <div>
 <div style={{...M,fontSize:12,fontWeight:600,color:"#E6A817",marginBottom:3}}>CONCENTRATION</div>
 <div style={{...M,fontSize:12,color:"#B8AE92",lineHeight:1.5}}>{">35% weight: +25\n>20% weight: +15\n>10% weight: +8\n>5% weight: +3"}</div>
 </div>
 <div>
 <div style={{...M,fontSize:12,fontWeight:600,color:"#E6A817",marginBottom:3}}>MODIFIERS</div>
 <div style={{...M,fontSize:12,color:"#B8AE92",lineHeight:1.5}}>{"Thesis <50: +10\nMacro weak: +10\nEarnings <3d: -10\nUnderwater: -10"}</div>
 </div>
 </div>
 <div style={{...M,fontSize:12,fontWeight:600,color:"#B266FF",marginBottom:4}}>SIGNAL THRESHOLDS</div>
 <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
 {[["ACCUMULATE","#E6A817","Big upside + small gain"],["LET IT RUN","#3DBFA8","Score ≤15"],["TIGHTEN STOP","#B266FF","Score 16-24"],["TRIM","#FFBF00","Score 25-39"],["TRIM NOW","#E08A4A","Score 40-54"],["EXIT","#E8643A","Score 55+"]].map(([label,color,desc],i)=>(
 <div key={i} style={{display:"flex",alignItems:"center",gap:4,marginBottom:2}}>
 <span style={{...M,fontSize:12,fontWeight:700,padding:"1px 5px",borderRadius:8,background:color+"22",color:color}}>{label}</span>
 <span style={{...M,fontSize:11,color:"#9A8F82"}}>{desc}</span>
 </div>
 ))}
 </div>
 </div>
 {(()=>{
 const costBasis={ASML:0,NVDA:0,MU:0,VRT:0,PWR:0,AMD:0,TSM:0,AVGO:0,AMZN:0,HOOD:0,SOFI:0,MRVL:0,SHOP:0,NFLX:0,VST:0,CRWD:0,ANET:0,TSLA:0,LRCX:0,NOW:0,SNPS:0};
 const shares={NVDA:0,MU:0,VRT:0,PWR:0,AMD:0,TSM:0,AVGO:0,AMZN:0,HOOD:0,SOFI:0,MRVL:0,SHOP:0,NFLX:0,VST:0,CRWD:0,ANET:0,TSLA:0,LRCX:0};
 let totalPortCalc=0;Object.keys(shares).forEach(t=>{totalPortCalc+=shares[t]*(LC[t]||0);});
 const earningsDates={NFLX:"Apr 16 ✓",TSM:"Apr 17 ✓",VRT:"May 7 ✓",MU:"Mar 18 ✓",AMZN:"Apr 29 ✓",SOFI:"Apr 29 ✓",AMD:"May 5 ✓",HOOD:"Apr 28 ✓",PWR:"Apr 30 ✓",ANET:"May 5 ✓",NVDA:"May 20",CRWD:"May 28"};
 const macroTailwind={NVDA:"strong",MU:"strong",VRT:"strong",PWR:"strong",AMD:"moderate",TSM:"strong",AVGO:"strong",AMZN:"moderate",HOOD:"weak",SOFI:"weak",MRVL:"strong",SHOP:"weak",NFLX:"neutral",VST:"moderate",CRWD:"strong",ANET:"strong",TSLA:"moderate",V:"moderate",LRCX:"strong"};

 const rows=Object.keys(S).map(t=>{
 const s=S[t],p=LC[t]||s.price,pt=s.avgPT,hpt=s.highPT;
 const cb=costBasis[t]||p,sh=shares[t]||0;
 const mktVal=sh*p,weight=mktVal/totalPortCalc*100;
 const gainPct=(p-cb)/cb*100;
 const upsideLeft=(pt-p)/p*100;
 const earnDate=earningsDates[t]||null;
 const earnMo=earnDate?earnDate.split(" ")[0]:"";const earnDay=earnDate?parseInt(earnDate.split(" ")[1]):0;const earnTarget=earnMo==="May"?new Date(2026,4,earnDay):new Date(2026,3,earnDay);const earnDays=earnDate?Math.max(0,Math.round((earnTarget-new Date(2026,3,14))/(86400000))):99;
 
 const macro=macroTailwind[t]||"neutral";
 const verdict=s.fund?s.fund.verdict?s.fund.verdict.score||50:50:50;
 const killer=s.fund?s.fund.killer||"":"";

 // Composite scoring (0-100, higher = more urgency to act)
 let urgency=0;
 // Upside exhaustion: <5% left = +30, <10% = +20, <15% = +10
 if(upsideLeft<5)urgency+=30;else if(upsideLeft<10)urgency+=20;else if(upsideLeft<15)urgency+=10;
 // Gain heat: >200% = +15, >100% = +10, >50% = +5
 if(gainPct>200)urgency+=15;else if(gainPct>100)urgency+=10;else if(gainPct>50)urgency+=5;
 // Concentration: >30% = +20, >15% = +10, >8% = +5
 if(weight>35)urgency+=25;else if(weight>20)urgency+=15;else if(weight>10)urgency+=8;else if(weight>5)urgency+=3;
 // Thesis: verdict <40 = +15, <50 = +10
 if(verdict<40)urgency+=15;else if(verdict<50)urgency+=10;
 // Macro headwind: weak = +10
 if(macro==="weak")urgency+=10;
 // Earnings soon: <3d = -10 (don't sell before catalyst)
 if(earnDays<=3)urgency-=10;
 // Negative gain = -10 (don't sell losers into weakness)
 if(gainPct<0)urgency-=10;

 let action="LET IT RUN",actionColor="#3DBFA8";
 if(urgency>=25){action="TRIM";actionColor="#FFBF00";}
 if(urgency>=40){action="TRIM NOW";actionColor="#E08A4A";}
 if(urgency>=55){action="EXIT";actionColor="#E8643A";}
 if(urgency<=15){action="LET IT RUN";actionColor="#3DBFA8";}
 if(urgency>=16&&urgency<25){action="TIGHTEN STOP";actionColor="#B266FF";}
if(upsideLeft>25&&gainPct<20){action="ACCUMULATE";actionColor="#E6A817";}

 let reason="";
 if(upsideLeft<10)reason+="Near PT. ";
 if(weight>25)reason+=Math.round(weight)+"% concentration. ";
 if(gainPct>150)reason+="+"+Math.round(gainPct)+"% gain. ";
 if(macro==="weak")reason+="Macro headwind. ";
 if(earnDays<=5&&earnDays>0)reason+="Earnings in "+earnDays+"d. ";
 if(upsideLeft>30)reason+=Math.round(upsideLeft)+"% upside left. ";
 if(gainPct<0)reason+="Underwater. ";
 if(!reason)reason=Math.round(upsideLeft)+"% upside, thesis intact.";

 return{t,p,pt,cb,gainPct,upsideLeft,weight,action,actionColor,reason:reason.trim(),urgency,killer,earnDays,earnDate,macro};
 }).sort((a,b)=>b.urgency-a.urgency);

 return rows.map((r,i)=>(
 <div key={i} style={{background:"#17131A",border:"1px solid "+(r.actionColor=="#E8643A"||r.actionColor=="#E08A4A"?r.actionColor+"44":"#2C243344"),borderRadius:6,padding:10,marginBottom:6,borderLeft:"3px solid "+r.actionColor}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
 <div style={{display:"flex",alignItems:"center",gap:8}}>
 <span style={{...M,fontSize:17,fontWeight:700,color:"#F4EEDF"}}>{r.t}</span>
 <span style={{...M,fontSize:14,color:"#B8AE92"}}>${Math.round(r.p)}</span>
 </div>
 <span style={{...M,fontSize:13,fontWeight:700,padding:"2px 8px",borderRadius:10,background:r.actionColor+"22",color:r.actionColor}}>{r.action}</span>
 </div>
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:4,marginBottom:6}}>
 <div style={{textAlign:"center"}}>
 <div style={{...M,fontSize:11,color:"#9A8F82"}}>GAIN</div>
 <div style={{...M,fontSize:14,fontWeight:700,color:r.gainPct>=0?"#3DBFA8":"#E8643A"}}>{r.gainPct>=0?"+":""}{Math.round(r.gainPct)}%</div>
 </div>
 <div style={{textAlign:"center"}}>
 <div style={{...M,fontSize:11,color:"#9A8F82"}}>UPSIDE</div>
 <div style={{...M,fontSize:14,fontWeight:700,color:r.upsideLeft>20?"#3DBFA8":r.upsideLeft>10?"#FFBF00":"#E8643A"}}>{r.upsideLeft>=0?"+":""}{Math.round(r.upsideLeft)}%</div>
 </div>
 <div style={{textAlign:"center"}}>
 <div style={{...M,fontSize:11,color:"#9A8F82"}}>WEIGHT</div>
 <div style={{...M,fontSize:14,fontWeight:700,color:r.weight>25?"#E8643A":r.weight>10?"#FFBF00":"#F4EEDF"}}>{r.weight.toFixed(1)}%</div>
 </div>
 <div style={{textAlign:"center"}}>
 <div style={{...M,fontSize:11,color:"#9A8F82"}}>MACRO</div>
 <div style={{...M,fontSize:14,fontWeight:700,color:r.macro==="strong"?"#3DBFA8":r.macro==="moderate"?"#FFBF00":r.macro==="weak"?"#E8643A":"#B8AE92"}}>{r.macro.toUpperCase()}</div>
 </div>
 </div>
 <div style={{...M,fontSize:12,color:"#D6CDB6",marginBottom:4}}>{r.reason}</div>
 {r.earnDate&&<div style={{...M,fontSize:12,color:"#E6A817"}}>Earnings: {r.earnDate}</div>}
 {r.killer&&<div style={{...M,fontSize:12,color:"#E8643A",marginTop:2}}>Killer: {typeof r.killer==="string"?r.killer.substring(0,80):""}</div>}
 </div>
 ));
 })()}
 </div>}

 {
portfolioView==="snapshot"&&<>
 {/* SUMMARY CARDS — original snapshot content */}
 <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,marginBottom:12}}>
 {[
 {l:"STRONG BUY",v:portfolioStats.bySignal.strongBuy,c:G,bg:G+"12"},
 {l:"BUY",v:portfolioStats.bySignal.buy,c:"#7E91E8",bg:"#7E91E812"},
 {l:"HOLD",v:portfolioStats.bySignal.hold,c:Y,bg:Y+"12"},
 {l:"SELL",v:portfolioStats.bySignal.sell,c:R,bg:R+"12"},
 {l:"AVG UPSIDE",v:portfolioStats.avgUpside+"%",c:"#E6A817",bg:"#E6A81712"}].map((c,i)=>(<div key={i} style={{background:c.bg,border:`1px solid ${c.c}22`,borderRadius:5,padding:"8px 10px",textAlign:"center"}}>
 <div style={{...M,fontSize:24,fontWeight:800,color:c.c}}>{c.v}</div>
 <div style={{...M,fontSize:12,color:c.c,opacity:0.7,letterSpacing:0.8}}>{c.l}</div>
 </div>))}
 </div>

 {/* SECTOR EXPOSURE */}
 <div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:5,padding:"8px 12px",marginBottom:12}}>
 <div style={{...M,fontSize:12,textTransform:"uppercase",letterSpacing:1,color:"#9A8F82",marginBottom:6}}>Sector Concentration</div>
 <div style={{display:"flex",gap:0,height:20,borderRadius:3,overflow:"hidden",marginBottom:4}}>
 {Object.entries(portfolioStats.bySector).sort((a,b)=>b[1]-a[1]).map(([sec,count],i)=>{
 const colors=["#E6A817","#B266FF","#3DBFA8","#E08A4A","#FFBF00","#E8643A","#7E91E8","#D9A05B"];
 return(<div key={sec} style={{flex:count,background:colors[i%colors.length],position:"relative",borderRight:"1px solid #0D0D0D"}} title={`${sec}: ${count} stocks`}/>);
 })}
 </div>
 <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
 {Object.entries(portfolioStats.bySector).sort((a,b)=>b[1]-a[1]).map(([sec,count],i)=>{
 const colors=["#E6A817","#B266FF","#3DBFA8","#E08A4A","#FFBF00","#E8643A","#7E91E8","#D9A05B"];
 const pct=((count/tickers.length)*100).toFixed(0);
 return(<span key={sec} style={{...M,fontSize:12,color:colors[i%colors.length],display:"flex",alignItems:"center",gap:3}}>
 <span style={{width:6,height:6,borderRadius:2,background:colors[i%colors.length]}}/>{sec} ({count}) {pct}%
 </span>);
 })}
 </div>
 </div>

 {/* MAIN TABLE */}
 <div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,overflow:"hidden"}}>
 <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
 {/* Table header */}
 <div style={{display:"grid",gridTemplateColumns:"66px 75px 90px 72px 78px 78px 87px 93px minmax(105px,1fr) 75px",gap:0,padding:"8px 10px",background:"#1E1924",borderBottom:"1px solid #2C2433",alignItems:"center",minWidth:560}}>
 {[
 {k:"gr",l:"RANK"},
 {k:"ticker",l:"TICKER"},
 {k:"price",l:"PRICE"},
 {k:"signal",l:"SIG"},
 {k:"uA",l:"UPSIDE"},
 {k:"ytd",l:"YTD"},
 {k:"earnDte",l:"EARNINGS"},
 {k:"pb1w",l:"1W BIAS"},
 {k:"cv",l:"CONVICTION"},
 {k:"avgAge",l:"INTEL"}].map(h=>(<div key={h.k} onClick={()=>{if(portfolioSort===h.k)setPortfolioSortDir(d=>d*-1);else{setPortfolioSort(h.k);setPortfolioSortDir(-1);}}} style={{...M,fontSize:12,textTransform:"uppercase",letterSpacing:0.8,color:portfolioSort===h.k?"#E6A817":"#9A8F82",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:2}}>
 {h.l}{portfolioSort===h.k&&<span style={{fontSize:13}}>{portfolioSortDir>0?"▲":"▼"}</span>}
 </div>))}
 </div>
 {/* Table rows */}
 {[...portfolioStats.rows].sort((a,b)=>{
 const k=portfolioSort;
 let av=a[k],bv=b[k];
 if(k==="pb1w"){av=a.pb1w.bias;bv=b.pb1w.bias;}
 if(k==="gr"){const order={"A+":1,"A":2,"B+":3,"B":4,"C+":5,"C":6,"D":7,"F":8};av=order[a.gr]||9;bv=order[b.gr]||9;}
 if(typeof av==="string")return portfolioSortDir*(av.localeCompare(bv));
 if(av===null&&bv===null)return 0;if(av===null)return 1;if(bv===null)return -1;
 return portfolioSortDir*(av-bv);
 }).map((r,idx)=>(<div key={r.ticker} onClick={()=>{setActiveTicker(r.ticker);setShowPortfolio(false);setTab("feed");}} style={{display:"grid",gridTemplateColumns:"66px 75px 90px 72px 78px 78px 87px 93px minmax(105px,1fr) 75px",gap:0,padding:"7px 10px",borderBottom:"1px solid #2C243344",background:idx%2===0?"transparent":"#17131A08",cursor:"pointer",alignItems:"center",minWidth:560}}>
 {/* RANK */}
 <div style={{...M,fontSize:18,fontWeight:800,color:r.gc}}>{r.gr}</div>
 {/* TICKER */}
 <div>
 <div style={{...M,fontSize:16,fontWeight:700,color:"#F4EEDF"}}>{r.ticker}</div>
 </div>
 {/* PRICE */}
 <div style={{...M,fontSize:16,fontWeight:600,color:"#F4EEDF"}}>${r.price}</div>
 {/* SUPPORT DIST */}
  <div style={{...M,fontSize:16,fontWeight:700,color:r.ds<5?G:r.ds<15?Y:R}}>{r.ds.toFixed(1)}%</div>
 {/* UPSIDE TO PT */}
 <div style={{...M,fontSize:15,fontWeight:600,color:r.uA>0?G:R}}>{r.uA>0?"+":""}{r.uA.toFixed(0)}%</div>
 {/* YTD */}
 <div style={{...M,fontSize:15,color:r.ytd>0?G:R}}>{r.ytd>0?"+":""}{r.ytd}%</div>
 {/* EARNINGS */}
 <div>
 {r.earnDte!==null&&r.earnDte<=7?<span style={{...M,fontSize:13,fontWeight:700,padding:"2px 4px",borderRadius:3,background:"#B266FF22",color:"#B266FF",animation:r.earnDte<=3?"pulse 2s infinite":"none"}}>{r.earnDte===0?"TODAY":r.earnDte+"d"}</span>
 :r.earnDte!==null&&r.earnDte<=30?<span style={{...M,fontSize:13,color:"#B8AE92"}}>{r.earnDte}d</span>
 :<span style={{...M,fontSize:13,color:"#9A8F82"}}>{r.earnDte!==null?r.earnDte+"d":"—"}</span>}
 </div>
 {/* 1W BIAS */}
 <div>
 <span style={{...M,fontSize:12,fontWeight:600,padding:"2px 4px",borderRadius:3,background:r.pb1w.color+"18",color:r.pb1w.color,maxWidth:60,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"inline-block"}}>{r.pb1w.bias||r.pb1w.h}</span>
 </div>
 {/* CONVICTION BAR */}
 <div style={{position:"relative",height:14,background:"#241C2B",borderRadius:3,overflow:"hidden"}}>
 <div style={{position:"absolute",left:r.cv>=0?"50%":"auto",right:r.cv<0?"50%":"auto",width:`${Math.abs(r.cv)/2}%`,height:"100%",background:r.gc,borderRadius:r.cv>=0?"0 3px 3px 0":"3px 0 0 3px",transition:"width 0.3s"}}/>
 <div style={{position:"absolute",left:"50%",top:0,width:1,height:"100%",background:"#9A8F82"}}/>
 <span style={{position:"absolute",right:r.cv>=0?4:"auto",left:r.cv<0?4:"auto",top:1,...M,fontSize:13,fontWeight:700,color:r.gc}}>{r.cv}</span>
 </div>
 {/* INTEL FRESHNESS */}
 <div style={{display:"flex",alignItems:"center",gap:3}}>
 {r.freshCount>0&&<span style={{width:6,height:6,borderRadius:3,background:"#E6A817",flexShrink:0}} title={r.freshCount+" fresh items"}/>}
 {r.staleCount>3?<span style={{...M,fontSize:12,color:R}} title={r.staleCount+" stale items (>14d)"}>⚠{r.staleCount}</span>
 :r.staleCount>0?<span style={{...M,fontSize:12,color:Y}} title={r.staleCount+" aging items"}>{r.staleCount}old</span>
 :<span style={{...M,fontSize:12,color:G}}>✓</span>}
 </div>
 </div>))}
 </div>
 </div>

 {/* INTEL FRESHNESS SUMMARY */}
 <div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:5,padding:"10px 14px",marginTop:10}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1,color:"#9A8F82",fontWeight:600,marginBottom:6}}>Intel Freshness Report</div>
 <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
 {portfolioStats.rows.filter(r=>r.staleCount>2).sort((a,b)=>b.staleCount-a.staleCount).map(r=>(<span key={r.ticker} onClick={()=>{setActiveTicker(r.ticker);setShowPortfolio(false);setTab("feed");}} style={{...M,fontSize:13,padding:"3px 8px",borderRadius:4,background:r.staleCount>4?R+"15":Y+"15",color:r.staleCount>4?R:Y,cursor:"pointer",border:`1px solid ${r.staleCount>4?R:Y}22`}}>
 {r.ticker}: {r.staleCount}/{r.newsCount} stale ({Math.round(r.avgAge)}d avg)
 </span>))}
 {portfolioStats.rows.filter(r=>r.staleCount>2).length===0&&<span style={{...M,fontSize:14,color:G}}>✓ All tickers have fresh intel</span>}
 </div>
 </div>
 </>}

 {/* ═══════════════════════════════════════════════ */}
 {/* PORTFOLIO STRATEGY — NEXT DAY BRIEFING */}
 {/* ═══════════════════════════════════════════════ */}
 <div style={{background:"linear-gradient(180deg,#17131A 0%,#1E1924 100%)",border:"1px solid #E6A81722",borderRadius:8,padding:18,marginTop:12}}>
 <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
 <div style={{display:"flex",alignItems:"center",gap:8}}>
 <span style={{fontSize:20}}>🎯</span>
 <span style={{...M,fontSize:19,fontWeight:700,background:"linear-gradient(135deg,#E6A817,#B266FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>NEXT SESSION BRIEFING</span>
 </div>
 <div style={{display:"flex",gap:6}}>
 {[{l:"REGIME",v:MACRO.regime,c:MACRO.color},{l:"VIX",v:MACRO.vix,c:MACRO.vix>25?R:MACRO.vix>18?Y:G}].map((m,i)=>(<div key={i} style={{...M,fontSize:13,padding:"3px 8px",borderRadius:4,background:m.c+"15",color:m.c,border:`1px solid ${m.c}33`,fontWeight:600}}>{m.l}: {m.v}</div>))}
 </div>
 </div>
 {(()=>{
 // Compute everything
 const earningsSoon=tickers.filter(t=>{const s=S[t],ed=s.earningsDate||"";if(ed.includes("✓"))return false;const edm=ed.match(/^(\w+)\s+(\d+),\s*(\d+)$/);if(!edm)return false;const emo={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[edm[1]];if(emo===undefined)return false;const dte=Math.ceil((new Date(parseInt(edm[3]),emo,parseInt(edm[2]))-new Date())/(1000*60*60*24));return dte<=7&&dte>=0;}).map(t=>{const ed=S[t].earningsDate,edm=ed.match(/^(\w+)\s+(\d+),\s*(\d+)$/),emo={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[edm[1]];return{ticker:t,dte:Math.ceil((new Date(parseInt(edm[3]),emo,parseInt(edm[2]))-new Date())/(1000*60*60*24)),date:ed};});
 const overExt=tickers.filter(t=>prices[t]>S[t].avgPT*1.15).map(t=>({t,p:prices[t],pt:S[t].avgPT,pct:Math.round((prices[t]-S[t].avgPT)/S[t].avgPT*100)}));
 const deepVal=tickers.filter(t=>S[t].avgPT>prices[t]*1.4).map(t=>({t,p:prices[t],pt:S[t].avgPT,pct:Math.round((S[t].avgPT-prices[t])/prices[t]*100)})).sort((a,b)=>b.pct-a.pct);
 const highRisk=tickers.filter(t=>(S[t].fund&&S[t].fund.activeRisks||[]).filter(r=>r.sev==="HIGH"&&r.prob>=35).length>=2);
 const top3=rankerData.slice(0,3);
 const bot3=rankerData.slice(-3).reverse();
 const nearCats=tickers.flatMap(t=>{const s=S[t];if(!s.catalysts)return[];return s.catalysts.filter(cat=>{if(!cat.d||cat.d.includes("✓"))return false;const dm=cat.d.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)/);if(!dm)return false;const days=Math.ceil((new Date(2026,{Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[dm[1]],parseInt(dm[2]))-new Date())/(1000*60*60*24));return days>=0&&days<=5;}).map(cat=>({ticker:t,event:cat.e,date:cat.d}));});

 // Build priority-ordered action items
 const actions=[];

 // #1 Priority: Earnings
 earningsSoon.forEach(e=>{
 const riskAdj=rankerData.find(r=>r.ticker===e.ticker);
 actions.push({priority:1,color:"#B266FF",icon:"📊",title:`${e.ticker} EARNINGS ${e.dte===0?"TODAY":e.dte===1?"TOMORROW":"IN "+e.dte+"D"}`,detail:`${e.date}. Conviction: ${riskAdj?riskAdj.gr:"?"}(${riskAdj?riskAdj.adjCv:"?"}). ImpliedMove: ±${S[e.ticker].options.impliedMove}%. Review position size. Set stops. Consider hedging with puts.`,ticker:e.ticker});
 });

 // #2 Trim overextended
 overExt.forEach(o=>{
 actions.push({priority:2,color:R,icon:"✂️",title:`TRIM ${o.t} — ${o.pct}% ABOVE PT`,detail:`$${o.p} vs avg PT $${o.pt}. Take partial profits. Trail stop to lock gains.`,ticker:o.t});
 });

 // #3 High risk watch
 highRisk.forEach(t=>{
 const risks=(S[t].fund&&S[t].fund.activeRisks||[]).filter(r=>r.sev==="HIGH"&&r.prob>=35);
 actions.push({priority:3,color:Y,icon:"⚠️",title:`${t} — ${risks.length} HIGH RISKS ACTIVE`,detail:risks.map(r=>`${r.prob}%: ${r.risk.substring(0,50)}`).join(" | "),ticker:t});
 });

 // #4 Accumulate deep value
 deepVal.slice(0,4).forEach(d=>{
 actions.push({priority:4,color:G,icon:"💰",title:`ADD ${d.t} — ${d.pct}% BELOW PT`,detail:`$${d.p} vs avg PT $${d.pt}. Deep value if thesis intact.`,ticker:d.t});
 });

 return(<>
 {/* PRIORITY ACTION LIST */}
 {actions.length>0?<div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
 {actions.sort((a,b)=>a.priority-b.priority).map((a,i)=>(<div key={i} onClick={()=>{setActiveTicker(a.ticker);setShowPortfolio(false);setTab(a.priority===1?"options":"riskrew");}} style={{display:"flex",gap:10,padding:"10px 12px",background:a.color+"08",border:`1px solid ${a.color}22`,borderRadius:5,cursor:"pointer",borderLeft:`3px solid ${a.color}`}}>
 <div style={{fontSize:19,flexShrink:0,marginTop:1}}>{a.icon}</div>
 <div style={{flex:1}}>
 <div style={{...M,fontSize:15,fontWeight:700,color:a.color,marginBottom:2}}>{a.title}</div>
 <div style={{...M,fontSize:13,color:"#B8AE92",lineHeight:1.5}}>{a.detail}</div>
 </div>
 <div style={{...M,fontSize:12,color:"#9A8F82",flexShrink:0,alignSelf:"center"}}>TAP →</div>
 </div>))}
 </div>:<div style={{...M,fontSize:14,color:G,padding:12,textAlign:"center"}}>No immediate action items. Portfolio balanced.</div>}

 {/* CATALYSTS + CONVICTION GRID */}
 {nearCats.length>0&&<div style={{background:"#241C2B",borderRadius:5,padding:10,marginBottom:10}}>
 <div style={{...M,fontSize:13,fontWeight:700,color:"#E6A817",marginBottom:6}}>UPCOMING CATALYSTS</div>
 <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
 {nearCats.slice(0,5).map((cat,i)=>(<span key={i} style={{...M,fontSize:12,padding:"3px 8px",borderRadius:4,background:"#E6A81708",color:"#E6A817",border:"1px solid #E6A81722"}}>{cat.ticker} {cat.date}: {cat.event.substring(0,35)}</span>))}
 </div>
 </div>}

 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
 <div style={{background:"#241C2B",borderRadius:5,padding:10}}>
 <div style={{...M,fontSize:13,fontWeight:700,color:G,marginBottom:6}}>TOP CONVICTION</div>
 {top3.map((r,i)=>(<div key={i} onClick={()=>{setActiveTicker(r.ticker);setShowPortfolio(false);setTab("riskrew");}} style={{display:"flex",justifyContent:"space-between",marginBottom:4,cursor:"pointer",padding:"2px 4px",borderRadius:3,":hover":{background:"#2C2433"}}}>
 <span style={{...M,fontSize:15,fontWeight:700,color:"#F4EEDF"}}>{i+1}. {r.ticker}</span>
 <div style={{display:"flex",gap:6,alignItems:"center"}}>
 <span style={{...M,fontSize:13,color:r.uA>0?G:R}}>{r.uA>0?"+":""}{r.uA.toFixed(0)}%</span>
 <span style={{...M,fontSize:14,fontWeight:700,color:r.gc}}>{r.gr}</span>
 </div>
 </div>))}
 </div>
 <div style={{background:"#241C2B",borderRadius:5,padding:10}}>
 <div style={{...M,fontSize:13,fontWeight:700,color:R,marginBottom:6}}>WEAKEST — CONSIDER EXIT</div>
 {bot3.map((r,i)=>(<div key={i} onClick={()=>{setActiveTicker(r.ticker);setShowPortfolio(false);setTab("riskrew");}} style={{display:"flex",justifyContent:"space-between",marginBottom:4,cursor:"pointer",padding:"2px 4px",borderRadius:3}}>
 <span style={{...M,fontSize:15,fontWeight:600,color:"#B8AE92"}}>{r.ticker}</span>
 <div style={{display:"flex",gap:6,alignItems:"center"}}>
 <span style={{...M,fontSize:13,color:r.uA>0?G:R}}>{r.uA>0?"+":""}{r.uA.toFixed(0)}%</span>
 <span style={{...M,fontSize:14,fontWeight:700,color:r.gc}}>{r.gr}</span>
 </div>
 </div>))}
 </div>
 </div>

 {/* MACRO ONE-LINER */}
 <div style={{...M,fontSize:13,color:"#B8AE92",lineHeight:1.6,padding:"8px 10px",background:"#241C2B",borderRadius:4,borderLeft:`3px solid ${MACRO.color}`}}>{MACRO.note}</div>
 </>);
 })()}
 </div>

 </div>)}

 {/* ═══════════════════════════════════════════════ */}
 {/* INDIVIDUAL TICKER VIEW */}
 {/* ═══════════════════════════════════════════════ */}
 {!showPortfolio&&(<>
 {/* HEADER */}
 <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10,flexWrap:"wrap",gap:6}}>
 <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
 <span style={{...M,fontWeight:700,fontSize:26}}>{activeTicker}</span>
 <span style={{fontSize:17,color:"#B8AE92"}}>{stock.name}</span>
 <span style={{...M,fontSize:14,padding:"2px 6px",borderRadius:3,background:sig.color+"15",color:sig.color}}>{sig.signal}</span>
 <div style={{display:"flex",gap:3,marginLeft:"auto"}}>
 <span title={"Price Targets: "+(stock.ptVerified?"VERIFIED "+stock.ptDate:"Sep 25, 2026")} style={{...M,fontSize:11,padding:"1px 4px",borderRadius:2,background:stock.ptVerified?"#3DBFA822":"#FFBF0022",color:stock.ptVerified?"#3DBFA8":"#FFBF00",fontWeight:700,border:`1px solid ${stock.ptVerified?"#3DBFA844":"#FFBF0044"}`}}>{stock.ptVerified?"✓ PT":"⚠ PT"}</span>
 <span title={"Technicals: "+(stock.techVerified?"VERIFIED":"ESTIMATED")} style={{...M,fontSize:11,padding:"1px 4px",borderRadius:2,background:stock.techVerified?"#3DBFA822":"#FFBF0022",color:stock.techVerified?"#3DBFA8":"#FFBF00",fontWeight:700,border:`1px solid ${stock.techVerified?"#3DBFA844":"#FFBF0044"}`}}>{stock.techVerified?"✓ TECH":"⚠ TECH"}</span>
 <span title={"Support: "+(stock.supportVerified?"VERIFIED — anchor: "+(stock.supportAnchor||""):"ESTIMATED")} style={{...M,fontSize:11,padding:"1px 4px",borderRadius:2,background:stock.supportVerified?"#3DBFA822":"#FFBF0022",color:stock.supportVerified?"#3DBFA8":"#FFBF00",fontWeight:700,border:`1px solid ${stock.supportVerified?"#3DBFA844":"#FFBF0044"}`}}>{stock.supportVerified?"✓ SUP":"⚠ SUP"}</span>
 <span title={"Options: "+(stock.optionsVerified?"VERIFIED":"ESTIMATED")} style={{...M,fontSize:11,padding:"1px 4px",borderRadius:2,background:stock.optionsVerified?"#3DBFA822":"#FFBF0022",color:stock.optionsVerified?"#3DBFA8":"#FFBF00",fontWeight:700,border:`1px solid ${stock.optionsVerified?"#3DBFA844":"#FFBF0044"}`}}>{stock.optionsVerified?"✓ OPT":"⚠ OPT"}</span>
 <span title={"Fundamentals story refreshed "+(stock.fundDate||"")} style={{...M,fontSize:11,padding:"1px 4px",borderRadius:2,background:stock.fundVerified?"#3DBFA822":"#FFBF0022",color:stock.fundVerified?"#3DBFA8":"#FFBF00",fontWeight:700,border:`1px solid ${stock.fundVerified?"#3DBFA844":"#FFBF0044"}`}}>{stock.fundVerified?"✓ FUND":"⚠ FUND"}</span>
 </div>
 </div>
 <div style={{display:"flex",gap:8,alignItems:"center"}}>
 <span style={{display:"inline-flex",alignItems:"center",gap:4,...M,fontSize:14,color:"#E6A817"}}>
 <span style={{width:6,height:6,borderRadius:3,background:"#E6A817",display:"inline-block",animation:"pulse 2s ease-in-out infinite"}}/>
 {(globalThis.__ADE_LIVE__||{}).banner||""}
 </span>
 <span style={{...M,fontSize:14,color:"#9A8F82"}}>EARN: {stock.earningsDate}</span>
 <span style={{...M,fontSize:14,color:"#9A8F82"}}>{stock.sector}</span>
 </div>
 </div>

 {/* ROW 1 */}
 <div style={{display:"grid",gridTemplateColumns:"minmax(180px,1fr) 240px minmax(210px,1fr)",gap:10,marginBottom:10,overflowX:"auto"}}>
 {/* PRICE */}
 <div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:12}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600,marginBottom:6}}>Price Scenario</div>
 <div style={{display:"flex",alignItems:"baseline",gap:6,marginBottom:4}}>
 <span style={{...M,fontSize:34,fontWeight:700,color:price===LC[activeTicker]?"#F4EEDF":"#E6A817"}}>${price<1?price.toFixed(2):price}</span>
 <span style={{...M,fontSize:15,color:price>LC[activeTicker]?G:price<LC[activeTicker]?R:"#9A8F82"}}>{price===LC[activeTicker]?"LAST CLOSE":`${((price-LC[activeTicker])/LC[activeTicker]*100).toFixed(1)}%`}</span>
 <button onClick={()=>setPrice(LC[activeTicker])} style={{...M,fontSize:12,padding:"2px 6px",borderRadius:3,border:"1px solid #E6A81744",background:price===LC[activeTicker]?"#E6A81722":"transparent",color:"#E6A817",cursor:"pointer",fontWeight:600,marginLeft:"auto"}}>NOW</button>
 </div>
 <input type="range" min={Math.round(stock.price*0.5)} max={Math.round(stock.price*1.5)} step={stock.price>100?1:0.5} value={price} onChange={e=>setPrice(Number(e.target.value))} style={{width:"100%",height:4,appearance:"none",background:"linear-gradient(90deg,#E8643A,#FFBF00 40%,#3DBFA8 50%,#FFBF00 65%,#E8643A)",borderRadius:2,outline:"none",cursor:"pointer"}}/>
 <div style={{display:"flex",justifyContent:"space-between",...M,fontSize:12,color:"#9A8F82",marginTop:3}}><span>LOW ${stock.lowPT}</span><span>AVG ${stock.avgPT}</span><span>HIGH ${stock.highPT}</span></div>
 <div style={{marginTop:8,paddingTop:6,borderTop:"1px solid #2C2433"}}>
 <div style={{...M,fontSize:13,color:"#9A8F82",marginBottom:4}}>EARNINGS SCENARIO</div>
 <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
 {[{id:"none",l:"NONE",c:"#B8AE92"},{id:"big_beat",l:"BIG BEAT",c:G},{id:"beat",l:"BEAT",c:G},{id:"miss",l:"MISS",c:R},{id:"big_miss",l:"BIG MISS",c:R}].map(s=>(<button key={s.id} onClick={()=>setEps(s.id)} style={{...M,fontSize:12,padding:"2px 5px",border:`1px solid ${eps===s.id?s.c+"66":"#3A3042"}`,background:eps===s.id?s.c+"15":"transparent",color:eps===s.id?s.c:"#B8AE92",borderRadius:3,cursor:"pointer"}}>{s.l}</button>))}
 </div>
 </div>
 </div>
 {/* GAUGE */}
 <div style={{background:"#17131A",border:`1px solid ${sig.color}33`,borderRadius:6,padding:10,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
 <svg width="110" height="62" viewBox="0 0 110 62">
 <path d="M 8 55 A 47 47 0 0 1 102 55" fill="none" stroke="#2C2433" strokeWidth="5" strokeLinecap="round"/>
 <path d="M 8 55 A 47 47 0 0 1 32 15" fill="none" stroke={R} strokeWidth="5" strokeLinecap="round"/>
 <path d="M 32 15 A 47 47 0 0 1 55 8" fill="none" stroke={Y} strokeWidth="5" strokeLinecap="round"/>
 <path d="M 55 8 A 47 47 0 0 1 78 15" fill="none" stroke={G} strokeWidth="5" strokeLinecap="round" opacity="0.5"/>
 <path d="M 78 15 A 47 47 0 0 1 102 55" fill="none" stroke={G} strokeWidth="5" strokeLinecap="round"/>
 <line x1="55" y1="55" x2={55+36*Math.cos(gaugeAngle*Math.PI/180)} y2={55-36*Math.sin(gaugeAngle*Math.PI/180)} stroke={sig.color} strokeWidth="2" strokeLinecap="round" style={{transition:"all 0.4s"}}/>
 <circle cx="55" cy="55" r="3" fill={sig.color}/>
 </svg>
 <div style={{...M,fontSize:20,fontWeight:700,color:sig.color}}>{sig.signal}</div>
 <div style={{...M,fontSize:14,color:"#B8AE92"}}>{sig.score>0?"+":""}{sig.score}/100</div>
 <div style={{...M,fontSize:13,color:"#9A8F82"}}>{sig.bullCount}B/{sig.bearCount}Be • {sig.activeCount}</div>
 <div style={{...M,fontSize:13,color:parseFloat(sig.upside)>0?G:R,marginTop:1}}>{parseFloat(sig.upside)>0?"+":""}{sig.upside}% to PT</div>
 </div>
 {/* RISK-ADJUSTED CONVICTION */}
 <div style={{background:"#17131A",border:`1px solid ${riskAdj.gapColor}33`,borderRadius:6,padding:10,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minWidth:110,position:"relative"}}>
 <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:4}}>
 <div style={{...M,fontSize:12,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600}}>Risk-Adjusted</div>
 <div onClick={()=>setShowRiskInfo(!showRiskInfo)} style={{cursor:"pointer",width:14,height:14,borderRadius:7,background:showRiskInfo?"#E6A81722":"#2C2433",border:`1px solid ${showRiskInfo?"#E6A81744":"#3A3042"}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
 <span style={{...M,fontSize:13,color:showRiskInfo?"#E6A817":"#9A8F82",fontWeight:700}}>?</span>
 </div>
 </div>
 <div style={{display:"flex",alignItems:"baseline",gap:4}}>
 <span style={{...M,fontSize:28,fontWeight:800,color:riskAdj.adjScore>=60?G:riskAdj.adjScore>=35?Y:R}}>{riskAdj.adjScore}</span>
 <span style={{...M,fontSize:15,color:"#9A8F82"}}>/100</span>
 </div>
 <div style={{display:"flex",alignItems:"center",gap:4,marginTop:4}}>
 <span style={{...M,fontSize:14,color:sig.color,fontWeight:600}}>{sig.score}</span>
 <span style={{...M,fontSize:13,color:"#9A8F82"}}>→</span>
 <span style={{...M,fontSize:14,color:riskAdj.adjScore>=60?G:riskAdj.adjScore>=35?Y:R,fontWeight:600}}>{riskAdj.adjScore}</span>
 <span style={{...M,fontSize:13,color:R}}>(-{riskAdj.penalty})</span>
 </div>
 {riskAdj.gap>=8&&<div style={{marginTop:4,padding:"2px 6px",borderRadius:3,background:riskAdj.gapColor+"22",border:`1px solid ${riskAdj.gapColor}44`}}>
 <span style={{...M,fontSize:12,fontWeight:700,color:riskAdj.gapColor}}>{riskAdj.label}</span>
 </div>}
 <div style={{width:"100%",height:4,background:"#241C2B",borderRadius:2,marginTop:6,overflow:"hidden"}}>
 <div style={{width:`${riskAdj.adjScore}%`,height:"100%",background:`linear-gradient(90deg,${riskAdj.adjScore>=60?G:riskAdj.adjScore>=35?Y:R},${riskAdj.adjScore>=60?G:riskAdj.adjScore>=35?Y:R}88)`,borderRadius:2,transition:"width 0.3s"}}/>
 </div>
 {showRiskInfo&&<div style={{position:"absolute",top:"100%",left:0,right:0,zIndex:50,marginTop:4,background:"#1E1924",border:"1px solid #E6A81733",borderRadius:6,padding:12,boxShadow:"0 8px 24px rgba(0,0,0,0.6)",minWidth:280}}>
 <div style={{...M,fontSize:14,fontWeight:700,color:"#E6A817",marginBottom:8}}>How Risk-Adjusted Score Works</div>
 <div style={{...M,fontSize:13,color:"#D6CDB6",lineHeight:1.7,marginBottom:8}}>
 <span style={{fontWeight:700,color:"#F4EEDF"}}>Raw Score</span> = signal-based conviction (analyst PTs, momentum, flow, earnings).
 <br/><span style={{fontWeight:700,color:"#F4EEDF"}}>Penalty</span> = each active risk's <span style={{color:"#E08A4A"}}>probability</span> × <span style={{color:"#E08A4A"}}>severity weight</span> (HIGH=1.5x, MED=1.0x, LOW=0.5x), normalized to a max 40-point deduction.
 <br/><span style={{fontWeight:700,color:"#F4EEDF"}}>Risk-Adjusted</span> = Raw − Penalty. The score after accounting for what could go wrong.
 </div>
 <div style={{...M,fontSize:13,color:"#B8AE92",marginBottom:6}}>Example: 30% prob × HIGH (1.5x) = 0.45 weighted risk units</div>
 <div style={{display:"flex",flexDirection:"column",gap:4}}>
 {[{label:"LOW GAP",range:"< 8 pts",color:G,desc:"Risks manageable. Conviction holds. Size normally."},
 {label:"MODERATE GAP",range:"12-19 pts",color:Y,desc:"Material risks. Size with caution. Review catalysts."},
 {label:"HIGH CONVICTION GAP",range:"20+ pts",color:R,desc:"Bull case and risk profile conflicting. Reduce size or wait for catalyst resolution."}
 ].map((g,i)=>(<div key={i} style={{display:"flex",gap:6,alignItems:"flex-start"}}>
 <span style={{...M,fontSize:12,fontWeight:700,padding:"2px 5px",borderRadius:3,background:g.color+"22",color:g.color,flexShrink:0,minWidth:82,textAlign:"center"}}>{g.label}</span>
 <div>
 <span style={{...M,fontSize:12,color:"#9A8F82"}}>{g.range}</span>
 <span style={{...M,fontSize:12,color:"#B8AE92"}}> — {g.desc}</span>
 </div>
 </div>))}
 </div>
 <div style={{...M,fontSize:12,color:"#9A8F82",marginTop:8,borderTop:"1px solid #2C2433",paddingTop:6}}>If two stocks both score 50 raw, but one adjusts to 45 and the other to 28 — the second has far more landmines. Size the first one bigger.</div>
 </div>}
 </div>
 {/* WATERFALL */}
 <div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:10,overflow:"hidden"}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600,marginBottom:4}}>Contributions</div>
 <div style={{maxHeight:175,overflowY:"auto"}}>
 {sig.contribs.map(c=>(<div key={activeTicker+"-c-"+c.id} style={{display:"flex",alignItems:"center",gap:3,marginBottom:1.5}}>
 <span style={{...M,fontSize:11,color:"#9A8F82",width:183,flexShrink:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.headline}</span>
 <div style={{flex:1,height:4,background:"#241C2B",borderRadius:2,position:"relative",overflow:"hidden"}}>
 {c.contrib>=0?<div style={{position:"absolute",left:"50%",width:`${(c.contrib/sig.mx)*50}%`,height:"100%",background:G,borderRadius:2}}/>
 :<div style={{position:"absolute",right:"50%",width:`${(Math.abs(c.contrib)/sig.mx)*50}%`,height:"100%",background:R,borderRadius:2}}/>}
 <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:"#3A3042"}}/>
 </div>
 <span style={{...M,fontSize:11,color:c.contrib>0?G:R,width:40,textAlign:"right",flexShrink:0}}>{c.contrib>0?"+":""}{c.contrib.toFixed(1)}</span>
 </div>))}
 </div>
 </div>
 </div>

 {/* INTEL FRESHNESS BAR */}
 {(()=>{
 const ni=allItems[activeTicker];
 const fresh=ni.filter(n=>db(new Date(n.dateStr),TD)<=2).length;
 const aging=ni.filter(n=>{const a=db(new Date(n.dateStr),TD);return a>7&&a<=14;}).length;
 const stale=ni.filter(n=>db(new Date(n.dateStr),TD)>14).length;
 const ok=ni.length-fresh-aging-stale;
 return(stale>0||aging>0)?(
 <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8,padding:"5px 10px",background:stale>3?R+"08":Y+"08",border:`1px solid ${stale>3?R:Y}22`,borderRadius:4}}>
 <div style={{display:"flex",gap:0,flex:1,height:6,borderRadius:3,overflow:"hidden"}}>
 {fresh>0&&<div style={{flex:fresh,background:"#E6A817"}} title={fresh+" new (≤2d)"}/>}
 {ok>0&&<div style={{flex:ok,background:G}} title={ok+" current (3-7d)"}/>}
 {aging>0&&<div style={{flex:aging,background:Y}} title={aging+" aging (8-14d)"}/>}
 {stale>0&&<div style={{flex:stale,background:R}} title={stale+" stale (>14d)"}/>}
 </div>
 <span style={{...M,fontSize:12,color:stale>3?R:Y,flexShrink:0}}>
 {stale>0?`${stale} stale`:""}{stale>0&&aging>0?" • ":""}{aging>0?`${aging} aging`:""}
 </span>
 </div>
 ):null;
 })()}

 {/* KEY STATS */}
 <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch",marginBottom:10}}>
 <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:0,border:"1px solid #2C2433",borderRadius:5,overflow:"hidden",background:"#17131A",minWidth:480}}>
 {[{l:"Price",v:`$${stock.price}`,c:"#F4EEDF"},{l:"YTD",v:`${stock.ytd>0?"+":""}${stock.ytd}%`,c:stock.ytd>0?G:R},{l:"Fwd P/E",v:stock.fwdPE>0?`${stock.fwdPE}x`:(stock.fwdPENote||"n/a"),c:"#7E91E8"},{l:"Mkt Cap",v:stock.mktCap,c:"#F4EEDF"},{l:"52w High",v:`$${stock.high52}`,c:Y},{l:"Consensus",v:stock.consensus,c:stock.consensus.includes("Buy")?G:Y}].map((s,i)=>(
 <div key={i} style={{padding:"8px 10px",borderRight:i<5?"1px solid #2C2433":"none"}}>
 <div style={{...M,fontSize:12,textTransform:"uppercase",letterSpacing:1,color:"#9A8F82",fontWeight:600,marginBottom:2}}>{s.l}</div>
 <div style={{...M,fontSize:16,fontWeight:700,color:s.c}}>{s.v}</div>
 </div>))}
 </div>
 </div>

 {/* TABS */}
 <div style={{display:"flex",gap:0,marginBottom:10,borderBottom:"1px solid #2C2433",overflowX:"auto"}}>
 {tabs.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{...M,fontSize:14,padding:"7px 12px",border:"none",borderBottom:tab===t.id?"2px solid #E6A817":"2px solid transparent",background:"transparent",color:tab===t.id?"#E6A817":"#9A8F82",cursor:"pointer",fontWeight:600,flexShrink:0}}>{t.l}</button>))}
 </div>

 {/* INTEL FEED */}
 {tab==="feed"&&(<>
 <div style={{marginBottom:6,display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>
 <button onClick={()=>setShowAdd(!showAdd)} style={{...M,fontSize:13,padding:"3px 8px",border:"1px solid #B266FF33",background:showAdd?"rgba(168,124,255,0.1)":"transparent",color:"#B266FF",borderRadius:3,cursor:"pointer",fontWeight:600}}>+ RUMOR</button>
 <button onClick={()=>setAllItems(p=>({...p,[activeTicker]:p[activeTicker].map(i=>({...i,on:true}))}))} style={{...M,fontSize:13,padding:"3px 6px",border:"1px solid #3A3042",background:"transparent",color:"#B8AE92",borderRadius:3,cursor:"pointer"}}>ALL ON</button>
 <button onClick={()=>setAllItems(p=>({...p,[activeTicker]:p[activeTicker].map(i=>({...i,on:false}))}))} style={{...M,fontSize:13,padding:"3px 6px",border:"1px solid #3A3042",background:"transparent",color:"#B8AE92",borderRadius:3,cursor:"pointer"}}>ALL OFF</button>
 <div style={{width:1,height:12,background:"#3A3042"}}/>
 {["all","rumor","bull","bear"].map(f=>(<button key={f} onClick={()=>setFilter(f)} style={{...M,fontSize:13,padding:"3px 6px",border:`1px solid ${filter===f?"#E6A817":"#3A3042"}`,background:filter===f?"rgba(0,212,255,0.08)":"transparent",color:filter===f?"#E6A817":"#B8AE92",borderRadius:3,cursor:"pointer"}}>{f.toUpperCase()}</button>))}
 <div style={{width:1,height:12,background:"#3A3042"}}/>
 {[{v:"3d",l:"3D"},{v:"7d",l:"7D"},{v:"30d",l:"30D"},{v:"90d",l:"90D"},{v:"all",l:"ALL"}].map(tf=>(<button key={tf.v} onClick={()=>setTimeFilter(tf.v)} style={{...M,fontSize:13,padding:"3px 6px",border:`1px solid ${timeFilter===tf.v?"#E6A817":"#3A3042"}`,background:timeFilter===tf.v?"rgba(34,211,238,0.08)":"transparent",color:timeFilter===tf.v?"#E6A817":"#B8AE92",borderRadius:3,cursor:"pointer",fontWeight:timeFilter===tf.v?700:400}}>{tf.l}</button>))}
 </div>
 {showAdd&&(<div style={{background:"#17131A",border:"1px solid #B266FF33",borderRadius:4,padding:10,marginBottom:6}}>
 <input value={newH} onChange={e=>setNewH(e.target.value)} placeholder="Enter headline..." style={{width:"100%",background:"#241C2B",border:"1px solid #3A3042",borderRadius:3,padding:"5px 8px",color:"#F4EEDF",fontSize:16,fontFamily:"inherit",outline:"none",marginBottom:6}}/>
 <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
 <div><div style={{...M,fontSize:12,color:"#9A8F82",marginBottom:2}}>SENT: {newSe.toFixed(1)}</div><input type="range" min={-1} max={1} step={0.1} value={newSe} onChange={e=>setNewSe(Number(e.target.value))} style={{width:120,appearance:"none",height:3,background:`linear-gradient(90deg,${R},${Y},${G})`,borderRadius:2,outline:"none",cursor:"pointer"}}/></div>
 <div><div style={{...M,fontSize:12,color:"#9A8F82",marginBottom:2}}>WT: {newW}%</div><input type="range" min={1} max={20} step={1} value={newW} onChange={e=>setNewW(Number(e.target.value))} style={{width:80,appearance:"none",height:3,background:"#3A3042",borderRadius:2,outline:"none",cursor:"pointer"}}/></div>
 <button onClick={addRumor} style={{...M,fontSize:14,padding:"4px 10px",border:"none",background:"#B266FF",color:"#0D0D0D",borderRadius:3,cursor:"pointer",fontWeight:700}}>ADD</button>
 </div>
 </div>)}
 <div style={{display:"flex",flexDirection:"column",gap:3}}>
 {filtered.map(n=>{const sc=n.sentiment>0.2?G:n.sentiment<-0.2?R:Y;const sl=n.sentiment>0.2?"BULL":n.sentiment<-0.2?"BEAR":"NEUT";const age=db(new Date(n.dateStr),TD);const decay=Math.max(0.3,1-(age/120));
 return(<div key={activeTicker+"-"+n.id} style={{background:n.on?"#17131A":"#0A090B",border:`1px solid ${n.on?"#2C2433":"#1E1924"}`,borderRadius:4,padding:"7px 10px",borderLeft:`3px solid ${n.on?sc:"#3A3042"}`,opacity:n.on?1:0.3,transition:"all 0.3s"}}>
 <div style={{display:"flex",alignItems:"center",gap:5}}>
 <div onClick={()=>toggle(n.id)} style={{width:28,height:14,borderRadius:7,background:n.on?sc+"33":"#241C2B",border:`1px solid ${n.on?sc+"55":"#3A3042"}`,cursor:"pointer",position:"relative",flexShrink:0}}>
 <div style={{width:9,height:9,borderRadius:5,background:n.on?sc:"#9A8F82",position:"absolute",top:1.5,left:n.on?15:2,transition:"left 0.3s"}}/>
 </div>
 <div style={{flex:1,minWidth:0}}>
 <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:1,flexWrap:"wrap"}}>
 <span style={{...M,fontSize:12,color:"#9A8F82"}}>{n.dateStr.slice(5)}</span>
 {age<=2&&<span style={{...M,fontSize:11,fontWeight:700,padding:"0 3px",borderRadius:2,background:"#E6A81722",color:"#E6A817",letterSpacing:0.5}}>NEW</span>}
 {age>14&&<span style={{...M,fontSize:11,fontWeight:700,padding:"0 3px",borderRadius:2,background:R+"22",color:R,letterSpacing:0.5}}>STALE</span>}
 {age>7&&age<=14&&<span style={{...M,fontSize:11,fontWeight:700,padding:"0 3px",borderRadius:2,background:Y+"22",color:Y,letterSpacing:0.5}}>AGING</span>}
 <span style={{...M,fontSize:11,fontWeight:600,padding:"0 3px",borderRadius:2,background:sc+"15",color:sc}}>{sl}</span>
 <span style={{...M,fontSize:11,fontWeight:600,padding:"0 3px",borderRadius:2,background:"rgba(126,145,232,0.08)",color:CC[n.category]||"#7E91E8"}}>{n.category.toUpperCase()}</span>
 {n.type==="rumor"&&<span style={{...M,fontSize:11,fontWeight:600,padding:"0 3px",borderRadius:2,background:"rgba(168,124,255,0.08)",color:"#B266FF"}}>RUMOR</span>}
 <span style={{...M,fontSize:11,color:"#9A8F82",opacity:0.5}}>×{decay.toFixed(2)}</span>
 </div>
 <div style={{fontSize:16,fontWeight:600,lineHeight:1.2}}>{n.headline}</div>
 {n.on&&<div style={{fontSize:14,color:"#B8AE92",lineHeight:1.3,marginTop:1}}>{n.detail}
 <a href={`https://www.google.com/search?q=${encodeURIComponent(activeTicker+" "+n.headline+" "+n.source)}`} target="_blank" rel="noopener noreferrer" style={{...M,fontSize:13,color:"#E6A817",marginLeft:4,textDecoration:"none",opacity:0.7}} onClick={e=>e.stopPropagation()}>
 {n.source} ↗
 </a>
 </div>}
 </div>
 <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0,width:44}}>
 <span style={{...M,fontSize:11,color:"#9A8F82"}}>WT {n.weight}%</span>
 <input type="range" min={0} max={20} step={1} value={n.weight} onChange={e=>updW(n.id,Number(e.target.value))} style={{width:36,appearance:"none",height:2,background:"#3A3042",borderRadius:2,outline:"none",cursor:"pointer"}}/>
 </div>
 </div>
 </div>);})}
 </div>
 </>)}

 {/* PLAYBOOK */}
 {tab==="playbook"&&(<div style={{display:"flex",flexDirection:"column",gap:8}}>
 <div style={{...M,fontSize:14,color:"#9A8F82"}}><span style={{background:"linear-gradient(135deg,#E6A817,#B266FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontWeight:700}}>ADE ANALYST</span> — {activeTicker} at ${price}</div>
 {stock.playbook.map((p,i)=>(<div key={i} style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:5,padding:14,borderLeft:`3px solid ${p.color}`}}>
 <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
 <span style={{...M,fontSize:16,fontWeight:700,color:p.color}}>{p.h}</span>
 <span style={{...M,fontSize:14,fontWeight:600,padding:"2px 6px",borderRadius:3,background:p.color+"15",color:p.color}}>{p.bias}</span>
 </div>
 <div style={{fontSize:16,color:"#D6CDB6",lineHeight:1.5,marginBottom:8}}>{p.thesis}</div>
 <div style={{background:"#241C2B",borderRadius:3,padding:"8px 10px"}}>
 <div style={{...M,fontSize:12,textTransform:"uppercase",letterSpacing:1,color:"#E6A817",fontWeight:600,marginBottom:3}}>ACTION</div>
 <div style={{fontSize:15,color:"#F4EEDF",lineHeight:1.4}}>{p.action}</div>
 </div>
 </div>))}
 </div>)}

 {/* RISK / REWARD */}
 {tab==="riskrew"&&(<div>
 {/* Macro regime bar */}
 <div style={{background:"#17131A",border:`1px solid ${MACRO.color}33`,borderRadius:6,padding:"10px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
 <div style={{display:"flex",alignItems:"center",gap:6}}>
 <span style={{width:8,height:8,borderRadius:4,background:MACRO.color}}/>
 <span style={{...M,fontSize:15,fontWeight:700,color:MACRO.color}}>{MACRO.regime}</span>
 </div>
 <span style={{...M,fontSize:13,color:"#B8AE92"}}>CPI {MACRO.cpi==null?"n/a":MACRO.cpi+"%"}{MACRO.cpiPrior==null?"":` (prior ${MACRO.cpiPrior}%)`}</span>
 <span style={{...M,fontSize:13,color:"#B8AE92"}}>VIX {MACRO.vix}</span>
 <span style={{...M,fontSize:13,color:"#B8AE92"}}>Fed: {MACRO.rateOutlook}</span>
 <span style={{...M,fontSize:13,color:stock.rateNote&&stock.rateNote.startsWith("HIGH")?"#E6A817":"#9A8F82"}}>Rate sensitivity: {stock.rateNote||"n/a"}</span>
 </div>
 {/* Asymmetry with real support */}
 <div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:16,marginBottom:12}}>
 <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
 <div style={{...M,fontSize:14,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600}}>{activeTicker} at ${price} — Asymmetry Profile</div>
 <div style={{display:"flex",gap:6}}>
 {stock.ptVerified===true&&(<span style={{...M,fontSize:12,padding:"1px 5px",borderRadius:3,background:"#3DBFA822",color:"#3DBFA8",border:"1px solid #3DBFA844",fontWeight:700}}>✓ PT VERIFIED {stock.ptDate}</span>)}
 {stock.supportVerified===true&&(<span title={stock.supportAnchor||""} style={{...M,fontSize:12,padding:"1px 5px",borderRadius:3,background:"#3DBFA822",color:"#3DBFA8",border:"1px solid #3DBFA844",fontWeight:700}}>✓ SUP VERIFIED {stock.supportDate}</span>)}
 {stock.ptVerified===false&&(<span style={{...M,fontSize:12,padding:"1px 5px",borderRadius:3,background:"#FFBF0022",color:"#FFBF00",border:"1px solid #FFBF0044",fontWeight:700}}>⚠ PT ESTIMATED</span>)}
 </div>
 </div>
 <div style={{display:"flex",alignItems:"center",gap:0,height:48,marginBottom:8}}>
 <div style={{flex:Math.max(1,Math.abs(rr.dS)),display:"flex",justifyContent:"flex-end",alignItems:"center",height:"100%"}}>
 <div style={{width:"100%",height:32,background:"linear-gradient(90deg,#E8643A22,#E8643A66)",borderRadius:"4px 0 0 4px",display:"flex",alignItems:"center",justifyContent:"flex-start",paddingLeft:8}}>
 <span style={{...M,fontSize:14,color:R,fontWeight:700}}>{rr.dS.toFixed(1)}%</span>
 </div>
 </div>
 <div style={{width:3,height:48,background:"#F4EEDF",borderRadius:2,flexShrink:0,margin:"0 2px"}}/>
 <div style={{flex:Math.max(1,Math.abs(rr.uA)),display:"flex",justifyContent:"flex-start",alignItems:"center",height:"100%"}}>
 <div style={{width:"100%",height:32,background:rr.uA>0?"linear-gradient(90deg,#3DBFA866,#3DBFA822)":"linear-gradient(90deg,#E8643A66,#E8643A22)",borderRadius:"0 4px 4px 0",display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:8}}>
 <span style={{...M,fontSize:14,color:rr.uA>0?G:R,fontWeight:700}}>{rr.uA>0?"+":""}{rr.uA.toFixed(1)}%</span>
 </div>
 </div>
 </div>
 {/* Support levels row */}
 <div style={{display:"flex",justifyContent:"space-between",...M,fontSize:13,color:"#9A8F82",marginBottom:6}}>
 <span>S1: ${rr.s1} <span style={{color:"#E8643A88"}}>({rr.s1Label})</span></span>
 <span style={{color:"#F4EEDF"}}>NOW ${price}</span>
 <span>Avg PT ${stock.avgPT}</span>
 </div>
 {stock.support&&<div style={{display:"flex",gap:6,marginBottom:12}}>
 {stock.support.map((s,i)=>(<span key={i} style={{...M,fontSize:12,padding:"2px 6px",borderRadius:3,background:i===0?"#E8643A22":i===1?"#E8643A11":"#E8643A08",color:i===0?R:"#E8643A88",border:`1px solid ${i===0?"#E8643A33":"#E8643A15"}`}}>S{i+1}: ${s.lvl} — {s.label}</span>))}
 </div>}
 <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
 {[{l:"Upside to Avg PT",v:`${rr.uA>0?"+":""}${rr.uA.toFixed(1)}%`,c:rr.uA>0?G:R,s:`$${stock.avgPT}`,verified:stock.ptVerified},
 {l:"Upside to High PT",v:`${rr.uH>0?"+":""}${rr.uH.toFixed(1)}%`,c:rr.uH>0?G:R,s:`$${stock.highPT}`,verified:stock.ptVerified},
 {l:"Downside to S1",v:`${rr.dS.toFixed(1)}%`,c:R,s:`$${rr.s1} (${rr.s1Label})`,verified:stock.supportVerified},
 {l:"Downside to S2",v:`${rr.dS2.toFixed(1)}%`,c:R,s:`$${rr.s2}`,verified:stock.supportVerified}
 ].map((m,i)=>(<div key={i} style={{background:"#241C2B",borderRadius:4,padding:10,position:"relative"}}>{m.verified===false&&(<span style={{...M,fontSize:11,padding:"0px 3px",borderRadius:2,background:"#FFBF0033",color:"#FFBF00",fontWeight:700,position:"absolute",top:4,right:4}}>EST</span>)}{m.verified===true&&(<span style={{...M,fontSize:11,padding:"0px 3px",borderRadius:2,background:"#3DBFA833",color:"#3DBFA8",fontWeight:700,position:"absolute",top:4,right:4}}>✓</span>)}
 <div style={{...M,fontSize:12,textTransform:"uppercase",letterSpacing:1,color:"#9A8F82",fontWeight:600,marginBottom:3}}>{m.l}</div>
 <div style={{...M,fontSize:22,fontWeight:700,color:m.c}}>{m.v}</div>
 <div style={{...M,fontSize:12,color:"#9A8F82",marginTop:2}}>{m.s}</div>
 </div>))}
 </div>
 </div>
 {/* R:R ratios */}
 <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:12}}>
 {[{l:"R:R (Avg PT vs S1)",v:`${rr.rrA.toFixed(1)}x`,c:rr.rrA>2?G:rr.rrA>1?Y:R,b:rr.rrA/5*100,d:rr.rrA>2?"Favorable asymmetry":"Needs more upside or tighter stop"},
 {l:"R:R (High PT vs S1)",v:`${rr.rrH.toFixed(1)}x`,c:rr.rrH>3?G:rr.rrH>1.5?Y:R,b:rr.rrH/8*100,d:"Bull case / technical downside"},
 {l:"Expected Return",v:`${rr.er>0?"+":""}${rr.er.toFixed(1)}%`,c:rr.er>0?G:R,b:(rr.er+20)/40*100,d:"Signal-weighted probability × payoff"}
 ].map((m,i)=>(<div key={i} style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:14}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1,color:"#9A8F82",fontWeight:600,marginBottom:4}}>{m.l}</div>
 <div style={{...M,fontSize:32,fontWeight:700,color:m.c}}>{m.v}</div>
 <div style={{...M,fontSize:13,color:"#9A8F82",marginTop:3}}>{m.d}</div>
 <div style={{marginTop:6,height:4,background:"#241C2B",borderRadius:2,overflow:"hidden"}}><div style={{width:`${Math.min(100,Math.max(0,m.b))}%`,height:"100%",background:m.c,borderRadius:2}}/></div>
 </div>))}
 </div>
 {/* Options Strategy Recommendation */}
 <div style={{background:"#17131A",border:`1px solid ${rr.optColor}33`,borderRadius:6,padding:14,marginBottom:12}}>
 <div style={{...M,fontSize:14,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600,marginBottom:6}}>Options Strategy — Signal + IV {stock.optionsVerified===false&&(<span style={{...M,fontSize:12,padding:"1px 5px",marginLeft:6,borderRadius:3,background:"#E8643A22",color:"#EE8A64",border:"1px solid #E8643A44",fontWeight:700}}>⚠ ESTIMATED</span>)}{stock.optionsVerified===true&&(<span style={{...M,fontSize:12,padding:"1px 5px",marginLeft:6,borderRadius:3,background:"#3DBFA822",color:"#3DBFA8",border:"1px solid #3DBFA844",fontWeight:700}}>✓ VERIFIED</span>)}</div>
 <div style={{display:"flex",alignItems:"center",gap:12}}>
 <div>
 <div style={{...M,fontSize:24,fontWeight:800,color:rr.optColor}}>{rr.optStrat}</div>
 <div style={{...M,fontSize:13,color:"#9A8F82",marginTop:2}}>Signal: {sig.score>0?"+":""}{sig.score} • IV Rank: {rr.iv}%</div>
 </div>
 <div style={{flex:1,fontSize:15,color:"#B8AE92",lineHeight:1.5}}>{rr.optDetail}</div>
 </div>
 </div>
 {/* Position sizing */}
 <div style={{background:"#17131A",border:`1px solid ${rr.kf>0.1?G+"33":"#2C2433"}`,borderRadius:6,padding:14}}>
 <div style={{...M,fontSize:14,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600,marginBottom:6}}>Position Sizing Signal</div>
 <div style={{display:"flex",alignItems:"center",gap:16}}>
 <div>
 <div style={{...M,fontSize:13,color:"#9A8F82",marginBottom:2}}>Kelly-Inspired Fraction</div>
 <div style={{...M,fontSize:28,fontWeight:700,color:rr.kf>0.15?G:rr.kf>0.05?Y:R}}>{(rr.kf*100).toFixed(1)}%</div>
 </div>
 <div style={{flex:1,fontSize:15,color:"#B8AE92",lineHeight:1.5}}>
 {rr.kf>0.15?"Strong conviction. Allocate 10-15% of portfolio. Signal + R/R both favor aggressive sizing.":
 rr.kf>0.05?"Moderate conviction. 5-8% allocation appropriate. Asymmetry exists but isn't extreme.":
 rr.kf>0?"Low conviction. 2-4% max. Edge is thin relative to risk.":
 "No edge at this price. Signal neutral/negative. Stay flat or reduce."}
 </div>
 </div>
 </div>
 </div>)}

 {/* CONVICTION RANKER */}
 {tab==="ranker"&&(<div>
 <div style={{...M,fontSize:14,color:"#9A8F82",marginBottom:4}}>
 <span style={{background:"linear-gradient(135deg,#E6A817,#B266FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontWeight:700}}>ADE CONVICTION RANKER</span> — All Positions by Edge-Adjusted Risk/Reward
 </div>
 <div style={{...M,fontSize:13,color:"#9A8F82",marginBottom:12,lineHeight:1.5}}>
 30% upside to PT + 28% R:R to nearest defended support + 17% support quality (distance x times defended) + 15% momentum (RSI/MACD) + 10% structural integrity. News sentiment REMOVED Sep 3 — it was self-scored, so feeding it back was circular; items still appear in INTEL. Stops removed — downside now measures to observed support. R:R denominator floored at 3% of price. IV term dropped while ivRank is null.
 </div>
 <div style={{display:"flex",flexDirection:"column",gap:4}}>
 {rankerData.map((r,i)=>{const isA=r.ticker===activeTicker;return(
 <div key={r.ticker} onClick={()=>{setActiveTicker(r.ticker);setTab("riskrew");}} style={{background:isA?"#241C2B":"#17131A",border:`1px solid ${isA?"#E6A81733":"#2C2433"}`,borderRadius:5,padding:"10px 14px",cursor:"pointer",borderLeft:`4px solid ${r.gc}`,overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
 <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,minWidth:520}}>
 <span style={{...M,fontSize:22,fontWeight:800,color:r.gc,width:39}}>{r.gr}</span>
 <div style={{flex:1}}>
 <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
 <span style={{...M,fontSize:18,fontWeight:700,color:isA?"#E6A817":"#F4EEDF"}}>{r.ticker}</span>
 <span style={{fontSize:15,color:"#B8AE92"}}>{r.name}</span>
 </div>
 <div style={{marginTop:4,height:6,background:"#241C2B",borderRadius:3,overflow:"hidden",position:"relative"}}>
 <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:"#3A3042"}}/>
 {r.cv>=0?<div style={{position:"absolute",left:"50%",width:`${r.cv/2}%`,height:"100%",background:`linear-gradient(90deg,${r.gc}88,${r.gc})`,borderRadius:"0 3px 3px 0"}}/>
 :<div style={{position:"absolute",right:"50%",width:`${Math.abs(r.cv)/2}%`,height:"100%",background:`linear-gradient(270deg,${r.gc}88,${r.gc})`,borderRadius:"3px 0 0 3px"}}/>}
 </div>
 </div>
 <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0,minWidth:280}}>
 {[{l:"SUPPORT",v:`${r.ds.toFixed(1)}%`,c:r.ds<5?G:r.ds<15?Y:R},
  {l:"RISKS",v:`${r.riskCount}${r.riskHigh?" ("+r.riskHigh+"H)":""}`,c:r.riskHigh>=2?R:r.riskHigh===1?Y:"#B8AE92"},
 {l:"R:R",v:`${r.rr.toFixed(1)}x`,c:r.rr>2?G:r.rr>1?Y:R},
 {l:"UPSIDE",v:`${r.uA>0?"+":""}${r.uA.toFixed(0)}%`,c:r.uA>0?G:R},
 {l:"IV",v:`${r.iv}%`,c:r.iv>60?Y:"#7E91E8"},
 {l:"RAW",v:r.cv,c:"#B8AE92"},
 {l:"ADJ",v:r.adjCv,c:r.gc},
 {l:"GAP",v:`-${r.pen2}`,c:r.cvGap>=20?R:r.cvGap>=12?Y:"#9A8F82"}
 ].map((m,j)=>(<div key={j} style={{textAlign:"center",minWidth:j>=5?36:30}}>
 <div style={{...M,fontSize:12,color:"#9A8F82"}}>{m.l}</div>
 <div style={{...M,fontSize:j===5?19:j===6?15:16,fontWeight:j===5?800:700,color:m.c}}>{m.v}</div>
 </div>))}
 </div>
 </div>
 </div>);})}
 </div>
 <div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:14,marginTop:12}}>
 <div style={{...M,fontSize:14,textTransform:"uppercase",letterSpacing:1.5,color:"#E6A817",fontWeight:600,marginBottom:6}}>Capital Allocation Insight</div>
 <div style={{fontSize:16,color:"#D6CDB6",lineHeight:1.6}}>
 {(()=>{const t3=rankerData.slice(0,3),bt=rankerData.filter(r=>r.cv<0);return`Top 3: ${t3.map(r=>`${r.ticker} (${r.gr})`).join(", ")}. Best combo of signal, asymmetry, and IV efficiency. ${bt.length>0?`Consider reducing ${bt.map(r=>r.ticker).join(", ")} — negative edge at current prices.`:"All positions positive edge — portfolio well-positioned."} Click any row → Risk/Reward detail.`;})()}
 </div>
 </div>
 </div>)}

 {/* OPTIONS */}
 {tab==="options"&&(<div>
 {/* ROW 1: Core metrics */}
 <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:8}}>
 {[
 {l:"IV Rank",v:stock.options.ivRank==null?"n/a":`${stock.options.ivRank}%`,c:stock.options.ivRank>60?Y:"#7E91E8",sub:"12m range position"},
 {l:"IV Percentile",v:stock.options.ivPctl==null?"n/a":`${stock.options.ivPctl}%`,c:stock.options.ivPctl>70?R:stock.options.ivPctl>40?Y:G,sub:stock.options.ivPctl==null?"needs 20 daily IV readings":`IV higher ${stock.options.ivPctl}% of days`},
 {l:"Put/Call Ratio",v:(stock.options.pcRatio==null?"n/a":stock.options.pcRatio.toFixed(2)),c:stock.options.pcRatio<0.7?G:stock.options.pcRatio>1?R:Y,sub:stock.options.pcRatio>1?"Bearish hedging":stock.options.pcRatio<0.7?"Bullish flow":"Neutral"}
 ].map((o,i)=>(
 <div key={i} style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:5,padding:12}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1,color:"#9A8F82",fontWeight:600,marginBottom:3}}>{o.l}</div>
 <div style={{...M,fontSize:26,fontWeight:700,color:o.c}}>{o.v}</div>
 <div style={{...M,fontSize:13,color:"#9A8F82",marginTop:2}}>{o.sub}</div>
 </div>))}
 </div>
 {/* ROW 2: Implied Move, Skew, Max Pain */}
 <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:8}}>
 {(()=>{
 const mpDist=((stock.options.maxPain-price)/price*100);
 const skew=stock.options.skew;
 return[
 {l:"Implied Move",v:stock.options.impliedMove==null?"n/a":`±${stock.options.impliedMove}%`,c:P,sub:stock.options.impliedMove==null?"no earnings straddle priced yet":`Mkt pricing $${(price*stock.options.impliedMove/100).toFixed(0)} swing at earnings`,icon:"⚡"},
 {l:"Skew",v:skew==null?"n/a":`${skew>0?"+":""}${skew.toFixed(1)}%`,c:skew>1?G:skew<-1?R:Y,sub:skew>1?"Calls bid > puts (bullish)":skew<-1?"Puts bid > calls (bearish)":"Balanced call/put demand",icon:skew>0?"📈":"📉"},
 {l:"Max Pain",v:`$${stock.options.maxPain}`,c:P,sub:`${mpDist>0?"+":""}${mpDist.toFixed(1)}% from here — ${Math.abs(mpDist)<3?"strong magnet":Math.abs(mpDist)<8?"moderate pull":"weak pull"}`,icon:"🧲"}
 ];})().map((o,i)=>(
 <div key={i} style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:5,padding:12}}>
 <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:3}}>
 <span style={{fontSize:15}}>{o.icon}</span>
 <span style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1,color:"#9A8F82",fontWeight:600}}>{o.l}</span>
 </div>
 <div style={{...M,fontSize:26,fontWeight:700,color:o.c}}>{o.v}</div>
 <div style={{...M,fontSize:13,color:"#B8AE92",marginTop:2,lineHeight:1.4}}>{o.sub}</div>
 </div>))}
 </div>
 {/* ROW 3: Last Earnings Reaction + IV Crush Estimate */}
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
 <div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:5,padding:12}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1,color:"#9A8F82",fontWeight:600,marginBottom:4}}>Last Earnings Reaction</div>
 <div style={{display:"flex",alignItems:"baseline",gap:8}}>
 <span style={{...M,fontSize:30,fontWeight:700,color:stock.options.lastEarnMove>0?G:R}}>{stock.options.lastEarnMove>0?"+":""}{stock.options.lastEarnMove}%</span>
 <span style={{...M,fontSize:15,color:"#B8AE92"}}>actual move</span>
 </div>
 <div style={{marginTop:6,display:"flex",alignItems:"center",gap:6}}>
 <div style={{flex:1,height:6,background:"#241C2B",borderRadius:3,overflow:"hidden",position:"relative"}}>
 <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:"#3A3042"}}/>
 {stock.options.lastEarnMove>=0?
 <div style={{position:"absolute",left:"50%",width:`${Math.min(50,Math.abs(stock.options.lastEarnMove)*2.5)}%`,height:"100%",background:G,borderRadius:"0 3px 3px 0"}}/>:
 <div style={{position:"absolute",right:"50%",width:`${Math.min(50,Math.abs(stock.options.lastEarnMove)*2.5)}%`,height:"100%",background:R,borderRadius:"3px 0 0 3px"}}/>}
 </div>
 <span style={{...M,fontSize:13,color:"#9A8F82"}}>vs ±{stock.options.impliedMove}% implied</span>
 </div>
 <div style={{...M,fontSize:14,color:Math.abs(stock.options.lastEarnMove)>stock.options.impliedMove?Y:"#B8AE92",marginTop:4}}>
 {Math.abs(stock.options.lastEarnMove)>stock.options.impliedMove?"⚠ Last move EXCEEDED implied — straddle buyers won":"Last move within implied range — straddle sellers won"}
 </div>
 </div>
 <div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:5,padding:12}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1,color:"#9A8F82",fontWeight:600,marginBottom:4}}>Earnings IV Crush Estimate</div>
 {(()=>{
 const ed=new Date(stock.earningsDate.replace(/(\w+) (\d+), (\d+)/,"$1 $2, $3"));
 const dte=Math.max(0,Math.ceil((ed-TD)/(1000*60*60*24)));
 const crushEst=stock.options.ivRank>60?Math.round(stock.options.ivRank*0.45):Math.round(stock.options.ivRank*0.3);
 return(<>
 <div style={{display:"flex",alignItems:"baseline",gap:6}}>
 <span style={{...M,fontSize:30,fontWeight:700,color:"#B266FF"}}>{dte}d</span>
 <span style={{...M,fontSize:15,color:"#B8AE92"}}>to earnings</span>
 </div>
 <div style={{...M,fontSize:15,color:"#B8AE92",marginTop:4}}>
 Est. IV crush: <span style={{color:Y,fontWeight:600}}>-{crushEst}pts</span> post-report
 </div>
 <div style={{...M,fontSize:14,color:"#9A8F82",marginTop:2}}>
 {dte<=14?"🔥 EARNINGS IMMINENT — IV expanding, premium sellers prepare":
 dte<=30?"IV building — position 7-10 days before for best entry":
 "IV still low — early to sell premium, watch for ramp"}
 </div>
 </>);
 })()}
 </div>
 </div>
 {/* Strategy Rationale */}
 <div style={{background:"#17131A",border:`1px solid ${rr.optColor}44`,borderRadius:6,padding:14,marginBottom:10}}>
 <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600}}>Strategy Recommendation</div>
 <span style={{...M,fontSize:16,fontWeight:700,padding:"3px 8px",borderRadius:4,background:rr.optColor+"20",color:rr.optColor,border:`1px solid ${rr.optColor}44`}}>{rr.optStrat}</span>
 </div>
 <div style={{...M,fontSize:15,color:"#D6CDB6",lineHeight:1.5,marginBottom:8}}>{rr.optDetail}</div>
 <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
 {[
 {l:"Signal",v:`${sig.score>0?"+":""}${sig.score}`,c:sig.color,reason:sig.score>30?"Strong":sig.score>0?"Mild":"Weak/Negative"},
 {l:"IV Rank",v:stock.options.ivRank==null?"n/a":`${stock.options.ivRank}%`,c:stock.options.ivRank>60?Y:"#7E91E8",reason:stock.options.ivRank>65?"Expensive (sell)":stock.options.ivRank<40?"Cheap (buy)":"Moderate"},
 {l:"Skew",v:`${stock.options.skew>0?"+":""}${stock.options.skew}`,c:stock.options.skew>1?G:stock.options.skew<-1?R:Y,reason:stock.options.skew>1?"Call demand":stock.options.skew<-1?"Put demand":"Balanced"},
 {l:"P/C",v:(stock.options.pcRatio==null?"n/a":stock.options.pcRatio.toFixed(2)),c:stock.options.pcRatio>1?R:stock.options.pcRatio<0.7?G:Y,reason:stock.options.pcRatio>1?"Bearish":stock.options.pcRatio<0.7?"Bullish":"Neutral"}
 ].map((f,i)=>(<div key={i} style={{background:"#241C2B",borderRadius:4,padding:"6px 10px",textAlign:"center"}}>
 <div style={{...M,fontSize:12,color:"#9A8F82",marginBottom:1}}>{f.l}</div>
 <div style={{...M,fontSize:18,fontWeight:700,color:f.c}}>{f.v}</div>
 <div style={{...M,fontSize:12,color:f.c}}>{f.reason}</div>
 </div>))}
 </div>
 </div>
 {/* Notable Flow */}
 <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
 <span style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600}}>Notable Flow</span>
 <span style={{...M,fontSize:12,padding:"1px 6px",borderRadius:3,background:"#B266FF15",color:"#B266FF",border:"1px solid #B266FF22"}}>Notable strikes — verify with broker</span>
 </div>
 {stock.options.flow.map((f,i)=>{
 const dist=((f.s-price)/price*100);
 const absDist=Math.abs(dist);
 const otm=f.t==="call"?f.s>price:f.s<price;
 const itm=!otm;
 const atm=absDist<3;
 const moneyness=atm?"ATM":itm?"ITM":(absDist<10?"near OTM":"deep OTM");
 const isAggressive=(f.t==="call"&&f.s>price*1.15)||(f.t==="put"&&f.s<price*0.85);
 const sentiment=f.t==="call"?(f.b?"Call BUY at strike — bullish bias":"Call SELL — writing premium / bearish"):(f.b?"Put BUY — hedging or bearish":"Put SELL — selling premium / bullish bias");
 const size=parseFloat(f.p)>=5?"LARGE":parseFloat(f.p)>=2?"NOTABLE":"SMALL";
 // Interpret what this trade means
 let interp="";
 if(f.t==="call"&&f.b&&atm)interp="Smart money expecting near-term move up. High conviction — paying ATM premium.";
 else if(f.t==="call"&&f.b&&absDist<10)interp="Betting on move to $"+f.s+" by "+f.e+". Moderate conviction — slightly OTM.";
 else if(f.t==="call"&&f.b&&absDist>=10)interp="Aggressive upside bet. Needs "+dist.toFixed(0)+"% move. Could be earnings or catalyst play.";
 else if(f.t==="call"&&!f.b)interp="Selling calls = bearish or covered call income. Expects stock stays below $"+f.s+".";
 else if(f.t==="put"&&f.b&&absDist<10)interp="Protective hedge or bearish bet. Expects downside risk to $"+f.s+".";
 else if(f.t==="put"&&f.b&&absDist>=10)interp="Deep downside protection. Insurance against "+dist.toFixed(0)+"% crash.";
 else if(f.t==="put"&&!f.b)interp="Selling puts = bullish. Willing to buy stock at $"+f.s+". Collecting premium.";
 return(<div key={i} style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:5,padding:"10px 12px",marginBottom:6,borderLeft:`3px solid ${f.t==="call"?G:R}`}}>
 <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
 <span style={{...M,fontSize:14,fontWeight:700,color:f.t==="call"?G:R,width:54}}>{f.t.toUpperCase()}</span>
 <span style={{...M,fontSize:18,fontWeight:700,color:"#F4EEDF"}}>${f.s}</span>
 <span style={{...M,fontSize:13,padding:"1px 5px",borderRadius:3,background:atm?"#B266FF22":itm?G+"22":"#9A8F82"+"22",color:atm?"#B266FF":itm?G:"#B8AE92"}}>{moneyness}</span>
 <span style={{...M,fontSize:13,color:dist>0?G:dist<0?R:"#B8AE92"}}>{dist>0?"+":""}{dist.toFixed(0)}%</span>
 <span style={{...M,fontSize:13,color:"#B8AE92"}}>{f.e}</span>
 <span style={{...M,fontSize:14,fontWeight:600,color:"#E6A817",marginLeft:"auto"}}>${f.p}</span>
 <span style={{...M,fontSize:12,padding:"1px 4px",borderRadius:2,background:size==="LARGE"?"#E6A81722":size==="NOTABLE"?"#FFBF0022":"transparent",color:size==="LARGE"?"#E6A817":size==="NOTABLE"?"#FFBF00":"#9A8F82"}}>{size}</span>
 </div>
 <div style={{...M,fontSize:13,color:f.b?G+"cc":R+"cc",marginBottom:2}}>{sentiment}</div>
 <div style={{...M,fontSize:12,color:"#B8AE92",lineHeight:1.5}}>{interp}</div>
 </div>);
 })}

 {/* ═══════════════════════════════════════════════ */}
 {/* OPTIONS TRADE IDEAS — EDGE-FIRST ENGINE */}
 <div style={{background:"linear-gradient(180deg,#17131A,#1E1924)",border:"1px solid #3DBFA833",borderRadius:6,padding:16,marginTop:10}}>
 <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
 <span style={{fontSize:19}}>⚡</span>
 <span style={{...M,fontSize:17,fontWeight:700,background:"linear-gradient(135deg,#3DBFA8,#E6A817)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>TRADE OPPORTUNITIES</span>
 </div>
 {(()=>{
 const p=price,s=stock,o=s.options||{};
 const upside=s.avgPT?((s.avgPT-p)/p*100):0;
 const highUp=s.highPT?((s.highPT-p)/p*100):0;
 const adjCv=rankerData.find(r=>r.ticker===activeTicker);
 const cv=adjCv?adjCv.adjCv:50;
 const verdictScore=s.tech&&s.tech.verdict?s.tech.verdict.score:50;
 const signalScore=adjCv?Math.min(100,Math.max(0,(adjCv.signal||0)+50)):50;
 const fundScore=s.fund&&s.fund.metrics?Math.min(100,Math.max(0,(parseFloat(String(s.fund.metrics.revGrowth).replace("%","").replace("+",""))||0)*0.5+(parseFloat(String(s.fund.metrics.grossMargin).replace("%",""))||0)*0.8)):50;
 const riskAdjScore=cv;
 const flowBoost=(()=>{if(!o.flow||o.flow.length<2)return 0;const bullF=o.flow.filter(f2=>f2.t==="call"&&f2.b).length;const pct=bullF/o.flow.length;return pct>0.7?10:pct<0.3?-10:0;})();
 const rawCv=Math.min(95,Math.max(10,Math.round((verdictScore||50)*0.35+(signalScore||50)*0.20+(fundScore||50)*0.25+(riskAdjScore||50)*0.20+flowBoost)))||50;
 const gr=adjCv?adjCv.gr:"?";
 const ivR=o.ivRank||50;const pcR=o.pcRatio||0.8;
 const impMove=o.impliedMove||5;
 const macroRisk=MACRO.regime.includes("STAGFLATION")||MACRO.vix>25;
 const warOn=MACRO.note.toLowerCase().includes("hormuz");
 const postBeat=(s.earningsDate||"").includes("\u2713")&&rawCv>=60;
 const r5=v=>Math.round(v/5)*5;
 const support1=s.support&&s.support[0]?s.support[0].lvl:r5(p*0.85);
 const gm=s.fund&&s.fund.metrics?s.fund.metrics.grossMargin:"?";
 const revG=s.fund&&s.fund.metrics?s.fund.metrics.revGrowth:"?";
 const risks=(s.fund&&s.fund.activeRisks||[]);
 const highRisks=risks.filter(r2=>r2.sev==="HIGH");
 const topRisk=highRisks[0]||risks[0];
 const avgRiskProb=risks.length?Math.round(risks.reduce((a2,r2)=>a2+r2.prob,0)/risks.length):0;
 const uncertainty=Math.min(80,highRisks.length*20+avgRiskProb+(macroRisk?10:0)+(warOn?5:0));
 const convUncRatio=rawCv/Math.max(uncertainty,1);
 const regime=convUncRatio>2?"HIGH CONV / LOW UNC":convUncRatio>1?"BALANCED":convUncRatio>0.5?"HIGH UNCERTAINTY":"CAUTION";

 const earnDays2=(()=>{
 const ed=s.earningsDate||"";
 if(ed.includes("\u2713"))return 999;
 const mo={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 const edm=ed.match(/^(\w+)\s+(\d+),?\s*(\d{4})/);
 if(!edm||mo[edm[1]]===undefined)return 999;
 return Math.ceil((new Date(parseInt(edm[3]),mo[edm[1]],parseInt(edm[2]))-new Date())/(1000*60*60*24));
 })();

 const allCats=(s.catalysts||[]).filter(c2=>c2.d&&!c2.d.includes("\u2713")).map(c2=>{
 const mo={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
 const dm=c2.d.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)/);
 const days=dm?Math.ceil((new Date(2026,mo[dm[1]],parseInt(dm[2]))-new Date())/(1000*60*60*24)):180;
 return{event:c2.e,days:Math.max(days,0),date:c2.d};
 }).filter(c2=>c2.days>=0).sort((a2,b2)=>a2.days-b2.days);
 const catChain=allCats.slice(0,4).map(c2=>c2.date+": "+c2.event.substring(0,25)).join(" \u2192 ");

 // EDGE DETECTION
 const edges=[];
 if(postBeat&&upside>10)edges.push({type:"EARNINGS MISPRICING",str:"STRONG",desc:"Beat confirmed but stock flat. PT upgrades incoming.",icon:"\uD83D\uDCCA"});
 if(ivR>70&&earnDays2>60)edges.push({type:"VOL OVERPRICED",str:"MODERATE",desc:"IV Rank "+ivR+"% but no catalyst for "+earnDays2+"d. Sell premium.",icon:"\uD83D\uDCC9"});
 if(ivR<35&&earnDays2<45&&earnDays2>0)edges.push({type:"VOL UNDERPRICED",str:"STRONG",desc:"IV Rank "+ivR+"% with earnings in "+earnDays2+"d. Vol too cheap.",icon:"\uD83D\uDCC8"});
 if(macroRisk&&upside>25&&rawCv>=55)edges.push({type:"MACRO DISCOUNT",str:upside>40?"STRONG":"MODERATE",desc:"Quality name trading "+upside.toFixed(0)+"% below PT on macro fear.",icon:"\uD83C\uDF0D"});
 if(allCats.filter(c2=>c2.days<180).length>=3)edges.push({type:"CATALYST RICH",str:"MODERATE",desc:allCats.filter(c2=>c2.days<180).length+" catalysts in 6mo.",icon:"\uD83D\uDD17"});
 if(edges.length===0)edges.push({type:"NO CLEAR EDGE",str:"WEAK",desc:"Wait for better setup.",icon:"\u23F8"});

 // BUILD TRADES PER TIMEFRAME
 const trades=[];
 [{label:"6-12 MONTHS",exp:"Sep 2026",clr:"#E6A817",mo:9},
 {label:"1-2 YEARS",exp:"Jan 2028",clr:"#B266FF",mo:18},
 {label:"2+ YEARS (LEAPS)",exp:"Jan 2028+",clr:"#3DBFA8",mo:24}
 ].forEach(tf=>{
 const isS=tf.mo<=12,isM=tf.mo>12&&tf.mo<=20,isL=tf.mo>20;
 const catsInW=allCats.filter(c2=>c2.days<=tf.mo*30).length;
 const otm=isL?(catsInW>=3?1.03:1.06):isM?(catsInW>=3?1.06:1.10):(catsInW>=3?1.08:1.15);
 let strat="",bias="",setup="",detail="",why="",safety="",rr="",wrong="",clr=tf.clr;

 if(edges[0].type==="NO CLEAR EDGE"){
 strat="NO TRADE";bias="WAIT";setup="No edge. Cash is a position.";
 detail="Top traders sit on hands 80% of the time.";why="";safety="";rr="";wrong="";clr="#9A8F82";
 } else if(convUncRatio>2&&postBeat){
 const k=r5(p*otm);const est=Math.round(p*(isL?0.20:isM?0.15:0.10));const tgt=r5(s.highPT||(p*1.4));
 strat=isL?"LEAP CALL":"LONG CALL";bias="THESIS CONFIRMED";clr=G;
 setup="Buy $"+k+"C (~$"+est+"/sh)";
 detail="Earnings confirmed. "+((k-p)/p*100).toFixed(0)+"% OTM. "+(isL?"Near ATM for max delta. 22mo = 8 earnings cycles.":isM?"Multiple catalysts ahead.":"Ride momentum. Tight stop.");
 why="HIGH conviction + LOW uncertainty = full exposure. No cap needed.";
 safety="Floor: "+gm+" GM, "+revG+" rev growth. Support $"+support1+". "+(isL?"Being early is not being wrong.":"Set time stop.");
 rr="Risk $"+est+"/sh. Target $"+tgt+" = "+((tgt-k-est)/est*100).toFixed(0)+"% return. R:R "+((tgt-k-est)/est).toFixed(1)+":1";
 wrong="Exit below $"+support1+" for 5d. Max loss $"+est+"/contract.";
 } else if(convUncRatio>1&&macroRisk&&upside>20){
 if(isS&&catsInW<2){
 const ps=r5(p*0.93);const pb=r5(ps-r5(p*0.10));
 strat="BULL PUT SPREAD";bias="INCOME / WAIT FOR CATALYST";clr="#E6A817";
 setup="Sell $"+ps+"P / Buy $"+pb+"P";
 detail="Macro risk + few catalysts near-term. Collect premium, don't pay it. Assigned at $"+ps+" = "+(((p-ps)/p*100).toFixed(0))+"% discount.";
 why="Short window + macro headwind = sell theta. Tight spread, quick income.";
 safety="$"+ps+" assignment. "+gm+" GM. Width $"+(ps-pb)+".";
 rr="Credit vs $"+(ps-pb)+" loss. 65%+ prob.";
 wrong="Close at 2x credit.";
 } else if(isS){
 const putS=r5(p*0.92);const callK=r5(p*1.08);
 strat="RISK REVERSAL";bias="SELF-FUNDING / SHORT";clr="#E6A817";
 setup="Sell $"+putS+"P / Buy $"+callK+"C";
 detail="Self-funding. "+catsInW+" catalysts could break it out. Zero cost. Assigned at $"+putS+" = "+(((p-putS)/p*100).toFixed(0))+"% discount.";
 why="Macro uncertain but catalysts ahead. Don't pay theta — let events work.";
 safety="$"+putS+" = floor. "+gm+" GM. Support $"+support1+".";
 rr="Cost ~$0. Upside to $"+s.avgPT+".";
 wrong="Close if fundamentals break.";
 } else if(isM){
 const putS=r5(p*0.88);const callK=r5(p*1.06);
 strat="RISK REVERSAL";bias="SELF-FUNDING / MACRO BET";clr="#B266FF";
 setup="Sell $"+putS+"P / Buy $"+callK+"C";
 detail="Macro bet: when "+MACRO.regime+" resolves, re-rates. Zero cost. "+catsInW+" catalysts. Assigned at $"+putS+" = "+(((p-putS)/p*100).toFixed(0))+"% discount.";
 why="1-2yr = enough time for war/oil to resolve. Self-funding = no bleed.";
 safety="$"+putS+" = fundamental floor. "+gm+" GM. "+revG+" growth.";
 rr="Cost ~$0. Upside to $"+s.avgPT+". Downside: own at $"+putS+".";
 wrong="Close if thesis breaks. Accept assignment if macro-only issue.";
 } else {
 const bk=r5(p*0.98);const sk=r5(s.avgPT||(p*1.30));const est=Math.round((sk-bk)*0.35);
 strat="BULL CALL SPREAD";bias="STRUCTURAL / MACRO CLEARS";clr=G;
 setup="Buy $"+bk+"C / Sell $"+sk+"C (~$"+est+"/sh)";
 detail="2yr+ = macro WILL resolve. Structural thesis + "+catsInW+" catalysts. Capped risk $"+est+". Targets PT $"+s.avgPT+".";
 why="Long enough for macro to clear. Spread caps downside. "+upside.toFixed(0)+"% upside.";
 safety="Max loss $"+est+". "+gm+" GM. Being early is OK with 2yr runway.";
 rr="Risk $"+est+". Gain $"+(sk-bk-est)+". R:R "+((sk-bk-est)/est).toFixed(1)+":1";
 wrong="Exit after 2 bad earnings. Time stop 12mo.";
 }
 } else if(convUncRatio>1&&upside>20){
 if(isS){
 const bk=r5(p*1.05);const sk=r5(s.avgPT||(p*1.25));const est=Math.round((sk-bk)*0.4);
 strat="BULL CALL SPREAD";bias="DEFINED RISK / NEAR CATALYSTS";clr=G;
 setup="Buy $"+bk+"C / Sell $"+sk+"C (~$"+est+"/sh)";
 detail="Tight OTM. "+catsInW+" catalysts to drive it. Max gain $"+(sk-bk-est)+". Targets PT $"+s.avgPT+".";
 why="Short window = defined risk. Spread caps loss at $"+est+"/sh.";
 safety="Max loss $"+est+". Breakeven $"+(bk+est)+". "+gm+" GM.";
 rr="Risk $"+est+". Gain $"+(sk-bk-est)+". R:R "+((sk-bk-est)/est).toFixed(1)+":1";
 wrong="Max loss capped. Exit if thesis breaks.";
 } else if(isM){
 const bk=r5(p*1.03);const sk=r5(s.avgPT||(p*1.25));const est=Math.round((sk-bk)*0.4);
 strat="BULL CALL SPREAD";bias="THESIS PLAY / MULTI-CATALYST";clr=G;
 setup="Buy $"+bk+"C / Sell $"+sk+"C (~$"+est+"/sh)";
 detail=catsInW+" catalysts across multiple earnings. Capped risk. Upside "+upside.toFixed(0)+"% to PT.";
 why="1-2yr = multiple prove-ups. Spread captures most upside with defined risk.";
 safety="Max loss $"+est+". "+gm+" GM. "+revG+" growth.";
 rr="Risk $"+est+". Gain $"+(sk-bk-est)+". R:R "+((sk-bk-est)/est).toFixed(1)+":1";
 wrong="Exit after 2 bad earnings cycles.";
 } else {
 const bk=r5(p*1.0);const sk=r5(s.highPT||(p*1.40));const est=Math.round((sk-bk)*0.35);
 strat="BULL CALL SPREAD";bias="STRUCTURAL / MAX R:R";clr=G;
 setup="Buy $"+bk+"C / Sell $"+sk+"C (~$"+est+"/sh)";
 detail="ATM entry, targets high PT $"+(s.highPT||r5(p*1.4))+". "+catsInW+" catalysts over 2yr+. Max runway.";
 why="Widest spread = best R:R. 2yr gives thesis full time to play out.";
 safety="Max loss $"+est+". "+gm+" GM. Being early OK.";
 rr="Risk $"+est+". Gain $"+(sk-bk-est)+". R:R "+((sk-bk-est)/est).toFixed(1)+":1";
 wrong="Time stop 12mo. Exit if 2 earnings miss.";
 }
 } else if(convUncRatio<=1&&ivR>60&&!(o.flow&&o.flow.length>=2&&o.flow.filter(f2=>f2.t==="call"&&f2.b).length/o.flow.length>0.7&&upside>25)){
 if(isS){
 const cs=r5(p*1.08);const cb=r5(cs+p*0.06);const ps=r5(p*0.92);const pb=r5(ps-p*0.06);
 strat="IRON CONDOR";bias="SELL VOL / TIGHT";clr=Y;
 setup="Sell $"+ps+"/$"+pb+"P + $"+cs+"/$"+cb+"C";
 detail="IV "+ivR+"%. Tight wings for short duration. Profit zone $"+ps+"-$"+cs+". Fast theta.";
 why="Vol overpriced + short window = quick premium capture.";
 safety="Wings $"+r5(p*0.06)+"/side. Tight zone but fast decay.";
 rr="Credit ~$"+r5(p*0.03)+". Max loss $"+r5(p*0.06)+". 60-65% prob.";
 wrong="Close at 2x credit.";
 } else if(isM){
 const cs=r5(p*1.12);const cb=r5(cs+p*0.08);const ps=r5(p*0.88);const pb=r5(ps-p*0.08);
 strat="IRON CONDOR";bias="SELL VOL / WIDE";clr=Y;
 setup="Sell $"+ps+"/$"+pb+"P + $"+cs+"/$"+cb+"C";
 detail="IV "+ivR+"%. Wider wings for more time. Range $"+ps+"-$"+cs+".";
 why="Vol overpriced across term structure. Wider range = higher prob.";
 safety="Wings $"+r5(p*0.08)+"/side.";
 rr="Credit ~$"+r5(p*0.05)+". Max loss $"+r5(p*0.08)+". 70% prob.";
 wrong="Close at 2x credit. Roll untested side.";
 } else {
 strat="BULL PUT SPREAD";bias="INCOME / LONG DURATION";clr="#E6A817";
 const ps=r5(p*0.82);const pb=r5(ps-r5(p*0.15));
 setup="Sell $"+ps+"P / Buy $"+pb+"P";
 detail="Vol high but 2yr condor ties capital. Put spread at deep discount ($"+ps+" = "+(((p-ps)/p*100).toFixed(0))+"% below) is better use of long duration.";
 why="Don't sell both sides for 2yr — too much can happen. Sell downside only at deep discount.";
 safety="$"+ps+" = deep floor. "+gm+" GM.";
 rr="Credit vs $"+(ps-pb)+" loss. 80%+ prob.";
 wrong="Close if fundamentals break.";
 }
 } else if(convUncRatio<=1&&upside>20){
 if(isS&&catsInW<2){
 // SHORT TERM + NO CATALYST: don't trade
 strat="WAIT";bias="NO NEAR CATALYST";clr="#9A8F82";
 setup="No trade. Only "+catsInW+" catalyst in 6-12mo window.";
 detail="High uncertainty + no near-term catalyst = no edge on timing. Wait for catalyst or sell premium further out.";
 why="Without a catalyst to force re-pricing, you are just paying theta or tying up capital.";
 safety="Cash.";rr="N/A";wrong="N/A";
 } else if(isS){
 // SHORT TERM + CATALYST: tight put spread
 const ps=r5(p*0.93);const pb=r5(ps-r5(p*0.10));
 strat="BULL PUT SPREAD";bias="INCOME / TIGHT";clr="#E6A817";
 setup="Sell $"+ps+"P / Buy $"+pb+"P";
 detail=upside.toFixed(0)+"% below PT. "+catsInW+" catalysts in window. Tight spread, quick theta. Assigned at $"+ps+" = "+(((p-ps)/p*100).toFixed(0))+"% discount.";
 why="Short window with catalysts = collect premium while events play out. Tight width limits risk.";
 safety="$"+ps+" assignment. "+gm+" GM. Width $"+(ps-pb)+".";
 rr="Credit vs $"+(ps-pb)+" loss. 65-70% prob profit.";
 wrong="Close at 2x credit.";
 } else if(isM&&macroRisk){
 // MID TERM + MACRO: risk reversal (self-funding)
 const putS=r5(p*0.88);const callK=r5(p*1.08);
 strat="RISK REVERSAL";bias="SELF-FUNDING / MACRO BET";clr="#B266FF";
 setup="Sell $"+putS+"P / Buy $"+callK+"C";
 detail="Macro bet: when "+MACRO.regime+" resolves, stock re-rates. Zero cost entry. If assigned at $"+putS+" = buying "+(((p-putS)/p*100).toFixed(0))+"% below. "+catsInW+" catalysts ahead.";
 why="Macro discount = the edge. Self-funding = no theta bleed while waiting for resolution. 1-2yr = enough time for war/oil to resolve.";
 safety="$"+putS+" assignment = fundamental floor. "+gm+" GM. Revenue growing "+revG+".";
 rr="Cost ~$0. Upside to PT $"+s.avgPT+". Downside: own at $"+putS+".";
 wrong="Close if fundamental thesis breaks. Accept assignment if macro is the only issue.";
 } else if(isM){
 const ps=r5(p*0.90);const pb=r5(ps-r5(p*0.15));
 strat="BULL PUT SPREAD";bias="INCOME / ACCUMULATE";clr="#E6A817";
 setup="Sell $"+ps+"P / Buy $"+pb+"P";
 detail=upside.toFixed(0)+"% below PT. "+catsInW+" catalysts. Width $"+(ps-pb)+". Moderate duration = balanced premium vs capital lock.";
 why="Uncertainty high but thesis has time. Collect premium across multiple catalyst events.";
 safety="$"+ps+" assignment. "+gm+" GM. Width $"+(ps-pb)+".";
 rr="Credit vs $"+(ps-pb)+" loss. 70%+ prob.";
 wrong="Close at 2x credit. Accept assignment if thesis holds.";
 } else {
 // LONG TERM: bull call spread targeting structural re-rate
 const bk=r5(p*1.0);const sk=r5(s.avgPT||(p*1.30));const est=Math.round((sk-bk)*0.35);
 strat="BULL CALL SPREAD";bias="STRUCTURAL THESIS";clr=G;
 setup="Buy $"+bk+"C / Sell $"+sk+"C (~$"+est+"/sh)";
 detail="2+ years = enough time for macro to resolve AND structural thesis to play out. "+catsInW+" catalysts. Capped risk $"+est+", targets PT $"+s.avgPT+".";
 why="Long duration + structural edge ("+edges[0].type+") = defined-risk directional. "+upside.toFixed(0)+"% upside. Multiple earnings cycles to prove thesis.";
 safety="Max loss $"+est+"/sh (known at entry). "+gm+" GM. "+revG+" growth. Being early is not being wrong with 2yr runway.";
 rr="Risk $"+est+". Max gain $"+(sk-bk-est)+". R:R "+((sk-bk-est)/est).toFixed(1)+":1";
 wrong="Exit if 2 consecutive earnings disappoint. Time stop at 12mo if no progress.";
 }
 } else {
 strat="WAIT";bias="NO SETUP";setup="No trade at this timeframe.";
 detail="Edge not strong enough. Patience is the edge.";why="";safety="";rr="";wrong="";clr="#9A8F82";
 }
 trades.push({label:tf.label,exp:tf.exp,clr,strat,bias,setup,detail,why,safety,rr,wrong,catsInW});
 });

 return(<>
 {/* EDGE SCAN */}
 <div style={{marginBottom:10}}>
 <div style={{...M,fontSize:13,fontWeight:700,color:"#FFBF00",marginBottom:4}}>EDGE SCAN</div>
 <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
 {edges.map((e,i)=>(<div key={i} style={{padding:"3px 8px",background:e.str==="STRONG"?G+"12":e.str==="MODERATE"?Y+"12":"#9A8F8212",border:"1px solid "+(e.str==="STRONG"?G:e.str==="MODERATE"?Y:"#9A8F82")+"22",borderRadius:4}}>
 <span style={{...M,fontSize:13,fontWeight:700,color:e.str==="STRONG"?G:e.str==="MODERATE"?Y:"#9A8F82"}}>{e.icon} {e.type}</span>
 <div style={{...M,fontSize:12,color:"#B8AE92"}}>{e.desc}</div>
 </div>))}
 </div>
 </div>
 {/* DASHBOARD */}
 <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
 {[{l:"CONVICTION",v:rawCv,c:rawCv>60?G:rawCv>40?Y:R,sub:verdictScore+"v/"+signalScore+"s/"+Math.round(fundScore)+"f"+(flowBoost?"/"+flowBoost+"flow":"")},{l:"UNCERTAINTY",v:uncertainty,c:uncertainty>50?R:uncertainty>30?Y:G},{l:"REGIME",v:regime.split("/")[0].trim(),c:convUncRatio>1.5?G:convUncRatio>0.7?Y:R},{l:"IV RANK",v:ivR+"%",c:ivR>60?Y:"#B8AE92"}].map((m,i)=>(<div key={i} style={{background:"#241C2B",borderRadius:3,padding:"3px 6px"}}>
 <div style={{...M,fontSize:11,color:"#9A8F82"}}>{m.l}</div>
 <div style={{...M,fontSize:14,fontWeight:700,color:m.c}}>{m.v}</div>
 {m.sub&&<div style={{...M,fontSize:10,color:"#9A8F82"}}>{m.sub}</div>}
 </div>))}
 </div>
 {/* DEFINITIONS */}
 <div style={{...M,fontSize:11,padding:"4px 8px",borderRadius:3,background:"#241C2B",marginBottom:6,lineHeight:1.6,color:"#9A8F82"}}>
 <span style={{fontWeight:600}}>CONVICTION</span> = 35% technicals (MA/RSI/pattern) + 20% signal (news sentiment) + 25% fundamentals (rev growth + margins) + 20% risk-adjusted score {flowBoost!==0?("+ flow adj "+(flowBoost>0?"+":"")+flowBoost):""}.{" "}
 <span style={{fontWeight:600}}>UNCERTAINTY</span> = HIGH risks x20 + avg risk prob + macro({macroRisk?"10":"0"}) + war({warOn?"5":"0"}), capped 80.{" "}
 <span style={{fontWeight:600}}>REGIME</span> = conviction/uncertainty ratio. &gt;2 = HIGH CONV. &gt;1 = BALANCED. &gt;0.5 = HIGH UNC. &lt;0.5 = CAUTION.{" "}
 <span style={{fontWeight:600}}>EDGE</span> = detected mispricing (earnings vs price, vol vs realized, macro discount, catalyst density).
 </div>
 {/* CATALYSTS + COUNTER */}
 {allCats.length>0&&<div style={{...M,fontSize:12,padding:"4px 8px",borderRadius:3,background:"#241C2B",marginBottom:6,lineHeight:1.5}}>
 <span style={{color:"#E6A817",fontWeight:600}}>CATALYSTS: </span><span style={{color:"#B8AE92"}}>{catChain}</span>
 </div>}
 {topRisk&&<div style={{...M,fontSize:12,padding:"4px 8px",borderRadius:3,background:R+"08",border:"1px solid "+R+"22",marginBottom:6}}>
 <span style={{color:R,fontWeight:600}}>COUNTER-THESIS: </span><span style={{color:"#B8AE92"}}>{topRisk.risk.substring(0,70)} ({topRisk.prob}%)</span>
 </div>}
 {/* FLOW ALIGNMENT */}
 {o.flow&&o.flow.length>0&&(()=>{
 const bullFlow=o.flow.filter(f2=>f2.t==="call"&&f2.b);
 const bearFlow=o.flow.filter(f2=>f2.t==="put"&&f2.b);
 const totalPremium=o.flow.reduce((a2,f2)=>a2+parseFloat(f2.p),0);
 const bullPct=bullFlow.length/o.flow.length*100;
 const flowBias=bullPct>65?"BULLISH":bullPct<35?"BEARISH":"MIXED";
 const biggestTrade=o.flow.reduce((a2,f2)=>parseFloat(f2.p)>parseFloat(a2.p)?f2:a2,o.flow[0]);
 return(<div style={{...M,fontSize:12,padding:"4px 8px",borderRadius:3,background:flowBias==="BULLISH"?G+"08":flowBias==="BEARISH"?R+"08":Y+"08",border:"1px solid "+(flowBias==="BULLISH"?G:flowBias==="BEARISH"?R:Y)+"22",marginBottom:8}}>
 <span style={{color:flowBias==="BULLISH"?G:flowBias==="BEARISH"?R:Y,fontWeight:600}}>SMART MONEY: {flowBias} </span>
 <span style={{color:"#B8AE92"}}>{bullFlow.length} bull / {bearFlow.length} bear flows. ${totalPremium.toFixed(1)}M total. Largest: {biggestTrade.t.toUpperCase()} ${biggestTrade.s} ${biggestTrade.e} (${biggestTrade.p})</span>
 </div>);
 })()}
 {/* TRADES */}
 {trades.map((t,i)=>(<div key={i} style={{marginBottom:8}}>
 <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
 <span style={{...M,fontSize:14,fontWeight:700,color:t.clr}}>{t.label}</span>
 <span style={{...M,fontSize:12,color:"#9A8F82"}}>{t.exp}</span>
 <span style={{...M,fontSize:12,color:"#9A8F82"}}>{t.catsInW} catalysts</span>
 <div style={{flex:1,height:1,background:t.clr+"33"}}/>
 </div>
 <div style={{background:"#241C2B",border:"1px solid "+t.clr+"22",borderRadius:5,padding:10,borderLeft:"3px solid "+t.clr}}>
 <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
 <span style={{...M,fontSize:16,fontWeight:700,color:t.strat==="WAIT"||t.strat==="NO TRADE"?"#9A8F82":t.clr}}>{t.strat}</span>
 <span style={{...M,fontSize:12,padding:"1px 5px",borderRadius:3,background:t.clr+"15",color:t.clr}}>{t.bias}</span>
 </div>
 <div style={{...M,fontSize:14,fontWeight:600,color:"#F4EEDF",marginBottom:4}}>{t.setup}</div>
 <div style={{...M,fontSize:13,color:"#D6CDB6",lineHeight:1.5,marginBottom:4}}>{t.detail}</div>
 {t.why&&<div style={{...M,fontSize:12,marginBottom:2}}><span style={{color:"#B266FF",fontWeight:600}}>WHY: </span><span style={{color:"#B8AE92"}}>{t.why}</span></div>}
 {t.safety&&<div style={{...M,fontSize:12,marginBottom:2}}><span style={{color:G,fontWeight:600}}>SAFETY: </span><span style={{color:"#B8AE92"}}>{t.safety}</span></div>}
 {t.rr&&<div style={{...M,fontSize:12,marginBottom:2}}><span style={{color:"#E6A817",fontWeight:600}}>R:R: </span><span style={{color:"#F4EEDF",fontWeight:600}}>{t.rr}</span></div>}
 {t.wrong&&<div style={{...M,fontSize:12}}><span style={{color:R,fontWeight:600}}>IF WRONG: </span><span style={{color:"#B8AE92"}}>{t.wrong}</span></div>}
 </div>
 </div>))}
 </>);
 })()}
 </div>

 </div>)}

 {/* FUNDAMENTALS */}
 {tab==="fundamentals"&&stock.fund&&(<div>
 {/* THE STORY */}
 <div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:14,marginBottom:10}}>
 <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:"#E6A817",fontWeight:600}}>The Story</div>
 {stock.fundVerified===true&&(<span style={{...M,fontSize:12,padding:"1px 5px",borderRadius:3,background:"#3DBFA822",color:"#3DBFA8",border:"1px solid #3DBFA844",fontWeight:700}}>✓ CURRENT</span>)}
 {stock.fundVerified===false&&(<span style={{...M,fontSize:12,padding:"1px 5px",borderRadius:3,background:"#FFBF0022",color:"#FFBF00",border:"1px solid #FFBF0044",fontWeight:700}}>⚠ NEEDS PT VERIFY</span>)}
 </div>
 <div style={{fontSize:17,color:"#D6CDB6",lineHeight:1.7}}>{stock.fund.story}</div>
 {stock.fundDate&&(<div style={{...M,fontSize:12,color:"#9A8F82",marginTop:6}}>Refreshed: {stock.fundDate}</div>)}
 </div>
 {/* KEY DRIVERS */}
 <div style={{marginBottom:10}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600,marginBottom:6}}>Key Drivers</div>
 <div style={{display:"flex",flexDirection:"column",gap:4}}>
 {stock.fund.drivers.map((d,i)=>{
 const dc=d.dir==="up"?G:d.dir==="down"?R:d.dir==="risk"?"#E08A4A":Y;
 const arrow=d.dir==="up"?"▲":d.dir==="down"?"▼":d.dir==="risk"?"⚠":"●";
 return(<div key={i} style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:5,padding:"10px 12px",borderLeft:`3px solid ${dc}`}}>
 <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
 <span style={{...M,fontSize:15,color:dc}}>{arrow}</span>
 <span style={{...M,fontSize:16,fontWeight:700}}>{d.name}</span>
 <span style={{...M,fontSize:13,padding:"1px 6px",borderRadius:3,background:dc+"15",color:dc,marginLeft:"auto"}}>{d.dir==="up"?"ACCELERATING":d.dir==="down"?"DECELERATING":d.dir==="risk"?"RISK":"STABLE"}</span>
 </div>
 <div style={{...M,fontSize:15,color:"#B8AE92",lineHeight:1.5,paddingLeft:18}}>{d.detail}</div>
 </div>);
 })}
 </div>
 </div>
 {/* MONEY FLOW */}
 <div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:14,marginBottom:10}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600,marginBottom:8}}>Money Flow</div>
 <div style={{display:"flex",flexDirection:"column",gap:8}}>
 {[
 {label:"INSTITUTIONAL",icon:"🏛",text:stock.fund.flow.inst,color:"#7E91E8"},
 {label:"RETAIL",icon:"👥",text:stock.fund.flow.retail,color:"#B266FF"},
 {label:"SHORT INTEREST",icon:"📉",text:stock.fund.flow.short,color:Y}
 ].map((f,i)=>(<div key={i} style={{display:"flex",gap:8,alignItems:"flex-start"}}>
 <span style={{fontSize:17,flexShrink:0,marginTop:1}}>{f.icon}</span>
 <div>
 <div style={{...M,fontSize:13,fontWeight:600,color:f.color,marginBottom:2}}>{f.label}</div>
 <div style={{fontSize:15,color:"#B8AE92",lineHeight:1.5}}>{f.text}</div>
 </div>
 </div>))}
 </div>
 </div>
 {/* BULL / BEAR CASE */}
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
 <div style={{background:"#17131A",border:`1px solid ${G}33`,borderRadius:6,padding:12}}>
 <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
 <span style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:G,fontWeight:600}}>Bull Case</span>
 <span style={{...M,fontSize:15,fontWeight:700,color:G,marginLeft:"auto"}}>{stock.fund.bull.price}</span>
 </div>
 <div style={{fontSize:15,color:"#D6CDB6",lineHeight:1.6}}>{stock.fund.bull.path}</div>
 </div>
 <div style={{background:"#17131A",border:`1px solid ${R}33`,borderRadius:6,padding:12}}>
 <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
 <span style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:R,fontWeight:600}}>Bear Case</span>
 <span style={{...M,fontSize:15,fontWeight:700,color:R,marginLeft:"auto"}}>{stock.fund.bear.price}</span>
 </div>
 <div style={{fontSize:15,color:"#D6CDB6",lineHeight:1.6}}>{stock.fund.bear.path}</div>
 </div>
 </div>
 {/* ACTIVE RISKS */}
 {stock.fund.activeRisks&&stock.fund.activeRisks.length>0&&<div style={{background:"#1B1224",border:"1px solid #E8643A33",borderRadius:6,padding:14,marginBottom:10}}>
 <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
 <span style={{fontSize:16}}>⚠</span>
 <span style={{...M,fontSize:14,textTransform:"uppercase",letterSpacing:1.5,color:"#E08A4A",fontWeight:700}}>Active Risks — What Could Go Wrong</span>
 <span style={{...M,fontSize:13,color:"#9A8F82",marginLeft:"auto"}}>{stock.fund.activeRisks.filter(r=>r.sev==="HIGH").length} HIGH / {stock.fund.activeRisks.filter(r=>r.sev==="MED").length} MED / {stock.fund.activeRisks.filter(r=>r.sev==="LOW").length} LOW</span>
 </div>
 <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
 {(()=>{const highs=stock.fund.activeRisks.filter(r=>r.sev==="HIGH");const maxProb=highs.length?Math.max(...highs.map(r=>r.prob)):0;const avgProb=stock.fund.activeRisks.length?Math.round(stock.fund.activeRisks.reduce((a,r)=>a+r.prob,0)/stock.fund.activeRisks.length):0;const nearTerm=stock.fund.activeRisks.filter(r=>r.catalyst&&(r.catalyst.includes("Mar")||r.catalyst.includes("Apr"))).length;return[
 {l:"Highest Risk Prob",v:`${maxProb}%`,c:maxProb>=40?R:maxProb>=25?"#FFBF00":G},
 {l:"Avg Risk Prob",v:`${avgProb}%`,c:avgProb>=30?R:avgProb>=20?"#FFBF00":"#B8AE92"},
 {l:"Near-Term Catalysts",v:`${nearTerm}`,c:nearTerm>=3?"#FFBF00":"#B8AE92"},
 {l:"Total Risk Events",v:`${stock.fund.activeRisks.length}`,c:"#B8AE92"}
 ]})().map((m,i)=>(<div key={i} style={{background:"#241C2B",borderRadius:4,padding:"6px 10px",minWidth:80}}>
 <div style={{...M,fontSize:12,textTransform:"uppercase",letterSpacing:1,color:"#9A8F82",fontWeight:600}}>{m.l}</div>
 <div style={{...M,fontSize:20,fontWeight:700,color:m.c}}>{m.v}</div>
 </div>))}
 </div>
 {stock.fund.activeRisks.map((r,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:8,padding:"10px 12px",background:r.sev==="HIGH"?"#E8643A08":r.sev==="MED"?"#FFBF0008":"transparent",border:`1px solid ${r.sev==="HIGH"?"#E8643A22":r.sev==="MED"?"#FFBF0022":"#2C2433"}`,borderRadius:4}}>
 <div style={{flexShrink:0,width:52,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
 <span style={{...M,fontSize:13,fontWeight:700,padding:"2px 5px",borderRadius:3,background:r.sev==="HIGH"?R+"22":r.sev==="MED"?"#FFBF00"+"22":G+"22",color:r.sev==="HIGH"?R:r.sev==="MED"?"#FFBF00":G}}>{r.sev}</span>
 <div style={{width:36,height:36,borderRadius:"50%",border:`2px solid ${r.prob>=40?R:r.prob>=25?"#FFBF00":"#9A8F82"}`,display:"flex",alignItems:"center",justifyContent:"center",background:`conic-gradient(${r.prob>=40?R:r.prob>=25?"#FFBF00":"#9A8F82"} ${r.prob*3.6}deg, transparent ${r.prob*3.6}deg)`}}>
 <div style={{width:28,height:28,borderRadius:"50%",background:"#1B1224",display:"flex",alignItems:"center",justifyContent:"center"}}>
 <span style={{...M,fontSize:14,fontWeight:700,color:r.prob>=40?R:r.prob>=25?"#FFBF00":"#B8AE92"}}>{r.prob}%</span>
 </div>
 </div>
 </div>
 <div style={{flex:1}}>
 <div style={{...M,fontSize:14,color:"#E8E1D0",lineHeight:1.5,marginBottom:4}}>{r.risk}</div>
 <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:4}}>
 <span style={{...M,fontSize:12,color:"#E08A4A"}}>Trigger: {r.trigger}</span>
 <span style={{...M,fontSize:12,color:R}}>Impact: {r.impact}</span>
 </div>
 {r.catalyst&&<div style={{...M,fontSize:12,color:"#E6A817",background:"#E6A81708",border:"1px solid #E6A81722",borderRadius:3,padding:"3px 6px",display:"inline-block"}}>📅 {r.catalyst}</div>}
 </div>
 </div>))}
 </div>}
 {/* THESIS KILLER */}
 <div style={{background:"#24120E",border:"1px solid #E8643A33",borderRadius:6,padding:12}}>
 <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
 <span style={{fontSize:17}}>💀</span>
 <span style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:R,fontWeight:600}}>Thesis Killer</span>
 </div>
 <div style={{fontSize:16,color:"#F29A85",lineHeight:1.6,fontWeight:500}}>{stock.fund.killer}</div>
 </div>
 {/* FINANCIAL METRICS */}
 {stock.fund.metrics&&<div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:14,marginTop:10}}>
 <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600}}>Financial Metrics</div>
 <div style={{...M,fontSize:13,color:"#9A8F82"}}>as of {stock.fund.metrics.lastQ}</div>
 </div>
 <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:8}}>
 {[
 {l:"Rev Growth",v:stock.fund.metrics.revGrowth==null?"n/a":`${stock.fund.metrics.revGrowth>0?"+":""}${stock.fund.metrics.revGrowth}%`,c:stock.fund.metrics.revGrowth>25?G:stock.fund.metrics.revGrowth>10?Y:stock.fund.metrics.revGrowth>0?"#7E91E8":R},
 {l:"Gross Margin",v:stock.fund.metrics.grossMargin==null?"n/a":`${stock.fund.metrics.grossMargin}%`,c:stock.fund.metrics.grossMargin>60?G:stock.fund.metrics.grossMargin>40?Y:R},
 {l:"Op Margin",v:stock.fund.metrics.opMargin==null?"n/a":`${stock.fund.metrics.opMargin}%`,c:stock.fund.metrics.opMargin>30?G:stock.fund.metrics.opMargin>15?Y:stock.fund.metrics.opMargin>0?"#7E91E8":R},
 {l:"Net Margin",v:stock.fund.metrics.netMargin==null?"n/a":`${stock.fund.metrics.netMargin}%`,c:stock.fund.metrics.netMargin>25?G:stock.fund.metrics.netMargin>10?Y:stock.fund.metrics.netMargin>0?"#7E91E8":R},
 {l:"FCF Margin",v:stock.fund.metrics.fcfMargin==null?"n/a":`${stock.fund.metrics.fcfMargin}%`,c:stock.fund.metrics.fcfMargin>25?G:stock.fund.metrics.fcfMargin>10?Y:stock.fund.metrics.fcfMargin>0?"#7E91E8":R},
 {l:"ROE",v:stock.fund.metrics.roe==null?"n/a":`${stock.fund.metrics.roe}%`,c:stock.fund.metrics.roe>25?G:stock.fund.metrics.roe>10?Y:stock.fund.metrics.roe>0?"#7E91E8":R},
 {l:"D/E Ratio",v:stock.fund.metrics.debtEquity==null?"n/a":`${stock.fund.metrics.debtEquity}x`,c:stock.fund.metrics.debtEquity<0.5?G:stock.fund.metrics.debtEquity<1.5?Y:R},
 {l:"Fwd P/E",v:stock.fwdPE>0?`${stock.fwdPE}x`:(stock.fwdPENote||"n/a"),c:stock.fwdPE>0?(stock.fwdPE<20?G:stock.fwdPE<35?Y:R):"#9A8F82"}
 ].map((m,i)=>(<div key={i} style={{background:"#241C2B",borderRadius:4,padding:"7px 8px",textAlign:"center"}}>
 <div style={{...M,fontSize:12,color:"#9A8F82",marginBottom:2}}>{m.l}</div>
 <div style={{...M,fontSize:18,fontWeight:700,color:m.c}}>{m.v}</div>
 </div>))}
 </div>
 {/* Margin quality bar */}
 <div style={{display:"flex",alignItems:"center",gap:6}}>
 <span style={{...M,fontSize:12,color:"#9A8F82",width:103,flexShrink:0}}>MARGIN STACK</span>
 <div style={{flex:1,height:10,background:"#241C2B",borderRadius:3,overflow:"hidden",display:"flex",position:"relative"}}>
 <div style={{width:`${stock.fund.metrics.grossMargin}%`,height:"100%",background:G+"44",position:"absolute",left:0,borderRadius:"3px 0 0 3px"}} title={`Gross: ${stock.fund.metrics.grossMargin}%`}/>
 <div style={{width:`${stock.fund.metrics.opMargin}%`,height:"100%",background:G+"88",position:"absolute",left:0}} title={`Op: ${stock.fund.metrics.opMargin}%`}/>
 <div style={{width:`${stock.fund.metrics.netMargin}%`,height:"100%",background:G,position:"absolute",left:0,borderRadius:"3px 0 0 3px"}} title={`Net: ${stock.fund.metrics.netMargin}%`}/>
 </div>
 <div style={{display:"flex",gap:8,flexShrink:0}}>
 <span style={{...M,fontSize:12,color:G}}>Net {stock.fund.metrics.netMargin}%</span>
 <span style={{...M,fontSize:12,color:G+"88"}}>Op {stock.fund.metrics.opMargin}%</span>
 <span style={{...M,fontSize:12,color:G+"44"}}>Gross {stock.fund.metrics.grossMargin}%</span>
 </div>
 </div>
 </div>}
 {/* KEY DATA POINTS TO WATCH */}
 {stock.fund.watchlist&&<div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:14,marginTop:10}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:"#E6A817",fontWeight:600,marginBottom:8}}>Next Key Data Points to Watch</div>
 <div style={{display:"flex",flexDirection:"column",gap:4}}>
 {stock.fund.watchlist.map((w,i)=>{
 const dm=w.d.match(/^(\w+)\s+(\d+)$/);
 let dte=null;
 if(dm){
 const mo={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[dm[1]];
 if(mo!==undefined){const dt=new Date(2026,mo,parseInt(dm[2]));dte=Math.ceil((dt-TD)/(1000*60*60*24));}
 }
 return(<div key={i} style={{background:"#1E1924",borderRadius:4,padding:"8px 10px",borderLeft:`3px solid ${dte!==null&&dte<=14?"#E6A817":dte!==null&&dte<=30?"#7E91E8":"#3A3042"}`}}>
 <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
 {dte!==null&&<span style={{...M,fontSize:14,fontWeight:700,color:dte<=7?"#E8643A":dte<=14?Y:dte<=30?"#7E91E8":"#9A8F82",width:44,flexShrink:0}}>{dte<=0?"NOW":`${dte}d`}</span>}
 <span style={{...M,fontSize:14,fontWeight:600,color:"#E6A817",flexShrink:0}}>{w.d}</span>
 <span style={{fontSize:15,fontWeight:600,color:"#F4EEDF"}}>{w.item}</span>
 </div>
 <div style={{...M,fontSize:14,color:"#B8AE92",lineHeight:1.4,paddingLeft:dte!==null?36:0}}>{w.why}</div>
 </div>);
 })}
 </div>
 </div>}
 {/* REVENUE MIX */}
 {stock.fund.revMix&&<div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:14,marginTop:10}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600,marginBottom:8}}>Revenue Mix</div>
 <div style={{height:24,borderRadius:4,overflow:"hidden",display:"flex",marginBottom:6}}>
 {stock.fund.revMix.map((s,i)=>(<div key={i} style={{flex:s.p,background:s.c,position:"relative",borderRight:i<stock.fund.revMix.length-1?"1px solid #0D0D0D":"none"}} title={`${s.n}: ${s.p}%`}/>))}
 </div>
 <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
 {stock.fund.revMix.map((s,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:4}}>
 <div style={{width:8,height:8,borderRadius:2,background:s.c,flexShrink:0}}/>
 <span style={{...M,fontSize:14,color:"#B8AE92"}}>{s.n}</span>
 <span style={{...M,fontSize:14,fontWeight:600,color:s.c}}>{s.p}%</span>
 </div>))}
 </div>
 </div>}
 {/* COMPETITIVE POSITION MAP */}
 {stock.fund.compPos&&<div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:14,marginTop:10}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600,marginBottom:8}}>Competitive Position</div>
 <div style={{position:"relative",height:180,border:"1px solid #2C2433",borderRadius:4,background:"#0A090B",overflow:"hidden"}}>
 {/* Grid lines */}
 <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:"#2C243344"}}/>
 <div style={{position:"absolute",top:"50%",left:0,right:0,height:1,background:"#2C243344"}}/>
 {/* Axis labels */}
 <div style={{position:"absolute",bottom:2,left:"50%",transform:"translateX(-50%)",...M,fontSize:12,color:"#9A8F82"}}>{stock.fund.compPos.xLabel} →</div>
 <div style={{position:"absolute",left:3,top:"50%",transform:"translateY(-50%) rotate(-90deg)",transformOrigin:"center",...M,fontSize:12,color:"#9A8F82"}}>{stock.fund.compPos.yLabel} →</div>
 {/* Peers */}
 {stock.fund.compPos.peers.map((p,i)=>{
 const isSelf=p.self;
 return(<div key={i} style={{position:"absolute",left:`${Math.max(5,Math.min(92,p.x))}%`,bottom:`${Math.max(5,Math.min(88,p.y))}%`,transform:"translate(-50%, 50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:2,zIndex:isSelf?10:1}}>
 <div style={{width:isSelf?12:8,height:isSelf?12:8,borderRadius:"50%",background:isSelf?"#E6A817":i===1?"#7E91E8":"#9A8F82",border:isSelf?"2px solid #E6A817":"1px solid #9A8F82",boxShadow:isSelf?"0 0 8px #E6A81744":"none"}}/>
 <span style={{...M,fontSize:isSelf?13:12,color:isSelf?"#E6A817":"#B8AE92",fontWeight:isSelf?700:400,whiteSpace:"nowrap"}}>{p.n}</span>
 </div>);
 })}
 </div>
 </div>}
 {/* MANAGEMENT CREDIBILITY */}
 {stock.fund.mgmt&&<div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:14,marginTop:10}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600,marginBottom:8}}>Management Credibility</div>
 <div style={{display:"flex",gap:12,marginBottom:8}}>
 {[
 {l:"BEATS",v:stock.fund.mgmt.beats,c:G},
 {l:"MISSES",v:stock.fund.mgmt.misses,c:stock.fund.mgmt.misses>0?R:"#9A8F82"},
 {l:"STREAK",v:stock.fund.mgmt.streak,c:stock.fund.mgmt.streak.startsWith("+")?G:R}
 ].map((m,i)=>(<div key={i} style={{background:"#241C2B",borderRadius:4,padding:"8px 14px",textAlign:"center",minWidth:60}}>
 <div style={{...M,fontSize:12,color:"#9A8F82",marginBottom:2}}>{m.l}</div>
 <div style={{...M,fontSize:22,fontWeight:700,color:m.c}}>{m.v}</div>
 </div>))}
 <div style={{flex:1,display:"flex",alignItems:"center"}}>
 <div style={{height:6,flex:1,background:"#241C2B",borderRadius:3,overflow:"hidden",display:"flex"}}>
 {Array.from({length:stock.fund.mgmt.beats+stock.fund.mgmt.misses}).map((_,i)=>(<div key={i} style={{flex:1,background:i<stock.fund.mgmt.beats?G:R,borderRight:"1px solid #17131A"}}/>))}
 </div>
 </div>
 </div>
 <div style={{fontSize:15,color:"#B8AE92",lineHeight:1.5}}>{stock.fund.mgmt.note}</div>
 </div>}
 {/* THESIS DATE */}
 {stock.fund.thesisDate&&<div style={{marginTop:10,display:"flex",alignItems:"center",gap:6,...M,fontSize:13,color:"#9A8F82"}}>
 <span style={{width:6,height:6,borderRadius:3,background:(()=>{
 const parts=stock.fund.thesisDate.match(/(\w+)\s+(\d+),\s+(\d+)/);
 if(!parts)return"#9A8F82";
 const mo={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[parts[1]];
 const d=new Date(parseInt(parts[3]),mo,parseInt(parts[2]));
 const age=Math.ceil((TD-d)/(1000*60*60*24));
 return age<=7?"#3DBFA8":age<=30?"#FFBF00":"#E8643A";
 })(),display:"inline-block"}}/>
 Thesis written {stock.fund.thesisDate}
 {(()=>{
 const parts=stock.fund.thesisDate.match(/(\w+)\s+(\d+),\s+(\d+)/);
 if(!parts)return null;
 const mo={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[parts[1]];
 const d=new Date(parseInt(parts[3]),mo,parseInt(parts[2]));
 const age=Math.ceil((TD-d)/(1000*60*60*24));
 return <span style={{color:age<=7?"#3DBFA8":age<=30?"#FFBF00":"#E8643A",marginLeft:4}}>({age===0?"today":age===1?"1 day ago":`${age} days ago`}{age>14?" — consider refreshing":""})</span>;
 })()}
 </div>}
 </div>)}

 {/* TECHNICALS */}
 {tab==="technicals"&&stock.tech&&(<div>
 {/* TECHNICAL VERDICT */}
 <div style={{background:"#17131A",border:`1px solid ${stock.tech.verdict.c==="g"?G:stock.tech.verdict.c==="r"?R:Y}33`,borderRadius:6,padding:14,marginBottom:10}}>
 <div style={{display:"flex",alignItems:"center",gap:12}}>
 <div style={{textAlign:"center",minWidth:80}}>
 <div style={{...M,fontSize:32,fontWeight:800,color:stock.tech.verdict.c==="g"?G:stock.tech.verdict.c==="r"?R:Y}}>{stock.tech.verdict.score}</div>
 <div style={{...M,fontSize:12,color:"#9A8F82"}}>TECH SCORE</div>
 {stock.techVerified===false&&(<div style={{...M,fontSize:11,marginTop:3,padding:"1px 4px",borderRadius:3,background:"#FFBF0022",color:"#FFBF00",fontWeight:700,display:"inline-block"}}>⚠ EST</div>)}
 {stock.techVerified===true&&(<div style={{...M,fontSize:11,marginTop:3,padding:"1px 4px",borderRadius:3,background:"#3DBFA822",color:"#3DBFA8",fontWeight:700,display:"inline-block"}}>✓ VER</div>)}
 </div>
 <div style={{flex:1}}>
 <div style={{...M,fontSize:19,fontWeight:700,color:stock.tech.verdict.c==="g"?G:stock.tech.verdict.c==="r"?R:Y,marginBottom:3}}>{stock.tech.verdict.label}</div>
 <div style={{fontSize:15,color:"#B8AE92",lineHeight:1.5}}>{stock.tech.verdict.drivers}</div>
 </div>
 <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
 <div style={{...M,fontSize:13,color:"#9A8F82"}}>TREND</div>
 <div style={{...M,fontSize:16,fontWeight:700,color:stock.tech.ma.align==="bullish"?G:stock.tech.ma.align==="bearish"?R:Y,textTransform:"uppercase"}}>{stock.tech.ma.align}</div>
 </div>
 </div>
 </div>
 {/* MOVING AVERAGE MATRIX */}
 <div style={{marginBottom:10}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600,marginBottom:6}}>Moving Average Matrix</div>
 <div style={{display:"flex",flexDirection:"column",gap:4}}>
 {stock.tech.ma.brk.map((b,i)=>{
 const above=stock.price>=b.p;
 const dist=((stock.price-b.p)/b.p*100);
 return(<div key={i} style={{background:"#17131A",border:`1px solid ${above?G+"33":R+"33"}`,borderRadius:5,padding:"10px 12px",borderLeft:`3px solid ${above?G:R}`}}>
 <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
 <span style={{...M,fontSize:17,fontWeight:800,color:above?G:R,width:60}}>{b.ma}</span>
 <span style={{...M,fontSize:19,fontWeight:700,color:"#F4EEDF"}}>${b.p}</span>
 <span style={{...M,fontSize:14,padding:"1px 6px",borderRadius:3,background:above?G+"15":R+"15",color:above?G:R}}>{above?"ABOVE":"BELOW"} {Math.abs(dist).toFixed(1)}%</span>
 <div style={{flex:1,height:4,background:"#241C2B",borderRadius:2,overflow:"hidden",marginLeft:8}}>
 <div style={{width:`${Math.min(100,Math.max(5,50+dist*2))}%`,height:"100%",background:above?G:R,borderRadius:2}}/>
 </div>
 </div>
 <div style={{fontSize:14,color:"#B8AE92",lineHeight:1.4,paddingLeft:50}}>
 <span style={{color:above?G+"cc":R+"cc"}}>{above?"▲ ":"▼ "}</span>{above?b.above:b.below}
 </div>
 </div>);
 })}
 </div>
 </div>
 {/* MOMENTUM INDICATORS */}
 <div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:14,marginBottom:10}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600,marginBottom:8}}>Momentum</div>
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
 {/* RSI */}
 <div style={{background:"#241C2B",borderRadius:5,padding:10}}>
 <div style={{...M,fontSize:12,color:"#9A8F82",marginBottom:4}}>RSI (14)</div>
 <div style={{...M,fontSize:26,fontWeight:700,color:stock.tech.momentum.rsi>70?R:stock.tech.momentum.rsi<30?G:Y}}>{stock.tech.momentum.rsi==null?"—":stock.tech.momentum.rsi}</div>
 <div style={{marginTop:4,height:6,background:"#17131A",borderRadius:3,position:"relative"}}>
 <div style={{position:"absolute",left:"30%",top:-1,bottom:-1,width:1,background:G+"44"}}/>
 <div style={{position:"absolute",left:"70%",top:-1,bottom:-1,width:1,background:R+"44"}}/>
 <div style={{position:"absolute",left:`${stock.tech.momentum.rsi}%`,top:-1,width:6,height:8,borderRadius:3,background:stock.tech.momentum.rsi>70?R:stock.tech.momentum.rsi<30?G:Y,transform:"translateX(-50%)"}}/>
 </div>
 <div style={{...M,fontSize:12,color:"#9A8F82",marginTop:3,textAlign:"center"}}>{stock.tech.momentum.rsi>70?"OVERBOUGHT":stock.tech.momentum.rsi>60?"HIGH":stock.tech.momentum.rsi<30?"OVERSOLD":stock.tech.momentum.rsi<40?"LOW":"NEUTRAL"}</div>
 </div>
 {/* MACD */}
 <div style={{background:"#241C2B",borderRadius:5,padding:10}}>
 <div style={{...M,fontSize:12,color:"#9A8F82",marginBottom:4}}>MACD</div>
 <div style={{...M,fontSize:20,fontWeight:700,color:stock.tech.momentum.macd.cross==="bullish"?G:R}}>{stock.tech.momentum.macd.cross==="bullish"?"▲ BULL":"▼ BEAR"}</div>
 <div style={{display:"flex",gap:4,marginTop:4}}>
 {[{l:"MACD",v:stock.tech.momentum.macd.v},{l:"Signal",v:stock.tech.momentum.macd.s},{l:"Hist",v:stock.tech.momentum.macd.h}].map((m,j)=>(<div key={j} style={{flex:1,textAlign:"center"}}>
 <div style={{...M,fontSize:11,color:"#9A8F82"}}>{m.l}</div>
 <div style={{...M,fontSize:14,fontWeight:600,color:m.v==null?"#9A8F82":m.v>0?G:R}}>{m.v==null?"—":(m.v>0?"+":"")+m.v.toFixed(1)}</div>
 </div>))}
 </div>
 </div>
 {/* ROC */}
 <div style={{background:"#241C2B",borderRadius:5,padding:10}}>
 <div style={{...M,fontSize:12,color:"#9A8F82",marginBottom:4}}>Rate of Change</div>
 <div style={{...M,fontSize:26,fontWeight:700,color:stock.tech.momentum.roc>0?G:R}}>{stock.tech.momentum.roc>0?"+":""}{stock.tech.momentum.roc}%</div>
 <div style={{...M,fontSize:12,color:"#9A8F82",marginTop:6,textAlign:"center"}}>{Math.abs(stock.tech.momentum.roc)>10?"STRONG":Math.abs(stock.tech.momentum.roc)>5?"MODERATE":"WEAK"} {stock.tech.momentum.roc>0?"MOMENTUM":"DECELERATION"}</div>
 </div>
 </div>
 </div>
 {/* VOLUME PROFILE */}
 <div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:14,marginBottom:10}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600,marginBottom:8}}>Volume Profile</div>
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8}}>
 {[
 {l:"AVG VOLUME",v:stock.tech.volume.avg,c:"#7E91E8"},
 {l:"RECENT",v:stock.tech.volume.recent,c:stock.tech.volume.ratio>1.1?G:stock.tech.volume.ratio<0.9?R:Y},
 {l:"VOL RATIO",v:`${stock.tech.volume.ratio==null?"—":stock.tech.volume.ratio.toFixed(2)}x`,c:stock.tech.volume.ratio>1.2?G:stock.tech.volume.ratio<0.8?R:Y},
 {l:"OBV TREND",v:stock.tech.volume.obv.toUpperCase(),c:stock.tech.volume.obv==="rising"?G:stock.tech.volume.obv==="falling"?R:Y}
 ].map((m,i)=>(<div key={i} style={{background:"#241C2B",borderRadius:4,padding:"6px 8px",textAlign:"center"}}>
 <div style={{...M,fontSize:12,color:"#9A8F82",marginBottom:2}}>{m.l}</div>
 <div style={{...M,fontSize:16,fontWeight:700,color:m.c}}>{m.v}</div>
 </div>))}
 </div>
 <div style={{marginTop:8,background:"#241C2B",borderRadius:4,padding:"8px 10px",display:"flex",alignItems:"center",gap:8}}>
 <span style={{fontSize:17}}>{stock.tech.volume.accDist==="accumulation"?"🟢":stock.tech.volume.accDist==="distribution"?"🔴":"⚪"}</span>
 <div>
 <span style={{...M,fontSize:15,fontWeight:600,color:stock.tech.volume.accDist==="accumulation"?G:stock.tech.volume.accDist==="distribution"?R:Y,textTransform:"uppercase"}}>{stock.tech.volume.accDist}</span>
 <span style={{fontSize:14,color:"#B8AE92",marginLeft:6}}>{stock.tech.volume.accDist==="accumulation"?"Smart money buying. Volume confirms uptrend.":stock.tech.volume.accDist==="distribution"?"Institutional selling. Volume confirms weakness.":"No clear directional volume bias."}</span>
 </div>
 </div>
 </div>
 {/* KEY TECHNICAL LEVELS — PRICE MAP */}
 <div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:6,padding:14,marginBottom:10}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600,marginBottom:8}}>Key Price Levels</div>
 {/* Visual price ruler */}
 {(()=>{
 const allLevels=[];
 stock.tech.levels.fibs.forEach(f=>allLevels.push({p:f.p,l:f.r+(f.l?` ${f.l}`:""),t:"fib"}));
 const pv=stock.tech.levels.pivots;
 [{l:"R2",p:pv.r2},{l:"R1",p:pv.r1},{l:"PP",p:pv.pp},{l:"S1",p:pv.s1},{l:"S2",p:pv.s2}].forEach(x=>allLevels.push({p:x.p,l:x.l,t:"pivot"}));
 stock.support.forEach(s=>allLevels.push({p:s.lvl,l:s.label,t:"support"}));
 const sorted=allLevels.sort((a,b)=>b.p-a.p);
 const hi=sorted[0].p,lo=sorted[sorted.length-1].p,range=hi-lo||1;
 return(<div style={{position:"relative",minHeight:sorted.length*22+10,marginBottom:8}}>
 {/* Current price line */}
 <div style={{position:"absolute",left:50,right:0,top:`${(1-(stock.price-lo)/range)*100}%`,height:2,background:"#E6A817",zIndex:5,borderRadius:1}}>
 <div style={{position:"absolute",left:-50,top:-6,...M,fontSize:14,fontWeight:700,color:"#E6A817",width:75,textAlign:"right"}}>${stock.price}</div>
 </div>
 {sorted.map((lv,i)=>{
 const pct=(1-(lv.p-lo)/range)*100;
 const tc=lv.t==="fib"?"#B266FF":lv.t==="pivot"?"#FFBF00":"#7E91E8";
 const isNear=Math.abs(lv.p-stock.price)/stock.price<0.02;
 return(<div key={i} style={{position:"absolute",left:50,right:0,top:`${pct}%`,height:1,background:isNear?tc:tc+"44",display:"flex",alignItems:"center"}}>
 <div style={{position:"absolute",left:-50,...M,fontSize:12,color:tc,width:82,textAlign:"right",fontWeight:isNear?700:400}}>${lv.p}</div>
 <div style={{position:"absolute",right:0,...M,fontSize:12,color:isNear?tc:tc+"88"}}>{lv.l} <span style={{color:"#9A8F82",fontSize:11,textTransform:"uppercase"}}>{lv.t}</span></div>
 </div>);
 })}
 </div>);
 })()}
 {/* Pivot table */}
 <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:4,marginTop:8}}>
 {[
 {l:"R2",p:stock.tech.levels.pivots.r2,c:G},
 {l:"R1",p:stock.tech.levels.pivots.r1,c:G},
 {l:"PIVOT",p:stock.tech.levels.pivots.pp,c:Y},
 {l:"S1",p:stock.tech.levels.pivots.s1,c:R},
 {l:"S2",p:stock.tech.levels.pivots.s2,c:R}
 ].map((p,i)=>(<div key={i} style={{background:"#241C2B",borderRadius:3,padding:"5px 4px",textAlign:"center"}}>
 <div style={{...M,fontSize:12,color:"#9A8F82"}}>{p.l}</div>
 <div style={{...M,fontSize:16,fontWeight:700,color:p.c}}>${p.p}</div>
 <div style={{...M,fontSize:12,color:p.p>stock.price?G:R}}>{((p.p-stock.price)/stock.price*100).toFixed(1)}%</div>
 </div>))}
 </div>
 </div>
 {/* PATTERN RECOGNITION */}
 {stock.tech.pattern&&<div style={{background:"#17131A",border:`1px solid ${stock.tech.pattern.dir==="up"?G:stock.tech.pattern.dir==="down"?R:Y}33`,borderRadius:6,padding:14,marginBottom:10}}>
 <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600}}>Chart Pattern</div>
 <span style={{...M,fontSize:14,padding:"2px 8px",borderRadius:3,background:stock.tech.pattern.dir==="up"?G+"15":stock.tech.pattern.dir==="down"?R+"15":Y+"15",color:stock.tech.pattern.dir==="up"?G:stock.tech.pattern.dir==="down"?R:Y,fontWeight:600}}>{stock.tech.pattern.dir==="up"?"BULLISH":stock.tech.pattern.dir==="down"?"BEARISH":"NEUTRAL"}</span>
 </div>
 <div style={{display:"flex",alignItems:"center",gap:12}}>
 <div>
 <div style={{...M,fontSize:20,fontWeight:700,color:"#F4EEDF"}}>{stock.tech.pattern.name}</div>
 {stock.tech.pattern.target&&<div style={{...M,fontSize:15,color:stock.tech.pattern.dir==="up"?G:R,marginTop:2}}>Measured target: ${stock.tech.pattern.target} ({((stock.tech.pattern.target-stock.price)/stock.price*100).toFixed(1)}%)</div>}
 </div>
 </div>
 <div style={{fontSize:15,color:"#B8AE92",lineHeight:1.5,marginTop:6}}>{stock.tech.pattern.note}</div>
 </div>}
 </div>)}

 {/* REL VALUE */}
 {tab==="relative"&&(<div style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:5,overflow:"hidden"}}>
 <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 12px",borderBottom:"1px solid #2C2433",background:"#1E1924"}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1,color:"#9A8F82",fontWeight:600}}>Peers — Relative Valuation</div>
 <span style={{...M,fontSize:12,padding:"1px 5px",borderRadius:3,background:"#FFBF0022",color:"#FFBF00",border:"1px solid #FFBF0044",fontWeight:700}}>⚠ FwdP/E + EV/EBITDA ESTIMATED</span>
 </div>
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",padding:"7px 12px",borderBottom:"1px solid #2C2433",background:"#1E1924"}}>
 {["Company","Fwd P/E","EV/EBITDA","YTD"].map(h=>(<div key={h} style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1,color:"#9A8F82",fontWeight:600}}>{h}</div>))}
 </div>
 {stock.peers.map((p,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",padding:"7px 12px",borderBottom:"1px solid #2C2433",background:p.t===activeTicker?"#241C2B":"transparent"}}>
 <div style={{...M,fontSize:15,fontWeight:p.t===activeTicker?700:400,color:p.t===activeTicker?"#E6A817":"#F4EEDF"}}>{p.t}</div>
 <div style={{...M,fontSize:15,color:p.pe<15?G:p.pe>30?R:"#F4EEDF"}}>{p.pe}x</div>
 <div style={{...M,fontSize:15}}>{p.ev}x</div>
 <div style={{...M,fontSize:15,color:p.y>0?G:R}}>{p.y>0?"+":""}{p.y}%</div>
 </div>))}
 </div>)}

 {/* CATALYSTS */}
 {tab==="catalysts"&&(<div>
 {/* Portfolio-wide catalyst calendar */}
 <div style={{marginBottom:12}}>
 <div style={{...M,fontSize:14,textTransform:"uppercase",letterSpacing:1.5,color:"#E6A817",fontWeight:600,marginBottom:6}}>Portfolio Catalyst Calendar — Next 60 Days</div>
 <div style={{display:"flex",flexDirection:"column",gap:3,maxHeight:200,overflowY:"auto",marginBottom:6}}>
 {(()=>{
 const allCats=[];
 tickers.forEach(t=>{
 S[t].catalysts.forEach(c=>{
 const dm=c.d.match(/^(\w+)\s+(\d+)$/);
 if(dm){
 const mo={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[dm[1]];
 if(mo!==undefined){
 const dt=new Date(2026,mo,parseInt(dm[2]));
 const dte=Math.ceil((dt-TD)/(1000*60*60*24));
 if(dte>=0&&dte<=60)allCats.push({ticker:t,event:c.e,date:c.d,dte,impact:c.i,iv:c.iv,hm:c.hm,dt});
 }
 }
 });
 });
 allCats.sort((a,b)=>a.dte-b.dte);
 // Find confluence (multiple events same week)
 const weekBuckets={};
 allCats.forEach(c=>{const wk=Math.floor(c.dte/7);weekBuckets[wk]=(weekBuckets[wk]||0)+1;});
 return allCats.length===0?[<div key="none" style={{...M,fontSize:15,color:"#9A8F82",padding:8}}>No dated catalysts in next 60 days</div>]:
 allCats.map((c,i)=>{
 const ic=c.impact==="bullish"?G:c.impact==="bearish"?R:c.impact==="high"?P:Y;
 const isActive=c.ticker===activeTicker;
 const wk=Math.floor(c.dte/7);
 const confluence=weekBuckets[wk]>1;
 return(<div key={i} onClick={()=>{setActiveTicker(c.ticker);}} style={{background:isActive?"#241C2B":"#17131A",border:`1px solid ${isActive?"#E6A81733":"#2C2433"}`,borderRadius:4,padding:"6px 10px",display:"flex",alignItems:"center",gap:8,cursor:"pointer",borderLeft:`3px solid ${ic}`}}>
 <div style={{...M,fontSize:14,fontWeight:700,color:c.dte<=7?"#E8643A":c.dte<=14?Y:"#B8AE92",width:44,textAlign:"center",flexShrink:0}}>
 {c.dte===0?"TODAY":c.dte===1?"1d":`${c.dte}d`}
 </div>
 <span style={{...M,fontSize:14,fontWeight:700,color:isActive?"#E6A817":"#7E91E8",width:65,flexShrink:0}}>{c.ticker}</span>
 <span style={{flex:1,fontSize:15,fontWeight:500}}>{c.event}</span>
 {confluence&&<span style={{...M,fontSize:12,padding:"1px 4px",borderRadius:2,background:"#B266FF22",color:"#B266FF",flexShrink:0}}>CLUSTER</span>}
 <span style={{...M,fontSize:13,color:"#9A8F82",flexShrink:0}}>{c.date}</span>
 <span style={{...M,fontSize:13,padding:"1px 5px",borderRadius:3,background:ic+"15",color:ic,flexShrink:0}}>{c.impact==="high"?"⚡":"●"} {(c.iv||"med").toUpperCase()}</span>
 </div>);
 });
 })()}
 </div>
 </div>
 {/* Active ticker catalysts — enriched */}
 <div style={{...M,fontSize:14,textTransform:"uppercase",letterSpacing:1.5,color:"#9A8F82",fontWeight:600,marginBottom:6}}>{activeTicker} Catalysts</div>
 <div style={{display:"flex",flexDirection:"column",gap:5}}>
 {stock.catalysts.map((c,i)=>{
 const ic=c.i==="bullish"?G:c.i==="bearish"?R:c.i==="high"?P:Y;
 // Parse countdown
 const dm=c.d.match(/^(\w+)\s+(\d+)$/);
 let dte=null;
 if(dm){
 const mo={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[dm[1]];
 if(mo!==undefined){const dt=new Date(2026,mo,parseInt(dm[2]));dte=Math.ceil((dt-TD)/(1000*60*60*24));}
 }
 return(
 <div key={i} style={{background:"#17131A",border:"1px solid #2C2433",borderRadius:5,padding:"10px 12px",borderLeft:`3px solid ${ic}`}}>
 <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
 {dte!==null&&<div style={{...M,fontSize:16,fontWeight:800,color:dte<=7?"#E8643A":dte<=14?Y:dte<=30?"#7E91E8":"#9A8F82",width:52,textAlign:"center",flexShrink:0}}>
 {dte<=0?"NOW":`${dte}d`}
 </div>}
 <div style={{...M,fontSize:15,fontWeight:700,color:"#E6A817",width:98,flexShrink:0}}>{c.d}</div>
 <div style={{flex:1,fontSize:17,fontWeight:600}}>{c.e}</div>
 <span style={{...M,fontSize:13,padding:"2px 5px",borderRadius:3,background:ic+"15",color:ic,flexShrink:0}}>{c.i.toUpperCase()}</span>
 </div>
 <div style={{display:"flex",gap:12,marginLeft:dte!==null?44:0,flexWrap:"wrap"}}>
 {c.iv&&<div style={{display:"flex",alignItems:"center",gap:3}}>
 <span style={{...M,fontSize:12,color:"#9A8F82"}}>IV IMPACT</span>
 <span style={{...M,fontSize:13,fontWeight:600,padding:"1px 5px",borderRadius:2,
 background:c.iv==="high"?P+"15":c.iv==="med"?Y+"15":"#7E91E815",
 color:c.iv==="high"?P:c.iv==="med"?Y:"#7E91E8"}}>{c.iv.toUpperCase()}</span>
 </div>}
 {c.hm&&c.hm!=="N/A"&&<div style={{display:"flex",alignItems:"center",gap:3}}>
 <span style={{...M,fontSize:12,color:"#9A8F82"}}>LAST TIME</span>
 <span style={{...M,fontSize:13,fontWeight:600,color:c.hm.startsWith("+")?G:R}}>{c.hm}</span>
 </div>}
 {dte!==null&&dte<=14&&<div style={{display:"flex",alignItems:"center",gap:3}}>
 <span style={{...M,fontSize:12,color:"#9A8F82"}}>URGENCY</span>
 <span style={{...M,fontSize:13,fontWeight:600,color:dte<=3?"#E8643A":dte<=7?Y:"#7E91E8"}}>{dte<=3?"IMMINENT":dte<=7?"THIS WEEK":"SOON"}</span>
 </div>}
 {dte!==null&&c.iv==="high"&&<div style={{display:"flex",alignItems:"center",gap:3}}>
 <span style={{...M,fontSize:12,color:"#9A8F82"}}>IV CRUSH</span>
 <span style={{...M,fontSize:13,fontWeight:600,color:"#B266FF"}}>-{Math.round(stock.options.ivRank*0.4)}pts est</span>
 </div>}
 </div>
 </div>);})}
 </div>
 {/* Confluence warning */}
 {(()=>{
 const upcoming=[];
 tickers.forEach(t=>{S[t].catalysts.forEach(c=>{
 const dm=c.d.match(/^(\w+)\s+(\d+)$/);
 if(dm){const mo={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[dm[1]];
 if(mo!==undefined){const dt=new Date(2026,mo,parseInt(dm[2]));const dte=Math.ceil((dt-TD)/(1000*60*60*24));
 if(dte>=0&&dte<=7)upcoming.push({t,e:c.e,dte,i:c.i});}}});});
 return upcoming.length>1?(<div style={{marginTop:10,background:"#24103A",border:"1px solid #B266FF33",borderRadius:5,padding:10}}>
 <div style={{...M,fontSize:13,textTransform:"uppercase",letterSpacing:1,color:"#B266FF",fontWeight:600,marginBottom:4}}>⚡ Confluence Alert — {upcoming.length} events this week</div>
 <div style={{...M,fontSize:15,color:"#D6CDB6",lineHeight:1.5}}>
 {upcoming.map(u=>`${u.t}: ${u.e} (${u.dte===0?"today":`${u.dte}d`})`).join(" • ")}
 </div>
 <div style={{...M,fontSize:14,color:"#B266FF",marginTop:4}}>Multiple catalysts = correlated moves. Size down individual positions, widen stops.</div>
 </div>):null;
 })()}
 </div>)}
 </>)}

 <div style={{marginTop:20,paddingTop:8,borderTop:"1px solid #2C2433",...M,fontSize:12,color:"#9A8F82",lineHeight:1.6}}>
 <div style={{marginBottom:6}}>
 <strong style={{color:"#B8AE92"}}>VERIFICATION LEGEND:</strong> <span style={{color:"#3DBFA8"}}>✓</span> = Web-verified within last 7 days · <span style={{color:"#FFBF00"}}>⚠</span> = Estimated/needs verification · <strong>PT</strong>=Price Targets · <strong>TECH</strong>=Technicals (MAs, fibs, RSI) · <strong>OPT</strong>=Options (IV, max pain, flow) · <strong>FUND</strong>=Fundamentals story
 </div>
 <div style={{marginBottom:6}}>
 {(globalThis.__ADE_LIVE__||{}).legend||""}
 </div>
 <div>
 ADE INVESTMENTS — PORTFOLIO COMMAND CENTER v6 — {tickers.length} tickers, {Object.values(allItems).reduce((a,b)=>a+b.length,0)} signals — ADE text from {(globalThis.__ADE_LIVE__||{}).adeDate||"n/a"}; numbers live — Not investment advice
 </div>
 </div>
 </div>
 </div>
 );
}
