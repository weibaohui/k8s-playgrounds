<script setup lang="ts">
import { V1Ingress } from '@backend/k8s/model/v1Ingress'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import IngActionView from '@frontend/components/ingress/IngActionView.vue'
import IngBasicInfoView from '@frontend/components/ingress/IngBasicInfoView.vue'
import IngRulesView from '@frontend/components/ingress/IngRulesView.vue'
import IngTlsView from '@frontend/components/ingress/IngTlsView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  ing: V1Ingress,
})
</script>

<template>
  <NMessageProvider>
    <IngActionView :is-dropdown="false" :ing="props.ing" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <IngBasicInfoView :ing="props.ing" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Rules
    </NText>
  </NH6>
  <IngRulesView :ing="props.ing" />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      TLS
    </NText>
  </NH6>
  <IngTlsView :ing="props.ing" />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.ing.metadata" />
</template>

<style scoped>

</style>
