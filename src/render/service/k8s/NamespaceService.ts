import { HttpClient } from '@main/utils/axios/HttpClient'
import type { V1Namespace } from '../../../model/V1Namespace'

export class NamespaceService {
  async getNamespaceList() {
    return await HttpClient.inst.get<V1Namespace[]>('/watch/ns')
  }
}
