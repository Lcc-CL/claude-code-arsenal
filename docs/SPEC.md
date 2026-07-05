# Claude Code Arsenal · 建站方案 SPEC v1.1

> 本文件是唯一需求来源(Single Source of Truth)。执行者:Claude Code 智能体。
> 视觉基准文件:`reference/claude-code-arsenal.html`(仓库内只读,像素级对照)。
> 冲突裁决顺序:本 SPEC > 视觉基准文件 > 你的默认习惯。拿不准就停下来问,不要自行发挥。

---

## 0. 一句话目标

把现有单页 `claude-code-arsenal.html` 升级为一个**多页、内容驱动、可持续更新**的静态网站:
「Claude Code 装备手册」—— 收录 Skills 与 CLAUDE.md 模板,供作者自学与开发者社区参考。

交付边界:纯静态站,无后端、无数据库、无登录。内容更新 = 改数据文件 + git push 自动部署。

---

## 1. 项目概览

| 项 | 内容 |
|---|---|
| 站点名 | Claude Code Arsenal · 装备手册 |
| 用户 | ① 站长本人(学习笔记) ② 中文 Claude Code 开发者(查阅 / 复制 / 收藏) |
| 核心动作 | 找到一个 Skill 或模板 → 一键复制安装命令 / 模板全文 → 回终端开工 |
| 成功标准 | Lighthouse 四项 ≥ 95;移动端完整可用;新增一条收录 ≤ 3 分钟(只改一个 yaml) |
| 非目标 | 用户系统、评论后端、实时爬虫、任何需要服务器常驻的功能 |

---

## 2. 技术选型(不得替换)

| 层 | 选型 | 理由 |
|---|---|---|
| 框架 | **Astro ^5**(Node ≥ 20,pnpm) | 内容型站点最优:默认零 JS、Content Collections 管数据、MDX 写教程 |
| 样式 | **原生 CSS + Design Tokens**(单个 `global.css`) | 视觉基准就是原生 CSS,可整段移植,保真度 100%;**禁止引入 Tailwind / UI 组件库 / CSS-in-JS** |
| 交互 | 原生 `<script>`(复制 / 筛选 / Tabs / 入场动画) | 逻辑已在基准文件写好,直接移植 |
| 内容 | Content Collections:`skills`、`resources` 用 YAML(data collection),`templates` 用 MD + frontmatter,`guides` 用 MDX | 一条收录 = 一个小文件,PR 友好 |
| 字体 | `@fontsource/jetbrains-mono` 自托管(400/500/700) | 主要读者在中国大陆,**禁止使用 Google Fonts CDN**;中文走系统字体栈 |
| 搜索 | **Pagefind**(P2 引入,构建期静态索引) | 无后端全文搜索 |
| 部署 | Vercel 或 Cloudflare Pages 首选;国内访问不佳时自托管 Nginx / 腾讯 EdgeOne / Zeabur | push 即发布 |
| 质量门 | TypeScript strict;`pnpm astro check` + `pnpm build` | 每阶段验收必跑 |

---

## 3. 信息架构与路由

```
/                      首页:铭牌 + Hero(记忆层级图·签名元素)+ 三步快速开始 + 精选入口
/skills                技能目录:官方 17 + 社区精选;类别筛选;P2 加 Pagefind 搜索
/skills/[slug]         技能详情页(P2):完整介绍、安装方式、调用示例、来源、相关技能
/claude-md             CLAUDE.md 模板库:四层 Tabs(全局/项目/目录/个人),复制 + 下载 .md
/guide                 学习指南索引
/guide/[slug]          单篇指南(MDX):编写守则 / SKILL.md 剖析 / 高频排障 / 术语表
/resources             社区资源库(12 席,含安装命令复制)
/changelog             更新日志(P2,来源 CHANGELOG.md)
/about                 关于本站 + 权威来源清单(即原第 07 章)+ 投稿收录说明
404                    风格化 404(终端风:command not found)
```

导航(粘性,沿用基准 `.nav`):技能库 / CLAUDE.md 模板 / 学习指南 / 资源库 / 关于。

---

## 4. 设计系统(像素级,不得擅改)

### 4.1 Design Tokens —— 原样写入 `src/styles/global.css` 的 `:root`

```css
:root{
  --paper:#F3F4ED;  --panel:#FBFBF6;  --ink:#13211A;
  --muted:#5B6B62;  --faint:#8B978E;
  --line:#D9DDD0;   --line-strong:#B9C0B2;
  --blue:#2743D6;   --blue-deep:#1B2F9E;  --blue-wash:#E7EBFB;
  --hl:#FFE44E;     --hl-soft:#FFF3B0;
  --term-bg:#0D1912; --term-edge:#1E2E24; --term-ink:#D9E6DC;
  --term-dim:#7E9386; --term-green:#7CE3A5; --term-yellow:#FFD84D; --term-blue:#93B2FF;
  --danger:#B33A2B;
  --mono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;
  --sans:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Noto Sans SC","Microsoft YaHei",sans-serif;
}
```

规则:页面上出现的每一个颜色**必须**取自以上变量;确需新增,先在本文件登记再使用。

### 4.2 全局氛围

- 背景:`--paper` + 36px 方格网(两条 `linear-gradient`,rgba(19,33,26,.045),照抄基准 body)。
- 选中文本 `::selection{background:var(--hl)}`;正文 15.5px / 行高 1.75;`html{scroll-padding-top:76px}`。

### 4.3 字体职责

| 角色 | 字体 | 用法 |
|---|---|---|
| 展示标题 / 章节编号 / 标签 / 代码 | JetBrains Mono | 大标题 700、字距 -0.02em;小标签 11px、字距 0.1–0.22em、大写 |
| 中文正文与标题 | 系统 sans 栈 | 章节 h2 用 800 加粗系统字 |

### 4.4 组件库存(基准类名 → Astro 组件,样式 1:1 移植)

| 组件 | 基准类名 | 要点 |
|---|---|---|
| `Plate` 手册铭牌 | `.plate` | 顶部编号条 + 旋转 -1.2° 的「持续修订」印章 |
| `SiteNav` | `.nav` | 粘性、毛玻璃、mono 圆片锚点;移动端横向滚动 |
| `MemoryTree` ★签名 | hero `.term` | 记忆加载层级图:文件树 + 三色徽章(启动加载/懒加载/gitignore)+ 闪烁光标;首页 Hero 右侧,`/claude-md` 页顶部复用 |
| `Term` 终端块 | `.term/.term-bar/.tdot` | 深绿黑面板、红黄绿三点、右上角 CopyButton |
| `CopyButton` | `.copy` `.copy.light` | 点击→「已复制 ✓」1.6s;支持 `data-copy` 与 `data-copy-target`;clipboard API + execCommand 兜底 |
| `ChapterHead` | `.ch-tag/h2/.ch-lede` | 「第 0X 章 / EN-TAG」+ 延伸细线 |
| `Highlight` | `.hl` | 荧光笔标记(skew 渐变);全站强调统一用它,不靠粗体堆砌 |
| `SkillCard` | `.card` | mono 名称 + 类别章 + 描述 + 「试试对 Claude 说」虚线示例框;hover 上浮 2px |
| `CatChip` | `.cat.doc/dev/art/team` | 文档=草绿 / 开发=钴蓝 / 创意=陶橙 / 协作=荧黄 |
| `FilterBar` | `.filters/.fbtn` | 选中态:墨底纸字 |
| `ResourceRow` | `.res` | 三栏:名称链接 / 描述 / 徽章+星数+复制按钮;≤820px 折单栏 |
| `Tabs` | `.tabs/.tab/.panel` | 模板库四层切换;选中 = 墨底纸字 |
| `KvTable` | `.kv` | 保存路径 / 加载时机 / 放什么 / 别放什么 |
| `RuleColumns` | `.rules/.rule-col` | DO(+ 绿)/ DON'T(– 红)双栏,每条带 `.why` 灰注 |
| `Faq` | `details/summary` | ▸ 展开旋转 90° |
| `SecNote` | `.sec-note` | 荧黄底安全提示框 |
| `Reveal` | `.reveal` | IntersectionObserver 入场(上移 14px 渐显);`prefers-reduced-motion` 时直接显示 |

### 4.5 动效与无障碍(硬性)

- 动效白名单:入场 Reveal、hover 微动、复制反馈、光标闪烁。**禁止**视差与长循环动画。
- 所有交互元素有 `:focus-visible` 蓝色焦点(offset 2px);`details/summary` 键盘可达。
- 对比度:`--ink`/`--paper` 与 `--muted`/`--paper` 保持 ≥ 4.5:1(现值达标,禁止调淡)。
- 颜色不单独传义,徽章必须伴随文字。

---

## 5. 内容模型(Content Collections,zod 校验)

### 5.1 `skills`(`src/content/skills/*.yaml`,一条一文件)

```yaml
# src/content/skills/frontend-design.yaml
name: frontend-design
slug: frontend-design
origin: official          # official | community
category: dev             # doc | dev | art | team
summary: Anthropic 工程师迭代打磨的前端设计品味 Skill,专治「AI 味」同质化界面。
usageExample: 应用 frontend-design skill 重做这个落地页
install:
  method: plugin          # plugin | npx | manual
  command: /plugin install example-skills@anthropic-agent-skills
sourceUrl: https://github.com/anthropics/skills
tags: [设计, 前端]
featured: true
addedAt: 2026-07-06
lastVerified: 2026-07-06
```

### 5.2 `resources`(`src/content/resources/*.yaml`)

字段:`name, url?, desc, badge(官方|市场|导航|合辑|中文|垂直|安全), stars?, installCommand?, order`。

### 5.3 `templates`(`src/content/templates/*.md`)

frontmatter:`layer(global|project|dir|local), title, savePath, loadTiming, put[], avoid[], order`;
正文 = 模板全文(页面上被复制 / 下载的内容本体)。

### 5.4 `guides`(`src/content/guides/*.mdx`)

frontmatter:`title, description, order, updatedAt`。
首批四篇:编写守则(DO/DON'T)、SKILL.md 逐字段剖析、高频排障、术语表。

> **内容迁移规则:所有文案一字不差地从 `reference/claude-code-arsenal.html` 平移**
> (17 条 skills、12 条 resources、4 份模板、守则与 FAQ 全文)。不要改写、不要润色、不要增删条目。

---

## 6. 页面规格摘要

- **首页**:铭牌 → Hero(左文案 + 统计片,右 MemoryTree)→ 三步快速开始(三张 Term 卡)→ 「精选」(featured skills 3 张 + 资源 3 行,各带「查看全部 →」)→ 页脚。文案沿用基准。
- **/skills**:ChapterHead + FilterBar(全部/文档/开发/创意/协作 × 官方/社区)+ 卡片网格;计数随筛选实时变化;P2 前卡片外链 `sourceUrl`,P2 后进详情页。
- **/claude-md**:页首复用 MemoryTree;Tabs 四层,左 KvTable 右 Term 模板;每层「复制模板」+「下载 .md」(Blob 下载,文件名:全局/项目/目录层为 `CLAUDE.md`,个人层为 `CLAUDE.local.md`)。
- **/guide**:索引卡列表 → MDX 详情(左内容右自动 TOC,≤980px 隐藏 TOC)。
- **/resources**:ResourceRow 列表 + 星数快照脚注(沿用基准 fineprint 文案)。
- **/about**:站点定位 + 来源清单(SourceGrid 样式)+ 投稿收录说明(指向 GitHub 仓库 PR 流程:新增一个 yaml 即可)。
- **404**:Term 面板内 `command not found: 该页面`,附返回首页链接。

---

## 7. 里程碑与验收(DoD)

> 每阶段「完成」的定义:`pnpm astro check` 0 错误、`pnpm build` 成功、
> 本阶段验收清单人工核对全过、按 Conventional Commits 提交。

### P0 脚手架 + 设计系统(约半天)
1. `pnpm create astro`(strict TS、空模板)+ fontsource 字体接入。
2. `global.css` 落地全部 tokens 与全局氛围(方格背景、selection、focus)。
3. 组件:Plate / SiteNav / Term / CopyButton / ChapterHead / Highlight / Reveal / Footer。
4. 建 `/styleguide` 页陈列以上组件全部状态(默认 / hover / focus / 复制成功 / reduced-motion)。

**验收**:styleguide 与基准 HTML 逐块目测一致;键盘 Tab 全链路有焦点;375px 宽无横向滚动。

### P1 内容化与页面成型(1–2 天)
1. 四个 collections + zod schema;把基准 HTML 全部内容迁移为数据文件(17/12/4/4)。
2. 完成首页、/skills(含筛选)、/claude-md(含 Tabs + 下载)、/guide、/resources、/about、404。
3. 站点级 SEO:每页 title/description、canonical、favicon(墨底荧黄 `_` 光标)。

**验收**:与基准单页内容 100% 对齐(逐段 diff 文案);筛选 / Tabs / 复制 / 下载全可用;Lighthouse 移动端四项 ≥ 95。

### P2 检索与自动化(约 1 天)
1. Pagefind:构建后索引;/skills 顶部搜索框(结果高亮沿用 `.hl`)。
2. `/skills/[slug]` 详情页 + 上一/下一条导航。
3. `@astrojs/sitemap`、guides RSS、静态 `og.png`(铭牌风格)。
4. GitHub Action `sync-stars.yml`:每周一 cron 调 `api.github.com/repos/:owner/:repo` 刷新 resources 的 `stars` 与 `lastVerified`,提交 PR(内置 GITHUB_TOKEN;404 / 限流时跳过该条并在 PR 描述记录)。
5. `/changelog` 页。

**验收**:搜索「pdf」「审查」能命中;Action 手动触发跑通一次;`/sitemap-index.xml` 可访问。

### P3 可选增强(按需)
英文版 i18n(`/en` 前缀)、giscus 评论(GitHub Discussions)、暗色模式(需先提交暗色 token 表获批)、PWA。

---

## 8. 目录结构(目标形态)

```
arsenal/
├── CLAUDE.md                       # 项目记忆(仓库根,已提供)
├── docs/
│   ├── SPEC.md                     # 本文件
│   └── PROMPTS.md                  # 分阶段投喂提示词
├── reference/
│   └── claude-code-arsenal.html    # 视觉与内容基准,只读
├── src/
│   ├── styles/global.css
│   ├── components/                 # Plate.astro, Term.astro, CopyButton.astro ...
│   ├── layouts/Base.astro
│   ├── content/
│   │   ├── config.ts               # zod schemas
│   │   ├── skills/*.yaml
│   │   ├── resources/*.yaml
│   │   ├── templates/*.md
│   │   └── guides/*.mdx
│   └── pages/                      # index / skills / claude-md / guide / resources / about / 404
├── public/                         # favicon.svg, og.png
└── .github/workflows/sync-stars.yml   # P2
```

---

## 9. 红线(违反即返工)

1. 不引入 SPEC 之外的依赖;每个新依赖必须在 PR 描述说明理由。
2. 不改 tokens 数值、不换字体、不加新配色;暗色模式未获批前不做。
3. `reference/` 只读;内容迁移只许平移,不许改写。
4. 不把内容写死进组件——一切可变文案与条目都来自 collections。
5. 与 SPEC 冲突或 SPEC 未覆盖之处:先提问,确认后再动手。
