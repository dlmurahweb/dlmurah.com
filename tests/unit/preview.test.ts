import assert from "node:assert/strict";
import test from "node:test";

import { safePreviewRedirectPath } from "../../src/lib/preview";

test("safePreviewRedirectPath keeps internal paths", () => {
  assert.equal(safePreviewRedirectPath("/"), "/");
  assert.equal(safePreviewRedirectPath("/kontak"), "/kontak");
  assert.equal(
    safePreviewRedirectPath("/kebijakan-privasi?from=preview"),
    "/kebijakan-privasi?from=preview",
  );
});

test("safePreviewRedirectPath rejects external and ambiguous redirects", () => {
  assert.equal(safePreviewRedirectPath(null), "/");
  assert.equal(safePreviewRedirectPath(""), "/");
  assert.equal(safePreviewRedirectPath("https://example.com"), "/");
  assert.equal(safePreviewRedirectPath("//example.com/path"), "/");
  assert.equal(safePreviewRedirectPath("javascript:alert(1)"), "/");
});
