<script setup lang="ts">
import { V1Job } from '@backend/k8s/model/V1Job'
import ResourceConditionView from '@frontend/components/common/ResourceConditionView.vue'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  job: V1Job,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.job.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          ready
        </td>
        <td>{{ props.job.status.ready ? props.job.status.ready : 0 }}</td>
      </tr>
      <tr>
        <td>
          failed
        </td>
        <td>{{ props.job.status.failed ? props.job.status.failed : 0 }}</td>
      </tr>
      <tr>
        <td>active</td>
        <td>{{ props.job.status.active ? props.job.status.active : 0 }}</td>
      </tr>
      <tr>
        <td>succeeded</td>
        <td>{{ props.job.status.succeeded ? props.job.status.succeeded : 0 }}</td>
      </tr>
      <tr>
        <td>Conditions</td>
        <td><ResourceConditionView :items="props.job.status.conditions" /></td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
