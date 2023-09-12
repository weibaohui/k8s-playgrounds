<script setup lang="ts">
import { V1ValidatingWebhookConfiguration } from '@backend/k8s/model/V1ValidatingWebhookConfiguration'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import ValidatingWebhookActionView from '@frontend/components/ValidatingWebhook/ValidatingWebhookActionView.vue'
import ValidatingWebhookBasicInfoView from '@frontend/components/ValidatingWebhook/ValidatingWebhookBasicInfoView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  vw: V1ValidatingWebhookConfiguration,
})
</script>

<template>
  <NMessageProvider>
    <ValidatingWebhookActionView :is-dropdown="false" :vw="props.vw" />
  </NMessageProvider>
  <ValidatingWebhookBasicInfoView :vw="props.vw" :show-title="true" />
  <InvolvedEventView :item="props.vw.metadata" :show-title="true" />
</template>

<style scoped>

</style>
