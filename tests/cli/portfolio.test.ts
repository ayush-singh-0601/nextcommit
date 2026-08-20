import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { runCli } from "../../packages/cli/src/index.js";

describe("portfolio CLI", () => {
  const originalWrite = process.stdout.write;
  afterEach(() => { process.stdout.write = originalWrite; vi.restoreAllMocks(); });

  it("adds a configured root", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "nextcommit-cli-"));
    const originalHome = process.env.NEXTCOMMIT_HOME;
    process.env.NEXTCOMMIT_HOME = path.join(directory, "state");
    const write = vi.fn();
    process.stdout.write = write as typeof process.stdout.write;
    try {
      await runCli(["node", "nextcommit", "init", directory]);
      expect(write).toHaveBeenCalledWith(expect.stringContaining("Added"));
    } finally { process.env.NEXTCOMMIT_HOME = originalHome; await rm(directory, { recursive: true, force: true }); }
  });
});
