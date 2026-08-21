import { describe, expect, it } from "vitest";
import { parseNpmRelease } from "@nextcommit/core";
describe("registry payloads", () => { it("normalizes package releases", () => expect(parseNpmRelease({ name: "nextcommit", version: "1.0.0", time: { "1.0.0": "2026-01-01" } })).toEqual({ name: "nextcommit", version: "1.0.0", publishedAt: "2026-01-01" })); });
