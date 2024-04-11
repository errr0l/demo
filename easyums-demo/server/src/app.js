const Koa = require('koa');
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const jwt = require("jsonwebtoken");
const oauthRouter = require("./controller/oauthController");
const testRouter = require("./controller/testController");

const errorHandler = require("./middleware/globalErrorHandler");
const tokenService = require("./service/tokenService");
const userService = require("./service/userService");
const { userStore } = require('./store');
const { secret } = require("./util/tokenUtil");
const appConfig = require("./config/appConfig");

const whiteList = ["/oauth/login", "/oauth/register"];

let status_401 = 401;
let body_401 = { error: "logging_required", message: '未登录' };

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
    ctx.set("Access-Control-Expose-Headers", "Authorization");

    if (ctx.request.method === 'OPTIONS') {
        ctx.response.status = 200;
        ctx.response.message = 'OK';
    }
    await next();
});
app.use(async (ctx, next) => {
    const method = ctx.method;
    if (method.toLocaleLowerCase() === "options") {
        return await next();
    }
    const path = ctx.path;

    if (whiteList.includes(path)) {
        return await next();
    }
    // console.log(ctx.headers);
    const authorization = ctx.request.headers['authorization']; // 大写（Authorization）读取不到
    console.log(authorization);
    if (!authorization) {
        ctx.status = status_401;
        ctx.body = body_401;
        console.error("未携带认证信息");
        return;
    }

    const authorizationArr = authorization.split(" ");

    if (authorizationArr.length != 2) {
        console.error("无效的令牌");
        ctx.status = status_401;
        ctx.body = body_401;
        return;
    }

    const accessToken = authorizationArr[1];
    try {
        const decoded = jwt.verify(accessToken, secret);
        // accessToken的iss不是ATIssuer（防止使用refreshToken混淆），或signedMap不存在AT:userId，或user.accessToken与传入的accessToken不同时，
        // 一律当做未登录
        if (decoded.type !== 'access_token') {
            console.error("令牌类型不正确");
            ctx.body = { error: "invalid_token", message: '' };
            ctx.status = status_401;
            return;
        }
        const userId = decoded.userId;
        let loginInfo = userStore.get(decoded.userId, false);
        console.log("用户登录信息：%s", loginInfo);
        if (!loginInfo) {
            console.info("即将重新保存用户登录信息...");
            console.info("查询用户：%s", userId);
            const user = await userService.selectByUserId(userId);
            // 重新保存用户登录信息
            if (user) {
                console.info("查询用户令牌记录");
                const token = await tokenService.getTokenByUserId(userId);
                loginInfo = {
                    baseInfo: user,
                    accessToken: token ? token.access_token : "",
                    refreshToken: token ? token.refresh_token : ""
                };
                console.info("保存用户登陆信息：", loginInfo);
                userStore.save(userId, loginInfo);
            }
        }
        if (!loginInfo) {
            ctx.status = status_401;
            ctx.body = body_401;
            return;
        }
        // console.log(loginInfo);
        if (accessToken !== loginInfo.accessToken) {
            ctx.body = { error: "invalid_token", message: '' };
            console.error("无效的令牌");
            ctx.status = status_401;
            return;
        }

        ctx.request.user = loginInfo;
        await next();
    } catch (error) {
        console.error("令牌验证失败");
        console.log(error);
        ctx.status = status_401;
        ctx.body = body_401;
    }
});
app.use(bodyParser());

app.use(errorHandler);
app.use(oauthRouter.routes());
app.use(testRouter.routes());

const server = app.listen(appConfig.server.port, function () {
    let host = server.address().address;
    const port = server.address().port;
    if (host === "::") {
        host = "localhost";
    }
    console.log("App running at：");
    console.log("- http://%s:%s", host, port);
});
