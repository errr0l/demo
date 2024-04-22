const axios = require("axios");
const base64js = require("base64-js");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { pool } = require("../config/dbHelper");
const appConfig = require("../config/appConfig");

let publicKey = "";

const clientId = appConfig.oauth.client.id;
const clientSecret = appConfig.oauth.client.secret;
const redirectUri = appConfig.oauth.client.redirect_uri;

const oauthHost = appConfig.oauth.server.host;

async function getToken(code) {
    const joined = `${clientId}:${clientSecret}`;
    const encoded = new TextEncoder().encode(joined);
    const resp = await axios({
        method: "post",
        baseURL: oauthHost,
        url: "/oauth2/token",
        headers: {
            'Authorization': 'Basic ' + base64js.fromByteArray(encoded)
        },
        data: {
            grant_type: "authorization_type",
            code: code,
            client_id: clientId,
            redirect_uri: redirectUri,
        }
    });
    return resp.data;
}

function decrypt(idToken) {
    if (!publicKey) {
        publicKey = fs.readFileSync(appConfig.jwt.rsa_public_key, { encoding: 'utf-8' });
    }
    return jwt.verify(idToken, publicKey);
}

async function selectOauthByOpenid(openid) {
    const sql = "select * from `oauth` where `openid` = ?";
    const [rows] = await pool.query(sql, [openid]);
    return rows.length ? rows[0] : null;
}

async function selectOauthByUserId(userId) {
    const sql = "select * from `oauth` where `user_id` = ?";
    const [rows] = await pool.query(sql, [userId]);
    return rows.length ? rows[0] : null;
}

async function save(oauth) {
    const { user_id: userId, client_id: clientId, openid, access_token: accessToken, refresh_token: refreshToken } = oauth;
    const sql = "insert into `oauth` (`user_id`, `client_id`, `openid`, `access_token`, `refresh_token`) values (?, ?, ?, ?, ?)";
    const [result] = await pool.query(sql, [userId, clientId, openid, accessToken, refreshToken]);
    return result.insertId;
}

async function update(oauth) {
    const { openid, access_token: accessToken, refresh_token: refreshToken } = oauth;
    const sql = "update `oauth` set `access_token` = ?, `refresh_token` = ? where `openid` = ?";
    const [result] = await pool.query(sql, [accessToken, refreshToken, openid]);
    return result.affectedRows === 1;
}

async function revoke(token) {
    const joined = `${clientId}:${clientSecret}`;
    const encoded = new TextEncoder().encode(joined);
    const resp = await axios({
        method: "post",
        baseURL: oauthHost,
        url: "/oauth2/revoke",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: {
            // 客户端凭证
            // 'Authorization': 'Basic ' + base64js.fromByteArray(encoded)
            credential: 'Basic ' + base64js.fromByteArray(encoded)
        }
    });
    return resp.data;
}

async function getUserInfo(token) {
    const resp = await axios({
        method: "get",
        baseURL: oauthHost,
        url: "/oauth2/userinfo",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return resp.data;
}

async function refresh(token) {
    const resp = await axios({
        method: "post",
        baseURL: oauthHost,
        url: "/oauth2/refresh",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return resp.data;
}

module.exports = {
    getToken, decrypt, selectOauthByOpenid, save, revoke, getUserInfo, selectOauthByUserId, update, refresh
};