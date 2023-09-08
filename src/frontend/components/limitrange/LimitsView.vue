<script setup lang="ts">
import { V1LimitRange } from '@backend/k8s/model/V1LimitRange'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
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
  <TitleBar title="Basic info" />
  <LimitsBasicInfoView :limits="props.limits" />
  <TitleBar title="Events" />
  <InvolvedEventView :item="props.limits.metadata" />
</template>

<style scoped>

</style>
