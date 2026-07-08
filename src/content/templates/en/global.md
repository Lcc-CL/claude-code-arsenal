---
layer: global
title: Behavior layer
tabLabel: "① Global ~/.claude/CLAUDE.md"
scopeLabel: SCOPE·ALL PROJECTS
termTitle: "~/.claude/CLAUDE.md"
savePath: '<span class="mono">~/.claude/CLAUDE.md</span>'
loadTiming: Loaded at the start of every session, for every project on this machine
put:
  - 'Cross-project <b>behavior rules</b> that never change: language of communication, confirmation for destructive ops, engineering discipline, environment facts (timezone / default package manager)'
avoid:
  - '<span class="dont">Anything project-specific</span> — that belongs in the project layer; skip persona prompts too, words that don''t change behavior just burn attention'
order: 1
---
# Global working rules (apply to every project on this machine)

## Communication
- Reply in English; keep code, commands, and error messages verbatim
- Conclusion first, then reasoning; if unsure, say so — never invent APIs or config options

## Boundaries
- Deleting files, git push --force, database migrations, CI config edits and other
  destructive / high-impact operations: state the blast radius and get my approval first
- Never write secrets, tokens, or passwords into code or commit history;
  proactively warn me if .env or credentials look at risk of leaking
- Do not bump major versions of dependencies on your own

## Engineering discipline
- Minimal diffs: do only what was asked — no drive-by refactors, no extra abstractions
- After fixing a bug, run the relevant tests before calling it done
- Use Conventional Commits (feat/fix/chore/docs…)
- If the same task fails twice in a row, stop and restate your understanding of the problem

## My environment
- Timezone Asia/Shanghai; macOS + zsh; Node ≥ 20; pnpm as the default package manager
