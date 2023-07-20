import { HttpClient } from '@main/utils/axios/HttpClient'
import type { V1Pod } from '../../../model/V1Pod'

export class PodService {
  async startK8sWatch() {
    await HttpClient.inst.get('/watch/init')
  }

  async getPodList(ns: string): Promise<V1Pod[]> {
    return await HttpClient.inst.get<V1Pod[]>(`/watch/pods/${ns}`)
  }

  async getPod(ns: string, name: string): Promise<V1Pod> {
    return await HttpClient.inst.get<V1Pod>(`/watch/pod/${ns}/${name}`)
  }

  async deletePods(podNsName: string[]) {
    await HttpClient.inst.post('/watch/pods/delete/', podNsName)
  }

  getPodContainerLogsDownloadURL(ns: string, podName: string, containerName: string) {
    const baseURL = HttpClient.inst.getBaseURL()
    return `${baseURL}watch/pods/log/file/${ns}/${podName}/${containerName}`
  }
}
