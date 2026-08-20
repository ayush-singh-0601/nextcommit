import { describe, expect, it } from "vitest";
import { scoreRevivalOpportunity } from "@nextcommit/core";

describe("revival scoring", () => {
  it("rewards repositories with explicit unfinished work", () => {
    const score = scoreRevivalOpportunity({ schemaVersion: 1, repository: { name: "x", path: "x", root: "x", git: { dirty: false, head: "a" }, languages: [], frameworks: [] }, signals: [{ type: "readme-task", value: "ship it" }], candidates: [], warnings: [], scannedAt: "2026-01-01T00:00:00.000Z" }, Date.parse("2026-03-01T00:00:00.000Z"));
    expect(score).toEqual({ score: 40, reasons: ["has a committed baseline", "contains unfinished roadmap work", "has not been scanned recently"] });
  });
});
