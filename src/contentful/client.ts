import "server-only";

import {
  CONTENTFUL_CACHE_TAG,
  CONTENTFUL_REVALIDATE_SECONDS,
  createContentfulRequestConfig,
} from "@/contentful/request";
import { env } from "@/lib/env";
import type { ContentfulCollection } from "@/types/contentful";

export { CONTENTFUL_CACHE_TAG, CONTENTFUL_REVALIDATE_SECONDS };

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
  const { init, token, url } = createContentfulRequestConfig({
    accessToken: env.CONTENTFUL_ACCESS_TOKEN,
    contentType,
    environment: env.CONTENTFUL_ENVIRONMENT,
    locale: env.CONTENTFUL_LOCALE,
    preview,
    previewAccessToken: env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    query,
    spaceId: env.CONTENTFUL_SPACE_ID ?? "",
  });

  if (!env.CONTENTFUL_SPACE_ID || !token) {
    throw new Error(
      `Contentful ${preview ? "Preview" : "Delivery"} API belum dikonfigurasi.`,
    );
  }

  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(
      `Contentful request gagal (${response.status} ${response.statusText}).`,
    );
  }

  return (await response.json()) as ContentfulCollection<TFields>;
}
