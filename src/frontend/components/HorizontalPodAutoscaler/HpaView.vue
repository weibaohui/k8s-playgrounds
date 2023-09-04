<script setup lang="ts">
import { V2HorizontalPodAutoscaler } from '@backend/k8s/model/v2HorizontalPodAutoscaler'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import HpaActionView from '@frontend/components/HorizontalPodAutoscaler/HpaActionView.vue'
import HpaBasicInfoView from '@frontend/components/HorizontalPodAutoscaler/HpaBasicInfoView.vue'
import HpaMetricsView from '@frontend/components/HorizontalPodAutoscaler/HpaMetricsView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  hpa: V2HorizontalPodAutoscaler,
})
</script>

<template>
  <NMessageProvider>
    <HpaActionView :is-dropdown="false" :hpa="props.hpa" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <HpaBasicInfoView :hpa="props.hpa" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Metrics
    </NText>
  </NH6>
  <HpaMetricsView :hpa="props.hpa" />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.hpa.metadata" />
</template>

<style scoped>

</style>
