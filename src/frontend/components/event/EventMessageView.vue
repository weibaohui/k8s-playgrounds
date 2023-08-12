<script setup lang="ts">
import { NCard, NTooltip } from 'naive-ui'
import { V1Event } from '@backend/k8s/model/V1Event'
import EventMessageTitleView from '@frontend/components/event/EventMessageTitleView.vue'

const props = defineProps({
  event: V1Event,
})
</script>

<template>
  <NTooltip trigger="hover">
    <template #trigger>
      <EventMessageTitleView :event="event" :truncate="true" />
    </template>
    <NCard :title="props.event.type" size="small">
      <EventMessageTitleView :event="event" :truncate="false" />
    </NCard>
  </NTooltip>
</template>

<style scoped>
.n-card {
  max-width: 400px;
}
</style>
