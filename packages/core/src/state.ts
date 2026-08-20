import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Finding, Plan } from "./schema.js";

export interface NextCommitState {
  version: 1;
  lastScan: string;
  repositoryFingerprint: string;
  lastCommit?: string;
}

export function stateDirectory(repositoryRoot: string): string {
  return path.join(repositoryRoot, ".nextcommit");
}

export async function writeJsonAtomic(file: string, value: unknown): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await rename(temporary, file);
}

export async function readJson<T>(file: string): Promise<T | undefined> {
  try {
    return JSON.parse(await readFile(file, "utf8")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw error;
  }
}

export async function saveState(repositoryRoot: string, state: NextCommitState): Promise<void> {
  await writeJsonAtomic(path.join(stateDirectory(repositoryRoot), "state.json"), state);
}

export async function loadState(repositoryRoot: string): Promise<NextCommitState | undefined> {
  return readJson<NextCommitState>(path.join(stateDirectory(repositoryRoot), "state.json"));
}

export interface CompletedFinding { id: string; completedAt: string; commit?: string; files: string[] }
export interface IgnoredFinding { id: string; ignoredAt: string; reason?: string }

async function readList<T>(repositoryRoot: string, name: string): Promise<T[]> {
  return (await readJson<T[]>(path.join(stateDirectory(repositoryRoot), name))) ?? [];
}

export async function saveFindings(repositoryRoot: string, findings: Finding[]): Promise<void> {
  await writeJsonAtomic(path.join(stateDirectory(repositoryRoot), "findings.json"), findings);
}

export async function loadFindings(repositoryRoot: string): Promise<Finding[]> {
  return readList<Finding>(repositoryRoot, "findings.json");
}

export async function ignoreFinding(repositoryRoot: string, id: string, reason?: string): Promise<void> {
  const ignored = await readList<IgnoredFinding>(repositoryRoot, "ignored.json");
  const record: IgnoredFinding = { id, ignoredAt: new Date().toISOString(), ...(reason ? { reason } : {}) };
  await writeJsonAtomic(path.join(stateDirectory(repositoryRoot), "ignored.json"), [...ignored.filter((item) => item.id !== id), record]);
}

export async function completeFinding(repositoryRoot: string, id: string, files: string[], commit?: string): Promise<void> {
  const completed = await readList<CompletedFinding>(repositoryRoot, "completed.json");
  const record: CompletedFinding = { id, completedAt: new Date().toISOString(), files, ...(commit ? { commit } : {}) };
  await writeJsonAtomic(path.join(stateDirectory(repositoryRoot), "completed.json"), [...completed.filter((item) => item.id !== id), record]);
}

export async function savePlan(repositoryRoot: string, plan: Plan): Promise<void> {
  await writeJsonAtomic(path.join(stateDirectory(repositoryRoot), "plans", `${plan.findingId}.json`), plan);
}

export async function loadPlan(repositoryRoot: string, findingId: string): Promise<Plan | undefined> {
  return readJson<Plan>(path.join(stateDirectory(repositoryRoot), "plans", `${findingId}.json`));
}
