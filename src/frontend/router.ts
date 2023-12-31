import ClusterRoleListView from '@frontend/components/ClusterRole/ClusterRoleListView.vue'
import ClusterRoleBindingListView from '@frontend/components/ClusterRoleBinding/ClusterRoleBindingListView.vue'
import CmListView from '@frontend/components/configmap/CmListView.vue'
import CronJobListView from '@frontend/components/cronjob/CronJobListView.vue'
import DsListView from '@frontend/components/daemonset/DsListView.vue'
import DeployListView from '@frontend/components/deployment/DeployListView.vue'
import EpListView from '@frontend/components/endpoint/EpListView.vue'
import EndpointSliceListView from '@frontend/components/EndpointSlice/EndpointSliceListView.vue'
import HpaListView from '@frontend/components/HorizontalPodAutoscaler/HpaListView.vue'
import IngListView from '@frontend/components/ingress/IngListView.vue'
import IngressClassListView from '@frontend/components/IngressClass/IngressClassListView.vue'
import JobListView from '@frontend/components/job/JobListView.vue'
import KubeConfigView from '@frontend/components/KubeConfig/KubeConfigView.vue'
import LimitsListView from '@frontend/components/limitrange/LimitsListView.vue'
import MutatingWebhookListView from '@frontend/components/MutatingWebhook/MutatingWebhookListView.vue'
import NetpolListView from '@frontend/components/NetworkPolicy/NetpolListView.vue'
import PersistentVolumeListView from '@frontend/components/PersistentVolume/PersistentVolumeListView.vue'
import PvcListView from '@frontend/components/PersistentVolumeClaim/PvcListView.vue'
import PdbListView from '@frontend/components/PodDisruptionBudget/PdbListView.vue'
import PortForwardListView from '@frontend/components/PortFoward/PortForwardListView.vue'
import PcListView from '@frontend/components/priorityclass/PcListView.vue'
import RcListView from '@frontend/components/replicacontroller/RcListView.vue'
import RsListView from '@frontend/components/replicaset/RsListView.vue'
import ResCountLineView from '@frontend/components/ResCountLineView.vue'
import QuotaListView from '@frontend/components/resourcequota/QuotaListView.vue'
import RoleListView from '@frontend/components/Role/RoleListView.vue'
import RoleBindingListView from '@frontend/components/RoleBinding/RoleBindingListView.vue'
import SecretListView from '@frontend/components/secret/SecretListView.vue'
import SvcListView from '@frontend/components/service/SvcListView.vue'
import SaListView from '@frontend/components/ServiceAccount/SaListView.vue'
import StsListView from '@frontend/components/statefulset/StsListView.vue'
import StorageClassListView from '@frontend/components/StorageClass/StorageClassListView.vue'
import ValidatingWebhookListView from '@frontend/components/ValidatingWebhook/ValidatingWebhookListView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@frontend/components/event/EventListView.vue'
import NodeListView from '@frontend/components/node/NodeListView.vue'
import NsListView from '@frontend/components/ns/NsListView.vue'
import PodListView from '@frontend/components/pod/PodListView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/kubeconfig',
      component: KubeConfigView,
    },
    {
      path: '/nodes',
      component: NodeListView,
    },
    {
      path: '/ns',
      component: NsListView,
    },
    {
      path: '/pods',
      component: PodListView,
    },
    {
      path: '/events',
      component: EventListView,
    },
    {
      path: '/deployments',
      component: DeployListView,
    },
    {
      path: '/replicaSets',
      component: RsListView,
    },
    {
      path: '/replicationControllers',
      component: RcListView,
    },
    {
      path: '/daemonSets',
      component: DsListView,
    },
    {
      path: '/statefulSets',
      component: StsListView,
    },
    {
      path: '/jobs',
      component: JobListView,
    },
    {
      path: '/cronJobs',
      component: CronJobListView,
    },
    {
      path: '/configMaps',
      component: CmListView,
    },
    {
      path: '/secrets',
      component: SecretListView,
    },
    {
      path: '/priorityClasses',
      component: PcListView,
    }, {
      path: '/resourceQuotas',
      component: QuotaListView,
    }, {
      path: '/limitRanges',
      component: LimitsListView,
    }, {
      path: '/podDisruptionBudgets',
      component: PdbListView,
    },
    {
      path: '/horizontalPodAutoscaler',
      component: HpaListView,
    },
    {
      path: '/endpoints',
      component: EpListView,
    },
    {
      path: '/endpointSlices',
      component: EndpointSliceListView,
    },
    {
      path: '/services',
      component: SvcListView,
    }, {
      path: '/ingresses',
      component: IngListView,
    }, {
      path: '/ingressClasses',
      component: IngressClassListView,
    }, {
      path: '/networkPolices',
      component: NetpolListView,
    },
    {
      path: '/storageClasses',
      component: StorageClassListView,
    }, {
      path: '/persistentVolumes',
      component: PersistentVolumeListView,
    }, {
      path: '/persistentVolumesClaims',
      component: PvcListView,
    }, {
      path: '/clusterRoles',
      component: ClusterRoleListView,
    }, {
      path: '/clusterRoleBindings',
      component: ClusterRoleBindingListView,
    }, {
      path: '/roles',
      component: RoleListView,
    }, {
      path: '/roleBindings',
      component: RoleBindingListView,
    }, {
      path: '/serviceAccounts',
      component: SaListView,
    },
    {
      path: '/mutatingWebhookConfigurations',
      component: MutatingWebhookListView,
    }, {
      path: '/validatingWebhookConfigurations',
      component: ValidatingWebhookListView,
    },
    {
      path: '/ResCountLine',
      component: ResCountLineView,
    },
    {
      path: '/PortForward',
      component: PortForwardListView,
    },
  ],
})
