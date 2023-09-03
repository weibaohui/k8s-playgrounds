import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class HorizontalPodAutoscalerService {
  private readonly logger = new Logger(HorizontalPodAutoscalerService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List(ns?: string) {
    const k8sApi = this.clientService.getAutoScalingV2Api()
    if (!ns || ns === 'null') {
      const res = await k8sApi.listHorizontalPodAutoscalerForAllNamespaces()
      return res.body.items
    }
    const resp = await k8sApi.listNamespacedHorizontalPodAutoscaler(ns)
    return resp.body.items
  }

  async GetOneByNsName(ns: string, name: string) {
    const k8sApi = this.clientService.getAutoScalingV2Api()
    const resp = await k8sApi.readNamespacedHorizontalPodAutoscaler(name, ns)
    return resp.body
  }

  async Delete(name: string, ns: string) {
    const k8sApi = this.clientService.getAutoScalingV2Api()
    const r = await k8sApi.deleteNamespacedHorizontalPodAutoscaler(name, ns)
    return r.body
  }
}
