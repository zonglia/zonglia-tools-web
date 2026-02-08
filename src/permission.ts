import router from '@/router'
import useUserStore from '@/store/modules/user'
import usePermissionStore from '@/store/modules/permission'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { constantRoutes } from "@/router";

// 配置NProgress
NProgress.configure({
    showSpinner: false, // 禁用旋转动画
    easing: 'ease',
    speed: 500
})

const whiteList = ['/404', '/401', '/index', '/login', '/test1', '/scraprate', '/costevaluation', '/kindsetting', '/system/user'] // 白名单路由

// 重置路由为常量路由的函数
async function resetToConstantRoutes() {
    // 获取当前所有路由
    const currentRoutes = router.getRoutes();

    // 1. 移除所有现有路由
    currentRoutes.forEach(route => {
        if (route.name) {
            router.removeRoute(route.name);
        }
    });

    // 2. 重新添加常量路由
    constantRoutes.forEach(route => {
        router.addRoute(route);
    });

    // 3. 更新侧边栏路由
    usePermissionStore().setSidebarRouters(constantRoutes);
}

router.beforeEach(async (to: any, from: any, next) => {
    document.title = 'ZongLia-' + to.meta.title
    NProgress.start();
    const userStore = useUserStore()
    const hasToken = userStore.token
    // 1. 判断是否有token
    if (hasToken) {
        // 携带token获取用户信息和路由
        if (userStore.roles.length === 0) {

            try {
                await userStore.userInfo()
                await usePermissionStore().generateRoutes().then((accessRoutes: any) => {
                    console.log('accessRoutes' + JSON.stringify(accessRoutes));

                    // roles权限生成可访问的路由表
                    accessRoutes.forEach((route: any) => {

                        if (!route.path.startsWith('/')) {
                            route.path = `/${route.path}`;
                        }
                        router.addRoute(route);
                    });
                    console.log('所有路由表:', router.getRoutes());
                    next({ ...to, replace: true });
                });
            } catch (error) {
                console.error('获取用户信息失败:', error)
                userStore.userLogout()
                next('/login')
                return
            }
        }
        else {
            next()
        }
        // 未登录状态
    } else {
        // 未登录状态
        // 重置路由为常量路由
        // ?. 可选链操作符：如果constantRoutes[0]存在则取name，否则返回undefined
        //constantRoutes[0]?.name

        // ! 非空断言：告诉TypeScript"我确信这个值一定存在"
        // constantRoutes[0]?.name!
        if (usePermissionStore().sidebarRouters.length === 0 ||
            !router.hasRoute(constantRoutes[0]?.name!)) {
            await resetToConstantRoutes();
        }


        // 在白名单中，直接放行
        if (whiteList.includes(to.path)) {
            next()
        } else {
            // 不在白名单中，跳转到首页
            next('/index')
        }
    }
})

router.afterEach((to: any, from: any) => {
    NProgress.done();
})