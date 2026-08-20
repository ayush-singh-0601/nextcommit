import path from "node:path";
import { realpath } from "node:fs/promises";
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

  it("rejects a non-Git fixture", async () => {
    await expect(resolveRepository("tests/fixtures/python-repo")).rejects.toBeInstanceOf(RepositoryError);
  });
});
