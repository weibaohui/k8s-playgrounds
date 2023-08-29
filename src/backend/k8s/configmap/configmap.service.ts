import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class ConfigMapService {
  private readonly logger = new Logger(ConfigMapService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List(ns?: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    if (!ns || ns === 'null') {
      const res = await k8sApi.listConfigMapForAllNamespaces()
      return res.body.items
    }
    const resp = await k8sApi.listNamespacedConfigMap(ns)
    return resp.body.items
  }

  async Delete(ns: string, name: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    const r = await k8sApi.deleteNamespacedConfigMap(name, ns)
    return r.body
  }

  async GetOneByNsName(ns: string, name: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    const resp = await k8sApi.readNamespacedConfigMap(name, ns)
    return resp.body
  }
}
