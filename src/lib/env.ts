import "server-only";

import { z } from "zod";

const optionalText = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().trim().min(1).optional(),
);

const optionalUrl = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().trim().url().optional(),
);

const serverEnvSchema = z.object({
  CONTENTFUL_SPACE_ID: optionalText,
  CONTENTFUL_ACCESS_TOKEN: optionalText,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN: optionalText,
  CONTENTFUL_ENVIRONMENT: optionalText.default("master"),
  CONTENTFUL_PREVIEW_SECRET: optionalText,
  NEXT_PUBLIC_SITE_URL: optionalUrl.default("http://localhost:3000"),
  NEXT_PUBLIC_GA_ID: optionalText,
});

export const env = serverEnvSchema.parse({
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_PREVIEW_SECRET: process.env.CONTENTFUL_PREVIEW_SECRET,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
});
