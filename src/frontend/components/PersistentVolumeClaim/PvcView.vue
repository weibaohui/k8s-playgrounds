<script setup lang="ts">
import { V1PersistentVolumeClaim } from '@backend/k8s/model/V1PersistentVolumeClaim'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import PvcActionView from '@frontend/components/PersistentVolumeClaim/PvcActionView.vue'
import PvcBasicInfoView from '@frontend/components/PersistentVolumeClaim/PvcBasicInfoView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  pvc: V1PersistentVolumeClaim,
})
</script>

<template>
  <NMessageProvider>
    <PvcActionView :is-dropdown="false" :pvc="props.pvc" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <PvcBasicInfoView :pvc="props.pvc" />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.pvc.metadata" />
</template>

<style scoped>

</style>
