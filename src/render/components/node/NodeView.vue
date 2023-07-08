<script setup lang="ts">
import { V1Node } from '../../../model/V1Node'

const props = defineProps({
  node: V1Node,
})
</script>

<template>
  {{ props.node.status.nodeInfo }}
  {{ props.node.status.nodeInfo }}
</template>

<style scoped>

</style>
