import config from '../config'; // 确保路径正确

import { useUserStore } from "../store/user";


//拼接url
const baseURL = config.baseUrl ? `http${config.https ? 's' : ''}://${config.baseUrl}` : '';

export function request(options) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseURL + options.url + '/api/',
            header: {
                Authorization: useUserStore().getToken() ? `${useUserStore().getToken()}` : '',
                ...options.header
            },
            ...options,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
}
