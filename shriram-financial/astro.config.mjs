// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Change this to your real domain before deploying.
  site: 'https://www.shriramfinancialservices.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    // Cleaner URLs: /products/equity/ instead of /products/equity.html
    format: 'directory',
  },
});
