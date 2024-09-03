<template xmlns="">
  <view class="container">
    <huanhe-card title="登录">
      <uni-list >
        <uni-list-item v-for="(item,index) in 3" :key="index" :title="item.title" :note="item.note" :clickable="true" :to="item.to" @click="loginFun"/>
      </uni-list>
    </huanhe-card>
  </view>
</template>
<script setup>
import HuanheCard from "../../components/SchuanheComponent/HuanheCard.vue";
import { login } from "../../api/rooms";
import UniList from "../../uni_modules/uni-list/components/uni-list/uni-list.vue";
import UniListItem from "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.vue";

// 获取房间列表
const list = ref([])
const getList = () => {
  // 获取房间列表
  getRoomList().then(res => {

  })
}

const form = {
  username: '',
  password: ''
}
const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: ['change', 'blur']
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['change', 'blur']
  }
}

const loginFun = () => {
  login(form).then(res => {
    if(res.data.code === 200) {
      uni.setStorageSync('token', res.data.token)
      uni.setStorageSync('user', res.data.user)
      uni.navigateTo({
        url: '/pages/PlookRoom/PlookRoom'
      })
    } else {
      console.log(res.code)
      uni.showToast({
        title: res.data.message,
        icon: 'none'
      })
    }
  })
}

</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>