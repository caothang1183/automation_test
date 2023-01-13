const { DOMAIN_STG, DOMAIN_PROD } = require("../constant/domain");

const setupBrandURL = () => {
  let domain = DOMAIN_STG;
  if (process.env.IS_PROD === "1") domain = DOMAIN_PROD;
  process.env["BASE_URL"] = domain[process.env.BRAND];
  return domain[process.env.BRAND];
};

const setCookie = (response) => {
  process.env["COOKIE"] = response.headers()["set-cookie"];
};

const countProperties = (data) => Object.keys(data).length;

module.exports = {
  setupBrandURL,
  setCookie,
  countProperties,
};
