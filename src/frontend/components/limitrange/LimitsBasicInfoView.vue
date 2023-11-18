<script setup lang="ts">
import { V1LimitRange } from '@backend/k8s/model/V1LimitRange'
import MiniJsonMonacoView from '@frontend/components/common/MiniJsonMonacoView.vue'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  limits: V1LimitRange,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.limits.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          limits
        </td>
        <td>
          <div style="width:90%;height: 100%">
            <MiniJsonMonacoView
              :min-height="450"
              :item="props.limits.spec.limits "
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
