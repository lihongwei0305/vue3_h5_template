<template>
  <van-pull-refresh v-if="list.length" v-model="refreshing" @refresh="onRefresh" :immediate-check="false">
    <template v-if="isPag">
      <slot v-for="item in list" :item="item"></slot>
    </template>

    <van-list
        v-else
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <template v-for="(item,index) in list">
        <slot :item="item" :index="index"></slot>
      </template>

    </van-list>
  </van-pull-refresh>

  <div v-else style="height:100%;display: grid; place-content: center" @click="handleReload">加载中...</div>


</template>

<script setup>
import clReiAttClipApi from '@/api/reimbs/clReiAttClip'
import {inject, nextTick, onMounted, reactive, ref, watch} from "vue";

defineOptions({name: 'scrollList'})

const isPag = inject('isPag')

const props = defineProps({
  getList: Function,
  scrollListState: Object
})

let state = {
  params: {}
}

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const pages = ref(0)
const total = ref(0)
const pageConfig = reactive({
  currpage: 1,
  pagesize: 50
})

watch(() => props.scrollListState, () => {
  let {params} = props.scrollListState
  state.params = params
  getList({...params, ...pageConfig})
}, {deep: true})

const getList = async (params) => {
  let {api} = props.scrollListState
  let {data: res} = await api(params)
  if (refreshing.value) {
    list.value = res.data.records || []
  } else {

    list.value = list.value.concat(res.data.records || []);
  }
  pages.value = res.data.pages
  total.value = res.data.total
  pageConfig.currpage++

}

const onLoad = async () => {
  if (refreshing.value) {
    await getList({...state.params, ...pageConfig})
    refreshing.value = false
    return
  }
  if (total.value === list.value.length) {
    finished.value = true;
    return;
  }

  if (refreshing.value) {
    list.value = [];
    refreshing.value = false;
  }
  !refreshing.value && await getList({...state.params, ...pageConfig})
  loading.value = false;


};

const onRefresh = () => {
  pageConfig.currpage = 1
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
onMounted(async () => {
})

const handleReload = () => {
  console.log('handleReload')
}


defineExpose({
  list
})

</script>

<style scoped>

</style>