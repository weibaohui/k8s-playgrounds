<script setup lang="ts">
import { V1Node } from '@backend/k8s/model/V1Node'
import type { V1Pod } from '@backend/k8s/model/V1Pod'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import NodeActionView from '@frontend/components/node/NodeActionView.vue'
import NodeBasicInfoView from '@frontend/components/node/NodeBasicInfoView.vue'
import NodeResourceView from '@frontend/components/node/NodeResourceView.vue'
import PodListMiniView from '@frontend/components/pod/PodListMiniView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NMessageProvider } from 'naive-ui'
import { ref } from 'vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'

const props = defineProps({
  node: V1Node,
})
const podList = ref<V1Pod[]>()
async function getPodsByNodeName() {
  podList.value = await K8sService.playService.podControllerListByNodeName({ name: props.node.metadata.name })
}
getPodsByNodeName()
</script>

<template>
  <NMessageProvider>
    <NodeActionView :node="props.node" :is-dropdown="false" />
  </NMessageProvider>

  <NodeBasicInfoView :node="node" :show-title="true" />
  <TitleBar title="Resource" />
  <NodeResourceView :node="node" />

  <PodListMiniView :item-list="podList" :show-title="true" />

  <InvolvedEventView :item="props.node.metadata" :show-title="true" />
</template>

<style scoped>

</style>
