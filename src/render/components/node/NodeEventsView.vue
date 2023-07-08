<script setup lang="ts">
import EventsView from '@render/components/event/EventsView.vue'
import { K8sService } from '@render/service/k8s/K8sService'
import { ref } from 'vue'
import type { V1Event } from '../../../model/V1Event'
import { V1Node } from '../../../model/V1Node'

const props = defineProps({
  node: V1Node,
})
const eventList = ref<V1Event[]>()

async function getNodeEventsList() {
  eventList.value = await K8sService.eventService.getNodeEventsList(props.node)
}
getNodeEventsList()
</script>

<template>
  <EventsView :event-list="eventList" />
</template>
