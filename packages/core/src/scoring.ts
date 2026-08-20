import type { Finding } from "./schema.js";

const RISK_MULTIPLIER = { low: 1, medium: 1.25, high: 1.75 } as const;

export type FindingInput = Omit<Finding, "score" | "status"> & { status?: Finding["status"] };

export function scoreFinding(finding: FindingInput): Finding {
  const raw = (finding.impact * finding.relevance * finding.confidence) / (finding.effort * RISK_MULTIPLIER[finding.risk]);
  return { ...finding, score: Math.max(0, Math.min(100, Number(raw.toFixed(2)))), status: finding.status ?? "open" };
}

export function rankFindings(findings: Finding[]): Finding[] {
  const unique = new Map<string, Finding>();
  for (const finding of findings) {
    const key = `${finding.category}:${finding.evidence.map((evidence) => `${evidence.file}:${evidence.lineStart ?? ""}`).sort().join(",")}`;
    if ((unique.get(key)?.score ?? -1) < finding.score) unique.set(key, finding);
  }
  return [...unique.values()].filter((finding) => finding.status === "open").sort((left, right) => right.score - left.score || left.id.localeCompare(right.id));
}
