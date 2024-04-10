const axios = require("axios");
const base64js = require("base64-js");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { pool } = require("../config/dbHelper");

let publicKey = "";

const clientId = 2;
const clientSecret = "easyums@demo1";
const rootDir = path.resolve(process.cwd());

async function getToken(code) {
    const joined = `${clientId}:${clientSecret}`;
    const encoded = new TextEncoder().encode(joined);
    const resp = await axios({
        method: "post",
        baseURL: "http://127.0.0.1:8084",
        url: "/oauth2/token",
        headers: {
            'Authorization': 'Basic ' + base64js.fromByteArray(encoded)
        },
        data: {
            grant_type: "authorization_type",
            code: code,
            client_id: clientId,
            redirect_uri: 'http://localhost:8887/#/oauth2/callback'
        }
    });
    return resp.data;
}

function decrypt(idToken) {
    if (!publicKey) {
        publicKey = fs.readFileSync(rootDir + "/rsa_public_key.pem", { encoding: 'utf-8' });
    }
    return jwt.verify(idToken, publicKey);
}

// async function getUserinfo(token) {
//     const resp = await axios({
//         baseURL: "http://127.0.0.1:8080",
//         url: "/api/easyums/auth/oauth2/userinfo",
//         headers: {
//             'Authorization': 'Bearer ' + token
//         }
//     });
//     const respData = resp.response.data;
//     if (resp.status !== 200) {
//         throw new Error(respData.message || "");
//     }
//     return respData;
// }

async function selectOauthByOpenid(openid) {
    const sql = "select * from `oauth` where `openid` = ?";
    const [rows] = await pool.query(sql, [openid]);
    return rows.length ? rows[0] : null;
}

async function save(oauth) {
    const { userId, clientId, openid, accessToken, refreshToken,  } = oauth;
    const sql = "insert into `oauth` (`user_id`, `client_id`, `openid`, `access_token`, `refresh_token`) values (?, ?, ?, ?, ?)";
    const [result] = await pool.query(sql, [userId, clientId, openid, accessToken, refreshToken]);
    return result.insertId;
}

module.exports = {
    getToken, decrypt, selectOauthByOpenid, save
};