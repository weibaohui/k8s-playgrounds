<script setup lang="ts">
import { V1LimitRange } from '@backend/k8s/model/V1LimitRange'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  limits: V1LimitRange,
})
</script>

<template>
  <ResourceMetadataView :item="props.limits.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          limits
        </td>
        <td>{{ props.limits.spec.limits }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
