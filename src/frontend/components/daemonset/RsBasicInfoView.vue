<script setup lang="ts">
import { V1ReplicaSet } from '@backend/k8s/model/V1ReplicaSet'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  rs: V1ReplicaSet,
})
</script>

<template>
  <ResourceMetadataView :item="props.rs.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          replicas
        </td>
        <td>{{ props.rs.status.replicas }}</td>
      </tr>
      <tr>
        <td>
          availableReplicas
        </td>
        <td>{{ props.rs.status.availableReplicas ? props.rs.status.availableReplicas : 0 }}</td>
      </tr>
      <tr>
        <td>readyReplicas</td>
        <td>{{ props.rs.status.readyReplicas ? props.rs.status.readyReplicas : 0 }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
