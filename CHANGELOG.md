# Changelog

This monorepo uses per-package changelogs. Each package is versioned and released independently.

| Package | Changelog |
|---|---|
| `@taskforge-ai/cli` | [apps/cli/CHANGELOG.md](apps/cli/CHANGELOG.md) |
| `@taskforge-ai/worker` | [apps/worker/CHANGELOG.md](apps/worker/CHANGELOG.md) |
| `@taskforge-ai/mcp-server` | [apps/mcp-server/CHANGELOG.md](apps/mcp-server/CHANGELOG.md) |
| `@taskforge-ai/agent-core` | [packages/agent-core/CHANGELOG.md](packages/agent-core/CHANGELOG.md) |
| `@taskforge-ai/jira-client` | [packages/jira-client/CHANGELOG.md](packages/jira-client/CHANGELOG.md) |
| `@taskforge-ai/github-client` | [packages/github-client/CHANGELOG.md](packages/github-client/CHANGELOG.md) |
| `@taskforge-ai/shared` | [packages/shared/CHANGELOG.md](packages/shared/CHANGELOG.md) |

---

## Monorepo-level changes

Changes to workspace configuration, shared tooling, and root-level files.

### [2026-04-27] Init

- Monorepo structure with pnpm workspaces (`apps/`, `packages/`)
- Shared `tsconfig.json`, `eslint.config.js`, and `prettier` configuration
- Root `package.json` with workspace-wide build, lint, format, and publish scripts
