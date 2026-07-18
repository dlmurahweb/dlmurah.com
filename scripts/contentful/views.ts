import { config } from "dotenv";
import { createClient } from "contentful-management";
import { z } from "zod";

import { ensureContentTypeViews } from "./content-type-views";
import { redactContentfulErrorMessage } from "./redaction";

config({ path: ".env.local", quiet: true });
config({ path: ".env", override: false, quiet: true });

const viewsEnvSchema = z.object({
  CONTENTFUL_MANAGEMENT_TOKEN: z.string().trim().min(1),
  CONTENTFUL_SPACE_ID: z.string().trim().min(1),
  CONTENTFUL_ENVIRONMENT: z.string().trim().min(1).default("master"),
});

async function main() {
  const viewsEnv = viewsEnvSchema.parse(process.env);
  const client = createClient(
    { accessToken: viewsEnv.CONTENTFUL_MANAGEMENT_TOKEN },
    {
      defaults: {
        spaceId: viewsEnv.CONTENTFUL_SPACE_ID,
        environmentId: viewsEnv.CONTENTFUL_ENVIRONMENT,
      },
    },
  );

  const result = await ensureContentTypeViews(client);
  const names = result.contentTypes
    .map((contentType) => contentType.name)
    .sort((left, right) => left.localeCompare(right, "id-ID"));

  console.log(
    result.changed
      ? `${names.length} view content type dibuat/diperbarui.`
      : `${names.length} view content type sudah tersedia; tidak ada perubahan.`,
  );
  console.log(names.map((name) => `- ${name}`).join("\n"));
}

main().catch((error: unknown) => {
  const rawMessage = error instanceof Error ? error.message : String(error);
  const message = redactContentfulErrorMessage(rawMessage);
  console.error(`Setup view Contentful gagal: ${message}`);
  process.exitCode = 1;
});
