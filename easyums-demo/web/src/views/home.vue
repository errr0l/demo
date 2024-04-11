<template>
    <div id="app" class="container">
        <div style="margin-bottom: 30px;">
            <span>easyums-demo</span>
        </div>
        <div></div>
        <div v-if="signed">
            <div style="margin-bottom: 10px;">{{ user.username }}</div>
            <ul>
                <li style="margin-bottom: 10px;">
                    <el-button type="text" @click="test1">测试接口1[不携带访问令牌]</el-button>
                </li>
                <li>
                    <el-button type="text" @click="test2">测试接口2[携带访问令牌]</el-button>
                </li>
            </ul>
        </div>
        <div v-else>
            你好，请登陆
        </div>
        <div>
            <el-button type="text" @click="$router.push('/login')">前往登陆</el-button>
        </div>
    </div>
</template>

<script>
import axios, { AxiosError } from 'axios';

export default {
    name: "App",
    data() {
        return {
            user: {}
        };
    },
    created() {
        this.user = this.$store.state.user.user;
    },
    computed: {
        signed() {
            if (!this.user) {
                return false;
            }
            return this.user.id;
        },
    },
    methods: {
        // without access token
        async test1() {
            await this.test("");
        },
        async test2() {
            const accessToken = window.localStorage.getItem("accessToken");
            const resp = await this.test(accessToken);
            if (resp) {
                this.$message.success(resp.message);
            }
        },
        async test(token) {
            try {
                const headers = {};
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
                const resp = await axios({
                    baseURL: "http://localhost:8088",
                    url: "/test/1",
                    headers: headers
                });
                return resp.data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    const data = error.response.data;
                    this.$message.error(data.message || "未知错误");
                    return;
                }
                this.$message.error(error.message || "未知错误");
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
