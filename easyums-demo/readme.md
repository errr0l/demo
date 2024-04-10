# EASYUMS-DEMO

easyums授权系统对接示例。

## 启动

1、easyums

启动easyums，并将客户端id、密钥、回调地址拷贝到指定位置（按需注册客户端）。

1.1、easyums-demo/server

以下代码是在同一文件中。

1）id&secret

> server/src/service/oauthService.js

```js
// ...
const clientId = 2;
const clientSecret = "easyums@demo1";
// ...
```

2）回调地址

> server/src/service/oauthService.js

```js
const resp = await axios({
    // ...
    data: {
        grant_type: "authorization_type",
        code: code,
        client_id: clientId,
        redirect_uri: 'http://localhost:8887/#/oauth2/callback'
    }
});
```

1.2、easyums-demo/web

1）id&secret

只需要客户端id，以下代码是在同一文件中。

> web/src/views/login.vue

```js
// ...
const authorizationUrl = encodeURI(`http://localhost:8084/oauth2/authorize?redirect_uri=${redirectUrl}&client_id=2&response_type=code&state=1&scope=openid profile email`);
// ..
```

2）回调地址

> web/src/views/login.vue

```js
// ..
const redirectUrl = encodeURIComponent('http://localhost:8887/#/oauth2/callback');
// ..
```

（事实上集成在一个配置文件中更合适）

2、easyums-demo

本系统又分为前后端两个部分，需要分别进行启动。

2.1、web

web端主要包含了三个页面，分别为登陆、注册、home。

在当前demo中，使用该网页的目的是为了成功调用home页面中的"/test/1"接口，如下所示：

![image](./FEDB704856786CDDC698A9D8AE8004B9.png)

*图1 测试接口2*

点击界面按钮，并得到"ok"的提示字样时，表示调用成功。

当然，对于首次使用系统的用户来说，在成功调用接口之前，还需要经过一系列的步骤。

该流程可以简单概括为：

> easyums-demo -> 跳转 -> easyums -> (按需注册) -> 认证(按需注册) -> 跳转 -> easyums-demo -> (按需注册) -> 授权登录成功

在上述的流程中，对于首次使用系统的用户来说，需要分别在easyums和easyums-demo系统中注册账号。

```bash
cd web

# 安装依赖；已安装可跳过
npm i

npm run dev
```

2.2、server

创建完数据库后（sql文件在根目录下，并根据自己的实际情况修改数据库连接配置信息"server/src/config/dbHelper.js"），在终端执行以下命令以启动服务端。

```bash
cd server

npm i

# 如果已经赋予权限，可跳过
chmod u+x bin/www

bin/www
```

3、以上步骤完成后，在浏览器打开web端
