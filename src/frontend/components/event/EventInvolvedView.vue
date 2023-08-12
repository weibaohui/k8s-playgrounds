<script setup lang="ts">
import { NTable } from 'naive-ui'
import EventInvolvedClickAction from '@frontend/components/event/EventInvolvedClickAction.vue'
import { V1Event } from '@backend/k8s/model/V1Event'

const props = defineProps({
  event: V1Event,
})
</script>

<template>
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Name
        </td>
        <td>
          <EventInvolvedClickAction :event="props.event" />
        </td>
      </tr>
      <tr>
        <td>Namespace</td>
        <td>{{ props.event.involvedObject.namespace }}</td>
      </tr>
      <tr>
        <td>fieldPath</td>
        <td>{{ props.event.involvedObject.fieldPath }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
