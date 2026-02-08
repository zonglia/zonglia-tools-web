import { createWebHistory, createRouter } from "vue-router";

/* Layout */
export const Layout = () => import("@/layout/index.vue");

// 公共路由
export const constantRoutes = [

    // 首页
    {
        path: "/",
        name: 'Layout',
        component: Layout,
        redirect: "/index",
        children: [
            {
                path: "index",
                component: () => import("@/views/home/index.vue"),
                name: "Index",
                meta: { title: "首页", icon: "home", affix: true }
            }
        ]
    },
];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [

];

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
    // 刷新时，滚动条位置还原
    //scrollBehavior: () => ({ left: 0, top: 0 }),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

export default router;