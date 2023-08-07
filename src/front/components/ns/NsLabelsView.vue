<script setup lang="ts">
import { NTag } from 'naive-ui'
import { V1Namespace } from '../../../model/V1Namespace'

const props = defineProps({
  ns: V1Namespace,
})
</script>

<template>
  <NTag v-for="(k, v) in props.ns.metadata.labels" :key="k" type="success">
    {{ k }}={{ v }}
  </NTag>
</template>

<style scoped>

</style>
