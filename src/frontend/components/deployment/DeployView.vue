<script setup lang="ts">
import { V1Deployment } from '@backend/k8s/model/V1Deployment'
import { SelectorUtils } from '@backend/utils/SelectorUtils'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import DeployActionView from '@frontend/components/deployment/DeployActionView.vue'
import DeployBasicInfoView from '@frontend/components/deployment/DeployBasicInfoView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  deploy: V1Deployment,
})
const selector = SelectorUtils.getSelector(props.deploy.spec.selector)
const pods = await K8sService.playService.podControllerGetPodsByLabelSelector({ selector })
console.log('podControllerGetPodsByLabelSelector', pods)
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
  <InvolvedEventView :item="props.deploy.metadata" />
</template>
