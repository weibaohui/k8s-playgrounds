<script setup lang="ts">
import { V1IngressClass } from '@backend/k8s/model/v1IngressClass'
import { NTable } from 'naive-ui'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'

const props = defineProps({
  ingressClass: V1IngressClass,
})
</script>

<template>
  <ResourceMetadataView :item="props.ingressClass.metadata" />

  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          controller
        </td>
        <td>{{ props.ingressClass.spec.controller }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
