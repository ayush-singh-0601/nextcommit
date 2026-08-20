import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { completeFinding, ignoreFinding, loadPlan, loadState, savePlan, saveState } from "@nextcommit/core";

describe("state persistence", () => {
  it("atomically round-trips local state", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "nextcommit-"));
    try {
      await saveState(root, { version: 1, lastScan: "2026-08-20T00:00:00.000Z", repositoryFingerprint: "abc" });
      expect(await loadState(root)).toMatchObject({ repositoryFingerprint: "abc" });
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("records lifecycle decisions and plans", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "nextcommit-"));
    try {
      await ignoreFinding(root, "idea", "not now");
      await completeFinding(root, "fix", ["src/index.ts"], "abc123");
      await savePlan(root, { findingId: "fix", steps: ["edit"], files: ["src/index.ts"], tests: ["test"], acceptanceCriteria: ["passes"], risk: "low", estimatedMinutes: 20 });
      expect((await loadPlan(root, "fix"))?.findingId).toBe("fix");
    } finally { await rm(root, { recursive: true, force: true }); }
  });
});
