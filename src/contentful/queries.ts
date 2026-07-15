import "server-only";

import { fetchContentfulCollection, isContentfulConfigured } from "./client";
import { FALLBACK_HOME_PAGE_DATA } from "./fallback";
import {
  mapAdmins,
  mapAnnouncement,
  mapChannels,
  mapFaqs,
  mapFeatures,
  mapHomepage,
  mapNavigation,
  mapProcessSteps,
  mapServices,
  mapSiteSettings,
  mapStatistics,
} from "./mappers";

import type { HomePageData } from "@/types/site";

type Fields = Record<string, unknown>;

function fallback(preview: boolean): HomePageData {
  return {
    ...FALLBACK_HOME_PAGE_DATA,
    preview,
  };
}

export async function getHomePageData({
  preview = false,
}: {
  preview?: boolean;
} = {}): Promise<HomePageData> {
  if (!isContentfulConfigured(preview)) {
    return fallback(preview);
  }

  try {
    const [
      settingsCollection,
      navigationCollection,
      homepageCollection,
      servicesCollection,
      adminsCollection,
      channelsCollection,
      statisticsCollection,
      processCollection,
      featuresCollection,
      faqCollection,
      announcementCollection,
    ] = await Promise.all([
      fetchContentfulCollection<Fields>("siteSettings", {
        preview,
        query: { limit: 1 },
      }),
      fetchContentfulCollection<Fields>("navigationItem", { preview }),
      fetchContentfulCollection<Fields>("homepage", {
        preview,
        query: { limit: 1 },
      }),
      fetchContentfulCollection<Fields>("service", { preview }),
      fetchContentfulCollection<Fields>("whatsappAdmin", { preview }),
      fetchContentfulCollection<Fields>("whatsappChannel", { preview }),
      fetchContentfulCollection<Fields>("statistic", { preview }),
      fetchContentfulCollection<Fields>("processStep", { preview }),
      fetchContentfulCollection<Fields>("feature", { preview }),
      fetchContentfulCollection<Fields>("faq", { preview }),
      fetchContentfulCollection<Fields>("announcement", { preview }),
    ]);

    const navigation = mapNavigation(navigationCollection.items);
    const services = mapServices(servicesCollection.items);
    const admins = mapAdmins(adminsCollection);
    const channels = mapChannels(channelsCollection.items);
    const statistics = mapStatistics(statisticsCollection.items);
    const processSteps = mapProcessSteps(processCollection.items);
    const features = mapFeatures(featuresCollection.items);
    const faqs = mapFaqs(faqCollection.items);

    return {
      source: "contentful",
      preview,
      siteSettings: mapSiteSettings(
        settingsCollection.items[0],
        settingsCollection,
        FALLBACK_HOME_PAGE_DATA.siteSettings,
      ),
      navigation: navigation.length
        ? navigation
        : FALLBACK_HOME_PAGE_DATA.navigation,
      homepage: mapHomepage(
        homepageCollection.items[0],
        homepageCollection,
        FALLBACK_HOME_PAGE_DATA.homepage,
      ),
      services: services.length ? services : FALLBACK_HOME_PAGE_DATA.services,
      admins: admins.length ? admins : FALLBACK_HOME_PAGE_DATA.admins,
      channels: channels.length ? channels : FALLBACK_HOME_PAGE_DATA.channels,
      statistics: statistics.length
        ? statistics
        : FALLBACK_HOME_PAGE_DATA.statistics,
      processSteps: processSteps.length
        ? processSteps
        : FALLBACK_HOME_PAGE_DATA.processSteps,
      features: features.length ? features : FALLBACK_HOME_PAGE_DATA.features,
      faqs: faqs.length ? faqs : FALLBACK_HOME_PAGE_DATA.faqs,
      announcement: mapAnnouncement(announcementCollection.items),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[contentful] Menggunakan fallback: ${message}`);
    return fallback(preview);
  }
}
