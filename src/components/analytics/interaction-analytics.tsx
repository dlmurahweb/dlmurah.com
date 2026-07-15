"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

const ALLOWED_PROPERTIES = [
  "source",
  "label",
  "admin",
  "service",
  "channel",
] as const;

export function InteractionAnalytics() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const element = target.closest<HTMLElement>("[data-analytics-event]");
      const eventName = element?.dataset.analyticsEvent;
      if (!element || !eventName) return;

      const properties = Object.fromEntries(
        ALLOWED_PROPERTIES.flatMap((property) => {
          const value = element.dataset[property];
          return value ? [[property, value.slice(0, 120)]] : [];
        }),
      );

      track(eventName, properties);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
