<template>
  <div class="PullToRefresh" ref="wrapperRef" @scroll="onScroll">
    <div class="PullToRefresh-inner">
      <div
          :class="['PullToRefresh-content', { 'PullToRefresh-transition': dropped }]"
          ref="contentRef"
      >
        <div class="PullToRefresh-indicator">
          <slot name="renderIndicator" :status="status" :distance="distance">
            <Icon v-if="status === 'active' || status === 'loading'" class="PullToRefresh-spinner" type="spinner" spin />
          </slot>
        </div>
        <Flex v-if="!disabled && useFallback" class="PullToRefresh-fallback" center>
          <slot name="renderIndicator" :status="status" :distance="oDistance">
            <Icon v-if="status === 'active' || status === 'loading'" class="PullToRefresh-spinner" type="spinner" spin />
          </slot>
          <Button class="PullToRefresh-loadMore" variant="text" @click="handleLoadMore">
            {{ loadMoreText }}
          </Button>
        </Flex>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, defineProps, defineEmits, watch, computed } from 'vue';
import { setTransform } from '../../../utils/style';
import Icon from '../Icon';
import Flex from '../Flex/Flex';
import Button from '../Button';
import canUse from '../../../utils/canUse';
import smoothScroll from '../../../utils/smoothScroll';


const canPassive = canUse('passiveListener');
const passiveOpts = canPassive ? { passive: true } : false;
const nonPassiveOpts = canPassive ? { passive: false } : false;

const props = defineProps({
  distance: { type: Number, default: 30 },
  loadingDistance: { type: Number, default: 30 },
  distanceRatio: { type: Number, default: 2 },
  loadMoreText: { type: String, default: '点击加载更多' },
  maxDistance: Number,
  onRefresh: Function,
  onScroll: Function,
  renderIndicator: Function,
  children: null
});

const emits = defineEmits(['backBottomClick', 'backBottomShow']);

const wrapperRef = ref(null);
const contentRef = ref(null);


const distance = ref(0);
const status = ref('pending');
const dropped = ref(false);
const disabled = ref(!props.onRefresh);
const sharedRef = ref({});
const statusRef = ref(status.value);
const timer1 = ref(null);
const timer2 = ref(null);

const useFallback = !canUse('touch');

watch(status, (newStatus) => {
  statusRef.value = newStatus;
});

const setContentStyle = (y) => {
  const content = contentRef.value;
  if (content) {
    setTransform(content, `translate3d(0px,${y}px,0)`);
  }
};

const scrollTo = ({ y, animated = true }) => {
  const scroller = wrapperRef.value;

  if (!scroller) return;

  const offsetTop = y === '100%' ? scroller.scrollHeight - scroller.offsetHeight : y;

  if (animated) {
    smoothScroll({
      el: scroller,
      to: offsetTop,
      x: false,
    });
  } else {
    scroller.scrollTop = offsetTop;
  }
};

const scrollToEnd = ({ animated = true } = {}) => {
  scrollTo({ y: '100%', animated });
};

const reset = () => {
  distance.value = 0;
  status.value = 'pending';
  setContentStyle(0);
};

const handleLoadMore = () => {
  const scroller = wrapperRef.value;

  if (!scroller || !props.onRefresh) return;

  status.value = 'loading';

  try {
    const sh = scroller.scrollHeight;

    props.onRefresh.then((res) => {
      const handleOffset = () => {
        scrollTo({
          y: scroller.scrollHeight - sh - 50,
          animated: false,
        });
      };

      clearTimeout(timer1.value);
      clearTimeout(timer2.value);
      handleOffset();
      timer1.value = setTimeout(handleOffset, 150);
      timer2.value = setTimeout(handleOffset, 250);

      reset();

      if (res && res.noMore) {
        disabled.value = true;
      }
    });
  } catch (ex) {
    console.error(ex);
    reset();
  }
};

const touchStart = () => {
  sharedRef.value.startY = 0;
};

const touchMove = (e) => {
  const currentY = e.touches[0].clientY;
  const canPull = wrapperRef.value.scrollTop <= 0;

  if (canPull) {
    if (!sharedRef.value.startY) {
      sharedRef.value.startY = currentY;
      status.value = 'pull';
      dropped.value = false;
    }
  } else {
    sharedRef.value.startY = 0;
  }

  const { startY } = sharedRef.value;

  if (!canPull || currentY < startY || statusRef.value === 'loading') return;

  let dist = (currentY - startY) / props.distanceRatio;

  if (props.maxDistance && dist > props.maxDistance) {
    dist = props.maxDistance;
  }

  if (dist > 0) {
    if (e.cancelable) {
      e.preventDefault();
    }
    e.stopPropagation();

    setContentStyle(dist);
    distance.value = dist;
    status.value = dist >= props.distance ? 'active' : 'pull';
  }
};

const touchEnd = () => {
  dropped.value = true;

  if (sharedRef.value.startY && statusRef.value === 'active') {
    handleLoadMore();
  } else {
    reset();
  }
};

onMounted(() => {
  const wrapper = wrapperRef.value;

  if (!wrapper || useFallback) return;

  if (disabled.value) {
    wrapper.removeEventListener('touchstart', touchStart);
    wrapper.removeEventListener('touchmove', touchMove);
    wrapper.removeEventListener('touchend', touchEnd);
    wrapper.removeEventListener('touchcancel', touchEnd);
  } else {
    wrapper.addEventListener('touchstart', touchStart, passiveOpts);
    wrapper.addEventListener('touchmove', touchMove, nonPassiveOpts);
    wrapper.addEventListener('touchend', touchEnd);
    wrapper.addEventListener('touchcancel', touchEnd);
  }
});

watch(() => status.value, (newStatus) => {
  if (newStatus === 'loading' && !useFallback) {
    setContentStyle(props.loadingDistance);
  }
});

</script>

<style scoped>
/* 添加样式 */
</style>
