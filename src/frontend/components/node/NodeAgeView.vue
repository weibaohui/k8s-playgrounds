<script setup lang="ts">
import { ref } from 'vue'
import { TimeAge } from '../../../backend/utils/timeAge'
import { TimerUtils } from '../../../backend/utils/TimerUtils'
import { V1Node } from '../../../model/V1Node'

const props = defineProps({
  node: V1Node,
})
const age = ref('')
TimerUtils.everySecond(() => age.value = TimeAge.getK8sAge(props.node.metadata.creationTimestamp))
</script>

<template>
  {{ age }}
</template>

<style scoped>

</style>
