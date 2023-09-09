<script setup lang="ts">
import { V1PersistentVolumeClaim } from '@backend/k8s/model/V1PersistentVolumeClaim'
import { ResType } from '@backend/k8s/watch/watch.model'
import ResourceConditionView from '@frontend/components/common/ResourceConditionView.vue'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import PersistentVolumeView from '@frontend/components/PersistentVolume/PersistentVolumeView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import { NButton, NTable } from 'naive-ui'

const props = defineProps({
  pvc: V1PersistentVolumeClaim,
  showTitle: Boolean,

})
const drawer = useDrawerService()
async function onPvClick(name: string) {
  const resource = await K8sService.getResource({
    resType: ResType.PersistentVolume,
    ns: props.pvc.metadata.namespace,
    name,
  })
  DrawerHelper
    .instance
    .drawer(drawer)
    .show(`${ResType.PersistentVolume}:${name}`, PersistentVolumeView, { persistentVolume: resource })
}
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.pvc.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Storage Class
        </td>
        <td>{{ props.pvc.spec.storageClassName }}</td>
      </tr>
      <tr>
        <td>
          requests
        </td>
        <td>{{ props.pvc.spec.resources.requests }}</td>
      </tr>
      <tr>
        <td>
          Access Mode
        </td>
        <td>{{ props.pvc.spec.accessModes.join(', ') }}</td>
      </tr>
      <tr>
        <td>
          Volume Mode
        </td>
        <td>{{ props.pvc.spec.volumeMode }}</td>
      </tr>

      <tr>
        <td>
          status
        </td>
        <td>
          {{ props.pvc.status.phase }}
        </td>
      </tr>
      <tr v-if="props.pvc.status.conditions">
        <td>Conditions</td>
        <td><ResourceConditionView :items="props.pvc.status.conditions" /></td>
      </tr>
      <tr v-if="props.pvc.spec.volumeName">
        <td>
          Volume
        </td>
        <td>
          <NButton type="success" @click="onPvClick(props.pvc.spec.volumeName)">
            {{ props.pvc.spec.volumeName }}
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
