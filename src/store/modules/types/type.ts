import type { RouteRecordRaw } from 'vue-router'
// 定义小仓库数据state类型
export interface UserState {
    name: string
    avatar: string
    token: string | null
    loginDialogVisible: boolean
    roles: any[]
    permissions: any[]
}

export interface PermissionState {
    sidebarRouters: any[]

}