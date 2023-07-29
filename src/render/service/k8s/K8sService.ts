import { EventService } from '@render/service/k8s/EventService'
import { NamespaceService } from '@render/service/k8s/NamespaceService'
import { NodeService } from '@render/service/k8s/NodeService'
import { PodService } from '@render/service/k8s/PodService'
import { WatchService } from '@render/service/k8s/WatchService'

export class K8sService {
  static watchService = new WatchService()
  static podService = new PodService()
  static nodeService = new NodeService()
  static eventService = new EventService()
  static namespaceService = new NamespaceService()
}
