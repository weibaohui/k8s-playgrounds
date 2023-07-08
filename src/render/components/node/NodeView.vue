<script setup lang="ts">
import { NH6, NText } from 'naive-ui'
import { V1Node } from '../../../model/V1Node'

const props = defineProps({
  node: V1Node,
})
</script>

<template>
  {{ props.node.status.nodeInfo }}
  {{ props.node.status.nodeInfo }}

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Containers
    </NText>
  </NH6>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Volumes
    </NText>
  </NH6>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
</template>

<style scoped>

</style>
