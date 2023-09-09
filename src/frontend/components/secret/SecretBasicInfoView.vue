<script setup lang="ts">
import { V1Secret } from '@backend/k8s/model/V1Secret'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  secret: V1Secret,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.secret.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          type
        </td>
        <td>{{ props.secret.type }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
