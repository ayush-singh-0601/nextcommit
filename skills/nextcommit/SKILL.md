---
name: nextcommit
description: Analyze the current Git repository with NextCommit, verify evidence-backed opportunities, and generate plans when the user asks what to work on next.
---

# NextCommit

Use this skill when the user invokes `$nextcommit` or asks which meaningful change to make in the current repository.

1. Run `nextcommit scan . --json` and inspect the structured signals and candidates.
2. Read the source around high-value evidence before calling a bug confirmed or estimating performance benefit.
3. Produce only evidence-backed findings. Classify them as `confirmed`, `likely`, or `idea`; do not turn every TODO into a recommendation.
4. When a finding is worth retaining, submit a valid `AgentAnalysisEnvelope` through `nextcommit agent ingest .` so NextCommit can remember it.
5. Generate an implementation plan only when requested. Include files, tests, acceptance criteria, and realistic risk.

Never invent evidence, expose skipped sensitive-file content, or implement a recommendation unless the user explicitly asks to implement it.
