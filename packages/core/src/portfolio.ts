import { readdir, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { resolveRepository } from "./git.js";
import { readJson, writeJsonAtomic } from "./state.js";

export interface PortfolioConfig { version: 1; roots: string[] }
export interface DiscoveredRepository { path: string; name: string }

export function globalStateDirectory(): string { return path.join(os.homedir(), ".nextcommit"); }
export async function loadPortfolioConfig(directory = globalStateDirectory()): Promise<PortfolioConfig> {
  return (await readJson<PortfolioConfig>(path.join(directory, "config.json"))) ?? { version: 1, roots: [] };
}
export async function addPortfolioRoot(root: string, directory = globalStateDirectory()): Promise<PortfolioConfig> {
  const config = await loadPortfolioConfig(directory);
  const resolved = path.resolve(root);
  const next = { ...config, roots: [...new Set([...config.roots, resolved])] };
  await writeJsonAtomic(path.join(directory, "config.json"), next);
  return next;
}
export async function discoverRepositories(root: string, maxDepth = 4): Promise<DiscoveredRepository[]> {
  const found = new Map<string, DiscoveredRepository>();
  async function visit(directory: string, depth: number): Promise<void> {
    try { const repository = await resolveRepository(directory); found.set(repository.root, { path: repository.root, name: path.basename(repository.root) }); return; } catch { /* keep walking */ }
    if (depth >= maxDepth) return;
    const entries = await readdir(directory, { withFileTypes: true });
    await Promise.all(entries.filter((entry) => entry.isDirectory() && !["node_modules", ".git", "dist", "build", "target"].includes(entry.name)).map(async (entry) => {
      const candidate = path.join(directory, entry.name);
      if ((await stat(candidate)).isDirectory()) await visit(candidate, depth + 1);
    }));
  }
  await visit(path.resolve(root), 0);
  return [...found.values()].sort((left, right) => left.path.localeCompare(right.path));
}
