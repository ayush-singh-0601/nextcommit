import { describe, expect, it } from "vitest";
import { filterByTimeBudget, parseTimeBudget, type Finding } from "@nextcommit/core";
const finding = (minutes: number): Finding => ({ id: String(minutes), title: "x", category: "test", classification: "likely", impact: 1, effort: 1, relevance: 1, confidence: 1, risk: "low", score: 1, status: "open", estimatedMinutes: minutes, evidence: [{ type: "source", file: "x", summary: "x" }], reason: "x" });
describe("time filters", () => { it("limits work to a chosen budget", () => expect(filterByTimeBudget([finding(30), finding(120)], "hour")).toHaveLength(1)); it("parses named budgets", () => expect(parseTimeBudget("weekend")).toBe("weekend")); });
