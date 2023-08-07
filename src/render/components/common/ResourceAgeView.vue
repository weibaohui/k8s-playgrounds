<script setup lang="ts">
import { TimeAge } from '@main/utils/timeAge'
import { TimerUtils } from '@main/utils/TimerUtils'
import { ref } from 'vue'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  item: V1Pod,
})
const age = ref('')
TimerUtils.everySecond(() => age.value = TimeAge.getK8sAge(props.item.metadata.creationTimestamp))
</script>

<template>
  {{ age }}
</template>

<style scoped>

</style>
