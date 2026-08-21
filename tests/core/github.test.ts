import { describe, expect, it } from "vitest";
import { parseGitHubIssues } from "@nextcommit/core";
describe("GitHub payloads", () => { it("accepts only usable issue records", () => expect(parseGitHubIssues([{ number: 1, title: "Fix", state: "open", labels: [{ name: "bug" }] }, {}])).toEqual([{ number: 1, title: "Fix", state: "open", labels: ["bug"] }])); });
