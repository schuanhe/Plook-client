<template xmlns="">
  <view class="container">
    <huanhe-card title="登录">
      <uni-forms ref="validForm" :rules="rules" :modelValue="form">
        <uni-forms-item label="用户名">
          <uni-easyinput v-model="form.username" placeholder="请输入用户名" ></uni-easyinput>
        </uni-forms-item>
        <uni-forms-item label="密码">
          <uni-easyinput v-model="form.password" placeholder="请输入密码"></uni-easyinput>
        </uni-forms-item>
      </uni-forms>
      <button size="mini" @click="loginFun" type="primary">登录</button>
    </huanhe-card>
  </view>
</template>
<script setup>
import HuanheCard from "../../components/SchuanheComponent/HuanheCard.vue";
import UniForms from "../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue";
import UniFormsItem from "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue";
import UniEasyinput from "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue";
import { useUserStore } from "../../store/user";
import { login } from "../../api/user";

const useUserStoreA = useUserStore()
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
      useUserStoreA.setToken(res.data.token)
      useUserStoreA.setUser(res.data.user)
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