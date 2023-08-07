<script setup lang="ts">
import { ref } from 'vue'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
const counts = ref(0)

if (props.pod.status.containerStatuses) {
  counts.value = props.pod.status.containerStatuses
    .filter(r => r.restartCount > 0)
    .map(r => r.restartCount)
    .reduce((a, b) => a + b, 0)
}
</script>

<template>
  {{ counts }}
</template>

<style scoped>

</style>
