import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.NEXT_PUBLIC_API_URL = "https://dev.api.waycupapp.com";

      return config;
    },
    baseUrl: "https://dev.app.waycupapp.com",
    retries: {
      runMode: 2,
    }
  },
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  execTimeout: 10000,
  taskTimeout: 10000,
  pageLoadTimeout: 10000,
  responseTimeout: 10000,
  experimentalModifyObstructiveThirdPartyCode: true,
  chromeWebSecurity: false,
});
