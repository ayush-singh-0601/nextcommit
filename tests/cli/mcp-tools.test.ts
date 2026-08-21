import { describe, expect, it } from "vitest";
import { mcpTools } from "../../packages/cli/src/mcp-tools.js";
describe("MCP tools", () => { it("registers repository scan and lifecycle tools", () => expect(Object.keys(mcpTools)).toEqual(["nextcommit.scan", "nextcommit.findings", "nextcommit.ignore", "nextcommit.complete"])); });
