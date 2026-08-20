import { createHash } from "node:crypto";
import path from "node:path";
import { isSensitivePath } from "./files.js";
import type { Candidate, Evidence, Signal } from "./schema.js";

export function createFindingId(category: Candidate["category"], evidence: Evidence): string {
  const hash = createHash("sha256").update(`${category}:${evidence.file}:${evidence.symbol ?? evidence.lineStart ?? ""}:${evidence.summary}`).digest("hex");
  return `${category}-${hash.slice(0, 12)}`;
}

export function isValidEvidencePath(repositoryRoot: string, evidence: Evidence): boolean {
  const resolved = path.resolve(repositoryRoot, evidence.file);
  return resolved.startsWith(`${path.resolve(repositoryRoot)}${path.sep}`) && !isSensitivePath(evidence.file);
}

export function deriveCandidates(signals: Signal[]): Candidate[] {
  return signals.flatMap((signal) => {
    if (!signal.evidence) return [];
    const category = signal.type === "unfinished-roadmap" ? "feature" : signal.type === "high-churn-file" ? "test" : /retry|recover|resilien|reliab/i.test(signal.value) ? "reliability" : "maintainability";
    const title = signal.type === "unfinished-roadmap" ? `Implement documented intent: ${signal.value}` : `Investigate ${signal.value}`;
    return [{
      id: createFindingId(category, signal.evidence),
      title,
      category,
      classification: signal.type === "unfinished-roadmap" ? "idea" : "likely",
      evidence: [signal.evidence],
      reason: signal.value,
      estimatedMinutes: category === "feature" ? 120 : 45,
    }];
  });
}
