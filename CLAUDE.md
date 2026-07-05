# Claude Code Arsenal(本站)— 项目上下文

> 「Claude Code 装备手册」网站本体 · Astro 5 + TypeScript strict + 原生 CSS
> 唯一需求来源:@docs/SPEC.md;视觉与内容基准:reference/claude-code-arsenal.html(只读)

## 常用命令(照抄执行,不要自行猜测)
- 开发:   pnpm dev
- 类型门:  pnpm astro check
- 构建:   pnpm build && pnpm preview
- 新增依赖: 必须先说明理由并对照 SPEC 第 2 节获准

## 目录速览
- src/styles/global.css   全站唯一样式文件,tokens 定义于 :root
- src/components/         Plate / SiteNav / Term / CopyButton / MemoryTree ...
- src/content/            skills(yaml)/ resources(yaml)/ templates(md)/ guides(mdx)
- src/pages/              路由页,只做组装,不写业务文案
- reference/              基准文件,任何情况下不得修改

## 代码约定
- 颜色只用 :root 里的 CSS 变量;发现「新颜色需求」= 先停下来问
- 禁止 Tailwind、UI 组件库、CSS-in-JS、Google Fonts CDN
- 内容一律来自 content collections,组件内不得硬编码条目文案
- 交互用原生 <script>,零框架;动效必须尊重 prefers-reduced-motion
- 交互元素必须有 :focus-visible 焦点态
- commit 用 Conventional Commits(feat/fix/docs/chore/refactor)

## 雷区(违反会返工)
- 不改 tokens 数值、不换字体、不加配色、不做未获批的暗色模式
- 不改写 reference 里的既有文案:迁移 = 一字不差平移
- 不超范围重构:每次只做当前 Phase 清单内的事

## 工作流
- 按 @docs/PROMPTS.md 的 Phase 顺序推进,一个 Phase 一个分支
- 每个 Phase 收工门:pnpm astro check 0 错误 + pnpm build 成功 + 该阶段验收清单逐条自查并在回复中汇报
- 涉及 >3 个文件的改动先给出计划,确认后再动手
- SPEC 未覆盖或有歧义:提出 1–3 个方案与推荐项,等确认
