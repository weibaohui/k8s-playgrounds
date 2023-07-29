<script setup lang="ts">
import NodeActions from '@render/components/node/NodeActions.vue'
import NodeEventsView from '@render/components/node/NodeEventsView.vue'
import NodeBasicInfoView from '@render/components/node/NodeBasicInfoView.vue'
import NodeResourceView from '@render/components/node/NodeResourceView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'
import { V1Node } from '../../../model/V1Node'

const props = defineProps({
  node: V1Node,
})
const emit = defineEmits(['onNodeSpecChanged'])
async function onNodeSpecChanged(n: V1Node) {
  emit('onNodeSpecChanged', n)
}
</script>

<template>
  <NMessageProvider>
    <NodeActions :node="props.node" />
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
  <NodeEventsView :node="node" />
</template>

<style scoped>

</style>
