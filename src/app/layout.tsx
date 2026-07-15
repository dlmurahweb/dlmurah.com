import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { InteractionAnalytics } from "@/components/analytics/interaction-analytics";
import { SITE_DEFAULTS } from "@/lib/constants";
import { env } from "@/lib/env";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: SITE_DEFAULTS.title,
    template: `%s | ${SITE_DEFAULTS.name}`,
  },
  description: SITE_DEFAULTS.description,
  applicationName: SITE_DEFAULTS.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE_DEFAULTS.locale,
    url: "/",
    siteName: SITE_DEFAULTS.name,
    title: SITE_DEFAULTS.title,
    description: SITE_DEFAULTS.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_DEFAULTS.title,
    description: SITE_DEFAULTS.description,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  initialScale: 1,
  themeColor: "#050b35",
  viewportFit: "cover",
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isVercelRuntime = process.env.VERCEL === "1";

  return (
    <html lang="id" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Lewati ke konten utama
        </a>
        {children}
        {isVercelRuntime ? (
          <>
            <InteractionAnalytics />
            <Analytics />
          </>
        ) : null}
      </body>
    </html>
  );
}
