import assert from "node:assert/strict";
import test from "node:test";

import type { ContentTypeProps, UIConfigProps } from "contentful-management";

import { mergeContentTypeViews } from "../../scripts/contentful/content-type-views";

function contentType(id: string, name: string) {
  return {
    sys: { id },
    name,
    fields: [],
  } as unknown as ContentTypeProps;
}

test("creates one sorted view for every content type", () => {
  const folders = mergeContentTypeViews(
    [],
    [contentType("service", "Layanan"), contentType("faq", "FAQ")],
  );
  const folder = folders.find(({ title }) => title === "Content Type");

  assert.deepEqual(
    folder?.views.map(({ title, contentTypeId, contentTypeIds }) => ({
      title,
      contentTypeId,
      contentTypeIds,
    })),
    [
      { title: "FAQ", contentTypeId: "faq", contentTypeIds: ["faq"] },
      {
        title: "Layanan",
        contentTypeId: "service",
        contentTypeIds: ["service"],
      },
    ],
  );
});

test("preserves other folders and reuses an existing content type view", () => {
  const folders: UIConfigProps["entryListViews"] = [
    { id: "status", title: "Status", views: [] },
    {
      id: "content-types",
      title: "Content Type",
      views: [
        {
          id: "existing-faq",
          title: "Old FAQ title",
          contentTypeId: "faq",
          contentTypeIds: ["faq"],
          displayedFieldIds: ["question", "updatedAt"],
        },
      ],
    },
  ];

  const result = mergeContentTypeViews(folders, [contentType("faq", "FAQ")]);

  assert.equal(result[0], folders[0]);
  assert.deepEqual(result[1].views[0], {
    id: "existing-faq",
    title: "FAQ",
    order: { fieldId: "updatedAt", direction: "descending" },
    searchText: "",
    contentTypeId: "faq",
    contentTypeIds: ["faq"],
    searchFilters: [],
    displayedFieldIds: ["question", "updatedAt"],
  });
});

test("returns the same view configuration after a second merge", () => {
  const contentTypes = [
    contentType("faq", "FAQ"),
    contentType("service", "Layanan"),
  ];
  const first = mergeContentTypeViews([], contentTypes);
  const second = mergeContentTypeViews(first, contentTypes);

  assert.deepEqual(second, first);
});
