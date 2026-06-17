// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.shriramfinancialservices.com',
  // hybrid = all pages stay static-rendered EXCEPT routes that opt in
  // with `export const prerender = false` (e.g. API routes).
  output: 'hybrid',
  adapter: node({ mode: 'middleware' }),
  // Static assets live outside the project in /assets (images + videos).
  // Astro copies this folder to dist/ as-is, preserving the same URL paths.
  publicDir: '../assets',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    // Cleaner URLs: /products/equity/ instead of /products/equity.html
    format: 'directory',
  },
});
