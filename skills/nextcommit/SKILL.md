---
name: nextcommit
description: Analyze the current Git repository with NextCommit, verify evidence-backed opportunities, and generate plans when the user asks what to work on next.
---

# NextCommit

Use this skill when the user invokes `$nextcommit` or asks which meaningful change to make in the current repository.

1. Resolve one CLI launcher before scanning, without recursively inspecting `node_modules`:
   - Prefer the repository-local package when `node_modules/nextcommit/dist/cli/src/bin.js` exists: use `node node_modules/nextcommit/dist/cli/src/bin.js`.
   - Otherwise, if `nextcommit --version` succeeds, use `nextcommit`.
   - Otherwise, resolve `npm root -g` and, when its `nextcommit/dist/cli/src/bin.js` exists, invoke that file with `node`.
   - If none exists, report that NextCommit is not installed and ask before installing anything. Never claim a scan completed unless the command exited successfully.
2. Run `<launcher> scan . --json` and inspect the structured signals and candidates. Reuse the same launcher for every later NextCommit command.
3. Read the source around high-value evidence before calling a bug confirmed or estimating performance benefit.
4. Produce only evidence-backed findings. Classify them as `confirmed`, `likely`, or `idea`; do not turn every TODO into a recommendation.
5. When a finding is worth retaining, submit a valid `AgentAnalysisEnvelope` through `<launcher> agent ingest .` so NextCommit can remember it.
6. Generate an implementation plan only when requested. Include files, tests, acceptance criteria, and realistic risk.

Never invent evidence, expose skipped sensitive-file content, or implement a recommendation unless the user explicitly asks to implement it.
