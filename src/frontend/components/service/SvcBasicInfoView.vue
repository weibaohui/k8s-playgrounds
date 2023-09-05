<script setup lang="ts">
import { V1Service } from '@backend/k8s/model/V1Service'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  svc: V1Service,
})
</script>

<template>
  <ResourceMetadataView :item="props.svc.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          ipFamilies
        </td>
        <td>{{ props.svc.spec.ipFamilies }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
