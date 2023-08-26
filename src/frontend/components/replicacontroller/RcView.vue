<script setup lang="ts">
import type { V1LabelSelector } from '@backend/k8s/model/v1LabelSelector'
import type { V1Pod } from '@backend/k8s/model/V1Pod'
import { V1ReplicationController } from '@backend/k8s/model/V1ReplicationController'
import { SelectorUtils } from '@backend/utils/SelectorUtils'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import PodListMiniView from '@frontend/components/pod/PodListMiniView.vue'
import RcActionView from '@frontend/components/replicacontroller/RcActionView.vue'
import RcBasicInfoView from '@frontend/components/replicacontroller/RcBasicInfoView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NH6, NMessageProvider, NText } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  rc: V1ReplicationController,
})

const podList = ref<V1Pod[]>()
async function getPods() {
  const selector = SelectorUtils.getSelector(props.rc.spec.selector as V1LabelSelector)
  podList.value = await K8sService.playService.podControllerGetPodsByLabelSelector({ selector })
}
getPods()
</script>

<template>
  <NMessageProvider>
    <RcActionView :is-dropdown="false" :rc="props.rc" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <RcBasicInfoView :rc="props.rc" />

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
  <InvolvedEventView :item="props.rc.metadata" />
</template>

<style scoped>

</style>
