<template>
  <van-popup v-model:show="show" position="right" :style="{ width: '90%', height:'100vh'}" @close="close">
    <div class="container">
      <div class="header">
        <van-icon name="close" size="24" @click="show = false"/>
      </div>
      <div class="content">
        <field-form ref="fieldFormRef" :list="filterList" :init-form-data="initFilterFormData"></field-form>
      </div>

      <div class="footer">
        <van-button size="normal" type="primary" style="margin-right: 10px">重置</van-button>
        <van-button size="normal" type="primary" @click="confirm">确认</van-button>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";

defineOptions({name: 'popupPage'})
const emit = defineEmits(['update:show', 'confirm'])
const props = defineProps({
  show: Boolean,
  filterList: Array,
  initFilterFormData: Object
})

let fieldFormRef = ref(null)

const close = () => {
  emit('update:show', false)
}

const confirm = () => {
  let formData = fieldFormRef.value.getFormData()
  close()
  emit('confirm', formData)
}
onMounted(() => {
  console.log('fieldFormRef', fieldFormRef.value)
})
defineExpose({
  fieldFormRef
})


</script>

<style scoped lang="scss">
.container {
  .header {
    padding: 10px;
  }

  .content {
    height: calc(100vh - 100px);
    overflow-y: scroll;
  }

  .footer {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 10px;
  }
}
</style>