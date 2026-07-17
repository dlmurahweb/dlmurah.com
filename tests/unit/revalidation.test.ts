import assert from "node:assert/strict";
import test from "node:test";

import { readRevalidationSecret } from "../../src/lib/revalidation";

test("reads a bearer revalidation secret from the authorization header", () => {
  const headers = new Headers({
    authorization: "Bearer revalidate-secret",
  });

  assert.equal(readRevalidationSecret(headers), "revalidate-secret");
});

test("reads the Contentful webhook secret header when bearer auth is absent", () => {
  const headers = new Headers({
    "x-contentful-webhook-secret": "contentful-secret",
  });

  assert.equal(readRevalidationSecret(headers), "contentful-secret");
});

test("prefers bearer auth over the Contentful webhook secret header", () => {
  const headers = new Headers({
    authorization: "Bearer bearer-secret",
    "x-contentful-webhook-secret": "contentful-secret",
  });

  assert.equal(readRevalidationSecret(headers), "bearer-secret");
});

test("ignores unsupported authorization schemes", () => {
  const headers = new Headers({
    authorization: "Basic not-supported",
  });

  assert.equal(readRevalidationSecret(headers), "");
});

test("returns an empty secret when no accepted header is present", () => {
  assert.equal(readRevalidationSecret(new Headers()), "");
});
