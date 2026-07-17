import { FALLBACK_HOME_PAGE_DATA } from "../../src/contentful/fallback";

export type SampleEntry = {
  contentType: string;
  id: string;
  fields: Record<string, unknown>;
};

function entryLink(id: string) {
  return {
    sys: {
      type: "Link",
      linkType: "Entry",
      id,
    },
  };
}

const { siteSettings, homepage } = FALLBACK_HOME_PAGE_DATA;

export const SAMPLE_ENTRIES: SampleEntry[] = [
  {
    contentType: "siteSettings",
    id: "site-settings",
    fields: {
      siteName: siteSettings.siteName,
      siteDescription: siteSettings.siteDescription,
      defaultSeoTitle: siteSettings.defaultSeoTitle,
      defaultSeoDescription: siteSettings.defaultSeoDescription,
      siteUrl: siteSettings.siteUrl,
      footerNavigationHeading: siteSettings.footerNavigationHeading,
      footerAdminsHeading: siteSettings.footerAdminsHeading,
      footerChannelsHeading: siteSettings.footerChannelsHeading,
      footerPrivacyLabel: siteSettings.footerPrivacyLabel,
      footerTermsLabel: siteSettings.footerTermsLabel,
      footerInactiveSuffix: siteSettings.footerInactiveSuffix,
      footerDisclaimer: siteSettings.footerDisclaimer,
      copyrightText: siteSettings.copyrightText,
    },
  },
  {
    contentType: "homepage",
    id: "homepage",
    fields: {
      eyebrow: homepage.eyebrow,
      heroTitle: homepage.heroTitle,
      heroDescription: homepage.heroDescription,
      primaryCtaLabel: homepage.primaryCtaLabel,
      primaryCtaTarget: homepage.primaryCtaTarget,
      secondaryCtaLabel: homepage.secondaryCtaLabel,
      secondaryCtaTarget: homepage.secondaryCtaTarget,
      navigationCtaLabel: homepage.navigationCtaLabel,
      navigationCtaCompactLabel: homepage.navigationCtaCompactLabel,
      servicesEyebrow: homepage.servicesEyebrow,
      servicesHeading: homepage.servicesHeading,
      servicesDescription: homepage.servicesDescription,
      serviceCtaLabel: homepage.serviceCtaLabel,
      adminsEyebrow: homepage.adminsEyebrow,
      adminsHeading: homepage.adminsHeading,
      adminsDescription: homepage.adminsDescription,
      adminsWarning: homepage.adminsWarning,
      adminCtaLabel: homepage.adminCtaLabel,
      inactiveContactLabel: homepage.inactiveContactLabel,
      activeContactFallbackLabel: homepage.activeContactFallbackLabel,
      inactiveContactFallbackLabel: homepage.inactiveContactFallbackLabel,
      processEyebrow: homepage.processEyebrow,
      processDescription: homepage.processDescription,
      howItWorksHeading: homepage.howItWorksHeading,
      featuresEyebrow: homepage.featuresEyebrow,
      featuresHeading: homepage.featuresHeading,
      featuresDescription: homepage.featuresDescription,
      featuresVisualCaption: homepage.featuresVisualCaption,
      channelsEyebrow: homepage.channelsEyebrow,
      channelsHeading: homepage.channelsHeading,
      channelsDescription: homepage.channelsDescription,
      channelCtaLabel: homepage.channelCtaLabel,
      inactiveChannelMessage: homepage.inactiveChannelMessage,
      inactiveChannelCtaLabel: homepage.inactiveChannelCtaLabel,
      aboutEyebrow: homepage.aboutEyebrow,
      aboutHeading: homepage.aboutHeading,
      aboutContent: homepage.aboutContent,
      aboutValuesHeading: homepage.aboutValuesHeading,
      aboutValueOneLabel: homepage.aboutValueOneLabel,
      aboutValueTwoLabel: homepage.aboutValueTwoLabel,
      aboutValueThreeLabel: homepage.aboutValueThreeLabel,
      finalCtaEyebrow: homepage.finalCtaEyebrow,
      finalCtaTitle: homepage.finalCtaTitle,
      finalCtaDescription: homepage.finalCtaDescription,
      finalCtaPrimaryLabel: homepage.finalCtaPrimaryLabel,
      finalCtaChannelLabel: homepage.finalCtaChannelLabel,
      finalCtaFallbackChannelLabel: homepage.finalCtaFallbackChannelLabel,
      faqEyebrow: homepage.faqEyebrow,
      faqHeading: homepage.faqHeading,
      faqDescription: homepage.faqDescription,
      seoTitle: homepage.seoTitle,
      seoDescription: homepage.seoDescription,
    },
  },
  ...FALLBACK_HOME_PAGE_DATA.navigation.map((item): SampleEntry => ({
    contentType: "navigationItem",
    id: item.id,
    fields: {
      label: item.label,
      href: item.href,
      order: item.order,
      isExternal: item.isExternal,
      isEnabled: item.isEnabled,
    },
  })),
  ...FALLBACK_HOME_PAGE_DATA.admins.map((admin): SampleEntry => ({
    contentType: "whatsappAdmin",
    id: admin.id,
    fields: {
      name: admin.name,
      role: admin.role,
      serviceCategory: admin.serviceCategory,
      phoneNumber: admin.phoneNumber || undefined,
      prefilledMessage: admin.prefilledMessage,
      availabilityLabel:
        admin.availabilityLabel ?? "Ganti nomor sebelum mengaktifkan",
      responseTimeLabel: admin.responseTimeLabel,
      order: admin.order,
      isActive: false,
    },
  })),
  ...FALLBACK_HOME_PAGE_DATA.services.map((service): SampleEntry => ({
    contentType: "service",
    id: service.id,
    fields: {
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription,
      iconKey: service.iconKey,
      badge: service.badge,
      whatsappAdmin: service.whatsappAdminId
        ? entryLink(service.whatsappAdminId)
        : undefined,
      whatsappPrefilledMessage: service.whatsappPrefilledMessage,
      order: service.order,
      isEnabled: service.isEnabled,
    },
  })),
  ...FALLBACK_HOME_PAGE_DATA.channels.map((channel): SampleEntry => ({
    contentType: "whatsappChannel",
    id: channel.id,
    fields: {
      title: channel.title,
      description: channel.description,
      url: channel.url,
      iconKey: channel.iconKey,
      memberCountLabel: channel.memberCountLabel,
      order: channel.order,
      isActive: false,
    },
  })),
  ...FALLBACK_HOME_PAGE_DATA.statistics.map((statistic): SampleEntry => ({
    contentType: "statistic",
    id: statistic.id,
    fields: {
      value: statistic.value,
      label: statistic.label,
      description: statistic.description,
      iconKey: statistic.iconKey,
      order: statistic.order,
      isEnabled: statistic.isEnabled,
    },
  })),
  ...FALLBACK_HOME_PAGE_DATA.processSteps.map((step): SampleEntry => ({
    contentType: "processStep",
    id: step.id,
    fields: {
      stepNumber: step.stepNumber,
      title: step.title,
      description: step.description,
      iconKey: step.iconKey,
      order: step.order,
      isEnabled: step.isEnabled,
    },
  })),
  ...FALLBACK_HOME_PAGE_DATA.features.map((feature): SampleEntry => ({
    contentType: "feature",
    id: feature.id,
    fields: {
      title: feature.title,
      description: feature.description,
      iconKey: feature.iconKey,
      order: feature.order,
      isEnabled: feature.isEnabled,
    },
  })),
  ...FALLBACK_HOME_PAGE_DATA.faqs.map((faq): SampleEntry => ({
    contentType: "faq",
    id: faq.id,
    fields: {
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
      isEnabled: faq.isEnabled,
    },
  })),
  {
    contentType: "announcement",
    id: "announcement-daily-update",
    fields: {
      message:
        "Harga DL/BGL diperbarui melalui saluran WhatsApp resmi DLMURAH.",
      linkLabel: "Buka saluran",
      linkUrl: "#saluran",
      variant: "information",
      isEnabled: false,
    },
  },
];
