<script setup lang="ts">
import { V1IngressClass } from '@backend/k8s/model/V1IngressClass'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import IngressClassActionView from '@frontend/components/IngressClass/IngressClassActionView.vue'
import IngressClassBasicInfoView from '@frontend/components/IngressClass/IngressClassBasicInfoView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  ingressClass: V1IngressClass,
})
</script>

<template>
  <NMessageProvider>
    <IngressClassActionView :is-dropdown="false" :ingress-class="props.ingressClass" />
  </NMessageProvider>

  <IngressClassBasicInfoView :ingress-class="ingressClass" :show-title="true" />

  <InvolvedEventView :item="props.ingressClass.metadata" :show-title="true" />
</template>
