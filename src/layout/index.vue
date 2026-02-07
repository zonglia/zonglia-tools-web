// Home主页
<template>
  <div class="layout_container">
    <div class="layout_sidebar">
      <Logo />
      <div style="height: calc(100%-50px)">
        <!-- 展示菜单 -->
        <el-scrollbar class="scrollbar">
          <el-menu
            :default-active="activeMenu"
            background-color="#2F4050"
            text-color="#fff"
            mode="vertical"
            :collapse="settingStore.fold"
            @select="handleMenuSelect"
            :collapse-transition="false"
            ><Menu :menuList="sidebarRouters" />
          </el-menu>
        </el-scrollbar>
      </div>
    </div>
    <div class="layout_tabbar">layout_tabbar</div>
    <!-- 内容展示区 -->
    <div class="layout_main">
      <router-view></router-view>
    </div>
    <!-- 登录弹窗 -->
    <LoginDialog v-model="loginDialogVisible" />
  </div>
</template>

<script setup lang="ts">
import Logo from "@/layout/logo/index.vue";
import Menu from "@/layout/menu/index.vue";
import Main from "@/layout/main/index.vue";
import useUserStore from "@/store/modules/user";
import LoginDialog from "@/views/login/index.vue";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import useLayOutSettingStore from "@/store/modules/setting";
import usePermissionStore from "@/store/modules/permission";
const router = useRouter();
let route = useRoute();
let userStore = useUserStore();
let settingStore = useLayOutSettingStore();
let permissionStore = usePermissionStore();

const loginDialogVisible = ref(!userStore.token);
// 规范化路径（确保始终有前导斜杠）
const normalizePath = (path: string) => {
  return path.startsWith("/") ? path : `/${path}`;
};

// 当前激活菜单项（使用规范化路径）
const activeMenu = ref(normalizePath(route.path));

const handleMenuSelect = (index: string) => {
  activeMenu.value = index;
  router.push(index);
};
const sidebarRouters = computed(() => permissionStore.sidebarRouters);
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100%;
  background-color: red;
  display: flex;
  flex-direction: column; /* 垂直排列 */
  height: 100vh; /* 使容器充满视口高度 */
  // background-color: var(--el-bg-color);
  .layout_sidebar {
    width: $base-menu-width;
    height: 100%;
    background-color: $base-menu-background;
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0;
    left: $base-menu-width;
    background-color: aqua;
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    background-color: bisque;
    overflow: auto; // 自适应滚动条
  }
}
</style>
