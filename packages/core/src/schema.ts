import { z } from "zod";

export const FindingCategorySchema = z.enum([
  "bug",
  "feature",
  "performance",
  "reliability",
  "security",
  "test",
  "maintainability",
  "dx",
  "polish",
  "dependency",
  "documentation",
]);

export const ClassificationSchema = z.enum(["confirmed", "likely", "idea"]);
export const RiskSchema = z.enum(["low", "medium", "high"]);

export const EvidenceSchema = z.object({
  type: z.enum(["source", "todo", "readme", "git", "test", "manifest", "config"]),
  file: z.string().min(1),
  lineStart: z.number().int().positive().optional(),
  lineEnd: z.number().int().positive().optional(),
  symbol: z.string().min(1).optional(),
  summary: z.string().min(1),
});

export const SignalSchema = z.object({
  type: z.string().min(1),
  file: z.string().min(1).optional(),
  line: z.number().int().positive().optional(),
  value: z.string().min(1),
  evidence: EvidenceSchema.optional(),
});

export const RepositorySchema = z.object({
  name: z.string().min(1),
  path: z.string().min(1),
  root: z.string().min(1),
  git: z.object({
    head: z.string().optional(),
    branch: z.string().optional(),
    dirty: z.boolean(),
  }),
  languages: z.array(z.string()).default([]),
  frameworks: z.array(z.string()).default([]),
  packageManager: z.string().optional(),
});

export const CandidateSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: FindingCategorySchema,
  classification: ClassificationSchema,
  evidence: z.array(EvidenceSchema).min(1),
  reason: z.string().min(1),
  estimatedMinutes: z.number().int().positive(),
});

export const FindingSchema = CandidateSchema.extend({
  impact: z.number().int().min(1).max(10),
  effort: z.number().int().min(1).max(10),
  relevance: z.number().int().min(1).max(10),
  confidence: z.number().min(0).max(1),
  risk: RiskSchema,
  score: z.number().min(0).max(100),
  status: z.enum(["open", "ignored", "completed", "likelyResolved"]),
});

export const PlanSchema = z.object({
  findingId: z.string().min(1),
  steps: z.array(z.string().min(1)),
  files: z.array(z.string().min(1)),
  tests: z.array(z.string().min(1)),
  acceptanceCriteria: z.array(z.string().min(1)),
  risk: RiskSchema,
  estimatedMinutes: z.number().int().positive(),
  commitSequence: z.array(z.string().min(1)).default([]),
});

export const AgentAnalysisEnvelopeSchema = z.object({
  schemaVersion: z.literal(1),
  repositoryFingerprint: z.string().min(1),
  findings: z.array(FindingSchema),
  plans: z.array(PlanSchema).default([]),
});

export const ScanReportSchema = z.object({
  schemaVersion: z.literal(1),
  repositoryFingerprint: z.string().min(1).optional(),
  repository: RepositorySchema,
  signals: z.array(SignalSchema),
  candidates: z.array(CandidateSchema),
  warnings: z.array(z.string()),
  scannedAt: z.string().datetime(),
});

export type Evidence = z.infer<typeof EvidenceSchema>;
export type FindingCategory = z.infer<typeof FindingCategorySchema>;
export type Signal = z.infer<typeof SignalSchema>;
export type Repository = z.infer<typeof RepositorySchema>;
export type Candidate = z.infer<typeof CandidateSchema>;
export type Finding = z.infer<typeof FindingSchema>;
export type Plan = z.infer<typeof PlanSchema>;
export type AgentAnalysisEnvelope = z.infer<typeof AgentAnalysisEnvelopeSchema>;
export type ScanReport = z.infer<typeof ScanReportSchema>;
