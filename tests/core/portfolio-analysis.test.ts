import { describe, expect, it } from "vitest";
import { scanPortfolio } from "@nextcommit/core";

describe("portfolio scanning", () => {
  it("returns an empty report for no roots", async () => {
    await expect(scanPortfolio([])).resolves.toEqual({ repositories: [] });
  });
});
