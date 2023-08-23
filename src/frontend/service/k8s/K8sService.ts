import { Play } from '@frontend/generated'
import { DeploymentService } from '@frontend/service/k8s/DeploymentService'
import { EventService } from '@frontend/service/k8s/EventService'
import { NamespaceService } from '@frontend/service/k8s/NamespaceService'
import { NodeService } from '@frontend/service/k8s/NodeService'
import { PodService } from '@frontend/service/k8s/PodService'
import { ReplicaSetService } from '@frontend/service/k8s/ReplicaSetService'
import { WatchService } from '@frontend/service/k8s/WatchService'

export class K8sService {
  static watchService = new WatchService()
  static podService = new PodService()
  static nodeService = new NodeService()
  static eventService = new EventService()
  static namespaceService = new NamespaceService()
  static replicasetService = new ReplicaSetService()
  static deploymentService: DeploymentService = new DeploymentService()

  static playService = new Play({ BASE: 'http://127.0.0.1:3007' }).default
}
