<script setup lang="ts">
import { V1PodDisruptionBudget } from '@backend/k8s/model/v1PodDisruptionBudget'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import PdbActionView from '@frontend/components/PodDisruptionBudget/PdbActionView.vue'
import PdbBasicInfoView from '@frontend/components/PodDisruptionBudget/PdbBasicInfoView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  pdb: V1PodDisruptionBudget,
})
</script>

<template>
  <NMessageProvider>
    <PdbActionView :is-dropdown="false" :pdb="props.pdb" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <PdbBasicInfoView :pdb="props.pdb" />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.pdb.metadata" />
</template>

<style scoped>

</style>
