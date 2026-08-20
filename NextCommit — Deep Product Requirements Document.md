# NextCommit

## Deep Product Requirements Document

**Working Name:** NextCommit  
**Tagline:** *Give every repository a next step.*  
**Category:** Developer Tool / Repository Intelligence / AI Agent Skill / CLI  
**Primary Distribution:** npm, npx  
**Secondary Distribution:** PyPI / pipx, Agent Skills, standalone binaries  
**Future Distribution:** Homebrew, Winget, Scoop, MCP server  
**Initial Target:** Individual developers using AI coding CLIs  
**Primary Agent Integrations:** Codex CLI, Antigravity/AGY, Claude Code, Gemini CLI, Cursor-compatible agent workflows

---

# 1. Executive Summary

Developers frequently accumulate repositories that technically "work" but stop evolving.

Examples include:

- old side projects,
- completed college projects,
- experimental applications,
- npm packages,
- browser extensions,
- SaaS prototypes,
- open-source repositories,
- CLI tools,
- portfolio projects,
- hackathon projects,
- partially abandoned applications.

The problem is often not that the developer cannot code the next feature.

The problem is:

> **They do not know what is worth building next.**

Modern AI coding agents are increasingly capable of implementing tasks once those tasks are clearly defined.

However, they still need a useful objective.

NextCommit fills that gap.

It analyzes one repository or an entire portfolio of repositories and determines:

- what bugs may exist,
- what features naturally belong in the product,
- what performance improvements are valuable,
- where reliability can improve,
- where tests are weak,
- where security issues may exist,
- what technical debt matters,
- what UX/DX improvements are worthwhile,
- what unfinished product intent exists,
- which repository deserves attention,
- and ultimately:

> **What should my next meaningful commit be?**

NextCommit does not aim to generate more commits simply for activity.

It aims to generate **better engineering decisions**.

---

# 2. Core Product Thesis

AI coding agents are becoming very good at answering:

> "How should I implement this?"

But developers still regularly struggle with:

> "What should I implement?"

NextCommit owns the second question.

Its role is:

```text
Repository
    ↓
Understand
    ↓
Discover opportunities
    ↓
Collect evidence
    ↓
Verify
    ↓
Prioritize
    ↓
Recommend
    ↓
Plan
    ↓
Hand off to coding agent
    ↓
Implementation
    ↓
Commit
    ↓
Remember
    ↓
Repeat
```

---

# 3. Product Positioning

NextCommit should not position itself as:

- another code reviewer,
- another lint tool,
- another vulnerability scanner,
- another AI programmer,
- another GitHub contribution generator.

Instead:

> **NextCommit is a repository intelligence engine that continuously discovers and prioritizes the most valuable work across your codebases.**

A secondary description:

> **A personal engineering backlog generator for everything you've built.**

---

# 4. Problem Statement

A developer may have a directory like:

```text
~/Projects/

├── codewhy/
├── ai-pdf-editor/
├── expense-tracker/
├── vscode-extension/
├── scraper/
├── old-chat-app/
├── portfolio/
├── npm-library/
├── college-project/
└── abandoned-saas/
```

Each repository may contain valuable unfinished work.

But identifying that work manually requires:

- reopening the project,
- remembering what it does,
- reading its architecture,
- checking TODOs,
- reviewing README promises,
- analyzing Git history,
- checking tests,
- finding bugs,
- thinking about features,
- reviewing dependencies,
- estimating effort,
- deciding whether the project is worth reviving.

Developers usually do not perform this analysis.

Instead, the repositories remain untouched.

---

# 5. User Problem

Typical developer thought process:

```text
"I want to code something."

        ↓

"I already have 15 projects."

        ↓

"Which one should I open?"

        ↓

"What should I change?"

        ↓

"Is it actually useful?"

        ↓

"How long will it take?"

        ↓

"Never mind."
```

NextCommit should convert this into:

```text
nextcommit best --time 1h
```

followed by:

```text
Best task for your next hour:

Repository:
codewhy

Task:
Add retry handling for transient API failures.

Impact: High
Effort: Low-Medium
Confidence: 96%
Estimated time: 45–60 min

Evidence:
src/api/client.ts:74
src/api/request.ts:122

Generate implementation plan?
```

---

# 6. Product Goals

## 6.1 Primary Goals

NextCommit should:

1. Understand an existing repository.
2. Find meaningful engineering opportunities.
3. Ground recommendations in repository evidence.
4. Differentiate confirmed issues from speculative ideas.
5. Estimate effort.
6. Estimate impact.
7. Estimate confidence.
8. Rank opportunities.
9. Produce a clear "best next task."
10. Generate an implementation-ready plan.
11. Work naturally with AI coding agents.
12. Remember previous recommendations.
13. Avoid repeating completed or rejected suggestions.
14. Scan multiple repositories.
15. Compare projects against each other.
16. recommend work according to available developer time.
17. help revive dormant projects.

---

# 7. Non-Goals

NextCommit should not initially attempt to:

- replace Codex or Claude Code,
- autonomously rewrite an entire application,
- automatically push changes without permission,
- optimize GitHub contribution graphs,
- generate meaningless commits,
- act as a full project management platform,
- replace dedicated security scanners,
- replace static analyzers,
- replace test frameworks,
- operate as a hosted SaaS in the MVP,
- require a proprietary LLM API.

---

# 8. Core Product Principle

Every recommendation must answer:

```text
WHAT?
WHY?
WHERE?
HOW CERTAIN?
HOW VALUABLE?
HOW HARD?
WHAT NEXT?
```

Example:

```text
WHAT
Add bounded retry handling.

WHY
Transient API failures currently terminate
the complete command.

WHERE
src/api/client.ts:74
src/api/request.ts:122

CONFIDENCE
96%

IMPACT
9/10

EFFORT
3/10

NEXT
Generate implementation plan.
```

---

# 9. Core Architecture

NextCommit should be designed as several layers.

```text
                   NEXTCOMMIT
                        │
        ┌───────────────┼─────────────────┐
        │               │                 │
        ▼               ▼                 ▼
      CLI            Agent Skill        MCP
   npm / pip      Codex / AGY/etc.    Future
        │               │
        └───────────────┬┘
                        ▼
                 NEXTCOMMIT CORE
                        │
        ┌───────────────┼─────────────────┐
        │               │                 │
        ▼               ▼                 ▼
 Repository Scan    State Engine     Scoring Engine
        │
        ▼
 Signal Collection
        │
        ▼
 Structured JSON
        │
        ▼
 AI Agent Reasoning
        │
        ▼
 Verified Findings
        │
        ▼
 Prioritized Backlog
```

---

# 10. Product Components

## 10.1 NextCommit Core

The core contains deterministic functionality.

Responsibilities:

- repository discovery,
- file indexing,
- project-stack identification,
- Git history analysis,
- TODO extraction,
- dependency inspection,
- test discovery,
- README/roadmap extraction,
- repository statistics,
- previous state loading,
- finding storage,
- score calculation,
- filtering,
- JSON output.

The core should not need an LLM to gather objective signals.

---

# 10.2 NextCommit CLI

Main user-facing standalone interface.

Installation:

```bash
npm install -g nextcommit
```

or:

```bash
npx nextcommit
```

Eventually:

```bash
pip install nextcommit
```

and:

```bash
pipx install nextcommit
```

---

# 10.3 Agent Skill

The Skill connects the NextCommit core to AI coding agents.

Example Codex invocation:

```text
$nextcommit
```

or:

```text
$nextcommit I have 30 minutes.
```

The skill should instruct the agent to:

1. execute NextCommit,
2. consume structured results,
3. inspect evidence,
4. verify high-priority findings,
5. rank recommendations,
6. communicate results,
7. generate implementation plans,
8. optionally implement the selected recommendation.

---

# 10.4 Optional MCP Layer

Not required for V1.

Future MCP tools could expose:

```text
nextcommit.scan_repository
nextcommit.scan_portfolio
nextcommit.get_findings
nextcommit.get_best_task
nextcommit.generate_plan
nextcommit.mark_completed
nextcommit.ignore
nextcommit.get_history
```

This enables multiple external AI tools to share NextCommit's repository intelligence.

---

# 11. CLI Installation Experience

## npm

```bash
npm install -g nextcommit
```

## Temporary use

```bash
npx nextcommit scan .
```

## Python

Future:

```bash
pip install nextcommit
```

or:

```bash
pipx install nextcommit
```

## Skill installation

Potential UX:

```bash
nextcommit install codex
```

```bash
nextcommit install claude
```

```bash
nextcommit install agy
```

```bash
nextcommit install gemini
```

The command should automatically place the Skill files in the appropriate agent directory.

---

# 12. First-Run Experience

Developer runs:

```bash
nextcommit
```

NextCommit detects that the current directory is a Git repository.

Example:

```text
NextCommit

Repository detected:
codewhy

Stack:
TypeScript
Node.js

184 source files
38 tests
7 TODOs
2 FIXMEs

Last meaningful commit:
43 days ago

No previous NextCommit analysis found.

Run initial analysis? [Y/n]
```

---

# 13. Repository Analysis

The scanner should understand:

## Structure

- source directories,
- test directories,
- configuration,
- build output,
- documentation,
- assets,
- scripts.

## Technology

Examples:

- JavaScript
- TypeScript
- Python
- Java
- Go
- Rust
- C#
- PHP
- Ruby

Framework detection:

- React
- Next.js
- Express
- FastAPI
- Django
- Flask
- Spring Boot
- NestJS
- Vue
- Svelte
- Angular

---

# 14. Files to Ignore

Default ignore patterns should include:

```text
.git/
node_modules/
dist/
build/
coverage/
.next/
vendor/
target/
__pycache__/
.venv/
venv/
generated/
.cache/
```

It should also respect:

```text
.gitignore
```

where possible.

---

# 15. Repository Signals

The deterministic scanner should collect signals such as:

```text
repository name
repository path
languages
frameworks
package manager
source file count
test file count
test/source ratio
TODO count
FIXME count
last commit
commit frequency
recent commits
high-churn files
README roadmap
unfinished checklist items
package scripts
dependencies
CI configuration
configuration files
large files
large functions if detectable
duplicate patterns where practical
existing NextCommit state
```

---

# 16. Git Intelligence

Git should be one of the strongest sources of evidence.

Analyze:

```bash
git log
git status
git diff
git shortlog
git blame
```

Potential signals:

- frequently modified files,
- frequently fixed files,
- abandoned branches of functionality,
- repeated bugfix commits,
- long-untouched modules,
- high-churn areas,
- recently introduced functionality,
- code that changes together,
- previous feature direction.

Example:

```text
GIT SIGNAL

src/parser/index.ts

Modified in:
12 of the previous 25 commits

Commit messages include:
fix parser
fix parser edge case
handle parser crash
fix nested parser

Conclusion:
This module is a likely reliability hotspot.

Recommendation:
Add regression coverage for edge cases.
```

---

# 17. README Intelligence

NextCommit should parse product intent from:

- README,
- ROADMAP,
- TODO,
- CONTRIBUTING,
- CHANGELOG,
- issue templates,
- architecture documentation.

Example:

```text
README Roadmap

[x] Upload files
[x] PDF extraction
[ ] Batch processing
[ ] Markdown export
```

NextCommit should identify:

```text
UNFINISHED PRODUCT INTENT

Batch processing

Evidence:
README.md:84

Supporting architecture:
The extraction pipeline is stateless and already
accepts a standardized document object.

Confidence:
96%
```

---

# 18. TODO/FIXME Intelligence

A TODO must not automatically become a recommendation.

Instead:

```text
TODO found
      ↓
Inspect surrounding code
      ↓
Check age/history
      ↓
Determine relevance
      ↓
Verify whether already resolved
      ↓
Rank if still meaningful
```

Example:

```text
src/api/client.ts:93

TODO:
"retry failed API requests"

Verified:
External request currently throws immediately
for transient failures.

Recommendation:
Add bounded retry.

Confidence:
99%
```

---

# 19. Analysis Categories

NextCommit should support the following categories.

---

# 19.1 Bugs

Detect candidates such as:

- null access,
- missing conditions,
- incorrect assumptions,
- parsing failures,
- race conditions,
- broken states,
- exception problems,
- invalid data handling,
- unhandled edge cases.

---

# 19.2 Reliability

Analyze:

- retry handling,
- timeout handling,
- fallback behavior,
- partial failure,
- network instability,
- resource cleanup,
- concurrency,
- shutdown behavior.

---

# 19.3 Features

Generate features grounded in:

- current product behavior,
- README roadmap,
- architecture,
- existing workflows,
- incomplete implementation,
- complementary functionality.

---

# 19.4 Performance

Analyze:

- duplicate requests,
- repeated computations,
- N+1 access,
- expensive loops,
- unnecessary serialization,
- missing caching,
- large payloads,
- synchronous work,
- repeated rendering,
- slow startup paths.

---

# 19.5 Security

Identify signals related to:

- secrets,
- unsafe logs,
- validation,
- authentication,
- authorization,
- injection risks,
- filesystem handling,
- command execution,
- exposed sensitive data.

Security findings should use conservative wording.

---

# 19.6 Testing

Find:

- critical untested modules,
- missing edge-case coverage,
- error paths without tests,
- high-churn modules without regression tests,
- important API flows without integration tests.

---

# 19.7 Maintainability

Find:

- large modules,
- duplicated logic,
- dead code,
- overly complex functions,
- poor boundaries,
- unnecessary coupling,
- inconsistent abstractions.

---

# 19.8 Developer Experience

Look for:

- setup problems,
- unclear errors,
- missing development commands,
- poor logging,
- complicated configuration,
- missing examples,
- confusing command UX.

---

# 19.9 Product Polish

Look for:

- missing loading state,
- missing empty state,
- missing error state,
- accessibility issues,
- confusing UX,
- missing status feedback,
- incomplete onboarding.

---

# 19.10 Dependencies

Analyze:

- obviously unused dependencies,
- stale dependencies,
- migration opportunities,
- duplicate packages,
- package conflicts.

Dependency upgrades should not be suggested merely because a newer version exists.

---

# 19.11 Documentation

Find documentation gaps only when meaningful.

Example:

```text
README installation section references:

npm run start:server

package.json contains no start:server script.

Finding:
Documentation is inconsistent with current repository.
```

---

# 20. Finding Confidence Levels

Every finding must belong to one of three classes.

## CONFIRMED

Direct evidence demonstrates the problem.

```text
[CONFIRMED BUG]
```

## LIKELY

Evidence strongly suggests a problem but runtime verification would improve certainty.

```text
[LIKELY PERFORMANCE]
```

## IDEA

An enhancement inferred from the existing product.

```text
[IDEA]
```

This classification is mandatory.

---

# 21. Finding Object

Structured representation:

```json
{
  "id": "api-retry",
  "title": "Add retry handling for transient API failures",
  "category": "reliability",
  "classification": "likely",
  "impact": 9,
  "effort": 3,
  "confidence": 0.96,
  "risk": "low",
  "estimatedMinutes": 45,
  "evidence": [
    {
      "file": "src/api/client.ts",
      "line": 74
    }
  ],
  "reason": "Transient server errors immediately fail the operation.",
  "status": "open"
}
```

---

# 22. Evidence Requirement

Recommendations should ideally include:

```text
file
line
symbol/function
repository signal
reason
```

Bad output:

```text
Add caching.
```

Good output:

```text
Add metadata request caching.

Evidence:
src/npm/client.ts:42
src/analyze/dependencies.ts:88

The same package metadata can be fetched multiple
times during one repository analysis.

Potential result:
Reduced network requests on repositories with
repeated dependency references.
```

---

# 23. Scoring Model

Initial opportunity score:

```text
Opportunity Score =

Impact × Relevance × Confidence
───────────────────────────────
        Effort × Risk
```

Normalization may be applied.

Inputs:

```text
Impact       1–10
Effort       1–10
Relevance    1–10
Confidence   0–1
Risk         multiplier
```

---

# 24. Impact Calculation

Possible factors:

- user-facing severity,
- number of affected users,
- reliability,
- security,
- product usefulness,
- developer productivity,
- frequency of affected workflow.

---

# 25. Effort Calculation

Consider:

- number of files,
- architectural scope,
- new dependencies,
- test requirements,
- migration needs,
- integration complexity,
- estimated implementation time.

---

# 26. Risk Calculation

Potential categories:

```text
Low
Medium
High
```

Signals include:

- core architecture changes,
- data migrations,
- auth changes,
- public API changes,
- concurrency,
- dependency migration.

---

# 27. Confidence Calculation

Confidence should depend on:

- direct code evidence,
- test evidence,
- Git history,
- TODO/README evidence,
- static scanner evidence,
- agent verification.

High-confidence findings should rank higher than speculative ideas.

---

# 28. Main Command

Inside a repository:

```bash
nextcommit
```

Equivalent:

```bash
nextcommit scan .
```

Output:

```text
NEXTCOMMIT

Repository:
codewhy

Health:
78/100

Signals:

Bugs                  2
Reliability           2
Features              4
Performance           2
Tests                  3
Security              1
Maintainability       3

BEST NEXT COMMITS

1. Fix config parser failure
   Bug
   Impact: 8
   Effort: 2
   Confidence: 99%
   ~20m

2. Add transient API retries
   Reliability
   Impact: 9
   Effort: 3
   Confidence: 96%
   ~45m

3. Add progress reporting
   Feature
   Impact: 8
   Effort: 4
   Confidence: 91%
   ~1h
```

---

# 29. Category Commands

```bash
nextcommit bugs
```

```bash
nextcommit features
```

```bash
nextcommit performance
```

```bash
nextcommit security
```

```bash
nextcommit tests
```

```bash
nextcommit maintainability
```

```bash
nextcommit dx
```

```bash
nextcommit polish
```

```bash
nextcommit dependencies
```

```bash
nextcommit reliability
```

---

# 30. Quick-Win Mode

```bash
nextcommit quick-wins
```

Prioritize:

```text
High impact
+
Low effort
+
High confidence
+
Low regression risk
```

Example:

```text
1. Redact API token in debug logging
   ~15m

2. Handle malformed config
   ~20m

3. Add missing null guard
   ~10m
```

---

# 31. Time-Aware Mode

Time should be a first-class product feature.

Examples:

```bash
nextcommit --time 15m
```

```bash
nextcommit --time 30m
```

```bash
nextcommit --time 1h
```

```bash
nextcommit --time 2h
```

```bash
nextcommit --time weekend
```

The engine should prioritize work fitting the budget.

---

# 32. Natural Agent Time Requests

Inside Codex:

```text
$nextcommit I have 30 minutes.
```

or:

```text
$nextcommit Give me something meaningful for tonight.
```

The Skill translates the request into relevant CLI filters.

---

# 33. Weekend Mode

```bash
nextcommit weekend
```

Example:

```text
WEEKEND PROJECT

Repository:
pdf-editor

Feature:
Multi-document upload

Estimated:
3–5h

Impact:
High

Suggested commit sequence:

1. feat: support multiple selected files
2. feat: add upload queue
3. feat: show per-file progress
4. test: cover multi-document behavior
```

---

# 34. Ambitious Mode

```bash
nextcommit ambitious
```

Returns:

- larger architectural improvements,
- substantial product features,
- significant refactors,
- high-impact multi-session work.

---

# 35. Easy Mode

```bash
nextcommit easy
```

Prioritizes:

- low-risk,
- isolated,
- well-understood,
- highly testable tasks.

---

# 36. Impressive Mode

Potential portfolio/student-oriented mode:

```bash
nextcommit impressive
```

This ranks improvements according to:

```text
user-visible value
demo value
technical depth
portfolio value
```

This must not override engineering sanity.

---

# 37. Release Mode

```bash
nextcommit release
```

Answers:

> What should be fixed before the next release?

Potential output:

```text
RELEASE READINESS

High:
- API key present in debug logs

Medium:
- Node 24 not covered in CI
- README references removed flag

Polish:
- --version unavailable

Recommended order:
1. Security
2. CI
3. Documentation
4. Release
```

---

# 38. Cleanup Mode

```bash
nextcommit cleanup
```

Looks for:

- dead modules,
- unused packages,
- stale TODOs,
- duplicated helpers,
- generated files committed accidentally,
- obsolete configuration.

---

# 39. Open-Source Readiness Mode

```bash
nextcommit open-source
```

Find improvements such as:

- contributor setup,
- documentation,
- reproducible build,
- issue templates,
- test instructions,
- missing licenses,
- contribution friction.

---

# 40. Revive Mode

```bash
nextcommit revive
```

Designed specifically for abandoned projects.

Example:

```text
BEST REVIVAL CANDIDATE

expense-tracker

Dormant:
197 days

Revival Score:
89/100

Unfinished original intent:
Monthly reports

Evidence:
README.md roadmap
src/reports/monthly.ts

Estimated:
~2h

Why:
Feature was already planned and partially implemented.
```

---

# 41. Multi-Repository Discovery

User runs:

```bash
nextcommit scan ~/Projects
```

NextCommit discovers Git repositories recursively.

Example:

```text
Found 14 repositories.

Active: 4
Dormant: 7
Likely archive candidates: 3
```

---

# 42. Portfolio Analysis

Each repository gets:

- health score,
- revival score,
- opportunity count,
- best task,
- estimated task duration,
- last activity,
- project potential.

Example:

```text
PORTFOLIO RANKING

1. codewhy
   Revival: 94
   Best task: API retries
   ~45m

2. pdf-editor
   Revival: 88
   Best task: upload validation
   ~25m

3. expense-tracker
   Revival: 82
   Best task: monthly reports
   ~2h
```

---

# 43. Revival Score

Example formula:

```text
Revival Score =

Project Value
× Opportunity Quality
× Confidence
× Future Potential
× Momentum Potential

────────────────────────

Estimated Effort
```

Additional factors:

- days dormant,
- existing users,
- package downloads,
- GitHub activity,
- unfinished roadmap,
- test quality,
- architecture health,
- repository completeness.

External metrics should remain optional.

---

# 44. Flagship Portfolio Command

```bash
nextcommit best
```

Answers:

> Across everything I have, what should I work on?

Example:

```text
YOUR BEST NEXT COMMIT

Repository:
codewhy

Task:
Add transient API retries

Why this beats 38 other opportunities:

Impact             9/10
Effort             3/10
Confidence         97%
Existing users     Yes
Regression risk    Low
Estimated time     ~45m
```

---

# 45. Portfolio Time Filter

```bash
nextcommit best --time 30m
```

Example:

```text
BEST USE OF 30 MINUTES

Repository:
pdf-editor

Task:
Validate upload size before API request.

Estimated:
20–25 min

Impact:
7/10

Confidence:
98%
```

---

# 46. Cross-Repository Category Search

```bash
nextcommit bugs --all
```

```text
BUGS ACROSS YOUR PROJECTS

1. codewhy
   API key exposed in logs
   High

2. pdf-editor
   Upload state race
   High

3. expense-tracker
   Invalid timezone handling
   Medium
```

Also:

```bash
nextcommit features --all
nextcommit performance --all
nextcommit security --all
```

---

# 47. Implementation Plan Command

```bash
nextcommit plan api-retry
```

Example:

```text
NEXT COMMIT PLAN

Task:
Add bounded retry handling.

Files:
src/api/client.ts
src/api/errors.ts
tests/client.test.ts

Implementation:

1. Create retryable-error classifier.
2. Retry 429, 502 and 503 responses.
3. Implement exponential backoff.
4. Limit attempts.
5. Preserve non-retryable behavior.
6. Add deterministic tests.

Acceptance Criteria:

✓ Retry transient failures
✓ Do not retry permanent errors
✓ Maximum retries respected
✓ Tests pass

Risk:
Low

Estimated:
45–60m
```

---

# 48. Commit Planning

For large work:

```text
SUGGESTED COMMIT SEQUENCE

1.
feat(upload): support multiple selected files

2.
feat(upload): introduce upload queue

3.
feat(upload): display individual progress

4.
test(upload): cover batch workflows
```

---

# 49. Codex Integration

NextCommit should have a native Skill.

Potential installation:

```bash
nextcommit install codex
```

Installed structure:

```text
~/.agents/skills/nextcommit/

├── SKILL.md
├── references/
└── scripts/
```

---

# 50. Codex User Experience

Developer:

```bash
cd codewhy
codex
```

Then:

```text
$nextcommit
```

Codex should:

```text
1. Load the NextCommit Skill.

2. Run:
   nextcommit scan . --json

3. Read structured results.

4. Inspect source around highest-ranked evidence.

5. Verify the strongest findings.

6. Produce ranked recommendations.
```

---

# 51. Codex Example

User:

```text
$nextcommit
```

Internal command:

```bash
nextcommit scan . --json
```

Result:

```json
{
  "repository": "codewhy",
  "signals": {
    "todos": 7,
    "tests": 38,
    "highChurnFiles": 4
  },
  "candidates": [
    {
      "id": "config-error",
      "category": "bug",
      "evidence": ["src/config/load.ts:47"]
    }
  ]
}
```

Codex then verifies the source and responds:

```text
1. Fix malformed config handling

CONFIRMED BUG

Evidence:
src/config/load.ts:47

Impact: 8
Effort: 2
Confidence: 99%

Estimated:
20–30 minutes
```

---

# 52. Codex Follow-Up

User:

```text
Plan #1.
```

Codex generates the plan.

Then:

```text
Implement it.
```

Codex edits the repository.

This division is central:

```text
NextCommit
    ↓
WHAT should we build?

Codex
    ↓
HOW should we build it?
```

---

# 53. Agent Adapter Philosophy

NextCommit should eventually support:

```text
nextcommit install codex
nextcommit install claude
nextcommit install agy
nextcommit install gemini
```

Each adapter contains platform-specific instructions but consumes the same NextCommit core.

---

# 54. Structured JSON Output

Agents need machine-readable output.

```bash
nextcommit scan . --json
```

Example:

```json
{
  "repository": {
    "name": "codewhy",
    "path": "/projects/codewhy",
    "languages": ["typescript"],
    "frameworks": ["node"]
  },
  "signals": {},
  "findings": [],
  "previousState": {}
}
```

This becomes a core API contract.

---

# 55. Human Output

Default terminal output should remain easy to read.

```text
NextCommit

codewhy
TypeScript / Node.js

Best next work:

1. Fix malformed config      ~20m
2. Add transient retries     ~45m
3. Add progress reporting    ~1h
```

---

# 56. Persistent State

Local repository state:

```text
.nextcommit/

├── state.json
├── findings.json
├── completed.json
├── ignored.json
└── plans/
```

---

# 57. State File

Potential:

```json
{
  "version": 1,
  "lastScan": "2026-08-18T13:00:00Z",
  "repositoryFingerprint": "...",
  "lastCommit": "a731fb2"
}
```

---

# 58. Completed Findings

```json
[
  {
    "id": "config-error",
    "completedAt": "2026-08-18",
    "commit": "a731fb2"
  }
]
```

---

# 59. Ignored Findings

```json
[
  {
    "id": "csv-export",
    "reason": "Not part of product direction",
    "ignoredAt": "2026-08-18"
  }
]
```

---

# 60. Ignore Command

```bash
nextcommit ignore csv-export
```

Optional:

```bash
nextcommit ignore csv-export --reason "Not product direction"
```

---

# 61. Complete Command

```bash
nextcommit complete config-error
```

Should attempt to record:

- completion time,
- commit SHA,
- relevant files.

---

# 62. Automatic Resolution Detection

During future scans:

```text
Previous finding:
config-error

Previous evidence:
src/config/load.ts:47

Current code:
error handling now exists.

Relevant commit:
7f8c41a

Status:
Likely resolved.
```

The tool should either:

- automatically mark safe cases resolved,
- or ask the AI agent to verify.

---

# 63. Reconciliation

Potential command:

```bash
nextcommit reconcile
```

Responsibilities:

- identify completed findings,
- identify stale findings,
- re-evaluate ignored findings,
- discover new opportunities.

---

# 64. Resurfacing Ignored Suggestions

Ignored suggestions should usually stay hidden.

They may resurface if:

```text
architecture changed significantly
effort dropped dramatically
user explicitly requests reconsideration
related feature was implemented
previous reason is no longer true
```

Example:

```text
CSV export was previously ignored.

Reason:
"No generic export architecture."

Since then:
Export abstraction introduced in commit 812abc.

Estimated effort changed:
3h → 30m

Reconsider?
```

---

# 65. Portfolio State

Global state could live in:

```text
~/.nextcommit/
```

Potential:

```text
~/.nextcommit/

├── config.json
├── repositories.json
├── portfolio.json
└── cache/
```

Repository-specific private decisions remain local where appropriate.

---

# 66. Project Discovery

```bash
nextcommit init ~/Projects
```

Stores:

```text
portfolio root:
~/Projects
```

Future:

```bash
nextcommit portfolio
```

doesn't require the path again.

---

# 67. Repository Health Score

Possible metric:

```text
Repository Health

Tests               75
Documentation       80
Reliability         68
Maintainability     74
Security            92
Dependency Health   70

Overall:
77/100
```

This score should remain secondary.

The primary output is always actionable work.

---

# 68. Recommendation Explanations

For every top recommendation, NextCommit should explain:

```text
Why now?

Why this repository?

Why this task?

Why not the alternatives?
```

Example:

```text
Why this beats other tasks:

- affects existing users,
- low implementation risk,
- clearly supported by source,
- fits your one-hour budget,
- test infrastructure already exists.
```

---

# 69. User Preference Learning

Future optional feature.

NextCommit can observe:

```text
frequently completed:
bug fixes
CLI improvements
30–90 minute work

frequently ignored:
documentation
large refactors
UI redesigns
```

The tool may use this as a weak ranking signal.

It should never hide critical issues because of preference.

---

# 70. Privacy

By default, NextCommit should:

- operate locally,
- not upload source code,
- not send telemetry containing code,
- not require an account.

If the host AI agent sends repository context externally, that is governed by the agent's own behavior/settings.

NextCommit should document this clearly.

---

# 71. Security Requirements

NextCommit must avoid reading unnecessary sensitive files.

Default exclude patterns should include:

```text
.env
.env.*
*.pem
*.key
credentials*
secrets*
```

Unless explicitly required.

Sensitive values discovered accidentally should never be emitted in normal reports.

---

# 72. Safe Command Execution

NextCommit itself should avoid dangerous commands.

No automatic:

```text
rm
git reset --hard
git push
npm publish
pip publish
```

without explicit user intent.

---

# 73. Repository Modification Policy

Scanning should be read-only except for NextCommit state files.

Commands like:

```bash
nextcommit scan
```

must not modify application source.

Implementation remains the responsibility of the host agent/user.

---

# 74. Performance Requirements

For medium repositories:

- initial deterministic scan should feel fast,
- repeated scans should reuse cached metadata,
- only changed files should ideally be re-analyzed,
- binary/generated/vendor files should be ignored.

Potential future incremental scanning:

```text
Previous commit: abc
Current commit: xyz

Analyze:
git diff abc..xyz
+
previous unresolved findings
```

---

# 75. Large Repository Handling

For large monorepos:

```bash
nextcommit scan . --scope packages/api
```

or:

```bash
nextcommit scan . --changed
```

Possible commands:

```bash
nextcommit scan --depth shallow
nextcommit scan --depth deep
```

---

# 76. Scan Depth

## Fast

```bash
nextcommit scan --fast
```

Signals:

- Git,
- README,
- TODOs,
- structure,
- tests,
- dependencies.

## Deep

```bash
nextcommit scan --deep
```

Adds more comprehensive source analysis.

---

# 77. Workspace Awareness

Monorepo:

```text
apps/
packages/
services/
```

NextCommit should identify subprojects.

Example:

```text
Workspace detected:

apps/web
apps/api
packages/ui
packages/core
```

Then findings should include workspace context.

---

# 78. Configuration

Potential:

```text
.nextcommit/config.json
```

Example:

```json
{
  "exclude": [
    "examples/",
    "legacy/"
  ],
  "priorities": {
    "security": 1.5,
    "testing": 1.2
  },
  "maxSuggestions": 10
}
```

---

# 79. CLI Configuration

```bash
nextcommit config set maxSuggestions 5
```

```bash
nextcommit config set defaultTime 1h
```

---

# 80. External Data

Future optional integrations:

- GitHub stars,
- issues,
- PRs,
- package downloads,
- npm usage,
- PyPI downloads,
- CI failures.

These should improve ranking but never be required.

---

# 81. GitHub Integration

Potential future:

```bash
nextcommit github connect
```

Could use:

- open issues,
- feature requests,
- bug reports,
- stale PRs,
- project popularity.

Example:

```text
Feature opportunity:
Add Windows support.

Evidence:
Repository issue #124
7 reactions
3 duplicate issues

Impact score increased.
```

---

# 82. Open-Source Contributor Mode

Future command:

```bash
nextcommit contribute
```

For external repositories:

- inspect help-wanted issues,
- verify issues remain unclaimed,
- map issue to code,
- estimate complexity,
- propose implementation plan.

This should be a separate mode from personal repo revival.

---

# 83. Data Model

Core entities:

```text
Portfolio
Repository
Scan
Signal
Finding
Evidence
Plan
Completion
IgnoredFinding
Preference
```

---

# 84. Repository Entity

```json
{
  "id": "repo_xyz",
  "name": "codewhy",
  "path": "/projects/codewhy",
  "lastCommit": "abc123",
  "lastScan": "...",
  "healthScore": 78,
  "revivalScore": 92
}
```

---

# 85. Signal Entity

```json
{
  "type": "todo",
  "file": "src/api/client.ts",
  "line": 93,
  "value": "retry failed requests"
}
```

---

# 86. Evidence Entity

```json
{
  "type": "source",
  "file": "src/api/client.ts",
  "lineStart": 74,
  "lineEnd": 91,
  "summary": "Request fails immediately for transient errors."
}
```

---

# 87. Plan Entity

```json
{
  "findingId": "api-retry",
  "steps": [],
  "files": [],
  "tests": [],
  "acceptanceCriteria": [],
  "estimatedMinutes": 45
}
```

---

# 88. CLI Command Surface

Initial:

```text
nextcommit
nextcommit scan
nextcommit bugs
nextcommit features
nextcommit performance
nextcommit reliability
nextcommit security
nextcommit tests
nextcommit maintainability
nextcommit dx
nextcommit polish
nextcommit quick-wins
nextcommit easy
nextcommit ambitious
nextcommit weekend
nextcommit revive
nextcommit plan <id>
nextcommit ignore <id>
nextcommit complete <id>
nextcommit reconcile
nextcommit portfolio
nextcommit best
```

---

# 89. Common Flags

```text
--json
--time
--all
--deep
--fast
--scope
--limit
--no-cache
--verbose
```

---

# 90. Examples

```bash
nextcommit best --time 30m
```

```bash
nextcommit features --limit 5
```

```bash
nextcommit bugs --all
```

```bash
nextcommit scan ~/Projects --json
```

```bash
nextcommit plan api-retry
```

---

# 91. Output Philosophy

Default output should be:

- concise,
- ranked,
- actionable.

Do not show 50 recommendations unless requested.

Default:

```text
Top 5
```

Then:

```bash
nextcommit --limit 20
```

for more.

---

# 92. Progressive Disclosure

Initial:

```text
1. Add API retries
   High impact · ~45m
```

Detailed:

```bash
nextcommit show api-retry
```

Then:

```text
Evidence
Reasoning
Files
Risk
Plan
```

This keeps CLI output usable.

---

# 93. AI Agent Workflow

The Skill should use structured phases.

```text
PHASE 1
Collect signals.

PHASE 2
Map architecture.

PHASE 3
Evaluate findings.

PHASE 4
Verify evidence.

PHASE 5
Rank.

PHASE 6
Recommend.

PHASE 7
Plan if requested.

PHASE 8
Implement only on explicit request.
```

---

# 94. Hallucination Prevention

Agent instructions must explicitly say:

- do not invent bugs,
- inspect code before labeling something confirmed,
- feature ideas must connect to repository evidence,
- do not claim performance benefit without identifying a likely bottleneck,
- do not treat outdated dependency alone as a problem,
- do not recommend trendy technologies without justification.

---

# 95. Recommendation Quality Gate

A recommendation should not appear in the top results unless it contains:

```text
title
category
classification
evidence
impact
effort
confidence
reason
next action
```

---

# 96. Duplicate Detection

Two findings referring to the same underlying problem should merge.

Example:

```text
"API request retries missing"
"Network requests fail immediately"
"502 response causes command failure"
```

may all represent one finding.

---

# 97. Stale Finding Detection

Finding becomes stale when:

- evidence lines disappear,
- implementation changes substantially,
- previous problem no longer exists,
- task was completed independently.

---

# 98. Repository Fingerprinting

Use metadata such as:

```text
repository path
remote
latest commit
file hashes for relevant files
```

to determine whether reanalysis is necessary.

---

# 99. Success Metrics

Product-level:

### Activation

Percentage of users who run:

```text
nextcommit
```

after installation.

### Recommendation Acceptance

Percentage of findings users choose to plan.

### Plan-to-Implementation

Percentage of generated plans that result in code changes.

### Completion Rate

How many selected recommendations are completed.

### Repeat Usage

Users returning to run NextCommit again.

### Portfolio Usage

Users scanning multiple repositories.

### Recommendation Quality

Percentage of recommendations:

- accepted,
- ignored,
- marked incorrect.

---

# 100. North-Star Metric

A meaningful metric:

> **Useful recommendations completed per active developer.**

Not:

> number of commits generated.

---

# 101. MVP

The MVP should avoid becoming too large.

## V1 Requirements

Build:

### Core

- repository scanning,
- stack detection,
- Git metadata,
- TODO/FIXME extraction,
- README intent extraction,
- test discovery,
- structured JSON output,
- persistent findings.

### Categories

- bugs,
- features,
- performance,
- tests,
- maintainability.

### Ranking

- impact,
- effort,
- confidence.

### Commands

```bash
nextcommit
nextcommit scan .
nextcommit bugs
nextcommit features
nextcommit performance
nextcommit quick-wins
nextcommit plan <id>
nextcommit ignore <id>
nextcommit complete <id>
```

### Integration

- npm,
- npx,
- Codex Skill.

---

# 102. MVP Example

```bash
npm install -g nextcommit

cd my-project

nextcommit
```

Output:

```text
NextCommit

1. Handle malformed configuration
   Bug
   Impact: 8
   Effort: 2
   Confidence: 99%
   ~20m

2. Add API retries
   Reliability
   Impact: 9
   Effort: 3
   Confidence: 96%
   ~45m

3. Add progress reporting
   Feature
   Impact: 8
   Effort: 4
   Confidence: 91%
   ~1h
```

That alone is a successful V1.

---

# 103. V1.5

Add:

- repository portfolio discovery,
- revival score,
- time-aware recommendations,
- best-across-repos,
- dormant repo analysis.

Commands:

```bash
nextcommit init ~/Projects
nextcommit portfolio
nextcommit best
nextcommit best --time 30m
nextcommit revive
```

---

# 104. V2

Add broader distribution:

```text
PyPI
pipx
Homebrew
Winget
Scoop
standalone binaries
```

Agent support:

```text
Codex
Claude Code
Antigravity
Gemini CLI
```

Categories:

- security,
- DX,
- reliability,
- dependencies,
- product polish.

---

# 105. V2.5

Add:

- incremental scans,
- automatic completion detection,
- ignored-finding resurfacing,
- monorepo intelligence,
- improved scoring,
- optional preference learning.

---

# 106. V3

Add optional integrations:

- GitHub,
- npm,
- PyPI,
- CI providers,
- issue trackers.

Potential:

```text
actual package downloads
open issues
user requests
stars
release cadence
CI failures
```

These signals improve recommendation priority.

---

# 107. V4

Optional MCP server.

Architecture:

```text
                    NextCommit Core
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
         CLI            Skills           MCP
          │               │               │
       humans          agents       external clients
```

---

# 108. Recommended Technology Stack

For the first implementation:

## Core

**TypeScript**

Reasons:

- natural npm distribution,
- good CLI ecosystem,
- works cross-platform,
- easy JSON handling,
- excellent Git/process tooling,
- target audience likely uses npm/npx,
- integrates well with Node-based developer tooling.

---

# 109. Potential Libraries

Keep dependencies minimal.

Possible categories:

- CLI argument parser,
- filesystem globbing,
- Git execution,
- terminal formatting,
- schema validation,
- JSON persistence.

Avoid heavy frameworks unless necessary.

---

# 110. PyPI Strategy

Do not maintain a completely separate Python implementation.

Preferred:

```text
TypeScript core
       │
       ├── npm package
       ├── standalone compiled binary
       └── PyPI installer/wrapper
```

Another future option is sharing a native binary.

Goal:

```bash
npm install -g nextcommit
```

and:

```bash
pipx install nextcommit
```

should expose the same:

```bash
nextcommit
```

command.

---

# 111. Package Structure

Recommended monorepo:

```text
nextcommit/

├── packages/
│
│   ├── core/
│   │   ├── discovery/
│   │   ├── scanning/
│   │   ├── git/
│   │   ├── scoring/
│   │   ├── state/
│   │   └── schema/
│   │
│   ├── cli/
│   │
│   ├── adapters/
│   │   ├── codex/
│   │   ├── claude/
│   │   ├── agy/
│   │   └── gemini/
│   │
│   ├── python-wrapper/
│   │
│   └── mcp/
│       └── future/
│
├── skills/
│   └── nextcommit/
│       ├── SKILL.md
│       ├── references/
│       └── scripts/
│
├── docs/
├── examples/
├── tests/
└── README.md
```

---

# 112. Internal Scan Pipeline

```text
Repository path
      ↓
Validate repository
      ↓
Load config
      ↓
Apply ignores
      ↓
Detect language/framework
      ↓
Read repository structure
      ↓
Read README/roadmap
      ↓
Analyze Git
      ↓
Extract TODO/FIXME
      ↓
Find tests
      ↓
Analyze dependencies
      ↓
Load previous state
      ↓
Generate structured signals
      ↓
Return JSON
```

---

# 113. Agent Analysis Pipeline

```text
Structured signals
      ↓
Read relevant files
      ↓
Understand architecture
      ↓
Generate candidate findings
      ↓
Verify evidence
      ↓
Remove duplicates
      ↓
Classify:
confirmed / likely / idea
      ↓
Estimate:
impact / effort / confidence / risk
      ↓
Rank
      ↓
Return recommendations
```

---

# 114. Why Not Make Everything AI?

Because deterministic tools are better at:

- counting files,
- extracting Git history,
- locating TODOs,
- reading package metadata,
- detecting timestamps,
- maintaining persistent state,
- calculating scores,
- comparing previous scans.

AI should focus on reasoning.

This reduces:

- hallucinations,
- token usage,
- cost,
- latency.

---

# 115. Why Not Make Everything Static Analysis?

Because static tools are poor at answering:

> What useful feature naturally belongs in this product?

or:

> Is this repository worth reviving?

or:

> Which of these seven tasks gives the best developer value?

That is where AI reasoning helps.

---

# 116. Competitive Differentiation

Many tools can answer:

```text
What's wrong with this code?
```

NextCommit must answer:

```text
What should I work on next?
```

And more importantly:

```text
Across everything I've built,
where should I spend my next hour?
```

---

# 117. Strongest Unique Feature

Portfolio-wide prioritization.

```text
~/Projects
     │
     ├── Repo A
     ├── Repo B
     ├── Repo C
     ├── Repo D
     └── Repo E
            │
            ▼
      NextCommit scans
            │
            ▼
       opportunities
            │
            ▼
    compare repository value
            │
            ▼
     consider time budget
            │
            ▼
      BEST NEXT COMMIT
```

---

# 118. Core User Story

> As a developer with many existing repositories, I want NextCommit to analyze what I've already built and recommend the single highest-value task that fits the time I currently have, so I can immediately begin meaningful work instead of deciding what to do.

---

# 119. User Story — Old Repository

> As a developer reopening a six-month-old project, I want NextCommit to summarize unfinished product intent and valuable improvements so I don't need to relearn the entire codebase.

---

# 120. User Story — AI CLI

> As a Codex user, I want to invoke `$nextcommit`, select one recommendation and say "implement it," so repository discovery and implementation happen inside one workflow.

---

# 121. User Story — Quick Session

> As a developer with 30 minutes free, I want NextCommit to select a realistic task that can fit that time rather than giving me a three-hour refactor.

---

# 122. User Story — Portfolio

> As a developer with 20 projects, I want to know which repository currently has the best combination of usefulness, opportunity and low effort.

---

# 123. User Story — Maintenance

> As a package maintainer, I want NextCommit to remember what I fixed and avoid suggesting the same improvement again.

---

# 124. Acceptance Criteria for V1

NextCommit V1 is ready when:

- npm installation works,
- `npx nextcommit` works,
- repository scan works,
- Git metadata is collected,
- README intent is extracted,
- TODO/FIXME signals work,
- test locations are detected,
- JSON output is stable,
- findings have evidence,
- findings contain classification,
- findings contain impact/effort/confidence,
- top recommendations are ranked,
- implementation plans can be generated,
- completed findings can be stored,
- ignored findings can be stored,
- Codex Skill integration works.

---

# 125. Quality Bar

A useful recommendation should feel like:

```text
"I wouldn't have immediately noticed this,
but after seeing the evidence I agree it is
worth fixing."
```

A bad recommendation feels like:

```text
"Add dark mode."
"Add Docker."
"Add AI."
"Write more tests."
"Improve performance."
```

without justification.

---

# 126. Example End-to-End Experience

Developer:

```bash
cd ~/Projects
codex
```

Then:

```text
$nextcommit I have one hour.
```

NextCommit scans configured projects.

Output:

```text
I analyzed 11 repositories and 43 unresolved
engineering opportunities.

BEST USE OF YOUR NEXT HOUR

Repository:
codewhy

Task:
Add bounded retry handling for transient API failures.

Evidence:
src/api/client.ts:74
src/api/request.ts:122

Impact:
9/10

Effort:
3/10

Confidence:
97%

Estimated:
45–60 minutes

Why this task:
- affects existing user workflow
- clearly supported by source
- isolated implementation
- test infrastructure already exists
- fits your time budget

Plan it?
```

User:

```text
yes
```

Codex:

```text
Implementation Plan

1. Add retryable error classifier.
2. Retry 429/502/503.
3. Add exponential backoff.
4. Limit attempts to 3.
5. Preserve permanent errors.
6. Add unit tests.

Files:
src/api/client.ts
src/api/errors.ts
tests/api.test.ts

Acceptance criteria:
...
```

User:

```text
Implement it.
```

Codex edits files and runs tests.

After commit:

```text
NextCommit detected that recommendation
api-retry has been resolved.

Recorded:
commit 72ab993
```

Next day:

```text
$nextcommit
```

Response:

```text
Yesterday:
✓ API retry handling completed

New best next commit:

pdf-editor
Add file-size validation before upload

Estimated:
25 minutes
```

That is the complete product experience.

---

# 127. Product Identity

NextCommit should become something a developer runs when they think:

```text
"I feel like coding,
but I don't know what to work on."
```

Instead of opening GitHub or randomly starting another project:

```bash
nextcommit best --time 1h
```

---

# 128. Final Product Definition

**NextCommit is an open-source repository intelligence CLI and AI Agent Skill that analyzes existing codebases, discovers evidence-backed opportunities across bugs, features, performance, reliability, security, testing, maintainability and product quality, ranks those opportunities by value and effort, and recommends the most meaningful next piece of work for the developer.**

It can operate on:

```text
one repository
        or
an entire development portfolio
```

and can answer:

```text
What should I fix?

What should I add?

What should I improve?

Which repo should I revive?

What can I finish in 30 minutes?

What can I build this weekend?

What is my best next commit?
```

The core promise is simple:

> **You already have code worth improving. NextCommit tells you where to start.**