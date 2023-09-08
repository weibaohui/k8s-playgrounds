<script setup lang="ts">
import { V1ClusterRole } from '@backend/k8s/model/v1ClusterRole'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  clusterRole: V1ClusterRole,
})
</script>

<template>
  <ResourceMetadataView :item="props.clusterRole.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          aggregationRule
        </td>
        <td>{{ props.clusterRole.aggregationRule }}</td>
      </tr>
      <tr>
        <td>
          rules
        </td>
        <td>{{ props.clusterRole.rules }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
