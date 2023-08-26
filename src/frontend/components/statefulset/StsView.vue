<script setup lang="ts">
import type { V1Pod } from '@backend/k8s/model/V1Pod'
import { V1StatefulSet } from '@backend/k8s/model/v1StatefulSet'
import { SelectorUtils } from '@backend/utils/SelectorUtils'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import PodListMiniView from '@frontend/components/pod/PodListMiniView.vue'
import StsActionView from '@frontend/components/statefulset/StsActionView.vue'
import StsBasicInfoView from '@frontend/components/statefulset/StsBasicInfoView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NH6, NMessageProvider, NText } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  sts: V1StatefulSet,
})

const podList = ref<V1Pod[]>()
async function getPods() {
  const selector = SelectorUtils.getSelector(props.sts.spec.selector)
  podList.value = await K8sService.playService.podControllerGetPodsByLabelSelector({ selector })
}
getPods()
</script>

<template>
  <NMessageProvider>
    <StsActionView :is-dropdown="false" :sts="props.sts" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <StsBasicInfoView :sts="sts" />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Pods
    </NText>
  </NH6>
  <PodListMiniView :item-list="podList" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.sts.metadata" />
</template>

<style scoped>

</style>
