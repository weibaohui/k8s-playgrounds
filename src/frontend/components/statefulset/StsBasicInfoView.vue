<script setup lang="ts">
import { V1StatefulSet } from '@backend/k8s/model/v1StatefulSet'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  sts: V1StatefulSet,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.sts.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Replicas
        </td>
        <td>
          {{
            `${props.sts.status.replicas ? props.sts.status.replicas : 0} desired,
${props.sts.status.updatedReplicas ? props.sts.status.updatedReplicas : 0} updated,
${props.sts.status.replicas ? props.sts.status.replicas : 0} total,
${props.sts.status.availableReplicas ? props.sts.status.availableReplicas : 0} available
`
          }}
        </td>
      </tr>
      <tr>
        <td class="left">
          replicas
        </td>
        <td>{{ props.sts.status.replicas }}</td>
      </tr>
      <tr>
        <td>
          minReadySeconds
        </td>
        <td>{{ props.sts.spec.minReadySeconds }}</td>
      </tr>
      <tr>
        <td>updateStrategy</td>
        <td>{{ props.sts.spec.updateStrategy.type }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
