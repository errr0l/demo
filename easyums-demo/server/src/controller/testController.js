// 认证相关
const Router = require('koa-router');
const { AxiosError } = require("axios");

const oauthService = require("../service/oauthService");
const { oauthStore } = require("../store");

const router = new Router({
    prefix: "/test"
});

router.get("/1", async (ctx) => {
    ctx.body = { error: '', message: 'ok', payload: null };
});

// 撤销授权；
// 撤销后，访问令牌将失效（指的是授权服务器返回给客户端的那一组）
router.post("/revoke", async (ctx) => {
    const user = ctx.request.user.baseInfo;
    let oauth = oauthStore.get(user.id);
    if (!oauth) {
        oauth = await oauthService.selectOauthByUserId(user.id);
        oauthStore.save(user.id, oauth);
    }
    const respData = { error: '', payload: null, message: "" };
    try {
        const resp = await oauthService.revoke(oauth.access_token);
        if (resp.error) {
            respData.error = resp.error;
            respData.message = resp.message;
            return;
        }
        respData.payload = resp.payload;
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
            respData.error = "failed";
        }
    }
    ctx.body = respData;
});

// 获取当前用户在授权服务器上的信息
router.get("/userinfo", async (ctx) => {
    const user = ctx.request.user.baseInfo;
    let oauth = oauthStore.get(user.id);
    if (!oauth) {
        oauth = await oauthService.selectOauthByUserId(user.id);
        oauthStore.save(user.id, oauth);
    }
    const respData = { error: '', payload: null, message: "" };
    try {
        const resp = await oauthService.getUserInfo(oauth.access_token);
        if (resp.error) {
            respData.error = resp.error;
            respData.message = resp.message;
            return;
        }
        respData.payload = resp.payload;
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
            respData.error = "failed";
        }
    }
    ctx.body = respData;
});

// 正常流程下，刷新的同时要更新数据库数据，以保存最新数据
router.post("/refresh", async (ctx) => {
    const user = ctx.request.user.baseInfo;
    let oauth = oauthStore.get(user.id);
    if (!oauth) {
        oauth = await oauthService.selectOauthByUserId(user.id);
        oauthStore.save(user.id, oauth);
    }
    const respData = { error: '', payload: null, message: "" };
    try {
        const resp = await oauthService.refresh(oauth.refresh_token);
        if (resp.error) {
            respData.error = resp.error;
            respData.message = resp.message;
            return;
        }
        respData.payload = resp.payload;
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
            respData.error = "failed";
        }
    }
    ctx.body = respData;
});

module.exports = router;
