import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://zwm0426.github.io', 
  base: '/newHomePage',
  integrations: [react()],
  vite: {
    plugins: [tailwind()],
  },
  server: {
    port: 3000,
    host: true,
  },
});
