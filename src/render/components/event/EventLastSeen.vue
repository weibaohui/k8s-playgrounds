<script setup lang="ts">
import { TimeAge } from '@main/utils/timeAge'
import { TimerUtils } from '@main/utils/TimerUtils'
import { ref } from 'vue'
import { V1Event } from '../../../model/V1Event'

const props = defineProps({
  event: V1Event,
})
const age = ref('')
TimerUtils.everySecond(() => age.value = TimeAge.getK8sAge(props.event.lastTimestamp))
</script>

<template>
  {{ age }}
</template>

<style scoped>

</style>
