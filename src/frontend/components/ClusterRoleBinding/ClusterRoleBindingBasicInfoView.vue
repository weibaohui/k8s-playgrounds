<script setup lang="ts">
import { V1ClusterRoleBinding } from '@backend/k8s/model/v1ClusterRoleBinding'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  clusterRoleBinding: V1ClusterRoleBinding,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.clusterRoleBinding.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          roleRef
        </td>
        <td>{{ props.clusterRoleBinding.roleRef }}</td>
      </tr>
      <tr>
        <td>
          rules
        </td>
        <td>{{ props.clusterRoleBinding.subjects }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
