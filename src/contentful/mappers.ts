import type { Document } from "@contentful/rich-text-types";

import type {
  ContentfulAsset,
  ContentfulCollection,
  ContentfulEntry,
  ContentfulLink,
} from "@/types/contentful";
import type {
  Announcement,
  FaqItem,
  Feature,
  HomePageContent,
  NavigationItem,
  ProcessStep,
  Service,
  SiteSettings,
  Statistic,
  WhatsAppAdmin,
  WhatsAppChannel,
} from "@/types/site";

type Fields = Record<string, unknown>;
type Fallbacks = {
  homepage: HomePageContent;
  siteSettings: SiteSettings;
};

function text(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function optionalText(value: unknown): string | undefined {
  const normalized = text(value);
  return normalized || undefined;
}

function boolean(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function order(value: unknown, fallback = 999): number {
  return typeof value === "number" && Number.isInteger(value) && value > 0
    ? value
    : fallback;
}

function linkId(value: unknown): string | undefined {
  const link = value as ContentfulLink | undefined;
  return link?.sys?.type === "Link" ? optionalText(link.sys.id) : undefined;
}

function isDocument(value: unknown): value is Document {
  const document = value as Document | undefined;
  return (
    document?.nodeType === "document" &&
    Array.isArray(document.content) &&
    typeof document.data === "object"
  );
}

function safeLink(value: unknown): string | undefined {
  const candidate = optionalText(value);

  if (!candidate) return undefined;
  if (candidate.startsWith("#")) return candidate;
  if (candidate.startsWith("/") && !candidate.startsWith("//")) {
    return candidate;
  }

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function createAssetMap(
  collection?: ContentfulCollection<Fields>,
): Map<string, ContentfulAsset> {
  return new Map(
    (collection?.includes?.Asset ?? []).map((asset) => [asset.sys.id, asset]),
  );
}

function resolveAssetUrl(
  value: unknown,
  assets: Map<string, ContentfulAsset>,
): string | undefined {
  const id = linkId(value);
  const url = id ? assets.get(id)?.fields.file?.url : undefined;

  if (!url) return undefined;
  const normalized = url.startsWith("//") ? `https:${url}` : url;
  return safeLink(normalized);
}

function byOrder<T extends { order: number }>(a: T, b: T): number {
  return a.order - b.order;
}

export function mapSiteSettings(
  entry: ContentfulEntry<Fields> | undefined,
  collection: ContentfulCollection<Fields>,
  fallback: Fallbacks["siteSettings"],
): SiteSettings {
  if (!entry) return fallback;
  const assets = createAssetMap(collection);
  const fields = entry.fields;

  return {
    id: entry.sys.id,
    siteName: text(fields.siteName, fallback.siteName),
    siteDescription: text(fields.siteDescription, fallback.siteDescription),
    logoUrl: resolveAssetUrl(fields.logo, assets),
    faviconUrl: resolveAssetUrl(fields.favicon, assets),
    defaultSeoTitle: text(fields.defaultSeoTitle, fallback.defaultSeoTitle),
    defaultSeoDescription: text(
      fields.defaultSeoDescription,
      fallback.defaultSeoDescription,
    ),
    siteUrl: safeLink(fields.siteUrl) ?? fallback.siteUrl,
    contactEmail: optionalText(fields.contactEmail),
    footerNavigationHeading: text(
      fields.footerNavigationHeading,
      fallback.footerNavigationHeading,
    ),
    footerAdminsHeading: text(
      fields.footerAdminsHeading,
      fallback.footerAdminsHeading,
    ),
    footerChannelsHeading: text(
      fields.footerChannelsHeading,
      fallback.footerChannelsHeading,
    ),
    footerPrivacyLabel: text(
      fields.footerPrivacyLabel,
      fallback.footerPrivacyLabel,
    ),
    footerTermsLabel: text(fields.footerTermsLabel, fallback.footerTermsLabel),
    footerInactiveSuffix: text(
      fields.footerInactiveSuffix,
      fallback.footerInactiveSuffix,
    ),
    footerDisclaimer: text(fields.footerDisclaimer, fallback.footerDisclaimer),
    copyrightText: text(fields.copyrightText, fallback.copyrightText),
  };
}

export function mapHomepage(
  entry: ContentfulEntry<Fields> | undefined,
  collection: ContentfulCollection<Fields>,
  fallback: Fallbacks["homepage"],
): HomePageContent {
  if (!entry) return fallback;
  const assets = createAssetMap(collection);
  const fields = entry.fields;

  return {
    id: entry.sys.id,
    eyebrow: text(fields.eyebrow, fallback.eyebrow),
    heroTitle: text(fields.heroTitle, fallback.heroTitle),
    heroDescription: text(fields.heroDescription, fallback.heroDescription),
    primaryCtaLabel: text(fields.primaryCtaLabel, fallback.primaryCtaLabel),
    primaryCtaTarget:
      safeLink(fields.primaryCtaTarget) ?? fallback.primaryCtaTarget,
    secondaryCtaLabel: text(
      fields.secondaryCtaLabel,
      fallback.secondaryCtaLabel,
    ),
    secondaryCtaTarget:
      safeLink(fields.secondaryCtaTarget) ?? fallback.secondaryCtaTarget,
    navigationCtaLabel: text(
      fields.navigationCtaLabel,
      fallback.navigationCtaLabel,
    ),
    navigationCtaCompactLabel: text(
      fields.navigationCtaCompactLabel,
      fallback.navigationCtaCompactLabel,
    ),
    heroImageUrl: resolveAssetUrl(fields.heroImage, assets),
    servicesEyebrow: text(fields.servicesEyebrow, fallback.servicesEyebrow),
    servicesHeading: text(fields.servicesHeading, fallback.servicesHeading),
    servicesDescription: text(
      fields.servicesDescription,
      fallback.servicesDescription,
    ),
    serviceCtaLabel: text(fields.serviceCtaLabel, fallback.serviceCtaLabel),
    adminsEyebrow: text(fields.adminsEyebrow, fallback.adminsEyebrow),
    adminsHeading: text(fields.adminsHeading, fallback.adminsHeading),
    adminsDescription: text(
      fields.adminsDescription,
      fallback.adminsDescription,
    ),
    adminsWarning: text(fields.adminsWarning, fallback.adminsWarning),
    adminCtaLabel: text(fields.adminCtaLabel, fallback.adminCtaLabel),
    inactiveContactLabel: text(
      fields.inactiveContactLabel,
      fallback.inactiveContactLabel,
    ),
    activeContactFallbackLabel: text(
      fields.activeContactFallbackLabel,
      fallback.activeContactFallbackLabel,
    ),
    inactiveContactFallbackLabel: text(
      fields.inactiveContactFallbackLabel,
      fallback.inactiveContactFallbackLabel,
    ),
    processEyebrow: text(fields.processEyebrow, fallback.processEyebrow),
    processDescription: text(
      fields.processDescription,
      fallback.processDescription,
    ),
    howItWorksHeading: text(
      fields.howItWorksHeading,
      fallback.howItWorksHeading,
    ),
    featuresEyebrow: text(fields.featuresEyebrow, fallback.featuresEyebrow),
    featuresHeading: text(fields.featuresHeading, fallback.featuresHeading),
    featuresDescription: text(
      fields.featuresDescription,
      fallback.featuresDescription,
    ),
    featuresVisualCaption: text(
      fields.featuresVisualCaption,
      fallback.featuresVisualCaption,
    ),
    channelsEyebrow: text(fields.channelsEyebrow, fallback.channelsEyebrow),
    channelsHeading: text(fields.channelsHeading, fallback.channelsHeading),
    channelsDescription: text(
      fields.channelsDescription,
      fallback.channelsDescription,
    ),
    channelCtaLabel: text(fields.channelCtaLabel, fallback.channelCtaLabel),
    inactiveChannelMessage: text(
      fields.inactiveChannelMessage,
      fallback.inactiveChannelMessage,
    ),
    inactiveChannelCtaLabel: text(
      fields.inactiveChannelCtaLabel,
      fallback.inactiveChannelCtaLabel,
    ),
    aboutEyebrow: text(fields.aboutEyebrow, fallback.aboutEyebrow),
    aboutHeading: text(fields.aboutHeading, fallback.aboutHeading),
    aboutContent: isDocument(fields.aboutContent)
      ? fields.aboutContent
      : fallback.aboutContent,
    aboutValuesHeading: text(
      fields.aboutValuesHeading,
      fallback.aboutValuesHeading,
    ),
    aboutValueOneLabel: text(
      fields.aboutValueOneLabel,
      fallback.aboutValueOneLabel,
    ),
    aboutValueTwoLabel: text(
      fields.aboutValueTwoLabel,
      fallback.aboutValueTwoLabel,
    ),
    aboutValueThreeLabel: text(
      fields.aboutValueThreeLabel,
      fallback.aboutValueThreeLabel,
    ),
    finalCtaEyebrow: text(fields.finalCtaEyebrow, fallback.finalCtaEyebrow),
    finalCtaTitle: text(fields.finalCtaTitle, fallback.finalCtaTitle),
    finalCtaDescription: text(
      fields.finalCtaDescription,
      fallback.finalCtaDescription,
    ),
    finalCtaPrimaryLabel: text(
      fields.finalCtaPrimaryLabel,
      fallback.finalCtaPrimaryLabel,
    ),
    finalCtaChannelLabel: text(
      fields.finalCtaChannelLabel,
      fallback.finalCtaChannelLabel,
    ),
    finalCtaFallbackChannelLabel: text(
      fields.finalCtaFallbackChannelLabel,
      fallback.finalCtaFallbackChannelLabel,
    ),
    faqEyebrow: text(fields.faqEyebrow, fallback.faqEyebrow),
    faqHeading: text(fields.faqHeading, fallback.faqHeading),
    faqDescription: text(fields.faqDescription, fallback.faqDescription),
    seoTitle: text(fields.seoTitle, fallback.seoTitle),
    seoDescription: text(fields.seoDescription, fallback.seoDescription),
  };
}

export function mapNavigation(
  entries: Array<ContentfulEntry<Fields>>,
): NavigationItem[] {
  return entries
    .map((entry) => ({
      id: entry.sys.id,
      label: text(entry.fields.label),
      href: safeLink(entry.fields.href) ?? "#beranda",
      order: order(entry.fields.order),
      isExternal: boolean(entry.fields.isExternal),
      isEnabled: boolean(entry.fields.isEnabled, true),
    }))
    .filter((item) => item.label && item.isEnabled)
    .sort(byOrder);
}

export function mapServices(
  entries: Array<ContentfulEntry<Fields>>,
): Service[] {
  return entries
    .map((entry) => ({
      id: entry.sys.id,
      title: text(entry.fields.title),
      slug: text(entry.fields.slug, entry.sys.id),
      shortDescription: text(entry.fields.shortDescription),
      iconKey: text(entry.fields.iconKey, "lock"),
      badge: optionalText(entry.fields.badge),
      whatsappAdminId: linkId(entry.fields.whatsappAdmin),
      whatsappPrefilledMessage: optionalText(
        entry.fields.whatsappPrefilledMessage,
      ),
      order: order(entry.fields.order),
      isEnabled: boolean(entry.fields.isEnabled, true),
    }))
    .filter((item) => item.title && item.shortDescription && item.isEnabled)
    .sort(byOrder);
}

export function mapAdmins(
  collection: ContentfulCollection<Fields>,
): WhatsAppAdmin[] {
  const assets = createAssetMap(collection);

  return collection.items
    .map((entry) => ({
      id: entry.sys.id,
      name: text(entry.fields.name),
      role: text(entry.fields.role),
      serviceCategory: text(entry.fields.serviceCategory),
      phoneNumber: text(entry.fields.phoneNumber),
      prefilledMessage: text(entry.fields.prefilledMessage),
      availabilityLabel: optionalText(entry.fields.availabilityLabel),
      responseTimeLabel: optionalText(entry.fields.responseTimeLabel),
      avatarUrl: resolveAssetUrl(entry.fields.avatar, assets),
      order: order(entry.fields.order),
      isActive: boolean(entry.fields.isActive),
    }))
    .filter((item) => item.name && item.role)
    .sort(byOrder);
}

export function mapChannels(
  entries: Array<ContentfulEntry<Fields>>,
): WhatsAppChannel[] {
  return entries
    .map((entry) => ({
      id: entry.sys.id,
      title: text(entry.fields.title),
      description: text(entry.fields.description),
      url: safeLink(entry.fields.url),
      iconKey: text(entry.fields.iconKey, "radio"),
      memberCountLabel: optionalText(entry.fields.memberCountLabel),
      order: order(entry.fields.order),
      isActive: boolean(entry.fields.isActive),
    }))
    .filter((item) => item.title && item.description)
    .sort(byOrder);
}

export function mapStatistics(
  entries: Array<ContentfulEntry<Fields>>,
): Statistic[] {
  return entries
    .map((entry) => ({
      id: entry.sys.id,
      value: text(entry.fields.value),
      label: text(entry.fields.label),
      description: optionalText(entry.fields.description),
      iconKey: text(entry.fields.iconKey, "spark"),
      order: order(entry.fields.order),
      isEnabled: boolean(entry.fields.isEnabled, true),
    }))
    .filter((item) => item.value && item.label && item.isEnabled)
    .sort(byOrder)
    .slice(0, 4);
}

export function mapProcessSteps(
  entries: Array<ContentfulEntry<Fields>>,
): ProcessStep[] {
  return entries
    .map((entry) => ({
      id: entry.sys.id,
      stepNumber: text(entry.fields.stepNumber),
      title: text(entry.fields.title),
      description: text(entry.fields.description),
      iconKey: text(entry.fields.iconKey, "circle"),
      order: order(entry.fields.order),
      isEnabled: boolean(entry.fields.isEnabled, true),
    }))
    .filter((item) => item.title && item.description && item.isEnabled)
    .sort(byOrder);
}

export function mapFeatures(
  entries: Array<ContentfulEntry<Fields>>,
): Feature[] {
  return entries
    .map((entry) => ({
      id: entry.sys.id,
      title: text(entry.fields.title),
      description: text(entry.fields.description),
      iconKey: text(entry.fields.iconKey, "shield"),
      order: order(entry.fields.order),
      isEnabled: boolean(entry.fields.isEnabled, true),
    }))
    .filter((item) => item.title && item.description && item.isEnabled)
    .sort(byOrder);
}

export function mapFaqs(entries: Array<ContentfulEntry<Fields>>): FaqItem[] {
  return entries
    .map((entry) => ({
      id: entry.sys.id,
      question: text(entry.fields.question),
      answer: isDocument(entry.fields.answer)
        ? entry.fields.answer
        : ({ nodeType: "document", data: {}, content: [] } as Document),
      order: order(entry.fields.order),
      isEnabled: boolean(entry.fields.isEnabled, true),
    }))
    .filter(
      (item) =>
        item.question && item.answer.content.length > 0 && item.isEnabled,
    )
    .sort(byOrder);
}

export function mapAnnouncement(
  entries: Array<ContentfulEntry<Fields>>,
  now = new Date(),
): Announcement | undefined {
  return entries
    .map((entry): Announcement => {
      const rawVariant = text(entry.fields.variant, "information");
      const variant = ["information", "warning", "promotion"].includes(
        rawVariant,
      )
        ? (rawVariant as Announcement["variant"])
        : "information";

      return {
        id: entry.sys.id,
        message: text(entry.fields.message),
        linkLabel: optionalText(entry.fields.linkLabel),
        linkUrl: safeLink(entry.fields.linkUrl),
        variant,
        isEnabled: boolean(entry.fields.isEnabled),
        startDate: optionalText(entry.fields.startDate),
        endDate: optionalText(entry.fields.endDate),
      };
    })
    .find((item) => {
      if (!item.isEnabled || !item.message) return false;
      const start = item.startDate ? new Date(item.startDate) : undefined;
      const end = item.endDate ? new Date(item.endDate) : undefined;
      return (!start || start <= now) && (!end || end >= now);
    });
}
