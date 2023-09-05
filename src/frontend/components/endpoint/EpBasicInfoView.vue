<script setup lang="ts">
import { V1Endpoints } from '@backend/k8s/model/V1Endpoints'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  ep: V1Endpoints,
})
</script>

<template>
  <ResourceMetadataView :item="props.ep.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          subsets
        </td>
        <td>{{ props.ep.subsets }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
