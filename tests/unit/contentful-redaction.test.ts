import assert from "node:assert/strict";
import test from "node:test";

import { redactContentfulErrorMessage } from "../../scripts/contentful/redaction";
import { redactSecretValues } from "../../src/lib/redaction";

test("redacts bearer tokens from setup errors", () => {
  assert.equal(
    redactContentfulErrorMessage(
      "Request failed with Authorization: Bearer cma-secret-token",
    ),
    "Request failed with Authorization: Bearer [REDACTED]",
  );
});

test("redacts token fields from JSON-like setup errors", () => {
  assert.equal(
    redactContentfulErrorMessage(
      '{"status":401,"accessToken":"cma-secret-token","message":"Unauthorized"}',
    ),
    '{"status":401,"accessToken":"[REDACTED]","message":"Unauthorized"}',
  );
});

test("redacts secret fields from runtime fallback errors", () => {
  assert.equal(
    redactSecretValues(
      '{"status":401,"secret":"preview-secret","message":"Unauthorized"}',
    ),
    '{"status":401,"secret":"[REDACTED]","message":"Unauthorized"}',
  );
});

test("redacts token query params from setup errors", () => {
  assert.equal(
    redactContentfulErrorMessage(
      "https://api.contentful.com/spaces/space?access_token=cma-secret-token&limit=1",
    ),
    "https://api.contentful.com/spaces/space?access_token=[REDACTED]&limit=1",
  );
});
