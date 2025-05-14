const fs = require("fs");
const { textParser } = require("./parser");

// 读取配置文件；
// 调用此方法时，请确保当前执行目录下有配置文件
function getConfig(rootDir) {
    const configPath = rootDir + '/config.txt';

    if (!fs.existsSync(configPath)) {
        throw new Error("配置文件不存在");
    }

    return textParser(fs.readFileSync(configPath, 'utf-8'));
}

module.exports = {
    getConfig
};