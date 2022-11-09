<template>
  <van-pagination
      class="pagination"
      v-model="currentPage"
      :total-items="totalItems"
      :items-per-page="itemsPerPage"
      @change="handleChange"
  />
</template>

<script setup>
defineOptions({name: 'pagination'})
import {defineProps, ref} from "vue";

const emit = defineEmits(['change'])
const props = defineProps({
  totalItems: {type: Number, default: 0},
  itemsPerPage: {type: Number, default: 0},
})
const currentPage = ref(1)
const handleChange = (val) => {
  emit('change', val)
}

</script>

<style scoped>
.pagination {
  width: 100%;
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>