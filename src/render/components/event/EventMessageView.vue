<script setup lang="ts">
import { NText } from 'naive-ui'
import { V1Event } from '../../../model/V1Event'

const props = defineProps({
  event: V1Event,
})
</script>

<template>
  <NText v-if="event.type === 'Warning'" type="error">
    {{ event.message }}
  </NText>
  <NText v-else type="default">
    {{ event.message }}
  </NText>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
