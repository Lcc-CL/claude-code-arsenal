# Claude Code Arsenal(本站)— 项目上下文

> 「Claude Code 装备手册」网站本体 · Astro 5 + TypeScript strict + 原生 CSS
> 需求源:@docs/SPEC.md(v1 基线)+ v2 重设计(2026-07-08 站长授权,见 CHANGELOG.md)
> v2 起视觉基线 = src/styles/global.css 的双主题设计系统;reference/ 仅作 v1 内容存档

## 常用命令(照抄执行,不要自行猜测)
- 开发:   pnpm dev
- 类型门:  pnpm astro check
- 构建:   pnpm build && pnpm preview
- 星数同步: node scripts/sync-stars.mjs(CI 每周一自动跑)
- 收录入库: pnpm ingest add|batch / pnpm scout(三模式详见 @docs/INGEST.md;条目须人工核实)
- 新增依赖: 必须先说明理由并对照 SPEC 第 2 节获准

## 目录速览
- src/styles/global.css   全站唯一样式文件;:root 浅色 tokens + [data-theme="dark"] 暗色 tokens
- src/components/         Plate / SiteNav / Term / CopyButton / MemoryTree / CommandPalette ...
- src/content/            skills(yaml)/ resources(yaml)/ templates(md)/ guides(mdx)
- 双语:templates/guides 英文版放各自 en/ 子目录;skills/resources 用 *En 字段;/en 路由镜像页面;chrome 组件走 locale prop
- src/pages/              路由薄壳(3–13 行);版式与双语文案在 src/components/pages/ 共享组件里,改版只动那里
- scripts/                sync-stars.mjs 等自动化脚本
- reference/              v1 基准存档,只读

## 设计系统 v2(「活的终端」)
- 暗色为默认主题(终端本色),浅色为「打印版手册」;两套 tokens 都在 global.css,组件只用变量
- 品牌:ARSENAL_;Slogan:ARM YOUR AGENT_ / 把 Claude Code 武装到牙齿
- 语义化 ANSI 用色:绿=安装/成功、黄=强调、蓝=路径/链接、红=危险;不引入体系外新色
- 新增交互白名单:⌘K 命令面板、主题切换、装配序列打字动画;一切动效必须尊重 prefers-reduced-motion

## 代码约定
- 颜色只用 tokens 变量;新增颜色需同时给出双主题值并在本文件登记
- 禁止 Tailwind、UI 组件库、CSS-in-JS、Google Fonts CDN
- 内容一律来自 content collections,组件内不得硬编码条目文案
- 收录条目的事实(名称/安装命令/来源)必须联网核实后写入,注明 lastVerified
- 交互用原生 <script>,零框架;交互元素必须有 :focus-visible 焦点态
- commit 用 Conventional Commits(feat/fix/docs/chore/refactor)

## 雷区(违反会返工)
- 不删除/改写 collections 里已收录条目的事实字段(修正错误除外)
- 双主题都要验:改样式必须在 :dark 与 :light 下各看一遍
- 作者署名 Cc(@Lcc_MaxCc → x.com/Lcc_MaxCc)不得移除
- Astro 工具链踩坑:模板里禁用 {'\n'} 字面量(用 const nl);MDX 多行模板串会被 dedent(空白敏感内容走单行 export const + content 属性);@astrojs/mdx 锁 ^4

## 工作流
- 收工门:pnpm astro check 0 错误 + pnpm build 成功 + 双主题目测
- 涉及 >3 个文件的改动先给出计划,确认后再动手
- 每批收录/功能变更追加到 CHANGELOG.md(/changelog 页由它驱动)

## 语言规范
- 所有回复、计划、验收汇报一律使用简体中文
- 代码、命令、文件名、报错原文保持英文
