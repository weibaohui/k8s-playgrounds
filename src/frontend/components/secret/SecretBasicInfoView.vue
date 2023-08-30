<script setup lang="ts">
import { V1Secret } from '@backend/k8s/model/V1Secret'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  secret: V1Secret,
})
</script>

<template>
  <ResourceMetadataView :item="props.secret.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          immutable
        </td>
        <td>{{ props.secret.immutable }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
