<script lang="ts" setup>
import { TimerUtils } from '@backend/utils/TimerUtils'
import PodChartLineView from '@frontend/components/pod/PodChartLineView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { onMounted, ref } from 'vue'

const podCount = ref(0)
const items = ref<Array<number>>()
items.value = [820, 932, 901, 934, 1290, 1330, 1320]

onMounted(async () => {
  TimerUtils.delayTwoSeconds(async () => {
    const pods = await K8sService.playService.podControllerList()
    podCount.value = pods.length
    items.value = [880, 858, 990, 1000, 1100, 1120, 1350]
  })
})
</script>

<template>
  <PodChartLineView :count="podCount" :items="items" />
</template>

<style scoped>

</style>
