import request from '@/utils/request'

import type {
    loginFormData,
    loginResponseData,
    UserInfoResponse
} from './type'

const API = {
    LOGIN_URL: '/login',
    GET_INFO:'/getInfo'
};

// 登录接口
// export const reqLogin = (data: loginFormData) => {
//   return request.post<any, loginResponseData>(API.LOGIN_URL, data)
// }
export const reqLogin = (data: loginFormData) => {
    return request.post<any, loginResponseData>(API.LOGIN_URL, data)
}


export const getInfo = () => {
    return request.get<any, UserInfoResponse>(API.GET_INFO)
}
