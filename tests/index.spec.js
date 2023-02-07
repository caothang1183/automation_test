require("dotenv").config();
const { test } = require("@playwright/test");
const { setupBrandURL } = require("../helper");
const { logError, logInfo } = require("../helper/logger");
const ApiContext  = require("../utils/apiContext");
const loginTest = require("./login.spec");

(async () => {
  test.beforeAll(async ({ playwright }) => {
    setupBrandURL();
    await ApiContext.createInstance(playwright);
  });

  test.describe("Login", () => {
    loginTest;
  });

  test.afterAll(({}) => {
    ApiContext.dispose();
  });

  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      logError(`❌ ${testInfo.title} did not run as expected!`);
    } else {
      logInfo(`✅ ${testInfo.title} did run as expected!`);
    }
  });
})();
