<script setup lang="ts">
import { V1EndpointSlice } from '@backend/k8s/model/V1EndpointSlice'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import EndpointSliceActionView from '@frontend/components/EndpointSlice/EndpointSliceActionView.vue'
import EndpointSliceBasicInfoView from '@frontend/components/EndpointSlice/EndpointSliceBasicInfoView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  ep: V1EndpointSlice,
})
</script>

<template>
  <NMessageProvider>
    <EndpointSliceActionView :is-dropdown="false" :ep="props.ep" />
  </NMessageProvider>

  <EndpointSliceBasicInfoView :ep="props.ep" :show-title="true" />
  <InvolvedEventView :item="props.ep.metadata" :show-title="true" />
</template>

<style scoped>

</style>
