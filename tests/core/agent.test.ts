import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { saveAgentAnalysis, saveState, StaleAgentAnalysisError } from "@nextcommit/core";

const finding = { id: "retry", title: "Add retry", category: "reliability", classification: "likely", impact: 9, effort: 3, relevance: 9, confidence: 0.9, risk: "low", score: 24.3, status: "open", estimatedMinutes: 45, evidence: [{ type: "source", file: "src/api.ts", summary: "throws" }], reason: "No retry" };
describe("agent analysis ingestion", () => {
  it("persists only analysis for the current scan fingerprint", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "nextcommit-"));
    try {
      await saveState(root, { version: 1, lastScan: "2026-08-20T00:00:00.000Z", repositoryFingerprint: "current" });
      await expect(saveAgentAnalysis(root, { schemaVersion: 1, repositoryFingerprint: "old", findings: [finding] })).rejects.toBeInstanceOf(StaleAgentAnalysisError);
      await expect(saveAgentAnalysis(root, { schemaVersion: 1, repositoryFingerprint: "current", findings: [finding] })).resolves.toMatchObject({ findings: [finding] });
    } finally { await rm(root, { recursive: true, force: true }); }
  });
});
