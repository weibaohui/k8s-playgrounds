<script setup lang="ts">
import ResourceWarnIcon from '@frontend/components/common/ResourceWarnIcon.vue'
import { V1Pod } from '@backend/k8s/model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
</script>

<template>
  <ResourceWarnIcon :item="props.pod.metadata" :skip="!(props.pod.status.phase === 'Pending' || props.pod.status.phase === 'Failed')" />
</template>

<style scoped>
</style>
