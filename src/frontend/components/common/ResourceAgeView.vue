<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { TimeAge } from '@backend/utils/timeAge'
import { TimerUtils } from '@backend/utils/TimerUtils'
import { V1Pod } from '@backend/k8s/model/V1Pod'

const props = defineProps({
  item: V1Pod,
})
const age = ref('')
let intervalId: number
onMounted(() => {
  intervalId = TimerUtils.everySecond(() => age.value = TimeAge.getK8sAge(props.item.metadata.creationTimestamp))
})
onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<template>
  {{ age }}
</template>

<style scoped>

</style>
