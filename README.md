<div align="center">

# NextCommit

### Give every repository a next step.

Local-first repository intelligence for developers and coding agents.

[![npm version](https://img.shields.io/npm/v/nextcommit?logo=npm&color=cb3837)](https://www.npmjs.com/package/nextcommit)
[![CI](https://github.com/ayush-singh-0601/nextcommit/actions/workflows/ci.yml/badge.svg)](https://github.com/ayush-singh-0601/nextcommit/actions/workflows/ci.yml)
[![npm downloads](https://img.shields.io/npm/dm/nextcommit?logo=npm)](https://www.npmjs.com/package/nextcommit)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22.14-339933?logo=node.js&logoColor=white)](package.json)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Install](#quick-start) · [What's new](#whats-new-in-014) · [Codex](#use-with-codex) · [How it works](#how-it-works) · [Commands](#commands) · [MCP](#mcp-server) · [npm](https://www.npmjs.com/package/nextcommit)

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

## What's new in 0.1.4

NextCommit's Codex integration now uses a guided, evidence-first workflow:

1. Scan the repository and verify candidates against the source.
2. Present 5-6 concise issues, or fewer when the evidence does not support six.
3. Ask you to select an issue by number or finding ID.
4. Automatically create and persist a plan for the selected issue.
5. Show the plan summary and wait for explicit approval before changing code.

```text
You: $nextcommit Analyze this repository and recommend what to work on next.

Codex:
1. Add regression coverage for POST /api/query
2. Validate retrieval fallback behavior
3. Remove duplicated workspace lookup logic
4. Improve malformed-request diagnostics
5. Add a query-path performance benchmark

Choose an issue by number or finding ID.

You: 1

Codex: Plan created and saved. Review the summary, then approve implementation when ready.
```

This release also fixes `nextcommit agent ingest .` command parsing, includes a `repositoryFingerprint` in JSON scan reports, ignores `.nextcommit` state during scans, and makes the bundled skill resolve repository-local installations before relying on a global executable.

Already installed? Follow [Upgrade and refresh](#upgrade-and-refresh) to update both the package and the copied Codex skill.

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
- keeps scan state under `.nextcommit`, which you should add to the repository's `.gitignore`;
- uses stable, versioned schemas for CLI and agent communication;
- makes network integrations explicit and opt-in;
- never implements a recommendation without the user's permission.

## Codex skill

The repository includes a verification-oriented Codex skill at [`skills/nextcommit`](skills/nextcommit). It scans the target repository, checks candidate evidence against the source, rejects weak claims, and persists only verified analyses.

The npm package also ships the skill files so the CLI and agent workflow can be distributed together.

## Use with Codex

NextCommit integrates with Codex in two ways:

- **Codex skill (recommended):** scans, verifies evidence, presents 5-6 issues, waits for your selection, then creates and persists the selected plan.
- **MCP server (optional):** exposes structured scan and finding-lifecycle tools through `/mcp`.

The skill never treats churn as proof and never implements code without explicit approval.

### Prerequisites

- Node.js 22.14 or newer
- a Git repository
- Codex CLI, the Codex IDE extension, or Codex in the ChatGPT desktop app

### Repository setup (recommended)

Repository scope makes the skill available to anyone who opens this project in Codex. Commit the copied `.agents/skills/nextcommit/SKILL.md` file if the team should share it.

#### Windows PowerShell

```powershell
cd "C:\path\to\your\repository"
npm install --save-dev nextcommit@latest

New-Item -ItemType Directory -Force ".agents\skills\nextcommit" | Out-Null
Copy-Item `
  "node_modules\nextcommit\skills\nextcommit\SKILL.md" `
  ".agents\skills\nextcommit\SKILL.md" `
  -Force

node "node_modules\nextcommit\dist\cli\src\bin.js" --version
```

#### macOS or Linux

```bash
cd /path/to/your/repository
npm install --save-dev nextcommit@latest

mkdir -p .agents/skills/nextcommit
cp node_modules/nextcommit/skills/nextcommit/SKILL.md \
  .agents/skills/nextcommit/SKILL.md

node node_modules/nextcommit/dist/cli/src/bin.js --version
```

Add local NextCommit state to `.gitignore`:

```gitignore
.nextcommit/
```

### User-wide setup

Use user scope to make the skill available in every repository.

#### Windows PowerShell

```powershell
npm install --global nextcommit@latest

$nextCommitNpmRoot = npm root -g
$nextCommitSkillDirectory = Join-Path $HOME ".agents\skills\nextcommit"
New-Item -ItemType Directory -Force $nextCommitSkillDirectory | Out-Null

Copy-Item `
  (Join-Path $nextCommitNpmRoot "nextcommit\skills\nextcommit\SKILL.md") `
  (Join-Path $nextCommitSkillDirectory "SKILL.md") `
  -Force
```

#### macOS or Linux

```bash
npm install --global nextcommit@latest
mkdir -p "$HOME/.agents/skills/nextcommit"
cp "$(npm root -g)/nextcommit/skills/nextcommit/SKILL.md" \
  "$HOME/.agents/skills/nextcommit/SKILL.md"
```

The skill resolves a repository-local NextCommit package first, then `nextcommit` on `PATH`, then the package returned by `npm root -g`. Repository-local installation is the most reproducible option.

### Verify and invoke

Launch Codex from the repository root:

```bash
codex
```

Inside Codex, list skills and invoke NextCommit:

```text
/skills

$nextcommit Analyze this repository. Show 5 or 6 brief evidence-backed issues and ask me to select one. Do not change files.
```

Codex normally detects skill changes automatically. Restart Codex if `nextcommit` does not appear in `/skills`.

### Default two-stage workflow

1. NextCommit performs a JSON scan and reads the strongest evidence in the source.
2. Codex presents 5 or 6 concise verified issues. If fewer are credible, it lists fewer.
3. You reply with a number or finding id, for example `3`.
4. Codex automatically creates and persists the selected implementation plan.
5. Codex shows a concise plan summary and asks for implementation approval.
6. Only an explicit approval such as `Implement it` authorizes source changes.

If your initial prompt already identifies one specific task, Codex can skip the shortlist and plan that task directly.

### Codex prompt cookbook

Enter these prompts inside Codex, not in PowerShell or Bash.

| Use case | Prompt |
| --- | --- |
| General shortlist | `$nextcommit Verify this repository and show 5 or 6 prioritized issues with brief descriptions, evidence, confidence, and effort. Ask me to select one.` |
| Repository orientation | `$nextcommit Explain the stack and structure, then shortlist the strongest evidence-backed work. Do not change files.` |
| Best next task | `$nextcommit Compare the verified candidates and recommend the single best next task. Explain impact, effort, confidence, and risk.` |
| Quick wins | `$nextcommit Shortlist high-impact, low-effort, low-risk work that can be completed quickly.` |
| Bugs | `$nextcommit Focus on likely bugs. Separate confirmed behavior from hypotheses and cite exact source evidence.` |
| Reliability | `$nextcommit Focus on validation, error handling, retries, fallback behavior, recovery, and operational reliability.` |
| Features | `$nextcommit Focus on unfinished README promises, roadmap intent, and valuable missing product behavior.` |
| Performance | `$nextcommit Focus on plausible performance work. Verify hot paths and do not promise speedups without measurement.` |
| Tests | `$nextcommit Find consequential untested behavior and shortlist focused regression-test opportunities.` |
| Maintainability | `$nextcommit Find bounded refactors or maintainability work with clear acceptance criteria and low regression risk.` |
| Dependencies | `$nextcommit Review manifests and dependency signals, then shortlist evidence-backed dependency or upgrade work.` |
| Documentation | `$nextcommit Find documentation gaps that materially affect setup, operation, contribution, or support.` |
| Easy mode | `$nextcommit Use easy mode and shortlist small, safe tasks.` |
| Ambitious mode | `$nextcommit Use ambitious mode and shortlist substantial, high-value work.` |
| Release mode | `$nextcommit Use release mode and identify the strongest verified release blockers or readiness work.` |
| Open-source mode | `$nextcommit Use open-source mode and shortlist contributor-friendly tasks with bounded scope.` |
| One hour | `$nextcommit Shortlist verified tasks that realistically fit in one hour.` |
| One evening | `$nextcommit Shortlist the best verified tasks that fit in one evening.` |
| One weekend | `$nextcommit Shortlist meaningful work that fits in one weekend and can be split into checkpoints.` |
| Plan one named task | `$nextcommit Verify this task: <task>. Create and persist a detailed plan, but do not implement it.` |
| Select from shortlist | `3` |
| Implement selected plan | `Implement the selected plan. Preserve unrelated changes, run relevant tests, and show the final diff.` |
| Explain a finding | `$nextcommit Explain finding <id>, including evidence, confidence, impact, effort, risk, and priority.` |
| Ignore a finding | `$nextcommit Ignore finding <id> because <reason>. Do not modify source code.` |
| Complete a finding | `$nextcommit Verify finding <id> is resolved, then mark it complete with commit evidence.` |
| Re-scan after changes | `$nextcommit Re-scan after the latest changes, reconcile previous findings, and explain priority changes.` |
| TODO and roadmap triage | `$nextcommit Review TODOs, FIXMEs, README promises, and roadmap items. Reject stale or unsupported work.` |
| Test and CI readiness | `$nextcommit Assess tests, scripts, and CI, then shortlist the most important readiness improvements.` |
| Pre-release review | `$nextcommit Produce a verified release go/no-go checklist. Do not publish or push anything.` |
| Portfolio review | `$nextcommit Review my configured portfolio and identify which repository has the strongest actionable work.` |
| Automation output | `$nextcommit Run the JSON scan, verify its strongest evidence, and return a concise structured summary.` |

### Permission and evidence boundaries

- Scanner candidates are leads, not confirmed issues.
- Codex must inspect referenced files before retaining a finding.
- Findings are classified as `confirmed`, `likely`, or `idea`.
- A high-churn file alone is not proof of a bug or testing gap.
- Planning does not authorize implementation.
- Ignore and complete operations write only to local `.nextcommit` state.
- Sensitive, binary, generated, ignored, and oversized files are excluded from content analysis.

### Optional MCP setup

Add the published stdio server without depending on a globally installed executable:

```bash
codex mcp add nextcommit -- npx -y --package nextcommit@latest nextcommit-mcp
codex mcp list
```

Inside Codex, run `/mcp` to confirm the server is active.

| MCP tool | Purpose | Writes state |
| --- | --- | --- |
| `nextcommit.scan` | Return repository signals and heuristic candidates | No |
| `nextcommit.findings` | Read persisted verified findings | No |
| `nextcommit.ignore` | Ignore a finding with an optional reason | Yes, only `.nextcommit` |
| `nextcommit.complete` | Mark a finding complete | Yes, only `.nextcommit` |

Use the skill and MCP server together when you want both the guided verification workflow and persistent structured tools.

### Upgrade and refresh

The npm package and the copied Codex skill are separate after installation. Upgrade the package, then repeat the relevant copy command above.

```bash
npm install --save-dev nextcommit@latest
```

Or, for user-wide installation:

```bash
npm install --global nextcommit@latest
```

Restart Codex if it still shows stale instructions.

### Troubleshooting

#### `nextcommit` is not recognized

For a repository-local installation:

```bash
node node_modules/nextcommit/dist/cli/src/bin.js --version
```

NextCommit 0.1.3 and newer makes the Codex skill use this local launcher before checking the global `PATH`.

#### `agent ingest` treats `ingest` as a path

Upgrade to NextCommit 0.1.4 or newer, refresh the copied skill, and restart Codex.

#### The skill is missing from `/skills`

- Verify `.agents/skills/nextcommit/SKILL.md` exists in the repository, or `$HOME/.agents/skills/nextcommit/SKILL.md` exists for user scope.
- Launch Codex from inside the target Git repository.
- Restart Codex after copying or updating the skill.

#### `nextcommit scan.` reports too many arguments

Use a space before the current-directory argument:

```bash
nextcommit scan .
```

#### Output says only `Investigate Modified in ...`

Upgrade to the latest version. NextCommit 0.1.2 and newer prints the affected filename and evidence path.

For current skill discovery and invocation behavior, see the [official OpenAI Codex skill documentation](https://developers.openai.com/codex/skills). For MCP setup, see the [official OpenAI Codex MCP documentation](https://developers.openai.com/codex/mcp).


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
