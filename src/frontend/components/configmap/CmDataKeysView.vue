<script setup lang="ts">
import { V1ConfigMap } from '@backend/k8s/model/V1ConfigMap'

const props = defineProps({
  cm: V1ConfigMap,
})
</script>

<template>
  <NTag v-for="(v, k) in props.cm.data" :key="k">
    {{ k }}
  </NTag>
</template>

<style scoped>

</style>
