<template>
  <van-popup v-model:show="showPicker" position="bottom" @close="handleClose" teleport="body">
    <van-picker
        :columns="columns"
        :columns-field-names="columnsFieldNames"
        @confirm="handleConfirm"
        @cancel="onCancel"
    />
  </van-popup>
</template>

<script setup>
defineOptions({name: 'picker'})
const emit = defineEmits(["onCancel", "close", "confirm"])
const props = defineProps({
  showPicker: Boolean,
  columns: Array,
  item: Object,
  columnsFieldNames: {
    type: Object,
    default: () => {
      return {
        text: 'label',
        value: 'value'
      }
    }
  }
})

const handleClose = () => {
  emit("close", props.item, false)
}
const onCancel = () => {
  emit("onCancel", false)
}
const handleConfirm = (data) => {
  emit("confirm", props.item,data)
  emit("close", props.item, false)
}


</script>

<style scoped>

</style>