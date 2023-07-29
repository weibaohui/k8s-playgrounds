import { HttpClient } from '@main/utils/axios/HttpClient'
import type { V1Node } from '../../../model/V1Node'
import type { V1Status } from '../../../model/V1Status'

export class NodeService {
  async getNodeList(): Promise<V1Node[]> {
    return await HttpClient.inst.get<V1Node[]>('/watch/nodes')
  }

  async getNode(name: string): Promise<V1Node> {
    return await HttpClient.inst.get<V1Node>(`/watch/node/${name}`)
  }

  async deleteNode(name: string): Promise<V1Status> {
    return await HttpClient.inst.del<V1Status>(`/watch/node/${name}`)
  }

  async cordonNode(name: string): Promise<V1Node> {
    return await HttpClient.inst.get<V1Node>(`/watch/node/cordon/${name}`)
  }

  async unCordonNode(name: string): Promise<V1Node> {
    return await HttpClient.inst.get<V1Node>(`/watch/node/unCordon/${name}`)
  }
}
