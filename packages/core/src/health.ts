import type { ScanReport } from "./schema.js";

export interface RepositoryHealth { score: number; summary: string; factors: string[] }

export function assessRepositoryHealth(report: ScanReport): RepositoryHealth {
  const factors: string[] = [];
  let score = 100;
  const source = Number(report.signals.find((signal) => signal.type === "source-file-count")?.value ?? 0);
  const tests = Number(report.signals.find((signal) => signal.type === "test-file-count")?.value ?? 0);
  if (source > 0 && tests === 0) { score -= 25; factors.push("no test files detected"); }
  if (report.repository.git.dirty) { score -= 10; factors.push("working tree is dirty"); }
  if (report.candidates.length > 5) { score -= Math.min(20, report.candidates.length - 5); factors.push("many unverified opportunities"); }
  return { score: Math.max(0, score), summary: score >= 80 ? "healthy" : score >= 60 ? "needs attention" : "at risk", factors };
}
