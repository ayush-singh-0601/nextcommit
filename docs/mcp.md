# NextCommit MCP

`nextcommit-mcp` is a local stdio JSON-RPC server. It does not make network requests and only scans paths supplied in a tool call.

Configure a client with:

```json
{ "command": "npx", "args": ["nextcommit-mcp"] }
```

Available tools are `nextcommit.scan`, `nextcommit.findings`, `nextcommit.ignore`, and `nextcommit.complete`. Mutation tools require a finding id and write only the repository's `.nextcommit` state.
