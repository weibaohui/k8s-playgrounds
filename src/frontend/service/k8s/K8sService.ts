import { Play } from '@frontend/generated'
import { EventService } from '@frontend/service/k8s/EventService'
import { WatchService } from '@frontend/service/k8s/WatchService'

export class K8sService {
  static watchService = new WatchService()
  static eventService = new EventService()
  static playService = new Play({ BASE: 'http://127.0.0.1:3007' }).default
}
