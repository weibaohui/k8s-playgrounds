<script setup lang="ts">
import { V1Pod } from '../../model/V1Pod'

const props = defineProps({
  item: V1Pod,
})
</script>

<template>
  {{ item.metadata.name }}
  {{ item.metadata.namespace }}
  {{ item.status.phase }}
  {{ item.status.podIP }}
</template>

<style scoped>

</style>
