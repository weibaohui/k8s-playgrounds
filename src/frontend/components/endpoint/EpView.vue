<script setup lang="ts">
import { V1Endpoints } from '@backend/k8s/model/V1Endpoints'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import EpActionView from '@frontend/components/endpoint/EpActionView.vue'
import EpBasicInfoView from '@frontend/components/endpoint/EpBasicInfoView.vue'
import EpSubsetView from '@frontend/components/endpoint/EpSubsetView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  ep: V1Endpoints,
})
</script>

<template>
  <NMessageProvider>
    <EpActionView :is-dropdown="false" :ep="props.ep" />
  </NMessageProvider>

  <EpBasicInfoView :ep="props.ep" :show-title="true" />

  <TitleBar title="Subsets" />
  <EpSubsetView v-for="subset in props.ep.subsets" :key="subset" :subset="subset" />

  <InvolvedEventView :item="props.ep.metadata" :show-title="true" />
</template>

<style scoped>

</style>
