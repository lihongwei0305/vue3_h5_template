
<template>
  <van-cell title="个人消息" is-link to="personInfo"/>
  <van-cell title="报账资料夹" is-link to="accessoryClamp"/>
</template>
<script setup>

import {onMounted} from "vue";

onMounted(()=>{
  console.log('onMounted')
})

</script>


<style scoped lang="scss">

</style>