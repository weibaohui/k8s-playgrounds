import { HttpClient } from '../../../backend/utils/axios/HttpClient'
import type { V1Pod } from '../../../model/V1Pod'

export class PodService {
  async getPodList(ns: string): Promise<V1Pod[]> {
    return await HttpClient.inst.get<V1Pod[]>(`/k8s/pod/${ns}`)
  }

  async getPod(ns: string, name: string): Promise<V1Pod> {
    return await HttpClient.inst.get<V1Pod>(`/k8s/pod/${ns}/${name}`)
  }

  async deletePods(podNsName: string[]) {
    await HttpClient.inst.post('/k8s/pod/delete/', podNsName)
  }

  getPodContainerLogsDownloadURL(ns: string, podName: string, containerName: string) {
    const baseURL = HttpClient.inst.getBaseURL()
    return `${baseURL}watch/pods/log/file/${ns}/${podName}/${containerName}`
  }
}
