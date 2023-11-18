<script setup lang="ts">
import { V1StorageClass } from '@backend/k8s/model/V1StorageClass'
import MiniJsonMonacoView from '@frontend/components/common/MiniJsonMonacoView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NTable } from 'naive-ui'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'

const props = defineProps({
  storageClass: V1StorageClass,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.storageClass.metadata" />

  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Provisioner
        </td>
        <td>{{ props.storageClass.provisioner }}</td>
      </tr>
      <tr>
        <td>
          Binding Mode
        </td>
        <td>{{ props.storageClass.volumeBindingMode }}</td>
      </tr>
      <tr v-if="props.storageClass.mountOptions">
        <td>
          Mount Options
        </td>
        <td>{{ props.storageClass.mountOptions.join(' ') }}</td>
      </tr>
      <tr v-if="props.storageClass.reclaimPolicy">
        <td>
          Reclaim Policy
        </td>
        <td>{{ props.storageClass.reclaimPolicy }}</td>
      </tr>
      <tr v-if="props.storageClass.parameters">
        <td>
          Params
        </td>
        <td>
          <div style="width:90%;height: 100%">
            <MiniJsonMonacoView
              :item="props.storageClass.parameters "
            />
          </div>
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
