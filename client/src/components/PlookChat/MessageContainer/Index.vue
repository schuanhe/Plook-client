<template>
  <div class="messageContainer">
    <uni-list class="messageList">
      <Message v-bind="mockProps"/>
      <Message v-bind="mockProps3"/>
      <Message v-bind="mockProps2"/>
    </uni-list>
  </div>

</template>

<script setup>
import Message from '../Message/Message.vue';
import UniListItem from "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.vue";
import UniList from "../../../uni_modules/uni-list/components/uni-list/uni-list.vue";


const mockProps = {
  _id: '123456789', // 字符串或数字
  type: 'text', // 字符串
  content: {
    text: '测试长字符字符字符长城长城长踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩从',
  }, // 对象或字符串
  createdAt: Date.now(), // 时间戳
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
}

</style>
