<script lang="ts" setup>
import { TimerUtils } from '@backend/utils/TimerUtils'
import ChartLineView from '@frontend/components/common/echart/ChartLineView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NGrid, NGridItem } from 'naive-ui'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const counterLines = ref<Map<string, Array<number>>>()

let timerId = 0
onMounted(async () => {
  timerId = TimerUtils.everyTwoSeconds(async () => {
    counterLines.value = await K8sService.playService.counterControllerListAllCounterLine()
  })
})

onBeforeUnmount(() => {
  clearInterval(timerId)
})
</script>

<template>
  <NGrid :x-gap="20" :y-gap="20" :cols="4">
    <NGridItem v-for="(v, k) in counterLines" :key="k">
      <ChartLineView :items="v" :name="k" width="200px" height="200px" />
    </NGridItem>
  </NGrid>
  <div />
</template>

<style scoped>

</style>
