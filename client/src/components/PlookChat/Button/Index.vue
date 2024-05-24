<template>
  <button
      :class="buttonClasses"
      type="button"
      :disabled="disabled"
      @click="handleClick"
      ref="buttonRef"
      v-bind="other"
  >
    <span v-if="icon" class="Btn-icon">
      <Icon :type="icon" :spin="loading" />
    </span>
    <template v-if="label">{{ label }}</template>
    <template v-else><slot></slot></template>
  </button>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { computed } from 'vue';
import Icon from '../Icon';  // 注意这里引用的是 Vue 组件

const props = defineProps({
  className: String,
  label: String,
  color: String,
  variant: String,
  size: String,
  block: Boolean,
  icon: String,
  loading: Boolean,
  disabled: Boolean,
  children: null,
  onClick: Function
});

const buttonRef = ref(null);

const buttonClasses = computed(() => {
  const { className, color, variant, size, block } = props;
  return [
    'Btn',
    color && `Btn--${color}`,
    variant && `Btn--${variant}`,
    size && `Btn--${size}`,
    { 'Btn--block': block },
    className
  ];
});

const icon = computed(() => props.icon || (props.loading && 'spinner'));
const handleClick = (e) => {
  if (!props.disabled && !props.loading && props.onClick) {
    props.onClick(e);
  }
};

const other = computed(() => {
  const { className, label, color, variant, size, block, icon, loading, disabled, children, onClick, ...otherProps } = props;
  return otherProps;
});
</script>

<style scoped>
.Btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  min-width: 80px;
  margin: 0;
  padding: 10px; /* 示例值 */
  border: 1px solid #ccc; /* 示例值 */
  border-radius: 5px; /* 示例值 */
  background: #007bff; /* 示例值 */
  color: #fff; /* 示例值 */
  font-weight: 700; /* 示例值 */
  font-size: 16px; /* 示例值 */
  line-height: 1.5; /* 示例值 */
  font-family: Arial, sans-serif; /* 示例值 */
  text-transform: none;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  transition: background-color 0.2s; /* 示例值 */
  user-select: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
}

.Btn:not(:disabled) {
  cursor: pointer;
}

.Btn:focus:not(:focus-visible) {
  outline: 0;
}

.Btn:active {
  background: #0056b3; /* 示例值 */
}

.Btn:disabled {
  pointer-events: none;
  color: var(--gray-4);
  opacity: 0.5;
}

.Btn--primary:not(.Btn--outline) {
  border-color: var(--btn-primary-border-color);
  background: var(--btn-primary-bg);
  background-origin: border-box;
  color: var(--btn-primary-color);
}

.Btn--primary:not(.Btn--outline):active {
  opacity: 0.8;
}

.Btn--outline.Btn--primary {
  border-color: var(--brand-1);
  color: var(--brand-1);
}

.Btn--sm {
  padding: 5px; /* 示例值 */
  font-size: 14px; /* 示例值 */
}

.Btn--lg {
  padding: 15px; /* 示例值 */
  font-size: 18px; /* 示例值 */
}

.Btn--block {
  display: block;
  width: 100%;
}

.Btn-icon {
  display: inline-flex;
  align-self: center;
  flex-shrink: 0;
  margin-inline-end: 0.5rem;
}

[data-old-ios] .Btn:not(.Btn--block) {
  display: inline-block;
}

@media (hover: hover) {
  .Btn:hover {
    background: #0056b3; /* 示例值 */
  }

  .Btn--primary:not(.Btn--outline):hover {
    background: var(--btn-primary-bg);
    opacity: 0.9;
  }
}

.Btn--text {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--link-color);
  font-size: inherit;
  vertical-align: initial;
}

.Btn--text:hover,
.Btn--text:active {
  background: transparent;
}

</style>
