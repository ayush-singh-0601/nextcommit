import path from "node:path";
import { describe, expect, it } from "vitest";
import { extractReadmeIntent, indexRepositoryFiles } from "@nextcommit/core";

describe("README intent extraction", () => {
  it("finds unchecked roadmap work with line evidence", async () => {
    const signals = await extractReadmeIntent(await indexRepositoryFiles(path.resolve("tests/fixtures/typescript-repo")));
    expect(signals).toHaveLength(1);
    expect(signals[0]?.value).toBe("Export reports");
    expect(signals[0]?.evidence?.file).toBe("README.md");
  });
});
