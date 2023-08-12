<script setup lang="ts">
import EventsView from '@frontend/components/event/EventsView.vue'
import { ref } from 'vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import type { V1Event } from '@backend/k8s/model/V1Event'
import { V1Pod } from '@backend/k8s/model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
const eventList = ref<V1Event[]>()

async function getPodEventsList() {
  eventList.value = await K8sService.eventService.getPodEventList(props.pod)
}

getPodEventsList()
</script>

<template>
  <EventsView :event-list="eventList" />
</template>
