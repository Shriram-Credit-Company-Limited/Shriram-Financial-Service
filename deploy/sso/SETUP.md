# Hero → Meon SSO redirect (server-side)

The homepage hero "Get Started" posts the mobile number to **`/api/sso-route`**,
which calls Meon/way2wealth **`get_sso_route`** server-side (so the `secret_key`
never reaches the browser) and returns the pre-authenticated journey URL with
`utm_source=sfs`. The browser then redirects into it — mobile pre-filled, OTP
auto-triggered.

[`sso_service.py`](sso_service.py) is a tiny Python-stdlib HTTP service on
`127.0.0.1:8791`, run by **systemd** and reverse-proxied by nginx. Secrets live
in `/opt/sso/config.json` — **never** in the repo or client.

## One-time server setup (SSH to the box)

```bash
# 1. service + secret config (config.json is NOT in git)
sudo mkdir -p /opt/sso
scp -i <key.pem> deploy/sso/sso_service.py ubuntu@13.234.46.220:/tmp/
sudo cp /tmp/sso_service.py /opt/sso/sso_service.py

sudo tee /opt/sso/config.json >/dev/null <<'EOF'
{
  "endpoint": "https://signup.way2wealth.com/get_sso_route",
  "company": "way2wealth",
  "workflowName": "individual_new_uat",
  "secret_key": "<MEON_SECRET_KEY>",
  "redirect_url": "https://uat.shriramfinancialservices.online/",
  "utm_source": "sfs"
}
EOF
sudo chown -R www-data:www-data /opt/sso
sudo chmod 600 /opt/sso/config.json     # secret: owner-read only

# 2. systemd service
sudo tee /etc/systemd/system/sso-route.service >/dev/null <<'EOF'
[Unit]
Description=Hero SSO route endpoint
After=network.target

[Service]
User=www-data
ExecStart=/usr/bin/python3 /opt/sso/sso_service.py
Restart=always
RestartSec=2

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload
sudo systemctl enable --now sso-route

# 3. nginx: proxy the endpoint (add to the vhost server block, then reload)
#    location = /api/sso-route {
#        proxy_pass http://127.0.0.1:8791;
#        proxy_set_header Host $host;
#    }
sudo nginx -t && sudo systemctl reload nginx
```

Verify:
```bash
curl -s -X POST https://uat.shriramfinancialservices.online/api/sso-route \
  -H 'Content-Type: application/json' -d '{"mobile":"9876543210"}'
# -> {"url":"https://signup.way2wealth.com/way2wealth/individual_new_uat/<token>?utm_source=sfs"}
```

## Prod promotion
- Set `workflowName` to the **prod** workflow (e.g. `individual_new`) and the prod
  `secret_key` in `/opt/sso/config.json`, and `redirect_url` to the prod site.
- Add the same `location = /api/sso-route` block to the prod vhost. The service is
  shared (one box), so only the nginx location + config differ.
