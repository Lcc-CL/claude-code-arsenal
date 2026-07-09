// Content Collections — zod schemas(SPEC 第 5 节)
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const skills = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/skills' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    origin: z.enum(['official', 'community']),
    category: z.enum(['doc', 'dev', 'art', 'team']),
    summary: z.string(),
    usageExample: z.string(),
    // 英文站字段(缺省回退中文)
    summaryEn: z.string().optional(),
    usageExampleEn: z.string().optional(),
    install: z.object({
      method: z.enum(['plugin', 'npx', 'manual']),
      command: z.string(),
    }),
    sourceUrl: z.string().url(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    // order:基准 HTML 中的陈列顺序(SPEC 外补充字段,保证与基准逐张一致)
    order: z.number(),
    addedAt: z.coerce.date(),
    lastVerified: z.coerce.date(),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/resources' }),
  schema: z.object({
    name: z.string(),
    url: z.string().url().optional(),
    desc: z.string(),
    descEn: z.string().optional(),
    badge: z.enum(['官方', '市场', '导航', '合辑', '中文', '垂直', '安全']),
    // coerce:sync-stars 写入的纯数字星数(如 577)也接受
    stars: z.coerce.string().optional(),
    installCommand: z.string().optional(),
    // installLabel:基准中按钮文案有三种(复制安装/复制命令/复制示例),需随数据保留
    installLabel: z.string().optional(),
    order: z.number(),
    // lastVerified:由 sync-stars Action 周更写入
    lastVerified: z.coerce.date().optional(),
  }),
});

const templates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/templates' }),
  schema: z.object({
    layer: z.enum(['global', 'project', 'dir', 'local']),
    title: z.string(),
    tabLabel: z.string(),
    scopeLabel: z.string(),
    termTitle: z.string(),
    // savePath / loadTiming / put / avoid 允许携带基准中的内联标记(<b>/.dont/.mono)
    savePath: z.string(),
    loadTiming: z.string(),
    put: z.array(z.string()),
    avoid: z.array(z.string()),
    order: z.number(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    updatedAt: z.coerce.date(),
  }),
});

export const collections = { skills, resources, templates, guides };
