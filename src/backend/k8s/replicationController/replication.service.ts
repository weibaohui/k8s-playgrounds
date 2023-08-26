import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class ReplicationControllerService {
  private readonly logger = new Logger(ReplicationControllerService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List(ns?: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    if (!ns || ns === 'null') {
      const res = await k8sApi.listReplicationControllerForAllNamespaces()
      return res.body.items
    }
    const resp = await k8sApi.listNamespacedReplicationController(ns)
    return resp.body.items
  }

  async GetOneByNsName(ns: string, name: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    const resp = await k8sApi.readNamespacedReplicationController(name, ns)
    return resp.body
  }

  async Delete(name: string, ns: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    const r = await k8sApi.deleteNamespacedReplicationController(name, ns)
    return r.body
  }
}
