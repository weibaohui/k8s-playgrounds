<script setup lang="ts">
import type { V1Pod } from '@backend/k8s/model/V1Pod'
import { V1StatefulSet } from '@backend/k8s/model/V1StatefulSet'
import { SelectorUtils } from '@backend/utils/SelectorUtils'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import PodListMiniView from '@frontend/components/pod/PodListMiniView.vue'
import StsActionView from '@frontend/components/statefulset/StsActionView.vue'
import StsBasicInfoView from '@frontend/components/statefulset/StsBasicInfoView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NMessageProvider } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  sts: V1StatefulSet,
})

const podList = ref<V1Pod[]>()
async function getPods() {
  const selector = SelectorUtils.getSelector(props.sts.spec.selector)
  podList.value = await K8sService.playService.podControllerListByLabelSelector({ selector })
}
getPods()
</script>

<template>
  <NMessageProvider>
    <StsActionView :is-dropdown="false" :sts="props.sts" />
  </NMessageProvider>

  <StsBasicInfoView :sts="sts" :show-title="true" />

  <PodListMiniView :pod-list="podList" :show-title="true" />

  <InvolvedEventView :item="props.sts.metadata" :show-title="true" />
</template>

<style scoped>

</style>
