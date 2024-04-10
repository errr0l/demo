// 认证相关
const Router = require('koa-router');
const oauthService = require("../service/oauthService");
const userService = require("../service/userService");
const { AxiosError } = require("axios");
const { oauthStore } = require("../store");

const router = new Router({
    prefix: "/oauth"
});

router.post("/register", async (ctx) => {
    const { code, username, password, password2, email, captcha } = ctx.request.body;
    if (!code) {
        ctx.body = { error: 'authorization_code_required', message: '授权码不能为空' };
        return;
    }
    const oauth = oauthStore.get(code);
    if (!oauth) {
        ctx.body = { error: 'authorization_code_invalid', message: '授权码已失效' };
        return;
    }
    const user = {
        username,
        password: password,
        email, date: new Date()
    };
    const id = await userService.save(user);
    oauth.userId = id;
    // 保存oauth记录
    await oauthService.save(oauth);
    user.id = id;
    const loginInfo = await userService.login2(user);
    ctx.body = { error: '', message: '', payload: loginInfo };
});

router.post("/login", async (ctx) => {
    const { code } = ctx.request.body;
    const respData = { error: '', payload: null, message: "" };
    try {
        const tokenResp = await oauthService.getToken(code);
        if (tokenResp.error) {
            respData.error = tokenResp.error;
            respData.message = tokenResp.message;
            return;
        }
        const payload = tokenResp.payload;
        const idToken = payload['id_token'];
        const decrypted = oauthService.decrypt(idToken);
        // 查询记录
        const oauth = await oauthService.selectOauthByOpenid(decrypted.openid);
        // 未注册
        if (!oauth) {
            respData.payload = {
                baseInfo: decrypted['userinfo'],
                accessToken: "",
                refreshToken: ""
            };
            // 临时保存oauth记录
            oauthStore.save(code, { clientId: decrypted.client_id, openid: decrypted.openid, accessToken: payload.access_token, refreshToken: payload.refresh_token });
        }
        else {
            respData.payload = await userService.login(oauth);
        }
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            const data = error.response.data;
            if (data) {
                respData.error = data.error;
                respData.message = data.message;
            }
        }

        if (!respData.error) {
            respData.error = "authorization_failed";
        }
        if (!respData.message) {
            respData.message = "授权失败";
        }
    }
    ctx.body = respData;
});

module.exports = router;
