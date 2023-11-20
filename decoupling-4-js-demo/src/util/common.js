import { CustomException } from "@/exception/CustomException";

export const emailRule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/;

/**
 * 执行拦截器链【_run2同理】
 * @param {Array} interceptors 拦截器列表
 * @param {Array} args 被拦截方法的参数列表
 * @param {Object} _this 绑定的this
 * @param {Array} errors 错误信息列表
 * @returns {Number}
 */
const _run = async (interceptors, args, _this, errors) => {
    let continued;
    for (const interceptor of interceptors) {
        if (!interceptor.isPreHandleFunction) {
            continue;
        }
        continued = await interceptor.preHandle({ args, _this, interceptor, errors });
        if (continued === 0) {
            break;
        }
    }
    return continued;
}

const _run2 = (interceptors, args, _this) => {
    for (let i = interceptors.length - 1; i > 0; i--) {
        const interceptor = interceptors[i];
        if (!interceptor.isPostHandleFunction) {
            continue;
        }
        interceptor.postHandle({ args, _this, interceptor });
    }
}

// 出现异常时，进行'回滚'；
// 如在preHandle修改了某些状态之后，发生错误时，在rollback进行'回滚'；
const _run3 = (interceptors, args, _this) => {
    for (const interceptor of interceptors) {
        if (!interceptor.isRollbackFunction) {
            continue;
        }
        interceptor.rollback({ args, _this, interceptor });
    }
}

/**
 * 为指定的方法/函数应用拦截器；
 * 需要注意的是，如果要读取this的属性，则需要自行绑定this；
 * 此方法会对所有的方法做异步处理；
 * @param {Function} fn 被包装的方法/函数
 * @param {Array.<{preHandle: Function, postHandle: Function, rollback: Function, group: Number}>} interceptors - 拦截器数组
 * @param {Function} Array[0].preHandle 前置处理；处理函数可以返回0，表示不再往下执行（不是undefined、false，也不是null和空字符串）
 * @param {Function} Array[0].postHandle 后置处理；
 * @param {Function} Array[0].rollback 异常处理；
 * @param {Function} Array[0].group 分组；group=1或不设置分组时，为默认分组，该组会有错误信息产生；group=2为额外分组，该组会接着分组1后执行，但若有错误信息时，则不会执行
 * @returns {Function}
 */
export const applyingInterceptors = (fn, interceptors = []) => {
    const group1 = [];
    const group2 = [];
    // 对所有的拦截器进行初始化
    for (const interceptor of interceptors) {
        if (!interceptor.group || interceptor.group == 1) {
            group1.push(interceptor);
        }
        else if (interceptor.group == 2) {
            group2.push(interceptor);
        }
        interceptor.isPreHandleFunction = typeof interceptor.preHandle == 'function';
        interceptor.isPostHandleFunction = typeof interceptor.postHandle == 'function';
        interceptor.isRollbackFunction = typeof interceptor.rollback == 'function';
    }
    const anonymous = async function (...args) {
        const errors = [];
        let _this = this;
        // 执行_run()时，如果返回了0，则表示不再继续往下执行；
        let continued = await _run(group1, args, _this, errors);
        if (errors.length) {
            throw new CustomException('执行过程出现错误', errors);
        }
        let result = null;
        try {
            if (continued === 0) {
                return;
            }
            continued = await _run(group2, args, _this, errors);
            if (continued === 0) {
                return;
            }
            result = await fn.apply(_this, args);
            // 如果调用fn()没有出现异常，则调用_run2，即postHandle；
            _run2(group2, args, _this);
            _run2(group1, args, _this);
        } catch (e) {
            console.log("[applyingInterceptors]执行方法/函数出现异常：" + e.message);
            // 如果调用fn()出现异常，则调用_run3，即rollback；
            _run3(group1, args, _this);
            _run3(group2, args, _this);
        }
        return result;
    }
    return anonymous;
}