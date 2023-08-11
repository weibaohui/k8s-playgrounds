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
}
