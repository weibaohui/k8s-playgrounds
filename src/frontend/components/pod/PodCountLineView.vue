<script lang="ts" setup>
import { ResType } from '@backend/k8s/watch/watch.model'
import { TimerUtils } from '@backend/utils/TimerUtils'
import PodChartLineView from '@frontend/components/pod/PodChartLineView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NCol, NRow } from 'naive-ui'
import { onMounted, ref } from 'vue'

const items = ref<Array<number>>()

onMounted(async () => {
  TimerUtils.everyTwoSeconds(async () => {
    const pods = await K8sService.playService.counterControllerListCounterLineByKey({
      key: ResType.Pod,
    })
    console.log(pods)
    items.value = pods
  })
})
function getCount() {
  return items.value ? items.value.at(0) : 0
}
</script>

<template>
  <NRow gutter="12">
    <NCol :span="6">
      <div class="light-green">
        {{ getCount() }}
        <PodChartLineView :items="items" />
      </div>
    </NCol>
    <NCol :span="6">
      <div class="green">
        <PodChartLineView :items="items" />
      </div>
    </NCol>
    <NCol :span="6">
      <div class="light-green" />
    </NCol>
    <NCol :span="6">
      <div class="green" />
    </NCol>
  </NRow>
</template>

<style scoped>
.light-green {
  height: 100px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 100px;
  background-color: rgba(0, 128, 0, 0.24);
}
</style>
