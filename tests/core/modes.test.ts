import { describe, expect, it } from "vitest";
import { filterByMode, type Finding } from "@nextcommit/core";
const finding = (effort: number, impact: number, risk: Finding["risk"]): Finding => ({ id: String(effort), title: "x", category: "test", classification: "likely", impact, effort, relevance: 1, confidence: 1, risk, score: 1, status: "open", estimatedMinutes: 30, evidence: [{ type: "source", file: "x", summary: "x" }], reason: "x" });
describe("recommendation modes", () => { it("filters easy low-risk work", () => expect(filterByMode([finding(2, 3, "low"), finding(4, 9, "low")], "easy")).toHaveLength(1)); });
