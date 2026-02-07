import request from '@/utils/request'

import type { RolePageResponse } from './type'

const API = {
    GET_ROUTERS: '/system/role',
};


/**
 * 分页查询角色列表
 * @param page 当前页码
 * @param limit 每页条数
 * @param roleName 可选角色名称（模糊查询）
 */
export const getRoleList = (page: number, limit: number, roleName?: string) => {
    return request.get<any,RolePageResponse>(API.GET_ROUTERS + `/${page}/${limit}`, {
        params: { roleName },  // 查询参数自动拼接到URL
    });
};