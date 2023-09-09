<script setup lang="ts">
import { V1PersistentVolumeClaim } from '@backend/k8s/model/V1PersistentVolumeClaim'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import PvcActionView from '@frontend/components/PersistentVolumeClaim/PvcActionView.vue'
import PvcBasicInfoView from '@frontend/components/PersistentVolumeClaim/PvcBasicInfoView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  pvc: V1PersistentVolumeClaim,
})
</script>

<template>
  <NMessageProvider>
    <PvcActionView :is-dropdown="false" :pvc="props.pvc" />
  </NMessageProvider>

  <PvcBasicInfoView :pvc="props.pvc" :show-title="true" />

  <InvolvedEventView :item="props.pvc.metadata" :show-title="true" />
</template>

<style scoped>

</style>
