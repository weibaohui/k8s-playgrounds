import { ClusterRoleService } from '@backend/k8s/ClusterRole/ClusterRole.service'
import { ClusterRoleBindingService } from '@backend/k8s/ClusterRoleBinding/ClusterRoleBinding.service'
import { ConfigMapService } from '@backend/k8s/configmap/configmap.service'
import { CronJobService } from '@backend/k8s/cronjob/cronjob.service'
import { DaemonSetService } from '@backend/k8s/daemonset/daemonset.service'
import { DeploymentService } from '@backend/k8s/deployment/deployment.service'
import { EndpointService } from '@backend/k8s/endpoint/Endpoint.service'
import { HorizontalPodAutoscalerService } from '@backend/k8s/horizontalpodautoscaler/HorizontalPodAutoscaler.service'
import { IngressService } from '@backend/k8s/ingress/ingress.service'
import { IngressClassService } from '@backend/k8s/ingressClass/IngressClass.service'
import { JobService } from '@backend/k8s/job/job.service'
import { LimitRangeService } from '@backend/k8s/limitrange/limitrange.service'
import { NetworkPolicyService } from '@backend/k8s/networkPolicy/NetworkPolicy.service'
import { PersistentVolumeService } from '@backend/k8s/PersistentVolume/PersistentVolume.service'
import { PersistentVolumeClaimService } from '@backend/k8s/PersistentVolumeClaim/PersistentVolumeClaim.service'
import { PodDisruptionBudgetService } from '@backend/k8s/PodDisruptionBudget/PodDisruptionBudget.service'
import { PriorityClassService } from '@backend/k8s/priorityclass/priorityclass.service'
import { ReplicaSetService } from '@backend/k8s/replicaset/replicaset.service'
import { ReplicationControllerService } from '@backend/k8s/replicationController/replication.service'
import { ResourceQuotaService } from '@backend/k8s/resourcequota/resourcequota.service'
import { RoleService } from '@backend/k8s/Role/Role.service'
import { RoleBindingService } from '@backend/k8s/RoleBinding/RoleBinding.service'
import { SecretService } from '@backend/k8s/secret/secret.service'
import { NetworkSvcService } from '@backend/k8s/service/NetworkSvc.service'
import { StatefulSetService } from '@backend/k8s/statefulset/statefulset.service'
import { StorageClassService } from '@backend/k8s/storageClass/StorageClass.service'
import { WatchService } from '@backend/k8s/watch/watch.service'
import { Injectable, Logger } from '@nestjs/common'
import { EventService } from './event/event.service'
import { NodeService } from './node/node.service'
import { ClientService } from './client/client.service'
import { NsService } from './ns/ns.service'
import { PodService } from './pod/pod.service'

@Injectable()
export class K8sService {
  private readonly logger = new Logger(K8sService.name)

  constructor(
    public podService: PodService,
    public nodeService: NodeService,
    public nsService: NsService,
    public eventService: EventService,
    public clientService: ClientService,
    public replicaSetService: ReplicaSetService,
    public replicationControllerService: ReplicationControllerService,
    public deploymentService: DeploymentService,
    public daemonSetService: DaemonSetService,
    public statefulSetService: StatefulSetService,
    public jobService: JobService,
    public cronJobService: CronJobService,
    public configMapService: ConfigMapService,
    public secretService: SecretService,
    public watchService: WatchService,
    public priorityClassService: PriorityClassService,
    public resourceQuotaService: ResourceQuotaService,
    public limitRangeService: LimitRangeService,
    public horizontalPodAutoscalerService: HorizontalPodAutoscalerService,
    public podDisruptionBudgetService: PodDisruptionBudgetService,
    public endpointService: EndpointService,
    public networkSvcService: NetworkSvcService,
    public ingressService: IngressService,
    public ingressClassService: IngressClassService,
    public networkPolicyService: NetworkPolicyService,
    public storageClassService: StorageClassService,
    public persistentVolumeService: PersistentVolumeService,
    public persistentVolumeClaimService: PersistentVolumeClaimService,
    public clusterRoleService: ClusterRoleService,
    public clusterRoleBindingService: ClusterRoleBindingService,
    public roleService: RoleService,
    public roleBindingService: RoleBindingService,
  ) {}
}
