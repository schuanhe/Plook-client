<template>
  <component
      :is="Element"
      :class="[
      'Flex',
      direction && mapDirection[direction],
      justify && mapJustify[justify],
      align && mapAlign[align],
      wrap && mapWrap[wrap],
      { 'Flex--inline': inline, 'Flex--center': center },
      className
    ]"
      ref="flexRef"
      v-bind="other"
  >
    <slot></slot>
  </component>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';

// 定义映射
const mapDirection = {
  row: 'Flex--d-r',
  'row-reverse': 'Flex--d-rr',
  column: 'Flex--d-c',
  'column-reverse': 'Flex--d-cr',
};

const mapWrap = {
  nowrap: 'Flex--w-n',
  wrap: 'Flex--w-w',
  'wrap-reverse': 'Flex--w-wr',
};

const mapJustify = {
  'flex-start': 'Flex--jc-fs',
  'flex-end': 'Flex--jc-fe',
  center: 'Flex--jc-c',
  'space-between': 'Flex--jc-sb',
  'space-around': 'Flex--jc-sa',
};

const mapAlign = {
  'flex-start': 'Flex--ai-fs',
  'flex-end': 'Flex--ai-fe',
  center: 'Flex--ai-c',
};

// 定义属性类型
const props = defineProps({
  as: {
    type: [String, Object],
    default: 'div'
  },
  className: String,
  center: Boolean,
  inline: Boolean,
  direction: {
    type: String,
    validator: value => ['row', 'row-reverse', 'column', 'column-reverse'].includes(value)
  },
  wrap: {
    type: String,
    validator: value => ['nowrap', 'wrap', 'wrap-reverse'].includes(value)
  },
  justify: {
    type: String,
    validator: value => ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'].includes(value)
  },
  justifyContent: {
    type: String,
    validator: value => ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'].includes(value)
  },
  align: {
    type: String,
    validator: value => ['flex-start', 'flex-end', 'center'].includes(value)
  },
  alignItems: {
    type: String,
    validator: value => ['flex-start', 'flex-end', 'center'].includes(value)
  },
  children: [String, Object, Array] // 根据具体需要调整类型
});

// 创建 ref
const flexRef = ref(null);

// 计算属性
const Element = computed(() => props.as || 'div');
const direction = computed(() => props.direction);
const wrap = computed(() => props.wrap);
const justify = computed(() => props.justify || props.justifyContent);
const align = computed(() => props.align || props.alignItems);
const className = computed(() => props.className);
const center = computed(() => props.center);
const inline = computed(() => props.inline);
const other = computed(() => {
  const { as, className, center, inline, direction, wrap, justifyContent, justify, alignItems, align, children, ...rest } = props;
  return rest;
});
</script>

<style scoped>
.Flex {
  display: flex;
}

.Flex--inline {
  display: inline-flex;
}

.Flex--center {
  justify-content: center;
  align-items: center;
}

.Flex--d-r {
  flex-direction: row;
}

.Flex--d-rr {
  flex-direction: row-reverse;
}

.Flex--d-c {
  flex-direction: column;
}

.Flex--d-cr {
  flex-direction: column-reverse;
}

.Flex--w-n {
  flex-wrap: nowrap;
}

.Flex--w-w {
  flex-wrap: wrap;
}

.Flex--w-wr {
  flex-wrap: wrap-reverse;
}

.Flex--jc-fs {
  justify-content: flex-start;
}

.Flex--jc-fe {
  justify-content: flex-end;
}

.Flex--jc-c {
  justify-content: center;
}

.Flex--jc-sb {
  justify-content: space-between;
}

.Flex--jc-sa {
  justify-content: space-around;
}

.Flex--ai-fs {
  align-items: flex-start;
}

.Flex--ai-fe {
  align-items: flex-end;
}

.Flex--ai-c {
  align-items: center;
}

.FlexItem {
  flex: 1;
  min-width: 0;
  min-height: 0;
}
</style>
