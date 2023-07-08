import { get, post } from '@main/utils/axios/api'
import type { V1Pod } from '../../model/V1Pod'

export class PodService {
  async startK8sWatch() {
    await get('/watch/init')
  }

  async getK8sPodList(ns: string): Promise<V1Pod[]> {
    return await get<V1Pod[]>(`/watch/pods/${ns}`)
  }

  async deletePods(podNsName: string[]) {
    await post('/watch/pods/delete/', podNsName)
  }
}
