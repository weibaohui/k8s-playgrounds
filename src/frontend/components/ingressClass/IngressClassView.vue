<script setup lang="ts">
import { V1IngressClass } from '@backend/k8s/model/v1IngressClass'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import IngressClassActionView from '@frontend/components/ingressClass/IngressClassActionView.vue'
import IngressClassBasicInfoView from '@frontend/components/ingressClass/IngressClassBasicInfoView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  ingressClass: V1IngressClass,
})
</script>

<template>
  <NMessageProvider>
    <IngressClassActionView :is-dropdown="false" :ingress-class="props.ingressClass" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <IngressClassBasicInfoView :ingress-class="ingressClass" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.ingressClass.metadata" />
</template>

<style scoped>

</style>
