import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class EndpointSliceService {
  private readonly logger = new Logger(EndpointSliceService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List(ns?: string) {
    const k8sApi = this.clientService.getDiscoveryV1Api()
    if (!ns || ns === 'null') {
      const res = await k8sApi.listEndpointSliceForAllNamespaces()
      return res.body.items
    }
    const resp = await k8sApi.listNamespacedEndpointSlice(ns)
    return resp.body.items
  }

  async ListByNsName(ns: string, name: string) {
    const k8sApi = this.clientService.getDiscoveryV1Api()
    const selector = `metadata.name=${name},metadata.namespace=${ns}`
    const resp = await k8sApi.listNamespacedEndpointSlice(ns, undefined, undefined, undefined, selector)
    return resp.body.items
  }

  async GetOneByNsName(ns: string, name: string) {
    const k8sApi = this.clientService.getDiscoveryV1Api()
    const resp = await k8sApi.readNamespacedEndpointSlice(name, ns)
    return resp.body
  }

  async Delete(name: string, ns: string) {
    const k8sApi = this.clientService.getDiscoveryV1Api()
    const r = await k8sApi.deleteNamespacedEndpointSlice(name, ns)
    return r.body
  }
}
