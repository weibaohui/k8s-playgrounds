<script setup lang="ts">
import { V1PriorityClass } from '@backend/k8s/model/V1PriorityClass'
import { Star } from '@vicons/fa'
import { NIcon, NIconWrapper } from 'naive-ui'

const props = defineProps({
  pc: V1PriorityClass,
})
function isDefault() {
  return props.pc.globalDefault === true
}
</script>

<template>
  <NIconWrapper v-if="isDefault()" :size="24" :border-radius="10">
    <NIcon :component="Star" />
  </NIconWrapper>
</template>

<style scoped>

</style>
