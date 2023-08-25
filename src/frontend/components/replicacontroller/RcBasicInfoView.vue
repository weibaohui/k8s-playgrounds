<script setup lang="ts">
import { V1ReplicationController } from '@backend/k8s/model/V1ReplicationController'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  rc: V1ReplicationController,
})
</script>

<template>
  <ResourceMetadataView :item="props.rc.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          replicas
        </td>
        <td>{{ props.rc.status.replicas }}</td>
      </tr>
      <tr>
        <td>
          availableReplicas
        </td>
        <td>{{ props.rc.status.availableReplicas ? props.rc.status.availableReplicas : 0 }}</td>
      </tr>
      <tr>
        <td>readyReplicas</td>
        <td>{{ props.rc.status.readyReplicas ? props.rc.status.readyReplicas : 0 }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
