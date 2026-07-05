# PROMPTS.md · 分阶段投喂提示词

> 用法:开一个空仓库,放入 CLAUDE.md(根目录)、docs/SPEC.md、docs/PROMPTS.md、
> reference/claude-code-arsenal.html 四个文件 → 在仓库根目录运行 `claude` →
> 按顺序复制下面的提示词。一次只发一个 Phase,验收通过再发下一个。

---

## Phase 0 · 脚手架 + 设计系统

```
通读 CLAUDE.md 与 docs/SPEC.md 全文,然后执行 SPEC 第 7 节的 P0:
1. 初始化 Astro 5 项目(strict TS、pnpm、空模板),接入 @fontsource/jetbrains-mono;
2. 从 reference/claude-code-arsenal.html 平移全部 :root tokens 与全局氛围到 src/styles/global.css;
3. 实现组件:Plate / SiteNav / Term / CopyButton / ChapterHead / Highlight / Reveal / Footer;
4. 建 /styleguide 页陈列以上组件的全部状态。
先给出文件清单级的实施计划等我确认,再动手。完成后运行 pnpm astro check 与 pnpm build,
并逐条自查 P0 验收清单,汇报结果与截图说明。
```

## Phase 1 · 内容化与页面成型

```
执行 SPEC 第 7 节的 P1:
1. 按 SPEC 第 5 节建立四个 content collections 与 zod schema;
2. 将 reference/claude-code-arsenal.html 的全部内容一字不差迁移为数据文件
   (17 条 skills、12 条 resources、4 份 templates、4 篇 guides);
3. 完成首页、/skills(筛选)、/claude-md(Tabs+复制+下载)、/guide、/resources、/about、404;
4. 每页补齐 title/description/canonical 与 favicon。
迁移完成后,逐条对照基准文件 diff 文案并汇报任何出入(应为零)。
收工门:astro check + build 通过,P1 验收清单逐条自查汇报。
```

## Phase 2 · 检索与自动化

```
执行 SPEC 第 7 节的 P2:Pagefind 搜索、/skills/[slug] 详情页、sitemap + RSS + og.png、
.github/workflows/sync-stars.yml(周更 resources 星数并开 PR)、/changelog。
Action 写完后用 workflow_dispatch 手动触发一次并贴出运行结果。
收工门同前。
```

## Phase 3 · 可选增强(按需单发)

```
我想做 P3 中的 [i18n 英文版 / giscus 评论 / PWA]。
先给出改动范围、新增依赖与风险评估,待我确认后实施。
（暗色模式需先提交完整暗色 token 对照表,获批后才允许动工。）
```

---

## 日常维护提示词

**新增一条 Skill 收录**
```
在 src/content/skills/ 新增 <slug>.yaml:name=…,origin=…,category=…,
summary=…(50 字内),usageExample=…,install.command=…,sourceUrl=…。
按 schema 校验,跑 build,给我预览截图说明。不要改其他文件。
```

**更新资源星数**
```
手动触发 sync-stars workflow 的逻辑:仅更新 src/content/resources/*.yaml 的
stars 与 lastVerified 字段,输出变更 diff,不动其他字段。
```

**新写一篇指南**
```
在 src/content/guides/ 新增 <slug>.mdx,主题:__。frontmatter 齐全,
排版只用现有组件与 .hl 强调,不引入新样式。
```

**部署(首次)**
```
把本仓库接入 Vercel(或 Cloudflare Pages):给出控制台需要的构建命令、
输出目录与 Node 版本设置,列出我需要手动点击的每一步;涉及账号授权的操作由我执行。
```
