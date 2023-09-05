<script setup lang="ts">
import { V1PriorityClass } from '@backend/k8s/model/v1PriorityClass'
import { Star } from '@vicons/fa'
import { NIcon } from 'naive-ui'

const props = defineProps({
  pc: V1PriorityClass,
})
function isDefault() {
  return props.pc.globalDefault === true
}
</script>

<template>
  <NIcon v-if="isDefault()" :component="Star" />
</template>

<style scoped>

</style>
