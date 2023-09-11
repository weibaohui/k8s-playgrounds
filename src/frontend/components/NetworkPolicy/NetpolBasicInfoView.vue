<script setup lang="ts">
import { V1NetworkPolicy } from '@backend/k8s/model/V1NetworkPolicy'
import LabelSelectorView from '@frontend/components/common/LabelSelectorView.vue'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  netpol: V1NetworkPolicy,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.netpol.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td>
          Pods
        </td>
        <td>
          <LabelSelectorView :ls="props.netpol.spec.podSelector" :match-all="true" />
        </td>
      </tr>
      <tr>
        <td>
          policyTypes
        </td>
        <td>
          {{ props.netpol.spec.policyTypes.join(',') }}
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
