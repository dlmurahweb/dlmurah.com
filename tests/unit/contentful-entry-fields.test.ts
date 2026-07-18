import assert from "node:assert/strict";
import test from "node:test";

import {
  localizeFields,
  mergeLocalizedFields,
} from "../../scripts/contentful/entry-fields";
import { CONTENT_MODEL_DEFINITIONS } from "../../scripts/contentful/model-definitions";
import { SAMPLE_ENTRIES } from "../../scripts/contentful/sample-entries";
import { FALLBACK_HOME_PAGE_DATA } from "../../src/contentful/fallback";
import { createAdminWhatsAppLink } from "../../src/lib/whatsapp";
import type { WhatsAppAdmin } from "../../src/types/site";

function modelFieldIds(contentType: string): string[] {
  const model = CONTENT_MODEL_DEFINITIONS.find(
    (item) => item.id === contentType,
  );

  assert.ok(model, `Missing ${contentType} content model`);
  return (model.definition.fields as Array<{ id: string }>).map(
    (field) => field.id,
  );
}

function sampleFieldIds(contentType: string): string[] {
  const sample = SAMPLE_ENTRIES.find(
    (entry) => entry.contentType === contentType,
  );

  assert.ok(sample, `Missing ${contentType} sample entry`);
  return Object.keys(sample.fields);
}

function sampleEntries(contentType: string) {
  return SAMPLE_ENTRIES.filter((entry) => entry.contentType === contentType);
}

test("localizeFields omits undefined values", () => {
  assert.deepEqual(
    localizeFields(
      {
        title: "Homepage",
        optionalImage: undefined,
      },
      "id-ID",
    ),
    {
      title: { "id-ID": "Homepage" },
    },
  );
});

test("mergeLocalizedFields preserves owner fields and unrelated locales", () => {
  assert.deepEqual(
    mergeLocalizedFields(
      {
        title: {
          "en-US": "Old title",
          "id-ID": "Judul lama",
        },
        ownerNote: {
          "en-US": "Do not remove",
        },
      },
      {
        title: {
          "id-ID": "Judul baru",
        },
        description: {
          "id-ID": "Deskripsi baru",
        },
      },
    ),
    {
      title: {
        "en-US": "Old title",
        "id-ID": "Judul baru",
      },
      ownerNote: {
        "en-US": "Do not remove",
      },
      description: {
        "id-ID": "Deskripsi baru",
      },
    },
  );
});

test("homepage content fields stay wired to model and sample seed", () => {
  const fallbackFields = Object.keys(FALLBACK_HOME_PAGE_DATA.homepage);
  const expectedFields = fallbackFields.filter(
    (field) => field !== "id" && field !== "heroImageUrl",
  );

  assert.deepEqual(
    new Set(modelFieldIds("homepage")),
    new Set([...expectedFields, "heroImage"]),
  );
  assert.deepEqual(
    new Set(sampleFieldIds("homepage")),
    new Set(expectedFields),
  );
});

test("site settings fields stay wired to model and sample seed", () => {
  const fallbackFields = Object.keys(FALLBACK_HOME_PAGE_DATA.siteSettings);
  const expectedFields = fallbackFields.filter(
    (field) => field !== "id" && field !== "logoUrl" && field !== "faviconUrl",
  );

  assert.deepEqual(
    new Set(modelFieldIds("siteSettings")),
    new Set([...expectedFields, "logo", "favicon", "contactEmail"]),
  );
  assert.deepEqual(
    new Set(sampleFieldIds("siteSettings")),
    new Set(expectedFields),
  );
});

test("all seeded content types have a model definition", () => {
  const modelIds = new Set(CONTENT_MODEL_DEFINITIONS.map((model) => model.id));
  const seededContentTypes = new Set(
    SAMPLE_ENTRIES.map((entry) => entry.contentType),
  );

  assert.deepEqual(seededContentTypes, modelIds);
  assert.equal(modelIds.size, 11);
});

test("singleton sample entries stay singular and use stable ids", () => {
  assert.deepEqual(
    sampleEntries("siteSettings").map((entry) => entry.id),
    ["site-settings"],
  );
  assert.deepEqual(
    sampleEntries("homepage").map((entry) => entry.id),
    ["homepage"],
  );
});

test("sample collection sizes follow owner guide limits", () => {
  assert.ok(sampleEntries("whatsappChannel").length <= 2);
  assert.ok(sampleEntries("statistic").length <= 4);
});

test("ordered sample entries use positive unique order values", () => {
  for (const contentType of [
    "navigationItem",
    "whatsappAdmin",
    "service",
    "whatsappChannel",
    "statistic",
    "processStep",
    "feature",
    "faq",
  ]) {
    const orders = sampleEntries(contentType).map(
      (entry) => entry.fields.order,
    );

    assert.ok(
      orders.every((value) => Number.isInteger(value) && Number(value) > 0),
      `${contentType} should only use positive integer order values`,
    );
    assert.equal(
      new Set(orders).size,
      orders.length,
      `${contentType} should not repeat order values`,
    );
  }
});

test("sample contact data stays inactive before owner verification", () => {
  for (const entry of sampleEntries("whatsappAdmin")) {
    assert.equal(entry.fields.isActive, false);
    assert.notEqual(entry.fields.phoneNumber, "620000000000");

    const admin: WhatsAppAdmin = {
      id: entry.id,
      name: String(entry.fields.name),
      role: String(entry.fields.role),
      serviceCategory: String(entry.fields.serviceCategory),
      phoneNumber:
        typeof entry.fields.phoneNumber === "string"
          ? entry.fields.phoneNumber
          : "",
      prefilledMessage: String(entry.fields.prefilledMessage),
      availabilityLabel:
        typeof entry.fields.availabilityLabel === "string"
          ? entry.fields.availabilityLabel
          : undefined,
      order: Number(entry.fields.order),
      isActive: Boolean(entry.fields.isActive),
    };

    assert.equal(createAdminWhatsAppLink(admin), null);
  }

  for (const entry of sampleEntries("whatsappChannel")) {
    assert.equal(entry.fields.isActive, false);
  }
});

test("sample admin labels identify the requested contacts", () => {
  assert.deepEqual(
    sampleEntries("whatsappAdmin").map((entry) => entry.fields.name),
    ["Admin Wenly (DL)", "Admin Icha (DL)", "Admin Jual Beli Akun"],
  );
});

test("sample services only reference seeded admins", () => {
  const adminIds = new Set(
    sampleEntries("whatsappAdmin").map((entry) => entry.id),
  );

  for (const service of sampleEntries("service")) {
    const link = service.fields.whatsappAdmin as
      { sys?: { id?: string } } | undefined;
    const linkedAdminId = link?.sys?.id;

    assert.ok(linkedAdminId, `${service.id} should reference an admin`);
    assert.ok(
      adminIds.has(linkedAdminId),
      `${service.id} references missing admin ${linkedAdminId}`,
    );
  }
});
