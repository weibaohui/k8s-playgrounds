<script setup lang="ts">
import { ref } from 'vue'
import { TimeAge } from '../../../backend/utils/timeAge'
import { TimerUtils } from '../../../backend/utils/TimerUtils'
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
