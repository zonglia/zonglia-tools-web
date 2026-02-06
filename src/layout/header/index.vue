<template>
  <div class="header-content">
    <div>
      <el-switch
        v-model="darkMode"
        :active-action-icon="Moon"
        :inactive-action-icon="Sunny"
        @change="onToggle"
      />
    </div>
    <div class="language-selector">
      <div class="language-trigger">
        {{ t("language") }}
        <SvgIcon name="dropdown" color="--text-color" />
      </div>

      <!-- 下拉菜单（默认隐藏） -->
      <div class="language-menu">
        <div @click="changeLanguage('zh')">中文</div>
        <div @click="changeLanguage('en')">English</div>
      </div>
    </div>

    <!-- 子组件主动通知父组件​ -->
    <div  @click="$emit('show-login')">
      <span>{{ t("login") }}</span>
    </div>
    <div>
      <span>{{ t("register") }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useThemeStore } from "@/store/modules/theme";

const store = useThemeStore();
const darkMode = ref(store.theme === "dark");

const onToggle = () => {
  store.toggleTheme();
};
const { t, locale } = useI18n();

const changeLanguage = (lang: "zh" | "en") => {
  locale.value = lang;
};


const emit = defineEmits(["show-login", "toggle-drawer"]);

</script>

<style scoped lang="scss">
.header-content {
  height: 55px;
  display: flex; /* 启用 Flex 布局 */
  justify-content: flex-end; /* 子元素靠右排列 */
  background-color: var(--el-bg-color);
  color: #fff;
  gap: 1rem;
  align-items: center; /* 垂直居中对齐 */
  border-bottom: 2px solid #dcdfe6;
  color: var(--text-color);
  // 去除主题切换按钮的方格背景
  > div:not(:first-child) {
    // 四个参数​​（padding: 上 右 下 左;）
    padding: 0.5rem;
    height: 100%;
    display: flex;
    align-items: center; /* 垂直居中对齐 */
  }
  :hover:not(:first-child) {
    cursor: pointer;
    color: #ccc;
    background-color: #464646;
  }

  :deep(.el-switch) {
    --el-switch-on-color: #2c2c2c; /* 开启暗黑模式下的状态背景色 */
    --el-switch-off-color: #f2f2f2; /* 关闭状态背景色 */
    .el-switch__action {
      color: var(--el-switch-icon-color); /* switch切换时的图标颜色 */
    }
  }
  /* 语言选择器样式 */
  .language-selector {
    position: relative; // 新增：为下拉菜单提供定位基准
    .language-trigger {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    /* 下拉菜单样式 */
    .language-menu {
      position: absolute;
      top: 100%; /* 从父元素底部开始 */
      left: 0;
      background: var(--el-bg-color);
      color: var(--text-color);
      border-radius: 4px;
      padding: 0.5rem;
      min-width: 4rem;
      display: none; /* 默认隐藏 */
      z-index: 10; /* 确保悬浮层在最前 */

      > div {
        padding: 0.25rem 0.5rem;
        &:hover {
          background: #555;
        }
      }
    }

    /* 悬浮时显示下拉菜单 */
    &:hover .language-menu {
      display: block;
    }
  }
}
</style>
