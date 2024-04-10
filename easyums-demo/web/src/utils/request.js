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

// function release(ok) {
//     if (queue.length) {
//         for (const handler of queue) {
//             handler(ok);
//         }
//         // 释放队列
//         queue.length = 0;
//     }
// }

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
    // switch (data.code) {
    //     case 0:
    //         return data;
    //     // 未登录或accessToken过期
    //     case 40101:
    //         const refreshToken = window.localStorage.getItem("refreshToken");
    //         if (!refreshToken) {
    //             //MessageBox("请先登录", "提示", { confirmButtonText: '确定' }).then(() => {});
    //             notice(1, resp);
    //             // 修改为break，否则可能导致queue中的请求不会释放的问题
    //             break;
    //         }
    //         if (!retrying) {
    //             retrying = true;
    //             try {
    //                 const refreshResp = await refresh({ refreshToken });
    //                 if (!refreshResp || refreshResp.code !== 0) {
    //                     throw new Error('刷新失败');
    //                 }
    //                 const { accessToken, refreshToken: _new } = refreshResp.data;
    //                 window.localStorage.setItem("accessToken", accessToken);
    //                 if (_new) {
    //                     window.localStorage.setItem("refreshToken", _new);
    //                 }
    //                 bus.$emit('refresh:token', { accessToken, refreshToken: _new });
    //                 release(true);
    //                 return service(resp.config);
    //             } catch (error) {
    //                 // 如果刷新过程中出现错误的话，就直接返回，后续不在发起请求
    //                 // 捕获到的error有两种可能：1）refresh请求时发生的异常；2）上面抛出的Error
    //                 console.error("刷新请求出现错误：", error);
    //                 window.localStorage.setItem("accessToken", "");
    //                 bus.$emit('clear:token', { accessToken: true });
    //             } finally {
    //                 retrying = false;
    //             }
    //         }
    //         // 在多个连续请求的情况下，将请求加入队列
    //         else {
    //             return new Promise((resolve, reject) => {
    //                 queue.push((ok) => {
    //                     // 刷新成功成功后，重新发起请求
    //                     if (ok) {
    //                         resolve(service(resp.config));
    //                     }
    //                     else {
    //                         reject('refreshing failure.');
    //                     }
    //                 });
    //             });
    //         }
    //         break;
    //     case 40198:
    //         window.localStorage.setItem("refreshToken", "");
    //         bus.$emit('clear:token', { refreshToken: true });
    //         // _Message.error(data.message || "请重新登陆");
    //         notice(1, resp);
    //         break;
    //     default:
    //        //  _Message.error(data.message || "系统发生异常");
    //        notice(2, resp);
    // }
    // release(false);
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

        // 可以拓展更多的需要重发请求的情况
        // if (error.config.enableRetrying && (error.code === 'ECONNABORTED' || error.message.includes('timeout of'))) {
        //     if (error.config.retryingCount > 0) {
        //         error.config.retryingCount--;
        //         let current = Math.abs(error.config.retryingCount - maxRetryingCount);
        //         console.warn("第" + current + "次重发中...");
        //         if (error.config.configHandler && typeof error.config.configHandler === 'function') {
        //             error.config.configHandler();
        //         }
        //         return service(error.config);
        //     }
        //     console.error("[" + error.config.url + "] 请求失败，总次数为：" + maxRetryingCount);
        //     release(false);
        // }

        // 可以选择跳到错误页面；（如error.vue）
        _Message.error(error.message || "系统发生异常");

        console.error('错误处理失败.');
        return Promise.reject(error);
    }
);

export default service;
