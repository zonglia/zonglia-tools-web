import { defineStore } from 'pinia'
import { getRouters } from '@/api/system/menu'
import type { PermissionState } from './types/type'
import Layout from '@/layout/index.vue'
// 匹配views里面所有的.vue文件
const modules = import.meta.glob("@/views/**/*.vue");
import { constantRoutes } from "@/router";


const usePermissionStore = defineStore('permission', {
    state: (): PermissionState => ({
        sidebarRouters: [] as any,  // 侧边栏路由
    }),

    actions: {
        setSidebarRouters(routes: any) {
            this.sidebarRouters = routes;
        },
        async generateRoutes(roles?: string[]) {
            try {
                // 向后端请求路由数据
                const res = await getRouters();

                if (res.code === 200) {
                    const data = res.data;
                    // 深拷贝路由数据
                    const sdata = JSON.parse(JSON.stringify(data));
                    const rdata = JSON.parse(JSON.stringify(data));

                    // 过滤生成侧边栏路由
                    const sidebarRoutes = filterAsyncRouter(sdata);
                    // 过滤生成重写路由
                    const rewriteRoutes = filterAsyncRouter(rdata);

                    this.setSidebarRouters(
                        constantRoutes.concat(sidebarRoutes)
                    );

                    return rewriteRoutes;
                }
            } catch (error) {
                // 这里可以根据需要处理错误
                console.error('Failed to generate routes:', error);
                throw error; // 重新抛出错误以便外部捕获
            }
        }
    },
    getters: {

    }
})



/**
 * 过滤并转换后端返回的异步路由配置
 * 
 * @param {Array} asyncRouterMap - 后端返回的异步路由配置数组
 * @param {boolean|Object} [lastRouter=false] - 上一个路由对象或标志位
 * @param {boolean} [type=false] - 处理类型标志，为true时需要特殊处理子路由
 * @returns {Array} 处理后的路由配置数组
 */
// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap: any[], isTopLevel = true): any[] {
    return asyncRouterMap.filter((route) => {

        // 顶级路由以 / 开头，子路由保持相对路径
        if (route.path) {
            if (isTopLevel && !route.path.startsWith('/')) {
                route.path = `/${route.path}`;
            } else if (!isTopLevel && route.path.startsWith('/')) {
                route.path = route.path.slice(1); // 移除子路由错误的 /
            }
        }

        // 处理组件
        if (route.component) {
            if (route.component === "Layout") {
                route.component = Layout;
            } else {
                route.component = loadView(route.component);
            }
        }

        // 递归处理子路由
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children, false); // 子路由 isTopLevel = false
        } else {
            delete route.children;
            delete route.redirect;
        }

        return true;
    });
}




export const loadView = (view: any) => {
    let res;
    // console.log(view);//输出system/user/index
    for (const path in modules) {
        const dir = path.split("views/")[1].split(".vue")[0];//输出dirsystem/user/index

        if (dir === view) {
            res = () => modules[path]();
        }
    }
    return res;
};
export default usePermissionStore