import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class PersistentVolumeClaimService {
  private readonly logger = new Logger(PersistentVolumeClaimService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List(ns?: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    if (!ns || ns === 'null') {
      const res = await k8sApi.listPersistentVolumeClaimForAllNamespaces()
      return res.body.items
    }
    const resp = await k8sApi.listNamespacedPersistentVolumeClaim(ns)
    return resp.body.items
  }

  async GetOneByNsName(ns: string, name: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    const resp = await k8sApi.readNamespacedPersistentVolumeClaim(name, ns)
    return resp.body
  }

  async Delete(name: string, ns: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    const r = await k8sApi.deleteNamespacedPersistentVolumeClaim(name, ns)
    return r.body
  }
}
