import path from "node:path";
import { describe, expect, it } from "vitest";
import { detectStack, indexRepositoryFiles } from "@nextcommit/core";

describe("stack detection", () => {
  it("detects TypeScript and Node from a package fixture", async () => {
    const stack = await detectStack(await indexRepositoryFiles(path.resolve("tests/fixtures/typescript-repo")));
    expect(stack.languages).toContain("typescript");
    expect(stack.frameworks).toContain("node");
  });

  it("detects Python and Rust manifests", async () => {
    const python = await detectStack(await indexRepositoryFiles(path.resolve("tests/fixtures/python-repo")));
    const rust = await detectStack(await indexRepositoryFiles(path.resolve("tests/fixtures/rust-repo")));
    expect(python.languages).toContain("python");
    expect(rust.languages).toContain("rust");
  });
});
