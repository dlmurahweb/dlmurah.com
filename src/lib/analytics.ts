export const ALLOWED_ANALYTICS_EVENTS = [
  "hero_cta_click",
  "whatsapp_click",
  "navigation_click",
  "channel_click",
  "faq_interaction",
  "final_cta_click",
] as const;

export const ALLOWED_ANALYTICS_PROPERTIES = [
  "source",
  "label",
  "admin",
  "service",
  "channel",
] as const;

type AnalyticsEventName = (typeof ALLOWED_ANALYTICS_EVENTS)[number];
type AnalyticsProperty = (typeof ALLOWED_ANALYTICS_PROPERTIES)[number];
type AnalyticsDataset = Partial<Record<AnalyticsProperty, string>>;

export function isAllowedAnalyticsEvent(
  eventName: string,
): eventName is AnalyticsEventName {
  return ALLOWED_ANALYTICS_EVENTS.includes(eventName as AnalyticsEventName);
}

export function createAnalyticsProperties(
  dataset: AnalyticsDataset,
): Record<string, string> {
  return Object.fromEntries(
    ALLOWED_ANALYTICS_PROPERTIES.flatMap((property) => {
      const value = dataset[property];
      return value ? [[property, value.slice(0, 120)]] : [];
    }),
  );
}
