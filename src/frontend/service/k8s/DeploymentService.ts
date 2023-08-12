import type { V1Deployment } from '@backend/k8s/model/V1Deployment'
import { HttpClient } from '@backend/utils/axios/HttpClient'

export class DeploymentService {
  async getDeploymentList(ns: string): Promise<V1Deployment[]> {
    return await HttpClient.inst.get<V1Deployment[]>(`/k8s/deployment/${ns}`)
  }

  async getDeployment(ns: string, name: string): Promise<V1Deployment> {
    return await HttpClient.inst.get<V1Deployment>(`/k8s/deployment/${ns}/${name}`)
  }

  async restartDeployment(ns: string, name: string): Promise<V1Deployment> {
    return await HttpClient.inst.get<V1Deployment>(`/k8s/deployment/restart/${ns}/${name}`)
  }

  async deleteDeployments(nsName: string[]) {
    await HttpClient.inst.post('/k8s/deployment/delete/', nsName)
  }
}
