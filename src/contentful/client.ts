import "server-only";

import { env } from "@/lib/env";
import type { ContentfulCollection } from "@/types/contentful";

export const CONTENTFUL_CACHE_TAG = "contentful";
export const CONTENTFUL_REVALIDATE_SECONDS = 300;

type FetchContentfulOptions = {
  preview?: boolean;
  query?: Record<string, string | number | boolean | undefined>;
};

export function isContentfulConfigured(preview = false): boolean {
  const token = preview
    ? env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : env.CONTENTFUL_ACCESS_TOKEN;

  return Boolean(env.CONTENTFUL_SPACE_ID && token);
}

export async function fetchContentfulCollection<
  TFields extends Record<string, unknown>,
>(
  contentType: string,
  { preview = false, query = {} }: FetchContentfulOptions = {},
): Promise<ContentfulCollection<TFields>> {
  const token = preview
    ? env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : env.CONTENTFUL_ACCESS_TOKEN;

  if (!env.CONTENTFUL_SPACE_ID || !token) {
    throw new Error(
      `Contentful ${preview ? "Preview" : "Delivery"} API belum dikonfigurasi.`,
    );
  }

  const host = preview ? "preview.contentful.com" : "cdn.contentful.com";
  const environment = encodeURIComponent(env.CONTENTFUL_ENVIRONMENT);
  const url = new URL(
    `https://${host}/spaces/${encodeURIComponent(env.CONTENTFUL_SPACE_ID)}/environments/${environment}/entries`,
  );

  url.searchParams.set("content_type", contentType);
  if (env.CONTENTFUL_LOCALE) {
    url.searchParams.set("locale", env.CONTENTFUL_LOCALE);
  }
  url.searchParams.set("include", "1");
  url.searchParams.set("limit", "1000");

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...(preview
      ? { cache: "no-store" as const }
      : {
          next: {
            revalidate: CONTENTFUL_REVALIDATE_SECONDS,
            tags: [CONTENTFUL_CACHE_TAG],
          },
        }),
  });

  if (!response.ok) {
    throw new Error(
      `Contentful request gagal (${response.status} ${response.statusText}).`,
    );
  }

  return (await response.json()) as ContentfulCollection<TFields>;
}
