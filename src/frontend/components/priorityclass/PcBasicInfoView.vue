<script setup lang="ts">
import { V1PriorityClass } from '@backend/k8s/model/V1PriorityClass'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  pc: V1PriorityClass,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

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
