<template>
  <div class="messageContainer">
    <uni-list class="messageList">
      <Message v-for="msg in msgList" :key="msg.key" v-bind="msg"/>
    </uni-list>
    <view class="messageInputView">
      <uni-easyinput class="messageInput" v-model="value" placeholder="请输入内容"></uni-easyinput>
    </view>


  </div>

</template>

<script setup>
import Message from '../Message/Message.vue';
import UniList from "../../../uni_modules/uni-list/components/uni-list/uni-list.vue";
import UniEasyinput from "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue";
import { useRoomStore } from "../../../store/room";
const roomStore = useRoomStore();
const msgList = roomStore.roomMsgList


</script>

<style scoped>
.messageContainer {
  height: 100%;
  width: 100%;
  background: white;
  display: flex;
  flex-direction:column;
  justify-content: space-between;
}

.messageList {
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 15px;
  margin-top: 10px;
}


.messageInputView {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  /* 内部居中 */
  justify-content: center;
  max-height: 38px;
  width: 100%;
}

.messageInput {
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3); /* 内凹阴影 */
  border-radius: 5px; /* 卡片边框圆角 */
  width: 100%;
  height: 100%;
  margin: 10px;
}

</style>
