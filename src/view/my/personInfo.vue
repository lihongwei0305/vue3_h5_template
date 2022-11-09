<!--
 * @Author: lihongwei
 * @LastEditors: lihongewi
 * @Date: 2022/8/30 17:47
 * @LastEditTime: 2022/8/30 17:47
 * @Description: 个人信息
 * @FilePath: \gfmis-reimbs-app\src\view\my\personInfo.vue
-->

<template>
  <field-form :list="state.list" :init-form-data="state.initFormData" readonly></field-form>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import hztBasPersonApi from "@/api/hzt/hztBasPerson.js";
import {useCommonRequest} from '@/hooks/useCommonRequest.js'

let {getTableColumn} = useCommonRequest()

let state = reactive({
  initFormData: {},
  list: []
});
onMounted(async () => {
  await init()
})
const init = async () => {
  state.list = await getTableColumn({fbilltypeno: 6464, fmethodno: 646401})
  state.list = state.list.filter(v => !['isDeptHead', 'isAgencyHead'].includes(v.field))
  await getLoginPerson()
  state.initFormData.personTypeName = state.list.filter(v => v.field === 'personType').pop().options.filter(v => v.value === state.initFormData.personType).pop().label
}

const getLoginPerson = async () => {
  let {data: res} = await hztBasPersonApi.getLoginPerson({})
  if (!(res.code === 0 || res.code === 200)) {
    return;
  }
  state.initFormData = res.data
}

</script>

<style scoped>

</style>