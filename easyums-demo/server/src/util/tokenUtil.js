// jwt默认采用的是对称加密
// 颁发的令牌需要签名（防篡改）
// jsonwebtoken这个库，使用最新版（9.0.2）使用公钥进行校验时，会有错误；降到8.5.1正常
const jwt = require('jsonwebtoken');

const secret = "easyums@demo2";

/**
 * 生成令牌
 * @param {Object} payload 载荷
 * @param {String} secret 秘钥（默认在app.ini）
 * @param {Object} options 加密选项，这里使用默认配置；（https://www.npmjs.com/package/jsonwebtoken）
 * @returns {String}
 */
function generate(payload, secret, options={}) {
    return jwt.sign(payload, secret, options);
}

/**
 * 验证token
 * @param {String} token
 * @param {String} secret 秘钥
 * @returns {Object|Null}
 */
function verify(token, secret) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.log(error);
        return null;
    }
}

function generateToken(payload) {
    // 标出类型，以防止使用refresh_token当做access_token使用的问题
    payload['type'] = "access_token";
    const opts = {
        issuer: "easyums demo",
        expiresIn: "2h",
    };
    return generate(payload, secret, opts);
}

function generateRefreshToken(payload={}) {
    payload['type'] = "refresh_token";
    const opts = {
        issuer: "easyums demo",
        expiresIn: "7d",
    };
    return generate(payload, secret, opts);
}

module.exports = {
    verify, generate, generateRefreshToken, generateToken, secret
};
