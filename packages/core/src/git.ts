import { execFile } from "node:child_process";
import { realpath } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export class RepositoryError extends Error {
  readonly code = "NOT_A_GIT_REPOSITORY";
}

export interface ResolvedRepository {
  inputPath: string;
  root: string;
}

export interface GitMetadata {
  head?: string;
  branch?: string;
  dirty: boolean;
  lastCommitAt?: string;
  recentCommitCount: number;
}

export async function runGit(repositoryPath: string, args: string[]): Promise<string> {
  const result = await execFileAsync("git", ["-C", repositoryPath, ...args], {
    encoding: "utf8",
    windowsHide: true,
    maxBuffer: 1024 * 1024,
    env: {
      ...process.env,
      GIT_CONFIG_COUNT: "1",
      GIT_CONFIG_KEY_0: "safe.directory",
      GIT_CONFIG_VALUE_0: repositoryPath,
    },
  });
  return result.stdout.trim();
}

export async function resolveRepository(inputPath: string): Promise<ResolvedRepository> {
  const absoluteInput = path.resolve(inputPath);
  try {
    const normalizedInput = await realpath(absoluteInput);
    const root = await runGit(normalizedInput, ["rev-parse", "--show-toplevel"]);
    return { inputPath: normalizedInput, root: await realpath(root) };
  } catch {
    throw new RepositoryError(`NextCommit requires a Git repository: ${absoluteInput}`);
  }
}

export async function collectGitMetadata(repositoryPath: string): Promise<GitMetadata> {
  const [head, branch, status, lastCommitAt, recent] = await Promise.all([
    runGit(repositoryPath, ["rev-parse", "HEAD"]).catch(() => ""),
    runGit(repositoryPath, ["branch", "--show-current"]).catch(() => ""),
    runGit(repositoryPath, ["status", "--porcelain"]),
    runGit(repositoryPath, ["log", "-1", "--format=%cI"]).catch(() => ""),
    runGit(repositoryPath, ["rev-list", "--count", "HEAD"]).catch(() => "0"),
  ]);
  const metadata: GitMetadata = { dirty: status.length > 0, recentCommitCount: Number.parseInt(recent, 10) || 0 };
  if (head) metadata.head = head;
  if (branch) metadata.branch = branch;
  if (lastCommitAt) metadata.lastCommitAt = lastCommitAt;
  return metadata;
}
