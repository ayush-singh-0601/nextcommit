import { describe, expect, it } from "vitest";
import { rankFindings, scoreFinding, type FindingInput } from "@nextcommit/core";

const finding: FindingInput = {
  id: "retry", title: "Add retry", category: "reliability", classification: "likely", impact: 9, effort: 3, relevance: 9, confidence: 0.9, risk: "low", estimatedMinutes: 45,
  evidence: [{ type: "source", file: "src/api.ts", lineStart: 10, summary: "Throws immediately" }], reason: "No retry",
};

describe("finding scoring", () => {
  it("rewards high-impact low-effort evidence", () => {
    expect(scoreFinding(finding).score).toBeGreaterThan(20);
  });
  it("hides ignored work and merges duplicate evidence", () => {
    const open = scoreFinding(finding);
    const ignored = { ...open, id: "duplicate", status: "ignored" as const };
    expect(rankFindings([open, ignored])).toEqual([open]);
  });
});
