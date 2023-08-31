<script setup lang="ts">
import { V1PriorityClass } from '@backend/k8s/model/v1PriorityClass'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import PcActionView from '@frontend/components/priorityclass/PcActionView.vue'
import PcBasicInfoView from '@frontend/components/priorityclass/PcBasicInfoView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  pc: V1PriorityClass,
})
</script>

<template>
  <NMessageProvider>
    <PcActionView :is-dropdown="false" :pc="props.pc" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <PcBasicInfoView :pc="props.pc" />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.pc.metadata" />
</template>

<style scoped>

</style>
