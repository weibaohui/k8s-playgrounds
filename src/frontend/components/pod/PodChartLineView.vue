<script lang="ts" setup>
import { computed, ref } from 'vue'

// import { Gauge } from '@opentiny/vue-chart'
import Line from '@opentiny/vue-chart-line'

const props = defineProps({
  count: Number,
  items: Array<number>,
})

const chartData = computed(() => {
  return {
    columns: ['日期', '访问用户'],
    rows: [
      { 日期: '2018-01-01', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
      { 日期: '2018-01-02', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
      { 日期: '2018-01-03', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
      { 日期: '2018-01-05', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
      { 日期: '2018-01-10', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
      { 日期: '2018-01-20', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
    ],
  }
})

// 设置横轴为连续的时间轴
const chartSettings = computed(() => {
  return {
  // backgroundColor: '#1c1c1c',
    xAxis: {
      type: 'category',
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      boundaryGap: false,
      data: ['A', 'B', 'C', 'D', 'E', 'F'],

    },
    yAxis: {
      type: 'value',
      min: 0,
      // max: 140,
      splitNumber: 1,
      splitLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    grid: {
      height: '20px',
      width: '100px',
    },
    series: [
      {
        // data: [820, 932, 901, 934, 1290, 1330, 1320],
        data: props.items,
        smooth: true,
        type: 'line',
        showAllSymbol: false,
        label: {
          show: false,
        },
        itemStyle: {
          color: '#4870DB',
        },
        lineStyle: {
          width: 1,
        },
        tooltip: {
          show: false,
        },
        areaStyle: {
          color: '#43505F',
        },
      },
    ],
  }
})
const extend = ref({})
</script>

<template>
  <div style="height: 20px;width: 100px">
    <Line :settings="chartSettings" :extend="extend" />
  </div>
</template>

<style scoped>
</style>
