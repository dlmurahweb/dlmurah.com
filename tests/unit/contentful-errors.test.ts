import assert from "node:assert/strict";
import test from "node:test";

import { isContentfulNotFound } from "../../scripts/contentful/errors";

test("recognizes Contentful 404 status shapes", () => {
  assert.equal(isContentfulNotFound({ status: 404 }), true);
  assert.equal(isContentfulNotFound({ statusCode: 404 }), true);
  assert.equal(isContentfulNotFound({ response: { status: 404 } }), true);
  assert.equal(isContentfulNotFound({ sys: { id: "NotFound" } }), true);
});

test("recognizes a JSON-formatted Contentful SDK error message", () => {
  const error = new Error(
    JSON.stringify({
      status: 404,
      message: "The resource could not be found.",
      details: { type: "ContentType", id: "siteSettings" },
    }),
  );

  assert.equal(isContentfulNotFound(error), true);
});

test("does not classify unrelated errors as not found", () => {
  assert.equal(isContentfulNotFound(new Error("Network unavailable")), false);
  assert.equal(isContentfulNotFound({ status: 401 }), false);
  assert.equal(isContentfulNotFound(null), false);
});
