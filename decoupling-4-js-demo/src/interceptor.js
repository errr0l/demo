// 【按钮】禁用拦截器前置处理
const disabledInterceptorPreHandle = ({ args, _this, interceptor, errors }) => {
    const { paramName } = interceptor;
    if (_this[paramName]) {
        return 0;
    }
    _this[paramName] = true;
};

// 执行发生异常时，将禁用状态解除
const onlyOneClickInterceptorRollback = ({ args, _this, interceptor }) => {
    const { paramName } = interceptor;
    _this[paramName] = false;
};

// 让按钮只允许点击一次的拦截器【如防止多次提交】；
export const onlyOneClickInterceptor = {
    group: 2,
    paramName: 'btnDisabled',
    preHandle: disabledInterceptorPreHandle,
    rollback: onlyOneClickInterceptorRollback
};

// 如果有多个需要禁用，则再进行拓展；
// export const onlyOneClickInterceptor = {
//     group: 2,
//     paramName: 'btn2Disabled',
//     preHandle: disabledInterceptorPreHandle,
//     rollback: onlyOneClickInterceptorRollback
// };

// export const onlyOneClickInterceptor = {
//     group: 2,
//     paramName: 'btn3Disabled',
//     preHandle: disabledInterceptorPreHandle,
//     rollback: onlyOneClickInterceptorRollback
// };