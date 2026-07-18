import { createHash } from "node:crypto";

import type {
  ContentTypeProps,
  PlainClientAPI,
  UIConfigProps,
} from "contentful-management";

type EntryListFolder = UIConfigProps["entryListViews"][number];
type EntryListView = EntryListFolder["views"][number];

const CONTENT_TYPE_FOLDER_TITLE = "Content Type";
const DEFAULT_DISPLAYED_FIELD_IDS = ["contentType", "updatedAt", "author"];

function stableId(value: string) {
  return createHash("sha256").update(value).digest("hex").slice(0, 16);
}

function targetsContentType(view: EntryListView, contentTypeId: string) {
  return (
    view.contentTypeId === contentTypeId ||
    (view.contentTypeIds?.length === 1 &&
      view.contentTypeIds[0] === contentTypeId)
  );
}

function createContentTypeView(
  contentType: ContentTypeProps,
  existingView?: EntryListView,
): EntryListView {
  return {
    ...existingView,
    id:
      existingView?.id ??
      stableId(`dlmurah-content-type-view:${contentType.sys.id}`),
    order: {
      fieldId: "updatedAt",
      direction: "descending",
    },
    title: contentType.name,
    searchText: "",
    contentTypeId: contentType.sys.id,
    contentTypeIds: [contentType.sys.id],
    searchFilters: [],
    displayedFieldIds:
      existingView?.displayedFieldIds ?? DEFAULT_DISPLAYED_FIELD_IDS,
  };
}

export function mergeContentTypeViews(
  folders: UIConfigProps["entryListViews"],
  contentTypes: ContentTypeProps[],
) {
  const folderIndex = folders.findIndex(
    (folder) => folder.title === CONTENT_TYPE_FOLDER_TITLE,
  );
  const existingFolder = folderIndex >= 0 ? folders[folderIndex] : undefined;
  const existingViews = existingFolder?.views ?? [];
  const contentTypeIds = new Set(
    contentTypes.map((contentType) => contentType.sys.id),
  );

  const managedViews = [...contentTypes]
    .sort((left, right) => left.name.localeCompare(right.name, "id-ID"))
    .map((contentType) =>
      createContentTypeView(
        contentType,
        existingViews.find((view) =>
          targetsContentType(view, contentType.sys.id),
        ),
      ),
    );
  const unrelatedViews = existingViews.filter(
    (view) =>
      ![...contentTypeIds].some((contentTypeId) =>
        targetsContentType(view, contentTypeId),
      ),
  );
  const nextFolder: EntryListFolder = {
    ...existingFolder,
    id: existingFolder?.id ?? stableId("dlmurah-content-type-views-folder"),
    title: CONTENT_TYPE_FOLDER_TITLE,
    views: [...managedViews, ...unrelatedViews],
  };

  if (folderIndex < 0) {
    return [...folders, nextFolder];
  }

  return folders.map((folder, index) =>
    index === folderIndex ? nextFolder : folder,
  );
}

export async function ensureContentTypeViews(client: PlainClientAPI) {
  const [uiConfig, contentTypes] = await Promise.all([
    client.uiConfig.get({}),
    client.contentType.getMany({ query: { limit: 1000 } }),
  ]);
  const entryListViews = mergeContentTypeViews(
    uiConfig.entryListViews,
    contentTypes.items,
  );

  if (
    JSON.stringify(entryListViews) === JSON.stringify(uiConfig.entryListViews)
  ) {
    return { changed: false, contentTypes: contentTypes.items };
  }

  await client.uiConfig.update({}, { ...uiConfig, entryListViews });

  return { changed: true, contentTypes: contentTypes.items };
}
