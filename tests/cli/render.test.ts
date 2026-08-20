import { describe, expect, it } from "vitest";
import { renderReport } from "../../packages/cli/src/index.js";

describe("CLI report rendering", () => {
  it("renders a concise evidence-backed candidate list", () => {
    expect(renderReport({ schemaVersion: 1, repository: { name: "fixture", path: "/fixture", root: "/fixture", git: { dirty: false }, languages: ["typescript"], frameworks: [] }, signals: [], candidates: [{ id: "feature-1", title: "Implement export", category: "feature", classification: "idea", evidence: [{ type: "readme", file: "README.md", summary: "Roadmap" }], reason: "Roadmap", estimatedMinutes: 45 }], warnings: [], scannedAt: "2026-08-20T00:00:00.000Z" })).toContain("Implement export");
  });
});
