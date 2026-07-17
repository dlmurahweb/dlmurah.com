export type PolicyMetadata = {
  title: string;
  description: string;
  seoDescription: string;
  lastUpdated: string;
  canonicalPath: string;
};

export const PRIVACY_POLICY_METADATA = {
  title: "Kebijakan Privasi",
  description:
    "Penjelasan tentang data teknis yang dapat diproses saat kamu mengakses website dan berpindah ke layanan pihak ketiga.",
  seoDescription:
    "Kebijakan privasi website DLMURAH mengenai analytics, layanan pihak ketiga, dan komunikasi WhatsApp.",
  lastUpdated: "16 Juli 2026",
  canonicalPath: "/kebijakan-privasi",
} satisfies PolicyMetadata;

export const TERMS_POLICY_METADATA = {
  title: "Syarat Layanan",
  description:
    "Ketentuan dasar penggunaan website DLMURAH dan komunikasi dengan admin melalui WhatsApp.",
  seoDescription:
    "Syarat penggunaan website DLMURAH sebagai pusat informasi dan penghubung komunikasi melalui WhatsApp.",
  lastUpdated: "16 Juli 2026",
  canonicalPath: "/syarat-layanan",
} satisfies PolicyMetadata;
