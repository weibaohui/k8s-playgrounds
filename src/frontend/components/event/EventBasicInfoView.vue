<script setup lang="ts">
import { NTable } from 'naive-ui'
import moment from 'moment/moment'
import { V1Event } from '../../../backend/k8s/model/V1Event'

const props = defineProps({
  event: V1Event,
})
</script>

<template>
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Created
        </td>
        <td>
          {{ moment(event.metadata.creationTimestamp).format('yyyy-MM-DD H:mm:s Z') }}
          {{ moment(event.metadata.creationTimestamp).fromNow() }}
        </td>
      </tr>
      <tr>
        <td>Name</td>
        <td>{{ props.event.metadata.name }}</td>
      </tr>
      <tr>
        <td>Namespace</td>
        <td>{{ props.event.metadata.namespace }}</td>
      </tr>
      <tr>
        <td>Message</td>
        <td>{{ props.event.message }}</td>
      </tr>
      <tr>
        <td>Reason</td>
        <td>{{ props.event.reason }}</td>
      </tr>
      <tr>
        <td>source</td>
        <td>{{ props.event.source.component }} {{ props.event.source.host }}</td>
      </tr>
      <tr>
        <td>First seen</td>
        <td>
          {{ moment(event.firstTimestamp).fromNow() }} ({{ moment(event.firstTimestamp).format('yyyy-MM-DD H:mm:s Z') }})
        </td>
      </tr>
      <tr>
        <td>Last seen</td>
        <td>
          {{ moment(event.lastTimestamp).fromNow() }} ({{ moment(event.lastTimestamp).format('yyyy-MM-DD H:mm:s Z') }})
        </td>
      </tr>
      <tr>
        <td>Count</td>
        <td>{{ props.event.count }}</td>
      </tr>
      <tr>
        <td>Type</td>
        <td>{{ props.event.type }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
