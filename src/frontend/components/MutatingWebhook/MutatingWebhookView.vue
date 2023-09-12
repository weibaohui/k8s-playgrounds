<script setup lang="ts">
import { V1MutatingWebhookConfiguration } from '@backend/k8s/model/V1MutatingWebhookConfiguration'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import MutatingWebhookActionView from '@frontend/components/MutatingWebhook/MutatingWebhookActionView.vue'
import MutatingWebhookBasicInfoView from '@frontend/components/MutatingWebhook/MutatingWebhookBasicInfoView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  mw: V1MutatingWebhookConfiguration,
})
</script>

<template>
  <NMessageProvider>
    <MutatingWebhookActionView :is-dropdown="false" :mw="props.mw" />
  </NMessageProvider>
  <MutatingWebhookBasicInfoView :mw="props.mw" :show-title="true" />
  <InvolvedEventView :item="props.mw.metadata" :show-title="true" />
</template>

<style scoped>

</style>
