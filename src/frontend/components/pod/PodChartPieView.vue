<script lang="ts" setup>
import { computed, ref } from 'vue'

// import { Gauge } from '@opentiny/vue-chart'
import Pie from '@opentiny/vue-chart-pie'

const props = defineProps({
  count: Number,
  items: Array<number>,
})
const chartData = ref({
  columns: ['日期', '访问用户'],
  rows: [
    { 日期: '1/1', 访问用户: 1393 },
    { 日期: '1/2', 访问用户: 3530 },
    { 日期: '1/3', 访问用户: 2923 },
    { 日期: '1/4', 访问用户: 1723 },
    { 日期: '1/5', 访问用户: 3792 },
    { 日期: '1/6', 访问用户: 4593 },
  ],
})
// 设置横轴为连续的时间轴
const chartSettings = computed(() => {
  return {

  }
})
const extend = ref({})
</script>

<template>
  <Pie :settings="chartSettings" :data="chartData" :width="100" />
</template>

<style scoped>
</style>
