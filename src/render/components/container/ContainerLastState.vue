<script setup lang="ts">
import { V1ContainerState } from '../../../model/V1ContainerState'

const props = defineProps({
  item: V1ContainerState,
})
</script>

<template>
  <span v-if="item.running">
    {{ item.running }}
  </span>
  <span v-else-if="item.terminated">
    <div>message:{{ item.terminated.message }}</div>
    <div>{{ item.terminated.signal }}</div>
    <div>reason: {{ item.terminated.reason }}</div>
    <div>startedAt:{{ item.terminated.startedAt }}</div>
    <div>finishedAt:{{ item.terminated.finishedAt }}</div>
  </span>
  <span v-else-if="item.waiting">
    {{ item.waiting }}
  </span>
</template>

<style scoped>

</style>
