<script setup lang="ts">
import EventsView from '@render/components/event/EventsView.vue'
import { K8sService } from '@render/service/k8s/K8sService'
import { ref } from 'vue'
import type { V1Event } from '../../../model/V1Event'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
const eventList = ref<V1Event[]>()

async function getPodEventsList() {
  eventList.value = await K8sService.eventService.getPodEventsList(props.pod)
}
getPodEventsList()
</script>

<template>
  <EventsView :event-list="eventList" />
</template>
