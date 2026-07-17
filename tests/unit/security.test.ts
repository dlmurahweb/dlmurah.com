import assert from "node:assert/strict";
import test from "node:test";

import { secureCompare } from "../../src/lib/secure-compare";

test("secureCompare only accepts exact secret matches", () => {
  assert.equal(secureCompare("same-secret", "same-secret"), true);
  assert.equal(secureCompare("same-secret", "other-secret"), false);
});

test("secureCompare rejects different lengths without throwing", () => {
  assert.doesNotThrow(() => secureCompare("short", "much-longer-secret"));
  assert.equal(secureCompare("short", "much-longer-secret"), false);
});
