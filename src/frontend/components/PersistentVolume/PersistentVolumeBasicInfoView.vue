<script setup lang="ts">
import type { V1ObjectReference } from '@backend/k8s/model/V1ObjectReference'
import { V1PersistentVolume } from '@backend/k8s/model/v1PersistentVolume'
import { ResType } from '@backend/k8s/watch/watch.model'
import PvcView from '@frontend/components/PersistentVolumeClaim/PvcView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import { NButton, NTable } from 'naive-ui'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'

const props = defineProps({
  persistentVolume: V1PersistentVolume,
})
const drawer = useDrawerService()

async function onPvcClick(ref: V1ObjectReference) {
  const resource = await K8sService.getResource({
    resType: ResType.PersistentVolumeClaim,
    ns: ref.namespace,
    name: ref.name,
  })
  DrawerHelper
    .instance
    .drawer(drawer)
    .show(`${ResType.PersistentVolumeClaim}:${ref.name}`, PvcView, { pvc: resource })
}
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
          <NButton type="success" @click="onPvcClick(props.persistentVolume.spec.claimRef)">
            {{ props.persistentVolume.spec.claimRef.kind }}
            {{ props.persistentVolume.spec.claimRef.namespace }}/{{ props.persistentVolume.spec.claimRef.name }}
          </NButton>
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
