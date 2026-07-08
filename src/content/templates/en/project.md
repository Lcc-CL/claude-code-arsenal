---
layer: project
title: Project facts layer
tabLabel: "② Project ./CLAUDE.md"
scopeLabel: SCOPE·THIS REPO
termTitle: "./CLAUDE.md"
savePath: 'Repo root <span class="mono">./CLAUDE.md</span>, committed to git and shared with the team'
loadTiming: Loaded on startup anywhere inside the repo (including subdirectories)
put:
  - 'Five things: <b>commands, structure, conventions, minefields, workflow</b> — everything Claude can''t infer from the code and would pay dearly for guessing wrong; the "commands to run verbatim" line is the single highest-value item'
avoid:
  - '<span class="dont">Long architecture recaps</span> (one @ reference to docs is enough), anything Claude can self-learn in a session, and multi-step procedures (make those a Skill)'
order: 2
---
# MyApp — project context

> E-commerce admin console · Next.js 15 + TypeScript + Prisma + PostgreSQL
> Architecture details live in @docs/architecture.md — not repeated here

## Commands (run verbatim, don't guess)
- Dev:          pnpm dev
- All tests:    pnpm test
- Single test:  pnpm test -- --grep "keyword"
- Quality gate: pnpm lint && pnpm typecheck
- Migrations:   pnpm db:migrate (local DB only; production migrations go through CI)

## Directory map
- app/        routes and pages (App Router)
- app/api/    API routes; auth middleware in app/api/_lib/
- lib/        domain logic and data-access wrappers
- prisma/     schema and migrations
- tests/      e2e; unit tests sit next to sources as *.test.ts

## Conventions
- TypeScript strict, no any; components use named exports only
- Data access goes through lib/db.ts — never new PrismaClient directly
- Styling is Tailwind only: no inline style, no new UI libraries
- New features ship with Vitest cases in the same directory

## Minefields (violations cause incidents)
- Existing files under prisma/migrations/ are read-only
- Signature-verification logic in app/api/webhooks/* must not be touched
- CI runs Node 20 — don't use APIs from newer versions

## Workflow
- Changes touching >3 files: propose a plan and get approval first
- Before finishing: pnpm lint && pnpm typecheck && pnpm test must pass
