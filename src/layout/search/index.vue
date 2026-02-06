<template>
  <div class="search-container">
    <div style="display: flex; align-items: center; gap: 0.5rem">
      <!-- SVG 图标默认是行内元素（inline），其对齐基线（baseline）可能和文字不同。Flexbox 的 align-items: center 能强制子元素垂直居中，避免基线对齐问题。 -->
      <SvgIcon name="tool" color="#009a61" size="1.5rem" />
      <span style="font-size: 1.5rem">在线工具</span>
    </div>
    <div><SearchBox /></div>
    <div style="display: flex; flex-direction: column; align-items: center">
      <SvgIcon name="charts" color="#009a61" size="1.5rem" /><span>排行榜</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBox from "@/components/common/SearchBox/index.vue";
</script>

<style scoped lang="scss">
.search-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 10px 20rem;
  background-color: var(--el-bg-color);
  color: var(--highlight-text-color);
  @media (max-width: 992px) {
    padding: 10px 1rem; // 移动端时减少内边距
  }
  span {
    @media (max-width: 992px) {
      display: none;
    }
  }
  @media (max-width: 992px) {
  }
}
</style>
