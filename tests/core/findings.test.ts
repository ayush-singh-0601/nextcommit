import { describe, expect, it } from "vitest";
import { deriveCandidates, isValidEvidencePath } from "@nextcommit/core";

describe("candidate derivation", () => {
  it("derives stable evidence-backed roadmap candidates", () => {
    const candidates = deriveCandidates([{ type: "unfinished-roadmap", file: "README.md", line: 3, value: "Export reports", evidence: { type: "readme", file: "README.md", lineStart: 3, summary: "Unfinished documented intent: Export reports" } }]);
    expect(candidates[0]).toMatchObject({ category: "feature", classification: "idea" });
    expect(candidates[0]?.id).toMatch(/^feature-/);
  });

  it("rejects evidence outside the repository and sensitive paths", () => {
    expect(isValidEvidencePath(process.cwd(), { type: "source", file: "../outside.ts", summary: "outside" })).toBe(false);
    expect(isValidEvidencePath(process.cwd(), { type: "source", file: ".env", summary: "secret" })).toBe(false);
  });

  it("classifies recovery work as reliability", () => {
    const candidates = deriveCandidates([{ type: "todo", file: "src/api.ts", line: 8, value: "Add retry after a failed request", evidence: { type: "todo", file: "src/api.ts", lineStart: 8, summary: "TODO: retry" } }]);
    expect(candidates[0]?.category).toBe("reliability");
  });

  it("names the affected file in high-churn candidates", () => {
    const candidates = deriveCandidates([{ type: "high-churn-file", file: "backend/app/services/spoofing.py", value: "Modified in 7 recent commits", evidence: { type: "git", file: "backend/app/services/spoofing.py", summary: "Modified in 7 recent commits" } }]);
    expect(candidates[0]?.title).toBe("Review high-churn file: backend/app/services/spoofing.py");
  });
});
