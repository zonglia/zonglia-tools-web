<template>
  <div class="main">
    <div class="wide-card">
      <Card title="bili download" ico="bilibili" />
    </div>
    <div class="wide-card">
      <Card title="qq zone" />
    </div>

  </div>
</template>

<script setup lang="ts">
import Card from "@/components/common/Card/index.vue";
</script>

<style scoped lang="scss">
.main {
  overflow-y: auto; // 保持垂直滚动功能
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; // Firefox隐藏滚动条
  &::-webkit-scrollbar {
    display: none; // Chrome/Safari隐藏滚动条
  }
  display: grid;
  gap: 0.2rem;
  // 桌面端布局
  @media (min-width: 992px) {
    grid-template-columns: repeat(12, 1fr); // 创建12等分的列布局，每列宽度相同
    grid-auto-rows: 1fr; // 所有行自动等高

    .wide-card {
      box-sizing: border-box;
      grid-column: span 3; // 带有wide-card类的卡片横跨4列（3个wide-card正好占满12列）
    }
  }
  // 移动端布局
  @media (max-width: 992px) {
    box-sizing: border-box;
    grid-auto-flow: row;
    grid-template-columns: 1fr;
  }
}

.card {
  overflow: hidden; // 添加overflow防止图表溢出
}
</style>
