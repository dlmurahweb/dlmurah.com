import { config } from "dotenv";
import {
  createClient,
  isDraft,
  isUpdated,
  type ContentTypeProps,
  type PlainClientAPI,
} from "contentful-management";
import { z } from "zod";

import { CONTENT_MODEL_DEFINITIONS } from "./model-definitions";
import { SAMPLE_ENTRIES } from "./sample-entries";

config({ path: ".env.local", quiet: true });
config({ path: ".env", override: false, quiet: true });

const setupEnvSchema = z.object({
  CONTENTFUL_MANAGEMENT_TOKEN: z.string().trim().min(1),
  CONTENTFUL_SPACE_ID: z.string().trim().min(1),
  CONTENTFUL_ENVIRONMENT: z.string().trim().min(1).default("master"),
  CONTENTFUL_LOCALE: z.string().trim().min(1).default("id-ID"),
  CONTENTFUL_FORCE_SEED: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => value === "true"),
});

function isNotFound(error: unknown): boolean {
  const candidate = error as {
    status?: number;
    statusCode?: number;
    sys?: { id?: string };
  };

  return (
    candidate?.status === 404 ||
    candidate?.statusCode === 404 ||
    candidate?.sys?.id === "NotFound"
  );
}

async function ensureLocale(
  client: PlainClientAPI,
  requestedLocale: string,
): Promise<string> {
  const locales = await client.locale.getMany({});
  const defaultLocale = locales.items.find((locale) => locale.default);

  if (!defaultLocale) {
    throw new Error("Contentful environment tidak memiliki locale default.");
  }

  if (!locales.items.some((locale) => locale.code === requestedLocale)) {
    await client.locale.create(
      {},
      {
        name: "Bahasa Indonesia",
        code: requestedLocale,
        fallbackCode: defaultLocale.code,
        optional: true,
        contentDeliveryApi: true,
        contentManagementApi: true,
      },
    );
    console.log(`Locale ${requestedLocale} dibuat.`);
  } else {
    console.log(`Locale ${requestedLocale} sudah tersedia.`);
  }

  return defaultLocale.code;
}

function mergeKnownFields(
  contentType: ContentTypeProps,
  definition: (typeof CONTENT_MODEL_DEFINITIONS)[number]["definition"],
) {
  const definitionFields = definition.fields as ContentTypeProps["fields"];
  const knownIds = new Set(definitionFields.map((field) => field.id));
  const existingById = new Map(
    contentType.fields.map((field) => [field.id, field]),
  );
  const knownFields = definitionFields.map((field) => ({
    ...existingById.get(field.id),
    ...field,
  }));
  const ownerFields = contentType.fields.filter(
    (field) => !knownIds.has(field.id),
  );

  return [...knownFields, ...ownerFields];
}

async function upsertContentType(
  client: PlainClientAPI,
  model: (typeof CONTENT_MODEL_DEFINITIONS)[number],
) {
  let contentType: ContentTypeProps;

  try {
    const existing = await client.contentType.get({
      contentTypeId: model.id,
    });
    contentType = await client.contentType.update(
      { contentTypeId: model.id },
      {
        ...existing,
        name: model.definition.name,
        description: model.definition.description ?? "",
        displayField: model.definition.displayField ?? "",
        fields: mergeKnownFields(existing, model.definition),
      },
    );
    console.log(`Model ${model.id} diperbarui.`);
  } catch (error) {
    if (!isNotFound(error)) throw error;
    contentType = await client.contentType.createWithId(
      { contentTypeId: model.id },
      model.definition,
    );
    console.log(`Model ${model.id} dibuat.`);
  }

  if (isDraft(contentType) || isUpdated(contentType)) {
    await client.contentType.publish({ contentTypeId: model.id }, contentType);
    console.log(`Model ${model.id} dipublikasikan.`);
  }
}

function localizeFields(
  fields: Record<string, unknown>,
  locale: string,
): Record<string, Record<string, unknown>> {
  return Object.fromEntries(
    Object.entries(fields)
      .filter(([, value]) => value !== undefined)
      .map(([fieldId, value]) => [fieldId, { [locale]: value }]),
  );
}

async function seedEntry(
  client: PlainClientAPI,
  sample: (typeof SAMPLE_ENTRIES)[number],
  locale: string,
  force: boolean,
) {
  const localizedFields = localizeFields(sample.fields, locale);

  try {
    let entry = await client.entry.get({ entryId: sample.id });

    if (!force) {
      console.log(`Entry ${sample.id} sudah ada; dilewati.`);
      return;
    }

    entry = await client.entry.update(
      { entryId: sample.id },
      { ...entry, fields: localizedFields },
    );
    if (isDraft(entry) || isUpdated(entry)) {
      await client.entry.publish({ entryId: sample.id }, entry);
    }
    console.log(`Entry ${sample.id} diperbarui karena force seed aktif.`);
  } catch (error) {
    if (!isNotFound(error)) throw error;
    const entry = await client.entry.createWithId(
      { entryId: sample.id, contentTypeId: sample.contentType },
      { fields: localizedFields },
    );
    await client.entry.publish({ entryId: sample.id }, entry);
    console.log(`Entry ${sample.id} dibuat dan dipublikasikan.`);
  }
}

async function main() {
  const setupEnv = setupEnvSchema.parse(process.env);
  const client = createClient(
    { accessToken: setupEnv.CONTENTFUL_MANAGEMENT_TOKEN },
    {
      defaults: {
        spaceId: setupEnv.CONTENTFUL_SPACE_ID,
        environmentId: setupEnv.CONTENTFUL_ENVIRONMENT,
      },
    },
  );

  console.log(
    `Menyiapkan Contentful ${setupEnv.CONTENTFUL_SPACE_ID}/${setupEnv.CONTENTFUL_ENVIRONMENT}...`,
  );

  const defaultLocale = await ensureLocale(client, setupEnv.CONTENTFUL_LOCALE);

  for (const model of CONTENT_MODEL_DEFINITIONS) {
    await upsertContentType(client, model);
  }

  for (const sample of SAMPLE_ENTRIES) {
    await seedEntry(
      client,
      sample,
      defaultLocale,
      setupEnv.CONTENTFUL_FORCE_SEED,
    );
  }

  console.log("Setup Contentful selesai.");
  console.log(
    "Admin dan saluran contoh tetap nonaktif. Ganti nomor/URL placeholder sebelum mengaktifkannya.",
  );
}

main().catch((error: unknown) => {
  const rawMessage = error instanceof Error ? error.message : String(error);
  const message = rawMessage.replace(/Bearer\s+[^"\s]+/gi, "Bearer [REDACTED]");
  console.error(`Setup Contentful gagal: ${message}`);
  process.exitCode = 1;
});
