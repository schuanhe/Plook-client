<template>
  <div class="MessageContainer" ref="messagesRef" tabindex="-1">
    <slot name="renderBeforeMessageList"></slot>
    <PullToRefresh
        :onRefresh="onRefresh"
        :onScroll="handleScroll"
        :loadMoreText="loadMoreText"
        ref="scrollerRef"
    >
      <div class="MessageList">
        <Message v-for="msg in messages" :key="msg._id" v-bind="msg">
          <template #default>
            <slot name="renderMessageContent" :message="msg"></slot>
          </template>
        </Message>
        <Message v-if="isTyping" type="typing" _id="typing" />
      </div>
    </PullToRefresh>
<!--    <BackBottom-->
<!--        v-if="showBackBottom"-->
<!--        :count="newCount"-->
<!--        @click="handleBackBottomClick"-->
<!--        @mounted="onBackBottomShow"-->
<!--    />-->
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, defineProps, defineEmits, watch } from 'vue';
import PullToRefresh from '../PullToRefresh';
import Message from '../Message/Message';
// import BackBottom from '../BackBottom';
import canUse from '../../../utils/canUse';
import throttle from '../../../utils/throttle';
import getToBottom from '../../../utils/getToBottom';

const listenerOpts = canUse('passiveListener') ? { passive: true } : false;

const props = defineProps({
  messages: Array,
  renderMessageContent: Function,
  isTyping: Boolean,
  loadMoreText: String,
  onRefresh: Function,
  onScroll: Function,
  renderBeforeMessageList: Function,
  onBackBottomShow: Function,
  onBackBottomClick: Function,
});

const emits = defineEmits(['backBottomClick', 'backBottomShow']);

const showBackBottom = ref(false);
const newCount = ref(0);
const showBackBottomtRef = ref(showBackBottom);
const newCountRef = ref(newCount);
const messagesRef = ref(null);
const scrollerRef = ref(null);
const lastMessage = computed(() => props.messages[props.messages.length - 1]);

const clearBackBottom = () => {
  newCount.value = 0;
  showBackBottom.value = false;
};

const scrollToEnd = (opts) => {
  if (scrollerRef.value) {
    if (!showBackBottomtRef.value || (opts && opts.force)) {
      scrollerRef.value.scrollToEnd(opts);
      if (showBackBottomtRef.value) {
        clearBackBottom();
      }
    }
  }
};

const handleBackBottomClick = () => {
  scrollToEnd({ animated: false, force: true });
  emits('backBottomClick');
};

const checkShowBottomRef = throttle((el) => {
  if (isNearBottom(el, 3)) {
    if (newCountRef.value) {
      if (isNearBottom(el, 0.5)) {
        clearBackBottom();
      }
    } else {
      showBackBottom.value = false;
    }
  } else {
    showBackBottom.value = true;
  }
});

const handleScroll = (e) => {
  checkShowBottomRef(e.target);
  if (props.onScroll) {
    props.onScroll(e);
  }
};

watch(
    () => props.messages,
    (newVal, oldVal) => {
      const lastMessage = newVal[newVal.length - 1];
      if (lastMessage && lastMessage.position === 'right') {
        scrollToEnd({ force: true });
      } else if (isNearBottom(scrollerRef.value.wrapperRef.current, 2)) {
        scrollToEnd({ animated: !!scrollerRef.value.wrapperRef.current.scrollTop, force: true });
      } else {
        newCount.value += 1;
        showBackBottom.value = true;
      }
    }
);

watch(
    () => props.isTyping,
    (newVal, oldVal) => {
      scrollToEnd();
    }
);

onMounted(() => {
  const wrapper = messagesRef.value;

  let needBlur = false;
  let startY = 0;

  const reset = () => {
    needBlur = false;
    startY = 0;
  };

  const touchStart = (e) => {
    const activeElement = document.activeElement;
    if (activeElement && activeElement.nodeName === 'TEXTAREA') {
      needBlur = true;
      startY = e.touches[0].clientY;
    }
  };

  const touchMove = (e) => {
    if (needBlur && Math.abs(e.touches[0].clientY - startY) > 20) {
      document.activeElement.blur();
      reset();
    }
  };

  wrapper.addEventListener('touchstart', touchStart, listenerOpts);
  wrapper.addEventListener('touchmove', touchMove, listenerOpts);
  wrapper.addEventListener('touchend', reset);
  wrapper.addEventListener('touchcancel', reset);

  onUnmounted(() => {
    wrapper.removeEventListener('touchstart', touchStart);
    wrapper.removeEventListener('touchmove', touchMove);
    wrapper.removeEventListener('touchend', reset);
    wrapper.removeEventListener('touchcancel', reset);
  });
});

</script>

<style scoped>
/* 添加样式 */
</style>
