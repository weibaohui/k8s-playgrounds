<script setup lang="ts">
import { V1CronJob } from '@backend/k8s/model/v1CronJob'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import CronJobActionView from '@frontend/components/cronjob/CronJobActionView.vue'
import CronJobBasicInfoView from '@frontend/components/cronjob/CronJobBasicInfoView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  cj: V1CronJob,
})
</script>

<template>
  <NMessageProvider>
    <CronJobActionView :is-dropdown="false" :cj="props.cj" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <CronJobBasicInfoView :cj="props.cj" />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.cj.metadata" />
</template>

<style scoped>

</style>
