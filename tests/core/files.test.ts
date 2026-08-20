import path from "node:path";
import { describe, expect, it } from "vitest";
import { indexRepositoryFiles, isSensitivePath } from "@nextcommit/core";

describe("repository file index", () => {
  it("respects the repository .gitignore", async () => {
    const root = path.resolve("tests/fixtures/typescript-repo");
    const files = await indexRepositoryFiles(root);
    expect(files.map((file) => file.relativePath)).toContain("src/index.ts");
    expect(files.map((file) => file.relativePath)).not.toContain(".env");
  });

  it("recognizes sensitive paths without reading their values", () => {
    expect(isSensitivePath(".env.production")).toBe(true);
    expect(isSensitivePath("config/credentials.json")).toBe(true);
    expect(isSensitivePath("src/index.ts")).toBe(false);
  });
});
