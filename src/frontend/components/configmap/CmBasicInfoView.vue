<script setup lang="ts">
import { V1ConfigMap } from '@backend/k8s/model/V1ConfigMap'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  cm: V1ConfigMap,
})
</script>

<template>
  <ResourceMetadataView :item="props.cm.metadata" />

  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          immutable
        </td>
        <td>{{ props.cm.immutable }}</td>
      </tr>
    </tbody>
  </NTable>
  <span v-for="(v, k) in props.cm.data" :key="k">
    {{ k }}={{ v }}
  </span>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
