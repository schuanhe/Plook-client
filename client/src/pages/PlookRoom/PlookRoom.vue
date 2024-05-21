<template>
  <view id="app" class="container">
    <view class="video-container">
      <PlookVideo />
    </view>
    <view class="comments-container">
      <h2>评论区</h2>
      <p>这是一个评论。</p>
      <!-- 更多评论 -->
    </view>
  </view>
</template>

<script setup lang="ts">

import PlookVideo from "../../components/PlookVideo.vue";
</script>


<style scoped>
body, html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.video-container {
  width: 100vw;
  height: calc(100vw * 9 / 16);
  background: #4cd964;
}

.comments-container {
  width: 100%;
  margin-top: 10px;
  background: #007aff;
}

/* 对于宽度大于768px的屏幕，使用横向布局 */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
    justify-content: space-between;
  }

  .video-container {
    width: 60vw;
    height: calc(60vw * 9 / 16);
  }

  .comments-container {
    width: 35%;
  }
}
</style>
