<script setup lang="ts">
import { V1ClusterRole } from '@backend/k8s/model/v1ClusterRole'
import LabelSelectorView from '@frontend/components/common/LabelSelectorView.vue'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NSpace, NTable } from 'naive-ui'

const props = defineProps({
  clusterRole: V1ClusterRole,
  showTitle: Boolean,
})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />
  <ResourceMetadataView :item="props.clusterRole.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr v-if="props.clusterRole.aggregationRule">
        <td class="left">
          aggregationRule
        </td>
        <td>
          <NSpace v-for="labelSelector in props.clusterRole.aggregationRule.clusterRoleSelectors" :key="labelSelector" vertical>
            <LabelSelectorView :ls="labelSelector" />
          </NSpace>
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
