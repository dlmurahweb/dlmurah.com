import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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

  await page.getByRole("button", { name: "Buka menu navigasi" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Chat di WhatsApp")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

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

  for (const href of hrefs) {
    expect(href).toMatch(/^#[A-Za-z][\w-]*$/);
    await expect(page.locator(href)).toHaveCount(1);
  }
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
  }
});

test("policy routes and custom not-found page are available", async ({
  page,
}) => {
  await page.goto("/kebijakan-privasi");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Kebijakan Privasi",
  );

  await page.goto("/syarat-layanan");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Syarat Layanan",
  );

  const response = await page.goto("/halaman-yang-tidak-ada");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Halaman tidak ditemukan",
  );
});

test("metadata, structured data, images, and security headers are valid", async ({
  page,
}) => {
  const response = await page.goto("/");
  expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response?.headers()["x-frame-options"]).toBe("DENY");
  expect(response?.headers()["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );

  await expect(page.locator("link[rel='canonical']")).toHaveAttribute(
    "href",
    /^https?:\/\//,
  );
  await expect(page.locator("script[type='application/ld+json']")).toHaveCount(
    1,
  );

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
