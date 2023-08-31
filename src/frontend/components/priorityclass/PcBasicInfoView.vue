<script setup lang="ts">
import { V1PriorityClass } from '@backend/k8s/model/v1PriorityClass'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  pc: V1PriorityClass,
})
</script>

<template>
  <ResourceMetadataView :item="props.pc.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          description
        </td>
        <td>{{ props.pc.description }}</td>
      </tr>
      <tr>
        <td>
          globalDefault
        </td>
        <td>{{ props.pc.globalDefault }}</td>
      </tr>
      <tr>
        <td>
          preemptionPolicy
        </td>
        <td>{{ props.pc.preemptionPolicy }}</td>
      </tr>
      <tr>
        <td>
          value
        </td>
        <td>{{ props.pc.value }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
