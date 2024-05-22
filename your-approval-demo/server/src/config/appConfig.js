const { parse } = require("ini");
const path = require("path");
const fs = require("fs");

const configFilePath = path.resolve(__dirname, "../../app.ini");

if (!fs.existsSync(configFilePath)) {
    throw new Error("app.ini不存在");
}
const appConfig = parse(fs.readFileSync(configFilePath, { encoding: 'utf-8' }));

module.exports = appConfig;