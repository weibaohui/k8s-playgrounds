<script setup lang="ts">
import EventInvolvedClickAction from '@render/components/event/EventInvolvedClickAction.vue'
import { NTable } from 'naive-ui'
import { V1Event } from '../../../model/V1Event'

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
