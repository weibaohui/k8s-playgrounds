<script setup lang="ts">
import { V1ClusterRoleBinding } from '@backend/k8s/model/v1ClusterRoleBinding'
import { ResType } from '@backend/k8s/watch/watch.model'
import ClusterRoleView from '@frontend/components/ClusterRole/ClusterRoleView.vue'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import { NButton, NTable } from 'naive-ui'

const props = defineProps({
  clusterRoleBinding: V1ClusterRoleBinding,
  showTitle: Boolean,

})
const drawer = useDrawerService()

async function onClusterRoleNameClick(name: string) {
  const resource = await K8sService.getResource({
    resType: ResType.ClusterRole,
    ns: '',
    name,
  })
  DrawerHelper
    .instance
    .drawer(drawer)
    .show(`${ResType.ClusterRole}:${name}`, ClusterRoleView, { clusterRole: resource })
}
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.clusterRoleBinding.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          ClusterRole
        </td>
        <td>
          <NButton type="success" @click="onClusterRoleNameClick(props.clusterRoleBinding.roleRef.name)">
            {{ props.clusterRoleBinding.roleRef.name }}
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
