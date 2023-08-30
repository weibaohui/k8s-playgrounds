<script setup lang="ts">
import { V1ConfigMap } from '@backend/k8s/model/V1ConfigMap'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import CmActionView from '@frontend/components/configmap/CmActionView.vue'
import CmBasicInfoView from '@frontend/components/configmap/CmBasicInfoView.vue'
import CmDataEditView from '@frontend/components/configmap/CmDataEditView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  cm: V1ConfigMap,
})
</script>

<template>
  <NMessageProvider>
    <CmActionView :is-dropdown="false" :cm="props.cm" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <CmBasicInfoView :cm="props.cm" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.cm.metadata" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Data
    </NText>
  </NH6>
  <NMessageProvider>
    <CmDataEditView :cm="props.cm" />
  </NMessageProvider>
</template>

<style scoped>

</style>
