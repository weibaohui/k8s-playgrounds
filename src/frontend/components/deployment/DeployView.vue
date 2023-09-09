<script setup lang="ts">
import { V1Deployment } from '@backend/k8s/model/V1Deployment'
import type { V1Pod } from '@backend/k8s/model/V1Pod'
import { SelectorUtils } from '@backend/utils/SelectorUtils'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import DeployActionView from '@frontend/components/deployment/DeployActionView.vue'
import DeployBasicInfoView from '@frontend/components/deployment/DeployBasicInfoView.vue'
import PodListMiniView from '@frontend/components/pod/PodListMiniView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NMessageProvider } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  deploy: V1Deployment,
})

const podList = ref<V1Pod[]>()
async function getPods() {
  const selector = SelectorUtils.getSelector(props.deploy.spec.selector)
  podList.value = await K8sService.playService.podControllerListByLabelSelector({ selector })
}
getPods()
</script>

<template>
  <NMessageProvider>
    <DeployActionView :is-dropdown="false" :deploy="props.deploy" />
  </NMessageProvider>

  <DeployBasicInfoView :deploy="props.deploy" :show-title="true" />

  <PodListMiniView :item-list="podList" :show-title="true" />

  <InvolvedEventView :item="props.deploy.metadata" :show-title="true" />
</template>
