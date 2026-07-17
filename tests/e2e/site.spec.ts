import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  PRIVACY_POLICY_METADATA,
  TERMS_POLICY_METADATA,
} from "../../src/lib/policies";

const viewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
] as const;

test("homepage has valid landmarks and no serious accessibility violations", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.locator("main#main-content")).toHaveCount(1);
  await expect(page.getByRole("navigation")).not.toHaveCount(0);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});

for (const viewport of viewports) {
  test(`homepage does not overflow at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
}

test("mobile interactive controls meet the 44px touch-target requirement", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const undersized = await page
    .locator("a[href], button:not([disabled])")
    .evaluateAll((elements) =>
      elements
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        })
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width < 44 || rect.height < 44;
        })
        .map((element) => element.textContent?.trim() || element.tagName),
    );

  expect(undersized).toEqual([]);
});

test("mobile navigation opens, exposes the primary action, and closes with Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const trigger = page.getByRole("button", { name: "Buka menu navigasi" });

  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Pilih Admin")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("compact navigation uses the simplified brand mark", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("header img").first()).toHaveAttribute(
    "src",
    /lock-mark/,
  );
});

test("generic CTAs route to admin selection instead of opening WhatsApp", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.locator("[data-source='header_cta'][data-label='Pilih Admin']"),
  ).toHaveAttribute("href", "#pilih-admin");
  await expect(
    page.locator("[data-source='hero'][data-label='Mulai Transaksi']"),
  ).toHaveAttribute("href", "#pilih-admin");
  await expect(
    page.locator("[data-source='final_cta'][data-label='Pilih Admin']"),
  ).toHaveAttribute("href", "#pilih-admin");
});

for (const width of [1023, 1024, 1279, 1280]) {
  test(`header exposes a conversion path at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 768 });
    await page.goto("/");

    if (width < 1024) {
      await expect(
        page.getByRole("button", { name: "Buka menu navigasi" }),
      ).toBeVisible();
      return;
    }

    const headerCta = page.locator(
      "[data-source='header_cta'][data-label='Pilih Admin']",
    );
    await expect(headerCta).toBeVisible();
    await expect(headerCta).toHaveAttribute("href", "#pilih-admin");
  });
}

test("FAQ is operable from the keyboard", async ({ page }) => {
  await page.goto("/#faq");
  await page.waitForLoadState("networkidle");
  const trigger = page
    .locator("[data-analytics-event='faq_interaction']")
    .first();

  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
});

test("FAQ accordion reveal does not animate height", async ({ page }) => {
  await page.goto("/#faq");
  const trigger = page
    .locator("[data-analytics-event='faq_interaction']")
    .first();
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");

  const transition = await page
    .locator("[data-slot='accordion-content']")
    .first()
    .evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        display: style.display,
        gridTemplateRows: style.gridTemplateRows,
        transitionProperty: style.transitionProperty,
      };
    });

  expect(transition.display).toBe("grid");
  expect(transition.transitionProperty).toContain("grid-template-rows");
  expect(transition.transitionProperty).not.toContain("height");
});

test("external links use safe relationship attributes", async ({ page }) => {
  await page.goto("/");
  const unsafeLinks = await page.locator("a[target='_blank']").evaluateAll(
    (links) =>
      links.filter((link) => {
        const rel = link.getAttribute("rel")?.split(/\s+/) ?? [];
        return !rel.includes("noopener") || !rel.includes("noreferrer");
      }).length,
  );

  expect(unsafeLinks).toBe(0);
});

test("internal anchor links resolve to existing sections", async ({ page }) => {
  await page.goto("/");
  const hrefs = await page
    .locator("a[href^='#']")
    .evaluateAll((links) => [
      ...new Set(links.map((link) => link.getAttribute("href") ?? "")),
    ]);
  const headerHeight = await page
    .locator("header")
    .evaluate((header) => header.getBoundingClientRect().height);

  for (const href of hrefs) {
    expect(href).toMatch(/^#[A-Za-z][\w-]*$/);
    const target = page.locator(href);
    await expect(target).toHaveCount(1);

    const scrollMarginTop = await target.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).scrollMarginTop),
    );
    expect(scrollMarginTop).toBeGreaterThanOrEqual(headerHeight);
  }
});

test("process and feature sections use semantic ordered lists", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator("#cara-kerja ol > li")).toHaveCount(4);
  await expect(
    page
      .getByRole("heading", { name: "Kenapa Memilih DLMURAH?" })
      .locator("xpath=ancestor::section[1]//ol/li"),
  ).not.toHaveCount(0);
});

test("WhatsApp links are normalized when present", async ({ page }) => {
  await page.goto("/");
  const hrefs = await page
    .locator("a[href^='https://wa.me/']")
    .evaluateAll((links) =>
      links.map((link) => link.getAttribute("href") ?? ""),
    );

  for (const href of hrefs) {
    expect(href).toMatch(/^https:\/\/wa\.me\/\d{8,15}(?:\?text=.+)?$/);
    expect(href).not.toContain("620000000000");
  }
});

test("policy routes and custom not-found page are available", async ({
  page,
}) => {
  await page.goto("/kebijakan-privasi");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    PRIVACY_POLICY_METADATA.title,
  );
  await expect(
    page.getByText(PRIVACY_POLICY_METADATA.description),
  ).toBeVisible();
  await expect(
    page.getByText(
      `Terakhir diperbarui: ${PRIVACY_POLICY_METADATA.lastUpdated}`,
    ),
  ).toBeVisible();
  await expect(page.locator("link[rel='canonical']")).toHaveAttribute(
    "href",
    new RegExp(`${PRIVACY_POLICY_METADATA.canonicalPath}$`),
  );

  await page.goto("/syarat-layanan");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    TERMS_POLICY_METADATA.title,
  );
  await expect(page.getByText(TERMS_POLICY_METADATA.description)).toBeVisible();
  await expect(
    page.getByText(`Terakhir diperbarui: ${TERMS_POLICY_METADATA.lastUpdated}`),
  ).toBeVisible();
  await expect(page.locator("link[rel='canonical']")).toHaveAttribute(
    "href",
    new RegExp(`${TERMS_POLICY_METADATA.canonicalPath}$`),
  );

  const response = await page.goto("/halaman-yang-tidak-ada");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Halaman tidak ditemukan",
  );
});

test("policy body keeps a readable desktop measure", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/kebijakan-privasi");

  const measure = await page.locator("article.policy-copy").evaluate((node) => {
    const probe = document.createElement("span");
    probe.textContent = "0";
    probe.style.visibility = "hidden";
    probe.style.position = "absolute";
    probe.style.font = getComputedStyle(node).font;
    node.append(probe);
    const ch = probe.getBoundingClientRect().width;
    probe.remove();

    return {
      width: node.getBoundingClientRect().width,
      ch,
    };
  });

  const approximateCharactersPerLine = measure.width / measure.ch;
  expect(approximateCharactersPerLine).toBeGreaterThanOrEqual(60);
  expect(approximateCharactersPerLine).toBeLessThanOrEqual(70);
});

test("inactive channels provide an admin-selection fallback action", async ({
  page,
}) => {
  await page.goto("/#saluran");

  const fallbackLinks = page.locator(
    "[data-source='channel_card_inactive'][href='#pilih-admin']",
  );

  await expect(fallbackLinks).not.toHaveCount(0);

  const disabledChannelButtons = await page
    .locator("#saluran button:disabled")
    .count();
  expect(disabledChannelButtons).toBe(0);
});

test("metadata, structured data, images, and security headers are valid", async ({
  page,
}) => {
  const response = await page.goto("/");
  const html = await page.content();
  expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response?.headers()["x-frame-options"]).toBe("DENY");
  expect(response?.headers()["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
  expect(html).not.toContain("620000000000");

  await expect(page.locator("link[rel='canonical']")).toHaveAttribute(
    "href",
    /^https?:\/\//,
  );
  const structuredDataScript = page.locator(
    "script[type='application/ld+json']",
  );
  await expect(structuredDataScript).toHaveCount(1);
  const structuredDataText = await structuredDataScript.textContent();
  expect(structuredDataText).not.toContain("620000000000");

  const structuredData = JSON.parse(structuredDataText ?? "{}") as {
    "@graph"?: Array<{
      contactPoint?: Array<{ telephone?: string }>;
    }>;
  };
  const contactPhones =
    structuredData["@graph"]?.flatMap((node) =>
      (node.contactPoint ?? []).map((contact) => contact.telephone ?? ""),
    ) ?? [];

  for (const phone of contactPhones) {
    expect(phone).toMatch(/^\+\d{8,15}$/);
    expect(phone).not.toBe("+620000000000");
  }

  const brokenImages = await page.locator("img").evaluateAll(
    (images) =>
      images.filter((image) => {
        const img = image as HTMLImageElement;
        return !img.complete || img.naturalWidth === 0;
      }).length,
  );
  expect(brokenImages).toBe(0);
});

test("homepage has no browser console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(errors).toEqual([]);
});

test("reduced-motion preference removes ambient animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const styles = await page
    .locator("[aria-hidden='true'] span")
    .evaluateAll((spans) =>
      spans.map((span) => {
        const style = getComputedStyle(span);
        return {
          animationDuration: style.animationDuration,
          transitionDuration: style.transitionDuration,
        };
      }),
    );

  for (const style of styles) {
    expect(["0s", "0.01ms", "1e-05s"]).toContain(style.animationDuration);
    expect(["0s", "0.01ms", "1e-05s"]).toContain(style.transitionDuration);
  }
});

test("protected content endpoints fail closed without valid secrets", async ({
  request,
}) => {
  const preview = await request.get("/api/preview");
  expect([401, 503]).toContain(preview.status());

  const revalidate = await request.post("/api/revalidate");
  expect([401, 503]).toContain(revalidate.status());
});

test("local revalidation webhook reports invalidated cache targets", async ({
  request,
}) => {
  test.skip(
    Boolean(process.env.PLAYWRIGHT_BASE_URL),
    "Valid webhook secret is only configured for the local Playwright server.",
  );

  const response = await request.post("/api/revalidate", {
    headers: {
      Authorization: "Bearer e2e-revalidate-secret",
    },
  });
  expect(response.status()).toBe(200);

  const body = (await response.json()) as {
    revalidated?: boolean;
    tag?: string;
    paths?: string[];
  };
  expect(body).toMatchObject({
    revalidated: true,
    tag: "contentful",
    paths: ["/"],
  });
});
