<script setup lang="ts">
import { V1Pod } from '../../model/V1Pod'

const props = defineProps({
  item: V1Pod,
})
</script>

<template>
  <div v-for="v in props.item.spec.volumes" :key="v.name">
    {{ v.name }}
    {{ v }}
  </div>
</template>

<style scoped>

</style>
