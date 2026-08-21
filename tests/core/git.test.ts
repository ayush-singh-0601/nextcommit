import path from "node:path";
import { mkdtemp, realpath, rm } from "node:fs/promises";
import os from "node:os";
import { describe, expect, it } from "vitest";
import { collectChurnSignals, collectGitMetadata, RepositoryError, resolveRepository, runGit } from "@nextcommit/core";

describe("Git repository resolution", () => {
  it("resolves the workspace repository", async () => {
    const repository = await resolveRepository(process.cwd());
    expect(repository.root).toBe(await realpath(path.resolve(process.cwd())));
    expect(await runGit(repository.root, ["rev-parse", "--is-inside-work-tree"])).toBe("true");
  });

  it("collects branch and commit metadata", async () => {
    const metadata = await collectGitMetadata(process.cwd());
    expect(metadata.head).toMatch(/^[0-9a-f]{40}$/);
    expect(metadata.recentCommitCount).toBeGreaterThan(0);
  });

  it("returns bounded churn signals", async () => {
    const signals = await collectChurnSignals(process.cwd());
    expect(signals.length).toBeLessThanOrEqual(10);
  });

  it("rejects a directory outside any Git worktree", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "nextcommit-non-git-"));
    try {
      await expect(resolveRepository(directory)).rejects.toBeInstanceOf(RepositoryError);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
