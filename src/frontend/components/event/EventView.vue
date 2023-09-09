<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
import EventActionView from '@frontend/components/event/EventActionView.vue'
import EventBasicInfoView from '@frontend/components/event/EventBasicInfoView.vue'
import EventInvolvedView from '@frontend/components/event/EventInvolvedView.vue'
import { V1Event } from '@backend/k8s/model/V1Event'
import TitleBar from '@frontend/components/common/TitleBar.vue'

const props = defineProps({
  event: V1Event,
})
</script>

<template>
  <NMessageProvider>
    <EventActionView :is-dropdown="false" :event="props.event" />
  </NMessageProvider>

  <EventBasicInfoView :event="event" :show-title="true" />
  <TitleBar title="Involved object" />
  <EventInvolvedView :event="event" :show-title="true" />
</template>

<style scoped>

</style>
