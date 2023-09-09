<script setup lang="ts">
import { V1ClusterRole } from '@backend/k8s/model/v1ClusterRole'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  clusterRole: V1ClusterRole,
  showTitle: Boolean,
})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />
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
