<script setup lang="ts">
import { V1Secret } from '@backend/k8s/model/V1Secret'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import SecretActionView from '@frontend/components/secret/SecretActionView.vue'
import SecretBasicInfoView from '@frontend/components/secret/SecretBasicInfoView.vue'
import SecretDataListView from '@frontend/components/secret/SecretDataListView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  secret: V1Secret,
})
</script>

<template>
  <NMessageProvider>
    <SecretActionView :is-dropdown="false" :secret="props.secret" />
  </NMessageProvider>

  <SecretBasicInfoView :secret="props.secret" :show-title="true" />

  <InvolvedEventView :item="props.secret.metadata" />

  <TitleBar title="Data" />
  <NMessageProvider>
    <SecretDataListView :secret="props.secret" :show-title="true" />
  </NMessageProvider>
</template>

<style scoped>

</style>
