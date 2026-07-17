import assert from "node:assert/strict";
import test from "node:test";

import { BLOCKS, INLINES, type Document } from "@contentful/rich-text-types";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { RichText } from "../../src/components/ui/rich-text";

function render(document: Document): string {
  return renderToStaticMarkup(createElement(RichText, { document }));
}

test("rich text escapes text instead of rendering arbitrary HTML", () => {
  const html = render({
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: "text",
            value: '<script>alert("x")</script><strong>unsafe</strong>',
            marks: [],
            data: {},
          },
        ],
      },
    ],
  });

  assert.equal(
    html,
    "<p>&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;&lt;strong&gt;unsafe&lt;/strong&gt;</p>",
  );
});

test("rich text links only render safe public URLs", () => {
  const html = render({
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: INLINES.HYPERLINK,
            data: { uri: "https://www.dlmurah.com/promo" },
            content: [
              { nodeType: "text", value: "HTTPS", marks: [], data: {} },
            ],
          },
          { nodeType: "text", value: " ", marks: [], data: {} },
          {
            nodeType: INLINES.HYPERLINK,
            data: { uri: "/kebijakan-privasi" },
            content: [
              { nodeType: "text", value: "Internal", marks: [], data: {} },
            ],
          },
          { nodeType: "text", value: " ", marks: [], data: {} },
          {
            nodeType: INLINES.HYPERLINK,
            data: { uri: "javascript:alert(1)" },
            content: [
              { nodeType: "text", value: "Unsafe", marks: [], data: {} },
            ],
          },
        ],
      },
    ],
  });

  assert.match(
    html,
    /<a href="https:\/\/www\.dlmurah\.com\/promo" target="_blank" rel="noopener noreferrer">HTTPS<\/a>/,
  );
  assert.match(html, /<a href="\/kebijakan-privasi">Internal<\/a>/);
  assert.match(html, /<span>Unsafe<\/span>/);
  assert.doesNotMatch(html, /javascript:/);
});

test("rich text drops embedded assets and entries", () => {
  const html = render({
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [{ nodeType: "text", value: "Before", marks: [], data: {} }],
      },
      {
        nodeType: BLOCKS.EMBEDDED_ASSET,
        data: {
          target: {
            sys: { id: "asset", type: "Link", linkType: "Asset" },
          },
        },
        content: [],
      },
      {
        nodeType: BLOCKS.EMBEDDED_ENTRY,
        data: {
          target: {
            sys: { id: "entry", type: "Link", linkType: "Entry" },
          },
        },
        content: [],
      },
    ],
  });

  assert.equal(html, "<p>Before</p>");
});
