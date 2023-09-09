<script setup lang="ts">
import { V1IngressClass } from '@backend/k8s/model/v1IngressClass'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NTable } from 'naive-ui'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'

const props = defineProps({
  ingressClass: V1IngressClass,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

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
