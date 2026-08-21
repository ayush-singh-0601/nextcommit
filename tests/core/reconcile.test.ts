import { describe, expect, it } from "vitest";
import { reconcileFindings, type Finding } from "@nextcommit/core";
const finding: Finding = { id: "gone", title: "x", category: "test", classification: "likely", impact: 1, effort: 1, relevance: 1, confidence: 1, risk: "low", score: 1, status: "open", estimatedMinutes: 1, evidence: [{ type: "source", file: "x", summary: "x" }], reason: "x" };
describe("finding reconciliation", () => { it("marks missing open findings as likely resolved", () => expect(reconcileFindings([finding], []).at(0)?.status).toBe("likelyResolved")); });
