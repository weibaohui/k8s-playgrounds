import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from '@backend/k8s/client/client.service'

@Injectable()
export class NodeService {
  private readonly logger = new Logger(NodeService.name)

  constructor(
    public clientService: ClientService,
  ) {}

  async List() {
    const k8sApi = this.clientService.getCoreV1Api()
    const resp = await k8sApi.listNode()
    return resp.body.items
  }

  async GetOneByName(name: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    const resp = await k8sApi.readNode(name)
    return resp.body
  }

  async Delete(name: string) {
    const k8sApi = this.clientService.getCoreV1Api()
    const resp = await k8sApi.deleteNode(name)
    return resp.body
  }

  async Cordon(name: string) {
    const k8sApi = this.clientService.getCoreV1Api()
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

  async UnCordon(name: string) {
    const k8sApi = this.clientService.getCoreV1Api()
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
