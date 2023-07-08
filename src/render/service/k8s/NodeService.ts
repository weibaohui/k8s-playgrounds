import { get } from '@main/utils/axios/api'
import type { V1Node } from '../../../model/V1Node'

export class NodeService {
  async getNodeList(): Promise<V1Node[]> {
    return await get<V1Node[]>('/watch/nodes')
  }

  async getNode(name: string): Promise<V1Node> {
    return await get<V1Node>(`/watch/node/${name}`)
  }
}
