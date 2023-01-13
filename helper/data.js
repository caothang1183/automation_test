const parseData = async (response) => {
  return await response.json();
};

module.exports = {
  parseData,
};
