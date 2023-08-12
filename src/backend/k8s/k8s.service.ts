import { DeploymentService } from '@backend/k8s/deployment/deployment.service'
import { WatchService } from '@backend/k8s/watch/watch.service'
import { Injectable, Logger } from '@nestjs/common'
import { ReplicasetService } from './replicaset/replicaset.service'
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
    public replicasetService: ReplicasetService,
    public deploymentService: DeploymentService,
    public watchService: WatchService) {}
}
