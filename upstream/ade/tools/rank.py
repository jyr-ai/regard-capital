#!/usr/bin/env python3
"""
Score every position two ways and print them side by side.

TOOL method      — scores against the nearest observed support, which is what
                   the dashboard's own gauge uses. Volume nodes count.
DEFENDED method  — scores against the nearest level that has actually been
                   defended at least once. Untested volume nodes are ignored.

Where the two disagree sharply, that gap is the finding: a name whose nearest
"support" has never been tested has no measured downside, and the tool method
will flatter it.

Components (both methods):
    upside to consensus   30%   capped at +/-50%
    reward-to-risk        28%   denominator floored at 3% of price, capped 6x
    support quality       17%   60% distance (0-30% scale) + 40% held count (cap 6)
    momentum              15%   65% RSI headroom to 70 + 35% positive-MACD bonus
    structural integrity  10%   1.0 minus 0.2 per broken level above price

Bands: >84 Strong Buy | 69-84 Buy | 39-69 Hold | <39 Trim/Avoid

Usage:
    python3 tools/rank.py [--file ...] [--sync ...] [--write-verdicts]
"""
import json, re, argparse, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def blocks(src):
    starts = [(m.group(1), m.start()) for m in re.finditer(r'\n(\w+):\{name:"', src)]
    starts = [(t, i) for t, i in starts if t != "pattern"]
    return {t: (i, starts[k + 1][1] if k + 1 < len(starts) else len(src))
            for k, (t, i) in enumerate(starts)}


def band(score):
    return ("STRONG BUY" if score > 84 else "BUY" if score >= 69
            else "HOLD" if score >= 39 else "TRIM/AVOID")


def score(price, target, level, held, rsi, macd_h, broken):
    upside = (target - price) / price * 100
    rr = (target - price) / max(price - level, price * 0.03)
    dist = (price - level) / price * 100
    supq = max(0.0, min(1.0, ((30 - min(30, dist)) / 30) * 0.6 + min(6, held) / 6 * 0.4))
    mom = max(0.0, min(1.0, ((70 - rsi) / 35) * 0.65 + (0.35 if macd_h > 0 else 0)))
    struct = max(0.0, 1 - broken * 0.2)
    raw = (min(1, max(-1, upside / 50)) * 0.30 + min(1, rr / 6) * 0.28
           + supq * 0.17 + mom * 0.15 + struct * 0.10)
    return round(raw * 100), upside, rr, dist


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--file", default=str(ROOT / "src" / "ade-portfolio-v6.jsx"))
    ap.add_argument("--sync", default=str(ROOT / "data" / "tickers.json"))
    ap.add_argument("--write-verdicts", action="store_true",
                    help="write the TOOL score back into each verdict block")
    args = ap.parse_args()

    path, sync = Path(args.file), Path(args.sync)
    if not sync.exists():
        sys.exit(f"sync file not found: {sync}")
    D = json.load(open(sync))["tickers"]
    src = open(path).read()
    b = blocks(src)

    rows = []
    for t in b:
        if t not in D:
            continue
        x = D[t]
        p = x["close"]["official_4pm_close"]
        ind, sr = x["indicators"], x["support_resistance"]
        seg = src[b[t][0]:b[t][1]]
        pt = float(re.search(r'avgPT:([0-9.]+)', seg).group(1))
        rsi, mh = ind["rsi_14"], ind["macd"]["histogram"]
        bs = sr.get("broken_support", [])
        if isinstance(bs, dict):
            bs = bs.get("levels", [])
        nbroken = len(bs)

        # tool method: nearest observed level from the dashboard's own ladder
        lv = re.search(r'support:\[\{lvl:([0-9.]+),label:"([^"]*)"', seg)
        s0 = float(lv.group(1))
        hm = re.search(r'held (\d+)x', lv.group(2))
        held0 = int(hm.group(1)) if hm else 0
        tool, up, rr_t, d_t = score(p, pt, s0, held0, rsi, mh, nbroken)

        # defended method: best quality among levels defended at least once
        best, bq = None, -1
        for s in sr.get("swing_lows", []):
            if s["price"] >= p or s["held_count"] < 1:
                continue
            dist = (p - s["price"]) / p * 100
            q = max(0, (30 - min(30, dist)) / 30) * 0.6 + min(6, s["held_count"]) / 6 * 0.4
            if q > bq:
                bq, best = q, s
        if not best:
            continue
        dfd, _, rr_d, d_d = score(p, pt, best["price"], best["held_count"], rsi, mh, nbroken)
        rows.append((t, dfd, tool, p, pt, up, rr_d, best["price"], d_d,
                     best["held_count"], nbroken, rsi))

    rows.sort(key=lambda r: -r[1])
    print(f"{'#':<3}{'T':<6}{'DFND':>5}{'TOOL':>6}{'PRICE':>10}{'PT':>8}"
          f"{'UP%':>7}{'R:R':>7}{'LEVEL':>10}{'dist':>8}{'held':>5}{'brk':>4}{'RSI':>5}  BAND")
    for k, r in enumerate(rows, 1):
        t, dfd, tool, p, pt, up, rr, lvl, dist, held, nb, rsi = r
        print(f"{k:<3}{t:<6}{dfd:>5}{tool:>6}{p:>10.2f}{pt:>8.0f}{up:>6.0f}%"
              f"{rr:>7.1f}{lvl:>10.2f}{dist:>7.1f}%{held:>5}{nb:>4}{rsi:>5.0f}  {band(dfd)}")

    gaps = sorted(rows, key=lambda r: -(r[2] - r[1]))[:4]
    print("\nWidest method disagreements (tool minus defended):")
    for t, dfd, tool, p, *_ , held, nb, rsi in gaps:
        print(f"  {t:<6}{tool - dfd:>4} points  — the tool's nearest level is "
              f"{'untested' if held == 0 else 'much closer'} than the nearest defended one")

    if args.write_verdicts:
        for t in b:
            if t not in D:
                continue
            row = next((r for r in rows if r[0] == t), None)
            if not row:
                continue
            src_now = open(path).read()
            i, e = blocks(src_now)[t]
            seg = src_now[i:e]
            m = re.search(r'verdict:\{score:(-?\d+),label:"([^"]*)"', seg)
            if not m:
                continue
            tail = m.group(2).split("\\u2014", 1)
            suffix = (" \\u2014 " + tail[1].strip()) if len(tail) > 1 else ""
            seg = (seg[:m.start()] + f'verdict:{{score:{row[2]},label:"{band(row[2])}'
                   + suffix + '"' + seg[m.end():])
            open(path, "w").write(src_now[:i] + seg + src_now[e:])
        print("\nverdict blocks updated with the TOOL score")


if __name__ == "__main__":
    main()
