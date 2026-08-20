import { AgentAnalysisEnvelopeSchema, type AgentAnalysisEnvelope } from "./schema.js";
import { isValidEvidencePath } from "./findings.js";
import { loadState, saveFindings, savePlan } from "./state.js";

export class StaleAgentAnalysisError extends Error { readonly code = "STALE_AGENT_ANALYSIS"; }

export async function saveAgentAnalysis(repositoryRoot: string, input: unknown): Promise<AgentAnalysisEnvelope> {
  const analysis = AgentAnalysisEnvelopeSchema.parse(input);
  const state = await loadState(repositoryRoot);
  if (!state || state.repositoryFingerprint !== analysis.repositoryFingerprint) throw new StaleAgentAnalysisError("Agent analysis does not match the latest repository scan.");
  for (const finding of analysis.findings) {
    if (finding.evidence.some((evidence) => !isValidEvidencePath(repositoryRoot, evidence))) throw new Error(`Invalid finding evidence: ${finding.id}`);
  }
  await saveFindings(repositoryRoot, analysis.findings);
  await Promise.all(analysis.plans.map((plan) => savePlan(repositoryRoot, plan)));
  return analysis;
}
