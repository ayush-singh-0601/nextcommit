import { describe, expect, it } from "vitest";
import { rankPortfolioFindings, type PortfolioFinding } from "@nextcommit/core";

const finding = (id: string, score: number): PortfolioFinding => ({ id, repositoryPath: id, repositoryName: id, title: id, category: "test", classification: "likely", impact: 8, effort: 2, relevance: 8, confidence: 0.8, risk: "low", score, status: "open", estimatedMinutes: 30, evidence: [{ type: "source", file: `${id}.ts`, summary: id }], reason: id });
describe("portfolio priorities", () => { it("ranks findings across repositories", () => expect(rankPortfolioFindings([finding("low", 20), finding("high", 30)]).map((item) => item.id)).toEqual(["high", "low"])); });
