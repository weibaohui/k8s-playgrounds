<script setup lang="ts">
import { ref } from 'vue'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
const readyText = ref('')
setInterval(() => {
  if (props.pod.status.containerStatuses) {
    const ready = props.pod.status.containerStatuses
      .filter(r => r.ready).length
    const all = props.pod.status.containerStatuses.length
    readyText.value = `${ready}/${all}`
  }
}, 1000)
</script>

<template>
  {{ readyText }}
</template>

<style scoped>

</style>
