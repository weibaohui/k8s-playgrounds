<script setup lang="ts">
import { V1LimitRange } from '@backend/k8s/model/V1LimitRange'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import LimitsActionView from '@frontend/components/limitrange/LimitsActionView.vue'
import LimitsBasicInfoView from '@frontend/components/limitrange/LimitsBasicInfoView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  limits: V1LimitRange,
})
</script>

<template>
  <NMessageProvider>
    <LimitsActionView :is-dropdown="false" :limits="props.limits" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <LimitsBasicInfoView :limits="props.limits" />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.limits.metadata" />
</template>

<style scoped>

</style>
