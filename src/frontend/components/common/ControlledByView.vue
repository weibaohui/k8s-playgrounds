<script setup lang="ts">
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
        .show(`ReplicaSet:${item.name}`, RsView, { rs: await K8sService.playService.replicaSetControllerGetOneByNsName({ ns, name: item.name }) })
      break
    case 'Deployment':
      DrawerHelper
        .instance
        .drawer(drawer)
        .show(`Deployment:${item.name}`, DeployView, { deploy: await K8sService.playService.deploymentControllerGetOneByNsName({ ns, name: item.name }) })
      break
    case 'Node':
      DrawerHelper
        .instance
        .drawer(drawer)
        .show(`Node:${item.name}`, NodeView, { node: await K8sService.playService.nodeControllerGetOneByName({ name: item.name }) })
      break
    case 'DaemonSet':
      DrawerHelper
        .instance
        .drawer(drawer)
        .show(`DaemonSet:${item.name}`, DsView, { ds: await K8sService.playService.daemonSetControllerGetOneByNsName({ ns, name: item.name }) })
      break
    case 'ReplicationController':
      DrawerHelper
        .instance
        .drawer(drawer)
        .show(`ReplicationController:${item.name}`, RcView, { rc: await K8sService.playService.replicationControllerGetOneByNsName({ ns, name: item.name }) })
      break
    case 'StatefulSet':
      DrawerHelper
        .instance
        .drawer(drawer)
        .show(`StatefulSet:${item.name}`, StsView, { sts: await K8sService.playService.statefulSetControllerGetOneByNsName({ ns, name: item.name }) })
      break
    case 'Pod':
      DrawerHelper
        .instance
        .drawer(drawer)
        .show(`Pod:${item.name}`, PodView, { pod: await K8sService.playService.podControllerGetOneByNsName({ ns, name: item.name }) })
      break
    case 'Job':
      DrawerHelper
        .instance
        .drawer(drawer)
        .show(`Job:${item.name}`, JobView, { job: await K8sService.playService.jobControllerGetOneByNsName({ ns, name: item.name }) })
      break
    case 'CronJob':
      DrawerHelper
        .instance
        .drawer(drawer)
        .show(`CronJob:${item.name}`, CronJobView, { cj: await K8sService.playService.cronJobControllerGetOneByNsName({ ns, name: item.name }) })
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
