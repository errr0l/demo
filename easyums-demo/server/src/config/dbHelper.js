// 数据库配置
const { createPool } = require("../db/mysql");

// 创建连接池
const pool = createPool({
    user: "root",
    password: "",
    database: "demo1",
    host: "localhost",
    port: 3306
});

module.exports = {
    pool
};