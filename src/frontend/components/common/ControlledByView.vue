<script setup lang="ts">
import type { V1OwnerReference } from '@backend/k8s/model/V1OwnerReference'
import DeployView from '@frontend/components/deployment/DeployView.vue'
import NodeView from '@frontend/components/node/NodeView.vue'
import RsView from '@frontend/components/replicaset/RsView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import { NButton, NTooltip } from 'naive-ui'
import { V1ObjectMeta } from '@backend/k8s/model/V1ObjectMeta'

const props = defineProps({
  item: V1ObjectMeta,
  simple: Boolean,
})

const drawer = useDrawerService()

async function showView(ns: string, item: V1OwnerReference) {
  switch (item.kind) {
    case 'ReplicaSet':
      DrawerHelper
        .instance
        .drawer(drawer)
        .show(`ReplicaSet:${item.name}`, RsView, { rs: await K8sService.replicasetService.getReplicaSet(ns, item.name) })
      break
    case 'Deployment':
      DrawerHelper
        .instance
        .drawer(drawer)
        .show(`Deployment:${item.name}`, DeployView, { deploy: await K8sService.deploymentService.getDeployment(ns, item.name) })
      break
    case 'Node':
      DrawerHelper
        .instance
        .drawer(drawer)
        .show(`Node:${item.name}`, NodeView, { node: await K8sService.nodeService.getNode(item.name) })
      break
    default:
      alert('未实现')
  }
}
</script>

<template>
  <span v-for="r in props.item.ownerReferences" :key="r.uid">

    <NTooltip v-if="simple" trigger="hover">
      <template #trigger>
        <NButton text type="success" @click="showView(props.item.namespace, r)">
          {{ r.kind }}
        </NButton>
      </template>
      {{ r.name }}
    </NTooltip>
    <span v-else>
      {{ r.kind }}
      <NButton quaternary type="success" @click="showView(props.item.namespace, r)">
        {{ r.name }}
      </NButton>
    </span>
  </span>
</template>

<style scoped>
</style>
