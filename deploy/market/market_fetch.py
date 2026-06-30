#!/usr/bin/env python3
"""Fetch live market data from Yahoo Finance (no third-party deps) and write
market.json for the site's Market Overview widget.

Runs on the server via cron (see SETUP.md). Uses only the Python stdlib — hits
Yahoo's public v8 chart endpoint per symbol and skips any symbol that fails, so
a few bad/blocked symbols never break the whole file. Writes atomically.
"""

import json
import os
import tempfile
import time
import urllib.parse
import urllib.request

OUT_PATH = os.environ.get("MARKET_OUT", "/var/www/market-data/market.json")

# (yahoo_symbol, display_name, panel, category)
#   panel:    "indices" | "commodities"
#   category: "indian" | "global"  (indices)  |  "commodity" | "currency"
SYMBOLS = [
    # ── Indian indices ──
    ("^NSEI",       "Nifty 50",        "indices", "indian"),
    ("^BSESN",      "Sensex",          "indices", "indian"),
    ("^NSEBANK",    "Nifty Bank",      "indices", "indian"),
    ("^CNXIT",      "Nifty IT",        "indices", "indian"),
    ("^CNXFIN",     "Nifty Fin Serv",  "indices", "indian"),
    ("^NSEMDCP50",  "Nifty Midcap 50", "indices", "indian"),
    ("^CRSLDX",     "Nifty 500",       "indices", "indian"),
    ("^CNXAUTO",    "Nifty Auto",      "indices", "indian"),
    # ── Global indices ──
    ("^DJI",        "Dow Jones",       "indices", "global"),
    ("^GSPC",       "S&P 500",         "indices", "global"),
    ("^IXIC",       "Nasdaq",          "indices", "global"),
    ("^FTSE",       "FTSE 100",        "indices", "global"),
    ("^N225",       "Nikkei 225",      "indices", "global"),
    ("^HSI",        "Hang Seng",       "indices", "global"),
    # ── Commodities (global futures, USD) ──
    ("GC=F",        "Gold",            "commodities", "commodity"),
    ("SI=F",        "Silver",          "commodities", "commodity"),
    ("CL=F",        "Crude Oil",       "commodities", "commodity"),
    ("NG=F",        "Natural Gas",     "commodities", "commodity"),
    ("HG=F",        "Copper",          "commodities", "commodity"),
    # ── Currency (INR pairs) ──
    ("USDINR=X",    "USD / INR",       "commodities", "currency"),
    ("EURINR=X",    "EUR / INR",       "commodities", "currency"),
    ("GBPINR=X",    "GBP / INR",       "commodities", "currency"),
    ("JPYINR=X",    "JPY / INR",       "commodities", "currency"),
]

CHART_URL = "https://query1.finance.yahoo.com/v8/finance/chart/{sym}?interval=1d&range=5d"
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; ShriramMarketBot/1.0)"}


def fetch_one(symbol):
    url = CHART_URL.format(sym=urllib.parse.quote(symbol))
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=12) as resp:
        data = json.load(resp)
    meta = data["chart"]["result"][0]["meta"]
    price = meta.get("regularMarketPrice")
    prev = meta.get("chartPreviousClose")
    if prev is None:
        prev = meta.get("previousClose")
    if price is None or prev is None:
        return None
    change = price - prev
    pct = (change / prev * 100) if prev else 0.0
    return {
        "price": round(float(price), 2),
        "change": round(float(change), 2),
        "changePct": round(float(pct), 2),
        "time": int(meta.get("regularMarketTime") or time.time()),
    }


def main():
    out = {"updated": int(time.time()), "indices": [], "commodities": []}
    for symbol, name, panel, cat in SYMBOLS:
        try:
            q = fetch_one(symbol)
            if not q:
                continue
            out[panel].append({"symbol": symbol, "name": name, "cat": cat, **q})
        except Exception as exc:  # noqa: BLE001 - skip any failing symbol
            print(f"[market_fetch] skip {symbol}: {exc}")
        time.sleep(0.15)  # be gentle with Yahoo

    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    fd, tmp = tempfile.mkstemp(dir=os.path.dirname(OUT_PATH), suffix=".tmp")
    with os.fdopen(fd, "w") as f:
        json.dump(out, f, separators=(",", ":"))
    os.replace(tmp, OUT_PATH)
    print(f"[market_fetch] wrote {len(out['indices'])} indices + "
          f"{len(out['commodities'])} commodities -> {OUT_PATH}")


if __name__ == "__main__":
    main()
