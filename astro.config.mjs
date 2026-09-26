// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // 正式域名由部署方通过 SITE_URL 注入(平台无关):canonical / og / hreflang 均以此为基准。
  // 未设置时这些标签退化为相对地址(本地开发 / PR 构建),见 docs/DEPLOY.md。
  site: process.env.SITE_URL || undefined,
  integrations: [mdx()],
});
