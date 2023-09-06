<script setup lang="ts">
import { V1NetworkPolicy } from '@backend/k8s/model/v1NetworkPolicy'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  netpol: V1NetworkPolicy,
})
</script>

<template>
  <ResourceMetadataView :item="props.netpol.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          podSelector
        </td>
        <td>{{ props.netpol.spec.podSelector }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
