<script setup lang="ts">
import { V1ResourceQuota } from '@backend/k8s/model/V1ResourceQuota'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import QuotaActionView from '@frontend/components/resourcequota/QuotaActionView.vue'
import QuotaBasicInfoView from '@frontend/components/resourcequota/QuotaBasicInfoView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  quota: V1ResourceQuota,
})
</script>

<template>
  <NMessageProvider>
    <QuotaActionView :is-dropdown="false" :quota="props.quota" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <QuotaBasicInfoView :quota="quota" />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.quota.metadata" />
</template>

<style scoped>

</style>
