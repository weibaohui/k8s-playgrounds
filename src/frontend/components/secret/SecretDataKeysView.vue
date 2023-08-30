<script setup lang="ts">
import { V1Secret } from '@backend/k8s/model/V1Secret'

const props = defineProps({
  secret: V1Secret,
})
</script>

<template>
  <NTag v-for="(v, k) in props.secret.data" :key="k">
    {{ k }}
  </NTag>
</template>

<style scoped>

</style>
