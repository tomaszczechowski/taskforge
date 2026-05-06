# Taskforge — Claude Instructions

## Project structure

pnpm monorepo with two workspace roots:

```
apps/
  cli/          @taskforge-ai/cli        — Commander CLI entry point
  mcp-server/   @taskforge-ai/mcp-server — Express HTTP bridge (Jira + GitHub tools)
  worker/       @taskforge-ai/worker     — Jira polling loop, FSM per ticket
packages/
  agent-core/   @taskforge-ai/agent-core — Anthropic SDK agentic loop + git ops
  jira-client/  @taskforge-ai/jira-client — Jira REST API v3 client
  github-client/@taskforge-ai/github-client — GitHub API client
  shared/       @taskforge-ai/shared     — Types, ADF utilities, Winston logger
```

All packages use `"type": "module"` (ESM). TypeScript source in `src/`, compiled output in `dist/`.

## Build

```bash
pnpm publish:packages # publish packages to NPM
pnpm build            # build all packages
pnpm build:cli        # build CLI only
pnpm lint             # eslint
pnpm format           # prettier
```

## Code style

- TypeScript strict ESM throughout — use `import.meta.url` / `fileURLToPath` for path resolution, never `__dirname` from CJS
- No comments unless the WHY is non-obvious (hidden constraint, workaround, subtle invariant)
- No docstrings or multi-line comment blocks
- No error handling for impossible cases — trust TypeScript types and framework guarantees
- No backwards-compatibility shims — change the code directly
- Prefer explicit over implicit — no barrel re-exports unless already established

## Versioning

Each package is versioned independently. When changing a package:
1. Bump `"version"` in that package's `package.json` only (not root, not unaffected packages)
2. Add an entry to that package's `CHANGELOG.md` following Keep a Changelog format
3. Append a compare link at the bottom of the changelog

Changelog sections in order: `### Added`, `### Changed`, `### Fixed`, `### Removed`

The root `CHANGELOG.md` is an index — do not add release entries there.

## Per-package changelog format

```markdown
## [x.y.z] - YYYY-MM-DD

### Fixed

- Short description of what changed and why it matters

---
```

Footer link format:
```
[x.y.z]: https://github.com/tomaszczechowski/taskforge/compare/@taskforge-ai/<pkg>@x.y.(z-1)...@taskforge-ai/<pkg>@x.y.z
```

## Key conventions

- Binary name is `taskforge-ai` (not `taskforge`)
- Config file is `taskforge.config.json` — read via `getConfig(path)` from `apps/cli/src/utils.ts`
- Secrets go in `.env` only — never in config files
- MCP server runs on port `3001` by default, logs to `~/.taskforge/mcp.log`
- Agent index is hardcoded to `0` (`config.agents.list[0]`) — single agent only for now
