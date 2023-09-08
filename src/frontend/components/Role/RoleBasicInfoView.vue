<script setup lang="ts">
import { V1Role } from '@backend/k8s/model/v1Role'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  role: V1Role,
})
</script>

<template>
  <ResourceMetadataView :item="props.role.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          rules
        </td>
        <td>{{ props.role.rules }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
