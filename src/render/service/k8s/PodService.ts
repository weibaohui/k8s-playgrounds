import { get, post } from '@main/utils/axios/api'
import type { V1Pod } from '../../../model/V1Pod'

export class PodService {
  async startK8sWatch() {
    await get('/watch/init')
  }

  async getPodList(ns: string): Promise<V1Pod[]> {
    return await get<V1Pod[]>(`/watch/pods/${ns}`)
  }

  async getPod(ns: string, name: string): Promise<V1Pod> {
    return await get<V1Pod>(`/watch/pod/${ns}/${name}`)
  }

  async deletePods(podNsName: string[]) {
    await post('/watch/pods/delete/', podNsName)
  }
}
