<script setup lang="ts">
import { V1ServiceAccount } from '@backend/k8s/model/V1ServiceAccount'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  sa: V1ServiceAccount,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.sa.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          imagePullSecrets
        </td>
        <td>{{ props.sa.imagePullSecrets }}</td>
      </tr>
      <tr>
        <td>
          automountServiceAccountToken
        </td>
        <td>{{ props.sa.automountServiceAccountToken }}</td>
      </tr>
      <tr>
        <td>
          secrets
        </td>
        <td>{{ props.sa.secrets }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
