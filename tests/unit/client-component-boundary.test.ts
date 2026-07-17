import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import test from "node:test";

const allowedClientComponents = [
  "src/components/analytics/interaction-analytics.tsx",
  "src/components/analytics/site-analytics.tsx",
  "src/components/brand/hero-ambient-motion.tsx",
  "src/components/layout/header.tsx",
  "src/components/layout/mobile-navigation.tsx",
  "src/components/ui/accordion.tsx",
  "src/components/ui/separator.tsx",
  "src/components/ui/sheet.tsx",
].sort();

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    const stat = statSync(path);

    if (stat.isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(name) ? [path] : [];
  });
}

function repoPath(path: string): string {
  return relative(process.cwd(), path).replace(/\\/g, "/");
}

test("client component surface stays intentionally bounded", () => {
  const clientComponents = sourceFiles(join(process.cwd(), "src"))
    .filter((file) => {
      const source = readFileSync(file, "utf8");
      return /^\s*["']use client["'];/m.test(source);
    })
    .map(repoPath)
    .sort();

  assert.deepEqual(clientComponents, allowedClientComponents);
});
