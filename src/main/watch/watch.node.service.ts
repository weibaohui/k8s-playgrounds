import { WatchKubectlService } from '@main/watch/watch.kubectl.service'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class WatchNodeService {
  private readonly logger = new Logger(WatchNodeService.name)

  constructor(
    public kubectlService: WatchKubectlService,
  ) {}

  async getNodes() {
    const k8sApi = this.kubectlService.getK8sApi()
    const podResp = await k8sApi.listNode()
    return podResp.body.items
  }

  async getNode(name: string) {
    const k8sApi = this.kubectlService.getK8sApi()
    const podResp = await k8sApi.readNode(name)
    return podResp.body
  }

  async cordonNode(name: string) {
    const k8sApi = this.kubectlService.getK8sApi()
    const resp = await k8sApi.patchNode(name,
      { spec: { unschedulable: true } }, 'true', undefined,
      undefined, undefined, undefined,
      {
        headers: {
          'Content-Type': 'application/strategic-merge-patch+json',
          'Accept': 'application/json, */*',
        },
      })
    return resp.body
  }

  async unCordonNode(name: string) {
    const k8sApi = this.kubectlService.getK8sApi()
    const resp = await k8sApi.patchNode(name,
      { spec: { unschedulable: null } }, 'true', undefined,
      undefined, undefined, undefined,
      {
        headers: {
          'Content-Type': 'application/strategic-merge-patch+json',
          'Accept': 'application/json, */*',
        },
      })
    return resp.body
  }
}
