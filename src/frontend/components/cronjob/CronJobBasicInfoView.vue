<script setup lang="ts">
import { V1CronJob } from '@backend/k8s/model/V1CronJob'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  cj: V1CronJob,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.cj.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          当前活跃
        </td>
        <td>{{ props.cj.status.active ? props.cj.status.active : 'null' }}</td>
      </tr>
      <tr>
        <td>suspend</td>
        <td>{{ props.cj.spec.suspend }}</td>
      </tr>
      <tr>
        <td>并发执行</td>
        <td>{{ props.cj.spec.concurrencyPolicy }}</td>
      </tr>
      <tr>
        <td>成功历史</td>
        <td>{{ props.cj.spec.successfulJobsHistoryLimit }}</td>
      </tr>
      <tr>
        <td>失败历史</td>
        <td>{{ props.cj.spec.failedJobsHistoryLimit }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
