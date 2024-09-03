import {request} from "./request";

/**
 * 登录函数
 *
 * 本函数通过调用uni.request向服务器发起登录请求，实现用户登录功能
 * 使用POST方法提交用户登录信息，以获取服务器响应的登录结果
 *
 * @param {Object} data - 登录所需的数据对象，通常包含用户名和密码等信息
 * @return {Promise} 返回一个Promise对象，该对象代表请求的结果
 *                   通过这个Promise，可以处理登录成功或失败的情况
 */
export function login(data) {
    return request({
        url: `login`,
        method: 'POST',
        data: data
    });
}


export function getUserInfo() {
    return request({
        url: `user/info`,
    });
}