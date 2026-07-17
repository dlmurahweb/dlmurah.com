import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const repoRoot = process.cwd();
const easedSourceFiles = [
  "src/app/globals.css",
  "src/components/ui/accordion.tsx",
  "src/components/ui/button.tsx",
  "src/components/ui/sheet.tsx",
];

test("interactive source files use the shared ease-out quart token", () => {
  for (const file of easedSourceFiles) {
    const source = readFileSync(join(repoRoot, file), "utf8");

    assert.equal(
      source.includes("cubic-bezier(0.25,1,0.5,1)"),
      false,
      `${file} should use var(--ease-out-quart) instead of a duplicated easing literal`,
    );
  }
});

test("button hover lift is limited to fine pointers", () => {
  const buttonSource = readFileSync(
    join(repoRoot, "src/components/ui/button.tsx"),
    "utf8",
  );
  const globalStyles = readFileSync(
    join(repoRoot, "src/app/globals.css"),
    "utf8",
  );

  assert.equal(
    buttonSource.includes("hover:-translate"),
    false,
    "Button variants should not apply hover transforms on every input device",
  );
  assert.match(buttonSource, /button-lift/);
  assert.match(
    globalStyles,
    /@media \(hover: hover\) and \(pointer: fine\) \{[\s\S]*?\.button-lift:hover \{[\s\S]*?transform: translateY\(-0\.125rem\);/,
  );
});
