<template>

  <router-view></router-view>

</template>

<script setup>

import {useRouter} from "vue-router";
import useUserStore from "./store/user.js";
import {provide} from "vue";
import baseUrl from "@/utils/baseUrl.js";

const router = useRouter()
const userStore = useUserStore()
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  if (!userStore.isLogin) return next('/login')
  next()
})

provide('BASE_URL', baseUrl)


</script>


<style>
body, html {
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
}


</style>

<style scoped>


.slide-left-leave-active,
.slide-left-enter-active {
  transition: all 10s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slide-left-leave,
.slide-left-enter-to {
  transform: translateX(0);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-left-enter {
  transform: translateX(100%);
}


</style>
