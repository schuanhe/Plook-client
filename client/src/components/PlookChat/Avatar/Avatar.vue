<template>
  <component
      :is="element"
      :class="['Avatar', 'Avatar--' + size, 'Avatar--' + shape, className]"
      :href="url"
  >
    <img v-if="src" :src="src" :alt="alt" />
    <slot v-else></slot>
  </component>
</template>

<script setup>
const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  src: String,
  alt: String,
  url: String,
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  shape: {
    type: String,
    default: 'circle',
    validator: (value) => ['circle', 'square'].includes(value)
  },
  children: null
});

const element = props.url ? 'a' : 'span';
</script>

<style scoped>
.Avatar {
  display: inline-block;
  overflow: hidden;
  border-radius: 50%;
}

.Message.right .Message-main > .Avatar {
  margin-left: 4px;
}

.Message.left .Message-main > .Avatar {
  margin-right: 4px;
}

.Avatar img {
  display: block;
  width: 36px;
  height: 36px;
  object-fit: cover;
}

.Avatar--sm img {
  width: 24px;
  height: 24px;
}

.Avatar--lg img {
  width: 40px;
  height: 40px;
}

.Avatar--square {
  border-radius: 4px;
}
</style>
