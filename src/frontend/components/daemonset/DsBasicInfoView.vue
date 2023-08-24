<script setup lang="ts">
import { V1DaemonSet } from '@backend/k8s/model/V1DaemonSet'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import PodSpecView from '@frontend/components/pod/PodSpecView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  ds: V1DaemonSet,
})
</script>

<template>
  <ResourceMetadataView :item="props.ds.metadata" />
  <PodSpecView :spec="props.ds.spec.template.spec" />

  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Strategy Type
        </td>
        <td>{{ props.ds.spec.updateStrategy.type }}</td>
      </tr>
      <tr>
        <td>
          Images
        </td>
        <td>
          <span v-for="c in props.ds.spec.template.spec.containers" :key="c.name">
            {{ c.image }}
          </span>
        </td>
      </tr>
      <tr>
        <td>Pod Status</td>
        <td>
          {{
            `${props.ds.status.desiredNumberScheduled ? props.ds.status.desiredNumberScheduled : 0} desired,
${props.ds.status.updatedNumberScheduled ? props.ds.status.updatedNumberScheduled : 0} updated,
${props.ds.status.numberReady ? props.ds.status.numberReady : 0} ready,
${props.ds.status.numberAvailable ? props.ds.status.numberAvailable : 0} available,
${props.ds.status.numberUnavailable ? props.ds.status.numberUnavailable : 0} unavailable`
          }}
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
