<script setup lang="ts">
import { V1PersistentVolume } from '@backend/k8s/model/V1PersistentVolume'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import PersistentVolumeActionView from '@frontend/components/PersistentVolume/PersistentVolumeActionView.vue'
import PersistentVolumeBasicInfoView from '@frontend/components/PersistentVolume/PersistentVolumeBasicInfoView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  persistentVolume: V1PersistentVolume,
})
</script>

<template>
  <NMessageProvider>
    <PersistentVolumeActionView :is-dropdown="false" :persistent-volume="props.persistentVolume" />
  </NMessageProvider>

  <PersistentVolumeBasicInfoView :persistent-volume="persistentVolume" :show-title="true" />

  <InvolvedEventView :item="props.persistentVolume.metadata" :show-title="true" />
</template>

<style scoped>

</style>
