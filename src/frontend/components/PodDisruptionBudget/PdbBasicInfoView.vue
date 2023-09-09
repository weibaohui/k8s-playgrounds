<script setup lang="ts">
import { V1PodDisruptionBudget } from '@backend/k8s/model/v1PodDisruptionBudget'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  pdb: V1PodDisruptionBudget,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.pdb.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Min Available
        </td>
        <td>{{ props.pdb.spec.minAvailable }}</td>
      </tr>
      <tr>
        <td>
          Max Unavailable
        </td>
        <td>{{ props.pdb.spec.maxUnavailable }}</td>
      </tr>
      <tr>
        <td>
          Current Healthy
        </td>
        <td>{{ props.pdb.status.currentHealthy }}</td>
      </tr>
      <tr>
        <td>
          Desired Healthy
        </td>
        <td>{{ props.pdb.status.desiredHealthy }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
