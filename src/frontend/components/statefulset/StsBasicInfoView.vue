<script setup lang="ts">
import { V1StatefulSet } from '@backend/k8s/model/v1StatefulSet'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  sts: V1StatefulSet,
})
</script>

<template>
  <ResourceMetadataView :item="props.sts.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          replicas
        </td>
        <td>{{ props.sts.status.replicas }}</td>
      </tr>
      <tr>
        <td>
          availableReplicas
        </td>
        <td>{{ props.sts.status.availableReplicas ? props.sts.status.availableReplicas : 0 }}</td>
      </tr>
      <tr>
        <td>readyReplicas</td>
        <td>{{ props.sts.status.readyReplicas ? props.sts.status.readyReplicas : 0 }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
