<script setup lang="ts">
import { V1PersistentVolume } from '@backend/k8s/model/v1PersistentVolume'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import PersistentVolumeActionView from '@frontend/components/persistentVolume/PersistentVolumeActionView.vue'
import PersistentVolumeBasicInfoView from '@frontend/components/persistentVolume/PersistentVolumeBasicInfoView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  persistentVolume: V1PersistentVolume,
})
</script>

<template>
  <NMessageProvider>
    <PersistentVolumeActionView :is-dropdown="false" :persistent-volume="props.persistentVolume" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <PersistentVolumeBasicInfoView :persistent-volume="persistentVolume" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.persistentVolume.metadata" />
</template>

<style scoped>

</style>
