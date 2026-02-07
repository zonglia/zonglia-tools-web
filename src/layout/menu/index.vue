<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由或子路由全部隐藏 -->
    <template v-if="!item.children || checkShowChildren(item.children) === 0">
      <el-menu-item v-if="!item.hidden" :index="buildFullPath(item, parentPath)">
        <SvgIcon :name="item.meta?.icon" size="30px" color="#fff" />
        <template #title>
          <span>{{ item.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有且只有一个可见子路由 -->
    <template v-else-if="checkShowChildren(item.children) === 1">
      <el-menu-item
        v-if="!item.hidden"
        :index="
          buildFullPath(
            getFirstVisibleChild(item.children),
            buildFullPath(item, parentPath)
          )
        "
      >
        <SvgIcon
          :name="getFirstVisibleChild(item.children)?.meta?.icon"
          size="30px"
          color="#fff"
        />
        <template #title>
          <span>{{ getFirstVisibleChild(item.children)?.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有多个可见子路由 -->
    <template v-else>
      <el-sub-menu :index="buildFullPath(item, parentPath)">
        <template #title>
          <SvgIcon :name="item.meta?.icon" size="30px" color="#fff" />
          <span>{{ item.meta?.title }}</span>
        </template>
        <Menu :menu-list="item.children" :parentPath="buildFullPath(item, parentPath)" />
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { RouteRecordRaw, RouteMeta } from "vue-router";
import Menu from "@/layout/menu/index.vue"; // 递归调用自己
import SvgIcon from "@/components/SvgIcon/index.vue";

interface CustomRouteMeta extends RouteMeta {
  title?: string;
  icon?: string;
  affix?: boolean;
  noCache?: boolean;
  link?: string;
  hidden?: boolean;
}

interface CustomRouteRecordRaw extends Omit<RouteRecordRaw, "meta" | "children"> {
  meta?: CustomRouteMeta;
  children?: CustomRouteRecordRaw[];
  hidden?: boolean;
  alwaysShow?: boolean;
}

const props = defineProps({
  menuList: {
    type: Array as PropType<CustomRouteRecordRaw[]>,
    required: true,
    default: () => [],
  },
  parentPath: {
    type: String,
    default: "",
  },
});

// 计算可见子菜单数量
const checkShowChildren = (children: CustomRouteRecordRaw[] = []): number => {
  return children.filter((child) => !child.hidden && !child.meta?.hidden).length;
};

// 获取第一个可见子菜单
const getFirstVisibleChild = (children: CustomRouteRecordRaw[] = []) => {
  return children.find((child) => !child.hidden && !child.meta?.hidden);
};

// 构建完整路径（拼接父路径和当前路径）
const buildFullPath = (
  item: CustomRouteRecordRaw | undefined,
  parentPath = ""
): string => {
  if (!item) return "/";
  return `${parentPath}/${item.path}`.replace(/\/+/g, "/");
};
</script>

<style scoped lang="scss"></style>
