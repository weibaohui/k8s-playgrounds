<script setup lang="ts">
import { V1PersistentVolume } from '@backend/k8s/model/v1PersistentVolume'
import { NTable } from 'naive-ui'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'

const props = defineProps({
  persistentVolume: V1PersistentVolume,
})
</script>

<template>
  <ResourceMetadataView :item="props.persistentVolume.metadata" />

  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Storage Class
        </td>
        <td>{{ props.persistentVolume.spec.storageClassName }}</td>
      </tr>
      <tr>
        <td>
          capacity
        </td>
        <td>{{ props.persistentVolume.spec.capacity }}</td>
      </tr>
      <tr>
        <td>
          Access Mode
        </td>
        <td>{{ props.persistentVolume.spec.accessModes.join(', ') }}</td>
      </tr>
      <tr>
        <td>
          Volume Mode
        </td>
        <td>{{ props.persistentVolume.spec.volumeMode }}</td>
      </tr>
      <tr v-if="props.persistentVolume.spec.hostPath">
        <td>
          HostPath
        </td>
        <td>{{ props.persistentVolume.spec.hostPath.path }}</td>
      </tr>
      <tr>
        <td>
          Reclaim Policy
        </td>
        <td>{{ props.persistentVolume.spec.persistentVolumeReclaimPolicy }}</td>
      </tr>

      <tr>
        <td>
          status
        </td>
        <td>
          {{ props.persistentVolume.status.phase }}
          {{ props.persistentVolume.status.message ? props.persistentVolume.status.message : '' }}
          {{ props.persistentVolume.status.reason ? props.persistentVolume.status.reason : '' }}
        </td>
      </tr>
      <tr v-if="props.persistentVolume.spec.claimRef">
        <td>
          Claim
        </td>
        <td>
          {{ props.persistentVolume.spec.claimRef.kind }}
          {{ props.persistentVolume.spec.claimRef.namespace }}/{{ props.persistentVolume.spec.claimRef.name }}
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
