import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadIntegrationCache, saveIntegrationCache } from "@nextcommit/core";
describe("integration cache", () => { it("persists fetched provider results locally", async () => { const directory = await mkdtemp(path.join(os.tmpdir(), "nextcommit-cache-")); try { await saveIntegrationCache("fixture", { provider: "fixture", fetchedAt: "2026-01-01T00:00:00.000Z", data: 1 }, directory); expect((await loadIntegrationCache("fixture", directory))?.data).toBe(1); } finally { await rm(directory, { recursive: true, force: true }); } }); });
