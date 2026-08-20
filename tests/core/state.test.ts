import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadState, saveState } from "@nextcommit/core";

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
});
