<script setup lang="ts">
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import { NMessageProvider } from 'naive-ui'
import NsActionView from '@frontend/components/ns/NsActionView.vue'
import NsBasicInfoView from '@frontend/components/ns/NsBasicInfoView.vue'
import { V1Namespace } from '@backend/k8s/model/V1Namespace'

const props = defineProps({
  ns: V1Namespace,
})
</script>

<template>
  <NMessageProvider>
    <NsActionView :is-dropdown="false" :ns="props.ns" />
  </NMessageProvider>

  <NsBasicInfoView :ns="ns" :show-title="true" />

  <InvolvedEventView :item="props.ns.metadata" :show-title="true" />
</template>

<style scoped>

</style>
