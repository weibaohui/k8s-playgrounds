<script setup lang="ts">
import { get } from '@main/utils/axios/api'
import { ref } from 'vue'
import type { V1Event } from '../../model/V1Event'
import { V1Pod } from '../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
  ns: String,
})

const eventList = ref<V1Event[]>()

async function getEventsList() {
  eventList.value = await get<V1Event[]>(`/watch/events/${props.ns}`)
  eventList.value = eventList.value.filter((r) => {
    return r.involvedObject.namespace === props.pod.metadata.namespace && r.involvedObject.name === props.pod.metadata.name
  })
}
getEventsList()
</script>

<template>
  <div v-for="x in eventList" :key="x.metadata.name">
    {{ x.type }}{{ x.source.host }}{{ x.source.component }}
    {{ x.reason }}
    {{ x.message }}
  </div>
</template>

<style scoped>

</style>
