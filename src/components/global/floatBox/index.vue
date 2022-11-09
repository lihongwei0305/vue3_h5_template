<template>

  <div class="float_box" v-drop="{ overRange: false }" :style="initStyle">
    <van-icon :name="iconName" :class="iconName? '' : 'iconfont'" :class-prefix="icon" size="25"/>
  </div>


</template>

<script setup>
import {ref} from "vue";

defineOptions({name: 'floatBox'})
defineProps({
  icon: String,
  initStyle: Object,
  iconName: String,
});


</script>

<style scoped lang="scss">
.float_box {
  position: fixed;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: grid;
  place-content: center;
  z-index: 999;
}
</style>