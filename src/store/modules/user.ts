// 创建用户相关的小仓库
import { defineStore } from "pinia";
// 引入操作本地存储的工具方法
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
// 引入登录和获取用户信息的接口方法
import { reqLogin, getInfo } from "@/api/user";
import type { loginResponseData, loginFormData, UserInfoResponse } from "@/api/user/type";

// 仓库名User
const useUserStore = defineStore("User", {
    // 小仓库存储数据的地方
    state: () => {
        return {
            name: "",
            avatar: "",
            token: GET_TOKEN(), //用户唯一标识token
            roles: [] as any,
            permissions: [] as any,
        };
    },
    // 处理异步|逻辑的地方
    // 处理异步|逻辑的地方
    actions: {
        // 用户登录方法
        async userLogin(data: loginFormData) {
            const result: loginResponseData = await reqLogin(data);
            // 登录请求：成功200 -> token
            if (result.code == 200) {
                this.token = result.token as string;
                // 本地存储持久化存储一份
                SET_TOKEN(result.token as string);
                // 能保证当前async函数返回一个成功的promise
                return Promise.resolve("ok");
            } else {
                // 它会立即返回一个被拒绝的 Promise
                return Promise.reject(new Error(result.message));
            }
        },
        async userInfo() {
            const result: UserInfoResponse = await getInfo();

            // 登录请求：成功200 -> token
            if (result.code == 200) {
                const user = result.user;
                this.name = user.useName;
                if (result.roles && result.roles.length > 0) {
                    // 验证返回的roles是否是一个非空数组
                    this.roles = result.roles;
                    this.permissions = result.permissions;
                } else {
                    this.roles = ["ROLE_DEFAULT"];
                }
                return Promise.resolve("ok");
            } else {
                return Promise.reject(new Error(result.msg));
            }
        },
        // 用户退出登录方法
        async userLogout() {
            this.token = "";
            REMOVE_TOKEN();
        },
    },
    getters: {
        // 双重取反​ 操作，它的作用是将任意值转换为布尔值（Boolean）
        isLoggedIn: (state) => !!state.token,
    },
});
// 对外暴露获取小仓库的方法
export default useUserStore;
