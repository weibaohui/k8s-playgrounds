<script setup lang="ts">
import { V1Deployment } from '@backend/k8s/model/V1Deployment'
import { ref } from 'vue'
import EventsView from '@frontend/components/event/EventsView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import type { V1Event } from '@backend/k8s/model/V1Event'

const props = defineProps({
  deploy: V1Deployment,
})
const eventList = ref<V1Event[]>()

async function getEventsList() {
  eventList.value = await K8sService.eventService.getDeploymentList(props.deploy)
}
getEventsList()
</script>

<template>
  <EventsView :event-list="eventList" />
</template>
