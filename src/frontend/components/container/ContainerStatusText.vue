<script setup lang="ts">
import { NGradientText } from 'naive-ui'
import { V1Pod } from '../../../backend/k8s/model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
</script>

<template>
  <NGradientText v-if="props.pod.status.phase === 'Running'" type="success">
    Running
  </NGradientText>
  <NGradientText v-else-if="props.pod.status.phase === 'Pending'" type="warning">
    Pending
  </NGradientText>
  <NGradientText v-else-if="props.pod.status.phase === 'Succeeded'" type="info">
    Succeeded
  </NGradientText>
  <NGradientText v-else-if="props.pod.status.phase === 'Failed'" type="error">
    Failed
  </NGradientText>
  <NGradientText v-else-if="props.pod.status.phase === 'Unknown'" type="warning">
    Unknown
  </NGradientText>
</template>

<style scoped>

</style>
