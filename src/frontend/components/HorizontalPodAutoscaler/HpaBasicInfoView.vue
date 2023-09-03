<script setup lang="ts">
import { V2HorizontalPodAutoscaler } from '@backend/k8s/model/v2HorizontalPodAutoscaler'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  hpa: V2HorizontalPodAutoscaler,
})
</script>

<template>
  <ResourceMetadataView :item="props.hpa.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          behavior
        </td>
        <td>{{ props.hpa.spec.behavior }}</td>
      </tr>
      <tr>
        <td>
          maxReplicas
        </td>
        <td>{{ props.hpa.spec.maxReplicas }}</td>
      </tr>
      <tr>
        <td>
          minReplicas
        </td>
        <td>{{ props.hpa.spec.minReplicas }}</td>
      </tr>
      <tr>
        <td>
          metrics
        </td>
        <td>{{ props.hpa.spec.metrics }}</td>
      </tr>
      <tr>
        <td>
          scaleTargetRef
        </td>
        <td>{{ props.hpa.spec.scaleTargetRef }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
