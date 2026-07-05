import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://teddy-career-site.vercel.app',
  base: '/',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: { prefixDefaultLocale: true },
  },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
