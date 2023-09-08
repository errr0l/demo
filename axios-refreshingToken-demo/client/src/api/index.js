import request from '@/util/request';

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
        params: data
    });
}