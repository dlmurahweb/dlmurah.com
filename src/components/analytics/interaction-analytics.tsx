"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

import {
  createAnalyticsProperties,
  isAllowedAnalyticsEvent,
} from "@/lib/analytics";

export function InteractionAnalytics() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const element = target.closest<HTMLElement>("[data-analytics-event]");
      const eventName = element?.dataset.analyticsEvent;
      if (!element || !eventName) return;
      if (!isAllowedAnalyticsEvent(eventName)) return;

      const properties = createAnalyticsProperties(element.dataset);

      track(eventName, properties);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
