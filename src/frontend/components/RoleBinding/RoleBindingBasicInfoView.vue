<script setup lang="ts">
import { V1RoleBinding } from '@backend/k8s/model/V1RoleBinding'
import { ResType } from '@backend/k8s/watch/watch.model'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import RoleView from '@frontend/components/Role/RoleView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import { NButton, NTable } from 'naive-ui'

const props = defineProps({
  roleBinding: V1RoleBinding,
  showTitle: Boolean,
})
const drawer = useDrawerService()

async function onClusterRoleNameClick(name: string) {
  const resource = await K8sService.getResource({
    resType: ResType.Role,
    ns: props.roleBinding.metadata.namespace,
    name,
  })
  DrawerHelper
    .instance
    .drawer(drawer)
    .show(`${ResType.Role}:${name}`, RoleView, { role: resource })
}
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />

  <ResourceMetadataView :item="props.roleBinding.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Role
        </td>
        <td>
          <NButton type="success" @click="onClusterRoleNameClick(props.roleBinding.roleRef.name)">
            {{ props.roleBinding.roleRef.name }}
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
