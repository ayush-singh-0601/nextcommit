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

  it("does not mistake an application route named test for a test file", () => {
    const route = { absolutePath: "/repo/app/api/test/route.ts", relativePath: "app/api/test/route.ts", size: 100 };
    const structure = classifyRepositoryStructure([route]);
    expect(structure.source).toContain("app/api/test/route.ts");
    expect(structure.tests).not.toContain("app/api/test/route.ts");
  });

  it("recognizes conventional singular test roots", () => {
    const files = [
      { absolutePath: "/repo/test/unit.ts", relativePath: "test/unit.ts", size: 100 },
      { absolutePath: "/repo/packages/core/test/unit.ts", relativePath: "packages/core/test/unit.ts", size: 100 },
      { absolutePath: "/repo/src/test/unit.ts", relativePath: "src/test/unit.ts", size: 100 },
    ];
    expect(classifyRepositoryStructure(files).tests).toEqual(files.map((file) => file.relativePath));
  });
});
