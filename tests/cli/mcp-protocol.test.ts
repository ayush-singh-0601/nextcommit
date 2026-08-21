import { describe, expect, it } from "vitest";
import { mcpError, mcpResult } from "../../packages/cli/src/mcp-protocol.js";
describe("MCP protocol", () => { it("creates JSON-RPC results and errors", () => { expect(mcpResult(1, { ok: true })).toMatchObject({ id: 1, result: { ok: true } }); expect(mcpError(1, -1, "x").error?.code).toBe(-1); }); });
