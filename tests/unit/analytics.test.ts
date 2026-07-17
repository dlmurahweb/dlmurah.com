import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import {
  ALLOWED_ANALYTICS_EVENTS,
  ALLOWED_ANALYTICS_PROPERTIES,
  createAnalyticsProperties,
  isAllowedAnalyticsEvent,
} from "../../src/lib/analytics";

const sourceRoots = ["src/components", "src/app"].map((root) =>
  join(process.cwd(), root),
);

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    const stat = statSync(path);

    if (stat.isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(name) ? [path] : [];
  });
}

test("analytics event names are explicitly whitelisted", () => {
  assert.equal(isAllowedAnalyticsEvent("navigation_click"), true);
  assert.equal(isAllowedAnalyticsEvent("prefilled_message_seen"), false);
});

test("analytics properties are whitelisted and length-limited", () => {
  assert.deepEqual(
    createAnalyticsProperties({
      source: "hero",
      label: "x".repeat(140),
      admin: "Admin",
      service: "service",
      channel: "channel",
      phoneNumber: "6281234567890",
      prefilledMessage: "Halo Admin",
    } as Parameters<typeof createAnalyticsProperties>[0]),
    {
      source: "hero",
      label: "x".repeat(120),
      admin: "Admin",
      service: "service",
      channel: "channel",
    },
  );
});

test("source analytics attributes stay within the privacy contract", () => {
  const allowedEvents = new Set<string>(ALLOWED_ANALYTICS_EVENTS);
  const allowedProperties = new Set<string>([
    "analytics-event",
    ...ALLOWED_ANALYTICS_PROPERTIES.map((property) =>
      property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`),
    ),
  ]);
  const forbiddenProperties = new Set([
    "phone",
    "phone-number",
    "prefilled-message",
    "message",
    "url",
    "href",
    "transaction",
  ]);

  for (const file of sourceRoots.flatMap(sourceFiles)) {
    const source = readFileSync(file, "utf8");

    for (const [, eventName] of source.matchAll(
      /data-analytics-event=["']([^"']+)["']/g,
    )) {
      assert.ok(
        allowedEvents.has(eventName),
        `${file} uses non-whitelisted analytics event ${eventName}`,
      );
    }

    for (const [, property] of source.matchAll(/\sdata-([a-z-]+)=/g)) {
      if (property === "source") continue;
      if (
        !property.startsWith("analytics") &&
        !allowedProperties.has(property)
      ) {
        assert.ok(
          !forbiddenProperties.has(property),
          `${file} exposes forbidden analytics-style data property ${property}`,
        );
      }
    }
  }
});
