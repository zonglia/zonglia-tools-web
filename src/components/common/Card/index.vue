<template>
  <div class="card-container">
    <div style="height: 50px; display: flex">
      <!-- 图标 -->
      <div
        style="
          width: 50px;
          height: 50px;
          background: url('https://s1.aigei.com/src/img/gif/ac/ac2fb391bf1148efa2e3186d82e51f43.gif?e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:20WvawD1vFFrzxJVfYSXev7dAyQ=')
            center/cover no-repeat;
          margin-right: 15px;
        "
      ></div>
      <div style="flex-grow: 1; display: flex; justify-content: space-between">
        <div style="display: flex; flex-direction: column">
          <div>{{ props.title }}</div>
          <div><SvgIcon name="star" color="--text-color" />加入收藏</div>
        </div>
        <div>[图像类]</div>
      </div>
    </div>

    <div class="card-details" style="height: calc(100% - 50px)">
      <div style="white-space: nowrap; overflow: hidden">
        一键去除照片背景、证件照换背景、商品白底图
      </div>
      <div style="display: flex; justify-content: space-between">
        <div>https://tool.lu/cutout/</div>
        <div>进入</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  ico: {
    type: String,
    default: "users",
  },
  attendance: {
    type: Number,
    default: 0, // 默认出勤人数
  },
  totalStaff: {
    type: Number,
    default: 0, // 默认在职人数
  },
});

</script>

<style scoped lang="scss">
.card-container {
  padding: 0.3rem 0.3rem 0rem;
  overflow: hidden;
  background-color: var(--el-bg-color);
  color: var(--text-color);
  border: 1px solid #cccccc;
  .card-details {
    > div {
      margin-top: 20px;
    }
  }
}
</style>
