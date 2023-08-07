<script setup lang="ts">
import { ref } from 'vue'
import EventsView from '../../components/event/EventsView.vue'
import { K8sService } from '../../service/k8s/K8sService'
import type { V1Event } from '../../../model/V1Event'
import { V1Namespace } from '../../../model/V1Namespace'

const props = defineProps({
  ns: V1Namespace,
})
const eventList = ref<V1Event[]>()

async function getEventsList() {
  eventList.value = await K8sService.eventService.getEventList(props.ns.metadata.name)
}
getEventsList()
</script>

<template>
  <EventsView :event-list="eventList" />
</template>
