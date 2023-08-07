import { HttpClient } from '../../../backend/utils/axios/HttpClient'
import type { V1Namespace } from '../../../backend/k8s/model/V1Namespace'

export class NamespaceService {
  async getNamespaceList() {
    return await HttpClient.inst.get<V1Namespace[]>('/k8s/ns/list')
  }

  async deleteNamespaces(nsList: string[]) {
    await HttpClient.inst.post('/k8s/ns/delete/', nsList)
  }
}
