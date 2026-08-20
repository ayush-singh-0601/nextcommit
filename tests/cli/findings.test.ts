import { describe, expect, it } from "vitest";
import { renderFinding } from "../../packages/cli/src/index.js";

describe("finding rendering", () => {
  it("includes classification and evidence", () => {
    expect(renderFinding({ id: "retry", title: "Add retry", category: "reliability", classification: "likely", impact: 9, effort: 3, relevance: 9, confidence: 0.9, risk: "low", score: 24.3, status: "open", estimatedMinutes: 45, evidence: [{ type: "source", file: "src/api.ts", lineStart: 10, summary: "throws" }], reason: "No retry" })).toContain("src/api.ts:10");
  });
});
