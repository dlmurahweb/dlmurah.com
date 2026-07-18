import assert from "node:assert/strict";
import test from "node:test";

import {
  mapAnnouncement,
  mapChannels,
  mapHomepage,
  mapNavigation,
  mapProcessSteps,
  mapServices,
  mapSiteSettings,
} from "../../src/contentful/mappers";
import { FALLBACK_HOME_PAGE_DATA } from "../../src/contentful/fallback";
import type {
  ContentfulCollection,
  ContentfulEntry,
} from "../../src/types/contentful";

type Fields = Record<string, unknown>;

function entry(id: string, fields: Fields): ContentfulEntry<Fields> {
  return {
    sys: {
      id,
      type: "Entry",
    },
    fields,
  };
}

function collection(
  items: Array<ContentfulEntry<Fields>> = [],
): ContentfulCollection<Fields> {
  return {
    total: items.length,
    skip: 0,
    limit: items.length,
    items,
  };
}

test("navigation mapper only keeps safe CMS links", () => {
  const items = mapNavigation([
    entry("anchor", {
      label: "Anchor",
      href: "#kontak",
      order: 1,
      isEnabled: true,
    }),
    entry("path", {
      label: "Path",
      href: "/kebijakan-privasi",
      order: 2,
      isEnabled: true,
    }),
    entry("https", {
      label: "HTTPS",
      href: "https://www.dlmurah.com/saluran",
      order: 3,
      isExternal: true,
      isEnabled: true,
    }),
    entry("http", {
      label: "HTTP",
      href: "http://example.com",
      order: 4,
      isExternal: true,
      isEnabled: true,
    }),
    entry("protocol-relative", {
      label: "Protocol relative",
      href: "//example.com",
      order: 5,
      isExternal: true,
      isEnabled: true,
    }),
    entry("script", {
      label: "Script",
      href: "javascript:alert(1)",
      order: 6,
      isExternal: true,
      isEnabled: true,
    }),
  ]);

  assert.deepEqual(
    items.map((item) => [item.id, item.href]),
    [
      ["anchor", "#kontak"],
      ["path", "/kebijakan-privasi"],
      ["https", "https://www.dlmurah.com/saluran"],
      ["http", "#beranda"],
      ["protocol-relative", "#beranda"],
      ["script", "#beranda"],
    ],
  );
});

test("channel and announcement mappers discard unsafe external URLs", () => {
  const channels = mapChannels([
    entry("channel-http", {
      title: "Channel HTTP",
      description: "Unsafe URL",
      url: "http://example.com/channel",
      iconKey: "radio",
      order: 1,
      isActive: true,
    }),
    entry("channel-https", {
      title: "Channel HTTPS",
      description: "Safe URL",
      url: "https://www.dlmurah.com/channel",
      iconKey: "radio",
      order: 2,
      isActive: true,
    }),
  ]);

  assert.equal(channels[0]?.url, undefined);
  assert.equal(channels[1]?.url, "https://www.dlmurah.com/channel");

  const announcement = mapAnnouncement([
    entry("announcement", {
      message: "Update harga",
      linkLabel: "Baca",
      linkUrl: "javascript:alert(1)",
      variant: "information",
      isEnabled: true,
    }),
  ]);

  assert.equal(announcement?.linkUrl, undefined);
});

test("service mapper omits the retired transaction assistance service", () => {
  const services = mapServices([
    entry("buy-dl", {
      title: "Beli DL/BGL",
      slug: "beli-dl-bgl",
      shortDescription: "Beli DL atau BGL melalui admin.",
      order: 1,
      isEnabled: true,
    }),
    entry("transaction-help", {
      title: "Bantuan Transaksi",
      slug: "bantuan-transaksi",
      shortDescription: "Minta bantuan transaksi melalui admin.",
      order: 2,
      isEnabled: true,
    }),
  ]);

  assert.deepEqual(
    services.map((service) => service.slug),
    ["beli-dl-bgl"],
  );
});

test("process mapper removes retired transaction assistance copy", () => {
  const steps = mapProcessSteps([
    entry("step-choose-service", {
      stepNumber: "01",
      title: "Pilih layanan",
      description:
        "Tentukan apakah kamu ingin membeli atau menjual DL/BGL, akun, atau membutuhkan bantuan transaksi.",
      order: 1,
      isEnabled: true,
    }),
  ]);

  assert.equal(
    steps[0]?.description,
    "Tentukan apakah kamu ingin membeli atau menjual DL/BGL maupun akun.",
  );
});

test("singleton mappers fall back when CMS URL fields are unsafe", () => {
  const siteSettings = mapSiteSettings(
    entry("settings", {
      siteName: "DLMURAH",
      siteDescription: "Pusat informasi",
      siteUrl: "http://example.com",
      defaultSeoTitle: "Title",
      defaultSeoDescription: "Description",
      footerDisclaimer: "Disclaimer",
      copyrightText: "Copyright",
    }),
    collection(),
    FALLBACK_HOME_PAGE_DATA.siteSettings,
  );

  assert.equal(
    siteSettings.siteUrl,
    FALLBACK_HOME_PAGE_DATA.siteSettings.siteUrl,
  );

  const homepage = mapHomepage(
    entry("homepage", {
      ...FALLBACK_HOME_PAGE_DATA.homepage,
      primaryCtaTarget: "javascript:alert(1)",
      secondaryCtaTarget: "//example.com/path",
    }),
    collection(),
    FALLBACK_HOME_PAGE_DATA.homepage,
  );

  assert.equal(
    homepage.primaryCtaTarget,
    FALLBACK_HOME_PAGE_DATA.homepage.primaryCtaTarget,
  );
  assert.equal(
    homepage.secondaryCtaTarget,
    FALLBACK_HOME_PAGE_DATA.homepage.secondaryCtaTarget,
  );
});
