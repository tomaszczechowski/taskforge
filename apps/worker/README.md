# @taskforge-ai/worker

Polling worker that watches Jira for tickets assigned to the configured agent user and processes them through a spec → approval → implementation finite state machine (FSM).

## Flow

```
poll Jira
  → ticket assigned to agent
  → post clarifying questions as comments
  → wait for human "APPROVED FOR AGENT" reply
  → generate implementation plan
  → clone repo, write code, commit, push
  → open PR, transition ticket to "In Review"
```

Each ticket runs through its own FSM. The worker polls on a configurable interval (default 30 s).

## Part of the Taskforge monorepo

See the [main README](https://github.com/tomaszczechowski/taskforge) for full documentation, configuration reference, and architecture overview.
