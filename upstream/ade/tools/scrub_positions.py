#!/usr/bin/env python3
"""
Remove personal holdings from the dashboard so it can be published.

Three passes:
  0. Accounts — broker name, account names, cash levels and statement
     reconciliations are neutralised (also applied to .md reports with
     --accounts-only).
  1. Structured data — every ticker-keyed holdings object (share counts and
     cost basis) is zeroed, keeping its keys so the code still runs.
  2. Prose — inside string literals, any sentence that states a share count,
     a trade in the account, a position value, cost basis or return on cost is
     dropped. News entries whose headline is itself a trade log are removed.

Public market data — prices, targets, levels, insider sales, research — is kept.

Usage:
    python3 tools/scrub_positions.py                      # scrub src/ade-portfolio-v6.jsx in place
    python3 tools/scrub_positions.py --file X --out Y
    python3 tools/scrub_positions.py --check              # report leftovers, change nothing
    python3 tools/scrub_positions.py --accounts-only --file reports/X.md
"""
import re, argparse, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

HOLDING_OBJECTS = ("exitShares", "exitSharesHC", "exitCBData", "costBasis", "shares")

# A sentence matching any of these discloses the owner's holdings.
PERSONAL = re.compile("|".join([
    r"\b\d[\d,]*(\.\d+)?\s*(shares?|sh)\b",            # "37.5 shares", "22.3 sh"
    r"\d%?\s+on cost\b",                               # "+493% on cost"
    r"\bcost basis\s*(of\s*)?\$?\d",                    # "cost basis $154"
    r"\bavg cost\s*\$?\d",
    r"\$\d[\d.,]*\s?K\b",                              # "$19.5K", "$277K"
    r"\bshare count\b",
    r"\bposition (was |is |now )?(cut|reduced|trimmed|added|increased|=)",
    r"\bposition (grown )?\d[\d.]*\s*(\u2192|->|to)\s*\d",   # "Position 27\u219225"
    r"\bthe position = ",
    r"\bposition change\b",
    r"\bholdings rose\b",
    r"\bwhat remains are\b",
    r"\bunderwater\b",
    r"\b\d[\d.]*% (reduction|add)\b",
    r"\bsizing did not follow\b",
]), re.I)

# Public facts that happen to match the patterns above: insider and fund
# filings, Bitcoin prices, regulatory thresholds, headcount.
PUBLIC = re.compile(
    r"\b(CEO|CFO|COO|CTO|VP|EVP|SVP|insider|director|president|chair\w*|founder|officer|"
    r"Bridgewater|Elliott|Berkshire|BlackRock|Vanguard|fund|management|BTC|bitcoin|"
    r"pattern day|rule|employees|workforce)\b", re.I)

# Generic account wording -> neutral. Broker name and account nicknames are
# private, so they live in data/scrub_terms.json (git-ignored), shaped as
#   {"replacements": [["regex", "replacement"], ...], "leftover": ["term", ...]}
ACCOUNT_REPLACEMENTS = [
    (r"\bin either account\b", "in the portfolio"),
    (r"\bacross both accounts\b", "across the portfolio"),
]
LEFTOVER_TERMS = ["either account", "both accounts", "account statement"]
TERMS_FILE = ROOT / "data" / "scrub_terms.json"
if TERMS_FILE.exists():
    import json
    _t = json.loads(TERMS_FILE.read_text(encoding="utf-8"))
    ACCOUNT_REPLACEMENTS = [tuple(r) for r in _t.get("replacements", [])] + ACCOUNT_REPLACEMENTS
    LEFTOVER_TERMS += _t.get("leftover", [])
ACCOUNT_LEFTOVER = re.compile("|".join(re.escape(t) for t in LEFTOVER_TERMS), re.I)

# Private terms are also committed as SHA-256 hashes of their lowercase words,
# so leftovers are caught even where scrub_terms.json is absent (e.g. a fresh
# cloud session) without the repo ever spelling them out.
HASH_FILE = ROOT / "tools" / "private_terms.sha256"
WORD = re.compile(r"[a-z0-9]+")


def term_hash(term):
    import hashlib
    return hashlib.sha256(" ".join(WORD.findall(term.lower())).encode()).hexdigest()


PRIVATE_HASHES = set()
if HASH_FILE.exists():
    PRIVATE_HASHES = {l.split()[0] for l in HASH_FILE.read_text().splitlines() if l.strip() and not l.startswith("#")}


def private_term_hits(text):
    """Return (line_no, ngram_hash) for every 1-3 word run whose hash is private."""
    import hashlib
    hits = []
    if not PRIVATE_HASHES:
        return hits
    for ln, line in enumerate(text.splitlines(), 1):
        words = WORD.findall(line.lower())
        for n in (1, 2, 3):
            for i in range(len(words) - n + 1):
                h = hashlib.sha256(" ".join(words[i:i + n]).encode()).hexdigest()
                if h in PRIVATE_HASHES:
                    hits.append((ln, " ".join(words[i:i + n])))
    return hits


def neutralise_accounts(src):
    n = 0
    for pat, rep in ACCOUNT_REPLACEMENTS:
        src, c = re.subn(pat, rep, src)
        n += c
    return src, n


# Headlines that are trade-log entries — the whole news item goes.
TRADE_HEADLINE = re.compile(
    r"\b(BUY|SELL)\s+\d|\btrade\s+\w{3}\s+\d+\b|\b(added|trimmed)\s+(\d+ more|\d+)(\.\d+)?\s+shares?|"
    r"\bnew position\b.*\bshares?\b|PORTFOLIO STRUCTURE CHANGED", re.I)

STR = re.compile(r'"((?:[^"\\\n]|\\.)*)"')
SENT = re.compile(r"(?<=[.!?])\s+(?=[A-Z0-9(\"'$+\-−—])|\s+(?:—|\\u2014)\s+(?=[A-Z])")


def is_personal(text):
    return bool(PERSONAL.search(text)) and not PUBLIC.search(text)


def scrub_string(body):
    # Code strings are short and never carry a figure; leave them alone.
    if len(body) < 25 or not PERSONAL.search(body):
        return body
    parts = SENT.split(body)
    kept = [p for p in parts if not is_personal(p)]
    if len(kept) == len(parts):
        return body
    return " ".join(kept).strip()


def zero_objects(src):
    n = 0
    for name in HOLDING_OBJECTS:
        pat = re.compile(r"((?:const|let|var)\s+" + name + r"\s*=\s*\{)([^}]*)(\})")
        def rep(m):
            keys = [kv.split(":")[0].strip() for kv in m.group(2).split(",") if ":" in kv]
            return m.group(1) + ",".join(f"{k}:0" for k in keys) + m.group(3)
        src, c = pat.subn(rep, src)
        n += c
    return src, n


# n(id,"headline","detail","source","date",sent,"cat",weight[,"type"]) optionally wrapped {...n(...),on:false}
Q = r'"(?:[^"\\\n]|\\.)*"'
NEWS = re.compile(
    r'(\{\.\.\.)?n\(\d+,(' + Q + r'),' + Q + ',' + Q + ',' + Q + r',[-\d.]+,' + Q + r',[\d.]+(?:,' + Q + r')?\)(,on:(?:true|false)\})?')


def drop_trade_news(src):
    n = 0
    def rep(m):
        nonlocal n
        head = m.group(2)
        wrapped = bool(m.group(1))
        if wrapped != bool(m.group(3)):
            return m.group(0)
        if (TRADE_HEADLINE.search(head) and not PUBLIC.search(head)) or not scrub_string(head[1:-1]):
            n += 1
            return "\x00"
        return m.group(0)
    src = NEWS.sub(rep, src)
    # tidy the separators left behind
    src = re.sub(r",\s*\x00", "", src)
    src = re.sub(r"\x00\s*,\s*", "", src)
    src = src.replace("\x00", "")
    return src, n


def leftovers(src):
    out = []
    for m in STR.finditer(src):
        body = m.group(1)
        if len(body) >= 25:
            for p in SENT.split(body):
                if is_personal(p):
                    out.append(p[:160])
    for m in ACCOUNT_LEFTOVER.finditer(src):
        out.append("account reference: " + src[max(0, m.start() - 60):m.end() + 60].replace("\n", " "))
    for ln, term in private_term_hits(src):
        out.append(f"private account term on line {ln}")
    for name in HOLDING_OBJECTS:
        m = re.search(r"(?:const|let|var)\s+" + name + r"\s*=\s*\{([^}]*)\}", src)
        if m and re.search(r":\s*(?!0\b)\d", m.group(1)):
            out.append(name + " still holds non-zero values")
    return out


def text_leftovers(text):
    """Leftovers for Markdown/other text: personal sentences and private terms."""
    out = []
    for ln, line in enumerate(text.splitlines(), 1):
        for p in SENT.split(line):
            if is_personal(p):
                out.append(f"line {ln}: {p[:160]}")
    for m in ACCOUNT_LEFTOVER.finditer(text):
        out.append("account reference: " + text[max(0, m.start() - 60):m.end() + 60].replace("\n", " "))
    for ln, term in private_term_hits(text):
        out.append(f"private account term on line {ln}")
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--file", default=str(ROOT / "src" / "ade-portfolio-v6.jsx"))
    ap.add_argument("--out", default=None, help="defaults to --file (in place)")
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--accounts-only", action="store_true", help="only the account pass (for Markdown)")
    a = ap.parse_args()
    if not TERMS_FILE.exists() and not a.check:
        print(f"note: {TERMS_FILE} not found - broker/account names will not be neutralised", file=sys.stderr)

    src = open(a.file, encoding="utf-8").read()

    if a.check:
        left = leftovers(src) if a.file.endswith(".jsx") else text_leftovers(src)
        print("\n".join(left) if left else "clean")
        sys.exit(1 if left else 0)

    src, nacc = neutralise_accounts(src)
    if a.accounts_only:
        open(a.out or a.file, "w", encoding="utf-8").write(src)
        left = [l for l in ACCOUNT_LEFTOVER.findall(src)]
        print(f"neutralised {nacc} account references -> {a.out or a.file}; leftovers: {len(left)}")
        sys.exit(1 if left else 0)
    src, nobj = zero_objects(src)
    src, nnews = drop_trade_news(src)
    nstr = 0
    def srep(m):
        nonlocal nstr
        new = scrub_string(m.group(1))
        if new != m.group(1):
            nstr += 1
        return '"' + new + '"'
    src = STR.sub(srep, src)

    out = a.out or a.file
    open(out, "w", encoding="utf-8").write(src)
    print(f"neutralised {nacc} account references, zeroed {nobj} holdings objects, removed {nnews} trade-log entries, redacted {nstr} strings -> {out}")
    left = leftovers(src)
    print("leftovers:", len(left))
    for l in left:
        print("  ", l)
    print("Verify with: ADE_FILE=" + out + " node tools/render_check.cjs")


if __name__ == "__main__":
    main()
