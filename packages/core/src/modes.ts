import type { Finding } from "./schema.js";

export const RECOMMENDATION_MODES = ["easy", "ambitious", "release", "open-source"] as const;
export type RecommendationMode = (typeof RECOMMENDATION_MODES)[number];

export function filterByMode(findings: Finding[], mode: RecommendationMode): Finding[] {
  switch (mode) {
    case "easy": return findings.filter((finding) => finding.effort <= 3 && finding.risk === "low");
    case "ambitious": return findings.filter((finding) => finding.impact >= 8 && finding.effort >= 4);
    case "release": return findings.filter((finding) => ["bug", "reliability", "security", "test", "documentation"].includes(finding.category));
    case "open-source": return findings.filter((finding) => ["dx", "documentation", "polish", "feature"].includes(finding.category));
  }
}

export function parseRecommendationMode(value: string): RecommendationMode | undefined {
  return RECOMMENDATION_MODES.find((mode) => mode === value);
}
