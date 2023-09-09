<script setup lang="ts">
import { V1PodDisruptionBudget } from '@backend/k8s/model/v1PodDisruptionBudget'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import PdbActionView from '@frontend/components/PodDisruptionBudget/PdbActionView.vue'
import PdbBasicInfoView from '@frontend/components/PodDisruptionBudget/PdbBasicInfoView.vue'
import { NMessageProvider } from 'naive-ui'

const props = defineProps({
  pdb: V1PodDisruptionBudget,
})
</script>

<template>
  <NMessageProvider>
    <PdbActionView :is-dropdown="false" :pdb="props.pdb" />
  </NMessageProvider>

  <PdbBasicInfoView :pdb="props.pdb" :show-title="true" />

  <InvolvedEventView :item="props.pdb.metadata" :show-title="true" />
</template>

<style scoped>

</style>
