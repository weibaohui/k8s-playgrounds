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
      <tr v-if="props.ing.spec.defaultBackend">
        <td>
          Default Backend
        </td>
        <td>
          <span v-if="props.ing.spec.defaultBackend.service">
            {{ `${props.ing.spec.defaultBackend.service.name}:${props.ing.spec.defaultBackend.service.port.number}` }} (Service)
          </span>
          <span v-if="props.ing.spec.defaultBackend.resource">
            {{ `${props.ing.spec.defaultBackend.resource.kind}:${props.ing.spec.defaultBackend.resource.name}` }} (Resource )
          </span>
        </td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
