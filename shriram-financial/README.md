# Shriram Financial Services — Website

A fast, static marketing site built with **Astro 5 + Tailwind CSS 4 + TypeScript**.
Ships near-zero JavaScript, so it scores well on Core Web Vitals and SEO — important
for a financial brand. Structure matches the approved sitemap: **5 templates, 28 pages.**

## Tech stack & why

- **Astro 5** — static-site generator that outputs plain HTML, ideal for content sites.
- **Tailwind CSS 4** — utility styling via the Vite plugin (no separate config file needed).
- **TypeScript** — type-safe content.
- **Content Collections** — the 13 product pages are generated from JSON data, so you
  edit content in one place instead of maintaining 13 near-identical files.

## Project structure

```
src/
  navigation.ts            # Single source of truth for the sitemap (5 sections, 28 pages)
  content.config.ts        # Schema for product content
  content/products/*.json  # Content for the 13 product pages
  layouts/
    BaseLayout.astro       # HTML shell, header + footer, SEO meta
    ProductTemplate.astro   # T3 — reused by all 13 product pages
    AboutTemplate.astro     # T4 — reused by About / Regulatory / Support etc.
    ResearchTemplate.astro  # T5 — reused by the 3 Research pages
  components/
    Header.astro            # Sticky nav with dropdowns (desktop + mobile)
    Footer.astro            # Footer + regulatory disclosure placeholder
  pages/
    index.astro             # T1 Homepage
    product-hub/index.astro # T2 Product & Calculator Hub (working SIP calculator)
    products/[slug].astro   # Generates all 13 product pages
    products/index.astro    # Products listing
    about/*.astro           # 7 About pages
    research/*.astro        # 3 Research pages + index
    404.astro
deploy/
  nginx-shriram.conf       # Nginx server block
  deploy.sh                # Build + rsync to your server
```

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
```

## Build

```bash
npm run build      # outputs static files to dist/
npm run preview    # preview the production build locally
```

## Editing content

- **Product pages:** edit the JSON files in `src/content/products/`. No code changes needed.
- **Navigation / sitemap:** edit `src/navigation.ts`. The header, footer, and sitemap page all read from it.
- **Brand colors & fonts:** edit the tokens at the top of `src/styles/global.css`.
  Replace them with your exact Figma values to match the approved design.

## Deploy to your own server

1. **Provision** a Linux server (Ubuntu) with Nginx installed and your domain's DNS pointing to it.
2. **Create the web root:** `sudo mkdir -p /var/www/shriram`
3. **Configure Nginx:** copy `deploy/nginx-shriram.conf` to `/etc/nginx/sites-available/shriram`,
   symlink into `sites-enabled`, run `sudo nginx -t && sudo systemctl reload nginx`.
4. **Add HTTPS (required for a financial site):**
   `sudo apt install certbot python3-certbot-nginx && sudo certbot --nginx -d shriramfinancialservices.com -d www.shriramfinancialservices.com`
5. **Deploy:** edit the variables at the top of `deploy/deploy.sh`, then run `./deploy/deploy.sh`.
   It builds and rsyncs `dist/` to the server.

For automated deploys, wire `deploy.sh` into a CI pipeline (e.g. GitHub Actions on push to `main`).

## Things to complete before launch

- **Replace placeholder content** with approved copy from your Figma design.
- **Swap design tokens** in `global.css` for your exact Figma colors/fonts.
- **Regulatory & Support pages:** the regulatory disclosures and contact details are
  placeholders. These must be drafted and approved by a qualified compliance professional
  (SEBI registrations, risk disclosures, grievance redressal, etc.) before going live.
- **Forms** (Open Demat Account, Support contact): a static site can't process form
  submissions on its own. Connect a form service (Formspree, Web3Forms) or your own
  backend/onboarding system.
- **Antara Web Login:** link out to your secure login portal rather than collecting
  credentials on the static site.
