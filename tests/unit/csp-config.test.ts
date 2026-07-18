import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const nextConfigSource = readFileSync(
  join(process.cwd(), "next.config.ts"),
  "utf8",
);

test("CSP permits eval only for React development debugging", () => {
  assert.match(
    nextConfigSource,
    /isDevelopment\s*\?\s*["'] 'unsafe-eval'["']\s*:\s*["']["']/,
  );
  assert.equal(
    nextConfigSource.match(/unsafe-eval/g)?.length,
    1,
    "unsafe-eval should only appear in the development-only branch",
  );
});

test("CSP upgrades insecure requests only in production", () => {
  assert.match(
    nextConfigSource,
    /isDevelopment\s*\?\s*\[\]\s*:\s*\[["']upgrade-insecure-requests["']\]/,
  );
  assert.equal(nextConfigSource.match(/upgrade-insecure-requests/g)?.length, 1);
});
