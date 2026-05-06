import { defineConfig } from 'astro/config';

// Deployed at https://msalman000.github.io/portfolio
export default defineConfig({
  site: 'https://msalman000.github.io',
  base: '/portfolio/',
  trailingSlash: 'always',
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
});