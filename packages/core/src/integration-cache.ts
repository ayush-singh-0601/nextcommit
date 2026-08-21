import path from "node:path";
import { globalStateDirectory } from "./portfolio.js";
import { readJson, writeJsonAtomic } from "./state.js";
import type { IntegrationResult } from "./integrations.js";
export async function loadIntegrationCache(key: string, directory = globalStateDirectory()): Promise<IntegrationResult | undefined> { return readJson<IntegrationResult>(path.join(directory, "integrations", `${key}.json`)); }
export async function saveIntegrationCache(key: string, result: IntegrationResult, directory = globalStateDirectory()): Promise<void> { await writeJsonAtomic(path.join(directory, "integrations", `${key}.json`), result); }
