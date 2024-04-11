import axios from 'axios';
// import { refresh } from '@/api/index';
import { Message, MessageBox } from 'element-ui';
// import bus from "@/utils/bus.js";

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

// const maxRetryingCount = 3;
// const queue = [];

// let retrying = false;

const service = axios.create({
    baseURL: "http://localhost:8088",
    timeout: 5000,
    // retryingCount: maxRetryingCount,
    // enableRetrying: true // 是否启用重试
});

/**
 * 通知方法
 * @param {Number} type - 通知类型；1=gotoLoginPage，2=Message.error
 * @param {Object} resp - 响应对象
 * @returns 
 */
 const notice = (type, resp) => {
    if (resp.config && resp.config.silence) {
        return;
    }

    const data = resp.data;
    // 目前只有两种通知类型
    if (type == 1) {
        // gotoLoginPage(data.message, router.app.$route);
        MessageBox("请先登录", "提示", { confirmButtonText: '确定' }).then(() => {});
    }
    else if (type == 2) {
        Message.error(data.message || "系统发生异常");
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

// 静默拦截器；
// 如果state.silence为true，就把silence移到config；
// 此处使用localStorage、vuex（vue）作为代替也是可以的；
const silenceInterceptor = config => {
    if (!config.silence) {
        const silence = sessionStorage.getItem('silence');
        if (silence == 'true') {
            config.silence = true;
        }
    }
    return config;
}

async function respHandler(resp) {
    const data = resp.data;
    if (data.error) {
        notice(2, resp);
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

service.interceptors.request.use(silenceInterceptor);

// 设置响应拦截器
service.interceptors.response.use(
    response => {
        return respHandler(response) || {};
    },
    error => {
        console.error('请求过程中发生错误：', error);
        // 如果有响应（由接口服务器返回），就交给respHandler函数处理
        if (error.response && error.response.data && error.response.data.code) {
            return respHandler(error.response);
        }

        // 可以选择跳到错误页面；（如error.vue）
        _Message.error(error.message || "系统发生异常");

        console.error('错误处理失败.');
        return Promise.reject(error);
    }
);

export default service;
