<script setup lang="ts">
import { V1NetworkPolicy } from '@backend/k8s/model/V1NetworkPolicy'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import NetpolActionView from '@frontend/components/NetworkPolicy/NetpolActionView.vue'
import NetpolBasicInfoView from '@frontend/components/NetworkPolicy/NetpolBasicInfoView.vue'
import NetpolEgressView from '@frontend/components/NetworkPolicy/NetpolEgressView.vue'
import NetpolIngressView from '@frontend/components/NetworkPolicy/NetpolIngressView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  netpol: V1NetworkPolicy,
})
</script>

<template>
  <NMessageProvider>
    <NetpolActionView :is-dropdown="false" :netpol="props.netpol" />
  </NMessageProvider>

  <NetpolBasicInfoView :netpol="props.netpol" :show-title="true" />

  <TitleBar title="Ingress" />
  <NetpolIngressView :netpol="props.netpol" />

  <TitleBar title="Egress" />
  <NetpolEgressView :netpol="props.netpol" />

  <InvolvedEventView :item="props.netpol.metadata" :show-title="true" />
</template>

<style scoped>

</style>
