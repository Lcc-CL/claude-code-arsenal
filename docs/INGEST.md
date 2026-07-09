# 收录入库手册(三种模式)

> 原则:**条目必须人工核实后才上站**(来源、安装命令、许可证)。自动化负责跑腿,人负责把关。

## ① 手动入库 — 收到一条线索时

```bash
pnpm ingest add \
  --name esther-design-system \
  --category art \
  --summary "50 字内中文摘要" \
  --usage "试试对 Claude 说……" \
  --summaryEn "One-line English summary" \
  --usageEn "Try telling Claude …" \
  --command "npx skills add esthersjw/esther-design-system" \
  --source https://github.com/esthersjw/esther-design-system \
  --tags 设计,个人品牌
```

- `order` 自动接在现有最大值后;`addedAt`/`lastVerified` 自动写今天
- `--origin` 缺省 community;`--method` 从 command 前缀自动推断(npx / /plugin / manual)

## ② 批量入库 — 有一批候选时

准备 JSON 数组(字段同上,`command`→`command`,`usage`→`usageExample`):

```bash
pnpm ingest batch data/candidates.json
```

- 已存在的条目自动跳过;`"skip": true` 的条目忽略
- 入库后必跑 `pnpm build` 过 zod schema 校验

## ③ 推荐入库 — 每周自动

`scout-skills` Action 每周一爬 skills.sh 榜单前 30:

1. 自动开一个带完整对照表的 issue(已收录 ✅ / 新候选 🆕)
2. 同时产出预填好安装命令与来源的 `data/candidates.json`(Action artifact,本地跑 `pnpm scout` 也会生成)
3. 你只做两件事:把不要的标 `skip: true`,要的补 `summary`/`usageExample`(中英)
4. `pnpm ingest batch data/candidates.json && pnpm build`,CHANGELOG 记一笔,提 PR

本地随时手动跑:`pnpm scout`(可加 `--top 50`)。

## 收录标准(把关清单)

- [ ] 来源仓库/页面真实存在,安装命令亲测或经权威榜单佐证
- [ ] 摘要说清「做什么 + 凭什么值得收」,50 字内,不抄营销话术
- [ ] 许可证有特殊限制的(如 CC 非商用)在摘要注明
- [ ] 第三方 Skill 建议过一遍安全扫描(见资源库 NVIDIA 扫描器)
