import { HttpClient } from '../../../backend/utils/axios/HttpClient'
import type { V1Node } from '../../../backend/k8s/model/V1Node'
import type { V1Status } from '../../../backend/k8s/model/V1Status'

export class NodeService {
  async getNodeList(): Promise<V1Node[]> {
    return await HttpClient.inst.get<V1Node[]>('/k8s/node/list')
  }

  async getNode(name: string): Promise<V1Node> {
    return await HttpClient.inst.get<V1Node>(`/k8s/node/${name}`)
  }

  async deleteNode(name: string): Promise<V1Status> {
    return await HttpClient.inst.del<V1Status>(`/k8s/node/${name}`)
  }

  async cordonNode(name: string): Promise<V1Node> {
    return await HttpClient.inst.get<V1Node>(`/k8s/node/cordon/${name}`)
  }

  async unCordonNode(name: string): Promise<V1Node> {
    return await HttpClient.inst.get<V1Node>(`/k8s/node/unCordon/${name}`)
  }
}
