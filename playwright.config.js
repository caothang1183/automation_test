const { devices } = require("@playwright/test");

const config = {
  testDir: "./tests",
  expect: {
    timeout: 30000,
  },
  pauseOptions: {
    timeout: 0,
    slowMo: 4000,
  },
  // reporter: "html",
  reporter: "list",
  use: {
    baseURL: process.env.BASE_URL,
    channel: "chrome",
    headless: true,
    extraHTTPHeaders: {
      "Accept": "application/json",
      "Authorization": `${process.env.API_TOKEN}`,
      "Content-Type": "application/json;charset=UTF-8",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    },
    viewport: { width: 1400, height: 980 },
    screenshot: "only-on-failure",
    actionTimeout: 30 * 1000,
    navigationTimeout: 60 * 1000,
  },
  outputDir: "test-results/",
};

module.exports = config;
