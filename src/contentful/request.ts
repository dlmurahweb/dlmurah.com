export const CONTENTFUL_CACHE_TAG = "contentful";
export const CONTENTFUL_REVALIDATE_SECONDS = 300;

type ContentfulRequestConfigInput = {
  accessToken?: string;
  contentType: string;
  environment: string;
  locale?: string;
  preview?: boolean;
  previewAccessToken?: string;
  query?: Record<string, string | number | boolean | undefined>;
  spaceId: string;
};

type ContentfulRequestConfig = {
  init: RequestInit & {
    next?: {
      revalidate: number;
      tags: string[];
    };
  };
  token?: string;
  url: URL;
};

export function createContentfulRequestConfig({
  accessToken,
  contentType,
  environment,
  locale,
  preview = false,
  previewAccessToken,
  query = {},
  spaceId,
}: ContentfulRequestConfigInput): ContentfulRequestConfig {
  const token = preview ? previewAccessToken : accessToken;
  const host = preview ? "preview.contentful.com" : "cdn.contentful.com";
  const url = new URL(
    `https://${host}/spaces/${encodeURIComponent(spaceId)}/environments/${encodeURIComponent(environment)}/entries`,
  );

  url.searchParams.set("content_type", contentType);
  if (locale) {
    url.searchParams.set("locale", locale);
  }
  url.searchParams.set("include", "1");
  url.searchParams.set("limit", "1000");

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  return {
    token,
    url,
    init: {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
      ...(preview
        ? { cache: "no-store" as const }
        : {
            next: {
              revalidate: CONTENTFUL_REVALIDATE_SECONDS,
              tags: [CONTENTFUL_CACHE_TAG],
            },
          }),
    },
  };
}
