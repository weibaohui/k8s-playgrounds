<script setup lang="ts">
import { V1Deployment } from '@backend/k8s/model/V1Deployment'
import DeployActionView from '@frontend/components/deployment/DeployActionView.vue'
import DeployBasicInfoView from '@frontend/components/deployment/DeployBasicInfoView.vue'
import DeployEventsView from '@frontend/components/deployment/DeployEventsView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  deploy: V1Deployment,
})
</script>

<template>
  <NMessageProvider>
    <DeployActionView :is-dropdown="false" :deploy="props.deploy" />
  </NMessageProvider>

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <DeployBasicInfoView :deploy="props.deploy" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <DeployEventsView :deploy="props.deploy" />
</template>
