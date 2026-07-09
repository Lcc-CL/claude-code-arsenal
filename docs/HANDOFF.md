# HANDOFF · 交接文档(2026-07-09)

> 给下一个会话/代理的接续说明。当前状态:**v3 全量验收通过,等待推送 GitHub 与部署。**

## 项目一句话

「Claude Code Arsenal · 装备手册」——收录 Skills 与 CLAUDE.md 模板的双语静态站(Astro 5 + strict TS + 原生 CSS,零框架 JS),暗色终端为默认主题,slogan:ARM YOUR AGENT_ / 把 Claude Code 武装到牙齿。作者署名 Cc(@Lcc01_cc → x.com/Lcc01_cc),**署名不得移除**。

## 当前状态(验收已过)

- 分支:`redesign/v2`(6 个 commit 领先 main;ancestry 线性:main ← feat/p1-content ← redesign/v2,可直接 ff 合并)
- 收录:**29 Skills(官方 17 + 社区 12)· 17 资源 · 4 层模板 ×2 语言 · 4 指南 ×2 语言**,23 页构建
- 门禁:`pnpm astro check` 0 错误;`pnpm build` 通过;中文模板复制本体与源文件逐字节一致;全路由 200/404 正常;双语 hreflang/canonical/og 齐全

## 架构速记(改版必读)

- **版式与双语文案只在 `src/components/pages/` 七个共享组件里**;`src/pages/**` 全是 3–13 行薄壳
- 双语数据:templates/guides 英文版在各自 `en/` 子目录(id 前缀 `en/` 区分);skills/resources 用 `summaryEn` 等字段回退中文
- 主题:`:root` 浅色 + `[data-theme="dark"]` 暗色 tokens 全在 `global.css`;改样式必须双主题各验一遍
- 签名交互:`ArmingTerminal.astro`(首页 REPL,一套脚本双语)、`CommandPalette.astro`(⌘K + `:` 命令)、`SiteNav`(进度条/主题/语言切换)

## 自动化(部署 GitHub 后生效)

- `sync-stars.yml`:每周一刷新资源星数开 PR;`scout-skills.yml`:每周一爬 skills.sh 榜单开 issue + candidates artifact
- 入库三模式:`pnpm ingest add` / `pnpm ingest batch <json>` / `pnpm scout`,手册在 @docs/INGEST.md;**条目必须人工核实**(许可证限制写进摘要,如 esther-design-system 的 CC 非商用)
- 策展原则:同类只留最好的一个;家族合辑进资源库不占技能卡位;落选理由记 CHANGELOG

## 待办(按优先级)

1. **推送 GitHub**:gh CLI 已在安装;等站长 `gh auth login` 后 `gh repo create` + push(main ff 到 redesign/v2 后推)
2. **部署**:Vercel/Cloudflare Pages(构建 `pnpm build`,输出 `dist`,Node 20);上线后把 `astro.config.mjs` 的 `site` 占位符换成真域名(canonical/og 依赖)
3. 手动验:⌘K、REPL、主题/语言切换手感;375px 窄屏;Lighthouse 四项 ≥95(SPEC 目标,未跑过)
4. P2 余项:Pagefind 搜索、/skills/[slug] 详情页、sitemap+RSS、workflow_dispatch 实测两个 Action
5. 中文 404/styleguide 未做英文版(低优先)

## 踩坑备忘(别再踩)

- Astro 模板里禁用 `{'\n'}` 字面量(ts1381)→ frontmatter `const nl = '\n'`
- MDX 多行模板串会被 dedent → 空白敏感内容用单行 `export const` + Term 的 `content` 属性
- `@astrojs/mdx` 锁 `^4`(v7 配 Astro 6);`re.sub` 替换串里的 `\n` 会被展开,用 lambda
- 本机 curl 走 127.0.0.1:7897 代理,测 localhost 加 `--noproxy '*'`
- skills.sh 解析器若命中 0 条会报错——页面结构变了就更新 `ingest.mjs` 的 href 正则

## 历史决策存档

reference/claude-code-arsenal.html 是 v1 基准(只读存档);v2 起视觉基线 = global.css 双主题设计系统(站长 2026-07-08 授权重设计);SPEC.md 是 v1 需求源,v2/v3 变更以 CHANGELOG 为准。完整规则见根目录 @CLAUDE.md。
