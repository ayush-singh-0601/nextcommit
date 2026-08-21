---
name: nextcommit
description: Analyze the current Git repository with NextCommit, present a verified shortlist, and create a plan after the user selects an issue.
---

# NextCommit

Use this skill when the user invokes `$nextcommit` or asks which meaningful change to make in the current repository.

## Workflow

1. Resolve one CLI launcher before scanning, without recursively inspecting `node_modules`:
   - Prefer the repository-local package when `node_modules/nextcommit/dist/cli/src/bin.js` exists: use `node node_modules/nextcommit/dist/cli/src/bin.js`.
   - Otherwise, if `nextcommit --version` succeeds, use `nextcommit`.
   - Otherwise, resolve `npm root -g` and, when its `nextcommit/dist/cli/src/bin.js` exists, invoke that file with `node`.
   - If none exists, report that NextCommit is not installed and ask before installing anything. Never claim a scan completed unless the command exited successfully.
2. Run `<launcher> scan . --json`. Reuse the same launcher for every later command and retain `repositoryFingerprint` from the JSON report.
3. Inspect the source around the strongest candidates. Verify enough candidates to present 5 or 6 credible issues. If fewer than 5 survive verification, list fewer rather than inventing work.
4. In the first response, present only a concise numbered shortlist. For each issue include:
   - title and category;
   - one-sentence description;
   - classification: `confirmed`, `likely`, or `idea`;
   - exact evidence file;
   - realistic effort estimate.
5. Ask the user to select an issue by number or id. Do not create a detailed plan or modify source files before the selection unless the user explicitly identified one task in the original request.
6. After the user selects an issue, automatically:
   - re-check its evidence;
   - create a plan with files, steps, tests, acceptance criteria, risk, estimate, and a sensible commit sequence;
   - submit the selected finding and plan through `<launcher> agent ingest .` using JSON on standard input;
   - show a concise plan summary and ask for implementation approval.
7. Implement only after explicit user authorization. Run relevant checks and preserve unrelated worktree changes.

## Agent analysis envelope

Do not inspect dependency source to discover the ingestion shape. Submit this documented structure:

```json
{
  "schemaVersion": 1,
  "repositoryFingerprint": "<repositoryFingerprint from scan JSON>",
  "findings": [
    {
      "id": "<stable id>",
      "title": "<title>",
      "category": "bug",
      "classification": "confirmed",
      "evidence": [
        {
          "type": "source",
          "file": "src/example.ts",
          "lineStart": 1,
          "summary": "<verified evidence>"
        }
      ],
      "reason": "<why this matters>",
      "estimatedMinutes": 90,
      "impact": 8,
      "effort": 4,
      "relevance": 9,
      "confidence": 0.9,
      "risk": "medium",
      "score": 80,
      "status": "open"
    }
  ],
  "plans": [
    {
      "findingId": "<same finding id>",
      "steps": ["<implementation step>"],
      "files": ["src/example.ts"],
      "tests": ["<test command or test case>"],
      "acceptanceCriteria": ["<observable success criterion>"],
      "risk": "medium",
      "estimatedMinutes": 90,
      "commitSequence": ["<meaningful commit>"]
    }
  ]
}
```

Allowed categories are `bug`, `feature`, `performance`, `reliability`, `security`, `test`, `maintainability`, `dx`, `polish`, `dependency`, and `documentation`. Risk is `low`, `medium`, or `high`. Scores range from 0 to 100. Evidence paths must stay inside the repository.

Never invent evidence, expose skipped sensitive-file content, present churn as proof, or implement a recommendation without explicit approval.
