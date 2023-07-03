<script setup lang="ts">
import { NText, NTooltip } from 'naive-ui'
import { V1ContainerState } from '../../../model/V1ContainerState'

const props = defineProps({
  item: V1ContainerState,
})
</script>

<template>
  <NText v-if="item.running" type="success">
    running
  </NText>
  <NText v-else-if="item.terminated" type="error">
    <NTooltip placement="bottom" trigger="hover">
      <template #trigger>
        terminated
      </template>
      <div>reason:{{ item.terminated.reason }}</div>
      <div>message:{{ item.terminated.message }}</div>
      <div>exitCode:{{ item.terminated.exitCode }}</div>
      <div>containerID:{{ item.terminated.containerID }}</div>
      <div>startedAt:{{ item.terminated.startedAt }}</div>
      <div>finishedAt:{{ item.terminated.finishedAt }}</div>
    </NTooltip>
  </NText>
  <NText v-else-if="item.waiting" type="error">
    <NTooltip placement="bottom" trigger="hover">
      <template #trigger>
        waiting
      </template>
      <div>reason:{{ item.waiting.reason }}</div>
      <div>message:{{ item.waiting.message }}</div>
    </NTooltip>
  </NText>
  <NText v-else type="error">
    error
  </NText>
</template>

<style scoped>

</style>
