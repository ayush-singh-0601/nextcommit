import { createInterface } from "node:readline";
import { mcpError, mcpResult, type McpRequest, type McpResponse } from "./mcp-protocol.js";

export type McpTool = (params: Record<string, unknown>) => Promise<unknown> | unknown;
export interface McpToolDescriptor { description: string; handler: McpTool }
export type McpToolSet = Record<string, McpTool | McpToolDescriptor>;
function resolveTool(tool: McpTool | McpToolDescriptor): McpToolDescriptor { return typeof tool === "function" ? { description: "", handler: tool } : tool; }
export function createMcpHandler(tools: McpToolSet): (request: McpRequest) => Promise<McpResponse> {
  return async (request) => {
    if (request.method === "initialize") return mcpResult(request.id, { protocolVersion: "2024-11-05", serverInfo: { name: "nextcommit", version: "0.1.0" }, capabilities: { tools: {} } });
    if (request.method === "tools/list") return mcpResult(request.id, { tools: Object.entries(tools).map(([name, tool]) => ({ name, description: resolveTool(tool).description })) });
    if (request.method !== "tools/call") return mcpError(request.id, -32601, `Method not found: ${request.method}`);
    const name = typeof request.params?.name === "string" ? request.params.name : "";
    const tool = tools[name];
    if (!tool) return mcpError(request.id, -32602, `Unknown tool: ${name}`);
    try { return mcpResult(request.id, { content: [{ type: "text", text: JSON.stringify(await resolveTool(tool).handler((request.params?.arguments as Record<string, unknown>) ?? {})) }] }); }
    catch (error) { return mcpError(request.id, -32000, error instanceof Error ? error.message : "Tool failed"); }
  };
}
export async function startMcpServer(tools: McpToolSet, input = process.stdin, output = process.stdout): Promise<void> {
  const handle = createMcpHandler(tools);
  for await (const line of createInterface({ input, crlfDelay: Infinity })) {
    try { output.write(`${JSON.stringify(await handle(JSON.parse(line) as McpRequest))}\\n`); } catch { output.write(`${JSON.stringify(mcpError(undefined, -32700, "Parse error"))}\\n`); }
  }
}
