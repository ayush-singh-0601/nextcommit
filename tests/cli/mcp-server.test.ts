import { Readable, Writable } from "node:stream";
import { describe, expect, it } from "vitest";
import { createMcpHandler, startMcpServer } from "../../packages/cli/src/mcp-server.js";
describe("MCP server", () => {
  it("lists registered local tools", async () => expect((await createMcpHandler({ ping: { description: "Checks connectivity", handler: () => "pong" } })({ jsonrpc: "2.0", id: 1, method: "tools/list" })).result).toEqual({ tools: [{ name: "ping", description: "Checks connectivity" }] }));
  it("serves a stdio tool call", async () => {
    let output = "";
    const sink = new Writable({ write(chunk, _encoding, callback) { output += chunk.toString(); callback(); } });
    await startMcpServer({ ping: () => "pong" }, Readable.from([JSON.stringify({ jsonrpc: "2.0", id: 7, method: "tools/call", params: { name: "ping" } }) + String.fromCharCode(10)]), sink);
    expect(JSON.parse(output)).toMatchObject({ id: 7, result: { content: [{ text: '"pong"' }] } });
  });
});
