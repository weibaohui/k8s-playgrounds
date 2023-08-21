<script lang="ts" setup>
import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import * as echarts from 'echarts'

const props = defineProps({
  width: String,
  height: String,
  option: Object,
})

const echartInstance: Ref<echarts.ECharts | null> = ref(null)
const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value
onMounted(
  () => {
    init()
  },
)
onBeforeUnmount(() => {
  if (!echartInstance.value)
    return
  echartInstance.value!.dispose()
  echartInstance.value = null
})

function init() {
  // 基于准备好的dom，初始化echarts实例
  echartInstance.value = echarts.init(main.value, 'light', {
    renderer: 'canvas',
  })
  echartInstance.value.setOption(props.option)
}
</script>

<template>
  <div ref="main" :style="{ width: props.width, height: props.height }" />
</template>

<style scoped>
</style>
