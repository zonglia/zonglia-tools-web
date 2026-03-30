// 登录接口需要携带参数ts类型
export interface loginFormData {
    username: string
    password: string
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






// 基础响应类型
export interface BaseResponse<T = any> {
    total: number;
    rows: T[];
    code: number;
    msg: string;
}

// 基础实体类型
export interface BaseEntity {
    createBy?: string | null;
    createTime?: string | null;
    updateBy?: string | null;
    updateTime?: string | null;
    remark?: string | null;
}

// 部门类型
export interface SysDept extends BaseEntity {
    deptId: string;
    techno?: string | null;
    deptName?: string | null;
    orderNum?: string | null;
    delFlag?: string | null;
}

// 角色类型（简化）
export interface SysRole {
    roleId?: number;
    roleName?: string;
    roleKey?: string;
    roleSort?: number;
    dataScope?: string;
    status?: string;
    remark?: string;
    [key: string]: any;
}

// 用户类型
export interface SysUser extends BaseEntity {
    userId?: number;
    deptId?: number;
    userName: string;
    nickName: string;
    email?: string;
    phonenumber?: string;
    sex?: string; // "0":女, "1":男
    avatar?: string;
    password: string | null;
    status?: string; // "0":正常, "1":停用
    roles?: SysRole[];
    delFlag?: string; // "0":正常, "2":删除
    loginIp?: string;
    loginDate?: string;
    pwdUpdateDate?: string | null;
    dept?: SysDept;
    admin?: boolean;
    roleIds?: number[],
    postIds?: number[]
}

// 用户响应类型
export type SysUserResponse = BaseResponse<SysUser>;

