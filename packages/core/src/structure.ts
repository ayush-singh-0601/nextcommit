import path from "node:path";
import type { IndexedFile } from "./files.js";

export interface RepositoryStructure {
  source: string[];
  tests: string[];
  docs: string[];
  assets: string[];
  config: string[];
  scripts: string[];
}

const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".py", ".rs", ".go", ".java", ".cs", ".php", ".rb"]);
const ASSET_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico"]);

export function classifyRepositoryStructure(files: IndexedFile[]): RepositoryStructure {
  const structure: RepositoryStructure = { source: [], tests: [], docs: [], assets: [], config: [], scripts: [] };
  for (const file of files) {
    const normalized = file.relativePath.toLowerCase();
    const extension = path.posix.extname(normalized);
    const basename = path.posix.basename(normalized);
    const testFile = /(^|\/)(test|tests|__tests__)\//.test(normalized) || /\.(test|spec)\.[^.]+$/.test(normalized);
    if (testFile) structure.tests.push(file.relativePath);
    else if (SOURCE_EXTENSIONS.has(extension)) structure.source.push(file.relativePath);
    if (basename.startsWith("readme") || extension === ".md" || normalized.includes("docs/")) structure.docs.push(file.relativePath);
    if (ASSET_EXTENSIONS.has(extension) || normalized.includes("assets/")) structure.assets.push(file.relativePath);
    if (/^(package\.json|tsconfig.*\.json|pyproject\.toml|cargo\.toml|dockerfile|\.github\/)/.test(normalized)) structure.config.push(file.relativePath);
    if (normalized.startsWith("scripts/")) structure.scripts.push(file.relativePath);
  }
  return structure;
}
