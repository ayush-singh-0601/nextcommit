import path from "node:path";
import { describe, expect, it } from "vitest";
import { extractTodoSignals, indexRepositoryFiles } from "@nextcommit/core";

describe("TODO and FIXME extraction", () => {
  it("records source evidence without promoting it to a finding", async () => {
    const signals = await extractTodoSignals(await indexRepositoryFiles(path.resolve("tests/fixtures/typescript-repo")));
    expect(signals[0]).toMatchObject({ type: "todo", file: "src/index.ts", value: "add bounded retry handling" });
  });
});
