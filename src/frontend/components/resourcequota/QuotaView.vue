<script setup lang="ts">
import { V1ResourceQuota } from '@backend/k8s/model/V1ResourceQuota'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import QuotaActionView from '@frontend/components/resourcequota/QuotaActionView.vue'
import QuotaBasicInfoView from '@frontend/components/resourcequota/QuotaBasicInfoView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  quota: V1ResourceQuota,
})
</script>

<template>
  <NMessageProvider>
    <QuotaActionView :is-dropdown="false" :quota="props.quota" />
  </NMessageProvider>

  <QuotaBasicInfoView :quota="quota" :show-title="true" />

  <InvolvedEventView :item="props.quota.metadata" :show-title="true" />
</template>

<style scoped>

</style>
