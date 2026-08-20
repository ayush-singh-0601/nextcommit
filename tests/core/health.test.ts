import { describe, expect, it } from "vitest";
import { assessRepositoryHealth } from "@nextcommit/core";

describe("repository health", () => {
  it("flags source repositories with no tests", () => {
    const health = assessRepositoryHealth({ schemaVersion: 1, repository: { name: "x", path: "x", root: "x", git: { dirty: false }, languages: [], frameworks: [] }, signals: [{ type: "source-file-count", value: "3" }, { type: "test-file-count", value: "0" }], candidates: [], warnings: [], scannedAt: "2026-01-01T00:00:00.000Z" });
    expect(health).toMatchObject({ score: 75, summary: "needs attention" });
  });
});
