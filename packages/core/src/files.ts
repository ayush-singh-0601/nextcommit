import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import fastGlob from "fast-glob";
import ignore from "ignore";

const DEFAULT_IGNORES = [
  ".git/**",
  "node_modules/**",
  "dist/**",
  "build/**",
  "coverage/**",
  ".next/**",
  "vendor/**",
  "target/**",
  "__pycache__/**",
  ".venv/**",
  "venv/**",
  "generated/**",
  ".cache/**",
];

export interface IndexedFile {
  absolutePath: string;
  relativePath: string;
  size: number;
}

export async function createIgnoreMatcher(repositoryRoot: string) {
  const matcher = ignore().add(DEFAULT_IGNORES);
  try {
    matcher.add(await readFile(path.join(repositoryRoot, ".gitignore"), "utf8"));
  } catch {
    // A repository does not need a .gitignore file.
  }
  return matcher;
}

export async function indexRepositoryFiles(repositoryRoot: string): Promise<IndexedFile[]> {
  const matcher = await createIgnoreMatcher(repositoryRoot);
  const candidates = await fastGlob("**/*", {
    cwd: repositoryRoot,
    onlyFiles: true,
    dot: true,
    followSymbolicLinks: false,
    unique: true,
  });

  const files: IndexedFile[] = [];
  for (const candidate of candidates) {
    const relativePath = candidate.split(path.sep).join("/");
    if (matcher.ignores(relativePath)) continue;
    const absolutePath = path.join(repositoryRoot, candidate);
    files.push({ absolutePath, relativePath, size: (await stat(absolutePath)).size });
  }
  return files.sort((left, right) => left.relativePath.localeCompare(right.relativePath));
}
