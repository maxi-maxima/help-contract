# Research Notes

This project was selected after avoiding overlap with the user's existing public-launch repos:

- `mcp-fire-drill`: MCP and agent security drills
- `context-cal`: agent context budget auditing
- `screenlint`: rendered UI checking
- `mcp-flightcheck`: MCP server contract checks
- `webmcp-formkit`: WebMCP form metadata migration
- `agent-pr-brief`: deterministic PR review brief generation
- `test-lane-finder`: verification lane planning
- `import-proof`: package API hallucination checks
- `cmd-receipt`: command execution receipts

The opportunity is CLI operability for agents. More tools are being used by agents, but many CLIs expose help text that assumes human context. Agents need explicit usage, options, examples, and exit-code contracts.

This tool deliberately checks the public help surface instead of source code. That makes it useful across languages and package ecosystems.

Useful current references:

- https://clig.dev/
- https://developers.google.com/style/code-syntax
- https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/setting-exit-codes-for-actions
