# Forge Todo

A minimal to-do app for smoke-testing The Forge pipeline.

## Tech stack

- **Language / runtime:** TypeScript / Node 20
- **Framework:** React 19 + Vite 6
- **Test runner:** vitest
- **Check command:** `npm run build && npm run test`
- **Package manager:** npm
- **CI:** GitHub Actions on `ubuntu-latest`

## Key terms

- **Todo** — a single task with text, completion status, and creation timestamp
- **TodoList** — the full collection of todos, persisted to localStorage

## Rules

- Branch per issue: `feat/#<N>-short-description`. PR includes `closes #<N>`.
- Never push directly to `main`.
- Tests: logic functions get unit tests, user-facing surfaces get one happy-path test.

## Docs

- [`CONTEXT.md`](./CONTEXT.md) — ubiquitous language and domain glossary.
- [`MISSION-CONTROL.md`](./MISSION-CONTROL.md) — project state.
- [`.claude/lessons.md`](./.claude/lessons.md) — failed-then-fixed patterns.
- [`.claude/rules/`](./.claude/rules/) — auto-loaded path-scoped rules.
- [`docs/workflow/`](./docs/workflow/) — pipeline reference docs.
- [`WORKFLOW.md`](./WORKFLOW.md) — bot-facing workflow cheat-sheet.
