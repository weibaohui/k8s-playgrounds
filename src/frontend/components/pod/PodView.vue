<script setup lang="ts">
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import { NMessageProvider } from 'naive-ui'
import ContainersView from '@frontend/components/container/ContainersView.vue'
import PodActionView from '@frontend/components/pod/PodActionView.vue'
import PodBasicInfoView from '@frontend/components/pod/PodBasicInfoView.vue'
import PodVolumesView from '@frontend/components/pod/PodVolumeView.vue'
import { V1Pod } from '@backend/k8s/model/V1Pod'
import TitleBar from '@frontend/components/common/TitleBar.vue'

const props = defineProps({
  pod: V1Pod,
})
</script>

<template>
  <NMessageProvider>
    <PodActionView :is-dropdown="false" :pod="props.pod" />
  </NMessageProvider>

  <PodBasicInfoView :pod="props.pod" :show-title="true" />
  <TitleBar title="Containers" />
  <ContainersView :pod="props.pod" />
  <TitleBar title="Volumes" />
  <PodVolumesView :pod="props.pod" />

  <InvolvedEventView :item="props.pod.metadata" :show-title="true" />
</template>
