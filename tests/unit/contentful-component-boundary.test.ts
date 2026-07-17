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

test("React components do not import raw Contentful modules or types", () => {
  const offenders = sourceFiles(join(process.cwd(), "src/components")).filter(
    (file) => {
      const source = readFileSync(file, "utf8");

      return (
        /from\s+["']@\/contentful(?:\/|["'])/.test(source) ||
        /from\s+["']@\/types\/contentful["']/.test(source) ||
        /from\s+["']\.\.\/.*contentful/.test(source)
      );
    },
  );

  assert.deepEqual(offenders.map(repoPath), []);
});

test("React components do not reference raw Contentful entry shapes", () => {
  const offenders = sourceFiles(join(process.cwd(), "src/components")).filter(
    (file) => {
      const source = readFileSync(file, "utf8");

      return /\b(ContentfulEntry|ContentfulCollection)\b/.test(source);
    },
  );

  assert.deepEqual(offenders.map(repoPath), []);
});
