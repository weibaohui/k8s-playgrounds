import { WatchKubectlService } from '@main/watch/watch.kubectl.service'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class WatchNsService {
  private readonly logger = new Logger(WatchNsService.name)

  constructor(
    public kubectlService: WatchKubectlService,
  ) {}

  async k8sNs() {
    const k8sApi = this.kubectlService.getK8sApi()
    const res = await k8sApi.listNamespace()
    return res.body.items
  }
}
