<script setup lang="ts">
import { V1Ingress } from '@backend/k8s/model/v1Ingress'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  ing: V1Ingress,
})
</script>

<template>
  <ResourceMetadataView :item="props.ing.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Ingress Class
        </td>
        <td>{{ props.ing.spec.ingressClassName }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
