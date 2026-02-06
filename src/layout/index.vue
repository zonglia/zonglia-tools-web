<template>
  <div class="container">
    <div><Header @show-login="loginDialogVisible = true" /></div>
    <div><Search /></div>
    <div><Main /></div>
    <LoginDialog v-model="loginDialogVisible" />
  </div>
</template>

<script setup lang="ts">
import Header from "@/layout/header/index.vue";
import Main from "@/layout/main/index.vue";
import Search from "@/layout/search/index.vue";
import useUserStore from "@/store/modules/user";
import LoginDialog from "@/views/login/index.vue";
import { computed } from "vue";

let userStore = useUserStore();
const loginDialogVisible = computed({
  get: () => userStore.loginDialogVisible,
  set: (value) => userStore.setLoginDialogVisible(value),
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  height: 100vh; /* 使容器充满视口高度 */
  background-color: var(--el-bg-color);
  > div:nth-child(3) {
    flex: 1; /* 占满剩余空间 */
    overflow: auto; /* 内容超出时滚动 */
  }
}
</style>
