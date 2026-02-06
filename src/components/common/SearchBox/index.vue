<template>
  <div class="search-box-container">
    <div class="search-box-content">
      <div>
        <el-input
          v-model="input"
          placeholder="搜索其实很简单"
          :border="false"
        />
      </div>
      <div class="search-box-suggestions">
        <div>豆包</div>
        <div>B站视频下载</div>
        <div>ChatGPT</div>
      </div>
    </div>
    <div class="search-box-button">
      <el-button color="#f2f2f2">搜索</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const input = ref("");
</script>

<style scoped lang="scss">
.search-box-container {
  display: flex;
  border: 1px solid #e0e0e0;
  color: var(--highlight-text-color);
  background-color: #f2f2f2;
  .search-box-content {
    display: flex;
    .search-box-suggestions {
      display: flex;
      align-items: center; // 垂直居中
      > div {
        margin-right: 5px;
      }
      @media (max-width: 992px) {
        display: none;
      }
    }
  }
  .search-box-button {
    .el-button {
      background-color: #f2f2f6;
    }
    :hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
    @media (max-width: 992px) {
      display: none;
    }
  }
}
// 移除输入框边框
:deep(.el-input__wrapper) {
  box-shadow: none !important;
  background-color: #f2f2f2;
}
</style>
