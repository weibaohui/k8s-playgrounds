import type { V1ReplicaSet } from '@backend/k8s/model/V1ReplicaSet'
import { HttpClient } from '@backend/utils/axios/HttpClient'

export class ReplicaSetService {
  async getReplicaSetList(ns?: string): Promise<V1ReplicaSet[]> {
    return await HttpClient.inst.get<V1ReplicaSet[]>(`/k8s/replicaset/${ns}`)
  }

  async delete(rsNames: string[]) {
    await HttpClient.inst.post('/k8s/replicaset/delete/', rsNames)
  }
}
