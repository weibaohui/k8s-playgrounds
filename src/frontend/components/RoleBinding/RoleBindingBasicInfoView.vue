<script setup lang="ts">
import { V1RoleBinding } from '@backend/k8s/model/v1RoleBinding'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  roleBinding: V1RoleBinding,
})
</script>

<template>
  <ResourceMetadataView :item="props.roleBinding.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          rules
        </td>
        <td>{{ props.roleBinding.roleRef }}</td>
      </tr>
      <tr>
        <td>
          subjects
        </td>
        <td>{{ props.roleBinding.subjects }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
