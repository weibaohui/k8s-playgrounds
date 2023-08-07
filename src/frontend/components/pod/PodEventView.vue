<script setup lang="ts">
import { ref } from 'vue'
import { K8sService } from '../../service/k8s/K8sService'
import type { V1Event } from '../../../backend/k8s/model/V1Event'
import { V1Pod } from '../../../backend/k8s/model/V1Pod'
import EventsView from '../event/EventsView.vue'

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
