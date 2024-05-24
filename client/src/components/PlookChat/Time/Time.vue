<template>
  <time class="Time" :datetime="dateTime" :date="date">
    {{ formattedDate }}
  </time>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  date: {
    type: Number,
    required: true
  }
});

const dateTime = ref('');

const formattedDate = computed(() => {
  const date = new Date(props.date);
  const now = new Date();
  const timeDiff = now - date;
  const getDaysDiff = (date1, date2) => Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
  const hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  // 如果时间差小于一天
  if (timeDiff < (1000 * 60 * 60 * 24)) {
    return `${hours}:${minutes}`;
  }

  const month = date.getMonth() + 1; // 月份从0开始
  const day = date.getDate();
  // 如果时间差小于一年
  if (getDaysDiff(date, now) < 365) {
    return `${month}-${day} ${hours}:${minutes}`;
  }

  const year = date.getFullYear();
  return `${year}-${month}-${day} ${hours}:${minutes}`;
});


onMounted(() => {
  dateTime.value = new Date(props.date).toJSON();
});



</script>

<style scoped>
.Time {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}

</style>
