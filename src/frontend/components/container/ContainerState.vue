<script setup lang="ts">
import { NText, NTooltip } from 'naive-ui'
import { V1ContainerState } from '@backend/k8s/model/V1ContainerState'

const props = defineProps({
  pod: V1ContainerState,
})
</script>

<template>
  <NText v-if="pod.running" type="success">
    running
  </NText>
  <NText v-else-if="pod.terminated" type="error">
    <NTooltip placement="bottom" trigger="hover">
      <template #trigger>
        terminated
      </template>
      <div>reason:{{ pod.terminated.reason }}</div>
      <div>message:{{ pod.terminated.message }}</div>
      <div>exitCode:{{ pod.terminated.exitCode }}</div>
      <div>containerID:{{ pod.terminated.containerID }}</div>
      <div>startedAt:{{ pod.terminated.startedAt }}</div>
      <div>finishedAt:{{ pod.terminated.finishedAt }}</div>
    </NTooltip>
  </NText>
  <NText v-else-if="pod.waiting" type="error">
    <NTooltip placement="bottom" trigger="hover">
      <template #trigger>
        waiting
      </template>
      <div>reason:{{ pod.waiting.reason }}</div>
      <div>message:{{ pod.waiting.message }}</div>
    </NTooltip>
  </NText>
  <NText v-else type="error">
    error
  </NText>
</template>

<style scoped>

</style>
