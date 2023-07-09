<script setup lang="ts">
import { NTag } from 'naive-ui'
import { V1Node } from '../../../model/V1Node'

const props = defineProps({
  node: V1Node,
})
</script>

<template>
  <NTag v-if="props.node.spec.unschedulable" type="error">
    SchedulingDisable
  </NTag>
  <NTag v-if="node.status.conditions.filter(r => r.type === 'Ready').pop().status === 'True'" type="success">
    Ready
  </NTag>
  <NTag v-else type="error">
    Not Ready
  </NTag>
</template>
