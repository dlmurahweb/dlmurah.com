import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DLMURAH",
    short_name: "DLMURAH",
    description:
      "Pusat informasi layanan DLMURAH dan jalur resmi untuk menghubungi admin melalui WhatsApp.",
    start_url: "/",
    display: "standalone",
    background_color: "#050b35",
    theme_color: "#050b35",
    lang: "id",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
