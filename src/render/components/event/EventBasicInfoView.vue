<script setup lang="ts">
import { NTable } from 'naive-ui'
import moment from 'moment/moment'
import { V1Event } from '../../../model/V1Event'

const props = defineProps({
  item: V1Event,
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
          {{ moment(item.metadata.creationTimestamp).format('yyyy-MM-DD H:mm:s Z') }}
          {{ moment(item.metadata.creationTimestamp).fromNow() }}
        </td>
      </tr>
      <tr>
        <td>Name</td>
        <td>{{ props.item.metadata.name }}</td>
      </tr>
      <tr>
        <td>Namespace</td>
        <td>{{ props.item.metadata.namespace }}</td>
      </tr>
      <tr>
        <td>Message</td>
        <td>{{ props.item.message }}</td>
      </tr>
      <tr>
        <td>Reason</td>
        <td>{{ props.item.reason }}</td>
      </tr>
      <tr>
        <td>source</td>
        <td>{{ props.item.source.component }} {{ props.item.source.host }}</td>
      </tr>
      <tr>
        <td>First seen</td>
        <td>
          {{ moment(item.firstTimestamp).fromNow() }} ({{ moment(item.firstTimestamp).format('yyyy-MM-DD H:mm:s Z') }})
        </td>
      </tr>
      <tr>
        <td>Last seen</td>
        <td>
          {{ moment(item.lastTimestamp).fromNow() }} ({{ moment(item.lastTimestamp).format('yyyy-MM-DD H:mm:s Z') }})
        </td>
      </tr>
      <tr>
        <td>Count</td>
        <td>{{ props.item.count }}</td>
      </tr>
      <tr>
        <td>Type</td>
        <td>{{ props.item.type }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
