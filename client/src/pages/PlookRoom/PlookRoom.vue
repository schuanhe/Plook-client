<template>

  <view class="container">
    <view>

      <uni-fab ref="fab" :pattern="pattern" :content="content" horizontal="right"
               @trigger="trigger" />
    </view>
    <view class="video-card">
      <view class="video-container  ">
        <plook-video class=""/>
      </view>
      <view class="video-card uni-flex uni-column" >
        <text class="flex-item">当前房间号: 123456789 \n</text>
        <text class="flex-item">666</text></view>
    </view>

    <view class="comments-container video-card">
      <message-container />
    </view>
  </view>

  <view class="set-video video-card">
    sadasdasdasd
  </view>


</template>


<script setup>
import { ref } from 'vue'
import PlookVideo from "../../components/PlookVideo.vue";
import MessageContainer from "../../components/PlookChat/MessageContainer/Index.vue";
import UniCard from "../../uni_modules/uni-card/components/uni-card/uni-card.vue";
import UniFab from "../../uni_modules/uni-fab/components/uni-fab/uni-fab.vue";
import UniPopup from "../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
import UniDrawer from "../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.vue";

const pattern = {
  color: '#fff',
  backgroundColor: '#007aff',
  selectedColor: '#fff',
  selectedBackgroundColor: '#007aff',
  shadow: true,
  zIndex: 99
}

const direction = 'vertical'
const content = [
  {
    text: '配置',
    active: false
  },
]

const showLeft = ref(null)
const popup = ref(null)
const trigger = (e) => {
  if (e.index === 0){
    // $this.$refs.popup.open()
    if (showLeft.value === null)
      return
    console.log(showLeft)

    popup.value.open()

    // 判断是否有这个方法
    if (showLeft.value.open) {
      showLeft.value.open()
    }
  }else {
    console.log('关闭')
  }
}

</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.video-container {
  width: 100%;
  height: calc(100vw * 9 / 16);
  max-height: 100vh;
}

.comments-container {
  width: 100%;
  flex-grow: 1; /* 让其占据剩余空间 */
  margin-top: 10px;
  overflow-y: auto; /* 如果内容过多，添加滚动条 */
}

.set-video {
  position: fixed;

  left: 50%; /* 将元素的左边定位到其父元素的水平中心 */
  transform: translate(-50%, -100%); /* 通过transform移动元素自身的位置，使其真正的中心与窗口的中心对齐 */
  z-index: 10; /* 确保元素位于其他元素之上 */
  width: 200px; /* 设置元素的宽度 */
  height: 300px; /* 设置元素的高度 */
  background-color: rgba(0, 0, 255, 0.5); /* 设置元素的背景色和透明度 */
  display: flex; /* 使用flex布局 */
  align-items: center; /* 垂直居中子元素 */
  justify-content: center; /* 水平居中子元素 */
}

@media (min-width: 768px) {
  .container {

    flex-direction: row;
    justify-content: space-between;
  }

  .video-container {
    width: 60vw;
    height: calc(60vw * 9 / 16);
  }

  .video-card {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 卡片阴影 */
    border-radius: 5px; /* 卡片边框圆角 */
    padding: 5px;
    margin: 10px;
  }

  .comments-container {
    width: 35%;
    height: auto;
  }
}
</style>
