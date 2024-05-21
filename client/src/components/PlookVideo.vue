<template>
  <view class="plook-video">
    <video id="myVideo" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4" danmu-btn=true enable-danmu=true>
    </video>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const src = ref('https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4');
const danmuList = ref([
  {
    text: '第 1s 出现的弹幕',
    color: '#ff0000',
    time: 1
  },
  {
    text: '第 3s 出现的弹幕',
    color: '#ff00ff',
    time: 3
  }
]);
const danmuValue = ref('');
let videoContext = null;

const sendDanmu = () => {
  if (videoContext) {
    videoContext.sendDanmu({
      text: danmuValue.value,
      color: getRandomColor()
    });
    danmuValue.value = '';
  }
};

const videoErrorCallback = (e) => {
  uni.showModal({
    content: e.target.errMsg,
    showCancel: false
  });
};

const getRandomColor = () => {
  const rgb = [];
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16);
    color = color.length === 1 ? '0' + color : color;
    rgb.push(color);
  }
  return '#' + rgb.join('');
};

onMounted(() => {
  // #ifndef MP-ALIPAY
  videoContext = uni.createVideoContext('myVideo');
  // #endif
});

</script>

<style scoped>
.plook-video {
  width: 100%;
  height: 100%;
}

.plook-video video {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 根据需求调整，如cover, contain等 */
}
</style>