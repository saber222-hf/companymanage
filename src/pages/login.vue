<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>登录登录</div>
        <div>项目搭建</div>
      </div>

    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span></span>  
        <span>账号密码</span>
        <span></span>
      </div>
        <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
          <el-form-item prop="username"> 
            <el-input v-model="form.username" placeholder="请输入账号">
            <template #prefix>
            <el-icon><User /></el-icon>
          </template>
          </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input  v-model="form.password" type="password" autocomplete="off" placeholder="请确认密码" show-password @keyup.enter="onSubmit">
               <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
          </el-input>
          </el-form-item>
         
          <el-form-item>
            <el-button round color="#626aef" class="w-[250px]" type="primary" @click="onSubmit" :loading="loading" >
              
            
              登录
            </el-button>
          
          </el-form-item>
        </el-form>
    
    </el-col>
  </el-row>
</template>
<script setup>
import { ref,reactive } from 'vue'
import { login,getInfo } from '@/api/manager'
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex'

import { useRouter } from 'vue-router'
import { toast } from '@/composables/util'
import { setToken } from '@/composables/auth'

const router = useRouter()
const store = useStore()

const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' },{ min: 3, max: 10, message: '账号长度必须在3到10之间', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' },{ min: 3, max: 12, message: '密码长度必须在6到12之间', trigger: 'blur' }],
})
const formRef = ref(null)
const form = reactive({
  username: '',
  password: ''
})
const loading = ref(false)
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return
    }
    loading.value = true
    login(form.username, form.password).then(res => {
      const token = res.token
      setToken(token)

      ElNotification({
        message: '登录成功',
        type: 'success',
        duration: 3000
      })

      return getInfo()
    }).then(res2 => {
      store.commit('setUser', res2)
      console.log(res2)
      router.push('/')
    }).finally(() => {
      loading.value = false
    })
  })
}
      

</script>

<style scoped>
.login-container {
   @apply min-h-screen bg-indigo-500;
}

.login-container .left,.login-container .right {
   @apply flex items-center justify-center ;
}
.login-container .right {
   @apply bg-light-50 flex-col;
}
.left>div>div:first-child {

   @apply text-5xl font-bold text-white mb-4;
}
.left>div>div:last-child {
   @apply text-gray-200 text-sm;
}
.right .title {
   @apply font-bold text-3xl text-gray-800;
}
.right>div {
   @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
.right>div>span:first-child,.right>div>span:last-child {
   @apply h-[1px] w-16 bg-gray-200;
}
.right>div>span:nth-child(2) {
   @apply text-gray-300 my-5 flex items-center justify-center;
}







</style>
