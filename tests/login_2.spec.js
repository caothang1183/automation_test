const { test, expect } = require("@playwright/test");
const {
  ACCOUNT_LOGIN,
  ACCOUNT_LOGIN_2,
  ACCOUNT_NOT_EXISTED,
  ACCOUNT_LOGIN_FAILED,
} = require(`../data/account/${process.env.BRAND}`);
const { setCookie, countProperties } = require("../helper");
const { parseData } = require("../helper/data");
const ApiContext = require("../utils/apiContext");
const { USER_PROPERTY } = require(`../property/${process.env.BRAND}/user`);

let apiContext;

test("[API] LOGIN", async ({}) => {
  apiContext = ApiContext.getInstance();
  const response = await apiContext.post(`/api/v1/login`, {
    data: ACCOUNT_LOGIN,
  });
  const cookie = setCookie(response);
  await ApiContext.updateInstance(cookie);
  expect(response.status()).toBe(200);

  const dataResponse = await parseData(response);
  expect(dataResponse.code).toBe(200);
  expect(dataResponse.status).toBe("OK");

  for (const property of USER_PROPERTY) {
    expect(dataResponse.data[0]).toHaveProperty(property);
  }
  expect(countProperties(dataResponse.data[0])).toBe(USER_PROPERTY.length);
});

// test("[API] LOGIN 2", async ({}) => {
//   const response = await apiContext.post(`/api/v1/login`, {
//     data: ACCOUNT_LOGIN_2,
//   });

//   const cookie = setCookie(response);
//   await ApiContext.updateInstance(cookie);
//   expect(response.status()).toBe(200);

//   const dataResponse = await parseData(response);
//   console.log(dataResponse)

//   expect(dataResponse.code).toBe(200);
//   expect(dataResponse.status).toBe("OK");

//   for (const property of USER_PROPERTY) {
//     expect(dataResponse.data[0]).toHaveProperty(property);
//   }
//   expect(countProperties(dataResponse.data[0])).toBe(USER_PROPERTY.length);
// });

test("[API] REFRESH ", async () => {
  const response = await apiContext.get(`/api/v1/refresh`);
  expect(response.status()).toBe(200);
  const dataResponse = await parseData(response);
  expect(dataResponse.code).toBe(200);
  expect(dataResponse.status).toBe("OK");
  for (const property of USER_PROPERTY) {
    expect(dataResponse.user).toHaveProperty(property);
  }
  expect(countProperties(dataResponse.user)).toBe(USER_PROPERTY.length);
});

test("[API] LOGIN FAILED", async () => {
  apiContext = await ApiContext.recreateInstance();

  const response = await apiContext.post(`/api/v1/login`, {
    data: ACCOUNT_LOGIN_FAILED,
  });
  expect(response.status()).toBe(200);

  const dataResponse = await parseData(response);
  expect(dataResponse.code).toBe(254);
  expect(dataResponse.status).toBe("ERROR");
  expect(dataResponse.message).toBe("Tên đăng nhập và mật khẩu không đúng");
});

test("[API] LOGIN FAILED USER NOT EXIST", async () => {
  const data = ACCOUNT_NOT_EXISTED;
  const response = await apiContext.post(`/api/v1/login`, {
    data,
  });
  expect(response.status()).toBe(200);

  const dataResponse = await parseData(response);
  expect(dataResponse.code).toBe(404);
  expect(dataResponse.status).toBe("NOT_FOUND");
});
