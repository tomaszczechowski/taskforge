# @taskforge-ai/cli

CLI entry point for Taskforge. Provides commands to initialise a project, run the polling agent, process individual tickets, and control the MCP server.

## Commands

| Command | Description |
|---|---|
| `init` | Interactive setup wizard — creates `taskforge.config.json` and `.env` |
| `start` | Start the polling agent worker |
| `run <ticketId>` | Process a single ticket immediately |
| `list` | List Jira tickets assigned to the agent |
| `mcp start / stop` | Start or stop the MCP middleware server |

## Usage

```bash
npm install -g @taskforge-ai/cli
npx @taskforge-ai/cli init
npx @taskforge-ai/cli start
```

## Part of the Taskforge monorepo

See the [main README](https://github.com/tomaszczechowski/taskforge) for full documentation, configuration reference, and architecture overview.
