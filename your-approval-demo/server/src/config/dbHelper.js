// 数据库配置
const { createPool } = require("../db/mysql");
const appConfig = require("./appConfig");

// 创建连接池
const pool = createPool({
    user: appConfig.database.user,
    password: appConfig.database.password,
    database: appConfig.database.db_name,
    host: appConfig.database.host,
    port: +appConfig.database.port
});

module.exports = {
    pool
};