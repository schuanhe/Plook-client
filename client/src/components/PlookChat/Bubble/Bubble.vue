<template>
  <div class="mes">
    <span class="tips">{{user.name}}</span>
    <div class="Bubble text" ref="bubbleRef" v-bind="other">
      <p v-show="content">{{ content }}</p>
    </div>
  </div>

</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  user: {
    type: Object,
    default: () => {
      return {
        name: '小明',
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg'
      };
    }
  }
});

const bubbleRef = ref(null);
const {content, ...other} = props;
</script>

<style scoped>
.mes {
  display: flex;
  flex-direction: column;
}

.Message.right .mes{
  align-items: flex-end;
}

.tips {
  margin-bottom: 6px;
  color: #666;
  line-height: 1.1;
  font-size: 12px;
}

.Bubble {
  flex-direction: column; /* 添加这一行使子元素垂直排列 */
  max-width: 300px; /* 示例变量值 */
  /* min-width: 0; */
  min-width: 1px; /* for IE bug */
  background: #FFCCCC; /* 示例变量值 */
  border-radius: 10px; /* 示例变量值 */
}

.Bubble.text{
  min-width: 40px;
  padding: 10px;
  box-sizing: border-box;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.Message.right .Bubble {
  margin-left: 46px;
  border-radius: 12px;
  background: #99CCFF;
}


.Message.left .Bubble {
  margin-right:46px;
}


.Bubble p {
  margin: 0;
}

</style>
