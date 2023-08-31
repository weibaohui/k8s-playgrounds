import { ConfigMapService } from '@backend/k8s/configmap/configmap.service'
import { CronJobService } from '@backend/k8s/cronjob/cronjob.service'
import { DaemonSetService } from '@backend/k8s/daemonset/daemonset.service'
import { DeploymentService } from '@backend/k8s/deployment/deployment.service'
import { JobService } from '@backend/k8s/job/job.service'
import { PriorityClassService } from '@backend/k8s/priorityclass/priorityclass.service'
import { ReplicaSetService } from '@backend/k8s/replicaset/replicaset.service'
import { ReplicationControllerService } from '@backend/k8s/replicationController/replication.service'
import { SecretService } from '@backend/k8s/secret/secret.service'
import { StatefulSetService } from '@backend/k8s/statefulset/statefulset.service'
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
  ) {}
}
