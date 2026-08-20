import { describe, expect, it } from "vitest";
import { PRODUCT_NAME, SCHEMA_VERSION } from "@nextcommit/core";

describe("product contract", () => {
  it("exposes stable identity constants", () => {
    expect(PRODUCT_NAME).toBe("NextCommit");
    expect(SCHEMA_VERSION).toBe(1);
  });
});

