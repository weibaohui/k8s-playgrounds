<script setup lang="ts">
import { V1ConfigMap } from '@backend/k8s/model/V1ConfigMap'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import CmActionView from '@frontend/components/configmap/CmActionView.vue'
import CmBasicInfoView from '@frontend/components/configmap/CmBasicInfoView.vue'
import CmDataEditView from '@frontend/components/configmap/CmDataEditView.vue'
import { NMessageProvider } from 'naive-ui'
import TitleBar from '@frontend/components/common/TitleBar.vue'

const props = defineProps({
  cm: V1ConfigMap,
})
</script>

<template>
  <NMessageProvider>
    <CmActionView :is-dropdown="false" :cm="props.cm" />
  </NMessageProvider>

  <CmBasicInfoView :cm="props.cm" :show-title="true" />

  <InvolvedEventView :item="props.cm.metadata" :show-title="true" />
  <TitleBar title="Data" />
  <NMessageProvider>
    <CmDataEditView :cm="props.cm" />
  </NMessageProvider>
</template>

<style scoped>

</style>
