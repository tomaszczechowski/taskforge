# @taskforge-ai/mcp-server

Local HTTP middleware server that exposes Jira and GitHub API operations as tools callable by the Taskforge agent worker.

The server runs as a background daemon managed by `npx @taskforge-ai/cli mcp start`. Logs are written to `~/.taskforge/mcp.log`.

## Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/tool` | Dispatch a named tool call (Jira / GitHub action) |

## Start

```bash
npx @taskforge-ai/cli mcp start [--port 3001]
npx @taskforge-ai/cli mcp stop
```

## Part of the Taskforge monorepo

See the [main README](https://github.com/tomaszczechowski/taskforge) for full documentation, configuration reference, and architecture overview.
