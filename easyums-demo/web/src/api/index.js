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