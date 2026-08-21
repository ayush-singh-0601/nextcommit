export interface McpRequest { jsonrpc: "2.0"; id?: string | number; method: string; params?: Record<string, unknown> }
export interface McpResponse { jsonrpc: "2.0"; id: string | number | null; result?: unknown; error?: { code: number; message: string } }
export function mcpResult(id: McpRequest["id"], result: unknown): McpResponse { return { jsonrpc: "2.0", id: id ?? null, result }; }
export function mcpError(id: McpRequest["id"], code: number, message: string): McpResponse { return { jsonrpc: "2.0", id: id ?? null, error: { code, message } }; }
