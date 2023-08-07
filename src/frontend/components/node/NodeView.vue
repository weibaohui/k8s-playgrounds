<script setup lang="ts">
import { NH6, NMessageProvider, NText } from 'naive-ui'
import NodeActionView from '../../components/node/NodeActionView.vue'
import NodeEventsView from '../../components/node/NodeEventsView.vue'
import NodeBasicInfoView from '../../components/node/NodeBasicInfoView.vue'
import NodeResourceView from '../../components/node/NodeResourceView.vue'
import { V1Node } from '../../../model/V1Node'

const props = defineProps({
  node: V1Node,
})
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
  <NodeEventsView :node="node" />
</template>

<style scoped>

</style>
