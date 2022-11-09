<template>
  <van-cell v-for="item in testPersonList"
            :key="item.id"
            :title="item.label"
            is-link
            @click="handleClick(item)"></van-cell>
</template>

<script setup>
import {ref} from "vue";
import md5 from '@/utils/md5-3.js';
import {useRouter} from 'vue-router'
import useUserStore from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

const testPersonList = ref([

  {
    id: '13976984257',
    label: '叶诗颖',
    pw: '13976984257',
  },
  {
    id: '13907649559',
    label: '林小翠',
    pw: '13907649559',
  },

  {
    id: '13637620988',
    label: '黄业盛',
    pw: '13637620988',
  },
  {
    id: '15120822558',
    label: '王哲川',
    pw: '15120822558',
  },
  {
    id: '13385229753',
    label: '袁德康',
    pw: '13385229753',
  },
  {
    id: '18789351675',
    label: '樊和',
    pw: '18789351675',
  },
  {
    id: '13034904501',
    label: '陈华川',
    pw: '13034904501',
  },
  {
    id: '18889625637',
    label: '陈玥彤',
    pw: '18889625637',
  },
])
const handleClick = async (item) => {
  let loginForm = {...item}
  // loginForm.account = '123003001'; // '460000005';
  loginForm.account = item.id;
  loginForm.admdivcode = '460000000';
  loginForm.password = item.pw ? item.pw : '123'
  loginForm.code = '8888';
  loginForm.key = String(new Date().getTime()) + Math.floor(Math.random() * (9999 - 1) + 1);
  loginForm.password = md5.hex_md5(md5.hex_md5(loginForm.password));

  delete loginForm.id
  delete loginForm.label
  delete loginForm.pw

  await userStore.login(loginForm)
  await router.push('/home')

  // const handleReLogin = (msg = '登录失败') => {
  //   this.$confirm(`${msg}，是否重新登录？`, '提示', {
  //     confirmButtonText: '确定',
  //     cancelButtonText: '取消',
  //     type: 'warning',
  //   }).then(() => {
  //     this.autoLogin();
  //   });
  // };

}


</script>

<style scoped>

</style>