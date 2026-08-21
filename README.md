<div align="center">

# NextCommit

### Give every repository a next step.

Local-first repository intelligence for developers and coding agents.

[![npm version](https://img.shields.io/npm/v/nextcommit?logo=npm&color=cb3837)](https://www.npmjs.com/package/nextcommit)
[![CI](https://github.com/ayush-singh-0601/nextcommit/actions/workflows/ci.yml/badge.svg)](https://github.com/ayush-singh-0601/nextcommit/actions/workflows/ci.yml)
[![npm downloads](https://img.shields.io/npm/dm/nextcommit?logo=npm)](https://www.npmjs.com/package/nextcommit)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22.14-339933?logo=node.js&logoColor=white)](package.json)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Install](#quick-start) · [How it works](#how-it-works) · [Commands](#commands) · [MCP](#mcp-server) · [npm](https://www.npmjs.com/package/nextcommit)

</div>

NextCommit turns an unfamiliar, unfinished, or neglected codebase into an evidence-backed shortlist of useful work. It reads repository structure, documentation, TODOs, manifests, tests, and Git history, then answers the question that comes before implementation:

> What is the next meaningful thing worth building?

It is not a code generator, contribution-calendar filler, or cloud code-review service. The scanner is deterministic and local; an agent can then verify its evidence and turn selected findings into implementation plans.

## Quick start

Requires Node.js 22.14 or newer.

```bash
npx nextcommit scan .
```

Or install it globally:

```bash
npm install --global nextcommit
nextcommit scan .
```

Example output:

```text
NextCommit

my-project · typescript / rust

Signals: 42 · Candidates: 32

1. Implement documented intent: Add CSV export
   feature · idea · ~120m

2. Investigate frequently changed authentication code
   test · likely · ~45m
```

For machine-readable output:

```bash
nextcommit scan . --json
```

## Why NextCommit

Repositories rarely stop because implementation is impossible. They stop because the valuable next step is unclear. NextCommit builds a practical engineering backlog from evidence already present in the codebase:

- unfinished README promises and roadmap items;
- TODO and FIXME comments with exact locations;
- high-churn files that deserve focused tests;
- source-to-test structure and package scripts;
- language, framework, package-manager, and CI signals;
- verified findings, plans, and lifecycle state stored locally.

The result is a small set of explainable options rather than a generic list of ideas.

## How it works

```text
Repository
   ↓
Safe local scan
   ↓
Deterministic signals and evidence
   ↓
Candidate recommendations
   ↓
Agent verification
   ↓
Ranked finding and implementation plan
```

NextCommit separates discovery from verification. The scanner reports candidates grounded in files and Git metadata. The bundled Codex skill verifies those candidates before persisting higher-confidence findings or plans.

## Commands

| Command | Purpose |
| --- | --- |
| `nextcommit scan [path]` | Scan a repository and show ranked candidates |
| `nextcommit scan [path] --json` | Emit the versioned JSON report |
| `nextcommit quick-wins [path]` | Show high-impact, low-effort verified findings |
| `nextcommit bugs [path]` | Show verified bug findings |
| `nextcommit features [path]` | Show verified feature findings |
| `nextcommit performance [path]` | Show verified performance findings |
| `nextcommit tests [path]` | Show verified testing findings |
| `nextcommit maintainability [path]` | Show verified maintainability findings |
| `nextcommit show <id> [path]` | Inspect one finding and its evidence |
| `nextcommit plan <id> [path]` | Show a stored implementation plan |
| `nextcommit ignore <id> [path]` | Ignore a finding without changing source code |
| `nextcommit complete <id> [path]` | Mark a finding complete |

Run `nextcommit --help` for the complete command list.

## Work that fits your time

Filter verified findings by the time you actually have:

```bash
nextcommit time hour .
nextcommit time evening .
nextcommit time weekend .
```

Or focus the recommendation style:

```bash
nextcommit mode easy .
nextcommit mode ambitious .
nextcommit mode release .
nextcommit mode open-source .
```

## Portfolio intelligence

Register one or more directories and discover Git repositories recursively:

```bash
nextcommit init ~/Projects
nextcommit portfolio
nextcommit portfolio --json
```

Portfolio configuration lives in `~/.nextcommit` by default. Set `NEXTCOMMIT_HOME` to use a different state directory.

## Local-first by design

NextCommit:

- reads the repository without modifying source files;
- respects `.gitignore` and skips sensitive, binary, generated, and oversized files;
- keeps scan state under the repository's ignored `.nextcommit` directory;
- uses stable, versioned schemas for CLI and agent communication;
- makes network integrations explicit and opt-in;
- never implements a recommendation without the user's permission.

## Codex skill

The repository includes a verification-oriented Codex skill at [`skills/nextcommit`](skills/nextcommit). It scans the target repository, checks candidate evidence against the source, rejects weak claims, and persists only verified analyses.

The npm package also ships the skill files so the CLI and agent workflow can be distributed together.

## MCP server

The package includes a local stdio MCP server:

```bash
nextcommit-mcp
```

Example client configuration:

```json
{
  "mcpServers": {
    "nextcommit": {
      "command": "nextcommit-mcp"
    }
  }
}
```

Available tools:

- `nextcommit.scan`
- `nextcommit.findings`
- `nextcommit.ignore`
- `nextcommit.complete`

See the [MCP guide](docs/mcp.md) for the protocol and mutation boundary.

## Programmatic API

The npm package re-exports the scanner and core schemas:

```ts
import { scanRepository } from "nextcommit";

const report = await scanRepository(process.cwd(), {
  persistState: false,
});

console.log(report.candidates);
```

## Development

```bash
git clone https://github.com/ayush-singh-0601/nextcommit.git
cd nextcommit
npm ci
npm run verify
```

`npm run verify` runs strict TypeScript checks, the complete test suite, and production builds. CI runs the same gate on Windows, Linux, and macOS with Node.js 22 and 24.

## Product principles

- Evidence over guesswork.
- Useful work over artificial activity.
- Local-first and private by default.
- Deterministic scanning before agent reasoning.
- Human approval before implementation.

## Contributing

Issues and focused pull requests are welcome. Please include a failing test or clear repository signal for behavior changes, and run `npm run verify` before submitting.

## License

[MIT](LICENSE) © Ayush Singh
