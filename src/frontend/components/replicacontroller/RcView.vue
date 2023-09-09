<script setup lang="ts">
import type { V1Pod } from '@backend/k8s/model/V1Pod'
import { V1ReplicationController } from '@backend/k8s/model/V1ReplicationController'
import { SelectorUtils } from '@backend/utils/SelectorUtils'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import PodListMiniView from '@frontend/components/pod/PodListMiniView.vue'
import RcActionView from '@frontend/components/replicacontroller/RcActionView.vue'
import RcBasicInfoView from '@frontend/components/replicacontroller/RcBasicInfoView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NMessageProvider } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  rc: V1ReplicationController,
})

const podList = ref<V1Pod[]>()
async function getPods() {
  const selector = SelectorUtils.getSelector({ matchLabels: props.rc.spec.selector })
  podList.value = await K8sService.playService.podControllerListByLabelSelector({ selector })
}
getPods()
</script>

<template>
  <NMessageProvider>
    <RcActionView :is-dropdown="false" :rc="props.rc" />
  </NMessageProvider>

  <RcBasicInfoView :rc="props.rc" :show-title="true" />
  <PodListMiniView :item-list="podList" :show-title="true" />

  <InvolvedEventView :item="props.rc.metadata" :show-title="true" />
</template>

<style scoped>

</style>
