<script setup lang="ts">
import { Square } from '@vicons/fa'

import { NIcon, NTooltip } from 'naive-ui'
import { V1Pod } from '@backend/k8s/model/V1Pod'

const props = defineProps({
  pod: V1Pod,
  containerName: String,
})
function getContainerStatus() {
  if (props.containerName === undefined || props.containerName.length === 0)
    return props.pod.status.containerStatuses

  else
    return props.pod.status.containerStatuses.filter(r => r.name === props.containerName)
}
</script>

<template>
  <span v-for="item in getContainerStatus()" :key="item.containerID">
    <NIcon v-if="item.ready" :size="10" :component="Square" color="green" />
    <NTooltip v-else-if="item.ready === false && item.state.terminated && item.state.terminated.exitCode === 0" trigger="hover">
      <template #trigger>
        <NIcon :size="10" :component="Square" color="gray" />
      </template>
      {{ item.state.terminated.reason }}
    </NTooltip>
    <NTooltip v-else trigger="hover">
      <template #trigger>
        <NIcon :size="10" :component="Square" color="red" />
      </template>
      {{ item.state.terminated && item.state.terminated.reason }}
      {{ item.state.waiting && item.state.waiting.reason }}
    </NTooltip>
  </span>
</template>

<style scoped>

</style>
