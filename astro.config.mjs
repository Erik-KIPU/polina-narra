import { defineConfig } from 'astro/config';

// SITE_URL и BASE_PATH задаются при сборке на хостинге (см. .github/workflows/deploy.yml).
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },
});
