<script setup lang="ts">
import { V1PriorityClass } from '@backend/k8s/model/v1PriorityClass'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import PcActionView from '@frontend/components/priorityclass/PcActionView.vue'
import PcBasicInfoView from '@frontend/components/priorityclass/PcBasicInfoView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  pc: V1PriorityClass,
})
</script>

<template>
  <NMessageProvider>
    <PcActionView :is-dropdown="false" :pc="props.pc" />
  </NMessageProvider>

  <PcBasicInfoView :pc="props.pc" :show-title="true" />

  <InvolvedEventView :item="props.pc.metadata" :show-title="true" />
</template>

<style scoped>

</style>
