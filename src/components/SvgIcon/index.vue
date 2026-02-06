<template>
  <svg
    class="svg-icon"
    aria-hidden="true"
    :style="{
      width: size,
      height: size,
    }"
  >
    <use
      :xlink:href="`#icon-${name}`"
      :fill="isCssVariable ? `var(${color})` : color"
    />
  </svg>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  name: { type: String, required: true }, // 图标名称（与 SVG 文件名一致）
  color: { type: String, default: "#333" }, // 图标颜色
  size: { type: String, default: "16px" },
});

const isCssVariable = computed(() => props.color.startsWith("--"));
</script>

<style scoped>
.svg-icon {
  vertical-align: middle;
}
</style>
