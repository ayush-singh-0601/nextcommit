import type { Finding } from "./schema.js";

export type TimeBudget = "hour" | "evening" | "weekend";
const MAX_MINUTES: Record<TimeBudget, number> = { hour: 60, evening: 180, weekend: 960 };

export function filterByTimeBudget(findings: Finding[], budget: TimeBudget): Finding[] {
  return findings.filter((finding) => finding.estimatedMinutes <= MAX_MINUTES[budget]);
}

export function parseTimeBudget(value: string): TimeBudget | undefined {
  return value === "hour" || value === "evening" || value === "weekend" ? value : undefined;
}
