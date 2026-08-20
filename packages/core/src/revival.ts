import type { ScanReport } from "./schema.js";

export interface RevivalOpportunity { score: number; reasons: string[] }

export function scoreRevivalOpportunity(report: ScanReport, now = Date.now()): RevivalOpportunity {
  const reasons: string[] = [];
  let score = 0;
  const lastCommit = report.repository.git.head;
  if (lastCommit) { score += 20; reasons.push("has a committed baseline"); }
  const roadmap = report.signals.filter((signal) => signal.type === "readme-task").length;
  if (roadmap) { score += Math.min(40, roadmap * 10); reasons.push("contains unfinished roadmap work"); }
  const staleDays = Math.max(0, Math.floor((now - Date.parse(report.scannedAt)) / 86_400_000));
  if (staleDays > 30) { score += 10; reasons.push("has not been scanned recently"); }
  return { score: Math.min(100, score + Math.min(30, report.candidates.length * 5)), reasons };
}
