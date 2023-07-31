<script setup lang="ts">
import { TimerUtils } from '@main/utils/TimerUtils'
import { ref } from 'vue'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
const readyText = ref('')
TimerUtils.everySecond(() => {
  if (props.pod.status.containerStatuses) {
    const ready = props.pod.status.containerStatuses
      .filter(r => r.ready).length
    const all = props.pod.status.containerStatuses.length
    readyText.value = `${ready}/${all}`
  }
})
</script>

<template>
  {{ readyText }}
</template>

<style scoped>

</style>
