<script>
import UserCard from "./UserCard.vue";

export default {
  name: "Chat",
  data() {
    return {
      users: [
        {
          name: '卡莎·艾尔',
          level: 91,
          task: '《当日未完成》',
          details: 'mantis: 0, tower: 3'
        },
        {
          name: '卡莎·艾尔',
          level: 45,
          task: '《当日未完成》',
          details: 'mantis: 1 (LIHKG 討論區, 更詳細的信息請參考此鏈接), tower: 0'
        },
        {
          name: '卡莎·艾尔',
          level: 56,
          task: '《当日未完成》',
          details: 'mantis: 1, tower: 3'
        },
        {
          name: '卡莎·艾尔',
          level: 57,
          task: '《今日可开发》',
          details: '【修复】查看详情网页\n《当日未完成》\nmantis: 0, tower: 4'
        }
      ]
    };
  },
  components: {
    UserCard
  }
};
</script>

<template>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-zinc-100 dark:bg-zinc-800">
      <UserCard v-for="(user, index) in users" :key="index" :user="user" />
    </div>
    <div class="flex items-center justify-center bg-zinc-200 dark:bg-zinc-700 p-4 rounded-lg md:hidden">
      <img class="w-32 h-32" src="https://placehold.co/160x160" alt="Side Image" crossorigin="anonymous">
    </div>

</template>

<style scoped>

</style>