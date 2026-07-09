// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // 正式域名(Zeabur · 东京):canonical / og / hreflang 均以此为基准
  site: 'https://arm-your-agent.zeabur.app',
  integrations: [mdx()],
});
