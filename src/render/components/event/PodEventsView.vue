<script setup lang="ts">
import { K8sService } from '@render/service/k8s/K8sService'
import { NBadge, NCollapse, NCollapseItem, NTable, NText } from 'naive-ui'
import { ref } from 'vue'
import moment from 'moment'
import type { V1Event } from '../../../model/V1Event'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
const eventList = ref<V1Event[]>()
const podEventList = ref<V1Event[]>()

async function getEventsList() {
  eventList.value = await K8sService.eventService.getEventsList(props.pod.metadata.namespace)
  podEventList.value = eventList.value.filter((r) => {
    return r.involvedObject.namespace === props.pod.metadata.namespace && r.involvedObject.name === props.pod.metadata.name
  })
}
getEventsList()
</script>

<template>
  <NCollapse>
    <NCollapseItem v-for="x in podEventList" :key="x.metadata.name">
      <NTable>
        <tr>
          <td class="left">
            reason
          </td>
          <td>{{ x.type }}:{{ x.reason }}</td>
        </tr>
        <tr>
          <td>
            source
          </td>
          <td>{{ x.source.host }}/{{ x.source.component }}</td>
        </tr>
        <tr v-if="x.involvedObject.fieldPath">
          <td>
            Sub-object
          </td>
          <td>{{ x.involvedObject.fieldPath }}</td>
        </tr>
        <tr>
          <td>
            Last seen
          </td>
          <td>{{ moment(x.lastTimestamp).format('yyyy-MM-DD H:mm:s Z') }}</td>
        </tr>
      </NTable>
      <template #header>
        <NText v-if="x.type === 'Normal'" type="success">
          {{ x.message }}
        </NText>
        <NText v-else type="error">
          {{ x.message }}
        </NText>
      </template>
      <template #header-extra>
        <NBadge :value="x.count " />
      </template>
    </NCollapseItem>
  </NCollapse>
</template>
