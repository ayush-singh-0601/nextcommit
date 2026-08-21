import { describe, expect, it } from "vitest";
import { createMcpHandler } from "../../packages/cli/src/mcp-server.js";
describe("MCP server", () => { it("lists registered local tools", async () => expect((await createMcpHandler({ ping: { description: "Checks connectivity", handler: () => "pong" } })({ jsonrpc: "2.0", id: 1, method: "tools/list" })).result).toEqual({ tools: [{ name: "ping", description: "Checks connectivity" }] })); });
