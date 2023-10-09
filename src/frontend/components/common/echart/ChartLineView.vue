<script lang="ts" setup>
import EChartView from '@frontend/components/common/echart/EChartView.vue'
import { computed } from 'vue'

const props = defineProps({
  items: Array<number>,
  width: String,
  height: String,
  name: String,
})
const opt = computed(() => {
  return {
    title: {
      text: props.name,
    },
    tooltip: {
      show: true,
      formatter: '{c0}',

    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: true,
      },
      axisLabel: {
        show: true,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      splitLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
      axisLine: {
        show: true,
      },
      axisLabel: {
        show: true,
      },
      axisTick: {
        show: true,
      },
    },
    series: [
      {
        name: props.name,
        type: 'line',
        data: props.items,
        smooth: true,
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
        areaStyle: {
          color: '#43505F',
        },
      },
    ],
  }
})
</script>

<template>
  <EChartView :option="opt" :width="props.width" :height="props.height" />
</template>

<style scoped>
</style>
