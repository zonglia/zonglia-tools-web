<template>
  <el-scrollbar :vertical="false" class="scroll-container">
    <slot></slot>
  </el-scrollbar>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.scroll-container {
  height: 100%;
}
</style>
