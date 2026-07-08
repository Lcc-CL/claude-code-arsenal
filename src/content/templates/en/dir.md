---
layer: dir
title: Local rules layer
tabLabel: "③ Directory src/CLAUDE.md"
scopeLabel: SCOPE·ONE DIRECTORY
termTitle: "src/components/CLAUDE.md"
savePath: 'Any subdirectory, e.g. <span class="mono">src/components/CLAUDE.md</span>'
loadTiming: '<b>Lazy-loaded</b> — injected only when Claude reads files in that directory; sibling directories never see it, which saves context for free'
put:
  - 'Rules that hold only for this slice of code: component standards, module-specific test setups, per-package build commands in a monorepo'
avoid:
  - '<span class="dont">Repo-wide conventions</span> — push those up a layer or they get diluted by repeated loading; if a rule seems ignored, run <span class="mono">/memory</span> first to check whether it has even loaded'
order: 3
---
# components/ rules (apply only while working in this directory)

- One folder per component: index.tsx + types.ts + *.test.tsx
- Base controls come from @/components/ui only — no new component libraries
- Prefer local useState; cross-component state goes through zustand (see @/stores)
- Server data flows through query hooks in hooks/ — no fetch inside components
- Every new component ships with *.stories.tsx (Storybook) alongside
- Accessibility: interactive elements need a visible focus state and aria labels
