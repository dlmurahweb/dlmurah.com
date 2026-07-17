import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import test from "node:test";

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

test("management token remains outside application runtime source", () => {
  const offenders = sourceFiles(join(process.cwd(), "src")).filter((file) =>
    readFileSync(file, "utf8").includes("CONTENTFUL_MANAGEMENT_TOKEN"),
  );

  assert.deepEqual(offenders.map(repoPath), []);
});

test("server env schema does not expose the Contentful management token", () => {
  const envSource = readFileSync(join(process.cwd(), "src/lib/env.ts"), "utf8");

  assert.doesNotMatch(envSource, /CONTENTFUL_MANAGEMENT_TOKEN/);
});

test("client components do not read process.env or import server env", () => {
  const offenders = sourceFiles(join(process.cwd(), "src")).flatMap((file) => {
    const source = readFileSync(file, "utf8");
    const isClientComponent = /^\s*["']use client["'];/m.test(source);

    if (!isClientComponent) return [];
    if (source.includes("process.env") || source.includes("@/lib/env")) {
      return [repoPath(file)];
    }

    return [];
  });

  assert.deepEqual(offenders, []);
});
