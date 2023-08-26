<script setup lang="ts">
import type { V1Pod } from '@backend/k8s/model/V1Pod'
import { V1ReplicaSet } from '@backend/k8s/model/V1ReplicaSet'
import { SelectorUtils } from '@backend/utils/SelectorUtils'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import PodListMiniView from '@frontend/components/pod/PodListMiniView.vue'
import RsActionView from '@frontend/components/replicaset/RsActionView.vue'
import RsBasicInfoView from '@frontend/components/replicaset/RsBasicInfoView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NH6, NMessageProvider, NText } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  rs: V1ReplicaSet,
})

const podList = ref<V1Pod[]>()
async function getPods() {
  const selector = SelectorUtils.getSelector(props.rs.spec.selector)
  podList.value = await K8sService.playService.podControllerGetPodsByLabelSelector({ selector })
}
getPods()
</script>

<template>
  <NMessageProvider>
    <RsActionView :is-dropdown="false" :rs="props.rs" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <RsBasicInfoView :rs="rs" />

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
  <InvolvedEventView :item="props.rs.metadata" />
</template>

<style scoped>

</style>
