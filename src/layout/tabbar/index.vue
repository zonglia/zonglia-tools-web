<template>
  <div class="tabbar_container">
    <div class="tabbar_left">
      <!-- 动态图标：根据fold状态切换 -->
      <SvgIcon
        :name="settingStore.fold ? 'fold' : 'expand'"
        size="1rem"
        @click="toggleFold"
      />
      <el-breadcrumb :separator-icon="ArrowRight" style="font-size: 1rem">
        <el-breadcrumb-item
          v-for="(item, index) in $route.matched"
          :key="index"
          v-show="item.meta.title"
        >
          <template v-if="item.meta?.icon">
            <SvgIcon
              v-if="item.meta?.icon"
              :name="item.meta.icon"
              size="14px"
              style="vertical-align: middle; margin-right: 4px"
            />
          </template>
          {{ item.meta?.title || item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar_right">
      <el-button size="small" :icon="Refresh" circle @click="updateRefresh"></el-button>
      <el-button size="small" :icon="FullScreen" circle @click="fullScreen"></el-button>
      <el-button size="small" :icon="Setting" circle></el-button>
      <img
        src="../../../public/cat.jpg"
        style="width: 20px; height: 20px; margin: 0 1rem"
        alt=""
      />

      <el-dropdown>
        <span class="el-dropdown-link">
          admin
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight,
  ArrowDown,
  Refresh,
  FullScreen,
  Setting,
} from "@element-plus/icons-vue";
import useLayOutSettingStore from "@/store/modules/setting";

// 使用全局状态管理
const settingStore = useLayOutSettingStore();

// 切换折叠状态
const toggleFold = () => {
  settingStore.fold = !settingStore.fold;
};

const updateRefresh = () => {
  settingStore.refresh = !settingStore.refresh;
};

// 兼容谷歌浏览器的全屏功能
const fullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
</script>

<style scoped lang="scss">
.tabbar_container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  /* 线性渐变背景 */
  background: linear-gradient(45deg, #409eff, #67c23a);
  .tabbar_left {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    gap: 1rem;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
    padding: 0 1rem;
  }
}
</style>
