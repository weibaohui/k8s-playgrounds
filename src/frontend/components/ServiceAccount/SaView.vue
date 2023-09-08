<script setup lang="ts">
import { V1ServiceAccount } from '@backend/k8s/model/V1ServiceAccount'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
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
  <TitleBar title="Basic info" />
  <SaBasicInfoView :sa="props.sa" />
  <TitleBar title="Events" />
  <InvolvedEventView :item="props.sa.metadata" />
</template>

<style scoped>

</style>
