<template>

  <div>
    <!--    <dropdown-menu-->
    <!--        ref="dropdownMenuRef"-->
    <!--        :list="state.list"-->
    <!--        :first-item-name="'attachCategory'"-->
    <!--        :dropdown-form-data="state.dropdownFormData">-->
    <!--    </dropdown-menu>-->

    <float-box icon="icon-shaixuan" @click="handleShaiXuanClick" :initStyle="{top:'1%', left:'80%'}"/>
    <float-box v-show="backTopVisible" iconName="back-top" @click="handleBackTop"
               :initStyle="{bottom:'1%', left:'80%'}"/>

    <!--    <div style="margin-top: 48px;overflow-y: scroll;" :style="{height: `calc(100vh - ${isPag? '90px' : '50px'})`}">-->
    <div class="scrollList_Container" style="overflow-y: scroll; height: 100vh">
      <scroll-list ref="scrollListRef" :getList="getList" :scrollListState="scrollListState">
        <template #="{item,index}">
          <slot :item="item" :index="index"></slot>
        </template>
      </scroll-list>

      <pagination v-if="isPag"></pagination>

    </div>

    <popup-page ref="popupPageRef" v-model:show="show" v-bind="filterState" @confirm="confirm"/>


  </div>


</template>

<script setup>
import {computed, onMounted, provide, reactive, ref, toRefs} from "vue";

defineOptions({name: 'commonPage'})

const dropdownMenuRef = ref(null)
const popupPageRef = ref(null)
const scrollListRef = ref(null)
let show = ref(false)

const props = defineProps({
  isPag: {type: Boolean, default: false},
  filterList: Array,
  filterState: Object,
  getList: Function,
  scrollListState: Object
})

let backTopVisible = ref(false)

let state = reactive({
  list: [],
  dropdownFormData: {},
  dropdownMenuObj: {}
})


provide('isPag', props.isPag)
provide('scrollListState', computed(() => {
  return props.scrollListState
}))


onMounted(async () => {
  state.dropdownMenuObj = dropdownMenuRef.value
  document.querySelector('.scrollList_Container').onscroll = (e) => {
    let scrollTop = e.target.scrollTop
    backTopVisible.value = scrollTop >= 50

  }

  console.log(popupPageRef.value)

})


const handleBackTop = () => {
  document.querySelector('.scrollList_Container').scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

/*
*  筛选
* */
const handleShaiXuanClick = () => {
  show.value = true
}


const confirm = (data) => {
  console.log(data)
}


const getList = ()=>{

  return scrollListRef.value.list || []
}

defineExpose({
  ...toRefs(state),
  scrollListRef,
  getList
})

</script>

<style scoped>

</style>