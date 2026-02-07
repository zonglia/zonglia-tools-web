import request from '@/utils/request'

import type { RouteResponseData }  from './type'

const API = {
    GET_ROUTERS: '/getRouters',
};


export const getRouters = () => {
    return request.get<any, RouteResponseData>(API.GET_ROUTERS)
}