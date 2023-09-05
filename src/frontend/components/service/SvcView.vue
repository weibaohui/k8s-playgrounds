<script setup lang="ts">
import { V1Service } from '@backend/k8s/model/V1Service'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import SvcActionView from '@frontend/components/service/SvcActionView.vue'
import SvcBasicInfoView from '@frontend/components/service/SvcBasicInfoView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  svc: V1Service,
})
</script>

<template>
  <NMessageProvider>
    <SvcActionView :is-dropdown="false" :svc="props.svc" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <SvcBasicInfoView :svc="props.svc" />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.svc.metadata" />
</template>

<style scoped>

</style>
