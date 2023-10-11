<script lang="ts" setup>
import { TimerUtils } from '@backend/utils/TimerUtils'
import ChartLineView from '@frontend/components/common/echart/ChartLineView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NCard, NGrid, NGridItem, NTabPane, NTabs } from 'naive-ui'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const counterLines = ref<Map<string, Array<number>>>()
const workloadCounterLines = ref()
const wks = ['Pod', 'Deployment']

let timerId = 0
onMounted(async () => {
  timerId = TimerUtils.everyTwoSeconds(async () => {
    counterLines.value = await K8sService.playService.counterControllerListAllCounterLine()
    workloadCounterLines.value = {}
    wks.forEach((k) => {
      workloadCounterLines.value[k] = counterLines.value[k].toString().split(',')
    })
  })
})

onBeforeUnmount(() => {
  clearInterval(timerId)
})
</script>

<template>
  <NCard title="资源走势" style="margin-bottom: 16px">
    <NTabs type="line" animated>
      <NTabPane name="Workload" tab="Workload">
        <NGrid :x-gap="20" :y-gap="20" :cols="4">
          <NGridItem v-for="(v, k) in workloadCounterLines" :key="k">
            <ChartLineView :items="v" :name="`${k}`" width="200px" height="200px" />
          </NGridItem>
        </NGrid>
      </NTabPane>
      <NTabPane name="全部" tab="ALL">
        <NGrid :x-gap="20" :y-gap="20" :cols="4">
          <NGridItem v-for="(v, k) in counterLines" :key="k">
            <ChartLineView :items="v" :name="`${k}`" width="200px" height="200px" />
          </NGridItem>
        </NGrid>
      </NTabPane>
    </NTabs>
  </NCard>

  <div />
</template>

<style scoped>

</style>
