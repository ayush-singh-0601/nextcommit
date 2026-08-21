import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadPreferences, savePreferences } from "@nextcommit/core";
describe("preferences", () => { it("persists local recommendation preferences", async () => { const directory = await mkdtemp(path.join(os.tmpdir(), "nextcommit-preferences-")); try { await savePreferences({ version: 1, defaultMode: "easy", excludedCategories: ["polish"] }, directory); expect((await loadPreferences(directory)).defaultMode).toBe("easy"); } finally { await rm(directory, { recursive: true, force: true }); } }); });
