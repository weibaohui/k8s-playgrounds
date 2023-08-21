<script setup lang="ts">
import { NBadge, NCollapse, NCollapseItem, NTable, NText } from 'naive-ui'
import moment from 'moment'
import type { V1Event } from '@backend/k8s/model/V1Event'

const props = defineProps({
  eventList: Array<V1Event>,
})
</script>

<template>
  <NCollapse>
    <NCollapseItem v-for="x in props.eventList" :key="x.metadata.name">
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
        <tr v-if="x.involvedObject">
          <td>
            involvedObject
          </td>
          <td>{{ x.involvedObject.kind }}:{{ x.involvedObject.namespace }}/{{ x.involvedObject.name }}</td>
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
