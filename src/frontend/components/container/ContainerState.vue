<script setup lang="ts">
import { NText, NTooltip } from 'naive-ui'
import { V1ContainerState } from '@backend/k8s/model/V1ContainerState'

const props = defineProps({
  state: V1ContainerState,
})
</script>

<template>
  <NText v-if="props.state.running" type="success">
    running
  </NText>
  <NText v-else-if="state.terminated" type="error">
    <NTooltip placement="bottom" trigger="hover">
      <template #trigger>
        terminated - {{ state.terminated.reason }} (exitCode:{{ state.terminated.exitCode }})
      </template>
      <div>reason:{{ state.terminated.reason }}</div>
      <div>message:{{ state.terminated.message }}</div>
      <div>exitCode:{{ state.terminated.exitCode }}</div>
      <div>containerID:{{ state.terminated.containerID }}</div>
      <div>startedAt:{{ state.terminated.startedAt }}</div>
      <div>finishedAt:{{ state.terminated.finishedAt }}</div>
    </NTooltip>
  </NText>
  <NText v-else-if="state.waiting" type="error">
    <NTooltip placement="bottom" trigger="hover">
      <template #trigger>
        waiting - {{ state.waiting.reason }}
      </template>
      <div>reason:{{ state.waiting.reason }}</div>
      <div>message:{{ state.waiting.message }}</div>
    </NTooltip>
  </NText>
  <NText v-else type="error">
    error
  </NText>
</template>

<style scoped>

</style>
