import type { Metadata } from "next";
import { draftMode } from "next/headers";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { StructuredData } from "@/components/seo/structured-data";
import { AboutSection } from "@/components/sections/about-section";
import { AdminsSection } from "@/components/sections/admins-section";
import { ChannelsSection } from "@/components/sections/channels-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { StatisticsSection } from "@/components/sections/statistics-section";
import { getHomePageData } from "@/contentful/queries";
import { env } from "@/lib/env";
import { richTextToPlainText } from "@/lib/rich-text";
import { createAdminWhatsAppLink, normalizePhoneNumber } from "@/lib/whatsapp";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: preview } = await draftMode();
  const { homepage, siteSettings } = await getHomePageData({ preview });
  const title = homepage.seoTitle || siteSettings.defaultSeoTitle;
  const description =
    homepage.seoDescription || siteSettings.defaultSeoDescription;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: "/",
      siteName: siteSettings.siteName,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Home() {
  const { isEnabled: preview } = await draftMode();
  const data = await getHomePageData({ preview });
  const primaryAdmin = data.admins.find((admin) => admin.isActive);
  const primaryWhatsAppHref = createAdminWhatsAppLink(primaryAdmin);
  const primaryChannel = data.channels.find((channel) => channel.isActive);
  const siteUrl = (
    data.siteSettings.siteUrl.startsWith("https://")
      ? data.siteSettings.siteUrl
      : env.NEXT_PUBLIC_SITE_URL
  ).replace(/\/$/, "");
  const activeContacts = data.admins.flatMap((admin) => {
    const phoneNumber = normalizePhoneNumber(admin.phoneNumber);
    if (!admin.isActive || !/^\d{8,15}$/.test(phoneNumber)) return [];

    return [
      {
        "@type": "ContactPoint",
        telephone: `+${phoneNumber}`,
        contactType: admin.role,
        availableLanguage: ["id"],
      },
    ];
  });
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: data.siteSettings.siteName,
        url: siteUrl,
        logo: `${siteUrl}/brand/lock-mark.png`,
        description: data.siteSettings.siteDescription,
        ...(activeContacts.length ? { contactPoint: activeContacts } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: data.siteSettings.siteName,
        url: siteUrl,
        description: data.homepage.seoDescription,
        inLanguage: "id-ID",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      ...(data.faqs.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${siteUrl}/#faq`,
              mainEntity: data.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: richTextToPlainText(faq.answer),
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <StructuredData data={structuredData} />
      {data.preview ? (
        <div className="fixed right-4 bottom-4 z-[80] border border-warning/40 bg-background-secondary px-4 py-3 text-xs font-bold text-warning shadow-2xl">
          Preview Contentful aktif ·{" "}
          <a href="/api/preview/disable" className="underline">
            keluar
          </a>
        </div>
      ) : null}
      <AnnouncementBar announcement={data.announcement} />
      <Header navigation={data.navigation} whatsappHref={primaryWhatsAppHref} />
      <main id="main-content" className="site-shell">
        <HeroSection
          homepage={data.homepage}
          features={data.features}
          primaryAdmin={primaryAdmin}
        />
        <StatisticsSection statistics={data.statistics} />
        <ServicesSection
          homepage={data.homepage}
          services={data.services}
          admins={data.admins}
        />
        <AdminsSection admins={data.admins} />
        <ProcessSection
          heading={data.homepage.howItWorksHeading}
          steps={data.processSteps}
        />
        <FeaturesSection features={data.features} />
        <ChannelsSection channels={data.channels} />
        <AboutSection homepage={data.homepage} />
        <FaqSection faqs={data.faqs} />
        <FinalCtaSection
          homepage={data.homepage}
          primaryAdmin={primaryAdmin}
          channel={primaryChannel}
        />
      </main>
      <Footer
        settings={data.siteSettings}
        navigation={data.navigation}
        admins={data.admins}
        channels={data.channels}
      />
    </>
  );
}
