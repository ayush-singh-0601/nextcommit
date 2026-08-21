import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { loadFindings, runGit, scanRepository } from "@nextcommit/core";
import { runCli } from "../../packages/cli/src/index.js";

describe("agent ingest command", () => {
  it("parses ingest as a nested command instead of a repository path", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "nextcommit-agent-cli-"));
    const stdout = vi.spyOn(process.stdout, "write").mockImplementation((() => true) as typeof process.stdout.write);
    const stderr = vi.spyOn(process.stderr, "write").mockImplementation((() => true) as typeof process.stderr.write);
    const previousExitCode = process.exitCode;
    process.exitCode = undefined;
    try {
      await runGit(root, ["init"]);
      await writeFile(path.join(root, "README.md"), "# Fixture\n", "utf8");
      const report = await scanRepository(root, { persistState: true });
      await runCli(["node", "nextcommit", "agent", "ingest", root], {
        readInput: async () => JSON.stringify({ schemaVersion: 1, repositoryFingerprint: report.repositoryFingerprint, findings: [], plans: [] }),
      });
      expect(process.exitCode).toBeUndefined();
      expect(stderr).not.toHaveBeenCalled();
      expect(stdout.mock.calls.flat().join("")).toContain('{"findings":0');
      await expect(loadFindings(root)).resolves.toEqual([]);
    } finally {
      process.exitCode = previousExitCode;
      stdout.mockRestore();
      stderr.mockRestore();
      await rm(root, { recursive: true, force: true });
    }
  });
});
