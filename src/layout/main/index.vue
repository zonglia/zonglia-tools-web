<template>
  <div class="main-content">main</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: yellow;
  padding: 0rem 20rem 0 20rem;
  @media (max-width: 992px) {
    padding: 0rem 1rem 0 1rem;
  }
}
</style>
