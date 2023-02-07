const { setupBrandURL } = require("../helper");

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
};

let ApiContext = (() => {
  let instance;
  let pwI;

  const createInstance = async (playwright) => {
    pwI = playwright;
    instance = await pwI.request.newContext({
      baseURL: process.env.BASE_URL,
      extraHTTPHeaders: headers,
    });
  };

  const recreateInstance = async () => {
    instance = await pwI.request.newContext({
      baseURL: process.env.BASE_URL,
      extraHTTPHeaders: headers,
    });
    return instance;
  };

  const updateInstance = async (cookie) => {
    if (instance) {
      instance = await pwI.request.newContext({
        baseURL: setupBrandURL(),
        extraHTTPHeaders: { ...headers, cookie },
      });
    }
    return instance;
  };

  const dispose = async () => {
    if (instance) await instance.dispose();
    instance = null;
  };

  const getInstance = () => {
    return instance;
  };

  return {
    getInstance,
    createInstance,
    recreateInstance,
    updateInstance,
    dispose,
  };
})();

module.exports = ApiContext;
