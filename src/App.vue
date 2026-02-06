<template>
  <div>
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { useThemeStore } from "@/store/modules/theme";
const themeStore = useThemeStore();
themeStore.setTheme("light");
</script>
<style scoped></style>
