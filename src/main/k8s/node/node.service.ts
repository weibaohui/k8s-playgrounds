import { ClientService } from '@main/k8s/client/client.service'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class NodeService {
  private readonly logger = new Logger(NodeService.name)

  constructor(
    public kubectlService: ClientService,
  ) {}

  async getNodes() {
    const k8sApi = this.kubectlService.getK8sApi()
    const resp = await k8sApi.listNode()
    return resp.body.items
  }

  async getNode(name: string) {
    const k8sApi = this.kubectlService.getK8sApi()
    const resp = await k8sApi.readNode(name)
    return resp.body
  }

  async deleteNode(name: string) {
    const k8sApi = this.kubectlService.getK8sApi()
    const resp = await k8sApi.deleteNode(name)
    return resp.body
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
