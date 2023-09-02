<script setup lang="ts">
import { V1ResourceQuota } from '@backend/k8s/model/V1ResourceQuota'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  quota: V1ResourceQuota,
})
</script>

<template>
  <ResourceMetadataView :item="props.quota.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          hard
        </td>
        <td>{{ props.quota.status.hard }}</td>
      </tr>
      <tr>
        <td>
          used
        </td>
        <td>{{ props.quota.status.used }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
