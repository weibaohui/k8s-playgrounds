<script setup lang="ts">
import EventBasicInfoView from '@render/components/event/EventBasicInfoView.vue'
import EventInvolvedView from '@render/components/event/EventInvolvedView.vue'
import { NH6, NText } from 'naive-ui'
import { V1Event } from '../../../model/V1Event'

const props = defineProps({
  event: V1Event,
})
</script>

<template>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <EventBasicInfoView :event="event" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Involved object
    </NText>
  </NH6>
  <EventInvolvedView :event="event" />
</template>

<style scoped>

</style>
