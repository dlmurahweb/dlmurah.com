import assert from "node:assert/strict";
import test from "node:test";

import {
  CONTENTFUL_CACHE_TAG,
  CONTENTFUL_REVALIDATE_SECONDS,
  createContentfulRequestConfig,
} from "../../src/contentful/request";

test("delivery requests use the Delivery API token and cache tag", () => {
  const { init, token, url } = createContentfulRequestConfig({
    accessToken: "delivery-token",
    contentType: "service",
    environment: "master",
    locale: "id-ID",
    previewAccessToken: "preview-token",
    query: { order: "fields.order", skip: undefined },
    spaceId: "space id",
  });

  assert.equal(token, "delivery-token");
  assert.equal(url.hostname, "cdn.contentful.com");
  assert.equal(url.searchParams.get("content_type"), "service");
  assert.equal(url.searchParams.get("locale"), "id-ID");
  assert.equal(url.searchParams.get("include"), "1");
  assert.equal(url.searchParams.get("limit"), "1000");
  assert.equal(url.searchParams.get("order"), "fields.order");
  assert.equal(url.searchParams.has("skip"), false);
  assert.deepEqual(init.headers, {
    Authorization: "Bearer delivery-token",
  });
  assert.deepEqual(init.next, {
    revalidate: CONTENTFUL_REVALIDATE_SECONDS,
    tags: [CONTENTFUL_CACHE_TAG],
  });
  assert.equal(init.cache, undefined);
});

test("preview requests use the Preview API token and bypass caching", () => {
  const { init, token, url } = createContentfulRequestConfig({
    accessToken: "delivery-token",
    contentType: "homepage",
    environment: "master",
    preview: true,
    previewAccessToken: "preview-token",
    spaceId: "space",
  });

  assert.equal(token, "preview-token");
  assert.equal(url.hostname, "preview.contentful.com");
  assert.deepEqual(init.headers, {
    Authorization: "Bearer preview-token",
  });
  assert.equal(init.cache, "no-store");
  assert.equal(init.next, undefined);
});
