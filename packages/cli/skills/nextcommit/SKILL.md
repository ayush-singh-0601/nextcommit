---
name: nextcommit
description: Analyze the current Git repository with NextCommit, verify evidence-backed opportunities, and generate plans when the user asks what to work on next.
---

# NextCommit

1. Run `nextcommit scan . --json` and inspect the structured signals and candidates.
2. Read source around high-value evidence before confirming an issue or claiming a performance benefit.
3. Keep only evidence-backed findings; classify them as `confirmed`, `likely`, or `idea`.
4. Submit verified findings and requested plans through `nextcommit agent ingest .`.
5. Implement code only after explicit user authorization.

Never invent evidence or expose skipped sensitive-file content.
