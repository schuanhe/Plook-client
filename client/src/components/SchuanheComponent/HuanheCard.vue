<template>
  <view>
    <view class="card-container">
      <view class="card-content">
        <view class="card-title">
          <text>{{title}}</text>
        </view>
<!--        下划线-->
        <view class="card-line"></view>
        <view class="card-body">
          <slot></slot>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.card-container {
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: inline-block;
}

.card-content {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-weight: bold;
  margin-bottom: 8px;
}

.card-body {
  display: flex;
  flex-direction: column;
}
/* 定义下划线样式 */
.card-line {
  height: 1px;
  background-color: #e0e0e0; /* 分割线颜色 */
  margin: 8px 0; /* 分割线上下的间距 */
}
</style>