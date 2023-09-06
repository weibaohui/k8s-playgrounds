<script setup lang="ts">
import { V1NetworkPolicy } from '@backend/k8s/model/v1NetworkPolicy'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import NetpolActionView from '@frontend/components/NetworkPolicy/NetpolActionView.vue'
import NetpolBasicInfoView from '@frontend/components/NetworkPolicy/NetpolBasicInfoView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  netpol: V1NetworkPolicy,
})
</script>

<template>
  <NMessageProvider>
    <NetpolActionView :is-dropdown="false" :netpol="props.netpol" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <NetpolBasicInfoView :netpol="props.netpol" />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.netpol.metadata" />
</template>

<style scoped>

</style>
