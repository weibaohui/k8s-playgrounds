<script setup lang="ts">
import { V1LimitRange } from '@backend/k8s/model/V1LimitRange'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import LimitsActionView from '@frontend/components/limitrange/LimitsActionView.vue'
import LimitsBasicInfoView from '@frontend/components/limitrange/LimitsBasicInfoView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  limits: V1LimitRange,
})
</script>

<template>
  <NMessageProvider>
    <LimitsActionView :is-dropdown="false" :limits="props.limits" />
  </NMessageProvider>

  <LimitsBasicInfoView :limits="props.limits" :show-title="true" />

  <InvolvedEventView :item="props.limits.metadata" :show-title="true" />
</template>

<style scoped>

</style>
