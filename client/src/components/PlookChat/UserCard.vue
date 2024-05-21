<script>
export default {
  name: "UserCard",
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="flex items-center space-x-2">
    <img class="w-10 h-10 rounded-full" :src="user.avatar" alt="User Avatar" crossorigin="anonymous">
    <div>
      <p class="text-sm text-zinc-600 dark:text-zinc-300">{{ user.name }} (Lv{{ user.level }})</p>
      <div class="bg-blue-500 text-white text-sm p-2 rounded-lg">
        <p>{{ user.task }}</p>
        <p v-html="user.details"></p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>