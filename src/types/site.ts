import type { Document } from "@contentful/rich-text-types";

export type ContentSource = "contentful" | "fallback";

export type SiteSettings = {
  id: string;
  siteName: string;
  siteDescription: string;
  logoUrl?: string;
  faviconUrl?: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  siteUrl: string;
  contactEmail?: string;
  footerDisclaimer: string;
  copyrightText: string;
};

export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  order: number;
  isExternal: boolean;
  isEnabled: boolean;
};

export type HomePageContent = {
  id: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  primaryCtaLabel: string;
  primaryCtaTarget: string;
  secondaryCtaLabel: string;
  secondaryCtaTarget: string;
  heroImageUrl?: string;
  servicesHeading: string;
  servicesDescription: string;
  howItWorksHeading: string;
  aboutHeading: string;
  aboutContent: Document;
  finalCtaTitle: string;
  finalCtaDescription: string;
  seoTitle: string;
  seoDescription: string;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  iconKey: string;
  badge?: string;
  whatsappAdminId?: string;
  whatsappPrefilledMessage?: string;
  order: number;
  isEnabled: boolean;
};

export type WhatsAppAdmin = {
  id: string;
  name: string;
  role: string;
  serviceCategory: string;
  phoneNumber: string;
  prefilledMessage: string;
  availabilityLabel?: string;
  responseTimeLabel?: string;
  avatarUrl?: string;
  order: number;
  isActive: boolean;
};

export type WhatsAppChannel = {
  id: string;
  title: string;
  description: string;
  url?: string;
  iconKey: string;
  memberCountLabel?: string;
  order: number;
  isActive: boolean;
};

export type Statistic = {
  id: string;
  value: string;
  label: string;
  description?: string;
  iconKey: string;
  order: number;
  isEnabled: boolean;
};

export type ProcessStep = {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  iconKey: string;
  order: number;
  isEnabled: boolean;
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  iconKey: string;
  order: number;
  isEnabled: boolean;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: Document;
  order: number;
  isEnabled: boolean;
};

export type Announcement = {
  id: string;
  message: string;
  linkLabel?: string;
  linkUrl?: string;
  variant: "information" | "warning" | "promotion";
  isEnabled: boolean;
  startDate?: string;
  endDate?: string;
};

export type HomePageData = {
  source: ContentSource;
  preview: boolean;
  siteSettings: SiteSettings;
  navigation: NavigationItem[];
  homepage: HomePageContent;
  services: Service[];
  admins: WhatsAppAdmin[];
  channels: WhatsAppChannel[];
  statistics: Statistic[];
  processSteps: ProcessStep[];
  features: Feature[];
  faqs: FaqItem[];
  announcement?: Announcement;
};
