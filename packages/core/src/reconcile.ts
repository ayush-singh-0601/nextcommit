import type { Candidate, Finding } from "./schema.js";

export function reconcileFindings(existing: Finding[], candidates: Candidate[]): Finding[] {
  const active = new Set(candidates.map((candidate) => candidate.id));
  return existing.map((finding) => finding.status === "open" && !active.has(finding.id) ? { ...finding, status: "likelyResolved" as const } : finding);
}
