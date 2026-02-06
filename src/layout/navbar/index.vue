<template>
  <div class="nav">
    <div class="navbar-container">
      <!-- 左边分类tag -->
      <div class="navbar-category">
        <span>我的</span>
        <span>工具</span>
        <span>文库</span>
        <span>码库</span>
        <span>软件</span>
        <span>网址</span>
        <span>话题</span>
        <span>小摊</span>
      </div>
      <!-- 右边反馈图标 -->
      <div class="feedback-container">
        <SvgIcon name="chat" color="--text-color" /><span>反馈</span>
      </div>
    </div>
    <!-- 下面的分类的具体item -->
    <div class="navbar-category-item">
      <span>所有</span>
      <span>文本类</span>
      <span>文档类</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.nav {
  .navbar-container {
    display: flex;
    // 子元素会沿着主轴（水平或垂直）​​两端对齐​​，剩余空间​​平均分配在子元素之间​​（首尾元素紧贴容器边缘，中间间隔相等）
    justify-content: space-between;
    margin-top: 25px;
    border-bottom: 1px solid #cccccc;
    align-items: center;
    background-color: var(--nav-bg-color);
    color: var(--highlight-text-color);
    @media (max-width: 992px) {
      display: none;
    }
    .navbar-category {
      padding-top: 5px;

      > span {
        cursor: pointer;
        width: 60px;
        // 使文字垂直居中
        line-height: 30px;
        // 使文字水平居中
        text-align: center;
        display: inline-block;
        border: 1px solid #cccccc;
        border-bottom: none;
        border-left: none;
      }
    }

    .feedback-container {
      background-color: #1a9bf2;
      // 让反馈的图标和文字强制对齐
      display: flex;
      align-items: center;
      padding: 5px;
    }
  }
  .navbar-category-item {
    > span {
      cursor: pointer;
      width: 60px;
      // 使文字垂直居中
      line-height: 30px;
      // 使文字水平居中
      // text-align: center;
      display: inline-block;
      // background-color: #1a9bf2;
    }
  }
}
</style>
