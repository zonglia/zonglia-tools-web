import type { Component, ComponentOptions } from 'vue'
import type { RouteMeta, RouteRecordRedirectOption } from 'vue-router'

// 定义组件导入类型
type LazyComponent = () => Promise<Component | ComponentOptions>

// 扩展路由元数据
export interface RouteMetaCustom extends RouteMeta {
    title: string
    icon?: string
    noCache?: boolean
    link?: string | null
    hidden?: boolean
    index?: string  // 为Element Plus菜单添加的index属性
  }

// 后端返回结构
export interface BackendRouteRecord {
    name?: string
    path: string
    hidden?: boolean
    redirect?: RouteRecordRedirectOption | null
    component?: string | null
    query?: string
    alwaysShow?: boolean | null
    meta: RouteMetaCustom
    children?: BackendRouteRecord[] | null // 允许null
}

// 前端使用的路由记录接口
export interface RouteRecord {
    path: string
    name?: string
    component?: string | LazyComponent | null
    redirect?: string | null
    hidden?: boolean
    query?: string
    alwaysShow?: boolean | null
    meta: RouteMetaCustom
    children?: RouteRecord[] // 不允许null，只允许undefined或数组
}

// API响应数据结构
export interface RouteResponseData {
    msg: string
    code: number
    data: BackendRouteRecord[]
}


export interface BaseResponse<T> {
    code: number;      // 状态码（200=成功）
    msg: string;        // 操作消息
    data: T;           // 泛型数据体
  }

/**
 * 角色数据项
 */
export interface RoleItem {
    roleId: number;
    roleName: string;
    roleKey: string;
    roleSort: number;
    dataScope: string;  // 数据权限范围（1-全部, 2-自定义...）
    menuCheckStrictly: boolean;
    deptCheckStrictly: boolean;
    status: string;     // 状态（0正常 1停用）
    delFlag: string;    // 删除标志（0存在 2删除）
    remark?: string;   // 可选备注
    admin: boolean;     // 是否管理员角色

    // 时间相关字段
    createBy: string;
    createTime: string;
    updateBy: string | null;
    updateTime: string | null;

    // 关联ID集合
    menuIds: number[] | null;
    deptIds: number[] | null;
    permissions: string[] | null;
}

/**
 * 分页元数据
 */
export interface PaginationParams {
    total: number;    // 总记录数
    size: number;     // 每页条数
    current: number;  // 当前页码
    pages: number;    // 总页数
}

/**
 * 角色分页API响应
 */
export interface RolePageResponse {
    msg: string
    code: number
    data: {
        records: RoleItem[]
        total: number
        size: number
        current: number
        pages: number
    }
}