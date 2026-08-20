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
    const root = await runGit(absoluteInput, ["rev-parse", "--show-toplevel"]);
    return { inputPath: await realpath(absoluteInput), root: await realpath(root) };
  } catch {
    throw new RepositoryError(`NextCommit requires a Git repository: ${absoluteInput}`);
  }
}
