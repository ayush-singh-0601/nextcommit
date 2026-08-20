import path from "node:path";
import { describe, expect, it } from "vitest";
import { RepositoryError, resolveRepository, runGit } from "@nextcommit/core";

describe("Git repository resolution", () => {
  it("resolves the workspace repository", async () => {
    const repository = await resolveRepository(process.cwd());
    expect(repository.root).toBe(path.resolve(process.cwd()));
    expect(await runGit(repository.root, ["rev-parse", "--is-inside-work-tree"])).toBe("true");
  });

  it("rejects a non-Git fixture", async () => {
    await expect(resolveRepository("tests/fixtures/python-repo")).rejects.toBeInstanceOf(RepositoryError);
  });
});
