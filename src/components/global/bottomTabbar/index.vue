<template>
  <van-tabbar v-model="active"  @change="handleChange">
    <van-tabbar-item v-for="item in tabBarItems" :icon="item.icon" :to="item.to">{{ item.title }}</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
defineOptions({name:'bottomTabbar'})
import {reactive, ref} from "vue";

defineProps({
  active: [String, Number],
})
const emit = defineEmits(["update:active"])


let tabBarItems = ref([
  {icon: 'home-o', to: '/backlog', title: '待办'},
  {icon: 'search', to: '/finishedLog', title: '已办'},
  {icon: 'friends-o', to: '/reimbsLog', title: '报账'},
  {icon: 'user-o', to: '/my', title: '我的'},
])


const handleChange = (val) => {
  emit("update:active", val)
}

</script>

<style scoped>

</style>