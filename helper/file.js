const fs = require('fs');
const path = require('path');

const readJsonFile = (fileName) => {
    let result = {};
    try {
        const FILE_PATH = path.resolve(__dirname, fileName);
        result = JSON.parse(fs.readFileSync(FILE_PATH));
    } catch (err) {
        console.error(err);
    }
    return result;
};

const writeJsonFile = (data, fileName) => {
    try {
        const FILE_PATH = path.resolve(__dirname, fileName);
        fs.writeFileSync(FILE_PATH, JSON.stringify(data), { flag: 'w+' });
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    readJsonFile,
    writeJsonFile
};
