import { completeFinding, ignoreFinding, loadFindings, scanRepository } from "../../core/src/index.js";
import type { McpTool } from "./mcp-server.js";

function target(params: Record<string, unknown>): string { return typeof params.path === "string" ? params.path : "."; }
export const scanTool: McpTool = async (params) => scanRepository(target(params), { persistState: true });
export const findingsTool: McpTool = async (params) => loadFindings((await scanRepository(target(params), { persistState: false })).repository.root);
export const ignoreTool: McpTool = async (params) => { const id = typeof params.id === "string" ? params.id : ""; if (!id) throw new Error("id is required"); const report = await scanRepository(target(params), { persistState: false }); await ignoreFinding(report.repository.root, id, typeof params.reason === "string" ? params.reason : undefined); return { id, status: "ignored" }; };
export const completeTool: McpTool = async (params) => { const id = typeof params.id === "string" ? params.id : ""; if (!id) throw new Error("id is required"); const report = await scanRepository(target(params), { persistState: false }); await completeFinding(report.repository.root, id, []); return { id, status: "completed" }; };
export const mcpTools = { "nextcommit.scan": scanTool, "nextcommit.findings": findingsTool, "nextcommit.ignore": ignoreTool, "nextcommit.complete": completeTool };
