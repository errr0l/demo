<template>
    <div id="app" class="container">
        <el-card style="width: 45%; margin: 0 auto;">
            <div slot="header" style="text-align: center;">
                <span>decoupling-4-js-demo</span>
            </div>
            <el-tabs v-model="activeName">
                <el-tab-pane label="用户登陆" name="first">
                    <el-form ref="form" label-width="auto" size="small" style="width: 80%; margin: 10px auto 0;">
                        <el-form-item label="用户名/邮箱">
                            <el-input v-model="formData2.username" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="formData2.password" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-form>
                    <div style="text-align: center;">
                        <el-button type="primary" size="mini" :disabled="btnDisabled2" @click="login">登录</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="用户注册" name="second">
                    <el-form ref="form" label-width="auto" size="small" style="width: 80%; margin: 10px auto 0;">
                        <el-form-item label="用户名">
                            <el-input v-model="formData.username" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="formData.password" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码">
                            <el-input v-model="formData.password2" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input v-model="formData.email" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码">
                            <el-input v-model="formData.captcha" placeholder="请输入">
                                <el-button slot="append" @click="sendEmailVerifyCode">{{btnText}}</el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div style="text-align: center;">
                        <el-button type="primary" size="mini" @click="register">注册账号</el-button>
                        <el-button type="primary" size="mini" :disabled="btnDisabled" @click="onlyOneClick">只允许一次点击</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
import { applyingInterceptors, emailRule } from "@/util/common";
import { CustomException } from "@/exception/CustomException";
import { onlyOneClickInterceptor, timeoutRollback, disabledInterceptorPreHandle } from "./interceptor";

const defaultBtnText = '获取验证码';
const CD = 60; // 一分钟

// 模拟接口
function register(params) {
    console.log('--- 模拟注册账号 ---');
    for (const key in params) {
        console.log(`${key}：${params[key]}`);
    }
    console.log('---');
    return { code: 0 };
}

function sendEmailVerifyCode(params) {
    console.log('--- 模拟发送验证码 ---');
    for (const key in params) {
        console.log(`${key}：${params[key]}`);
    }
    console.log('---');
    return { code: 0 };
}

function login(params) {
    console.log('--- 模拟登陆账号 ---');
    for (const key in params) {
        console.log(`${key}：${params[key]}`);
    }
    console.log('---');
    // 模拟接口服务器返回错误信息；
    if (params['username'] != 'test001' || params['password'] != '123456') {
        return { code: 400001, message: '账号或密码错误' }
    }
    return { code: 0 };
}

const interceptors = [{
    preHandle({ args, errors }) {
        const { username, password, password2, email, captcha } = args[0];
        if (!username) {
            errors.push("账号不能为空");
        }
        if (!password || !password2) {
            errors.push("（二次）密码不能为空");
        }
        else {
            if (password && password2 && (password != password2)) {
                errors.push("二次密码输入不正确");
            }
        }
        if (!email) {
            errors.push("邮箱不能为空");
        }
        else {
            if (!emailRule.test(email)) {
                errors.push("邮箱格式不正确");
            }
        }
        if (!captcha) {
            errors.push("验证码不能为空");
        }
    }
}];

register = applyingInterceptors(register, interceptors);

const interceptors2 = [{
    preHandle({ args, errors }) {
        const { email } = args[0];
        if (!email) {
            errors.push("邮箱不能为空");
        }
        else {
            if (!emailRule.test(email)) {
                errors.push("邮箱格式不正确");
            }
        }
    }
}, {
    group: 2,
    preHandle({_this }) {
        if (_this.cd != CD) {
            return 0;
        }
        let timer = setInterval(() => {
            _this.cd = _this.cd - 1;
            _this.btnText = `${_this.cd}秒后重试`;
            if (_this.cd === 0) {
                _this.cd = CD;
                _this.btnText = defaultBtnText;
                clearInterval(timer);
            }
        }, 1000);
    }
}];

const interceptors3 = [
    onlyOneClickInterceptor
];

const interceptors4 = [
    {
        preHandle: disabledInterceptorPreHandle,
        paramName: 'btnDisabled2',
        // rollback: ({ args, _this, interceptor, errors }) => {
        //     _this[interceptor.paramName] = false;
        // }
    },
    {
        group: 2, paramName: 'btnDisabled2',
        preHandle: timeoutRollback // 在新增的拦截器中添加了一个延迟解除禁用的处理器
    }
];

export default {
    name: "App",
    data() {
        return {
            formData: {
                username: "",
                password: "",
                password2: "",
                email: "",
                captcha: ""
            },
            formData2: {
                username: "",
                password: ""
            },
            btnDisabled: false,
            btnDisabled2: false,
            btnText: defaultBtnText,
            cd: CD, activeName: 'first'
        };
    },
    created() {
        sendEmailVerifyCode = applyingInterceptors(sendEmailVerifyCode, interceptors2).bind(this);
        this.onlyOneClick = applyingInterceptors(this.onlyOneClick, interceptors3).bind(this);
        this.login = applyingInterceptors(this.login, interceptors4).bind(this);
    },
    methods: {
        async register() {
            try {
                const resp = await register(this.formData);
                if (resp && resp.code == 0) {
                    this.$message.success("注册成功");
                }
            } catch (error) {
                console.log(error);
                if (error instanceof CustomException) {
                    this.$message.error(error.defaultErrorMessage);
                }
            }
        },
        async sendEmailVerifyCode() {
            try {
                const params = {
                    email: this.formData.email
                };
                const resp = await sendEmailVerifyCode(params);
                if (resp && resp.code == 0) {
                    this.$message.success("发送成功");
                }
            } catch (error) {
                console.log(error);
                if (error instanceof CustomException) {
                    this.$message.error(error.defaultErrorMessage);
                }
            }
        },
        // 如在某些场景下，防止用户多次提交表单
        onlyOneClick() {
            window.alert("该按钮只允许点击一次");
        },
        async login() {
            const resp = await login(this.formData2);
            if (resp && resp.code == 0) {
                this.$message.success("登陆成功");
            }
            else {
                this.$message.error(resp.message || '登陆失败');
            }
            return resp;
        }
    }
};
</script>

<style lang="styl" scoped>
.container {
    width: 1024px;
    margin: 100px auto 0;
}

.container div {
    color: #606266;
}
</style>
