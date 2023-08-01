import { WatchKubectlService } from '@main/watch/watch.kubectl.service'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class WatchReplicasetService {
  private readonly logger = new Logger(WatchReplicasetService.name)

  constructor(
    public kubectlService: WatchKubectlService,
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
