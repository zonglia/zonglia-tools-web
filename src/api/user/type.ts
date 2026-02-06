// 登录接口需要携带参数ts类型
export interface loginFormData {
    username: string
    password: string
}
interface datatype {
    token?: string
}
// 登录接口返回数据类型
export interface loginResponseData {
    code: number
    message: string
    data: datatype // 定义一个动态的 map 类型
}

// 登录接口返回数据类型
export interface loginResponseData {
    code: number
    message: string
    token?: string
}


// 用户信息接口返回类型
export interface UserInfoResponse {
    msg: string
    code: number
    permissions: string[]
    roles: string[]
    user: UserInfo
}


// 用户权限信息
export interface UserInfo {
    useNo: string
    useName: string
    password: string
    isJinYong: number
    workspace: string
    deptId: string
    roles: string[] | null
    admin: boolean
}
