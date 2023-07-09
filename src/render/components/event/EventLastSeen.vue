<script setup lang="ts">
import { TimeAge } from '@main/utils/timeAge'
import { ref } from 'vue'
import { V1Event } from '../../../model/V1Event'

const props = defineProps({
  event: V1Event,
})
const age = ref('')
setInterval(() => {
  age.value = TimeAge.getK8sAge(props.event.lastTimestamp)
}, 1000)
</script>

<template>
  {{ age }}
</template>

<style scoped>

</style>
