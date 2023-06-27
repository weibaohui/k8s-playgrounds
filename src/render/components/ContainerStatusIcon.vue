<script setup lang="ts">
import { Square16Filled } from '@vicons/fluent'

import { NIcon } from 'naive-ui'
import { V1Pod } from '../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
</script>

<template>
  <span v-for="item in props.pod.status.containerStatuses" :key="item.containerID">
    <NIcon v-if="item.ready" :size="10" :component="Square16Filled" color="green" />
    <NIcon v-else :size="10" :component="Square16Filled" color="red" />
  </span>
</template>

<style scoped>

</style>
