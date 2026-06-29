// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.shriramfinancialservices.com',
  output: 'static',
  adapter: node({ mode: 'middleware' }),
  // Static assets live outside the project in /assets (images + videos).
  // Astro copies this folder to dist/ as-is, preserving the same URL paths.
  publicDir: '../assets',
  integrations: [sitemap()],
  // Map clean/legacy grievance URLs to the canonical About page.
  redirects: {
    '/grievance': '/about/grievance-redressal/',
    '/grievance-redressal': '/about/grievance-redressal/',
    '/grievance-redressal.html': '/about/grievance-redressal/',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    // Cleaner URLs: /products/equity/ instead of /products/equity.html
    format: 'directory',
  },
});
