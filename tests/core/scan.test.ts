import { describe, expect, it } from "vitest";
import { scanRepository } from "@nextcommit/core";

describe("repository scan", () => {
  it("composes deterministic signals into a versioned report", async () => {
    const report = await scanRepository(process.cwd());
    expect(report.schemaVersion).toBe(1);
    expect(report.repositoryFingerprint).toMatch(/^[0-9a-f]{64}$/);
    expect(report.repository.git.head).toMatch(/^[0-9a-f]{40}$/);
    expect(report.signals.some((signal) => signal.type === "source-file-count")).toBe(true);
  }, 15_000);
});
