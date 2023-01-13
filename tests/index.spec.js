require("dotenv").config();
const { test } = require("@playwright/test");
const { logError, logInfo } = require("../helper/logger");
const loginTest = require("./login.spec");

test.describe("Login", () => {
  loginTest;
});

test.afterEach(async ({}, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    logError(`❌ ${testInfo.title} did not run as expected!`);
  } else {
    logInfo (`✅ ${testInfo.title} did run as expected!`);
  }
});
