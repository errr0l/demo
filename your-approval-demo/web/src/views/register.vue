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
                        <span style="font-size: 20px;">REGISTRATION</span>
                    </h2>
                    <div class="item mg-b-10">
                        <div>
                            <input class="username input-1" v-model="formData.username" placeholder="用户名" type="text">
                        </div>
                        <div>
                            <input class="input-1" v-model="formData.introduction" placeholder="简介" type="text">
                        </div>
                        <div>
                            <input class="password input-1" v-model="formData.password" placeholder="密码" type="password">
                        </div>
                        <div>
                            <input class="input-1" v-model="formData.password2" placeholder="确认密码" type="password">
                        </div>
                        <div style="display: flex; align-items: center;">
                            <input class="input-1" style="flex: 1;" v-model="formData.email" placeholder="邮箱" type="text">
                            <span style="display: flex; align-items: center; margin-left: 10px; cursor: pointer; height: 28px; font-size: 13px;" @click="sendEmailCode" v-text="btnText"></span>
                        </div>
                        <div>
                            <input class="input-1" style="width: 50%;" v-model="formData.captcha" placeholder="验证码" type="text">
                        </div>
                    </div>
                    <!-- <div class="item" style="margin-bottom: 15px;">
                        <div class="captcha-wrapper" style="height: 30px;">
                            <p style="cursor: pointer; height: 28px; font-size: 13px; color: #fa7872;" @click="refreshCaptcha">点击获取验证码</p>
                        </div>
                    </div> -->
                    <div class="item forget" style="margin: 10px 0 20px;">
                        <p>
                            <span class="c-p link">已有账号? </span>
                            <span style="cursor: pointer;" @click="toLogin">登陆</span>
                        </p>
                    </div>
                    <div class="item mg-b-5">
                        <el-button style="width: 100%;" type="primary" @click="register" size="small">注册</el-button>
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
let { register } = require("@/api");

const OAUTH = "oauth";
const defaultFormData = {
    username: "",
    password: "",
    password2: "",
    introduction: "",
    captcha: "",
    code: "",
    email: ""
};

export default {
    data() {
        return {
            formData: {
                ...defaultFormData
            },
            btnText: "获取验证码",
            cd: 60
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
    created() {
        const { from, code } = this.$route.query;
        this.formData.code = code;
        if (from === OAUTH) {
            this.initialize();
        }
    },
    methods: {
        async register() {
			try {
				const resp = await register(this.formData);
                if (resp && !resp.error) {
                    this.$message.success("成功");
                    this.$router.push({ path: this.redirect || '/' });
                    const { accessToken, refreshToken, baseInfo: user } = resp.payload;
                    console.log(resp.payload);
                    this.$store.dispatch('user/saveLoginInfo', { accessToken, refreshToken, user });
				}
			} catch (error) {
                console.log(error);
			}
		},
        async sendEmailCode() {},
        // 初始化用户信息
        initialize() {
            const userinfoStr = sessionStorage.getItem('userinfo');
            if (!userinfoStr) {
                this.$message.error("未知错误");
                return;
            }
            try {
                const userinfo = JSON.parse(userinfoStr);
                this.setFormData(userinfo);
            } catch (error) {
                console.log(error);
                this.$message.error("未知错误");
            }
        },
        toLogin() {
            this.$router.push("/login");
        },
        setFormData(userinfo) {
            for (const key of Object.keys(defaultFormData)) {
                if (key in userinfo) {
                    this.formData[key] = userinfo[key];
                }
            }
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
    color: #fa7872;
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
    color: #fa7872;
    font-weight: 500;
    font-size: 12px;
}

.no-account {
    color: #909399;
    font-size: 12px;
}
</style>
