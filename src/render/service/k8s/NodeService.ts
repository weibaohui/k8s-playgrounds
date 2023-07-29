import { HttpClient } from '@main/utils/axios/HttpClient'
import type { V1Node } from '../../../model/V1Node'

export class NodeService {
  async getNodeList(): Promise<V1Node[]> {
    return await HttpClient.inst.get<V1Node[]>('/watch/nodes')
  }

  async getNode(name: string): Promise<V1Node> {
    return await HttpClient.inst.get<V1Node>(`/watch/node/${name}`)
  }

  async cordonNode(name: string): Promise<V1Node> {
    return await HttpClient.inst.get<V1Node>(`/watch/node/cordon/${name}`)
  }

  async unCordonNode(name: string): Promise<V1Node> {
    return await HttpClient.inst.get<V1Node>(`/watch/node/unCordon/${name}`)
  }
}
