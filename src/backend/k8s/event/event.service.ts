import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List(ns?: string, fieldSelector?: string) {
    const k8sApi = this.clientService.getK8sApi()
    if (!ns || ns === 'null' || ns === 'undefined') {
      const eventsAll = await k8sApi.listEventForAllNamespaces(undefined, undefined, fieldSelector)
      return eventsAll.body.items
    }
    const events = await k8sApi.listNamespacedEvent(ns, undefined, undefined, undefined, fieldSelector)
    return events.body.items
  }

  async deleteEvent(ns: string, name: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    const r = await k8sApi.deleteNamespacedEvent(name, ns)
    return r.body
  }

  async GetOneByNsName(ns: string, name: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    const resp = await k8sApi.readNamespacedEvent(name, ns)
    return resp.body
  }
}
