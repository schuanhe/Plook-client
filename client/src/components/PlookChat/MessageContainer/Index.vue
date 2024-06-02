<template>
  <div class="messageContainer">
    <uni-list class="messageList">
      <Message v-bind="mockProps"/>
      <Message v-bind="mockProps3"/>
      <Message v-bind="mockProps2"/>
      <Message v-bind="mockProps"/>
      <Message v-bind="mockProps"/>
      <Message v-bind="mockProps"/>
      <Message v-bind="mockProps"/>
      <Message v-bind="mockProps"/>
      <Message v-bind="mockProps"/>
      <Message v-bind="mockProps"/>
      <Message v-bind="mockProps"/>
      <Message v-bind="mockProps"/>
      <Message v-bind="mockProps"/>
      <Message v-bind="mockProps"/>
    </uni-list>
    <view class="messageInputView">
      <uni-easyinput class="messageInput" v-model="value" placeholder="请输入内容"></uni-easyinput>
    </view>


  </div>

</template>

<script setup>
import Message from '../Message/Message.vue';
import UniListItem from "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.vue";
import UniList from "../../../uni_modules/uni-list/components/uni-list/uni-list.vue";
import UniEasyinput from "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue";


const mockProps = {
  _id: '123456789', // 字符串或数字
  type: 'text', // 字符串
  content: {
    text: '测试长字符666666666踩踩踩66666踩踩踩66666踩踩踩66666踩踩踩66666踩踩踩66666踩踩踩踩踩从',
  }, // 对象或字符串

  user: {
    id: 'user123', // 用户 ID
    name: 'schuanhe', // 用户名
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3533767368&s=640' // 用户头像链接
  },
  position: 'left', // 字符串
  hasTime: true, // 布尔值
  status: {
    read: true, // 是否已读
    delivered: true // 是否已送达
  },
  renderMessageContent: (content) => {
    // 自定义函数，根据传入的 content 渲染消息内容
    // 这里返回一个示例的渲染结果
    return `<div>${content}</div>`;
  }
};

const mockProps2 = {
  _id: '123456789', // 字符串或数字
  type: 'text', // 字符串
  content: {
    text: '测试长字符字符字从',
  }, // 对象或字符串
  createdAt: Date.now(), // 时间戳
  user: {
    id: 'user123', // 用户 ID
    name: 'schuanhe', // 用户名
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3533767368&s=640' // 用户头像链接
  },
  position: 'right', // 字符串
  hasTime: true, // 布尔值
  status: {
    read: true, // 是否已读
    delivered: true // 是否已送达
  },
  renderMessageContent: (content) => {
    // 自定义函数，根据传入的 content 渲染消息内容
    // 这里返回一个示例的渲染结果
    return `<div>${content}</div>`;
  }
};

const mockProps3 = {
  _id: '123456789', // 字符串或数字
  type: 'system', // 字符串
  content: {
    text: '测试长字符字符字从',
  }, // 对象或字符串
  // createdAt: Date.now(), // 时间戳

  position: 'right', // 字符串
  hasTime: true, // 布尔值
  status: {
    read: true, // 是否已读
    delivered: true // 是否已送达
  },
  renderMessageContent: (content) => {
    // 自定义函数，根据传入的 content 渲染消息内容
    // 这里返回一个示例的渲染结果
    return `<div>${content}</div>`;
  }
};

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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* 卡片阴影 */
  border-radius: 5px; /* 卡片边框圆角 */
  width: 100%;
  height: 100%;
  margin: 10px;
}

</style>
