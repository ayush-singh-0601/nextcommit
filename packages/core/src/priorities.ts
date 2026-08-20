import { rankFindings } from "./scoring.js";
import type { Finding } from "./schema.js";

export interface PortfolioFinding extends Finding { repositoryPath: string; repositoryName: string }

export function rankPortfolioFindings(entries: PortfolioFinding[]): PortfolioFinding[] {
  const ranked = rankFindings(entries) as PortfolioFinding[];
  return ranked.sort((left, right) => right.score - left.score || left.repositoryName.localeCompare(right.repositoryName) || left.id.localeCompare(right.id));
}
