import { readFile } from "node:fs/promises";
import path from "node:path";
import type { IndexedFile } from "./files.js";

const LANGUAGE_BY_EXTENSION: Record<string, string> = {
  ".ts": "typescript",
  ".tsx": "typescript",
  ".js": "javascript",
  ".jsx": "javascript",
  ".py": "python",
  ".rs": "rust",
  ".go": "go",
  ".java": "java",
  ".cs": "csharp",
  ".php": "php",
  ".rb": "ruby",
};

export interface StackInfo {
  languages: string[];
  frameworks: string[];
  packageManager?: string;
}

async function packageJson(file: IndexedFile | undefined): Promise<Record<string, unknown> | undefined> {
  if (!file) return undefined;
  try {
    return JSON.parse(await readFile(file.absolutePath, "utf8")) as Record<string, unknown>;
  } catch {
    return undefined;
  }
}

export async function detectStack(files: IndexedFile[]): Promise<StackInfo> {
  const languages = new Set<string>();
  const frameworks = new Set<string>();
  const paths = new Set(files.map((file) => file.relativePath));

  for (const file of files) {
    const language = LANGUAGE_BY_EXTENSION[path.posix.extname(file.relativePath).toLowerCase()];
    if (language) languages.add(language);
  }

  const manifest = await packageJson(files.find((file) => file.relativePath === "package.json"));
  if (manifest) {
    frameworks.add("node");
    const dependencies = { ...(manifest.dependencies as object), ...(manifest.devDependencies as object) } as Record<string, unknown>;
    const matches: Record<string, string> = {
      next: "nextjs",
      react: "react",
      express: "express",
      "@nestjs/core": "nestjs",
      vue: "vue",
      svelte: "svelte",
      "@angular/core": "angular",
    };
    for (const [dependency, framework] of Object.entries(matches)) {
      if (dependency in dependencies) frameworks.add(framework);
    }
  }

  if (paths.has("pyproject.toml") || paths.has("requirements.txt")) frameworks.add("python");
  if (paths.has("Cargo.toml")) frameworks.add("rust");
  if (paths.has("go.mod")) frameworks.add("go");

  const packageManagers = [
    ["pnpm-lock.yaml", "pnpm"],
    ["yarn.lock", "yarn"],
    ["package-lock.json", "npm"],
    ["bun.lockb", "bun"],
  ] as const;
  const packageManager = packageManagers.find(([lockfile]) => paths.has(lockfile))?.[1];

  return {
    languages: [...languages].sort(),
    frameworks: [...frameworks].sort(),
    ...(packageManager ? { packageManager } : {}),
  };
}
