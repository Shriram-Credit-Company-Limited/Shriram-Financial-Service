# UAT environment — `uat.shriramfinancialservices.online`

UAT serves the **`UAT` branch** from `/var/www/uat` on the prod server
(`13.234.46.220`), behind its own nginx vhost. It is `noindex` so search
engines don't crawl the test site.

The repo automates the **deploy** only. DNS, the nginx vhost, and TLS are
one-time steps you run yourself (the deploy SSH key is a CI secret, so I can't
do these from the repo).

---

## 1. DNS (your domain provider, `shriramfinancialservices.online` zone)

Add an **A record**:

| Type | Name  | Value           | Proxy / TTL        |
|------|-------|-----------------|--------------------|
| A    | `uat` | `13.234.46.220` | DNS-only, auto TTL |

> If `shriramfinancialservices.online` is on Cloudflare, set the proxy to
> **DNS only (grey cloud)** for the initial certbot run, then you may re-enable
> the proxy afterwards.

Wait until `uat.shriramfinancialservices.online` resolves to `13.234.46.220`
(`dig +short uat.shriramfinancialservices.online`) before running certbot.

## 2. nginx vhost + docroot (on the server, via SSH)

```bash
sudo mkdir -p /var/www/uat
sudo chown -R www-data:www-data /var/www/uat

sudo tee /etc/nginx/sites-available/uat.shriramfinancialservices.online >/dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name uat.shriramfinancialservices.online;

    root /var/www/uat;
    index index.html;

    add_header X-Robots-Tag "noindex, nofollow" always;

    location / {
        try_files $uri $uri/ =404;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/uat.shriramfinancialservices.online \
            /etc/nginx/sites-enabled/uat.shriramfinancialservices.online
sudo nginx -t && sudo systemctl reload nginx
```

## 3. TLS (after DNS resolves)

```bash
sudo certbot --nginx -d uat.shriramfinancialservices.online
```

Certbot adds the `443` listener and an HTTP→HTTPS redirect to the vhost above.

---

## 4. Deploying

Push to the **`UAT`** branch and the
[`Build and Deploy (UAT)`](../../.github/workflows/deploy-uat.yml) workflow
builds the site and ships `dist/client` to `/var/www/uat` (it `mkdir -p`s the
docroot, so the very first push also creates it).

```bash
git checkout UAT
git merge main          # bring in changes to stage, or commit straight to UAT
git push origin UAT     # -> deploys to uat.shriramfinancialservices.online
```

Prod is untouched: `deploy.yml` (push to `main`) → `/var/www/html`,
`deploy-uat.yml` (push to `UAT`) → `/var/www/uat`, separate zip names and
docroots.
