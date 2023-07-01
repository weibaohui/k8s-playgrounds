<script setup lang="ts">
import { TimeAge } from '@main/utils/timeAge'
import { ref } from 'vue'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
const age = ref('')
setInterval(() => {
  age.value = TimeAge.getK8sAge(props.pod.status.startTime)
}, 1000)
</script>

<template>
  {{ age }}
</template>

<style scoped>

</style>
