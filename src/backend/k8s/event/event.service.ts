import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '../../k8s/client/client.service'

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async events(ns?: string, fieldSelector?: string) {
    const k8sApi = this.clientService.getK8sApi()
    if (!ns || ns === 'null' || ns === 'undefined') {
      const eventsAll = await k8sApi.listEventForAllNamespaces(undefined, undefined, fieldSelector)
      return eventsAll.body.items
    }
    const events = await k8sApi.listNamespacedEvent(ns, undefined, undefined, undefined, fieldSelector)
    return events.body.items
  }
}