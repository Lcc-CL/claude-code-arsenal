# CHANGELOG

## 2026-07-09 · 入库流水线 + esther-design-system 收录 + 页面组件化

- 新收录 esther-design-system(ESTHER不二的个人 IP 设计系统,274★,CC 署名·非商用)
- 入库三模式落地:`pnpm ingest add`(手动)/ `pnpm ingest batch`(批量)/ `pnpm scout`(推荐,爬 skills.sh 榜单),详见 docs/INGEST.md
- 新增 scout-skills Action:每周一爬榜单前 30,自动开 issue 附对照表与预填 candidates.json
- 重构:7 个双语共享页面组件(components/pages/),14 个路由文件瘦身为 3–13 行薄壳,改版只动一处

## 2026-07-08 · v3 交互升级 + 中英双语

- 首页装配终端升格为可交互 REPL:help / ls / install(直接复制安装命令)/ go / theme / lang / whoami
- ⌘K 面板新增 `:` 命令模式(:dark :light :en :zh :top);导航底沿新增阅读进度磷光带
- 技能卡升级:安装命令一键复制 + 来源域名 + ✓ 核实日期;筛选零结果补空态
- 暗色主题磷光辉光与顶部氛围光;hero 大字加描边幽灵层
- 全站中英双语:/en 全套路由、四模板与四指南英文版、40 条数据英文字段、导航语言切换、hreflang
- 设计流程:经 find-skills 检索并评估 bergside/futuristic 技能,采纳其工程纪律(空态/显式状态/token 锚定)

## 2026-07-08 · v2「活的终端」重设计

- 全站重设计:暗色终端为默认主题,浅色「打印版手册」一键切换(`:light` / `:dark`)
- 新 Slogan:ARM YOUR AGENT_ · 把 Claude Code 武装到牙齿
- 新交互:⌘K 终端风命令面板(全站检索)、首页装配序列打字动画、导航当前页高亮
- 收录扩充至 25 个 Skills(官方 17 + 社区 8)与 15 席资源
- 自我更新:GitHub Action 每周一自动刷新资源星数并开 PR
- 页脚与关于页附作者署名 Cc(@Lcc01_cc)

## 2026-07-08 · 社区精选首批收录

- 新增 6 条社区 Skills:systematic-debugging / test-driven-development / brainstorming(obra/superpowers)、agent-browser / vercel-react-best-practices / find-skills(skills.sh 榜单)

## 2026-07-08 · P1 内容化上线

- 四个 content collections 建立,基准内容一字不差迁移:17 官方 Skills、12 资源、4 层 CLAUDE.md 模板、4 篇指南
- 首页 / 技能库(筛选)/ 模板库(Tabs+复制+下载)/ 指南 / 资源库 / 关于 / 404 全部成型
