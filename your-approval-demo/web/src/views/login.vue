<template>
    <div id="main">
        <div class="container">
            <div class="left">
            </div>
            <div class="right">
                <div class="content">
                    <div class="item logo mg-b-10">
                        <h2 class="unselectable">your-approval-demo</h2>
                    </div>
                    <h2 class="item greeting mg-b-10 unselectable">
                        <span style="font-size: 20px;">Hello,</span>
                        <br/>
                        Welcome! <span></span></h2>
                    <div class="item mg-b-5">
                        <div>
                            <input class="username input-1" v-model="loginForm.username" placeholder="用户名/邮箱" type="text">
                        </div>
                        <div>
                            <input class="password input-1" v-model="loginForm.password" placeholder="密码" type="password">
                        </div>
                        <div style="display: flex; align-items: center;">
                            <input class="input-1" style="flex: 1;" v-model="loginForm.captcha" placeholder="验证码" type="text">
                            <p id="wait" style="display: flex; align-items: center; margin-left: 10px; cursor: pointer; height: 28px; font-size: 13px;" @click="refreshCaptcha">获取验证码</p>
                        </div>
                    </div>
                    <!-- <div class="item" style="margin-bottom: 15px;"> -->
                        <!-- <div class="captcha-wrapper" style="height: 30px; display: flex;"> -->
                            <!-- <img class="captcha" :src="captchaBase64" alt="captcha" @click="refreshCaptcha" /> -->
                            <!-- <p id="wait" v-if="!captchaBase64" style="cursor: pointer; height: 28px; font-size: 13px;" @click="refreshCaptcha">点击获取验证码</p> -->
                            <!-- <img class="captcha" v-else :src="captchaBase64" alt="captcha" @click="refreshCaptcha" /> -->
                        <!-- </div> -->
                    <!-- </div> -->
                    <div class="item mg-b-5" style="margin-top: 20px;">
                        <el-button style="width: 100%;" type="primary" size="small" @click="login">登陆</el-button>
                    </div>
                    <!-- <div class="item forget mg-b-10">
                        <p class="t-r">
                            <span class="c-p link">忘记密码?</span>
                        </p>
                    </div> -->
                    <div class="item forget mg-b-10" style="margin-top: 10px;">
                        <p>
                            <span class="c-p link" @click="authorize">your-approval 授权登录</span>
                        </p>
                    </div>
                    <div class="item message">
                        <span v-text="message"></span>
                    </div>
                    <div class="item t-a copyright unselectable">
                        Copyright © 2023 Errol All Rights Reserved.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 授权地址
const HOST = "http://localhost:8084/oauth2/authorize";
// 客户端id
const CLIENT_ID = 2;
// 客户端回调
const REDIRECT_URI = "http://localhost:8887/#/oauth2/callback";
// 权限范围
const SCOPE = "openid profile email";

export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                username: "",
                password: "",
                captcha: "",
                uuid: ""
            },
            loading: false,
            passwordType: "password",
            redirect: undefined,
            message: "",
            captchaBase64: ""
        };
    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true,
        },
    },
    methods: {
        refreshCaptcha() {},
        login() {},
        async getCaptcha() {},
        authorize() {
            const encoded = encodeURIComponent(REDIRECT_URI);
            const state = Math.floor(Math.random() * 100);
            const authorizationUrl = encodeURI(`${HOST}?redirect_uri=${encoded}&client_id=${CLIENT_ID}&response_type=code&state=${state}&scope=${SCOPE}`);
            location.href = authorizationUrl;
        }
    },
};
</script>

<style lang="styl" scoped>
.captcha {
    cursor: pointer;
    width: 100px;
    height: 28px;
}

#main {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

#main .container {
    width: 880px;
    height: 457px;
    border-radius: 10px;
    box-shadow: 2px 4px 10px rgb(224, 224, 224);
    display: flex;
    overflow: hidden;
    scale: 1.1;
}

#main .container .left {
    flex: 1;
    overflow: hidden;
}

#main .container .right {
    width: 33%;
    position: relative;
    padding: 22px 0 50px 0;
}

#main .container .right .content {
    width: 80%;
    margin: 0 auto;
    vertical-align: middle;
}

.logo {
    display: flex;
    align-items: center;
}

.logo .name {
    margin-left: 5px;
    font-size: 14px;
    font-weight: 600;
}

.logo img {
    width: 40px; height: 40px; border-radius: 50%;
}

.greeting {
    font-size: 24px;
    font-weight: 600;
}
.greeting .name {
    font-size: 14px;
}

.input-1 {
    border: none;
    padding: 11px 0 6px 0;
    display: inline-block;
    width: 100%;
    height: inherit;
    border-bottom: 1px solid #909399;
    transition: all 0.5s;
    font-size: 13px;
    box-shadow: 0 0 0 1000px white inset !important;
}

.input-1:focus {
    border-color: #333;
    padding-left: 4px;
    color: #333;
}

.copyright {
    width: 100% !important;
    height: 50px;
    color: #909399;
    font-size: 12px;
    line-height: 1.6;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.forget {
    color: #909399;
    font-size: 12px;
}

.message {
    height: 3em;
    max-height: 3em;
    overflow: hidden;
    font-weight: 500;
    font-size: 12px;
}

.no-account {
    color: #909399;
    font-size: 12px;
}
</style>
