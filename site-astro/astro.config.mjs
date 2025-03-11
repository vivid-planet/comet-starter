// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'server', // SSR, no SSG
  adapter: node({
    mode: 'standalone'
  }),
  server: { port: 3000 }
});