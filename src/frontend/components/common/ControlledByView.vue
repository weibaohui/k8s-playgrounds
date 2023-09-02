<script setup lang="ts">
import { V1ObjectMeta } from '@backend/k8s/model/V1ObjectMeta'
import type { V1OwnerReference } from '@backend/k8s/model/V1OwnerReference'
import CronJobView from '@frontend/components/cronjob/CronJobView.vue'
import DsView from '@frontend/components/daemonset/DsView.vue'
import DeployView from '@frontend/components/deployment/DeployView.vue'
import JobView from '@frontend/components/job/JobView.vue'
import NodeView from '@frontend/components/node/NodeView.vue'
import PodView from '@frontend/components/pod/PodView.vue'
import RcView from '@frontend/components/replicacontroller/RcView.vue'
import RsView from '@frontend/components/replicaset/RsView.vue'
import StsView from '@frontend/components/statefulset/StsView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import { NButton, NTooltip } from 'naive-ui'

const props = defineProps({
  item: V1ObjectMeta,
  simple: Boolean,
})

const drawer = useDrawerService()

async function showView(ns: string, item: V1OwnerReference) {
  const name = item.name
  const resType = item.kind
  const resource = await K8sService.getResource({
    resType,
    ns,
    name,
  })
  const title = `${item.kind}:${item.name}`
  const drawerInstance = DrawerHelper.instance.drawer(drawer)
  switch (item.kind) {
    case 'ReplicaSet':
      drawerInstance
        .show(title, RsView, { rs: resource })
      break
    case 'Deployment':
      drawerInstance
        .show(title, DeployView, { deploy: resource })
      break
    case 'Node':
      drawerInstance
        .show(title, NodeView, { node: resource })
      break
    case 'DaemonSet':
      drawerInstance
        .show(title, DsView, { ds: resource })
      break
    case 'ReplicationController':
      drawerInstance
        .show(title, RcView, { rc: resource })
      break
    case 'StatefulSet':
      drawerInstance
        .show(title, StsView, { sts: resource })
      break
    case 'Pod':
      drawerInstance
        .show(title, PodView, { pod: resource })
      break
    case 'Job':
      drawerInstance
        .show(title, JobView, { job: resource })
      break
    case 'CronJob':
      drawerInstance
        .show(title, CronJobView, { cj: resource })
      break
    default:
      alert(`未实现${item.kind}`)
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
