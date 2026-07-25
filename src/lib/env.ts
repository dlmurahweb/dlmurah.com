import "server-only";

import { z } from "zod";

import { SITE_URL } from "@/lib/constants";

const optionalText = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().trim().min(1).optional(),
);

const localHostnames = new Set(["localhost", "127.0.0.1", "0.0.0.0", "[::1]"]);

const canonicalSiteUrl = z.preprocess((value) => {
  if (typeof value !== "string") return value;

  const candidate = value.trim();
  if (!candidate) return undefined;

  try {
    const hostname = new URL(candidate).hostname;
    if (localHostnames.has(hostname) || hostname.endsWith(".localhost")) {
      return undefined;
    }
  } catch {
    return candidate;
  }

  return candidate;
}, z.string().url().default(SITE_URL));

const serverEnvSchema = z.object({
  CONTENTFUL_SPACE_ID: optionalText,
  CONTENTFUL_ACCESS_TOKEN: optionalText,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN: optionalText,
  CONTENTFUL_ENVIRONMENT: optionalText.default("master"),
  CONTENTFUL_LOCALE: optionalText,
  CONTENTFUL_PREVIEW_SECRET: optionalText,
  CONTENTFUL_REVALIDATE_SECRET: optionalText,
  GOOGLE_SITE_VERIFICATION: optionalText,
  NEXT_PUBLIC_SITE_URL: canonicalSiteUrl,
  NEXT_PUBLIC_GA_ID: optionalText,
});

export const env = serverEnvSchema.parse({
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_LOCALE: process.env.CONTENTFUL_LOCALE,
  CONTENTFUL_PREVIEW_SECRET: process.env.CONTENTFUL_PREVIEW_SECRET,
  CONTENTFUL_REVALIDATE_SECRET: process.env.CONTENTFUL_REVALIDATE_SECRET,
  GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
});
