<script setup lang="ts">
import { V1ObjectMeta } from '@backend/k8s/model/V1ObjectMeta'
import type { V1OwnerReference } from '@backend/k8s/model/V1OwnerReference'
import { ResType } from '@backend/k8s/watch/watch.model'
import ClusterRoleView from '@frontend/components/ClusterRole/ClusterRoleView.vue'
import ClusterRoleBindingView from '@frontend/components/ClusterRoleBinding/ClusterRoleBindingView.vue'
import CmView from '@frontend/components/configmap/CmView.vue'
import CronJobView from '@frontend/components/cronjob/CronJobView.vue'
import DsView from '@frontend/components/daemonset/DsView.vue'
import DeployView from '@frontend/components/deployment/DeployView.vue'
import EpView from '@frontend/components/endpoint/EpView.vue'
import EndpointSliceView from '@frontend/components/EndpointSlice/EndpointSliceView.vue'
import EventView from '@frontend/components/event/EventView.vue'
import HpaView from '@frontend/components/HorizontalPodAutoscaler/HpaView.vue'
import IngView from '@frontend/components/ingress/IngView.vue'
import IngressClassView from '@frontend/components/IngressClass/IngressClassView.vue'
import JobView from '@frontend/components/job/JobView.vue'
import LimitsView from '@frontend/components/limitrange/LimitsView.vue'
import MutatingWebhookView from '@frontend/components/MutatingWebhook/MutatingWebhookView.vue'
import NetpolView from '@frontend/components/NetworkPolicy/NetpolView.vue'
import NodeView from '@frontend/components/node/NodeView.vue'
import NsView from '@frontend/components/ns/NsView.vue'
import PersistentVolumeView from '@frontend/components/PersistentVolume/PersistentVolumeView.vue'
import PvcView from '@frontend/components/PersistentVolumeClaim/PvcView.vue'
import PodView from '@frontend/components/pod/PodView.vue'
import PdbView from '@frontend/components/PodDisruptionBudget/PdbView.vue'
import PcView from '@frontend/components/priorityclass/PcView.vue'
import RcView from '@frontend/components/replicacontroller/RcView.vue'
import RsView from '@frontend/components/replicaset/RsView.vue'
import QuotaView from '@frontend/components/resourcequota/QuotaView.vue'
import RoleView from '@frontend/components/Role/RoleView.vue'
import RoleBindingView from '@frontend/components/RoleBinding/RoleBindingView.vue'
import SecretView from '@frontend/components/secret/SecretView.vue'
import SvcView from '@frontend/components/service/SvcView.vue'
import SaView from '@frontend/components/ServiceAccount/SaView.vue'
import StsView from '@frontend/components/statefulset/StsView.vue'
import StorageClassView from '@frontend/components/StorageClass/StorageClassView.vue'
import ValidatingWebhookView from '@frontend/components/ValidatingWebhook/ValidatingWebhookView.vue'
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

  switch (resType) {
    case ResType.ReplicaSet:
      drawerInstance
        .show(title, RsView, { rs: resource })
      break
    case ResType.Deployment:
      drawerInstance
        .show(title, DeployView, { deploy: resource })
      break
    case ResType.Node:
      drawerInstance
        .show(title, NodeView, { node: resource })
      break
    case ResType.DaemonSet:
      drawerInstance
        .show(title, DsView, { ds: resource })
      break
    case ResType.ReplicationController:
      drawerInstance
        .show(title, RcView, { rc: resource })
      break
    case ResType.StatefulSet:
      drawerInstance
        .show(title, StsView, { sts: resource })
      break
    case ResType.Pod:
      drawerInstance
        .show(title, PodView, { pod: resource })
      break
    case ResType.Job:
      drawerInstance
        .show(title, JobView, { job: resource })
      break
    case ResType.CronJob:
      drawerInstance
        .show(title, CronJobView, { cj: resource })
      break
    case ResType.ConfigMap:
      drawerInstance
        .show(title, CmView, { cm: resource })
      break
    case ResType.Secret:
      drawerInstance
        .show(title, SecretView, { secret: resource })
      break
    case ResType.PriorityClass:
      drawerInstance
        .show(title, PcView, { pc: resource })
      break
    case ResType.Event:
      drawerInstance
        .show(title, EventView, { event: resource })
      break
    case ResType.ResourceQuota:
      drawerInstance
        .show(title, QuotaView, { quota: resource })
      break
    case ResType.Namespace:
      drawerInstance
        .show(title, NsView, { ns: resource })
      break
    case ResType.IngressClass:
      drawerInstance
        .show(title, IngressClassView, { ingressClass: resource })
      break
    case ResType.PersistentVolume:
      drawerInstance
        .show(title, PersistentVolumeView, { persistentVolume: resource })
      break
    case ResType.StorageClass:
      drawerInstance
        .show(title, StorageClassView, { storageClass: resource })
      break
    case ResType.ClusterRoleBinding:
      drawerInstance
        .show(title, ClusterRoleBindingView, { clusterRoleBinding: resource })
      break
    case ResType.ClusterRole:
      drawerInstance
        .show(title, ClusterRoleView, { clusterRole: resource })
      break
    case ResType.MutatingWebhookConfiguration:
      drawerInstance
        .show(title, MutatingWebhookView, { mw: resource })
      break
    case ResType.ValidatingWebhookConfiguration:
      drawerInstance
        .show(title, ValidatingWebhookView, { vw: resource })
      break
    case ResType.LimitRange:
      drawerInstance
        .show(title, LimitsView, { limits: resource })
      break
    case ResType.HorizontalPodAutoscaler:
      drawerInstance
        .show(title, HpaView, { hpa: resource })
      break
    case ResType.PodDisruptionBudget:
      drawerInstance
        .show(title, PdbView, { pdb: resource })
      break
    case ResType.Endpoint:
      drawerInstance
        .show(title, EpView, { ep: resource })
      break
    case ResType.EndpointSlice:
      drawerInstance
        .show(title, EndpointSliceView, { ep: resource })
      break
    case ResType.Service:
      drawerInstance
        .show(title, SvcView, { svc: resource })
      break
    case ResType.Ingress:
      drawerInstance
        .show(title, IngView, { ing: resource })
      break
    case ResType.NetworkPolicy:
      drawerInstance
        .show(title, NetpolView, { netpol: resource })
      break
    case ResType.PersistentVolumeClaim:
      drawerInstance
        .show(title, PvcView, { pvc: resource })
      break
    case ResType.Role:
      drawerInstance
        .show(title, RoleView, { role: resource })
      break
    case ResType.RoleBinding:
      drawerInstance
        .show(title, RoleBindingView, { roleBinding: resource })
      break
    case ResType.ServiceAccount:
      drawerInstance
        .show(title, SaView, { sa: resource })
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
