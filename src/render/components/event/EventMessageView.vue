<script setup lang="ts">
import { NText } from 'naive-ui'
import { V1Event } from '../../../model/V1Event'

const props = defineProps({
  item: V1Event,
})
</script>

<template>
  <NText v-if="item.type === 'Warning'" type="error">
    {{ item.message }}
  </NText>
  <NText v-else type="default">
    {{ item.message }}
  </NText>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
