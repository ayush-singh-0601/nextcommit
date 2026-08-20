import path from "node:path";
import { describe, expect, it } from "vitest";
import { collectManifestSignals, indexRepositoryFiles } from "@nextcommit/core";

describe("manifest signals", () => {
  it("collects package scripts", async () => {
    const signals = await collectManifestSignals(await indexRepositoryFiles(path.resolve("tests/fixtures/typescript-repo")));
    expect(signals).toContainEqual(expect.objectContaining({ type: "package-script", value: "test" }));
  });
});
