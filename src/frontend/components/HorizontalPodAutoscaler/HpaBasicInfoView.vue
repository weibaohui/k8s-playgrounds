<script setup lang="ts">
import { V1ObjectMeta } from '@backend/k8s/model/V1ObjectMeta'
import { V1OwnerReference } from '@backend/k8s/model/V1OwnerReference'
import { V2HorizontalPodAutoscaler } from '@backend/k8s/model/v2HorizontalPodAutoscaler'
import ControlledByView from '@frontend/components/common/ControlledByView.vue'
import ResourceConditionView from '@frontend/components/common/ResourceConditionView.vue'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  hpa: V2HorizontalPodAutoscaler,
  showTitle: Boolean,

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
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.hpa.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Max Pods
        </td>
        <td>{{ props.hpa.spec.maxReplicas }}</td>
      </tr>
      <tr>
        <td>
          Min Pods
        </td>
        <td>{{ props.hpa.spec.minReplicas }}</td>
      </tr>
      <tr>
        <td>
          Replicas
        </td>
        <td>{{ props.hpa.status.currentReplicas }}</td>
      </tr>
      <tr>
        <td>Conditions</td>
        <td><ResourceConditionView :items="props.hpa.status.conditions" /></td>
      </tr>
      <tr>
        <td>
          Reference
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
