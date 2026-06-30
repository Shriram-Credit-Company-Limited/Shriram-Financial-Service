# Market Overview data pipeline

The Equity page's **Market Overview** widget ([src/components/MarketOverview.astro](../../shriram-financial/src/components/MarketOverview.astro))
polls **`/data/market.json`** every ~60s. That JSON is produced server-side by
[`market_fetch.py`](market_fetch.py) (Python stdlib only — no pip/yfinance) on a
**~2-minute cron**, hitting Yahoo Finance's public API.

It's served from a **deploy-safe** path (`/var/www/market-data/`, outside the
webroot) via an nginx `location /data/`, so site deploys (`rm -rf /var/www/uat`)
never wipe it.

## One-time server setup (SSH to `ubuntu@13.234.46.220`)

> **Status:** already provisioned on the UAT box (2026-06-30) — script at
> `/opt/market/market_fetch.py`, cron `/etc/cron.d/market-fetch` (every 2 min),
> JSON at `/var/www/market-data/market.json`, nginx `location /data/` on the UAT
> vhost. The steps below are the reproducible recipe (e.g. for prod).

```bash
# 1. data dir + script (scp the file up from the repo first)
sudo mkdir -p /var/www/market-data /opt/market
scp -i <key.pem> deploy/market/market_fetch.py ubuntu@13.234.46.220:/tmp/
sudo cp /tmp/market_fetch.py /opt/market/market_fetch.py

# 2. first run (creates market.json)
sudo python3 /opt/market/market_fetch.py

# 3. cron every 2 minutes
echo '*/2 * * * * root /usr/bin/python3 /opt/market/market_fetch.py >> /var/log/market_fetch.log 2>&1' \
  | sudo tee /etc/cron.d/market-fetch
sudo chmod 644 /etc/cron.d/market-fetch

# 4. serve /data/ on the UAT vhost (add inside the server block, then reload)
#    location /data/ {
#        alias /var/www/market-data/;
#        default_type application/json;
#        add_header Cache-Control "no-store";
#    }
sudo nginx -t && sudo systemctl reload nginx
```

Verify: `curl -s https://dev.shriramfinancialservices.online/data/market.json | head -c 400`

## Notes
- Add the same `location /data/` block to the **prod** vhost when promoting to prod (one shared `market.json` serves both).
- Commodities are global futures in **USD** (COMEX/NYMEX) — they won't match MCX INR prices; currency pairs are INR.
- Symbols that Yahoo doesn't resolve are skipped automatically; tweak the `SYMBOLS` list in `market_fetch.py` to add/remove instruments.
