<div align="center">

# NextCommit

### Give every repository a next step.

[![npm version](https://img.shields.io/npm/v/nextcommit?logo=npm&color=cb3837)](https://www.npmjs.com/package/nextcommit)
[![CI](https://github.com/ayush-singh-0601/nextcommit/actions/workflows/ci.yml/badge.svg)](https://github.com/ayush-singh-0601/nextcommit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ayush-singh-0601/nextcommit/blob/main/LICENSE)

Local-first repository intelligence for developers and coding agents.

</div>

NextCommit scans a Git repository and produces an evidence-backed shortlist of meaningful work. It uses repository structure, README intent, TODOs, manifests, tests, and Git activity to help answer:

> What should I build next?

## Quick start

Requires Node.js 22.14 or newer.

```bash
npx nextcommit scan .
```

Or install both the CLI and MCP server globally:

```bash
npm install --global nextcommit
nextcommit scan .
nextcommit-mcp
```

Example output:

```text
NextCommit

my-project · typescript / rust

Signals: 42 · Candidates: 32

1. Implement documented intent: Add CSV export
   feature · idea · ~120m
```

Use stable JSON in scripts and agent integrations:

```bash
nextcommit scan . --json
```

## What it finds

- unfinished README and roadmap intent;
- TODO and FIXME evidence with file locations;
- high-churn files that may need focused tests;
- source, test, manifest, dependency, and CI signals;
- language, framework, and package-manager context;
- verified findings and implementation plans stored locally.

NextCommit does not modify source files. It respects `.gitignore`, skips sensitive and binary files, and keeps repository state in an ignored `.nextcommit` directory.

## Useful commands

```bash
# Deterministic repository scan
nextcommit scan .

# Findings that fit the available time
nextcommit time hour .
nextcommit time evening .
nextcommit time weekend .

# Focused recommendation modes
nextcommit mode easy .
nextcommit mode ambitious .
nextcommit mode release .
nextcommit mode open-source .

# Portfolio discovery
nextcommit init ~/Projects
nextcommit portfolio

# Finding lifecycle
nextcommit show <id> .
nextcommit plan <id> .
nextcommit ignore <id> .
nextcommit complete <id> .
```

Run `nextcommit --help` for every command.

## MCP

`nextcommit-mcp` exposes a local stdio MCP server with four tools:

- `nextcommit.scan`
- `nextcommit.findings`
- `nextcommit.ignore`
- `nextcommit.complete`

```json
{
  "mcpServers": {
    "nextcommit": {
      "command": "nextcommit-mcp"
    }
  }
}
```

## Programmatic API

```ts
import { scanRepository } from "nextcommit";

const report = await scanRepository(process.cwd(), {
  persistState: false,
});

console.log(report.candidates);
```

The package also includes a Codex skill for verifying scanner candidates before findings and plans are persisted.

## Links

- [GitHub repository](https://github.com/ayush-singh-0601/nextcommit)
- [Full documentation](https://github.com/ayush-singh-0601/nextcommit#readme)
- [MCP guide](https://github.com/ayush-singh-0601/nextcommit/blob/main/docs/mcp.md)
- [Issue tracker](https://github.com/ayush-singh-0601/nextcommit/issues)

## License

[MIT](https://github.com/ayush-singh-0601/nextcommit/blob/main/LICENSE) © Ayush Singh
