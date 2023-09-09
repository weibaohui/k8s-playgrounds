<script setup lang="ts">
import { V2HorizontalPodAutoscaler } from '@backend/k8s/model/v2HorizontalPodAutoscaler'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import HpaActionView from '@frontend/components/HorizontalPodAutoscaler/HpaActionView.vue'
import HpaBasicInfoView from '@frontend/components/HorizontalPodAutoscaler/HpaBasicInfoView.vue'
import HpaMetricsView from '@frontend/components/HorizontalPodAutoscaler/HpaMetricsView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  hpa: V2HorizontalPodAutoscaler,
})
</script>

<template>
  <NMessageProvider>
    <HpaActionView :is-dropdown="false" :hpa="props.hpa" />
  </NMessageProvider>

  <HpaBasicInfoView :hpa="props.hpa" :show-title="true" />

  <TitleBar title="Metrics" />
  <HpaMetricsView :hpa="props.hpa" />

  <InvolvedEventView :item="props.hpa.metadata" :show-title="true" />
</template>

<style scoped>

</style>
