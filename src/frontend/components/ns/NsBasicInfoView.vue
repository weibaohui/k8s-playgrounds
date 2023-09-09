<script setup lang="ts">
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NSpace, NTable, NTag } from 'naive-ui'
import { V1Namespace } from '@backend/k8s/model/V1Namespace'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'

const props = defineProps({
  ns: V1Namespace,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.ns.metadata" />

  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Finalizers
        </td>
        <td>
          <NSpace v-for="f in props.ns.spec.finalizers" :key="f">
            <NTag type="success">
              {{ f }}
            </NTag>
          </NSpace>
        </td>
      </tr>
      <tr>
        <td>Status</td>
        <td>{{ props.ns.status.phase }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
