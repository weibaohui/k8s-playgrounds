import { WatchKubectlService } from '@main/watch/watch.kubectl.service'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class WatchEventService {
  private readonly logger = new Logger(WatchEventService.name)

  constructor(
    public kubectlService: WatchKubectlService,
  ) {}

  async events(ns?: string) {
    const k8sApi = this.kubectlService.getK8sApi()
    if (!ns || ns === 'null' || ns === 'undefined') {
      const eventsAll = await k8sApi.listEventForAllNamespaces()
      return eventsAll.body.items
    }
    const events = await k8sApi.listNamespacedEvent(ns)
    return events.body.items
  }
}
