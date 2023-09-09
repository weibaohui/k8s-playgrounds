<script setup lang="ts">
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NTable } from 'naive-ui'
import moment from 'moment/moment'
import { V1Event } from '@backend/k8s/model/V1Event'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'

const props = defineProps({
  event: V1Event,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.event.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Message
        </td>
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
