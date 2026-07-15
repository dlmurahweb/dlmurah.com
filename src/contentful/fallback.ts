import { BLOCKS, type Document } from "@contentful/rich-text-types";

import type { HomePageData } from "@/types/site";

export function createRichTextDocument(text: string): Document {
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: "text",
            value: text,
            marks: [],
            data: {},
          },
        ],
      },
    ],
  };
}

const disclaimer =
  "DLMURAH adalah layanan independen dan tidak berafiliasi, didukung, atau disponsori oleh Growtopia maupun pemilik merek terkait. Seluruh merek dagang pihak ketiga merupakan milik masing-masing pemiliknya.";

export const FALLBACK_HOME_PAGE_DATA: HomePageData = {
  source: "fallback",
  preview: false,
  siteSettings: {
    id: "fallback-site-settings",
    siteName: "DLMURAH",
    siteDescription:
      "Pusat informasi layanan DLMURAH dan jalur resmi untuk menghubungi admin melalui WhatsApp.",
    defaultSeoTitle: "DLMURAH — Jual Beli DL, BGL, dan Akun",
    defaultSeoDescription:
      "Hubungi admin DLMURAH untuk layanan jual beli DL/BGL, transaksi akun, dan informasi terbaru melalui WhatsApp.",
    siteUrl: "https://dlmurah.com",
    footerDisclaimer: disclaimer,
    copyrightText: "© DLMURAH. Seluruh hak cipta dilindungi.",
  },
  navigation: [
    {
      id: "nav-home",
      label: "Beranda",
      href: "#beranda",
      order: 1,
      isExternal: false,
      isEnabled: true,
    },
    {
      id: "nav-services",
      label: "Layanan",
      href: "#layanan",
      order: 2,
      isExternal: false,
      isEnabled: true,
    },
    {
      id: "nav-process",
      label: "Cara Kerja",
      href: "#cara-kerja",
      order: 3,
      isExternal: false,
      isEnabled: true,
    },
    {
      id: "nav-about",
      label: "Tentang",
      href: "#tentang",
      order: 4,
      isExternal: false,
      isEnabled: true,
    },
    {
      id: "nav-contact",
      label: "Kontak",
      href: "#kontak",
      order: 5,
      isExternal: false,
      isEnabled: true,
    },
  ],
  homepage: {
    id: "fallback-homepage",
    eyebrow: "LAYANAN DIGITAL GROWTOPIA",
    heroTitle: "Jual Beli DL, BGL, dan Akun dengan Proses Lebih Mudah",
    heroDescription:
      "Hubungi admin DLMURAH melalui WhatsApp untuk jual beli DL/BGL, transaksi akun, dan kebutuhan layanan lainnya.",
    primaryCtaLabel: "Mulai Transaksi",
    primaryCtaTarget: "#pilih-admin",
    secondaryCtaLabel: "Lihat Layanan",
    secondaryCtaTarget: "#layanan",
    servicesHeading: "Layanan DLMURAH",
    servicesDescription:
      "Pilih layanan yang sesuai dengan kebutuhanmu dan hubungi admin yang menangani layanan tersebut.",
    howItWorksHeading: "Cara Kerja",
    aboutHeading: "Tentang DLMURAH",
    aboutContent: createRichTextDocument(
      "DLMURAH merupakan layanan digital yang membantu komunitas Growtopia terhubung dengan admin untuk kebutuhan jual beli DL/BGL, transaksi akun, dan layanan terkait lainnya. Website ini menjadi pusat informasi dan jalur resmi untuk menghubungi tim DLMURAH melalui WhatsApp.",
    ),
    finalCtaTitle: "Siap Menghubungi Admin DLMURAH?",
    finalCtaDescription:
      "Pilih layanan yang kamu butuhkan dan lanjutkan percakapan melalui WhatsApp.",
    seoTitle: "DLMURAH — Jual Beli DL, BGL, dan Akun",
    seoDescription:
      "Hubungi admin DLMURAH untuk layanan jual beli DL/BGL, transaksi akun, dan informasi terbaru melalui WhatsApp.",
  },
  services: [
    {
      id: "service-buy-dl",
      title: "Beli DL/BGL",
      slug: "beli-dl-bgl",
      shortDescription:
        "Hubungi admin untuk menanyakan ketersediaan, harga, dan proses pembelian DL atau BGL.",
      iconKey: "vault",
      whatsappAdminId: "admin-dl-1",
      whatsappPrefilledMessage:
        "Halo Admin DLMURAH, saya ingin menanyakan layanan beli DL/BGL.",
      order: 1,
      isEnabled: true,
    },
    {
      id: "service-sell-dl",
      title: "Jual DL/BGL",
      slug: "jual-dl-bgl",
      shortDescription:
        "Tawarkan DL atau BGL kepada admin dan konfirmasikan jumlah serta harga yang tersedia.",
      iconKey: "exchange",
      whatsappAdminId: "admin-dl-2",
      whatsappPrefilledMessage:
        "Halo Admin DLMURAH, saya ingin menanyakan layanan jual DL/BGL.",
      order: 2,
      isEnabled: true,
    },
    {
      id: "service-account",
      title: "Jual Beli Akun",
      slug: "jual-beli-akun",
      shortDescription:
        "Hubungi admin khusus akun untuk menanyakan proses jual atau beli akun.",
      iconKey: "user-key",
      whatsappAdminId: "admin-account",
      whatsappPrefilledMessage:
        "Halo Admin DLMURAH, saya ingin menanyakan layanan jual beli akun.",
      order: 3,
      isEnabled: true,
    },
    {
      id: "service-help",
      title: "Bantuan Transaksi",
      slug: "bantuan-transaksi",
      shortDescription:
        "Dapatkan arahan dari admin mengenai proses transaksi yang tersedia di DLMURAH.",
      iconKey: "message",
      whatsappAdminId: "admin-dl-1",
      whatsappPrefilledMessage:
        "Halo Admin DLMURAH, saya membutuhkan bantuan mengenai proses transaksi.",
      order: 4,
      isEnabled: true,
    },
  ],
  admins: [
    {
      id: "admin-dl-1",
      name: "Admin DL/BGL 1",
      role: "Admin DL/BGL",
      serviceCategory: "DL/BGL",
      phoneNumber: "",
      prefilledMessage:
        "Halo Admin DLMURAH, saya ingin menanyakan layanan beli DL/BGL.",
      availabilityLabel: "Nomor segera diperbarui",
      order: 1,
      isActive: false,
    },
    {
      id: "admin-dl-2",
      name: "Admin DL/BGL 2",
      role: "Admin DL/BGL",
      serviceCategory: "DL/BGL",
      phoneNumber: "",
      prefilledMessage:
        "Halo Admin DLMURAH, saya ingin menanyakan layanan jual DL/BGL.",
      availabilityLabel: "Nomor segera diperbarui",
      order: 2,
      isActive: false,
    },
    {
      id: "admin-account",
      name: "Admin Akun",
      role: "Admin Jual Beli Akun",
      serviceCategory: "Akun",
      phoneNumber: "",
      prefilledMessage:
        "Halo Admin DLMURAH, saya ingin menanyakan layanan jual beli akun.",
      availabilityLabel: "Nomor segera diperbarui",
      order: 3,
      isActive: false,
    },
  ],
  channels: [
    {
      id: "channel-price",
      title: "Saluran Harga & Stok",
      description:
        "Dapatkan informasi harga, stok, dan pembaruan layanan melalui saluran resmi DLMURAH.",
      iconKey: "chart",
      order: 1,
      isActive: false,
    },
    {
      id: "channel-info",
      title: "Saluran Informasi DLMURAH",
      description:
        "Ikuti pengumuman, perubahan kontak, dan informasi resmi dari DLMURAH.",
      iconKey: "channel",
      order: 2,
      isActive: false,
    },
  ],
  statistics: [
    {
      id: "stat-admin",
      value: "3 kategori",
      label: "Admin sesuai layanan",
      iconKey: "users",
      order: 1,
      isEnabled: true,
    },
    {
      id: "stat-channel",
      value: "Langsung",
      label: "Komunikasi WhatsApp",
      iconKey: "message",
      order: 2,
      isEnabled: true,
    },
    {
      id: "stat-process",
      value: "4 langkah",
      label: "Alur yang jelas",
      iconKey: "route",
      order: 3,
      isEnabled: true,
    },
  ],
  processSteps: [
    {
      id: "step-choose-service",
      stepNumber: "01",
      title: "Pilih layanan",
      description:
        "Tentukan apakah kamu ingin membeli atau menjual DL/BGL, akun, atau membutuhkan bantuan transaksi.",
      iconKey: "layers",
      order: 1,
      isEnabled: true,
    },
    {
      id: "step-contact-admin",
      stepNumber: "02",
      title: "Hubungi admin",
      description:
        "Pilih admin sesuai kategori dan kirim pesan melalui WhatsApp.",
      iconKey: "message",
      order: 2,
      isEnabled: true,
    },
    {
      id: "step-confirm",
      stepNumber: "03",
      title: "Konfirmasi detail",
      description:
        "Diskusikan jumlah, harga, persyaratan, dan proses transaksi secara jelas.",
      iconKey: "check-list",
      order: 3,
      isEnabled: true,
    },
    {
      id: "step-finish",
      stepNumber: "04",
      title: "Selesaikan transaksi",
      description:
        "Ikuti arahan admin dan pastikan seluruh detail telah dikonfirmasi sebelum transaksi selesai.",
      iconKey: "shield-check",
      order: 4,
      isEnabled: true,
    },
  ],
  features: [
    {
      id: "feature-category",
      title: "Admin berdasarkan kategori layanan",
      description:
        "Setiap kebutuhan diarahkan ke admin yang menangani kategori terkait.",
      iconKey: "users",
      order: 1,
      isEnabled: true,
    },
    {
      id: "feature-clear",
      title: "Proses komunikasi yang jelas",
      description:
        "Konfirmasikan kebutuhan, jumlah, harga, dan tahapan sebelum melanjutkan.",
      iconKey: "message-check",
      order: 2,
      isEnabled: true,
    },
    {
      id: "feature-channel",
      title: "Saluran resmi untuk pembaruan",
      description:
        "Kontak dan informasi terbaru dikumpulkan dalam satu pusat informasi.",
      iconKey: "radio",
      order: 3,
      isEnabled: true,
    },
  ],
  faqs: [
    {
      id: "faq-transaction",
      question: "Apakah transaksi dilakukan melalui website?",
      answer: createRichTextDocument(
        "Tidak. Website berfungsi sebagai pusat informasi dan penghubung. Komunikasi dan proses transaksi dilakukan langsung melalui WhatsApp.",
      ),
      order: 1,
      isEnabled: true,
    },
    {
      id: "faq-admin",
      question: "Bagaimana cara memilih admin?",
      answer: createRichTextDocument(
        "Pilih admin berdasarkan kategori layanan yang kamu butuhkan agar pesan dapat diproses oleh kontak yang sesuai.",
      ),
      order: 2,
      isEnabled: true,
    },
    {
      id: "faq-number",
      question: "Apakah nomor WhatsApp dapat berubah?",
      answer: createRichTextDocument(
        "Ya. Gunakan hanya nomor yang sedang tercantum pada website resmi DLMURAH dan periksa kembali sebelum memulai percakapan.",
      ),
      order: 3,
      isEnabled: true,
    },
    {
      id: "faq-price",
      question: "Di mana saya dapat melihat informasi harga terbaru?",
      answer: createRichTextDocument(
        "Informasi harga terbaru tersedia melalui admin atau saluran WhatsApp resmi yang tercantum pada website.",
      ),
      order: 4,
      isEnabled: true,
    },
    {
      id: "faq-affiliation",
      question: "Apakah DLMURAH memiliki hubungan resmi dengan Growtopia?",
      answer: createRichTextDocument(disclaimer),
      order: 5,
      isEnabled: true,
    },
  ],
};
