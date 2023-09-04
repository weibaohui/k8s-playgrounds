import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class PodDisruptionBudgetService {
  private readonly logger = new Logger(PodDisruptionBudgetService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List(ns?: string) {
    const k8sApi = this.clientService.getPolicyV1Api()
    if (!ns || ns === 'null') {
      const res = await k8sApi.listPodDisruptionBudgetForAllNamespaces()
      return res.body.items
    }
    const resp = await k8sApi.listNamespacedPodDisruptionBudget(ns)
    return resp.body.items
  }

  async GetOneByNsName(ns: string, name: string) {
    const k8sApi = this.clientService.getPolicyV1Api()
    const resp = await k8sApi.readNamespacedPodDisruptionBudget(name, ns)
    return resp.body
  }

  async Delete(name: string, ns: string) {
    const k8sApi = this.clientService.getPolicyV1Api()
    const r = await k8sApi.deleteNamespacedPodDisruptionBudget(name, ns)
    return r.body
  }
}
