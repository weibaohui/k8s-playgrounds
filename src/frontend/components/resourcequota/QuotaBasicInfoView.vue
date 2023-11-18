<script setup lang="ts">
import { V1ResourceQuota } from '@backend/k8s/model/V1ResourceQuota'
import MiniJsonMonacoView from '@frontend/components/common/MiniJsonMonacoView.vue'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  quota: V1ResourceQuota,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.quota.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          hard
        </td>
        <td>
          <div style="width:90%;height: 100%;">
            <MiniJsonMonacoView
              :min-height="150"
              :item="props.quota.status.hard "
            />
          </div>
        </td>
      </tr>
      <tr>
        <td>
          used
        </td>
        <td>
          <div style="width:90%;height: 100%">
            <MiniJsonMonacoView
              :min-height="150"
              :item="props.quota.status.used "
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
