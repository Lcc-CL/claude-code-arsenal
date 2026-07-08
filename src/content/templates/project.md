---
layer: project
title: 项目事实层
tabLabel: "② 项目 ./CLAUDE.md"
scopeLabel: SCOPE·本仓库
termTitle: "./CLAUDE.md"
savePath: '仓库根目录 <span class="mono">./CLAUDE.md</span>,提交进 git 与团队共享'
loadTiming: 在仓库内(含子目录)启动即加载
put:
  - '五件事:<b>命令、结构、约定、雷区、工作流</b>。全是 Claude 读代码猜不出、猜错代价又高的东西;其中「照抄执行的命令」是单条价值最高的信息'
avoid:
  - '<span class="dont">架构长篇复述</span>(用 @ 引用 docs 即可)、Claude 一个会话就能自学的内容、多步骤流程(该做成 Skill)'
order: 2
---
# MyApp — 项目上下文

> 电商后台管理系统 · Next.js 15 + TypeScript + Prisma + PostgreSQL
> 详细架构见 @docs/architecture.md,不在此复述

## 常用命令(照抄执行,不要自行猜测)
- 开发:   pnpm dev
- 全部测试: pnpm test
- 单个测试: pnpm test -- --grep "关键词"
- 质量门:  pnpm lint && pnpm typecheck
- 迁移:   pnpm db:migrate(仅本地库;线上迁移走 CI)

## 目录速览
- app/        路由与页面(App Router)
- app/api/    API 路由,鉴权中间件在 app/api/_lib/
- lib/        领域逻辑与数据访问封装
- prisma/     schema 与迁移
- tests/      e2e;单测与源码同目录 *.test.ts

## 代码约定
- TypeScript strict,禁止 any;组件一律具名导出
- 数据访问只走 lib/db.ts 封装,不要直接 new PrismaClient
- 样式仅用 Tailwind,不写内联 style、不引入新 UI 库
- 新功能必须带 Vitest 用例,放在被测文件同目录

## 雷区(违反会出事故)
- prisma/migrations/ 里已存在的迁移文件一律只读
- app/api/webhooks/* 的签名校验逻辑不许改动
- CI 运行在 Node 20,不要使用更高版本才有的 API

## 工作流
- 涉及 >3 个文件的改动:先给出计划,确认后再动手
- 收工前必须通过:pnpm lint && pnpm typecheck && pnpm test
