<template>
  <div :class="['Message', 'SystemMessage', className]">
    <div class="SystemMessage-inner">
      <span>{{ content }}</span>
      <a v-if="action" href="#" @click.prevent="action.onClick">{{ action.text }}</a>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: true
  },
  action: {
    type: Object,
    default: () => {
      return {
        text: '',
        onClick: () => {}
      };
    }
  }
});
</script>

<style scoped>

.SystemMessage {
  padding: 0 15px;
  color: #666;
  text-align: center;
}

.SystemMessage a {
  margin-left: 5px;
}

.SystemMessage-inner {
  display: inline-block;
  padding: 6px 9px;
  border-radius: 6px;
  background: #f8f8f8;
  font-size: 12px;
  text-align: left;
}


</style>
