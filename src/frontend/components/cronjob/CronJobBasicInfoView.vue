<script setup lang="ts">
import { V1CronJob } from '@backend/k8s/model/v1CronJob'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  cj: V1CronJob,
})
</script>

<template>
  <ResourceMetadataView :item="props.cj.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          active
        </td>
        <td>{{ props.cj.status.active ? props.cj.status.active : 0 }}</td>
      </tr>
      <tr>
        <td>suspend</td>
        <td>{{ props.cj.spec.suspend }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
