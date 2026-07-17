import { defineConfig } from "@playwright/test";

const productionBaseUrl = process.env.PLAYWRIGHT_BASE_URL;
const e2eRevalidateSecret = "e2e-revalidate-secret";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: productionBaseUrl ?? "http://127.0.0.1:3100",
    channel: "chrome",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: productionBaseUrl
    ? undefined
    : {
        command: "pnpm start -p 3100",
        env: {
          ...process.env,
          CONTENTFUL_REVALIDATE_SECRET: e2eRevalidateSecret,
        },
        url: "http://127.0.0.1:3100",
        reuseExistingServer: !process.env.CI,
        timeout: 30_000,
      },
});
