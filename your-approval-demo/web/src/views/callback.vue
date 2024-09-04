<template>
    <div class="app-container my-app-container" style="height: 100vh;">
        <div>oauth-callback</div>
        <el-dialog :visible.sync="dialogVisible" title="授权失败" width="40%" class="x-el-dialog styl-1" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
            <div style="margin-bottom: 20px;">
                <el-alert
                    :title="error"
                    :description="description" show-icon :closable="false"
                    type="error">
                </el-alert>
            </div>
            
            <div style="text-align: right;">
                <el-button type="primary" size="mini" @click="$router.replace('/login')">返回登录</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { loginByOauth as login } from "@/api";

export default {
    data() {
        return {
            error: "",
            description: "",
            code: "",
            dialogVisible: false,
            redirect: "",
        }
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
        const { error, error_description, code } = this.$route.query;
        if (error) {
            this.dialogVisible = true;
            this.error = error;
            this.description = error_description;
            return;
        }
        if (!code) {
            this.dialogVisible = true;
            this.description = "授权码不能为空";
            return;
        }

        this.code = code;
        this.loginByCode(code);
    },
    methods: {
        async loginByCode(code) {
            const resp = await login({ code });
            if (!resp.error) {
                // 如果没有返回令牌，表示该用户未注册
                const respData = resp.payload;
                if (!respData.accessToken) {
                    sessionStorage.setItem('userinfo', JSON.stringify(respData.baseInfo));
                    return this.$router.replace("/register?from=oauth&code="+this.code);
                }
                // 登陆成功
                else {
                    this.$message.success("登陆成功");
                    this.$router.push({ path: this.redirect || '/' });
                    const { accessToken, refreshToken, baseInfo: user } = respData;
                    this.$store.dispatch('user/saveLoginInfo', { accessToken, refreshToken, user });
                    return;
                }
            }
            this.error = "授权失败";
            this.description = resp.message || "";
            this.dialogVisible = true;
        },
    }
}
</script>