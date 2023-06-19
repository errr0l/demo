import axios from 'axios';
import { refresh } from '@/api/index';
import { Message, MessageBox } from 'element-ui';
import bus from "@/util/bus.js";

let messageInstance = null;

const _Message = (opts) => {
    if (messageInstance) {
        messageInstance.close();
    }
    messageInstance = Message(opts);
};
const types = ['success', 'warning', 'info', 'error'];

for (let type of types) {
    _Message[type] = (opts) => {
        if (typeof opts === 'string') {
            opts = {
                message: opts
            }
        }
        opts.type = type;
        return _Message(opts);
    };
}

const maxRetryingCount = 3;
const service = axios.create({
    baseURL: "http://localhost:8888/",
    timeout: 5000,
    retryingCount: maxRetryingCount
});

let retrying = false;
const queue = [];

function release(ok) {
    if (queue.length) {
        for (const handler of queue) {
            handler(ok);
        }
        // 释放队列
        queue.length = 0;
    }
}

// token拦截器
export const tokenInterceptor = config => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
}

async function respHandler(resp) {
    const data = resp.data;
    switch (data.code) {
        case 0:
            return data;
        // 未登录或accessToken过期
        case 40101:
            const refreshToken = window.localStorage.getItem("refreshToken");
            if (!refreshToken) {
                return MessageBox("请先登录", "提示", {
                    confirmButtonText: '确定'
                }).then(() => {});
            }
            if (!retrying) {
                retrying = true;
                try {
                    const refreshResp = await refresh({ refreshToken });
                    if (!refreshResp || refreshResp.code !== 0) {
                        throw new Error('刷新失败');
                    }
                    const { accessToken, refreshToken: _new } = refreshResp.data;
                    window.localStorage.setItem("accessToken", accessToken);
                    if (_new) {
                        window.localStorage.setItem("refreshToken", _new);
                    }
                    bus.$emit('refresh:token', { accessToken, refreshToken: _new });
                    release(true);
                    return service(resp.config);
                } catch (error) {
                    console.error("刷新请求出现错误：", error);
                    window.localStorage.setItem("accessToken", "");
                    bus.$emit('clear:token', { accessToken: true });
                } finally {
                    retrying = false;
                }
            }
            // 在并发请求的情况下，将后续的请求加入队列
            else {
                return new Promise((resolve, reject) => {
                    queue.push((ok) => {
                        // 刷新成功成功后，重新发起请求
                        if (ok) {
                            resolve(service(resp.config));
                        }
                        else {
                            reject('refreshing failure.');
                        }
                    });
                });
            }
            break;
        case 40198:
            window.localStorage.setItem("refreshToken", "");
            bus.$emit('clear:token', { refreshToken: true });
            _Message.error(data.message || "请重新登陆");
            break;
        default:
            _Message.error(data.message || "系统发生异常");
    }
    return data;
}

// 设置请求拦截器
service.interceptors.request.use(
    tokenInterceptor,
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

// 设置响应拦截器
service.interceptors.response.use(
    async response => {
        return respHandler(response) || {};
    },
    error => {
        if (error.response) {
            return respHandler(error.response);
        }

        // 可以拓展更多的需要重发请求的情况
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout of')) {
            if (error.config.retryingCount > 0) {
                error.config.retryingCount--;
                let current = Math.abs(error.config.retryingCount - maxRetryingCount);
                console.error("第" + current + "次重发中...");
                return service(error.config);
            }
            console.error("[" + error.config.url + "] 请求失败，总次数为：" + maxRetryingCount);
            release(false);
        }

        _Message.error(error.message || "系统发生异常");
        return Promise.reject(error);
    }
);

export default service;
