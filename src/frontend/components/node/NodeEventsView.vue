<script setup lang="ts">
import { ref } from 'vue'
import EventsView from '@frontend/components/event/EventsView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import type { V1Event } from '@backend/k8s/model/V1Event'
import { V1Node } from '@backend/k8s/model/V1Node'

const props = defineProps({
  node: V1Node,
})
const eventList = ref<V1Event[]>()

async function getNodeEventsList() {
  eventList.value = await K8sService.eventService.getNodeEventList(props.node)
}
getNodeEventsList()
</script>

<template>
  <EventsView :event-list="eventList" />
</template>
