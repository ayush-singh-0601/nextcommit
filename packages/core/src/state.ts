import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

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
