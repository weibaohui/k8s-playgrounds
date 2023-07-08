import { get } from '@main/utils/axios/api'
import type { V1Namespace } from '../../../model/V1Namespace'

export class NamespaceService {
  async getNamespaceList() {
    return await get<V1Namespace[]>('/watch/ns')
  }
}
