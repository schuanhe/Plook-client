<template>
  <view class="container">
    <view class="video-container">
      <plook-video />
    </view>
    <view class="comments-container">
      <message-container />
    </view>
  </view>
</template>

<script setup lang="ts">

import PlookVideo from "../../components/PlookVideo.vue";
import MessageContainer from "../../components/PlookChat/MessageContainer/Index.vue";
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
}

.video-container {
  width: 100vw;
  height: calc(100vw * 9 / 16);
  background: #4cd964;
}

.comments-container {
  width: 100%;
  height: 100%;
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
    height: calc(60vw * 9 / 16);
  }
}
</style>
