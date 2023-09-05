import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class IngressService {
  private readonly logger = new Logger(IngressService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List(ns?: string) {
    const k8sApi = this.clientService.getNetworkingV1Api()
    if (!ns || ns === 'null') {
      const res = await k8sApi.listIngressForAllNamespaces()
      return res.body.items
    }
    const resp = await k8sApi.listNamespacedIngress(ns)
    return resp.body.items
  }

  async GetOneByNsName(ns: string, name: string) {
    const k8sApi = this.clientService.getNetworkingV1Api()
    const resp = await k8sApi.readNamespacedIngress(name, ns)
    return resp.body
  }

  async Delete(name: string, ns: string) {
    const k8sApi = this.clientService.getNetworkingV1Api()
    const r = await k8sApi.deleteNamespacedIngress(name, ns)
    return r.body
  }
}
