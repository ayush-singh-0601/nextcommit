import { describe, expect, it } from "vitest";
import { migrateRecord } from "@nextcommit/core";
describe("extension primitives", () => {
  it("migrates versioned records", () => expect(migrateRecord({ version: 1 }, 2, { 1: (record) => ({ ...record, version: 2 }) }).version).toBe(2));
});
