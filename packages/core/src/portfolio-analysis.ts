import { discoverRepositories, type DiscoveredRepository } from "./portfolio.js";
import { scanRepository } from "./scan.js";
import type { ScanReport } from "./schema.js";

export interface PortfolioReport { repositories: Array<DiscoveredRepository & { report?: ScanReport; error?: string }> }

export async function scanPortfolio(roots: string[], concurrency = 3): Promise<PortfolioReport> {
  const repositories = [...new Map((await Promise.all(roots.map((root) => discoverRepositories(root)))).flat().map((repository) => [repository.path, repository])).values()];
  const results: PortfolioReport["repositories"] = [];
  let cursor = 0;
  async function worker(): Promise<void> {
    while (cursor < repositories.length) {
      const repository = repositories[cursor++];
      if (!repository) return;
      try { results.push({ ...repository, report: await scanRepository(repository.path, { persistState: true }) }); }
      catch (error) { results.push({ ...repository, error: error instanceof Error ? error.message : "Scan failed" }); }
    }
  }
  await Promise.all(Array.from({ length: Math.min(Math.max(1, concurrency), repositories.length) }, worker));
  return { repositories: results.sort((left, right) => left.path.localeCompare(right.path)) };
}
