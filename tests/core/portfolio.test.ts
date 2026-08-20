import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { addPortfolioRoot, loadPortfolioConfig } from "@nextcommit/core";

describe("portfolio configuration", () => {
  it("persists unique portfolio roots", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "nextcommit-"));
    try { await addPortfolioRoot("one", directory); await addPortfolioRoot("one", directory); expect((await loadPortfolioConfig(directory)).roots).toHaveLength(1); }
    finally { await rm(directory, { recursive: true, force: true }); }
  });
});
