<script setup lang="ts">
import { V1Endpoints } from '@backend/k8s/model/V1Endpoints'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import EpActionView from '@frontend/components/endpoint/EpActionView.vue'
import EpBasicInfoView from '@frontend/components/endpoint/EpBasicInfoView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  ep: V1Endpoints,
})
</script>

<template>
  <NMessageProvider>
    <EpActionView :is-dropdown="false" :ep="props.ep" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <EpBasicInfoView :ep="props.ep" />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.ep.metadata" />
</template>

<style scoped>

</style>
