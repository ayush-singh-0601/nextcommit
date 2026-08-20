import { describe, expect, it } from "vitest";
import { ScanReportSchema } from "@nextcommit/core";

describe("scan schema", () => {
  it("rejects reports without versioned repository data", () => {
    expect(() => ScanReportSchema.parse({})).toThrow();
  });

  it("accepts an empty scan with a valid repository", () => {
    expect(
      ScanReportSchema.parse({
        schemaVersion: 1,
        repository: {
          name: "fixture",
          path: "/fixture",
          root: "/fixture",
          git: { dirty: false },
        },
        signals: [],
        candidates: [],
        warnings: [],
        scannedAt: "2026-08-20T00:00:00.000Z",
      }).repository.name,
    ).toBe("fixture");
  });
});
