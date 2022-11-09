<!--
 * @Author: lihongwei
 * @LastEditors: lihongewi
 * @Date: 2022/9/7 10:14
 * @LastEditTime: 2022/9/7 10:14
 * @Description: 列表页顶部下拉菜单
 * @FilePath: \gfmis-reimbs-app\src\components\dropdownMenu.vue
-->

<!--
    下拉菜单 - 筛选条件
    移动端无法确定下拉菜单的顺序
    固定为两个van-dropdown-item 结构为( 全部商品 |  筛选 )
    必须传 firstItemName 第一个下拉菜单对应的itemName

 -->


<template>
  <van-dropdown-menu
      active-color="#1989fa"
      class="dropdown-menu"
      :close-on-click-outside="false"
  >

    <van-dropdown-item :title="firstItem.label"
                       v-model="formData[firstItem.itemName]"
                       :options="firstItem.options"
                       @change="handleChange"

    />
    <van-dropdown-item title="筛选" ref="item">
      <template v-for="item in menuList">
        <van-cell v-if="!item.first" center :title="item.label">
          <template #right-icon>

            <van-field
                v-if="item.fcomptype === 'select' || item.itemType === 'select'"
                v-model="formData[item.fdisplayfield? item.fdisplayfield : item.itemName]"
                is-link
                readonly
                name="picker"
                placeholder="点击选择城市"
                @click="pickerShow[item.itemName] = true"
            />


          </template>
        </van-cell>
      </template>
      <div style="padding: 5px 16px;">
        <van-button type="primary" block round @click="onConfirm">确认</van-button>
      </div>
    </van-dropdown-item>


  </van-dropdown-menu>


  <picker
      v-for="item in getPickerList"
      :item="item"
      :show-picker="pickerShow[item.itemName]"
      :columns="item.options"
      @close="handleClose"
      @confirm="handleConfirm"
  >

  </picker>

</template>


<script setup>
import {computed, nextTick, onMounted, reactive, ref, toRefs, watch} from "vue";
import {usePicker} from "@com/global/picker/usePicke.js";

defineOptions({name: 'dropdownMenu'})
const props = defineProps({
  list: Array,
  dropdownFormData: Object,
  firstItemName: {type: String, default: ''}
})
const item = ref(null)

let state = reactive({
  menuList: [],
  formData: {},
  firstItem: {}
})
let {formData, menuList, firstItem} = toRefs(state)


const {getPickerList, pickerShow, handleClose, handleConfirm} = usePicker(props, formData)


onMounted(() => {
  init()
})


const init = () => {

}

watch(() => props.list, () => {
  formatList()
})
watch(() => props.dropdownFormData, () => {
  state.formData = props.dropdownFormData
})
const curFirstItemData = computed(() => {
  return state.firstItem?.options.filter(v => state.formData[props.firstItemName] === v.id)?.pop() || {}
})


const formatList = () => {
  if (!props.firstItemName) return state.menuList = []
  let list = [...props.list]
  let findIndex = props.list.findIndex(v => v.itemName === props.firstItemName)
  list.splice(0, 1, ...list.splice(findIndex, 1, list[0]))
  list[0] && (list[0].first = true)
  state.firstItem = props.list[findIndex] || {}
  state.menuList = list
}

const handleChange = (val) => {
  console.log(val)
}

const onConfirm = () => {
  console.log('onConfirm')
  item.value.toggle();
}

defineExpose({
  curFirstItemData
})

</script>

<style scoped lang="scss">
:deep .van-cell {
  width: unset;
  border-bottom: unset !important;
  justify-content: space-between;


  &__title {
    flex: unset;
  }

  &__value {
    flex: unset;
  }

}


.dropdown-menu {
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
}
</style>