<script setup lang="ts">
import { NH6, NMessageProvider, NText } from 'naive-ui'
import EventActionView from '../../components/event/EventActionView.vue'
import EventBasicInfoView from '../../components/event/EventBasicInfoView.vue'
import EventInvolvedView from '../../components/event/EventInvolvedView.vue'
import { V1Event } from '../../../backend/k8s/model/V1Event'

const props = defineProps({
  event: V1Event,
})
</script>

<template>
  <NMessageProvider>
    <EventActionView :is-dropdown="false" :event="props.event" />
  </NMessageProvider>
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
