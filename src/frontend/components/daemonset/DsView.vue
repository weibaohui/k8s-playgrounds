<script setup lang="ts">
import { V1DaemonSet } from '@backend/k8s/model/V1DaemonSet'
import type { V1Pod } from '@backend/k8s/model/V1Pod'
import { SelectorUtils } from '@backend/utils/SelectorUtils'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import DsActionView from '@frontend/components/daemonset/DsActionView.vue'
import DsBasicInfoView from '@frontend/components/daemonset/DsBasicInfoView.vue'
import PodListMiniView from '@frontend/components/pod/PodListMiniView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NMessageProvider } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  ds: V1DaemonSet,
})

const podList = ref<V1Pod[]>()
async function getPods() {
  const selector = SelectorUtils.getSelector(props.ds.spec.selector)
  podList.value = await K8sService.playService.podControllerListByLabelSelector({ selector })
}
getPods()
</script>

<template>
  <NMessageProvider>
    <DsActionView :is-dropdown="false" :ds="props.ds" />
  </NMessageProvider>
  <DsBasicInfoView :ds="props.ds" :show-title="true" />

  <PodListMiniView :item-list="podList" :show-title="true" />
  <InvolvedEventView :item="props.ds.metadata" :show-title="true" />
</template>

<style scoped>

</style>
