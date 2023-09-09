<script setup lang="ts">
import { V1Service } from '@backend/k8s/model/V1Service'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NTable } from 'naive-ui'

const props = defineProps({
  svc: V1Service,
  showTitle: Boolean,

})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.svc.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Type
        </td>
        <td>{{ props.svc.spec.type }}</td>
      </tr>
      <tr>
        <td>
          Session Affinity
        </td>
        <td>{{ props.svc.spec.sessionAffinity }}{{ props.svc.spec.sessionAffinityConfig }}</td>
      </tr>
      <tr v-if="props.svc.spec.externalName">
        <td>
          External Name
        </td>
        <td>{{ props.svc.spec.externalName }}</td>
      </tr>
      <tr v-if="props.svc.spec.externalTrafficPolicy">
        <td>
          TrafficPolicy
          (External)
        </td>
        <td>{{ props.svc.spec.externalTrafficPolicy }}</td>
      </tr>
      <tr v-if="props.svc.spec.internalTrafficPolicy">
        <td>
          TrafficPolicy
          (Internal)
        </td>
        <td>{{ props.svc.spec.internalTrafficPolicy }}</td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
