<script setup lang="ts">
import { V1ObjectMeta } from '@backend/k8s/model/V1ObjectMeta'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import EventsView from '@frontend/components/event/EventsView.vue'
import { ref } from 'vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import type { V1Event } from '@backend/k8s/model/V1Event'

const props = defineProps({
  item: V1ObjectMeta,
  showTitle: Boolean,
})
const eventList = ref<V1Event[]>()

async function getEventsList() {
  eventList.value = await K8sService.playService.eventControllerListInvolvedEventByNsName({
    ns: props.item.namespace,
    name: props.item.name,
  })
}

getEventsList()
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Events" />
  <EventsView :event-list="eventList" />
</template>
