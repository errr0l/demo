// 令牌服务（对应token表）
const { pool } = require("../config/dbHelper");

/**
 * 获取token
 * @param {Number} id tokenId
 * @returns {Promise<*|null>}
 */
async function getTokenById(id) {
    const [rows] = await pool.query("select `id`, `access_token`, `refresh_token`, `user_id` from `token` where `id` = ?", [id]);
    return rows.length ? rows[0] : null;
}

/**
 * 根据clientId获取token列表
 * @param id 用户id
 * @returns {Promise<Array>}
 */
async function getTokensByUserId(id) {
    const sql = "select `id`, `access_token`, `refresh_token`, `user_id` from `token` where `user_id` = ?";
    const [rows] = await pool.query(sql, [id]);
    return rows;
}

async function getTokenByUserId(id) {
    const rows = await getTokensByUserId(id);
    return rows.length ? rows[0] : null;
}

// 删除用户token
async function delTokensByUserId(id) {
    const rows = await getTokensByUserId(id);
    if (rows.length) {
        await delToken(rows[0]);
    }
}

async function delToken(token) {
    const sql = "delete from `token` where `id` = ?";
    const [result] = await pool.query(sql, [token.id]);
    return result.affectedRows === 1;
}

/**
 * 保存token
 * @param {Object} tokenEntity token实体对象
 * @returns {Promise<boolean>}
 */
async function save(tokenEntity) {
    const { userId, accessToken, refreshToken } = tokenEntity;
    const sql = "insert into `token` (`access_token`, `refresh_token`, `user_id`) values (?, ?, ?)";
    const [result] = await pool.query(sql, [accessToken, refreshToken, userId]);
    return result.insertId;
}

module.exports = {
    getTokenById, getTokensByUserId, save, delTokensByUserId, delToken, getTokenByUserId
}