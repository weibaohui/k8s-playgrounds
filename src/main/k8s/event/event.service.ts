import { ClientService } from '@main/k8s/client/client.service'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name)

  constructor(
    public kubectlService: ClientService,
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
