import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { CONTENT_MODEL_DEFINITIONS } from "../../scripts/contentful/model-definitions";

const ownerGuide = readFileSync("docs/contentful-owner-guide.md", "utf8");

test("owner guide documents every Contentful content type and field", () => {
  for (const model of CONTENT_MODEL_DEFINITIONS) {
    assert.match(
      ownerGuide,
      new RegExp(`\`${model.id}\``),
      `Owner guide should document ${model.id}`,
    );

    for (const field of model.definition.fields) {
      assert.match(
        ownerGuide,
        new RegExp(`\`${field.id}\``),
        `Owner guide should document ${model.id}.${field.id}`,
      );
    }
  }
});

test("owner guide documents preview entry and exit paths", () => {
  assert.match(ownerGuide, /\/api\/preview\?secret=SECRET&redirect=\//);
  assert.match(ownerGuide, /\/api\/preview\/disable/);
  assert.match(ownerGuide, /draft/i);
  assert.match(ownerGuide, /publish/i);
});
