// 认证相关
const Router = require('koa-router');

const router = new Router({
    prefix: "/test"
});

router.get("/1", async (ctx) => {
    ctx.body = { error: '', message: 'ok', payload: null };
});

module.exports = router;
