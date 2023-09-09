<script setup lang="ts">
import { V1RoleBinding } from '@backend/k8s/model/v1RoleBinding'
import type { V1Subject } from '@backend/k8s/model/v1Subject'
import { ResType } from '@backend/k8s/watch/watch.model'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import SaView from '@frontend/components/ServiceAccount/SaView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import { NButton, NTable } from 'naive-ui'

const props = defineProps({
  roleBinding: V1RoleBinding,
  showTitle: Boolean,

})
const drawer = useDrawerService()

async function onRoleBindClick(sub: V1Subject) {
  if (sub.kind === 'ServiceAccount') {
    const resource = await K8sService.getResource({
      resType: ResType.ServiceAccount,
      ns: sub.namespace,
      name: sub.name,
    })
    DrawerHelper
      .instance
      .drawer(drawer)
      .show(`${ResType.ServiceAccount}:${sub.name}`, SaView, { sa: resource })
  }
}
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Binding Target" />

  <NTable :single-line="false">
    <tbody>
      <tr>
        <th class="left">
          kind
        </th>
        <th class="left">
          name
        </th>
        <th class="left">
          namespace
        </th>
      </tr>
      <tr v-for="sub in props.roleBinding.subjects" :key="sub">
        <td>
          {{ sub.kind }}
        </td>
        <td>
          <NButton type="success" @click="onRoleBindClick(sub)">
            {{ sub.name }}
          </NButton>
        </td>
        <td>
          {{ sub.namespace }}
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
