<script setup lang="ts">
import { V1ObjectMeta } from '@backend/k8s/model/V1ObjectMeta'
import { V1OwnerReference } from '@backend/k8s/model/V1OwnerReference'
import { V2HorizontalPodAutoscaler } from '@backend/k8s/model/v2HorizontalPodAutoscaler'
import ControlledByView from '@frontend/components/common/ControlledByView.vue'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  hpa: V2HorizontalPodAutoscaler,
})
function getFakeV1ObjectMeta() {
  const om = new V1ObjectMeta()
  const own = new V1OwnerReference()
  own.name = props.hpa.spec.scaleTargetRef.name
  own.kind = props.hpa.spec.scaleTargetRef.kind
  om.namespace = props.hpa.metadata.namespace
  om.ownerReferences = [own]
  return om
}
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
        <td>
          <ControlledByView :item="getFakeV1ObjectMeta()" :simple="false" />
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
