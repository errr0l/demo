import request from '@/utils/request';

export function loginByOauth(data) {
    return request({
        url: '/oauth/login',
        method: 'post',
        data,
        silence: true
    });
}

export function register(data) {
    return request({
        url: '/oauth/register',
        method: 'post',
        data
    });
}

export function refresh(data) {
    return request({
        url: '/api/refresh',
        method: 'post',
        data
    });
}

export function login(data) {
    return request({
        url: '/api/login',
        method: 'post',
        data,
        test: '123'
    });
}

export function logout() {
    return request({
        url: '/api/logout',
        method: 'post'
    });
}

export function getTestData(data) {
    return request({
        url: '/api/test',
        method: 'get',
        params: data,
        enableRetrying: false
    });
}

export function getTestData2(data) {
    return request({
        url: '/api/test2',
        method: 'get',
        params: data,
        silence: true
    });
}