<script setup lang="ts">
import { V1Pod } from '../../model/V1Pod'

const props = defineProps({
  item: V1Pod,
  name: String,
})
</script>

<template>
  {{ props.item.metadata.name }}
</template>

<style scoped>

</style>
