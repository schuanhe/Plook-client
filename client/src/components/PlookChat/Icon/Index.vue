<template>
  <svg
      :class="['Icon', { 'is-spin': spin }, className]"
      ref="iconRef"
      v-bind="{ ...ariaProps, ...other }"
  >
    <use :xlink:href="`#icon-${type}`" />
  </svg>
</template>

<script setup>
import {ref, defineProps, computed} from 'vue';

// 定义属性类型
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  className: String,
  name: String,
  spin: Boolean
});

// 创建 ref
const iconRef = ref(null);

// 计算 aria 属性
const ariaProps = computed(() => {
  return typeof props.name === 'string' ? {'aria-label': props.name} : {'aria-hidden': true};
});

// 解构其他属性
const {type, className, spin, ...otherProps} = props;
const other = computed(() => otherProps);
</script>

<style scoped>
.Icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  fill: currentColor;
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

.is-spin {
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}

</style>
