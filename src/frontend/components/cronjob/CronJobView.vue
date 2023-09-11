<script setup lang="ts">
import { V1CronJob } from '@backend/k8s/model/V1CronJob'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import CronJobActionView from '@frontend/components/cronjob/CronJobActionView.vue'
import CronJobBasicInfoView from '@frontend/components/cronjob/CronJobBasicInfoView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  cj: V1CronJob,
})
</script>

<template>
  <NMessageProvider>
    <CronJobActionView :is-dropdown="false" :cj="props.cj" />
  </NMessageProvider>

  <CronJobBasicInfoView :cj="props.cj" :show-title="true" />

  <InvolvedEventView :item="props.cj.metadata" :show-title="true" />
</template>

<style scoped>

</style>
