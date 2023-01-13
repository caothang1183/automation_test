const { test, expect } = require("@playwright/test");
const {
  ACCOUNT_LOGIN,
  ACCOUNT_NOT_EXISTED,
  ACCOUNT_LOGIN_FAILED,
} = require(`../data/account/${process.env.BRAND}`);
const { setupBrandURL, setCookie, countProperties } = require("../helper");
const { parseData } = require("../helper/data");
const { USER_PROPERTY } = require(`../property/${process.env.BRAND}/user`);
setupBrandURL();
const user = ACCOUNT_LOGIN;

test("[API] LOGIN", async ({ request }, testInfo) => {
  const response = await request.post(`/api/v1/login`, {
    data: user,
  });
  setCookie(response);
  expect(response.status()).toBe(200);

  const dataResponse = await parseData(response);
  expect(dataResponse.code).toBe(200);
  expect(dataResponse.status).toBe("OK");
  expect(dataResponse.data[0]).toHaveProperty("username", user.username);

  for (const property of USER_PROPERTY) {
    expect(dataResponse.data[0]).toHaveProperty(property);
  }
  expect(countProperties(dataResponse.data[0])).toBe(USER_PROPERTY.length);

});

test("[API] REFRESH ", async ({ request }) => {
  const response = await request.get(`/api/v1/refresh`, {
    headers: {
      Cookie: `${process.env.COOKIE}`,
    },
  });

  expect(response.status()).toBe(200);
  const dataResponse = await parseData(response);
  expect(dataResponse.code).toBe(200);
  expect(dataResponse.status).toBe("OK");
  for (const property of USER_PROPERTY) {
    expect(dataResponse.user).toHaveProperty(property);
  }
  expect(countProperties(dataResponse.user)).toBe(USER_PROPERTY.length);
  expect(dataResponse.user).toHaveProperty("username", user.username);
});

test("[API] LOGIN FAILED", async ({ request }) => {
  const data = ACCOUNT_LOGIN_FAILED;
  const response = await request.post(`/api/v1/login`, {
    data,
  });
  expect(response.status()).toBe(200);

  const dataResponse = await parseData(response);
  expect(dataResponse.code).toBe(254);
  expect(dataResponse.status).toBe("ERROR");
  expect(dataResponse.message).toBe("Tên đăng nhập và mật khẩu không đúng");
});

test("[API] LOGIN FAILED USER NOT EXIST", async ({ request }) => {
  const data = ACCOUNT_NOT_EXISTED;
  const response = await request.post(`/api/v1/login`, {
    data,
  });
  expect(response.status()).toBe(200);

  const dataResponse = await parseData(response);
  expect(dataResponse.code).toBe(404);
  expect(dataResponse.status).toBe("NOT_FOUND");
});
