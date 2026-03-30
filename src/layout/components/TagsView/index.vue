<template>
  <ScrollPane class="tags-view-container">
    <router-link
      class="tag-view-item"
      v-for="tag in visitedViews"
      :to="tag.path"
      :class="isActive(tag) ? 'active' : ''"
    >
      <span class="tag-title">{{ tag.title }}</span>
      <span v-if="!isAffix(tag)" class="tag-close-btn" @click.prevent="closeTag(tag)">
        ×
      </span>
    </router-link>
  </ScrollPane>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ScrollPane from "@/layout/components/TagsView/ScrollPane/index.vue";
import useTagsViewStore from "@/store/modules/tagsview";

const route = useRoute();
const router = useRouter();
const tagsViewStore = useTagsViewStore();

// 需要缓存的路由名称列表
const cachedViews = computed(() => tagsViewStore.cachedViews);
const visitedViews = computed(() => tagsViewStore.visitedViews);

// 判断当前标签是否激活
const isActive = (tag: any) => {
  return tag.path === route.path; // 依赖了响应式的 route.path
};
// 判断是否为固定标签（首页通常不可关闭）
const isAffix = (tag: any) => {
  return tag.meta?.affix || false;
};
// 关闭标签
const closeTag = async (tag: any) => {
  // 从 store 中删除
  await tagsViewStore.delView(tag);

  // 如果关闭的是当前激活的标签，需要跳转到其他标签
  if (isActive(tag)) {
    const latestView = visitedViews.value.slice(-1)[0];
    if (latestView) {
      router.push(latestView.path);
    } else {
      // 如果没有标签了，跳转到首页
      router.push("/");
    }
  }
};

// 监听路由变化，自动添加标签
watch(
  () => route.path,
  () => {
    // 过滤掉不需要添加标签的路由（如登录页、404等）
    const whiteList = ["/login", "/404", "/401"];
    if (whiteList.includes(route.path)) return;

    // 添加到标签栏
    tagsViewStore.addView({
      path: route.path,
      name: route.name,
      meta: route.meta,
      query: route.query,
      params: route.params,
      fullPath: route.fullPath,
    });
  },
  { immediate: true } // 立即执行一次，添加首页
);
</script>

<style scoped lang="scss">
.tags-view-container {
  height: 100%;

  /* 深度选择器影响 el-scrollbar 内部结构 */
  :deep(.el-scrollbar__view) {
    height: 100%;
    display: flex;
    align-items: center; /* 垂直居中 */
  }

  .tag-view-item {
    display: inline-flex;
    align-items: center;
    height: 26px;
    line-height: 26px;
    padding: 0 8px 0 12px;
    border: 1px solid #d8dce5;
    border-radius: 2px;
    background-color: #fff;
    color: #495060;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s;
    margin-right: 5px;
    position: relative;
    text-decoration: none; // 去除下划线

    &:last-of-type {
      margin-right: 0;
    }

    // 非激活状态的关闭按钮样式
    .tag-close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      color: #495060;
      font-size: 16px;
      line-height: 1;
      margin-left: 4px;
      transition: all 0.3s;
      background-color: transparent; // 默认无背景

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        color: #000;
      }
    }

    // 激活状态
    &.active {
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;

      &::before {
        content: "";
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #fff;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
      }

      // 激活状态下的关闭按钮样式
      .tag-close-btn {
        color: rgba(255, 255, 255, 0.9);
        background-color: rgba(255, 255, 255, 0.15);

        &:hover {
          color: #fff;
          background-color: rgba(255, 255, 255, 0.25);
        }
      }
    }
  }

  .tag-title {
    margin-left: 10px; // 为左侧圆点留出空间
    margin-right: 2px;
  }
}
</style>
