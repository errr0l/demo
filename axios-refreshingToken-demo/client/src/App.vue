<template>
    <div id="app" class="container">
        <el-card>
            <div slot="header">
                <span>axios-refreshingToken-demo</span>
            </div>
            <el-form ref="form" label-width="140px">
                <el-form-item label="-- 注意事项 --">
                    <div style="font-size: 14px;">
                        <span>1、刷新token时，若refreshToken没有过期，则不会返回，但登陆时，会颁发新的双令牌；</span>
                        <span>2、清除token指的是前后端一起清除；</span>
                        <span>3、可以点击《只清除accessToken》后，使用《获取数据》接口测试刷新令牌效果；</span>
                        <span>4、可以通过在服务端打断点，不响应请求的方式测试重发请求的效果；</span>
                        <span>5、可以在清除accessToken后，点击《并发获取数据》来测试axios重发时产生的请求队列效果【接口都推荐结合浏览器network选项查看】。</span>
                    </div>
                </el-form-item>
                <el-form-item label="-- 账户信息 --">
                    <p>用户名: {{ formData.username }} | 密码: {{ formData.password }} | 登陆状态: {{ signed ? '已登录' : '未登录' }}</p>
                </el-form-item>
                <el-form-item label="-- 令牌 --">
                    <div>
                        <p  style="word-break: break-all;">accessToken：{{ token.accessToken || "-" }}</p>
                        <p style="word-break: break-all;">refreshToken：{{ token.refreshToken || "-" }}</p>
                    </div>
                </el-form-item>
                <el-form-item label="-- 接口数据 --">
                    <div>{{ testData }}</div>
                </el-form-item>
                <el-form-item label="-- 操作 --">
                    <el-button type="primary" size="mini" @click="login">登陆</el-button>
                    <el-button type="primary" size="mini" @click="getTestData">获取数据</el-button>
                    <el-button type="primary" size="mini" @click="getTestDataWithConcurrency">并发获取数据</el-button>
                    <el-button type="primary" size="mini" @click="popup">模拟延迟获取数据</el-button>
                    <el-button type="primary" size="mini" @click="refresh">刷新token</el-button>
                    <el-button type="primary" size="mini" @click="logout">清除token</el-button>
                    <el-button type="primary" size="mini" @click="clearAccessToken">只清除accessToken</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { login, logout, refresh, getTestData } from "@/api/index.js";
import request from '@/util/request';
import bus from "@/util/bus.js";

export default {
    name: "App",
    data() {
        return {
            formData: {
                username: "test",
                password: "123456"
            },
            token: {
                accessToken: window.localStorage.getItem("accessToken") || "",
                refreshToken: window.localStorage.getItem("refreshToken") || ""
            },
            testData: "未获取到"
        };
    },
    created() {
        // 布尔值
        bus.$on("clear:token", ({ accessToken, refreshToken }) => {
            if (accessToken) {
                this.token.accessToken = "";
            }
            if (refreshToken) {
                this.token.refreshToken = "";
            }
        });
        bus.$on("refresh:token", ({ accessToken, refreshToken }) => {
            if (accessToken) {
                this.token.accessToken = accessToken;
            }
            if (refreshToken) {
                this.token.refreshToken = refreshToken;
            }
        });
    },
    computed: {
        signed() {
            return !!this.token.accessToken;
        }
    },
    methods: {
        async login() {
            const resp = await login(this.formData);
            if (resp.code === 0) {
                this.$message.success("操作成功");
                const { accessToken, refreshToken } = resp.data;
                this.token.accessToken = accessToken;
                this.token.refreshToken = refreshToken;
                window.localStorage.setItem("accessToken", accessToken);
                window.localStorage.setItem("refreshToken", refreshToken);
            }
        },
        async logout() {
            const resp = await logout();
            if (resp.code === 0) {
                this.$message.success("操作成功");
                this.token.accessToken = "";
                this.token.refreshToken = "";
                window.localStorage.setItem("accessToken", "");
                window.localStorage.setItem("refreshToken", "");
            }
        },
        async refresh() {
            const resp = await refresh({ refreshToken: this.token.refreshToken });
            if (resp.code === 0) {
                this.$message.success("操作成功");
                const { accessToken, refreshToken } = resp.data;
                this.token.accessToken = accessToken;
                window.localStorage.setItem("accessToken", accessToken);
                if (refreshToken) {
                    this.token.refreshToken = refreshToken;
                    window.localStorage.setItem("refreshToken", refreshToken);
                }
            }
        },
        async getTestData() {
            const resp = await getTestData();
            if (resp.code === 0) {
                this.$message.success("操作成功");
                this.testData = JSON.stringify(resp.data);
            }
        },
        // 只是前端丢弃【其实token还是可以用的】
        clearAccessToken() {
            this.token.accessToken = "";
            window.localStorage.setItem("accessToken", "");
        },
        getTestDataWithConcurrency() {
            Promise.all([getTestData(), getTestData()]).then(resps => {
                let str = "";
                for (const item of resps) {
                    str += JSON.stringify(item.data);
                    str += "\n";
                }
                this.testData = str;
                this.$message.success("操作成功");
            });
        },
        async popup() {
            this.$confirm('请选择一个预定的请求结果', '提示', {
                confirmButtonText: '成功请求',
                cancelButtonText: '失败请求'
            }).then(() => {
                this.getTestDataWithDelay(5);
            }).catch(() => {
                this.getTestDataWithDelay(20);        
            });
        },
        async getTestDataWithDelay(delay) {
            this.$message.success("请求已发送，请在浏览器控制台和network查看效果");
            const resp = await request({
                url: '/api/test',
                method: 'get',
                params: {
                    delay, // 如果需要测试请求失败的效果，只需把delay参数调大即可
                },
                configHandler: function() {
                    this.params.delay--;
                },
                // enableRetrying: false
            });
            if (resp.code === 0) {
                this.$message.success("操作成功");
                this.testData = JSON.stringify(resp.data);
            }
        }
    }
};
</script>

<style lang="styl" scoped>
.container {
    width: 1024px;
    margin: 30px auto 0;
}

.container div {
    color: #606266;
}
</style>
