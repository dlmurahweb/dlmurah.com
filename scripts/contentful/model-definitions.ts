import type { CreateContentTypeProps } from "contentful-management";

type FieldOptions = {
  required?: boolean;
  validations?: Array<Record<string, unknown>>;
};

function symbol(id: string, name: string, options: FieldOptions = {}) {
  return {
    id,
    name,
    type: "Symbol",
    localized: false,
    required: options.required ?? false,
    validations: options.validations ?? [],
  };
}

function text(id: string, name: string, options: FieldOptions = {}) {
  return {
    id,
    name,
    type: "Text",
    localized: false,
    required: options.required ?? false,
    validations: options.validations ?? [],
  };
}

function integer(id: string, name: string, options: FieldOptions = {}) {
  return {
    id,
    name,
    type: "Integer",
    localized: false,
    required: options.required ?? false,
    validations: options.validations ?? [],
  };
}

function boolean(id: string, name: string, required = false) {
  return {
    id,
    name,
    type: "Boolean",
    localized: false,
    required,
    validations: [],
  };
}

function date(id: string, name: string) {
  return {
    id,
    name,
    type: "Date",
    localized: false,
    required: false,
    validations: [],
  };
}

function richText(id: string, name: string, required = false) {
  return {
    id,
    name,
    type: "RichText",
    localized: false,
    required,
    validations: [],
  };
}

function media(id: string, name: string) {
  return {
    id,
    name,
    type: "Link",
    linkType: "Asset",
    localized: false,
    required: false,
    validations: [{ linkMimetypeGroup: ["image"] }],
  };
}

function entryLink(id: string, name: string, contentType: string) {
  return {
    id,
    name,
    type: "Link",
    linkType: "Entry",
    localized: false,
    required: false,
    validations: [{ linkContentType: [contentType] }],
  };
}

const positiveOrder = [{ range: { min: 1 } }];
const urlValidation = [
  {
    regexp: {
      pattern: "^https://[^\\s]+$",
      flags: "i",
    },
    message: "Gunakan URL HTTPS lengkap.",
  },
];

const phoneValidation = [
  {
    regexp: {
      pattern: "^[+0-9][0-9 ()-]{7,20}$",
      flags: "",
    },
    message: "Masukkan nomor WhatsApp yang valid.",
  },
];

export type ContentModelDefinition = {
  id: string;
  definition: CreateContentTypeProps;
};

export const CONTENT_MODEL_DEFINITIONS: ContentModelDefinition[] = [
  {
    id: "siteSettings",
    definition: {
      name: "Pengaturan Situs",
      description: "Konfigurasi global. Gunakan satu entry saja.",
      displayField: "siteName",
      fields: [
        symbol("siteName", "Nama situs", { required: true }),
        text("siteDescription", "Deskripsi situs", { required: true }),
        media("logo", "Logo"),
        media("favicon", "Favicon"),
        symbol("defaultSeoTitle", "Judul SEO default", { required: true }),
        text("defaultSeoDescription", "Deskripsi SEO default", {
          required: true,
        }),
        symbol("siteUrl", "URL situs", {
          required: true,
          validations: urlValidation,
        }),
        symbol("contactEmail", "Email kontak"),
        text("footerDisclaimer", "Disclaimer footer", { required: true }),
        symbol("copyrightText", "Teks hak cipta", { required: true }),
      ],
    },
  },
  {
    id: "navigationItem",
    definition: {
      name: "Item Navigasi",
      description: "Tautan navigasi utama situs.",
      displayField: "label",
      fields: [
        symbol("label", "Label", { required: true }),
        symbol("href", "Tujuan tautan", { required: true }),
        integer("order", "Urutan", {
          required: true,
          validations: positiveOrder,
        }),
        boolean("isExternal", "Tautan eksternal"),
        boolean("isEnabled", "Aktif", true),
      ],
    },
  },
  {
    id: "homepage",
    definition: {
      name: "Homepage",
      description: "Konten utama homepage. Gunakan satu entry saja.",
      displayField: "heroTitle",
      fields: [
        symbol("eyebrow", "Eyebrow", { required: true }),
        symbol("heroTitle", "Judul hero", { required: true }),
        text("heroDescription", "Deskripsi hero", { required: true }),
        symbol("primaryCtaLabel", "Label CTA utama", { required: true }),
        symbol("primaryCtaTarget", "Tujuan CTA utama", { required: true }),
        symbol("secondaryCtaLabel", "Label CTA sekunder", { required: true }),
        symbol("secondaryCtaTarget", "Tujuan CTA sekunder", {
          required: true,
        }),
        media("heroImage", "Gambar hero"),
        symbol("servicesHeading", "Judul layanan", { required: true }),
        text("servicesDescription", "Deskripsi layanan", { required: true }),
        symbol("howItWorksHeading", "Judul cara kerja", { required: true }),
        symbol("aboutHeading", "Judul tentang", { required: true }),
        richText("aboutContent", "Konten tentang", true),
        symbol("finalCtaTitle", "Judul CTA akhir", { required: true }),
        text("finalCtaDescription", "Deskripsi CTA akhir", {
          required: true,
        }),
        symbol("seoTitle", "Judul SEO", { required: true }),
        text("seoDescription", "Deskripsi SEO", { required: true }),
      ],
    },
  },
  {
    id: "whatsappAdmin",
    definition: {
      name: "Admin WhatsApp",
      description: "Kontak admin berdasarkan kategori layanan.",
      displayField: "name",
      fields: [
        symbol("name", "Nama admin", { required: true }),
        symbol("role", "Peran", { required: true }),
        symbol("serviceCategory", "Kategori layanan", { required: true }),
        symbol("phoneNumber", "Nomor WhatsApp", {
          required: true,
          validations: phoneValidation,
        }),
        text("prefilledMessage", "Pesan WhatsApp awal", { required: true }),
        symbol("availabilityLabel", "Label ketersediaan"),
        symbol("responseTimeLabel", "Label waktu respons"),
        media("avatar", "Avatar"),
        integer("order", "Urutan", {
          required: true,
          validations: positiveOrder,
        }),
        boolean("isActive", "Aktif", true),
      ],
    },
  },
  {
    id: "service",
    definition: {
      name: "Layanan",
      description: "Layanan yang ditampilkan pada homepage.",
      displayField: "title",
      fields: [
        symbol("title", "Judul", { required: true }),
        symbol("slug", "Slug", {
          required: true,
          validations: [{ unique: true }],
        }),
        text("shortDescription", "Deskripsi singkat", { required: true }),
        symbol("iconKey", "Kunci ikon", { required: true }),
        symbol("badge", "Badge"),
        entryLink("whatsappAdmin", "Admin WhatsApp", "whatsappAdmin"),
        text("whatsappPrefilledMessage", "Pesan WhatsApp layanan"),
        integer("order", "Urutan", {
          required: true,
          validations: positiveOrder,
        }),
        boolean("isEnabled", "Aktif", true),
      ],
    },
  },
  {
    id: "whatsappChannel",
    definition: {
      name: "Saluran WhatsApp",
      description: "Saluran informasi resmi DLMURAH.",
      displayField: "title",
      fields: [
        symbol("title", "Judul", { required: true }),
        text("description", "Deskripsi", { required: true }),
        symbol("url", "URL HTTPS", { validations: urlValidation }),
        symbol("iconKey", "Kunci ikon", { required: true }),
        symbol("memberCountLabel", "Label jumlah anggota"),
        integer("order", "Urutan", {
          required: true,
          validations: positiveOrder,
        }),
        boolean("isActive", "Aktif", true),
      ],
    },
  },
  {
    id: "statistic",
    definition: {
      name: "Statistik",
      description: "Statistik atau label kepercayaan berbasis teks.",
      displayField: "label",
      fields: [
        symbol("value", "Nilai", { required: true }),
        symbol("label", "Label", { required: true }),
        symbol("description", "Deskripsi"),
        symbol("iconKey", "Kunci ikon", { required: true }),
        integer("order", "Urutan", {
          required: true,
          validations: positiveOrder,
        }),
        boolean("isEnabled", "Aktif", true),
      ],
    },
  },
  {
    id: "processStep",
    definition: {
      name: "Langkah Proses",
      description: "Tahapan pada bagian Cara Kerja.",
      displayField: "title",
      fields: [
        symbol("stepNumber", "Nomor langkah", { required: true }),
        symbol("title", "Judul", { required: true }),
        text("description", "Deskripsi", { required: true }),
        symbol("iconKey", "Kunci ikon", { required: true }),
        integer("order", "Urutan", {
          required: true,
          validations: positiveOrder,
        }),
        boolean("isEnabled", "Aktif", true),
      ],
    },
  },
  {
    id: "feature",
    definition: {
      name: "Keunggulan",
      description: "Item pada bagian Kenapa Memilih DLMURAH.",
      displayField: "title",
      fields: [
        symbol("title", "Judul", { required: true }),
        text("description", "Deskripsi", { required: true }),
        symbol("iconKey", "Kunci ikon", { required: true }),
        integer("order", "Urutan", {
          required: true,
          validations: positiveOrder,
        }),
        boolean("isEnabled", "Aktif", true),
      ],
    },
  },
  {
    id: "faq",
    definition: {
      name: "FAQ",
      description: "Pertanyaan dan jawaban yang dapat dikelola pemilik.",
      displayField: "question",
      fields: [
        symbol("question", "Pertanyaan", { required: true }),
        richText("answer", "Jawaban", true),
        integer("order", "Urutan", {
          required: true,
          validations: positiveOrder,
        }),
        boolean("isEnabled", "Aktif", true),
      ],
    },
  },
  {
    id: "announcement",
    definition: {
      name: "Pengumuman",
      description: "Pengumuman opsional di atas navigasi.",
      displayField: "message",
      fields: [
        symbol("message", "Pesan", { required: true }),
        symbol("linkLabel", "Label tautan"),
        symbol("linkUrl", "URL tautan"),
        symbol("variant", "Varian", {
          required: true,
          validations: [{ in: ["information", "warning", "promotion"] }],
        }),
        boolean("isEnabled", "Aktif", true),
        date("startDate", "Tanggal mulai"),
        date("endDate", "Tanggal selesai"),
      ],
    },
  },
] as ContentModelDefinition[];
