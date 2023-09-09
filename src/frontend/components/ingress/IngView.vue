<script setup lang="ts">
import { V1Ingress } from '@backend/k8s/model/v1Ingress'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import IngActionView from '@frontend/components/ingress/IngActionView.vue'
import IngBasicInfoView from '@frontend/components/ingress/IngBasicInfoView.vue'
import IngRulesView from '@frontend/components/ingress/IngRulesView.vue'
import IngTlsView from '@frontend/components/ingress/IngTlsView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  ing: V1Ingress,
})
</script>

<template>
  <NMessageProvider>
    <IngActionView :is-dropdown="false" :ing="props.ing" />
  </NMessageProvider>

  <IngBasicInfoView :ing="props.ing" :show-title="true" />

  <TitleBar title="Rules" />
  <IngRulesView :ing="props.ing" />

  <TitleBar title="TLS" />
  <IngTlsView :ing="props.ing" />

  <InvolvedEventView :item="props.ing.metadata" :show-title="true" />
</template>

<style scoped>

</style>
