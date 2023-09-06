<script setup lang="ts">
import { V1NetworkPolicy } from '@backend/k8s/model/v1NetworkPolicy'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { ColorHelper } from '@frontend/service/page/ColorHelper'
import { NSpace, NTable, NTag } from 'naive-ui'

const props = defineProps({
  netpol: V1NetworkPolicy,
})
</script>

<template>
  <ResourceMetadataView :item="props.netpol.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          PodSelector
          (label)
        </td>
        <td>
          <NSpace v-if="props.netpol.spec.podSelector.matchLabels" vertical>
            <NTag v-for="(v, k) in props.netpol.spec.podSelector.matchLabels" :key="k" :color="{ color: ColorHelper.randomColor() }">
              {{ k }}={{ v }}
            </NTag>
          </NSpace>
          <NTag v-else type="error">
            ALL
          </NTag>
        </td>
      </tr>
      <tr v-if="props.netpol.spec.podSelector.matchExpressions">
        <td>
          PodSelector
          (label expr)
        </td>
        <td>
          <NSpace vertical>
            <NTag v-for="m in props.netpol.spec.podSelector.matchExpressions" :key="m" :color="{ color: ColorHelper.randomColor() }">
              {{ m.key }} {{ m.operator }} {{ m.values }}
            </NTag>
          </NSpace>
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
