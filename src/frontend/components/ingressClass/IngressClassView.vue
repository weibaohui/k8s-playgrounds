<script setup lang="ts">
import { V1IngressClass } from '@backend/k8s/model/v1IngressClass'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import IngressClassActionView from '@frontend/components/ingressClass/IngressClassActionView.vue'
import IngressClassBasicInfoView from '@frontend/components/ingressClass/IngressClassBasicInfoView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  ingressClass: V1IngressClass,
})
</script>

<template>
  <NMessageProvider>
    <IngressClassActionView :is-dropdown="false" :ingress-class="props.ingressClass" />
  </NMessageProvider>
  <TitleBar title="Basic info" />
  <IngressClassBasicInfoView :ingress-class="ingressClass" />
  <TitleBar title="Events" />
  <InvolvedEventView :item="props.ingressClass.metadata" />
</template>
