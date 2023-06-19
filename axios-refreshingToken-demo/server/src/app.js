const express = require("express");
const fs = require('fs');
const jwt = require("jsonwebtoken");

const app = express();
const port = 8888;
const jwtSecret = "axios-refresingToken-demo-a19";

const userList = [
    { id: 1, username: "test", password: "123456" }
];

// 用于存储登录数据
const signedMap = {};

const whiteList = ['/refresh', '/login'];

const defaultModel = {
    status: 200,
    code: 9999,
    message: "an error occurred.",
    data: null
};

readSignedJson();

function writeSignedJson() {
    fs.writeFile(__dirname + "/../signed.json", JSON.stringify(signedMap), function(error) {
        if (error) {
            throw error;
        }
        console.log("写入成功.");
    });
}

// 将文件中的数据读取
function readSignedJson() {
    fs.readFile(__dirname + "/../signed.json", 'utf-8', function(error, data) {
        if (error) {
            throw error;
        }
        console.log("读取文件成功.");
        if (!data) {
            console.log("无数据.");
            return;
        }
        const _signedMap = JSON.parse(data);
        if (!_signedMap || !Object.keys(_signedMap).length) {
            console.log("无数据.");
            return;
        }
        for (const key in _signedMap) {
            signedMap[key] = _signedMap[key];
        }
        console.log(signedMap);
    });
}

function errorHandler(model, resp) {
    Object.assign({}, defaultModel, model);
    const { status, code, message, data } = model;
    
    resp.status(status).send({
        code,
        message,
        data
    });
}

app.listen(port, () => {
    console.log(`app listening on port ${port}.`);
});

app.use(express.json());

// 跨域中间件
app.use((req, resp, next) => {
    resp.setHeader('Access-Control-Allow-Origin', '*');
    resp.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    resp.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
    resp.setHeader("Access-Control-Expose-Headers", "Authorization");
    next();
});

// token校验中间件
app.use("/api", function(req, resp, next) {
    
    const method = req.method;
    if (method.toLocaleLowerCase() === "options") {
        return next();
    }
    const path = req.path;

    if (whiteList.includes(path)) {
        return next();
    }
    const authorization = req.headers['authorization']; // 大写（Authorization）读取不到

    if (!authorization) {
        return errorHandler({ status: 401, code: 40101, message: '未登录' }, resp);
    }

    const authorizationArr = authorization.split(" ");

    if (authorizationArr.length != 2) {
        return errorHandler({ status: 401, code: 40101, message: '未登录' }, resp);
    }

    const accessToken = authorizationArr[1];
    try {
        const decoded = jwt.verify(accessToken, jwtSecret);
        const user = signedMap[`AT:${decoded.userId}`];

        // accessToken的iss不是ATIssuer（防止使用refreshToken混淆），或signedMap不存在AT:userId，或user.accessToken与传入的accessToken不同时，
        // 一律当做未登录
        if (decoded.iss !== 'ATIssuer' || !user || user.accessToken !== accessToken) {
            throw new Error('未登录');
        }
        req.user = user;
        next();
    } catch (err) {
        return errorHandler({ status: 401, code: 40101, message: '未登录' }, resp);
    }
});

// 兜底错误处理
app.use(function(err, req, resp, next) {
    console.error(err.stack);
    resp.status(500).send(err);
});

app.get("/api/test", (req, resp) => {
    resp.send({
        code: 0,
        message: "ok!",
        data: {
            name: "测试数据",
            value: 114514,
            date: new Date().getTime()
        }
    });
});

// 登陆接口
app.post("/api/login", function(req, resp) {
    const loginForm = req.body;
    const { username, password } = loginForm;

    if (!username || !password) {
        return errorHandler({ status: 400, code: 40001, message: '账号或密码不能为空' }, resp);
    }
    const user = userList.find(item => item.username === username);
    if (!user || user.password != password) {
        return errorHandler({ status: 400, code: 40002, message: '账号或密码错误' }, resp);
    }

    const seconds = Math.floor(Date.now() / 1000);

    // accessToken有效期为两个小时，refreshToken有效期为7天
    const accessToken = jwt.sign({ exp: seconds + 60 * 60 * 2, userId: user.id }, jwtSecret, { issuer: 'ATIssuer' });
    const refreshToken = jwt.sign({ exp: seconds + 60 * 60 * 24 * 7, userId: user.id }, jwtSecret, { issuer: 'RTIssuer' });
    const signedUser = {
        ...user,
        accessToken, refreshToken
    };
    signedMap[`AT:${user.id}`] = signedUser;
    signedMap[`RT:${user.id}`] = signedUser;

    writeSignedJson();
    
    resp.send({
        code: 0,
        message: "ok",
        data: {
            accessToken, refreshToken
        }
    });
});

app.post("/api/logout", function(req, resp) {
    const user = req.user;
    
    if (signedMap[`AT:${user.id}`]) {
        delete signedMap[`AT:${user.id}`];
    }

    if (signedMap[`RT:${user.id}`]) {
        delete signedMap[`RT:${user.id}`];
    }

    writeSignedJson();

    resp.send({
        code: 0,
        message: "ok",
        data: null
    });
});

// 刷新令牌接口
app.post("/api/refresh", function(req, resp) {
    const form = req.body;
    const { refreshToken } = form;

    if (!refreshToken) {
        return errorHandler({ status: 400, code: 40003, message: '刷新令牌不能为空' }, resp);
    }

    try {
        const decoded = jwt.verify(refreshToken, jwtSecret);
        const user = signedMap[`RT:${decoded.userId}`];
        if (decoded.iss !== 'RTIssuer' || !user || user.refreshToken !== refreshToken) {
            throw new Error('无效的刷新token');
        }
        const seconds = Math.floor(Date.now() / 1000);
        const accessToken = jwt.sign({ exp: seconds + 60 * 60 * 2, userId: user.id }, jwtSecret, { issuer: 'ATIssuer' });
        const r = { accessToken };
        user['accessToken'] = accessToken;

        const exp = decoded.exp;
        if (exp < (seconds + 60 * 60 * 24 * 3)) {
            const refreshToken = jwt.sign({ exp: seconds + 60 * 60 * 24 * 7, userId: user.id }, jwtSecret, { issuer: 'RTIssuer' });
            r['refreshToken'] = refreshToken;
            user['refreshToken'] = refreshToken;
            signedMap[`RT:${user.id}`] = user;
        }

        signedMap[`AT:${user.id}`] = user;
        writeSignedJson();

        resp.send({
            code: 0,
            message: "ok",
            data: r
        });
    } catch (err) {
        return errorHandler({ status: 401, code: 40198, message: '请重新登陆' }, resp);
    }
});

// 定时清除任务
setInterval(() => {
    const seconds = Math.floor(Date.now() / 1000);
    const toDel = [];
    for (const key in signedMap) {
        if (signedMap[key] < seconds)  {
            toDel.push(key);
        }
    }
    if (toDel.length) {
        for (const key of toDel) {
            delete signedMap[key];
        }
    }
}, 1000 * 60 * 60);