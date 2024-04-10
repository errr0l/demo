const crypto = require("crypto");

const { generateToken, generateRefreshToken } = require("../util/tokenUtil");
const { userStore } = require("../store");
const { pool } = require("../config/dbHelper");
const tokenService = require("./tokenService");

async function selectByUserId(userId) {
    const sql = "select * from `user` where `id` = ?";
    const [rows] = await pool.query(sql, [userId]);
    if (!rows.length) {
        throw new Error("用户不存在");
    }
    const user = rows[0];
    user.password = null;
    return user;
}

async function login(oauth) {
    const userId = oauth.user_id;
    const user = await selectByUserId(userId);
    const accessToken = generateToken({ userId });
    const refreshToken = generateRefreshToken({ userId });
    const loginInfo = { baseInfo: user, accessToken, refreshToken };
    userStore.save(userId, loginInfo);
    await tokenService.delTokensByUserId(userId);
    const tokenEntity = {
        userId,
        accessToken,
        refreshToken
    };
    await tokenService.save(tokenEntity);
    return loginInfo;
}

// 自动登录
async function login2(user) {
    const userId = user.id;
    const accessToken = generateToken({ userId });
    const refreshToken = generateRefreshToken({ userId });
    user.password = "";
    const loginInfo = { baseInfo: user, accessToken, refreshToken };
    userStore.save(userId, loginInfo);
    await tokenService.delTokensByUserId(userId);
    const tokenEntity = {
        userId,
        accessToken,
        refreshToken
    };
    await tokenService.save(tokenEntity);
    return loginInfo;
}

async function save(user) {
    const { username, password, email, date } = user;
    const sql = "insert into `user` (`username`, `password`, `created_at`, `email`) values (?, ?, ?, ?)";
    const [result] = await pool.query(sql, [username, crypto.createHash('md5').update(password).digest('hex'), date, email]);
    return result.insertId;
}

module.exports = { login, save, login2, selectByUserId };