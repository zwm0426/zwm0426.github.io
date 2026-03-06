import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind'; // 👉 关键修改 1：换成了 Astro 官方的 Tailwind 插件

// https://astro.build/config
export default defineConfig({
  site: 'https://zwm0426.github.io', 
  
  // 👉 关键修改 2：把 tailwind 放进 Astro 的 integrations（整合）数组里
  integrations: [
    react(),
    tailwind() 
  ],
  
  // 👉 之前这里的 vite: { plugins: [...] } 已经被彻底删除了

  server: {
    port: 3000,
    host: true,
  },
});