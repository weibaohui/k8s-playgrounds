<script lang="ts" setup>
import { computed, ref } from 'vue'

// import { Gauge } from '@opentiny/vue-chart'
import Line from '@opentiny/vue-chart-line'

const props = defineProps({
  count: Number,
  items: Array<number>,
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
