# @taskforge-ai/agent-core

Claude API agentic loop used by the Taskforge worker. Handles plan generation, spec summarisation, and code implementation with git operations (clone, branch, commit, push).

Built directly on the Anthropic SDK — no LangChain or similar frameworks.

## Exports

| Export | Description |
|---|---|
| `runAgent` | Execute a bounded agentic loop for a given task prompt |
| `git.*` | Clone, checkout, commit, and push helpers |

## Part of the Taskforge monorepo

See the [main README](https://github.com/tomaszczechowski/taskforge) for full documentation, configuration reference, and architecture overview.
