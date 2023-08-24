<script setup lang="ts">
import { V1DaemonSet } from '@backend/k8s/model/V1DaemonSet'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import DsActionView from '@frontend/components/daemonset/DsActionView.vue'
import DsBasicInfoView from '@frontend/components/daemonset/DsBasicInfoView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  ds: V1DaemonSet,
})
</script>

<template>
  <NMessageProvider>
    <DsActionView :is-dropdown="false" :ds="props.ds" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <DsBasicInfoView :ds="props.ds" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.ds.metadata" />
</template>

<style scoped>

</style>
