import { ClientService } from '@main/k8s/client/client.service'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ReplicasetService {
  private readonly logger = new Logger(ReplicasetService.name)

  constructor(
    public kubectlService: ClientService,
  ) {}

  async getReplicaSets(ns?: string) {
    const k8sApi = this.kubectlService.getAppsV1Api()
    if (!ns || ns === 'null') {
      const res = await k8sApi.listReplicaSetForAllNamespaces()
      return res.body.items
    }
    const podResp = await k8sApi.listNamespacedReplicaSet(ns)
    return podResp.body.items
  }
}
