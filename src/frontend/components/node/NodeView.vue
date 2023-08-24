<script setup lang="ts">
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NH6, NMessageProvider, NText } from 'naive-ui'
import NodeActionView from '@frontend/components/node/NodeActionView.vue'
import NodeBasicInfoView from '@frontend/components/node/NodeBasicInfoView.vue'
import NodeResourceView from '@frontend/components/node/NodeResourceView.vue'
import { V1Node } from '@backend/k8s/model/V1Node'

const props = defineProps({
  node: V1Node,
})
const pods = await K8sService.playService.podControllerGetPodListByNodeName({ name: props.node.metadata.name })
console.log('node', pods)
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
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.node.metadata" />
</template>

<style scoped>

</style>
