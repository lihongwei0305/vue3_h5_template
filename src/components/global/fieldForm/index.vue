<template>
  <div>
    <van-form>
      <template v-for="item in list" :key="item.fieldRelId"
      >
        <van-field
            v-model="formData[ item.fdisplayfield? item.fdisplayfield : item.field]"
            :name="item.field"
            :label="item.title || item.label"
            :label-width="item.labelWidth || 100"
            :is-link="isPicker(item.fcomptype || item.itemType)"
            :readonly="readonly || isPicker(item.fcomptype || item.itemType)"
            @click="handleClick(item)"
        />
      </template>

    </van-form>


    <picker
        v-for="item in getPickerList"
        :item="item"
        :show-picker="pickerShow[item.field]"
        :columns="item.options"
        @close="handleClose"
        @confirm="handleConfirm"
    >

    </picker>


  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref, toRefs, watch,getCurrentInstance} from "vue";
import {usePicker} from "@com/global/picker/usePicke.js";

defineOptions({name: 'fieldForm'})
let pickerArr = ["select"]

const { proxy } = getCurrentInstance()
const emit = defineEmits(['initDone'])
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  initFormData: {
    type: Object,
    default: () => {
    }
  },
  readonly: {type: Boolean, default: false}
})


let state = reactive({
  formData: {},
})
let {formData} = toRefs(state)


const {getPickerList, pickerShow, handleClose, handleConfirm} = usePicker(props, formData)


watch(() => props.initFormData, () => {
  state.formData = props.initFormData
})


onMounted(() => {
  state.formData = props.initFormData

  console.log('proxy',proxy)
  emit('initDone', proxy)

})


const isPicker = computed(() => {
  return (type) => {
    return pickerArr.includes(type)
  }
})

const handleClick = (item) => {
  if (props.readonly) return;
  if (!isPicker.value(item.fcomptype || item.itemType)) return
  pickerShow.value[item.field] = true
}

const getFormData = () => {
  let formData = state.formData


  return formData
}

defineExpose({
  ...toRefs(state)
})

</script>

<style scoped>

</style>