import path from "node:path";
import { describe, expect, it } from "vitest";
import { classifyRepositoryStructure, indexRepositoryFiles } from "@nextcommit/core";

describe("repository structure classification", () => {
  it("separates source tests and documentation", async () => {
    const structure = classifyRepositoryStructure(await indexRepositoryFiles(path.resolve("tests/fixtures/typescript-repo")));
    expect(structure.source).toContain("src/index.ts");
    expect(structure.tests).toContain("tests/index.test.ts");
    expect(structure.docs).toContain("README.md");
  });
});
