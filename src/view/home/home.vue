<template>
  <router-view #="{Component,route}">
    <!--    <div>{{ route.meta }}</div>-->
    <Transition name='fade'>
      <div :key="Component">
        <component :is="Component"></component>
      </div>
    </Transition>

  </router-view>


  <bottom-tabbar v-show="$route.meta.isLayout" v-model:active="active"></bottom-tabbar>
</template>

<script setup>
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
import useTabBarStore from '../../store/tabbar.js'
// import asdas from '@/a'

/***
 * isLayout 是否主页
 * isAnimate 是否需要动画
 *
 *  进入主页不需要动画
 *
 */


const router = useRouter()

const tabBarStore = useTabBarStore()

let active = ref(0)

active.value = /^\s*$/g.test(tabBarStore.active) ? active.value : tabBarStore.active

watch(() => active.value, () => {
  console.log(active.value)
  tabBarStore.setActive(active.value)
});


router.beforeEach((to, from) => {

  let toMeta = to.meta || {}
  let fromMeta = from.meta || {}
  //
  // console.log('to', to)
  // console.log('form', from)
  // transitionName.value = toMeta.level > fromMeta.level ? 'slide-left' : 'fade-right'

})


</script>

<style scoped lang="scss">

//.slide-left-enter-active {
//  transition: all .5s;
//  position: absolute;
//  top: 0;
//  left: 0;
//  width: 100%;
//  height: 100%;
//  z-index: 999;
//}
//
//.slide-left-leave,
//.slide-left-enter-to {
//  transform: translateX(0);
//}
//
//.slide-left-leave-to {
//  display: none;
//  transform: translateX(-100%);
//}
//
//.slide-left-enter {
//  transform: translateX(100%);
//}

//这里不要加 .fade-leave-active了
.fade-enter-active {
  transition: opacity 0.5s ease;
}

//把离开时的开始状态设置为display:none
.fade-leave-from {
  display: none;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>