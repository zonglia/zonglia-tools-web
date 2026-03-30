import request from "@/utils/request";

import type {
    loginFormData,
    loginResponseData,
    UserInfoResponse,
    SysUser,
    SysUserResponse,
} from "./type";

const API = {
    LOGIN_URL: "/login",
    GET_INFO: "/getInfo",
    ALLUSER_URL: "/system/user/list",
    UPDATEUSER_URL: "/system/user",
    ADDUSER_URL: "/system/user"
};

// 登录接口
// export const reqLogin = (data: loginFormData) => {
//   return request.post<any, loginResponseData>(API.LOGIN_URL, data)
// }
export const reqLogin = (data: loginFormData) => {
    return request.post<any, loginResponseData>(API.LOGIN_URL, data);
};

export const getInfo = () => {
    return request.get<any, UserInfoResponse>(API.GET_INFO);
};

export const listUser = (page: number, limit: number) => {
    return request.get<any, SysUserResponse>(API.ALLUSER_URL + `?${page}&${limit}`);
};

// 修改用户接口
export const reqUpdateUser = (data: SysUser) => {
    return request.put<any, any>(API.UPDATEUSER_URL, data);
};

// 新增用户接口
export const reqAddUser = (data: SysUser) => {
    return request.post<any, any>(API.UPDATEUSER_URL, data);
};