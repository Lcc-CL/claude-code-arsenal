// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // 部署接入正式域名后替换(canonical / sitemap 依赖此值)
  site: 'https://claude-code-arsenal.vercel.app',
  integrations: [mdx()],
});
