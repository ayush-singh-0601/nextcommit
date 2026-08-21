---
name: nextcommit
description: Analyze the current Git repository with NextCommit, verify evidence-backed opportunities, and generate plans when the user asks what to work on next.
---

# NextCommit

1. Resolve one CLI launcher before scanning, without recursively inspecting `node_modules`:
   - Prefer the repository-local package when `node_modules/nextcommit/dist/cli/src/bin.js` exists: use `node node_modules/nextcommit/dist/cli/src/bin.js`.
   - Otherwise, if `nextcommit --version` succeeds, use `nextcommit`.
   - Otherwise, resolve `npm root -g` and, when its `nextcommit/dist/cli/src/bin.js` exists, invoke that file with `node`.
   - If none exists, report that NextCommit is not installed and ask before installing anything. Never claim a scan completed unless the command exited successfully.
2. Run `<launcher> scan . --json` and inspect the structured signals and candidates. Reuse the same launcher for every later NextCommit command.
3. Read source around high-value evidence before confirming an issue or claiming a performance benefit.
4. Keep only evidence-backed findings; classify them as `confirmed`, `likely`, or `idea`.
5. Submit verified findings and requested plans through `<launcher> agent ingest .`.
6. Implement code only after explicit user authorization.

Never invent evidence or expose skipped sensitive-file content.
