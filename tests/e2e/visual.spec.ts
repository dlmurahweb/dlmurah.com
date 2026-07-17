import { expect, test } from "@playwright/test";

const screenshotViewports = [
  { name: "mobile-390", width: 390, height: 900 },
  { name: "tablet-1024", width: 1024, height: 900 },
  { name: "desktop-1440", width: 1440, height: 900 },
] as const;

for (const viewport of screenshotViewports) {
  test(`homepage visual regression at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot(`${viewport.name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
}
