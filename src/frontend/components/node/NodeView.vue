<script setup lang="ts">
import { V1Node } from '@backend/k8s/model/V1Node'
import type { V1Pod } from '@backend/k8s/model/V1Pod'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import NodeActionView from '@frontend/components/node/NodeActionView.vue'
import NodeBasicInfoView from '@frontend/components/node/NodeBasicInfoView.vue'
import NodeResourceView from '@frontend/components/node/NodeResourceView.vue'
import PodListMiniView from '@frontend/components/pod/PodListMiniView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NH6, NMessageProvider, NText } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  node: V1Node,
})
const podList = ref<V1Pod[]>()
async function getPodsByNodeName() {
  podList.value = await K8sService.playService.podControllerGetPodListByNodeName({ name: props.node.metadata.name })
}
getPodsByNodeName()
</script>

<template>
  <NMessageProvider>
    <NodeActionView :node="props.node" :is-dropdown="false" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <NodeBasicInfoView :node="node" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Resource
    </NText>
  </NH6>
  <NodeResourceView :node="node" />

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
  <InvolvedEventView :item="props.node.metadata" />
</template>

<style scoped>

</style>
