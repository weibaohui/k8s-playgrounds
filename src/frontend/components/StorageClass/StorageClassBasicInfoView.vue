<script setup lang="ts">
import { V1StorageClass } from '@backend/k8s/model/v1StorageClass'
import { NTable } from 'naive-ui'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'

const props = defineProps({
  storageClass: V1StorageClass,
})
</script>

<template>
  <ResourceMetadataView :item="props.storageClass.metadata" />

  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          provisioner
        </td>
        <td>{{ props.storageClass.provisioner }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
