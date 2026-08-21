import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import fastGlob from "fast-glob";
import ignore from "ignore";

export const MAX_TEXT_FILE_SIZE = 1024 * 1024;

const DEFAULT_IGNORES = [
  ".git/**",
  "node_modules/**",
  "dist/**",
  "build/**",
  "coverage/**",
  ".next/**",
  ".nextcommit/**",
  "vendor/**",
  "target/**",
  "__pycache__/**",
  ".pytest_cache/**",
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

export interface FileSelection {
  files: IndexedFile[];
  skipped: Array<{ file: string; reason: "sensitive" | "binary" | "oversized" }>;
}

export function isSensitivePath(relativePath: string): boolean {
  const basename = path.posix.basename(relativePath).toLowerCase();
  return (
    basename === ".env" ||
    basename.startsWith(".env.") ||
    basename.endsWith(".pem") ||
    basename.endsWith(".key") ||
    basename.startsWith("credentials") ||
    basename.startsWith("secrets")
  );
}

export async function isLikelyBinary(absolutePath: string): Promise<boolean> {
  const chunk = await readFile(absolutePath, { encoding: null });
  return chunk.subarray(0, 8192).includes(0);
}

export async function selectScannableFiles(files: IndexedFile[]): Promise<FileSelection> {
  const selection: FileSelection = { files: [], skipped: [] };
  for (const file of files) {
    if (isSensitivePath(file.relativePath)) {
      selection.skipped.push({ file: file.relativePath, reason: "sensitive" });
    } else if (file.size > MAX_TEXT_FILE_SIZE) {
      selection.skipped.push({ file: file.relativePath, reason: "oversized" });
    } else if (await isLikelyBinary(file.absolutePath)) {
      selection.skipped.push({ file: file.relativePath, reason: "binary" });
    } else {
      selection.files.push(file);
    }
  }
  return selection;
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
    ignore: DEFAULT_IGNORES.flatMap((pattern) => [pattern, `**/${pattern}`]),
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
