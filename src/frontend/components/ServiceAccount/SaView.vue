<script setup lang="ts">
import { V1ServiceAccount } from '@backend/k8s/model/V1ServiceAccount'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import SaActionView from '@frontend/components/ServiceAccount/SaActionView.vue'
import SaBasicInfoView from '@frontend/components/ServiceAccount/SaBasicInfoView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  sa: V1ServiceAccount,
})
</script>

<template>
  <NMessageProvider>
    <SaActionView :is-dropdown="false" :sa="props.sa" />
  </NMessageProvider>

  <SaBasicInfoView :sa="props.sa" :show-title="true" />

  <InvolvedEventView :item="props.sa.metadata" :show-title="true" />
</template>

<style scoped>

</style>
